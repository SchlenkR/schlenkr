
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

let postFileName = "post.md"
let postOutputFileName = (Path.GetFileNameWithoutExtension postFileName) + ".html"

let templateDir = scriptDir </> "template"
let templateFileExtension = ".template.html"


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

type Post =
    { distFullName: string
      relDir: string
      postLink: string
      title: string
      summary: string
      date: DateTime
      dateString : string
      postType: PostType
      renderedContent: string }

let createPost postDir =

    let htmlContent =
        let tmpFile = Path.GetTempFileName()
        do RazorLiterate.ProcessMarkdown
            ( postDir </> postFileName,
              output = tmpFile,
              format = OutputKind.Html,
              lineNumbers = false,
              includeSource = true)
        let res = File.ReadAllText tmpFile
        File.Delete tmpFile
        res

    let html = HtmlDocument.Parse htmlContent

    let findFirst tag = (html.Descendants [tag] |> Seq.head).InnerText()

    let date = findFirst "meta_date" |> (fun d -> DateTime.Parse(d, CultureInfo.InvariantCulture))
    let title = findFirst "meta_title"
    let summary = findFirst "meta_preview"
    let postTypeString = findFirst "meta_type"

    let relDir = Path.GetFileName(postDir)
    let postLink = relDir </> postOutputFileName

    let post =
        { distFullName = distContentDir </> postLink
          relDir = relDir
          postLink = postLink
          title = title
          summary = summary
          date = date
          dateString = date.ToString("m")
          postType =
                match postTypeString with
                | "post" -> BlogPost
                | "static" -> Static
                | _ -> failwith (sprintf "Unknown post type in file %s: %s" postLink postTypeString)
          renderedContent = htmlContent }
    post
    
let posts =
    Directory.GetDirectories(srcContentDir)
    |> Array.toList
    |> List.map createPost

let generateIndexPage() =
    let postItems =
        posts
        |> List.filter (fun p -> p.postType = BlogPost)
        |> List.map (render "index_postItem")
        |> List.reduce (+)

    let renderedPage =
        render "layout"
            {|
                content = render "index" {| items = postItems |}
            |}

    (renderedPage, distDir </> "home/index.html")

let generatePostPages() = [
    for p in posts do
    let renderedPage =
        render "layout" {| content = render "post" p |}

    let fileName = distContentDir </> p.relDir </> postOutputFileName
    yield (renderedPage, fileName)
]


let prepareDist() =
    // prepare dist and fill with initial stuff
    do makeCleanDir distDir
    do
        let assets = "assets"
        copyDirRec (templateDir </> assets) (distDir </> assets)
    
    // copy content
    do copyDirRec srcContentDir distContentDir
    do deleteFiles distContentDir postFileName SearchOption.AllDirectories

let writeIndex() =
    let (content,fileName) = generateIndexPage()
    writeFile fileName content

let writePosts() =
    generatePostPages() |> List.iter (fun (content,fileName) -> writeFile fileName content)


do prepareDist()
do writeIndex()
do writePosts()
