#!/usr/bin/env node
/**
 * Sync GitHub examples into static Markdown code blocks and pinned source links.
 * Run from the docs repository root with Node.js 20.17+; no packages to install.
 *
 *   node scripts/sync-github-code.mjs                 Refresh all examples
 *   node scripts/sync-github-code.mjs path/to/page.mdx Refresh a specific page
 *   node scripts/sync-github-code.mjs --check         Check without writing files
 *   node scripts/sync-github-code.mjs --force         Regenerate at the same commit
 *   node scripts/sync-github-code.mjs --migrate       Convert legacy <Github /> tags
 *
 * Each example keeps its URL, last synced commit, and optional start/end lines,
 * fname, language, and highlight lines in a github-code comment. Edit that
 * metadata to update an example; omit commit on a new block so the script
 * populates it. Source and highlight line numbers are one-based and inclusive.
 * Highlight numbers are relative to the displayed excerpt. Full commit SHAs in
 * source URLs pin examples.
 *
 * Repository ref lookups and file downloads are shared within each run. Source
 * downloads are skipped when the commit and presentation metadata are unchanged.
 * --check still queries GitHub and exits 1 when updates would change files.
 * Fetch or validation failures abort before any pages are written.
 *
 * Optional authentication: GITHUB_TOKEN, GH_TOKEN, or an authenticated gh CLI.
 * Review the generated diff before committing; upstream changes can shift ranges.
 * See README.md, "Sync code examples from GitHub", for the metadata template.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const keys = new Set(['url', 'commit', 'start', 'end', 'fname', 'language', 'highlight']);
const blocks = /^[\t ]*\{\/\* github-code\r?\n([\s\S]*?)\*\/\}[^\n]*\n[\s\S]*?^[\t ]*\{\/\* \/github-code \*\/\}/gm;
const embeds = /^[\t ]*<Github\b([\s\S]*?)\/>/gm;

export function parseSource(url) {
  const parsed = new URL(url);
  const match = parsed.pathname.match(/^\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/);
  if (parsed.hostname !== 'github.com' || !match) throw new Error(`Expected a GitHub blob URL: ${url}`);
  const [, owner, repo, encodedRef, path] = match;
  return { owner, repo, ref: decodeURIComponent(encodedRef), path };
}

function validate(meta) {
  for (const key of Object.keys(meta)) if (!keys.has(key)) throw new Error(`Unknown metadata: ${key}`);
  parseSource(meta.url);
  if (meta.commit && !/^[a-f0-9]{40}$/.test(meta.commit)) throw new Error('commit must be a full SHA');
  for (const key of ['start', 'end']) {
    if (meta[key] !== undefined && !/^[1-9]\d*$/.test(String(meta[key]))) throw new Error(`Invalid ${key}: ${meta[key]}`);
  }
  if (meta.end && Number(meta.end) < Number(meta.start ?? 1)) throw new Error('end precedes start');
  if (meta.language && !/^[\w+-]+$/.test(meta.language)) throw new Error('Invalid language');
  if (meta.highlight !== undefined) {
    if (typeof meta.highlight !== 'string' || !/^[1-9]\d*(?:-[1-9]\d*)?(?:,[1-9]\d*(?:-[1-9]\d*)?)*$/.test(meta.highlight)) {
      throw new Error(`Invalid highlight: ${meta.highlight}`);
    }
    for (const part of meta.highlight.split(',')) {
      const [from, to = from] = part.split('-').map(Number);
      if (to < from) throw new Error(`Invalid highlight range: ${part}`);
    }
  }
  if (Object.values(meta).some(value => /[\r\n]|\*\//.test(String(value)))) throw new Error('Unsafe metadata value');
}

function validateHighlightBounds(highlight, code) {
  if (!highlight) return;
  const lineCount = code.split('\n').length;
  for (const part of highlight.split(',')) {
    const range = part.split('-').map(Number);
    const to = range[1] ?? range[0];
    if (to > lineCount) throw new Error(`Highlight ${part} exceeds excerpt length ${lineCount}`);
  }
}

export function extractCode(text, start, end) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines.at(-1) === '') lines.pop();
  const from = Number(start ?? 1), to = Number(end ?? lines.length);
  if (from > lines.length || to > lines.length) throw new Error(`Range ${from}-${to} exceeds file length ${lines.length}`);
  const selected = lines.slice(from - 1, to);
  const nonempty = selected.filter(line => line.trim());
  const indent = nonempty.length ? Math.min(...nonempty.map(line => line.match(/^\s*/)[0].length)) : 0;
  return selected.map(line => line.slice(indent)).join('\n');
}

