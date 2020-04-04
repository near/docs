const fs = require("fs");
const path = require('path')
const replace = require('replace-in-file')
const snippets = require('../snippets')

const files = [
  path.join(__dirname, '/../tests/*'),
  path.join(__dirname, '/../../docs/**/*')
]

module.exports = function replaceSnippets() {
  try {
    return snippets.map(({ from, to }) => {
      const modified = replace.sync({ files, from, to }).filter(f => f.hasChanged)
      if (modified.length === 0) {
        console.log(`WARNING: snippet '${from}' not used (you can probably remove it from snippets.js)`)
      }
      return modified
    }).flat()
  }
  catch (error) {
    console.error('Error occurred:', error)
  }
}
