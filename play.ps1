# dev-null-starter: local test loop
#
# Runs the upstream installer if dev-null isn't on this machine yet,
# starts a server pointed at this folder + the GUI client. Your work
# in games/ plugins/ shaders/ is auto-discovered as the Create source.

param(
    [string]$Game = ""   # name (without .js) of a game to auto-load on connect
)

$ErrorActionPreference = "Stop"

$installRoot = Join-Path $env:USERPROFILE "dev-null\play"
$serverScript = Join-Path $installRoot "start-server.ps1"
$clientScript = Join-Path $installRoot "start-client.ps1"

if (-not (Test-Path (Join-Path $installRoot "dev-null-server.exe"))) {
    Write-Host "dev-null is not installed; running the installer first..." -ForegroundColor Cyan
    & ([scriptblock]::Create((Invoke-RestMethod 'https://raw.githubusercontent.com/simonthoresen/dev-null/main/install.ps1')))
}

if (-not (Test-Path $serverScript) -or -not (Test-Path $clientScript)) {
    Write-Host "Could not find dev-null at $installRoot." -ForegroundColor Red
    exit 1
}

# Start the server in a new window. The server auto-discovers this
# folder as the Create source via datadir.CreateDir().
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
