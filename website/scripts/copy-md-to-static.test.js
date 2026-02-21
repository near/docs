const test = require('node:test');
const assert = require('node:assert/strict');

const { formatCodeBlock } = require('./copy-md-to-static');

test('formatCodeBlock respects inclusive end line numbers', () => {
  const result = formatCodeBlock(
    {
      code: ['line 1', 'line 2', 'line 3', 'line 4'].join('\n'),
      normalizedTag: '<File url="https://example.com/file.js" start="2" end="3" />',
    },
    'js'
  );

  assert.equal(result, '```js\nline 2\nline 3\n```');
});

test('formatCodeBlock returns full content when no range is provided', () => {
  const result = formatCodeBlock(
    {
      code: ['alpha', 'beta'].join('\n'),
      normalizedTag: '<Github url="https://example.com/file.js" />',
    },
    'js'
  );

  assert.equal(result, '```js\nalpha\nbeta\n```');
});
