#!/usr/bin/env python3

import os
import re
import requests
from pathlib import Path
from urllib.parse import urlparse

# List of external images to localize
external_images = {
    "https://doc.aurora.dev/assets/images/reown_projectid-dbd1cc5521998d2f16545598ac925a5e.png": "assets/web3-apps/reown_projectid.png",
    "https://doc.aurora.dev/assets/images/ethwallets_popup1-b113d70e3578a75f0f996aa3bcdf43e9.png": "assets/web3-apps/ethwallets_popup1.png",
    "https://doc.aurora.dev/assets/images/ethwallets_popup2-8484d037a465af5134f112fba6eef918.png": "assets/web3-apps/ethwallets_popup2.png",
    "https://pages.near.org/wp-content/uploads/2024/02/acct-abstraction-blog-1.png": "assets/chain-abstraction/account-abstraction-diagram.png",
    "https://miro.medium.com/max/1400/1*LquSNOoRyXpITQF9ugsDpQ.png": "assets/smart-contracts/anatomy/environment.png",
    "https://miro.medium.com/max/1400/1*Hp4TOcaBqm9LS0wkgWw3nA.png": "assets/smart-contracts/security/callback-flow1.png",
    "https://miro.medium.com/max/1400/1*VweWHQYGLBa70uceiWHLQA.png": "assets/smart-contracts/security/callback-flow2.png",
    "https://miro.medium.com/max/1400/1*o0YVDCp_7l-L3njJMGhU4w.png": "assets/smart-contracts/security/callback-flow3.png",
    "https://i.imgur.com/FjcUss9.png": "assets/tutorials/templates/marketplace-preview.png",
    "https://i.imgur.com/oAVyr9o.png": "assets/tutorials/templates/blog-preview.png",
    "https://i.imgur.com/QDJPsAA.png": "assets/tutorials/templates/minter-preview.png"
}

def download_and_update_images():
    base_dir = Path("website/static/docs")
    
    # Download images
    for url, local_path in external_images.items():
        full_path = base_dir / local_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        
        if not full_path.exists():
            try:
                response = requests.get(url)
                response.raise_for_status()
                with open(full_path, "wb") as f:
                    f.write(response.content)
                print(f"downloaded {url} to {local_path}")
            except Exception as e:
                print(f"failed to download {url}: {e}")

    # Update references in markdown files
    docs_dir = Path("docs")
    for md_file in docs_dir.rglob("*.md"):
        with open(md_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        modified = False
        for url, local_path in external_images.items():
            # Update markdown image syntax
            content_new = content.replace(f"]({url})", f"](/docs/{local_path})")
            # Update HTML image tags
            content_new = content_new.replace(f'src="{url}"', f'src="/docs/{local_path}"')
            
            if content_new != content:
                content = content_new
                modified = True
                print(f"updated references in {md_file}")
        
        if modified:
            with open(md_file, "w", encoding="utf-8") as f:
                f.write(content)

if __name__ == "__main__":
    download_and_update_images()
