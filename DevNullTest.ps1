# DevNullCreateTemplate: local test loop
#
# Runs the upstream installer if DevNull isn't on this machine yet,
# starts a server pointed at this folder + the GUI client. Your work
# in Games/ Plugins/ Shaders/ is auto-discovered as the Create source
# (this repo lives at %USERPROFILE%\DevNull\Create\).

param(
    [string]$Game = ""   # name (without .js) of a game to auto-load on connect
)

$ErrorActionPreference = "Stop"

$installRoot  = Join-Path $env:USERPROFILE "DevNull"
$commonDir    = Join-Path $installRoot "Common"
$serverScript = Join-Path $installRoot "DevNullServer.ps1"
$clientScript = Join-Path $installRoot "DevNull.ps1"

if (-not (Test-Path (Join-Path $commonDir "DevNullServer.exe"))) {
    Write-Host "DevNull is not installed; running the installer first..." -ForegroundColor Cyan
    & ([scriptblock]::Create((Invoke-RestMethod 'https://raw.githubusercontent.com/simonthoresen/DevNull/main/install.ps1')))
}

if (-not (Test-Path $serverScript) -or -not (Test-Path $clientScript)) {
    Write-Host "Could not find DevNull at $installRoot." -ForegroundColor Red
    exit 1
}

# Start the server in a new window. The server auto-discovers this
# folder as the Create source via datadir.CreateDir() (checks for
# %USERPROFILE%\DevNull\Create\, which is where DevNullCreate.ps1
# clones the template).
Start-Process powershell -ArgumentList @(
    "-ExecutionPolicy", "Bypass",
    "-File", $serverScript,
    "--lan"
)

# Give the server a moment to boot before connecting.
Start-Sleep -Seconds 2

# Default to "hello" if --Game wasn't specified.
if (-not $Game) {
    $Game = "hello"
}

# Connect the GUI client; pass --game to auto-load the example.
& $clientScript --host localhost --player $env:USERNAME --game $Game
