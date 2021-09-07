set -e

# build the project
npm install
npm run build

# serve up files for testing to port 5000 (default)
npx serve build/near-docs &
SERVE_PID=$!

# wait til the server is responding
npx wait-on http://localhost:5000/

# ignore errors since link check exits with nonzero error if any links break
set +e

# crawl site and check all links
npx linkinator http://localhost:5000

# record exit status of link check
status=$?

# cleanup
echo $SERVE_PID
kill -9 $SERVE_PID

# set exit status to link check's exit status, so script fails correctly on CI
exit $status
