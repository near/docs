import path from 'path';
import { fileURLToPath } from 'url';


const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));

export const DOCS_DIR = path.join(SCRIPTS_DIR, '../../docs');
export const BUILD_DIR = path.join(SCRIPTS_DIR, '../build');
export const BASE_URL = 'https://docs.near.org';


export function extractFrontmatter(content) {
  if (!content.startsWith('---\n')) return { frontmatter: {}, body: content };

  const endIndex = content.indexOf('\n---\n', 4);
  if (endIndex === -1) return { frontmatter: {}, body: content };

  const frontmatterText = content.substring(4, endIndex);
  const body = content.substring(endIndex + 5);
  const frontmatter = {};

  for (const line of frontmatterText.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}