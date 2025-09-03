#!/usr/bin/env python3

import os
import re
from pathlib import Path

EXTERNAL_PATTERNS = [
    r'!\[.*?\]\((https?://(?!github\.com/near/docs).*?\.(?:png|jpg|jpeg|gif|svg|webp))\)',
    r'<img.*?src=[\'"](https?://(?!github\.com/near/docs).*?\.(?:png|jpg|jpeg|gif|svg|webp))[\'"].*?>',
]

def find_external_images(root_dir: str) -> dict:
    external_refs = {}
    
    for path in Path(root_dir).rglob('*.md'):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for pattern in EXTERNAL_PATTERNS:
            matches = re.finditer(pattern, content)
            for match in matches:
                url = match.group(1)
                if 'shields.io' not in url:  # ignore badges
                    if url not in external_refs:
                        external_refs[url] = []
                    external_refs[url].append(str(path))
    
    return external_refs

if __name__ == '__main__':
    docs_dir = os.path.join(os.path.dirname(__file__), 'docs')
    results = find_external_images(docs_dir)
    
    if results:
        print("found external images that should be localized:")
        for url, files in results.items():
            print(f"\n{url}")
            for file in files:
                print(f"  referenced in: {file}")
    else:
        print("no external images found that need localization")
