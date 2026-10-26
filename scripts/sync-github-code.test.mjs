import assert from 'node:assert/strict';
import test from 'node:test';
import { createLoader, extractCode, renderBlock, syncText } from './sync-github-code.mjs';

const commit = 'a'.repeat(40);
const url = 'https://github.com/example/repo/blob/main/src/lib.rs';
const source = '    first\n      second\n    third\n';
const legacy = `import { Github } from '/snippets/github.jsx'\n\n<Tabs>\n<Tab title="Rust">\n  <Github url="${url}" start="1" end="2" fname="lib.rs" language="rust" />\n</Tab>\n</Tabs>`;

function mockLoader({ sha = commit, status = 200 } = {}) {
  const requests = [];
  const loader = createLoader({ fetchImpl: async (url) => {
    requests.push(url);
    return { ok: status === 200, status, json: async () => ({ sha }), text: async () => source };
  } });
  return { loader, requests };
}

test('extracts inclusive ranges, removes shared indentation, and preserves relative indentation', () => {
  assert.equal(extractCode(source, 1, 2), 'first\n  second');
  assert.equal(extractCode(source, 2), '  second\nthird');
  assert.equal(extractCode(source, undefined, 1), 'first');
  assert.equal(extractCode('  a\r\n\r\n  b\r\n'), 'a\n\nb');
  assert.throws(() => extractCode(source, 1, 4), /exceeds file length/);
});

test('migrates nested embeds to Markdown, with a full commit and a pinned source link', async () => {
  const { loader, requests } = mockLoader();
  const result = await syncText(legacy, loader, { migrate: true });
  assert.equal(result.count, 1);
  assert.ok(result.text.includes('<Tabs>\n<Tab title="Rust">'));
  assert.ok(result.text.includes('```rust title="lib.rs" lines\nfirst\n  second\n```'));
  assert.ok(result.text.includes(`commit: ${commit}`));
  assert.ok(result.text.includes(`/blob/${commit}/src/lib.rs#L1-L2`));
  assert.ok(!result.text.includes('import { Github }'));
  assert.ok(!result.text.includes('<Github'));
  assert.equal(requests[1], `https://raw.githubusercontent.com/example/repo/${commit}/src/lib.rs`);
});

test('shares ref lookups and file downloads across excerpts', async () => {
  const { loader } = mockLoader();
  await syncText(`${legacy}\n<Github url="${url}" start="3" end="3" />`, loader, { migrate: true });
  assert.deepEqual(loader.stats, { lookups: 1, downloads: 1 });
});

test('removing the legacy import preserves the blank line after other imports', async () => {
  const text = `import { Other } from '/snippets/other.jsx'\n${legacy}`;
  const result = await syncText(text, mockLoader().loader, { migrate: true });
  assert.ok(result.text.startsWith("import { Other } from '/snippets/other.jsx'\n\n<Tabs>"));
});

test('a second sync is byte-for-byte unchanged and does not download source files', async () => {
  const initial = await syncText(legacy, mockLoader().loader, { migrate: true });
  const { loader } = mockLoader();
  const result = await syncText(initial.text, loader);
  assert.equal(result.text, initial.text);
  assert.deepEqual(loader.stats, { lookups: 1, downloads: 0 });
});

test('updates old source-link styling without downloading unchanged code', async () => {
  const initial = await syncText(legacy, mockLoader().loader, { migrate: true });
  const oldStyle = initial.text.replace(/<div className="github-source-link">\n\n([^\n]+)\n\n<\/div>/, '$1');
  const { loader } = mockLoader();
  const updated = await syncText(oldStyle, loader);
  assert.equal(updated.text, initial.text);
  assert.equal(loader.stats.downloads, 0);
});

test('new commits and edited ranges regenerate the block', async () => {
  const initial = await syncText(legacy, mockLoader().loader, { migrate: true });
  const { loader } = mockLoader({ sha: 'b'.repeat(40) });
  const updated = await syncText(initial.text, loader);
  assert.ok(updated.text.includes(`commit: ${'b'.repeat(40)}`));
  assert.equal(loader.stats.downloads, 1);
  const rangeLoader = mockLoader().loader;
  const changed = await syncText(initial.text.replace('end: 2', 'end: 3'), rangeLoader);
  assert.ok(changed.text.includes('first\n  second\nthird'));
  assert.equal(rangeLoader.stats.downloads, 1);
});

