
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

let srcDir = __SOURCE_DIRECTORY__
let distDir = srcDir </> ".." </> "dist"

let contentDirName = "content"
let srcContentDir = srcDir </> ".." </> contentDirName
let distContentDir = distDir

let postFileName = "post.md"
let postOutputFileName = (Path.GetFileNameWithoutExtension postFileName) + ".html"

let templateDir = srcDir </> "template"
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

    let asDict (x: (string * 'a) list) = x.ToDictionary((fun (k,_) -> k), (fun (_,v) -> v :> obj))

    let inline render template (model: ^a) =
        let layoutTemplate = loadTemplate template
        let res = Handlebars.Compile(layoutTemplate).Invoke model
        res + "\n\n\n"


type Post =
    { distFullName: string;
      relDir: string;
      link: string;
      title: string;
      summary: string;
      date: DateTime;
      content: string }

let prepare() =
    // prepare dist and fill with initial stuff
    do makeCleanDir distDir
    do
        let assets = "assets"
        copyDirRec (templateDir </> assets) (distDir </> assets)
    
    // copy content
    do copyDirRec srcContentDir distContentDir
    do deleteFiles distContentDir postFileName SearchOption.AllDirectories
prepare()

let posts =
    
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
        let date =
            let value = (html.Descendants ["meta_date"] |> Seq.head).InnerText()
            DateTime.Parse value
        let title = (html.Descendants ["h1"] |> Seq.head).InnerText()
        let summary = (html.Descendants ["p"] |> Seq.head).InnerText()

        let dirName = Path.GetFileName(postDir)
        let link = dirName </> postOutputFileName

        { distFullName = distContentDir </> link
          relDir = dirName
          link = link
          title = title
          summary = summary
          date = date
          content = htmlContent }

    Directory.GetDirectories(srcContentDir) |> Array.map createPost |> Array.toList

let writeIndex() =
    let postItems =
        posts
        |> List.map (render "index_postItem")
        |> List.reduce (+)

    render "layout" <| asDict [
            "content", render "index" <| asDict [ "items", postItems ]
        ]
    |> writeFile (distDir </> "_index/index.html")
writeIndex()

let writePosts() =
    posts
    |> List.iter (fun p ->
        let fileName = distContentDir </> p.relDir </> postOutputFileName
        printfn "fn: %s" fileName
        
        render "layout" <| dict [
            "content", render "post" <| dict [
                "title", p.title
                "date", p.date.ToString("d")
                "content", p.content
            ]
        ]
        |> writeFile fileName
    )
writePosts()

