# Print the raw-content URL of every .js file under games/, plugins/,
# and shaders/. Reads the GitHub owner/repo from `git remote get-url
# origin` and the current branch from `git symbolic-ref --short HEAD`.

$ErrorActionPreference = "Stop"

$origin = (git remote get-url origin 2>$null).Trim()
if (-not $origin) {
    Write-Host "Not a git repo or no 'origin' remote configured." -ForegroundColor Red
    exit 1
}

# Accept https://github.com/<owner>/<repo>(.git)? and git@github.com:<owner>/<repo>.git
$ownerRepo = $null
if ($origin -match '^https?://github\.com/([^/]+)/([^/]+?)(\.git)?$') {
    $ownerRepo = "$($Matches[1])/$($Matches[2])"
} elseif ($origin -match '^git@github\.com:([^/]+)/([^/]+?)(\.git)?$') {
    $ownerRepo = "$($Matches[1])/$($Matches[2])"
} else {
    Write-Host "Could not parse owner/repo from origin: $origin" -ForegroundColor Red
    exit 1
}

$branch = (git symbolic-ref --short HEAD 2>$null).Trim()
if (-not $branch) { $branch = "main" }

$base = "https://raw.githubusercontent.com/$ownerRepo/$branch"

$found = $false
foreach ($kind in @("games", "plugins", "shaders")) {
    $dir = Join-Path $PSScriptRoot $kind
    if (-not (Test-Path $dir)) { continue }
    $files = Get-ChildItem -Path $dir -Filter *.js -File -ErrorAction SilentlyContinue
    foreach ($f in $files) {
        $rel = "$kind/$($f.Name)"
        Write-Host "$base/$rel"
        $found = $true
    }
}

if (-not $found) {
    Write-Host "No .js files found under games/, plugins/, shaders/." -ForegroundColor Yellow
}
