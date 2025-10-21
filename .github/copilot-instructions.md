# NEAR Documentation Repository - Copilot Instructions

## Repository Overview

This is the official documentation repository for NEAR Protocol, a user-friendly and scalable blockchain platform. The repository contains 242 markdown documentation files organized into ~610 total files, with a built size of ~158MB. The documentation covers NEAR Protocol fundamentals, AI and agent development, chain abstraction, smart contracts, Web3 applications, and API references.

**Tech Stack:**
- **Framework:** Docusaurus 3.9.1 (React-based static site generator)
- **Runtime:** Node.js v22 (minimum v18), Yarn 1.22.22, npm 10.8.2
- **Languages:** JavaScript/TypeScript, Markdown (MDX)
- **Build Tool:** Docusaurus CLI
- **Deployment:** Static HTML site deployed to https://docs.near.org

## Project Structure

```
/
├── .github/
│   └── workflows/          # CI/CD pipelines
│       ├── build-check.yml     # Main build validation (runs on all PRs)
│       ├── test-links.yml      # Link checker (manual workflow)
│       └── spellcheck.yml      # Spellcheck (runs on PRs to master)
├── docs/                   # All markdown documentation content
│   ├── ai/                 # AI and agents documentation
│   ├── api/                # API references (RPC, etc.)
│   ├── chain-abstraction/  # Chain abstraction features
│   ├── data-infrastructure/
│   ├── integrations/
│   ├── primitives/         # Tokens, NFTs, FTs, linkdrops
│   ├── protocol/           # Protocol fundamentals
│   ├── smart-contracts/    # Smart contract development
│   ├── tools/              # Developer tools
│   ├── tutorials/          # Tutorials and examples
│   └── web3-apps/          # Web3 application building
├── blog/                   # Blog posts
├── website/                # Docusaurus site (WORK HERE)
│   ├── docusaurus.config.js    # Main site configuration
│   ├── sidebars.js             # Navigation structure
│   ├── package.json            # Dependencies and scripts
│   ├── tsconfig.json           # TypeScript config
│   ├── .prettierrc             # Code formatting config
│   ├── linkinator.config.json  # Link checker config
│   ├── test-links.sh           # Link testing script
│   ├── scripts/
│   │   └── copy-md-to-static.js  # Post-build markdown processing
│   ├── src/                    # React components and custom pages
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Custom pages
│   │   └── theme/              # Theme customizations
│   ├── static/                 # Static assets (images, etc.)
│   └── build/                  # Build output (gitignored)
```

## Build & Validation Commands

**CRITICAL:** All commands MUST be run from the `/website` directory, not the repository root.

### Initial Setup
```bash
cd website
yarn install  # Install dependencies (~2 minutes)
```

### Development Server
```bash
cd website
yarn start    # Starts dev server on http://localhost:3000
# Options: --port 3001, --host 0.0.0.0, --no-open
```

