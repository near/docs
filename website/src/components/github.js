import CodeBlock from '@theme/CodeBlock'
import { useEffect, useState } from 'react'

function parseReference(ref) {
  const fullUrl = ref.slice(ref.indexOf('https'), -1)
  const [url, loc] = fullUrl.split('#')

  /**
   * webpack causes failures when it tries to render this page
   */
  const global = globalThis || {}
  if (!global.URL) {
    // @ts-ignore
    global.URL = URL
  }

  const [org, repo, blob, branch, ...pathSeg] = new global.URL(url).pathname.split('/').slice(1)
  const [fromLine, toLine] = loc
    ? loc.split('-').map((lineNr) => parseInt(lineNr.slice(1), 10) - 1)
    : [0, Infinity]

  return {
    url: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`,
    fromLine,
    toLine,
    title: pathSeg.join('/')
  }
}

async function fetchCode({ url, fromLine, toLine }, fetchResultStateDispatcher) {
  let res

  try {
    res = await fetch(url)
  } catch (err) {
    return "Loading..."
  }

  if (res.status !== 200) {
    return "Loading..."
  }

  const body = (await res.text()).split('\n').slice(fromLine, (toLine || fromLine) + 1)
  const preceedingSpace = body.reduce((prev, line) => {
    if (line.length === 0) {
      return prev
    }

    const spaces = line.match(/^\s+/)
    if (spaces) {
      return Math.min(prev, spaces[0].length)
    }

    return 0
  }, Infinity)

  return body.map((line) => line.slice(preceedingSpace)).join('\n')
}

export function GitHubInternal({ url, start, end, language, fname, metastring }) {
  const [code, setCode] = useState("Loading...");

  let fullURL = url + "#";

  if (start && end) {
    fullURL += "L" + start + "-L" + end + "#";
  }

  useEffect(() => {
    const parsed = parseReference(fullURL);
    const promise = fetchCode(parsed);
    promise.then(res => setCode(res));
  })
  return (
    <CodeBlock language={language} fname={fname} metastring={metastring}>
      {code}    
    </CodeBlock>
  );
}

export default GitHubInternal;