function presentation(meta) {
  const source = parseSource(meta.url);
  const fname = meta.fname ?? decodeURIComponent(source.path.split('/').at(-1));
  const languages = { rs: 'rust', js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx', toml: 'toml', json: 'json', py: 'python', sh: 'bash' };
  const language = meta.language ?? languages[extname(source.path).slice(1)] ?? 'text';
  const anchor = meta.start ? `#L${meta.start}${meta.end ? `-L${meta.end}` : ''}` : meta.end ? `#L1-L${meta.end}` : '';
  const href = `https://github.com/${source.owner}/${source.repo}/blob/${meta.commit}/${source.path}${anchor}`;
  const highlight = meta.highlight ? ` highlight={${meta.highlight}}` : '';
  return { header: `${language} title=${JSON.stringify(fname)} lines${highlight}`, link: `[See code on GitHub](${href})` };
}

function sourceLink(link) {
  return `<div className="github-source-link">\n\n${link}\n\n</div>`;
}

export function renderBlock(meta, code) {
  validate(meta);
  validateHighlightBounds(meta.highlight, code);
  const { header, link } = presentation(meta);
  const longestFence = Math.max(0, ...Array.from(code.matchAll(/`+/g), match => match[0].length));
  const fence = '`'.repeat(Math.max(3, longestFence + 1));
  const metadata = [...keys].filter(key => meta[key] !== undefined).map(key => `${key}: ${meta[key]}`).join('\n');
  return `{/* github-code\n${metadata}\n*/}\n\n${fence}${header}\n${code}\n${fence}\n\n${sourceLink(link)}\n\n{/* /github-code */}`;
}

function parseMetadata(text) {
  const meta = {};
  for (const line of text.trim().split('\n')) {
    const match = line.trim().match(/^(\w+):\s*(.*)$/);
    if (!match || Object.hasOwn(meta, match[1])) throw new Error(`Invalid metadata line: ${line}`);
    meta[match[1]] = match[2];
  }
  validate(meta);
  return meta;
}

function parseAttributes(text) {
  const meta = {};
  const remainder = text.replace(/(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{(true|false)\})/g, (_, key, double, single, bool) => {
    meta[key] = bool === undefined ? double ?? single : bool === 'true';
    return '';
  });
  if (remainder.trim()) throw new Error(`Unsupported Github attributes: ${remainder}`);
  validate(meta);
  return meta;
}

export function createLoader({ fetchImpl = fetch, token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN } = {}) {
  const commits = new Map(), files = new Map();
  const stats = { lookups: 0, downloads: 0 };
  async function request(url, api = false) {
    const headers = api ? { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } : {};
    const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return api ? response.json() : response.text();
  }
  return {
    stats,
    async commit(source) {
      if (/^[a-f0-9]{40}$/.test(source.ref)) return source.ref;
      const key = `${source.owner}/${source.repo}/${source.ref}`;
      if (!commits.has(key)) {
        stats.lookups++;
        commits.set(key, request(`https://api.github.com/repos/${source.owner}/${source.repo}/commits/${encodeURIComponent(source.ref)}`, true).then(data => {
          if (!/^[a-f0-9]{40}$/.test(data.sha)) throw new Error(`Invalid commit for ${key}`);
          return data.sha;
        }));
      }
      return commits.get(key);
    },
    async file(source, commit) {
      const url = `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${commit}/${source.path}`;
      if (!files.has(url)) {
        stats.downloads++;
        files.set(url, request(url));
      }
      return files.get(url);
    },
  };
}

export async function syncText(text, loader, { migrate = false, force = false } = {}) {
  const matches = [...text.matchAll(blocks)].map(match => ({ match, meta: parseMetadata(match[1]), existing: true }));
  if (migrate) {
    for (const match of text.matchAll(embeds)) {
      if (!matches.some(block => match.index >= block.match.index && match.index < block.match.index + block.match[0].length)) {
        matches.push({ match, meta: parseAttributes(match[1]), existing: false });
      }
    }
  }
  matches.sort((a, b) => a.match.index - b.match.index);
  const replacements = [];
  for (const { match, meta, existing } of matches) {
    const source = parseSource(meta.url);
    const commit = await loader.commit(source);
    const updated = { ...meta, commit };
    const { header, link } = presentation(updated);
    const fenceHeader = match[0].match(/(?:^|\n)`{3,}([^\n]*)\n/)?.[1];
    const unchanged = existing && meta.commit === commit && fenceHeader === header && match[0].includes(link);
    if (unchanged && !force) {
      // Refresh link presentation without downloading unchanged source files.
      const value = match[0].replace(`\n\n${link}\n\n{/* /github-code */}`, `\n\n${sourceLink(link)}\n\n{/* /github-code */}`);
      if (value !== match[0]) replacements.push({ match, value });
      continue;
    }
    const file = await loader.file(source, commit);
    const code = extractCode(file, meta.start, meta.end);
    replacements.push({ match, value: renderBlock(updated, code) });
  }
  for (const { match, value } of replacements.reverse()) {
    text = text.slice(0, match.index) + value + text.slice(match.index + match[0].length);
  }
  if (migrate && !/<Github\b/.test(text)) {
    text = text.replace(/^import\s+\{\s*Github\s*\}\s+from\s+['"]\/snippets\/github\.jsx['"];?[\t ]*\r?\n/gm, '');
  }
  return { text, count: matches.length };
}

async function collect(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...await collect(full));
    else if (entry.name.endsWith('.mdx')) files.push(full);
  }
  return files.sort();
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log('Usage: node scripts/sync-github-code.mjs [--migrate] [--force] [--check] [page.mdx ...]\n\n--migrate  Convert legacy Github components\n--force    Fetch and regenerate even when the commit matches\n--check    Report pending changes without writing files\n\nRequires Node.js 20.17+. GITHUB_TOKEN or GH_TOKEN is optional.');
    return;
  }
  const options = { migrate: args.includes('--migrate'), force: args.includes('--force') };
  const unknown = args.find(arg => arg.startsWith('--') && !['--migrate', '--force', '--check'].includes(arg));
  if (unknown) throw new Error(`Unknown option: ${unknown}`);
  const targets = args.filter(arg => !arg.startsWith('--'));
  const files = targets.length ? targets.map(path => resolve(path)) : await collect(process.cwd());
  let token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (!token) {
    try { token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
    catch { /* Public repositories also work without authentication. */ }
  }
  const loader = createLoader({ token });
  const pending = [], errors = [];
  let count = 0;
  for (const path of files) {
    const original = await readFile(path, 'utf8');
    if (!original.includes('github-code') && !(options.migrate && original.includes('<Github'))) continue;
    try {
      const result = await syncText(original, loader, options);
      count += result.count;
      if (result.text !== original) pending.push({ path, text: result.text });
    } catch (error) {
      errors.push(`${path}: ${error.message}`);
    }
  }
  // Fetch and validate everything before writing, so failures leave the docs intact.
  if (errors.length) throw new Error(errors.join('\n'));
  if (!args.includes('--check')) for (const file of pending) await writeFile(file.path, file.text);
  console.log(`${count} blocks; ${pending.length} pages ${args.includes('--check') ? 'would change' : 'updated'}; ${loader.stats.lookups} ref lookups; ${loader.stats.downloads} file downloads.`);
  if (args.includes('--check') && pending.length) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
