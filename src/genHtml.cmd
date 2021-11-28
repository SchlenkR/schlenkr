@echo off

cd transform
.paket\paket.exe install -s || goto :error

cd..
.fsharp\fsi.exe --load:"transform\genHtml.fsx" --exec || goto :error
exit

:error
echo Fehler: #%errorlevel%
REM pause
exit /b %errorlevel%
