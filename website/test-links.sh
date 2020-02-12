#!/usr/bin/env bash

set -e

# build the project
yarn build

# serve up files for testing to port 5000 (default)
npx serve build/near-docs &

# wait til the server is responding
npx wait-on http://localhost:5000/

# crawl site and check all links
npx broken-link-checker -gro --exclude localhost:3030 --exclude https://github.com/nearprotocol/docs/tree/master/docs --host-requests 2 http://localhost:5000

# cleanup
kill $(ps -eaf | awk '/npx serve/ {print $2}' | head -1)

