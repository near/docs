import { Github } from '../codetabs';

/**
 * Lantstool link looks like this:
 * https://app.lantstool.dev/import/gh/lantstool/examples.near-protocol/main/path-to-file.json
 * GitHub link looks like this:
 * https://github.com/lantstool/examples.near-protocol/blob/main/path-to-file.json
 */

export const TryOutOnLantstool = ({
  user = 'lantstool',
  repo = 'examples.near-protocol',
  branch = 'main',
  path,
}) => (
  <>
    <p>
      Try it out on{' '}
      <a
        href={`https://app.lantstool.dev/import/gh/${user}/${repo}/${branch}/${path}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lantstool
      </a>
    </p>
    <Github
      language="json"
      url={`https://github.com/${user}/${repo}/blob/${branch}/${path}`}
      withSourceLink={false}
    />
  </>
);
