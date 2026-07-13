#!/usr/bin/env bash
# deploy.sh — публикация «События в Ереване» на GitHub Pages.
# Сайт уже статический (index.html + vendor) — деплой = commit+push.
#   https://events.podlevskikh.com/  (CNAME → namebogsecret.github.io)
set -euo pipefail
cd "$(dirname "$0")"
git add -A
if git diff --cached --quiet; then echo "Нечего деплоить."; exit 0; fi
git -c user.email="vladimir@podlevskikh.com" -c user.name="Vladimir Podlevskikh" \
  commit -qm "${1:-update events}"
git push -q origin main
echo "✓ Запушено → https://events.podlevskikh.com/ (~1 мин на пересборку)"
