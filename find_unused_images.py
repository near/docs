#!/usr/bin/env python3

import os
import re
import sys
from pathlib import Path
from typing import Dict, Set, List, Tuple
import argparse

# Define image patterns for reference detection
IMAGE_PATTERNS = [
    r'!\[.*?\]\((.*?)\)',  # Markdown image syntax
    r'<img.*?src=[\'"](.*?)[\'"].*?>',  # HTML img tag
    r'<img.*?src={[\'"](.*?)[\'"]}.*?>',  # JSX img tag with curly braces
    r'background:\s*url\([\'"]?(.*?)[\'"]?\)',  # CSS background shorthand
    r'<Image.*?src=[\'"](.*?)[\'"].*?>',  # Next.js Image component
    r'<Image.*?src={[\'"](.*?)[\'"]}.*?>',  # Next.js Image component with curly braces
    r'<img.*?src={.*?}.*?>',  # Variable src attribute
    r'src=[\'"](.*?\.(?:png|jpg|jpeg|gif|svg|webp))[\'"]',  # Generic src attribute
    r'background-image:\s*url\([\'"]?(.*?)[\'"]?\)',  # CSS background-image property
    r'require\([\'"](.*?\.(?:png|jpg|jpeg|gif|svg|webp))[\'"]\)',  # require() statements
    r'import.*?from\s+[\'"](.*?\.(?:png|jpg|jpeg|gif|svg|webp))[\'"]',  # import statements
]

def normalize_path(path, base_dir=None, static_images=None):
    # Handle special cases for @site imports
    if path.startswith('@site/'):
        path = path.replace('@site/', '')
    
    # Remove query strings and fragments
    path = path.replace('\\', '/').strip('/')
    path = re.sub(r'[?#].*$', '', path)
    
    # Handle relative paths
    if base_dir and not os.path.isabs(path):
        joined = os.path.normpath(os.path.join(base_dir, path))
        joined = joined.replace('\\', '/')
        path = joined
    
    # Remove any leading directories up to and including 'docs/' or 'website/static/docs/'
    path = re.sub(r'^.*?(docs/|website/static/docs/)', '', path)
    
    # Remove any remaining leading slashes
    path = path.lstrip('/')
    
    # If the path starts with 'assets/', keep it as is
    if path.startswith('assets/'):
        return path
    
    # Only do the static_images lookup if provided (i.e., for references)
    if static_images:
        for static_img in static_images:
            if path.endswith(static_img):
                return static_img
    
    return path

def get_image_files(static_dirs: List[str]) -> Dict[str, str]:
    """Find all image files in the specified directories."""
    image_files = {}
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'}
    
    for static_dir in static_dirs:
        if not os.path.exists(static_dir):
            print(f"Warning: Static directory {static_dir} does not exist", file=sys.stderr)
            continue
            
        print(f"\nScanning for images in {static_dir}...")
        for root, _, files in os.walk(static_dir):
            for file in files:
                if any(file.lower().endswith(ext) for ext in image_extensions):
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, static_dir)
                    normalized_path = normalize_path(rel_path)
                    image_files[normalized_path] = full_path
                    print(f"Found image: {normalized_path}")
    
    return image_files

def find_image_references(docs_dirs, static_dir):
    referenced_images = set()
    static_images = set()
    for root, _, files in os.walk(static_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')):
                rel_path = os.path.relpath(os.path.join(root, file), static_dir)
                rel_path = rel_path.replace('\\', '/')
                static_images.add(rel_path)
    for docs_dir in docs_dirs:
        if not os.path.exists(docs_dir):
            print(f"Warning: Documentation directory {docs_dir} does not exist", file=sys.stderr)
            continue
        for root, _, files in os.walk(docs_dir):
            for file in files:
                if file.endswith(('.md', '.mdx')):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        for pattern in IMAGE_PATTERNS:
                            for match in re.finditer(pattern, content):
                                if match.lastindex and match.lastindex >= 1:
                                    img_path = match.group(1)
                                    normalized_path = normalize_path(img_path, os.path.dirname(file_path), static_images)
                                    print(f"  [MATCH] Pattern: {pattern} | Raw: {img_path} | Normalized: {normalized_path} | File: {file_path}")
                                    if normalized_path in static_images:
                                        referenced_images.add(normalized_path)
                                        print(f"    [REFERENCE FOUND] {normalized_path} in {file_path}")
    return referenced_images, static_images

def main():
    parser = argparse.ArgumentParser(description='Find unused images in documentation.')
    parser.add_argument('--delete', action='store_true', help='Delete unused images')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be deleted without deleting')
    args = parser.parse_args()

    # Define all directories to search for image references
    docs_dirs = [
        'website/src/components/docs',
        'website/src/components',
        'website/src/theme',
        'docs',
        'blog',
        'website/src/pages'
    ]
    
    static_dir = 'website/static/docs'

    static_images = get_image_files([static_dir])
    referenced_images, static_images_set = find_image_references(docs_dirs, static_dir)

    # Find unused images
    unused_images = static_images_set - referenced_images

    # Find missing images
    missing_images = referenced_images - static_images_set

    print(f'\nFound {len(static_images)} images in static directories')
    print(f'Found {len(referenced_images)} referenced images')
    print(f'Found {len(unused_images)} unused images:')
    for img in sorted(unused_images):
        print(f'- {img}')
    print(f'\nFound {len(missing_images)} referenced images missing from static directories:')
    for img in sorted(missing_images):
        print(f'- {img}')

    if args.delete:
        for img in unused_images:
            img_path = os.path.join(static_dir, img)
            try:
                os.remove(img_path)
                print(f'Deleted {img_path}')
            except Exception as e:
                print(f'Failed to delete {img_path}: {e}')
    elif args.dry_run:
        print('\nDry run - would delete the following images:')
        for img in sorted(unused_images):
            print(f'- {os.path.join(static_dir, img)}')

if __name__ == '__main__':
    main() 