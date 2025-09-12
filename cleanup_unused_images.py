#!/usr/bin/env python3

import os
import shutil
from pathlib import Path

unused_images = [
    "assets/data-infra/Architecture.png",
    "assets/data-infra/BQ_Query_Cost.png",
    "assets/home/near.png",
    "assets/lantstool/lantstool-logo-circle.svg",
    "assets/welcome-pages/10.templates.png",
    "assets/welcome-pages/7.discover.png",
    "assets/welcome-pages/8.near-core.png",
    "assets/welcome-pages/awesomenear.jpg",
    "assets/welcome-pages/blocks.png",
    "assets/welcome-pages/chain-abstraction-landing.png",
    "assets/welcome-pages/contracts-landing.png",
    "assets/welcome-pages/contracts.png",
    "assets/welcome-pages/cross-call.png",
    "assets/welcome-pages/crossword.png",
    "assets/welcome-pages/data-lake-landing.png",
    "assets/welcome-pages/donation.png",
    "assets/welcome-pages/examples-landing.png",
    "assets/welcome-pages/examples.png",
    "assets/welcome-pages/experiment.png",
    "assets/welcome-pages/factory.png",
    "assets/welcome-pages/frontend-bos.png",
    "assets/welcome-pages/ft.png",
    "assets/welcome-pages/guest-book.png",
    "assets/welcome-pages/mintbase-templates.png",
    "assets/welcome-pages/monitor.png",
    "assets/welcome-pages/multiple.png",
    "assets/welcome-pages/near-cli.png",
    "assets/welcome-pages/near-zero-to-hero.png",
    "assets/welcome-pages/nft-marketplace-js.png",
    "assets/welcome-pages/nft-marketplace-rs.png",
    "assets/welcome-pages/nomicon.png",
    "assets/welcome-pages/primitives-landing.png",
    "assets/welcome-pages/primitives.png",
    "assets/welcome-pages/protocol.png",
    "assets/welcome-pages/quickstart.png",
    "assets/welcome-pages/random.png",
    "assets/welcome-pages/relayer-overview.png",
    "assets/welcome-pages/smartcontract-js.png",
    "assets/welcome-pages/smartcontract-rust.png",
    "assets/welcome-pages/smartcontract.png",
    "assets/welcome-pages/transaction.png",
    "assets/welcome-pages/tutorials.png",
    "assets/welcome-pages/update.png",
    "assets/welcome-pages/validate.png"
]

def backup_and_remove_images():
    # Create backup directory
    backup_dir = Path("website/static/docs/assets/backup")
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    base_dir = Path("website/static/docs")
    for image_path in unused_images:
        full_path = base_dir / image_path
        if full_path.exists():
            # Create backup with folder structure
            backup_path = backup_dir / image_path
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Move file to backup
            shutil.move(str(full_path), str(backup_path))
            print(f"moved {image_path} to backup")

if __name__ == "__main__":
    backup_and_remove_images()
