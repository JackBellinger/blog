#!/usr/bin/env bash
set -euo pipefail

trunk build --release --dist "dist/yew" --public-url "/yew"
(cd dist/yew && tar c .) | (cd dist && tar xf -)
rm -rf dist/yew