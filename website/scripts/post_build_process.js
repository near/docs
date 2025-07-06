#!/usr/bin/env node

/**
 * Script to run after the Docusaurus build process
 * Processes all markdown files and copies them alongside HTML files in the build directory
 */

const { processMarkdownFiles } = require('./process_markdown_docs');

console.log('🚀 Starting markdown files post-processing...');
console.log('This script will copy processed .md files alongside .html files in build/');

processMarkdownFiles()
  .then(() => {
    console.log('✅ Post-processing completed successfully!');
    console.log('The .md files are now available alongside .html files in the build/ directory');
  })
  .catch((error) => {
    console.error('❌ Error during post-processing:', error);
    process.exit(1);
  });