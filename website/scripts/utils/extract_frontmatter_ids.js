#!/usr/bin/env node
/**
 * Script to create a dictionary of front matter IDs and actual file paths.
 * Reads all markdown files from the docs directory and extracts their IDs from front matter.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Finds all markdown files recursively in a directory
 * @param {string} dir - Directory to explore
 * @param {string[]} fileList - Accumulated list of files
 * @returns {string[]} List of markdown file paths
 */
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Extracts the ID from a markdown file's front matter
 * @param {string} filePath - File path
 * @returns {string|null} Front matter ID or null if it doesn't exist
 */
function extractFrontmatterId(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return data.id || null;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Removes numeric prefixes from file paths
 * @param {string} pathStr - File path
 * @returns {string} Path without numeric prefixes
 */
function removeNumericPrefixes(pathStr) {
  return pathStr
    .split('/')
    .map(part => {
      // Remove numeric prefixes like "01-", "02-", "00-", etc.
      return part.replace(/^\d+-/, '');
    })
    .join('/');
}

/**
 * Creates a dictionary of front matter IDs and file paths
 * @param {string} docsDir - Root docs directory
 * @returns {Object} Dictionary with IDs as keys and paths as values
 */
function createFrontmatterDictionary(docsDir) {
  const markdownFiles = findMarkdownFiles(docsDir);
  const frontmatterDict = {};
  const filesWithoutIds = [];
  
  console.log(`📁 Found ${markdownFiles.length} markdown/mdx files`);
  
  let filesWithIds = 0;
  let filesWithoutIdsCount = 0;
  
  markdownFiles.forEach(filePath => {
    const frontmatterId = extractFrontmatterId(filePath);
    const relativePath = path.relative(docsDir, filePath);
    
    // Create hierarchical ID based on file path
    const pathWithoutExtension = relativePath.replace(/\.(md|mdx)$/, '');
    
    let hierarchicalId;
    if (frontmatterId) {
      // If there's a front matter ID, use directory path + ID
      const dirPath = path.dirname(pathWithoutExtension);
      if (dirPath === '.') {
        // File in root
        hierarchicalId = frontmatterId;
      } else {
        // File in subdirectory - remove numeric prefixes
        const cleanDirPath = removeNumericPrefixes(dirPath);
        hierarchicalId = `${cleanDirPath}/${frontmatterId}`;
      }
      filesWithIds++;
    } else {
      // If no ID, use complete file path without numeric prefixes
      hierarchicalId = removeNumericPrefixes(pathWithoutExtension);
      filesWithoutIdsCount++;
      filesWithoutIds.push(relativePath);
    }
    
    // Normalize slashes to always use /
    hierarchicalId = hierarchicalId.replace(/\\/g, '/');
    
    // If ID already exists, create array with multiple paths
    if (frontmatterDict[hierarchicalId]) {
      if (Array.isArray(frontmatterDict[hierarchicalId])) {
        frontmatterDict[hierarchicalId].push(relativePath);
      } else {
        frontmatterDict[hierarchicalId] = [frontmatterDict[hierarchicalId], relativePath];
      }
    } else {
      frontmatterDict[hierarchicalId] = relativePath;
    }
  });
  
  console.log(`✅ Files with ID: ${filesWithIds}`);
  console.log(`❌ Files without ID: ${filesWithoutIdsCount}`);
  
  return { frontmatterDict, filesWithoutIds };
}

/**
 * Main script function
 */
function main() {
  // Docs directory (relative to website directory)
  const docsDir = path.join(__dirname, '../../../docs');
  
  if (!fs.existsSync(docsDir)) {
    console.error(`❌ Error: Directory ${docsDir} does not exist`);
    process.exit(1);
  }
  
  console.log(`🔍 Processing files in: ${docsDir}`);
  
  // Create dictionary
  const { frontmatterDict, filesWithoutIds } = createFrontmatterDictionary(docsDir);
  
  // Show results
  console.log('\n📊 === RESULTS ===');
  console.log(`📝 Total unique IDs found: ${Object.keys(frontmatterDict).length}`);
  
  // Show some examples
  console.log('\n🔍 === EXAMPLES ===');
  let count = 0;
  for (const [id, paths] of Object.entries(frontmatterDict)) {
    if (count < 10) {
      console.log(`ID: '${id}' -> Path: ${Array.isArray(paths) ? paths.join(', ') : paths}`);
      count++;
    } else {
      break;
    }
  }
  
  // Show all files without IDs
  if (filesWithoutIds.length > 0) {
    console.log(`\n📋 === ALL FILES WITHOUT IDs (${filesWithoutIds.length}) ===`);
    filesWithoutIds.forEach(filePath => {
      console.log(`📄 ${filePath}`);
    });
  }
  
  // Save to JSON file
  const outputFile = path.join(__dirname, '../frontmatter_ids.json');
  fs.writeFileSync(outputFile, JSON.stringify(frontmatterDict, null, 2), 'utf8');
  
  console.log(`\n💾 Dictionary saved to: ${outputFile}`);
  
  // Show duplicate IDs if they exist
  const duplicates = Object.entries(frontmatterDict)
    .filter(([_, paths]) => Array.isArray(paths))
    .reduce((acc, [id, paths]) => {
      acc[id] = paths;
      return acc;
    }, {});
  
  if (Object.keys(duplicates).length > 0) {
    console.log(`\n⚠️  === DUPLICATE IDs (${Object.keys(duplicates).length}) ===`);
    for (const [id, paths] of Object.entries(duplicates)) {
      console.log(`ID: '${id}' -> Files: ${paths.join(', ')}`);
    }
  }
  
  console.log('\n✨ Process completed successfully!');
}

// Execute script if called directly
if (require.main === module) {
  main();
}

module.exports = {
  createFrontmatterDictionary,
  extractFrontmatterId,
  findMarkdownFiles,
  generateFrontmatterDictionary: main
};