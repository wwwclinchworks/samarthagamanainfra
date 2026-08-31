#!/usr/bin/env bash
# Redeploy the frozen previous site to preview.samarthagamanainfra.com
# Snapshot commit: 09c95a3 (brand-copy rewrite — previous production before preview swap)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMMIT="${1:-09c95a3}"
WORKDIR="$(mktemp -d)"
cleanup() { rm -rf "$WORKDIR"; git -C "$ROOT" worktree prune 2>/dev/null || true; }
trap cleanup EXIT

git -C "$ROOT" worktree add --detach "$WORKDIR" "$COMMIT"
cp "$ROOT/wrangler.preview.jsonc" "$WORKDIR/wrangler.preview.jsonc"
cd "$WORKDIR"
npm ci
npm run build

# Stamp preview pages: noindex + comparison banner
python3 - <<'PY'
from pathlib import Path
meta = '<meta name="robots" content="noindex,nofollow" />\n    <meta name="sgi-site" content="preview-previous-deployment" />'
note = '''<div id="sgi-preview-banner" style="position:fixed;z-index:99999;left:0;right:0;top:0;padding:10px 16px;background:#1a1814;color:#f3eee4;font:600 13px/1.35 Inter,system-ui,sans-serif;text-align:center;letter-spacing:.02em">PREVIEW — previous site version for client comparison · <a href="https://samarthagamanainfra.com/" style="color:#c9a176">Open current site →</a></div><style>body{padding-top:44px !important}</style>'''
for html in Path("dist").rglob("index.html"):
    t = html.read_text()
    if "sgi-preview-banner" not in t:
        t = t.replace("<head>", "<head>\n    " + meta, 1)
        t = t.replace("<body>", "<body>\n    " + note, 1)
        html.write_text(t)
print("stamped preview html")
PY

npx wrangler deploy -c wrangler.preview.jsonc
echo "Live: https://preview.samarthagamanainfra.com"
