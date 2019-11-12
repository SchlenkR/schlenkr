
#r @".\packages\Handlebars.Net\lib\net452\Handlebars.dll"

open System.Linq
open System.Collections.Generic

open HandlebarsDotNet

let asDict (x: (string * 'a) list) = x.ToDictionary((fun (k,_) -> k), (fun (_,v) -> v :> obj))
let template = """ Hallo {{name}} """
let model = [ "name", "Hans" ] |> asDict
let res = Handlebars.Compile(template).Invoke model
