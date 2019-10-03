
#load @".\packages\FSharp.Formatting\FSharp.Formatting.fsx"
#r @".\packages\Handlebars.Net\lib\net452\Handlebars.dll"

open FSharp.Literate
open FSharp.Formatting.Razor

open HandlebarsDotNet

open System
open System.IO


let ( </> ) a b = a + "\\" + b

let srcDir = __SOURCE_DIRECTORY__
let contentDir = srcDir </> ".." </> "content"
let postsDir = contentDir </> "posts"
let seriesDir = contentDir </> "series"
let distDir = srcDir </> ".." </> "dist"

let templateDir = srcDir </> "template"
let templateFile = templateDir </> "template.html"


[<AutoOpen>]
module Helper =

    let makeCleanDir dir =
        if Directory.Exists dir then
            Directory.Delete(dir, true)
        Directory.CreateDirectory dir |> ignore

    let rec copyDir srcPath dstPath =

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
            copyDir subdir.FullName dstSubDir

    let loadTemplate name = File.ReadAllText (templateDir </> name)

    let writeFile name content =
        File.WriteAllText(name, content)
        name

    let openFile (name: string) = System.Diagnostics.Process.Start name


let generate() =

    makeCleanDir distDir

    let inline render template (model: ^a) =
        let layoutTemplate = loadTemplate template
        Handlebars.Compile(layoutTemplate).Invoke model

    render "layout.html" {| content = render "index.html" (obj()) |}
    |> writeFile "c:\\temp\\test.html"
    |> openFile

    // Directory.GetFiles (outputDir, "*.*")
    // |> Seq.iter File.Delete

    // Directory.GetFiles(contentDir, "*.md")
    // |> Seq.filter (fun x -> Char.IsNumber (Path.GetFileName x).[0])
    // |> Seq.map File.ReadAllText
    // |> Seq.reduce (fun curr next -> curr + "\n\n\n" + next)
    // |> fun content -> File.WriteAllText (mergedFileName, content)

    // RazorLiterate.ProcessMarkdown
    //     ( mergedFileName,
    //       templateFile = projTemplate,
    //       output = outputFileName,
    //       format = OutputKind.Html,
    //       lineNumbers = false,
    //       replacements = projInfo,
    //       includeSource = true)

    // System.Diagnostics.Process.Start outputFileName

generate()
