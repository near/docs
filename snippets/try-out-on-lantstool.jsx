export const TryOutOnLantstool = ({
  path,
  user = 'lantstool',
  repo = 'examples.near-protocol',
  branch = 'main',
}) => {
  const lantstoolUrl = `https://app.lantstool.dev/import/gh/${user}/${repo}/${branch}/${path}`;
  const githubUrl = `https://github.com/${user}/${repo}/blob/${branch}/${path}`;
  const [code, setCode] = useState(null);

  function toRaw(ref) {
    const [org, repoName, , branchName, ...pathSeg] = new URL(ref).pathname.split('/').slice(1);
    return `https://raw.githubusercontent.com/${org}/${repoName}/${branchName}/${pathSeg.join('/')}`;
  }

  useEffect(() => {
    const rawUrl = toRaw(githubUrl);
    (async () => {
      try {
        let res;
        const validUntil = typeof window !== 'undefined' && localStorage.getItem(`${rawUrl}-until`);
        if (validUntil && Number(validUntil) > Date.now()) {
          res = localStorage.getItem(rawUrl);
        }
        if (!res) {
          res = await (await fetch(rawUrl)).text();
          if (typeof window !== 'undefined') {
            localStorage.setItem(rawUrl, res);
            localStorage.setItem(`${rawUrl}-until`, String(Date.now() + 60000));
          }
        }
        setCode(res);
      } catch {
        setCode('Error fetching code, please try reloading');
      }
    })();
  }, [githubUrl]);

  return (
    <div>
      <p>
        Try it out on{' '}
        <a href={lantstoolUrl} target="_blank" rel="noopener noreferrer">
          Lantstool
        </a>
      </p>
      <div className="rounded-[0.625rem] border border-[#d0d7de] dark:border-[#30363d] overflow-hidden my-3 text-[0.8125rem] font-mono shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.18)]">
        <div className="flex items-center gap-2 py-2 px-[0.875rem] bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#656d76] dark:text-[#8b949e]">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="text-xs font-medium text-[#1f2328] dark:text-[#e6edf3]">
            {githubUrl.split('/').pop()}
          </span>
        </div>
        <div className="overflow-auto max-h-[480px] bg-white dark:bg-[#0d1117] [&_tr]:border-b-0 [&_td]:border-b-0">
          {code === null ? (
            <div className="py-5 px-4 text-xs text-[#656d76] dark:text-[#6e7681]">Loading...</div>
          ) : (
            <table className="w-full border-collapse leading-[1.6]">
              <tbody>
                {code.split('\n').map((line, i) => (
                  <tr key={i} className="align-top border-0">
                    <td style={{ minWidth: '60px' }} className="select-none pl-2 pr-3 text-right text-[0.7rem] text-[#8c959f] dark:text-[#3d444d] w-[1%] whitespace-nowrap border-r border-0 border-r-[#d0d7de] dark:border-r-[#21262d]">
                      {i + 1}
                    </td>
                    <td className="pl-4 pr-6 text-[0.8125rem] text-[#1f2328] dark:text-[#e6edf3] whitespace-pre">
                      {line || ' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryOutOnLantstool;
