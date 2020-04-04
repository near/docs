const { spawn } = require('child_process')
const fetchRepoDir = require('fetch-repo-dir')
const replaceSnippets = require('./replace-snippets.js')

const mainCmd = 'docusaurus-build'

fetchRepoDir(
  {
    src: 'near/near-api-js/docs/nearlib',
    dir: '../docs/near-api-js'
  }, {
    replace: true,
    onDownloadStart: url => console.log(`→ Downloading ${url}`),
    onCopyStart: (_, dest) => console.log(` ↳ Updating ${dest}`),
  }
).then(() => {
  console.log('→ Replacing snippets...')
  const changedFiles = replaceSnippets()

  if (changedFiles.length) {
    console.log(
      ' ↳ Modified files:\n  ',
      changedFiles.map(f => f.file.replace(rootDir + '/', '')).join('\n   ')
    );
  }

  console.log('→ ' + mainCmd)
  spawn(mainCmd, { stdio: 'inherit' })
});
