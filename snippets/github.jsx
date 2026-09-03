export const Github = ({ url, start, end, fname, language, withSourceLink = true }) => {
  const [code, setCode] = useState(null);

  function toRaw(ref) {
    const fullUrl = ref.slice(ref.indexOf('https'));
    const [url] = fullUrl.split('#');
    const [org, repo, , branch, ...pathSeg] = new URL(url).pathname.split('/').slice(1);
    return `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`;
  }

  async function fetchCode(url, fromLine, toLine) {
    let res;

    if (typeof window !== 'undefined') {
      const validUntil = localStorage.getItem(`${url}-until`);
      if (validUntil && Number(validUntil) > Date.now()) {
        res = localStorage.getItem(url);
      }
    }

    if (!res) {
      try {
        res = await (await fetch(url)).text();
        if (typeof window !== 'undefined') {
          localStorage.setItem(url, res);
          localStorage.setItem(`${url}-until`, String(Date.now() + 60000));
        }
      } catch {
        return 'Error fetching code, please try reloading';
      }
    }

    let body = res.split('\n');
    const from = fromLine ? Number(fromLine) - 1 : 0;
    const to = toLine ? Number(toLine) : body.length;
    body = body.slice(from, to);

    const precedingSpace = body.reduce((prev, line) => {
      if (line.length === 0) return prev;
      const spaces = line.match(/^\s+/);
      if (spaces) return Math.min(prev, spaces[0].length);
      return 0;
    }, Infinity);

    return body.map((line) => line.slice(precedingSpace === Infinity ? 0 : precedingSpace)).join('\n');
  }

  function buildSourceUrl(url, start, end) {
    const base = url.split('#')[0];
    if (start && end) return `${base}#L${start}-L${end}`;
    if (start) return `${base}#L${start}`;
    return base;
  }

  useEffect(() => {
    const rawUrl = toRaw(url);
    fetchCode(rawUrl, start, end).then((res) => setCode(res));
  }, [url, start, end]);

  const sourceUrl = buildSourceUrl(url, start, end);
  const fileName = fname ?? sourceUrl.split('/').pop();

  return (
    <div className="my-5">
      {code === null ? (
        <div>Loading...</div>
      ) : (
        <CodeBlock language={language} filename={fileName} lines>
          {code}
        </CodeBlock>
      )}
      {withSourceLink && (
        <div className="flex justify-end" style={{marginTop: "-1rem"}}>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[0.6875rem] font-medium text-[#656d76] no-underline hover:text-[#1f2328] dark:text-[#8b949e] dark:hover:text-[#e6edf3]"
          >
            See code on GitHub
          </a>
        </div>
      )}
    </div>
  );
}

export default Github;
