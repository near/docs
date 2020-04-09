const fs = require('fs')
const { exec, execSync, spawnSync } = require('child_process')
const path = require('path')
const replaceSnippets = require('./replace-snippets.js')

const mainCmd = 'docusaurus-build'
const docsToImport = [
  {
    repo: 'near/near-api-js',
    docs: 'docs/nearlib',
    build: 'yarn && yarn doc'
  }, {
    repo: 'near/near-sdk-as',
    docs: 'docs/near-sdk-as',
    build: 'yarn && yarn doc'
  }, {
    repo: 'near/near-sdk-rs',
    docs: 'target/doc',
    // TODO: make `cargo doc` build docusaurus-compatible markdown files
    build: `mkdir -p target/doc && \
      echo "---\ntitle: near-sdk-rs\nsidebar_label: Rust\n---\n" > target/doc/index.md && \
      cat README.md >> target/doc/index.md`
  },
];

console.log(`→ Building docs for:\n  - ${docsToImport.map(d => d.repo).join('\n  - ')}`)

const rootDir = path.join(__dirname, '../..')
const sourceRoot = path.join(rootDir, '/.source')
const docsRoot = path.join(rootDir, '/docs/api')

execSync(`mkdir -p ${sourceRoot}`, { cwd: rootDir })

Promise.all(docsToImport.map(({ repo, docs, build }) => {
  const [, name] = repo.split('/')
  const cwd = path.join(sourceRoot, name)

  if (!fs.existsSync(cwd)) {
    execSync(`git clone --depth=1 https://github.com/${repo}`, { cwd: sourceRoot })
  }

  execSync('git pull', { cwd })
  execSync(build, { cwd })
  execSync(`./add-custom-edit-url.sh ${sourceRoot}/${name}/${docs} https://github.com/${repo}`, { cwd: __dirname, stdio: 'inherit' })
  return exec(`mv ${docs} ${docsRoot}/${name}`, { cwd })
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
  spawnSync(mainCmd, { stdio: 'inherit' })
}).finally(() => {
  return Promise.all(docsToImport.map(({ repo }) => {
    const [, name] = repo.split('/')
    return exec('rm -rf ' + name, { cwd: docsRoot })
  }))
})
