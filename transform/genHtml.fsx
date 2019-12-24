
#load @".\packages\FSharp.Formatting\FSharp.Formatting.fsx"
#r @".\packages\Handlebars.Net\lib\net452\Handlebars.dll"
#r @".\packages\FSharp.Data\lib\net45\FSharp.Data.dll"
#r @"System.Xml.Linq.dll"

open FSharp.Literate
open FSharp.Formatting.Razor

open FSharp.Data

open HandlebarsDotNet

open System
open System.Globalization
open System.IO
open System.Linq
open System.Xml.Linq


let ( </> ) a b = a + "/" + b

let scriptDir = __SOURCE_DIRECTORY__
let distDir = scriptDir </> ".." </> ".dist"

let contentDirName = "content"
let srcContentDir = scriptDir </> ".." </> contentDirName
let distContentDir = distDir

let metadataFileName = "_meta.xml"

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
      dateString : string
      postType: PostType }

type Post =
    { postLink: string
      postOutputFileName: string
      metadata: PostMetadata
      renderedContent: string }

type Series =
    { relDir: string
      metadata: PostMetadata
      posts: Post list }

type IndexPageView = 
    { link: string
      title: string }

type IndexPostItemView =
    { postLink: string
      title: string
      summary: string
      dateString : string
      relDir: string
      pages: IndexPageView list }

let readMetadata directory =

    let xml = XDocument.Parse (File.ReadAllText (directory </> metadataFileName))
    let findFirst tag = (xml.Root.Descendants() |> Seq.find (fun x -> x.Name.LocalName = tag)).Value
    let date = findFirst "date" |> (fun d -> DateTime.Parse(d, CultureInfo.InvariantCulture))

    {
        title = findFirst "title"
        summary = findFirst "preview"
        date = date
        dateString = date.ToString("MMMM yyyy", new CultureInfo("en-US"))
        postType =
            let postTypeString = findFirst "type"
            match postTypeString with
            | "post" -> BlogPost
            | "static" -> Static
            | _ -> failwith (sprintf "Unknown post type in dir %s: %s" directory postTypeString)
    }

let createPost metadata relPostDir postFullFileName =

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
        metadata = metadata
        renderedContent = htmlContent
    }


let series = [
    for postDir in Directory.GetDirectories(srcContentDir) |> Array.sortDescending do
        let postFiles =
            Directory.GetFiles(postDir, "*.md", SearchOption.TopDirectoryOnly)
            |> Array.sort
            |> Array.toList
        let relDir = Path.GetFileName(postDir)
        let metadata = readMetadata postDir
        yield { relDir = relDir
                metadata = metadata
                posts = [
                    for postFileName in postFiles do
                        let normalizedPostMetadata =
                            let title =
                                let segments =
                                    Path.GetFileNameWithoutExtension postFileName
                                    |> fun s -> s.Split [|'_'|]
                                let text =
                                    segments
                                    |> Array.skip 1
                                    |> String.concat " "
                                let number = segments.[0] |> Int32.Parse
                                sprintf "%d - %s" number text
                            { metadata with title = title}
                        yield createPost normalizedPostMetadata relDir postFileName ]
            }
    ]

let generateIndexPage() =
    let renderedPostItems =
        query {
            for s in series do
            where (s.metadata.postType = BlogPost)
            let firstPost = s.posts.Head
            let viewPost = {
                postLink = firstPost.postLink
                title = s.metadata.title
                dateString = s.metadata.dateString
                summary = s.metadata.summary
                relDir = s.relDir
                pages =
                    if s.posts.Length > 1 then
                        s.posts |> List.map (fun p -> { link = p.postLink; title = p.metadata.title } )
                    else []
                }
            select (render "index_postItem" viewPost)
        }
        |> Seq.reduce (+)

    let renderedPage = render "layout" {| content = render "index" {| items = renderedPostItems |} |}

    (renderedPage, distDir </> "home/index.html")

let generatePostPages() = [
    for s in series do

        let postCount = List.length s.posts

        // let wholeArticle =
        //     let wholeContentn = s.posts
        //         |> List.map (fun p -> p.renderedContent) |> List

        let renderedPosts =
            s.posts
            |> List.mapi (fun i p ->

                let hasSuccessor = i > 0
                let hasPredecessor = i + 1 < postCount
                let isSeries = postCount > 1

                let postViewModel =
                    {| p with
                        isSeries = isSeries
                        seriesTitle = if isSeries then s.metadata.title else null
                        postTitle = if isSeries then p.metadata.title else s.metadata.title
                        hasSuccessor = hasSuccessor
                        prevPost = ""
                        prevPostTitle = ""
                        hasPredecessor = hasPredecessor
                        nextPost = ""
                        nextPostTitle = "" |}
                    |> fun p ->
                        if hasSuccessor then
                            let successor = s.posts.[i-1]
                            {| p with
                                prevPost = successor.postOutputFileName
                                prevPostTitle = successor.metadata.title |}
                        else p
                    |> fun p ->
                        if hasPredecessor then
                            let predecessor = s.posts.[i+1]
                            {| p with
                                nextPost = predecessor.postOutputFileName
                                nextPostTitle = predecessor.metadata.title |}
                        else p
                
                postViewModel )

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
