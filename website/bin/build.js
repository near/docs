const fs = require('fs')
const { exec, execSync, spawn } = require('child_process')
const path = require('path')
const replaceSnippets = require('./replace-snippets.js')

const mainCmd = 'docusaurus-build'
const docsToImport = [
  { repo: 'https://github.com/near/near-api-js', docsDir: 'docs/nearlib' },
];

console.log(`→ Building docs for:\n  - ${docsToImport.map(d => d.repo).join('\n  - ')}`)

const rootDir = path.join(__dirname, '../..')
const sourceRoot = path.join(rootDir, '/.source')
const docsRoot = path.join(rootDir, '/docs')

execSync(`mkdir -p ${sourceRoot}`, { cwd: rootDir })

Promise.all(docsToImport.map(({ repo, docsDir }) => {
  const repoParts = repo.split('/')
  const name = repoParts[repoParts.length - 1]
  const cwd = path.join(sourceRoot, name)

  if (!fs.existsSync(cwd)) {
    execSync(`git clone --depth=1 ${repo}`, { cwd: sourceRoot })
  }

  execSync('git pull', { cwd })
  execSync('yarn && yarn doc', { cwd })
  return exec(`mv ${docsDir} ${docsRoot}`, { cwd })
})).then(() => {
  console.log('→ Replacing snippets...')
  const changedFiles = replaceSnippets()

  if (changedFiles.length) {
    console.log(
      ' ↳ Modified files:\n  ',
      changedFiles.map(f => f.file.replace(rootDir + '/', '')).join('\n   ')
    );
  }

  console.log('→ ' + mainCmd)
  return spawn(mainCmd, { stdio: 'inherit' })
}).finally(() => {
  return Promise.all(docsToImport.map(({ docsDir }) => {
    const dirParts = docsDir.split('/')
    const dir = dirParts[dirParts.length - 1]
    return exec('rm -rf ' + dir, { cwd: docsRoot })
  }))
})
