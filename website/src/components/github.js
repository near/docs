import CodeBlock from '@theme/CodeBlock'
import { useEffect, useState } from 'react'

function toRaw(ref) {
  const fullUrl = ref.slice(ref.indexOf('https'));
  const [url, loc] = fullUrl.split('#');
  const [org, repo, blob, branch, ...pathSeg] = new URL(url).pathname.split('/').slice(1);
  return `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`;
}

async function fetchCode(url, fromLine, toLine) {
  let res

  // check if stored in cache
  const validUntil = localStorage.getItem(`${url}-until`)

  if (validUntil && validUntil > Date.now()) {
    res = localStorage.getItem(url)
  } else {
    try {
      res = await ((await fetch(url)).text())
      localStorage.setItem(url, res)
      localStorage.setItem(`${url}-until`, Date.now() + 60000)
    } catch { return "Error fetching code, please try reloading" }
  }

  let body = res.split('\n')
  fromLine = fromLine ? Number(fromLine) - 1 : 0;
  toLine = toLine ? Number(toLine) : body.length;
  body = body.slice(fromLine, toLine);

  // Remove indentation on nested code
  const preceedingSpace = body.reduce((prev, line) => {
    if (line.length === 0) return prev

    const spaces = line.match(/^\s+/)
    if (spaces) return Math.min(prev, spaces[0].length)

    return 0
  }, Infinity)

  return body.map((line) => line.slice(preceedingSpace)).join('\n')
}

export function GitHubInternal({ url, start, end, language, fname, metastring }) {
  const [code, setCode] = useState('Loading...');

  useEffect(() => {
    const rawUrl = toRaw(url);
    const promise = fetchCode(rawUrl, start, end);
    promise.then(res => setCode(res));
  })

  return <div fname={fname}>
    <CodeBlock language={language} metastring={`${metastring} showLineNumbers`}>
      {code}
    </CodeBlock>
    <div style={{
      fontSize: '0.9em',
      fontWeight: 600,
      color: 'rgb(14, 117, 221)',
      textAlign: 'center',
      paddingBottom: '13px',
      textDecoration: 'underline'
    }}>
      <a href={url} target="_blank" rel="noreferrer noopener">See full example on GitHub</a>
    </div>
  </div>;
}

export default GitHubInternal;