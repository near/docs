export const ExplainCode = ({ children, languages }) => {
  const langList = typeof languages === 'string' ? languages.split(',') : (languages || []);
  const [language, setLanguage] = useState(langList[0]);
  const [activeBlock, setActiveBlock] = useState(0);
  const [code, setCode] = useState(null);
  const blockRefs = useRef({});
  const codeContainerRef = useRef(null);
  const ratioMap = useRef({});

  const lang2label = {
    rust: '🦀 Rust',
    js: '🌐 JS',
    ts: '🌐 TS',
    python: '🐍 Python',
    go: '🐹 Go',
  };

  const typeAccentClass = {
    state: 'border-l-4 border-emerald-500',
    warning: 'border-l-4 border-amber-500',
    note: 'border-l-4 border-amber-500',
  };
  const accentBorder = (t) => typeAccentClass[t] || 'border-l-4 border-indigo-500';

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

  const childArray = Array.isArray(children) ? children.flat(Infinity) : (children ? [children] : []);

  const blocks = [];
  const files = [];

  for (const child of childArray) {
    if (!child || typeof child !== 'object' || !child.props) continue;
    if (child.props.highlights !== undefined) {
      let hl = {};
      try { hl = JSON.parse(child.props.highlights); } catch { }
      if (language in hl) {
        blocks.push({ text: child.props.children, highlight: hl[language], fname: child.props.fname, type: child.props.type });
      }
    } else if (child.props.language === language) {
      files.push({ ...child.props });
    }
  }

  const activeFname = blocks[activeBlock]?.fname || files[0]?.fname;
  const fileKey = `${activeFname}-${language}`;
  const currentFile = files.find((f) => f.fname === activeFname) || files[0];

  useEffect(() => {
    setActiveBlock(0);
    setCode(null);
    ratioMap.current = {};
  }, [language]);

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
    const container = codeContainerRef.current;
    if (!container) return;
    const firstHL = container.querySelector('[data-first-hl]');
    if (!firstHL) return;
    const targetScrollTop = container.scrollTop
      + firstHL.getBoundingClientRect().top
      - container.getBoundingClientRect().top
      - container.clientHeight / 2
      + firstHL.offsetHeight / 2;
    container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
  }, [activeBlock]);

  useEffect(() => {
    if (!currentFile?.url) return;
    setCode(null);
    const rawUrl = toRaw(currentFile.url);
    fetchRaw(rawUrl, currentFile.start, currentFile.end).then(setCode);
  }, [fileKey]);

  const startLine = currentFile?.start ? Number(currentFile.start) : 1;
  const highlighted = parseHighlights(blocks[activeBlock]?.highlight);
  const firstHlLine = highlighted.size > 0 ? Math.min(...highlighted) : -1;

  return (
    <div className="my-6 not-prose">
      {/* Language tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {langList.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={[
              'px-4 py-2 text-sm font-medium bg-transparent cursor-pointer',
              'border-0 border-b-2 -mb-px transition-colors outline-none',
              language === lang
                ? 'border-blue-500 text-blue-500 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200',
            ].join(' ')}
          >
            {lang2label[lang] || lang}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 items-start">
        {/* Left: explanation blocks */}
        <div className="flex-[5] flex flex-col gap-3 min-w-0 pb-[40vh]">
          {blocks.map((block, i) => (
            <div
              key={i}
              ref={(el) => { blockRefs.current[i] = el; }}
              onClick={() => !block.type && setActiveBlock(i)}
              className={[
                'px-5 py-4 rounded-md transition-all duration-200',
                block.type
                  ? `cursor-default ${accentBorder(block.type)} opacity-75`
                  : activeBlock === i
                    ? `cursor-pointer ${accentBorder(block.type)} shadow-sm`
                    : `cursor-pointer ${accentBorder(block.type)} opacity-60 hover:opacity-90`,
              ].join(' ')}
              style={{
                backgroundColor: block.type
                  ? 'var(--explain-card-bg)'
                  : activeBlock === i
                    ? 'var(--explain-card-active-bg)'
                    : 'var(--explain-card-bg)',
                border: (!block.type && activeBlock === i)
                  ? '1px solid var(--explain-card-border)'
                  : '1px solid transparent',
              }}
            >
              {block.text}
            </div>
          ))}
        </div>

        {/* Right: code panel */}
        {currentFile && (
          <div className="flex-[6] min-w-0 rounded-[10px] border border-[#d0d7de] dark:border-[#30363d] overflow-hidden sticky top-6 max-h-[calc(100vh-5rem)] flex flex-col shadow-md bg-white dark:bg-[#0d1117]">
            {/* Header */}
            <div className="flex items-center justify-between px-[14px] py-2 bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d] shrink-0">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" className="fill-[#657279] dark:fill-[#8b949e]">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-[0.8125rem] font-medium text-[#1f2328] dark:text-[#e6edf3]">{currentFile.fname}</span>
              </div>
              <a
                href={`${currentFile.url}#L${currentFile.start}-L${currentFile.end}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[0.6875rem] no-underline flex items-center gap-1 transition-colors text-[#656d76] dark:text-[#8b949e] hover:text-[#1f2328] dark:hover:text-[#e6edf3]"
              >
                View on GitHub
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Code */}
            <div className="overflow-auto flex-1" ref={codeContainerRef}>
              {code === null ? (
                <div className="p-4 text-xs text-gray-500 dark:text-gray-400">Loading...</div>
              ) : (
                <table className="w-full border-collapse font-mono text-[13px] leading-relaxed">
                  <tbody>
                    {code.split('\n').map((line, i) => {
                      const lineNum = startLine + i;
                      const isHL = highlighted.has(i + 1);
                      return (
                        <tr key={i} {...(i + 1 === firstHlLine ? { 'data-first-hl': '' } : {})} style={isHL ? { backgroundColor: 'rgba(250,204,21,0.08)' } : undefined}>
                          <td style={{ minWidth: '70px' }} className="py-0 pl-3 pr-3 text-right text-[0.7rem] text-[#8c959f] dark:text-gray-400 w-12 min-w-[3rem] whitespace-nowrap border-r border-[#d0d7de] dark:border-gray-700 select-none align-top">
                            {lineNum}
                          </td>
                          <td style={isHL ? { borderLeft: '2px solid #facc15' } : undefined} className="pl-4 pr-6 whitespace-pre text-[#1f2328] dark:text-[#e6edf3] align-top">
                            {line || ' '}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
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