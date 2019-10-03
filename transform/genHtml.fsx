
#load @".\packages\FSharp.Formatting\FSharp.Formatting.fsx"

open FSharp.Literate
open FSharp.Formatting.Razor
open System
open System.IO

let articleName = "Digital_Signal_Processing_with_FSharp"

let makeCleanDir dir =
    if Directory.Exists dir then
        Directory.Delete dir
    Directory.CreateDirectory dir

let ( </> ) a b = a + "\\" + b

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

let srcDir = __SOURCE_DIRECTORY__

let generate() =

    let contentDir = srcDir </> ".." </> "content"
    let postsDir = contentDir </> "posts"
    let seriesDir = contentDir </> "series"
    let outputDir = srcDir </> ".." </> "dist"

    let templateDir = srcDir </> "template"
    let templateFile = templateDir </> "template.html"
    
    let projInfo = [
        "page-title", "TODO"
        "page-description", "TODO"
        ]

    // Directory.GetFiles (outputDir, "*.*")
    // |> Seq.iter File.Delete

    // Directory.GetFiles(contentDir, "*.md")
    // |> Seq.filter (fun x -> Char.IsNumber (Path.GetFileName x).[0])
    // |> Seq.map File.ReadAllText
    // |> Seq.reduce (fun curr next -> curr + "\n\n\n" + next)
    // |> fun content -> File.WriteAllText (mergedFileName, content)

    RazorLiterate.ProcessMarkdown
        ( mergedFileName,
          templateFile = projTemplate,
          output = outputFileName,
          format = OutputKind.Html,
          lineNumbers = false,
          replacements = projInfo,
          includeSource = true)

    System.Diagnostics.Process.Start outputFileName

generate()
