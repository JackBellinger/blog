#!/usr/bin/env bash
set -euo pipefail
npm run build
mv ./dist/blog/index.html ./dist
(cd dist/blog/blog && tar c .) | (cd dist && tar xf -)
rm -rf ./dist/blog
cp -r ./assets/* ./dist/assets
