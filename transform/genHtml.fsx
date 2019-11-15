
#load @".\packages\FSharp.Formatting\FSharp.Formatting.fsx"
#r @".\packages\Handlebars.Net\lib\net452\Handlebars.dll"
#r @".\packages\FSharp.Data\lib\net45\FSharp.Data.dll"

open FSharp.Literate
open FSharp.Formatting.Razor

open FSharp.Data

open HandlebarsDotNet

open System
open System.IO
open System.Linq


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


type PostType = Article | Static

type Post =
    { distFullName: string
      relDir: string
      link: string
      title: string
      summary: string
      dateString: string
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

    let tryFindFirst tag =
        match (html.Descendants [tag] |> Seq.tryHead) with
        | Some v -> Some (v.InnerText())
        | None -> None
    let findFirst tag = (tryFindFirst tag).Value

    let date =
        match tryFindFirst "meta_date" with
        | Some v -> (DateTime.Parse v).ToString("d")
        | None -> ""
    let title = findFirst "meta_title"
    let summary = findFirst "p"

    let dirName = Path.GetFileName(postDir)
    let link = dirName </> postOutputFileName

    let post =
        { distFullName = distContentDir </> link
          relDir = dirName
          link = link
          title = title
          summary = summary
          dateString = date
          postType = if Char.IsNumber (dirName.[0]) then Article else Static
          renderedContent = htmlContent }
    post
    
let posts =
    Directory.GetDirectories(srcContentDir)
    |> Array.toList
    |> List.map createPost

let indexPage =
    let postItems =
        posts
        |> List.filter (fun p -> p.postType = Article)
        |> List.map (render "index_postItem")
        |> List.reduce (+)

    let renderedPage =
        render "layout"
            {|
                content = render "index" {| items = postItems |}
            |}

    (renderedPage, distDir </> "home/index.html")

let postPages = [
    for p in posts do
    let renderedPage =
        render "layout" 
            {|
                content =
                    render
                        "post"
                        {|
                            title = p.title
                            date = p.dateString
                            content = p.renderedContent
                        |}
        |}

    let fileName = distContentDir </> p.relDir </> postOutputFileName
    yield (renderedPage, fileName)
]


let writeIndex() =
    let (content,fileName) = indexPage in writeFile fileName content

let writePosts() =
    postPages
    |> List.iter (fun (content,fileName) -> writeFile fileName content)

let prepareDist() =
    // prepare dist and fill with initial stuff
    do makeCleanDir distDir
    do
        let assets = "assets"
        copyDirRec (templateDir </> assets) (distDir </> assets)
    
    // copy content
    do copyDirRec srcContentDir distContentDir
    do deleteFiles distContentDir postFileName SearchOption.AllDirectories


do prepareDist()
do writeIndex()
do writePosts()
