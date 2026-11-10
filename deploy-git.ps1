# Deploy: push para o GitHub, depois pull + rebuild na VPS (kvm8)
$ErrorActionPreference = 'Stop'
git push origin main
if ($LASTEXITCODE -ne 0) { exit 1 }
ssh kvm8 'cd /root/pedregulho && git pull && docker compose build --no-cache && docker compose up -d && docker compose ps && docker compose logs --tail=20'
