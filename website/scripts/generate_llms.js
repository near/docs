#!/usr/bin/env node
/**
 * Auto-generate llms.txt from NEAR documentation structure.
 * This script scans the docs directory and creates a comprehensive llms.txt file
 * for LLM consumption based on the actual documentation structure.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

class LLMsTxtGenerator {
    constructor(docsDir = './docs', baseUrl = 'https://docs.near.org') {
        this.docsDir = path.resolve(docsDir);
        this.baseUrl = baseUrl;
        this.pages = [];
        
        // Define section priorities and names
        this.sections = {
            "protocol": { name: "Core Protocol", priority: 1 },
            "ai": { name: "AI and Agents", priority: 2 },
            "chain-abstraction": { name: "Chain Abstraction", priority: 3 },
            "smart-contracts": { name: "Smart Contracts", priority: 4 },
            "web3-apps": { name: "Web3 Applications", priority: 5 },
            "primitives": { name: "Tokens and Primitives", priority: 6 },
            "tools": { name: "Developer Tools", priority: 7 },
            "tutorials": { name: "Tutorials and Examples", priority: 8 },
            "api": { name: "API Reference", priority: 9 },
            "data-infrastructure": { name: "Data Infrastructure", priority: 10 },
            "integrations": { name: "Integration Examples", priority: 11 },
            "resources": { name: "Resources", priority: 12 }
        };
    }

    /**
     * Fetch content from a URL using Node.js built-in modules with timeout
     */
    async fetchUrl(url, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;
            
            const timer = setTimeout(() => {
                reject(new Error('Request timeout'));
            }, timeout);
            
            client.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    clearTimeout(timer);
                    resolve(data);
                });
            }).on('error', (err) => {
                clearTimeout(timer);
                reject(err);
            });
        });
    }

    /**
     * Replace Github components with actual code content
     */
    async replaceGithubWithCode(content) {
        const githubMatches = content.match(/<Github\s[^>]*?\/>/g) || [];
        let formatted = content;

        console.log(`Found ${githubMatches.length} GitHub components to process...`);

        for (let i = 0; i < githubMatches.length; i++) {
            const gh = githubMatches[i];
            try {
                process.stdout.write(`\rProcessing GitHub component ${i + 1}/${githubMatches.length}...`);
                
                const ghNormalized = gh.replace(/'/g, '"');
                const urlMatch = ghNormalized.match(/url="(.*?)"/);
                
                if (!urlMatch) continue;
                
                let url = urlMatch[1];
                url = url.split('#')[0]; // Remove fragment
                
                const urlParts = new URL(url).pathname.substring(1).split('/');
                if (urlParts.length < 5) continue;
                
                const [org, repo, , branch, ...pathSegments] = urlParts;
                const pathSeg = pathSegments.join('/');
                const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg}`;
                
                const code = await this.fetchUrl(rawUrl, 3000); // 3 second timeout
                
                // Cut based on line numbers
                const startMatch = gh.match(/start="(\d*)"/);
                const endMatch = gh.match(/end="(\d*)"/);
                
                const lines = code.split('\n');
                const start = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
                const end = endMatch ? parseInt(endMatch[1]) + 1 : lines.length;
                
                const extractedCode = lines.slice(start, end).join('\n');
                formatted = formatted.replace(gh, `\`\`\`\n${extractedCode}\n\`\`\``);
                
            } catch (error) {
                console.warn(`\nFailed to fetch GitHub content for: ${gh} - ${error.message}`);
                // Remove the Github component if we can't fetch it
                formatted = formatted.replace(gh, '');
            }
        }

        if (githubMatches.length > 0) {
            console.log('\n'); // New line after processing
        }

        return formatted;
    }

    /**
     * Clean and curate content for LLM consumption
     */
    async cleanContent(content) {
        // Remove all import statements
        content = content.replace(/import .*?\n/g, '');

        // Remove frontmatter metadata
        const groups = content.split('---');
        if (groups.length >= 3) {
            content = content.replace(groups[1], '').replace('------\n\n', '');
        }

        // Load all the code blocks from Github (only if there are Github components)
        // if (content.includes('<Github')) {
        //     content = await this.replaceGithubWithCode(content);
        // }

        // Temporarily replace code blocks with placeholders to protect them
        const codeBlocks = content.match(/```.*?```/gs) || [];
        const placeholders = codeBlocks.map((_, i) => `__CODE_BLOCK_${i}__`);

        codeBlocks.forEach((block, i) => {
            content = content.replace(block, placeholders[i]);
        });

        // Remove HTML tags and iframes
        content = content.replace(/<iframe.*?<\/iframe>/gs, '');
        content = content.replace(/<.*?>/g, '');

        // Remove apostrophes (Let's becomes Lets)
        content = content.replace(/'(.)/g, '$1');

        // Restore code blocks
        placeholders.forEach((placeholder, i) => {
            content = content.replace(placeholder, codeBlocks[i]);
        });

        // Clean up extra whitespace
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        content = content.trim();

        return content;
    }

    /**
     * Extract frontmatter from markdown content
     */
    extractFrontmatter(content) {
        const frontmatter = {};
        let body = content;

        if (content.startsWith('---\n')) {
            const endIndex = content.indexOf('\n---\n', 4);
            if (endIndex !== -1) {
                const frontmatterText = content.substring(4, endIndex);
                body = content.substring(endIndex + 5);
                
                // Simple YAML parsing for common fields
                const lines = frontmatterText.split('\n');
                for (const line of lines) {
                    const colonIndex = line.indexOf(':');
                    if (colonIndex > 0) {
                        const key = line.substring(0, colonIndex).trim();
                        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
                        frontmatter[key] = value;
                    }
                }
            }
        }

        return { frontmatter, body };
    }

    /**
     * Extract title and description from a markdown file
     */
    async extractTitleAndDescription(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const { frontmatter, body } = this.extractFrontmatter(content);
            
            // Get title from frontmatter or first H1
            let title = frontmatter.title || '';
            if (!title) {
                const h1Match = body.match(/^#\s+(.+)$/m);
                if (h1Match) {
                    title = h1Match[1].trim();
                } else {
                    // Fallback to filename
                    title = path.basename(filePath, '.md').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }
            }

            // Get description - prioritize content over sidebar_label
            let description = '';
            
            // First try to extract from content
            let contentToProcess = body;
            contentToProcess = await this.cleanContent(content);
            
            // Extract first meaningful paragraph - look for complete sentences
            const lines = contentToProcess.split('\n');
            let descriptionParts = [];
            let currentSentence = '';
            
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed && 
                    !trimmed.startsWith('#') && 
                    !trimmed.startsWith('import') && 
                    !trimmed.startsWith(':::') &&
                    !trimmed.startsWith('![') && // Skip image lines
                    !trimmed.startsWith('---') && // Skip separators
                    !trimmed.startsWith('_Credits') && // Skip credit lines
                    trimmed.length > 10) {
                    
                    // Clean up any remaining markdown formatting
                    const cleaned = trimmed.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
                    
                    // Add to current sentence
                    currentSentence += (currentSentence ? ' ' : '') + cleaned;
                    
                    // Check if we have a complete sentence or enough content
                    if (cleaned.endsWith('.') || cleaned.endsWith('!') || cleaned.endsWith('?')) {
                        descriptionParts.push(currentSentence);
                        currentSentence = '';
                        
                        // Stop if we have enough content
                        if (descriptionParts.join(' ').length > 100) {
                            break;
                        }
                    }
                }
            }
            
            // If we have partial sentence, add it
            if (currentSentence && descriptionParts.length === 0) {
                descriptionParts.push(currentSentence);
            }
            
            description = descriptionParts.join(' ').trim();
            
            // If description is too short or empty, try to get more context
            if (description.length < 30) {
                // Try to get a longer chunk from the beginning
                const cleanLines = contentToProcess.split('\n').filter(line => {
                    const trimmed = line.trim();
                    return trimmed && 
                           !trimmed.startsWith('#') && 
                           !trimmed.startsWith('import') && 
                           !trimmed.startsWith(':::') &&
                           !trimmed.startsWith('![') &&
                           !trimmed.startsWith('---') &&
                           !trimmed.startsWith('_Credits') &&
                           trimmed.length > 10;
                });
                
                if (cleanLines.length > 0) {
                    // Take first few lines and clean them
                    const firstFewLines = cleanLines.slice(0, 3).join(' ');
                    description = firstFewLines.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim();
                }
            }
            
            // If still no good description found from content, fall back to sidebar_label
            if (!description || description.length < 20) {
                description = frontmatter.sidebar_label || '';
            }
            
            // Final fallback to title if still no description
            if (!description) {
                description = title;
            }

            return { title, description };
            
        } catch (error) {
            console.warn(`Error reading ${filePath}: ${error.message}`);
            const title = path.basename(filePath, '.md').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return { title, description: '' };
        }
    }

    /**
     * Determine section from file path
     */
    getSectionFromPath(relativePath) {
        const parts = relativePath.split('/');
        if (parts.length > 1) {
            const firstDir = parts[0];
            if (this.sections[firstDir]) {
                return firstDir;
            }
        }
        return 'other';
    }

    /**
     * Recursively find all markdown files
     */
    findMarkdownFiles(dir, basePath = '') {
        const files = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.join(basePath, entry.name);

            if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                files.push(...this.findMarkdownFiles(fullPath, relativePath));
            } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))  && !entry.name.startsWith('.')) {
                files.push({ fullPath, relativePath });
            }
        }

        return files;
    }

    /**
     * Scan the docs directory and collect all markdown files
     */
    async scanDocs() {
        if (!fs.existsSync(this.docsDir)) {
            throw new Error(`Docs directory not found: ${this.docsDir}`);
        }

        const markdownFiles = this.findMarkdownFiles(this.docsDir);
        console.log(`Found ${markdownFiles.length} markdown files to process...`);

        for (let i = 0; i < markdownFiles.length; i++) {
            const { fullPath, relativePath } = markdownFiles[i];
            
            // Progress indicator
            process.stdout.write(`\rProcessing file ${i + 1}/${markdownFiles.length}`);
            
            // Skip root level files except index and help
            const pathParts = relativePath.split('/');
            if (pathParts.length === 1 && !['index.md', 'help.md'].includes(pathParts[0])) {
                continue;
            }

            const { title, description } = await this.extractTitleAndDescription(fullPath);
            const section = this.getSectionFromPath(relativePath);

            // Create URL
            let urlPath = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
            if (urlPath.endsWith('/index')) {
                urlPath = urlPath.slice(0, -6); // Remove /index
            }
            const url = `${this.baseUrl}/${urlPath}`;

            // Set priority based on filename and section
            let priority = this.sections[section]?.priority || 99;
            if (relativePath.includes('what-is.md')) {
                priority -= 10; // Prioritize "what-is" pages
            } else if (relativePath.includes('introduction.md')) {
                priority -= 5;
            } else if (relativePath.includes('index.md')) {
                priority -= 8;
            }

            this.pages.push({
                title,
                description,
                path: relativePath,
                url,
                section,
                priority
            });
        }

        console.log(`\nProcessed ${this.pages.length} pages successfully.`);
    }

    /**
     * Generate the header section of llms.txt
     */
    generateHeader() {
        return `# NEAR Protocol Documentation

> NEAR is a layer-1 blockchain built for scale and multichain compatibility, featuring AI-native infrastructure and chain abstraction capabilities. This documentation covers smart contracts, Web3 applications, AI agents, cross-chain development, and the complete NEAR ecosystem.

NEAR Protocol is a proof-of-stake blockchain that enables developers to build decentralized applications with seamless user experiences. Key features include human-readable account names, minimal transaction fees, and built-in developer tools. The platform supports multiple programming languages and provides chain abstraction for cross-blockchain interactions.

This documentation is organized into several main sections: Protocol fundamentals, AI and agent development, chain abstraction features, smart contract development, Web3 application building, and comprehensive API references. Each section includes tutorials, examples, and detailed technical specifications.

`;
    }

    /**
     * Generate a section of the llms.txt
     */
    generateSection(sectionKey, pages) {
        if (!pages.length) return '';

        const sectionInfo = this.sections[sectionKey] || { name: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) };
        const sectionName = sectionInfo.name;

        // Sort pages by priority and title
        const sortedPages = pages.sort((a, b) => {
            if (a.priority !== b.priority) return a.priority - b.priority;
            return a.title.localeCompare(b.title);
        });

        // Limit to most important pages per section
        const maxPages = ['tutorials', 'api'].includes(sectionKey) ? 15 : 10;
        const limitedPages = sortedPages.slice(0, maxPages);

        let sectionContent = `## ${sectionName}\n\n`;

        for (const page of limitedPages) {
            const description = page.description || page.title;
            sectionContent += `- [${page.title}](${page.url}) : ${description}\n`;
        }

        return sectionContent + '\n';
    }

    /**
     * Generate the complete llms.txt content
     */
    async generateLlmsTxt() {
        await this.scanDocs();

        let content = this.generateHeader();

        // Group pages by section
        const pagesBySection = {};
        for (const page of this.pages) {
            if (!pagesBySection[page.section]) {
                pagesBySection[page.section] = [];
            }
            pagesBySection[page.section].push(page);
        }

        // Generate sections in priority order
        const sectionOrder = Object.keys(this.sections).sort((a, b) => 
            this.sections[a].priority - this.sections[b].priority
        );

        for (const sectionKey of sectionOrder) {
            if (pagesBySection[sectionKey]) {
                content += this.generateSection(sectionKey, pagesBySection[sectionKey]);
            }
        }

        // Add other sections that weren't in the predefined list
        for (const [sectionKey, pages] of Object.entries(pagesBySection)) {
            if (!this.sections[sectionKey] && sectionKey !== 'other') {
                content += this.generateSection(sectionKey, pages);
            }
        }

        return content;
    }

    /**
     * Generate and save llms.txt file
     */
    async saveLlmsTxt(outputPath) {
        console.log('🔄 Scanning documentation and generating llms.txt...');
        const content = await this.generateLlmsTxt();

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, content, 'utf-8');

        console.log(`✅ Generated llms.txt with ${this.pages.length} pages`);
        console.log(`📁 Saved to: ${outputPath}`);
    }
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    
    // Parse simple command line arguments
    const getArg = (name, defaultValue) => {
        const index = args.indexOf(name);
        return index >= 0 && args[index + 1] ? args[index + 1] : defaultValue;
    };

    const docsDir = getArg('--docs-dir', './docs');
    const output = getArg('--output', './website/static/llms.txt');
    const baseUrl = getArg('--base-url', 'https://docs.near.org');

    try {
        const generator = new LLMsTxtGenerator(docsDir, baseUrl);
        await generator.saveLlmsTxt(output);
    } catch (error) {
        console.error('❌ Error generating llms.txt:', error.message);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = LLMsTxtGenerator;