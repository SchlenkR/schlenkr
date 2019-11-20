
#load @".\packages\FSharp.Formatting\FSharp.Formatting.fsx"
#r @".\packages\Handlebars.Net\lib\net452\Handlebars.dll"
#r @".\packages\FSharp.Data\lib\net45\FSharp.Data.dll"

open FSharp.Literate
open FSharp.Formatting.Razor

open FSharp.Data

open HandlebarsDotNet

open System
open System.Globalization
open System.IO

let ( </> ) a b = a + "/" + b

let scriptDir = __SOURCE_DIRECTORY__
let distDir = scriptDir </> ".." </> ".dist"

let contentDirName = "content"
let srcContentDir = scriptDir </> ".." </> contentDirName
let distContentDir = distDir

let defaultPostFileName = "post.md"
let defaultSeriesMetaFileName = "_series.md"

let templateDir = scriptDir </> "template"
let templateFileExtension = ".template.html"

let fsharpMarkdownTemplateFileName = templateDir </> contentDirName </> "fsharpMarkdownTemplate.html"


[<AutoOpen>]
module Helper =

    let deleteFiles dir pattern searchOption =
        Directory.GetFiles(dir, pattern, searchOption)
        |> Array.iter File.Delete

    let deleteDir dir =
        if Directory.Exists dir then
            Directory.Delete(dir, true)

    let makeCleanDir dir =
        deleteDir dir
        Directory.CreateDirectory dir |> ignore

    let rec copyDirRec srcPath dstPath =

        if not <| Directory.Exists srcPath then
            let msg = sprintf "Source directory does not exist or could not be found: %s" srcPath
            failwith msg

        if not <| Directory.Exists dstPath then
            Directory.CreateDirectory dstPath |> ignore

        let srcDir = DirectoryInfo srcPath

        for file in srcDir.GetFiles() do
            let temppath = dstPath </> file.Name
            file.CopyTo(temppath, true) |> ignore

        for subdir in srcDir.GetDirectories() do
            let dstSubDir = dstPath </> subdir.Name
            copyDirRec subdir.FullName dstSubDir

    let loadTemplate name =
        File.ReadAllText (templateDir </> "content" </> name + templateFileExtension)

    let writeFile name content =
        let dir = Path.GetDirectoryName name
        if not (Directory.Exists dir) then
            Directory.CreateDirectory dir |> ignore
        File.WriteAllText(name, content)

    let openFile (name: string) = System.Diagnostics.Process.Start name

    let inline render template (model: ^a) =
        let layoutTemplate = loadTemplate template
        let res = Handlebars.Compile(layoutTemplate).Invoke model
        res + "\n\n\n"


type PostType = BlogPost | Static

type PostMetadata =
    { title: string
      summary: string
      date: DateTime
      postType: PostType }

type Post =
    { postLink: string
      postOutputFileName: string
      metadata: PostMetadata
      dateString : string
      renderedContent: string }

type Series =
    { relDir: string
      posts: Post list }

let series =

    let readMetadata postFullFileName =

        let html = HtmlDocument.Parse (File.ReadAllText postFullFileName)
        let findFirst tag = (html.Descendants [tag] |> Seq.head).InnerText()

        {
            title = findFirst "meta_title"
            summary = findFirst "meta_preview"
            date = findFirst "meta_date" |> (fun d -> DateTime.Parse(d, CultureInfo.InvariantCulture))
            postType =
                let postTypeString = findFirst "meta_type"
                match postTypeString with
                | "post" -> BlogPost
                | "static" -> Static
                | _ -> failwith (sprintf "Unknown post type in file %s: %s" postFullFileName postTypeString)
        }

    let createPost postMetadata relPostDir postFullFileName =

        // printfn "generating post: %s" postFullFileName
        // do Console.ReadLine() |> ignore

        // let projInfo =
        //     [ "page-description", "TODO"
        //       "page-author", "Ronald Schlenker"
        //       "github-link", "https://github.com/TODO"
        //       "project-name", "TODO" ]

        let htmlContent =
            let tmpFile = Path.GetTempFileName()
            do RazorLiterate.ProcessMarkdown
                ( postFullFileName,
                  templateFile = fsharpMarkdownTemplateFileName,
                  output = tmpFile,
                  format = OutputKind.Html,
                  lineNumbers = false,
                //   replacements = projInfo,
                  includeSource = true)
            let res = File.ReadAllText tmpFile
            File.Delete tmpFile
            res

        let postOutputFileName = (Path.GetFileNameWithoutExtension postFullFileName) + ".html"
        let postLink = relPostDir </> postOutputFileName

        {
            postLink = postLink
            postOutputFileName = postOutputFileName
            metadata = postMetadata
            dateString = postMetadata.date.ToString("m")
            renderedContent = htmlContent
        }
    
    [
        for postDir in Directory.GetDirectories(srcContentDir) do
            let postFiles,metaFile =
                let defaultPostFullFileName = postDir </> defaultPostFileName
                if File.Exists defaultPostFullFileName then
                    ([defaultPostFullFileName], defaultPostFullFileName)
                else
                    let seriesPostFiles =
                        Directory.GetFiles(postDir, "*.md", SearchOption.TopDirectoryOnly)
                        |> Array.sort
                        |> Array.toList
                    (seriesPostFiles, postDir </> defaultSeriesMetaFileName)
            let relDir = Path.GetFileName(postDir)
            yield
                { 
                    relDir = relDir
                    posts = [ for postFileName in postFiles do
                              let postMetadata = readMetadata metaFile
                              yield createPost postMetadata relDir postFileName ]
                }
            
    ]

let generateIndexPage() =
    let renderedPostItems =
        query {
            for s in series do
            let p = s.posts.Head
            where (p.metadata.postType = BlogPost)
            let viewPost = {| p with relDir = s.relDir |}
            select (render "index_postItem" viewPost)
        }
        |> Seq.reduce (+)

    let renderedPage =
        render "layout"
            {|
                content = render "index" 
                    {|
                        items = renderedPostItems
                    |}
            |}

    (renderedPage, distDir </> "home/index.html")

let generatePostPages() =
    [
        for s in series do
            let postCount = List.length s.posts
            let renderedPosts =
                s.posts
                |> List.mapi (fun i p ->
                    let hasSuccessor = i > 0
                    let hasPredecessor = i + 1 < postCount
                    {| p with
                        hasNav = postCount > 1
                        hasSuccessor = hasSuccessor
                        prevPost = if hasSuccessor then (s.posts.[i-1].postOutputFileName) else ""
                        hasPredecessor = hasPredecessor
                        nextPost = if hasPredecessor then (s.posts.[i+1].postOutputFileName) else ""
                    |})
            
            for postViewModel in renderedPosts do
                let renderedPage = render "layout" {| content = render "post" postViewModel |}
                let fileName = distContentDir </> s.relDir </> postViewModel.postOutputFileName
                yield (renderedPage, fileName)
    ]


let prepareDist() =
    // prepare dist and fill with initial stuff
    do makeCleanDir distDir
    do
        let assets = "assets"
        copyDirRec (templateDir </> assets) (distDir </> assets)
    do copyDirRec srcContentDir distContentDir

let writeIndex() =
    let (content,fileName) = generateIndexPage()
    writeFile fileName content

let writePosts() =
    generatePostPages() |> List.iter (fun (content,fileName) -> writeFile fileName content)


do prepareDist()
do writeIndex()
do writePosts()