### Build Commands
**ALWAYS use `build:preview` for CI builds (it's faster):**
```bash
cd website
yarn build:preview  # Preview build (en locale only) - ~240 seconds, requires NODE_OPTIONS
```

**For full production builds:**
```bash
cd website
yarn build          # Full build with all locales - ~300+ seconds
```

**For development builds:**
```bash
cd website
yarn build:dev      # Dev build with debugging - ~160 seconds
```

**Important:** All builds run with `NODE_OPTIONS=--max-old-space-size=8192` in CI to prevent memory issues. Set this environment variable if builds fail with heap errors.

### Link Testing
```bash
cd website
yarn full-test      # Builds site, starts server, checks links - ~300 seconds total
```

**Note:** This command:
1. Builds the site with `build:preview`
2. Starts a local server with `npx serve`
3. Runs linkinator to check for broken links
4. Automatically stops the server afterward

### Cleaning
```bash
cd website
yarn clean          # Removes node_modules, package-lock.json, and build/
```

### Code Formatting
```bash
cd website
npx prettier --check "src/**/*.{js,jsx,ts,tsx}"  # Check formatting
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"  # Fix formatting
```

**Prettier config:** 100 char width, single quotes, trailing commas, LF line endings

## CI/CD Workflows

### build-check.yml (Runs on all pushes and PRs)
**This is the main validation that must pass.**
- Node v22
- Runs `cd website && yarn && yarn build:preview`
- Uses caching for `.cache` directory
- Requires `NODE_OPTIONS=--max-old-space-size=8192`
- Takes ~240 seconds

### test-links.yml (Manual workflow_dispatch only)
- Runs `cd website && yarn && yarn full-test`
- Checks for broken internal/external links
- Takes ~300 seconds total

### spellcheck.yml (Runs on PRs to master)
- Uses reviewdog/action-misspell
- Checks only `./docs` directory
- US English locale

## Common Issues & Workarounds

### Build Failures

**Memory Issues:**
- **Symptom:** Build fails with heap out of memory
- **Fix:** Set `NODE_OPTIONS=--max-old-space-size=8192` before building
- **Why:** Docusaurus builds are memory-intensive with 240+ docs

**Missing node_modules:**
- **Symptom:** "Cannot find module" errors
- **Fix:** Always run `yarn install` in `/website` directory first
- **Why:** Dependencies are in `website/node_modules`, not root

**Wrong Directory:**
- **Symptom:** "No such file or directory" or "package.json not found"
- **Fix:** Ensure you're in `/website` directory, not repository root
- **Why:** All build scripts are configured to run from `website/`

### Link Checking

**Test script hangs:**
- **Symptom:** `test-links.sh` doesn't complete
- **Fix:** Check for orphaned server processes with `ps aux | grep serve`
- **Why:** Server might not shut down cleanly

**Many broken links reported:**
- **Check:** Review `linkinator.config.json` - many external domains are intentionally skipped
- **Why:** External sites may be down or block automated checks

### Markdown Content

**All markdown files must have frontmatter:**
```yaml
---
id: unique-identifier
title: Page Title
sidebar_label: Short Label
description: "Brief description for SEO and search."
---
```

**Docusaurus strict mode:** The config has:
- `onBrokenLinks: 'throw'`
- `onBrokenMarkdownLinks: 'throw'`
- `onBrokenAnchors: 'throw'`

This means ANY broken link will fail the build. Always verify links before committing.

## Development Best Practices

### Making Changes

1. **Documentation changes:** Edit markdown files in `/docs` directory
2. **Component changes:** Edit React files in `/website/src`
3. **Navigation changes:** Edit `/website/sidebars.js`
4. **Site config:** Edit `/website/docusaurus.config.js`

### Testing Workflow

1. Start dev server: `cd website && yarn start`
2. View changes at http://localhost:3000
3. Build preview: `cd website && yarn build:preview`
4. Check for broken links: `cd website && yarn full-test` (only if you changed links)

### Before Submitting PR

**Required:**
- Run `cd website && yarn build:preview` successfully
- Verify all links work if you added/changed any

**Recommended:**
- Format code with Prettier if you changed JS/TS files
- Check that images and static assets load correctly
- Review the git diff to ensure no unintended changes (build artifacts, etc.)

### Files to Never Commit

These are gitignored, but be aware:
- `website/build/` - Build output
- `website/node_modules/` - Dependencies  
- `website/.docusaurus/` - Docusaurus cache
- `website/yarn.lock` - Lock file (gitignored in this repo)
- `website/package-lock.json` - NPM lock file
- `website/.cache/` - Build cache
- `.env` files - Environment variables

## Environment Variables

Optional environment variables (see `website/.env.example`):
- `REACT_APP_PUBLIC_POSTHOG_KEY` - Analytics
- `REACT_APP_PUBLIC_POSTHOG_HOST` - Analytics host
- `REACT_APP_GOOGLE_CALENDAR_API_KEY` - Events calendar
- Various calendar IDs for events page

**Note:** These are only needed for analytics and calendar features. Documentation builds work fine without them.

## Key Facts

- **Build time:** ~240 seconds for preview, ~300+ for full build
- **Node modules:** ~2GB installed size
- **Build output:** ~260MB
- **Primary language:** Markdown (242 .md files)
- **Main branch:** `master`
- **Live site:** https://docs.near.org
- **Code owners:** @bucanero (general), @r-near @karim-en (chain-abstraction/omnibridge)

## Additional Notes

- The repository uses Yarn, not NPM. Always use `yarn` commands.
- Unmet peer dependency warnings during `yarn install` are expected and can be ignored.
- The `process-markdown` script runs automatically during builds to copy markdown to static directory.
- Link checking skips many external domains (GitHub, social media, etc.) - see `linkinator.config.json`.
- Prettier is installed but not enforced in CI - use it for consistency.

## Trust These Instructions

These instructions are comprehensive and validated. Only search or explore further if:
- You encounter an error not documented here
- You need to understand specific React component internals
- You're adding new features not covered in this guide
- Information here appears outdated or incorrect

For standard documentation updates, builds, and link testing, the instructions above are complete and sufficient.