test('force repairs generated content at the same commit', async () => {
  const initial = await syncText(legacy, mockLoader().loader, { migrate: true });
  const { loader } = mockLoader();
  const repaired = await syncText(initial.text.replace('first\n', 'edited\n'), loader, { force: true });
  assert.equal(repaired.text, initial.text);
});

test('commit-pinned URLs require no API lookup', async () => {
  const { loader } = mockLoader();
  await syncText(legacy.replace('/blob/main/', `/blob/${commit}/`), loader, { migrate: true });
  assert.deepEqual(loader.stats, { lookups: 0, downloads: 1 });
});

test('HTTP errors, unsupported attributes, and invalid ranges fail explicitly', async () => {
  await assert.rejects(syncText(legacy, mockLoader({ status: 404 }).loader, { migrate: true }), /HTTP 404/);
  await assert.rejects(syncText(legacy.replace('end="2"', 'end="99"'), mockLoader().loader, { migrate: true }), /exceeds file length/);
  await assert.rejects(syncText(legacy.replace('start="1"', 'start={dynamic}'), mockLoader().loader, { migrate: true }), /Unsupported/);
});

test('chooses a safe fence when embedded code contains backticks', () => {
  const rendered = renderBlock({ url, commit }, 'const example = ` ``` `;');
  assert.ok(rendered.includes('````rust title="lib.rs" lines'));
  assert.ok(rendered.includes('const example = ` ``` `;\n````'));
});

test('renders highlights relative to the displayed excerpt and preserves them on sync', async () => {
  const highlightedLegacy = legacy.replace('end="2"', 'end="2" highlight="1,2"');
  const initial = await syncText(highlightedLegacy, mockLoader().loader, { migrate: true });
  assert.ok(initial.text.includes('highlight: 1,2'));
  assert.ok(initial.text.includes('```rust title="lib.rs" lines highlight={1,2}\nfirst\n  second\n```'));

  const { loader } = mockLoader();
  const again = await syncText(initial.text, loader);
  assert.equal(again.text, initial.text);
  assert.deepEqual(loader.stats, { lookups: 1, downloads: 0 });
});

test('adding, changing, or removing highlights regenerates the fence presentation', async () => {
  const initial = await syncText(legacy, mockLoader().loader, { migrate: true });

  const { loader: addLoader } = mockLoader();
  const added = await syncText(initial.text.replace('language: rust', 'language: rust\nhighlight: 1'), addLoader);
  assert.ok(added.text.includes('lines highlight={1}'));
  assert.equal(addLoader.stats.downloads, 1);

  const { loader: changeLoader } = mockLoader();
  const changed = await syncText(added.text.replace('highlight: 1', 'highlight: 2'), changeLoader);
  assert.ok(changed.text.includes('lines highlight={2}'));
  assert.equal(changeLoader.stats.downloads, 1);

  const { loader: removeLoader } = mockLoader();
  const removed = await syncText(changed.text.replace('highlight: 2\n', ''), removeLoader);
  assert.ok(!removed.text.includes('highlight:'));
  assert.ok(removed.text.includes('```rust title="lib.rs" lines\n'));
  assert.equal(removeLoader.stats.downloads, 1);
});

test('highlight ranges count from the excerpt rather than the source file', async () => {
  const excerpt = legacy.replace('start="1" end="2"', 'start="2" end="3" highlight="1-2"');
  const initial = await syncText(excerpt, mockLoader().loader, { migrate: true });
  assert.ok(initial.text.includes('lines highlight={1-2}\n  second\nthird\n```'));
  const updated = await syncText(initial.text, mockLoader({ sha: 'b'.repeat(40) }).loader);
  assert.ok(updated.text.includes('highlight: 1-2'));
  assert.ok(updated.text.includes('lines highlight={1-2}\n  second\nthird\n```'));
});

test('rejects malformed and out-of-bounds highlights', async () => {
  for (const highlight of ['0', '1-', '2-1', '1,,2', '1,', ' 1']) {
    const malformed = legacy.replace('end="2"', `end="2" highlight="${highlight}"`);
    await assert.rejects(syncText(malformed, mockLoader().loader, { migrate: true }), /Invalid highlight/);
  }

  const outOfBounds = legacy.replace('end="2"', 'end="2" highlight="3"');
  await assert.rejects(syncText(outOfBounds, mockLoader().loader, { migrate: true }), /exceeds excerpt length 2/);
  assert.throws(() => renderBlock({ url, commit, highlight: '3' }, 'one\ntwo'), /exceeds excerpt length 2/);
});
