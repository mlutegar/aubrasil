# Deploy: push para o GitHub, depois pull + rebuild na VPS (kvm8)
# Obs.: no PowerShell 5.1 o stderr do git/ssh (mensagens normais) vira erro com 'Stop'; por isso 'Continue' + checagem de $LASTEXITCODE.
$ErrorActionPreference = 'Continue'
git push origin main
if ($LASTEXITCODE -ne 0) { exit 1 }
ssh kvm8 'cd /root/pedregulho && git pull && docker compose build --no-cache && docker compose up -d && docker compose ps && docker compose logs --tail=20'
if ($LASTEXITCODE -ne 0) { exit 1 }
