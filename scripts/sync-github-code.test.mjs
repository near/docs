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
