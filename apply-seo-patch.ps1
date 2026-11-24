$ErrorActionPreference = "Stop"

$legacyOgRoute = Join-Path $PSScriptRoot "src/app/opengraph-image.tsx"

if (Test-Path $legacyOgRoute) {
  Remove-Item $legacyOgRoute -Force
  Write-Host "Removed the old root Open Graph route. The project now uses the static branded asset from public/images/brand/og-lavka.jpg."
} else {
  Write-Host "The old Open Graph route is already absent."
}

Write-Host "SEO patch files are in place. Run: bun run typecheck; bun run build"
