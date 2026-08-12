export const ExplainCode = ({ children }) => {
  const [activeBlock, setActiveBlock] = useState(0);
  const [code, setCode] = useState(null);
  const blockRefs = useRef({});
  const codeContainerRef = useRef(null);
  const ratioMap = useRef({});

  function toRaw(ref) {
    const fullUrl = ref.slice(ref.indexOf('https'));
    const [url] = fullUrl.split('#');
    const [org, repo, , branch, ...pathSeg] = new URL(url).pathname.split('/').slice(1);
    return `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`;
  }

  async function fetchRaw(url, fromLine, toLine) {
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
    let lines = res.split('\n');
    const from = fromLine ? Number(fromLine) - 1 : 0;
    const to = toLine ? Number(toLine) : lines.length;
    lines = lines.slice(from, to);
    const indent = lines.reduce((prev, line) => {
      if (!line.length) return prev;
      const m = line.match(/^\s+/);
      return m ? Math.min(prev, m[0].length) : 0;
    }, Infinity);
    return lines.map((l) => l.slice(indent === Infinity ? 0 : indent)).join('\n');
  }

  function parseHighlights(str) {
    const set = new Set();
    if (!str) return set;
    String(str).split(',').forEach((part) => {
      const [a, b] = part.trim().split('-');
      if (b) { for (let i = Number(a); i <= Number(b); i++) set.add(i); }
      else if (a) set.add(Number(a));
    });
    return set;
  }

  const blocks = [];
  const files = [];

  // Children may arrive wrapped in fragments or intermediate nodes depending on
  // how MDX compiles the page, so walk the tree instead of assuming a flat list
  function collect(node) {
    if (!node) return;
    if (Array.isArray(node)) { node.forEach(collect); return; }
    if (typeof node !== 'object' || !node.props) return;
    if (node.props.url !== undefined) {
      files.push({ ...node.props });
    } else if (node.type === Block || node.props.fname !== undefined) {
      // Blocks may intentionally omit `highlights`; keep them in the
      // explanation flow and render the code without highlighted lines.
      blocks.push({ text: node.props.children, highlight: node.props.highlights, fname: node.props.fname, type: node.props.type });
    } else {
      collect(node.props.children);
    }
  }
  collect(children);

  const activeFname = blocks[activeBlock]?.fname || files[0]?.fname;
  const fileKey = activeFname;
  const currentFile = files.find((f) => f.fname === activeFname) || files[0];

  useEffect(() => {
    const observedEls = Object.entries(blockRefs.current).filter(([, el]) => el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.blockIdx);
          ratioMap.current[idx] = entry.intersectionRatio;
        });
        let bestIdx = -1;
        let bestRatio = 0;
        Object.entries(ratioMap.current).forEach(([idx, ratio]) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = Number(idx);
          }
        });
        if (bestIdx !== -1) {
          setActiveBlock(bestIdx);
        } else {
          const zoneTop = window.innerHeight * 0.2;
          const allAboveZone = Object.entries(blockRefs.current)
            .filter(([, el]) => el)
            .every(([, el]) => el.getBoundingClientRect().bottom < zoneTop);
          if (allAboveZone) setActiveBlock(-1);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-20% 0px -50% 0px' }
    );
    observedEls.forEach(([idx, el]) => {
      el.dataset.blockIdx = idx;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [blocks.length]);

  useEffect(() => {
    if (!currentFile?.url) return;
    setCode(null);
    const rawUrl = toRaw(currentFile.url);
    fetchRaw(rawUrl, currentFile.start, currentFile.end).then(setCode);
  }, [fileKey]);

  const highlighted = parseHighlights(blocks[activeBlock]?.highlight);
  const firstHighlightedLine = highlighted.size > 0 ? Math.min(...highlighted) : null;

  useEffect(() => {
    const container = codeContainerRef.current;
    if (!container || code === null || firstHighlightedLine === null) return;

    const frame = requestAnimationFrame(() => {
      const highlightedLine = container.querySelector(
        `[data-line="${firstHighlightedLine}"], [data-line-number="${firstHighlightedLine}"], pre code > span:nth-child(${firstHighlightedLine})`,
      );

      if (highlightedLine) {
        const offset = highlightedLine.getBoundingClientRect().top - container.getBoundingClientRect().top;
        container.scrollTo({
          top: Math.max(0, container.scrollTop + offset - container.clientHeight / 2 + highlightedLine.clientHeight / 2),
          behavior: 'smooth',
        });
        return;
      }

      const codeElement = container.querySelector('pre code');
      const lineHeight = codeElement ? Number.parseFloat(getComputedStyle(codeElement).lineHeight) : 0;
      container.scrollTo({
        top: Math.max(0, (firstHighlightedLine - 2) * (lineHeight || 24)),
        behavior: 'smooth',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeBlock, code, firstHighlightedLine]);

  return (
    <div className="my-6 not-prose">
      {/* Two-column layout */}
      <div className="flex gap-8 items-start">
        {/* Left: explanation blocks */}
        <div className="flex-[5] flex flex-col gap-3 min-w-0 pb-[40vh]">
          {blocks.map((block, i) => block.type ? (
            <div key={i} ref={(el) => { blockRefs.current[i] = el; }}>
              {block.text}
            </div>
          ) : (
            <div
              key={i}
              ref={(el) => { blockRefs.current[i] = el; }}
              onClick={() => setActiveBlock(i)}
              className={[
                'cursor-pointer rounded-md px-5 py-4 transition-all duration-200 border-l-4 border-indigo-500',
                activeBlock === i ? 'shadow-sm' : 'opacity-60 hover:opacity-90',
              ].join(' ')}
              style={{
                backgroundColor: activeBlock === i
                  ? 'var(--explain-card-active-bg)'
                  : 'var(--explain-card-bg)',
                border: activeBlock === i
                  ? '1px solid var(--explain-card-border)'
                  : '1px solid transparent',
              }}
            >
              {block.text}
            </div>
          ))}
        </div>

        {/* Right: highlighted code */}
        {currentFile && (
          <div className="flex-[6] min-w-0 sticky top-6">
            <div ref={codeContainerRef} className="max-h-[calc(100vh-7rem)] overflow-y-auto">
              {code === null ? (
                <div className="p-4 text-xs text-gray-500 dark:text-gray-400">Loading...</div>
              ) : (
                <CodeBlock
                  key={`${fileKey}-${activeBlock}`}
                  language="rust"
                  filename={currentFile.fname}
                  lines
                  highlight={JSON.stringify([...highlighted])}
                >
                  {code}
                </CodeBlock>
              )}
            </div>
            <div className="mt-1 flex justify-end">
              <a
                href={`${currentFile.url}#L${currentFile.start}-L${currentFile.end}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[0.6875rem] font-medium text-[#656d76] no-underline hover:text-[#1f2328] dark:text-[#8b949e] dark:hover:text-[#e6edf3]"
              >
                See on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export const Block = ({ children }) => {
  return children;
}

export const File = ({ children }) => {
  return children;
}
