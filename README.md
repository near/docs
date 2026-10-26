<br />
<br />

<p align="center">
<img src="https://github.com/near/node-docs/raw/refs/heads/main/website/static/img/near_logo.svg" width="240">
</p>

<br />
<br />

## NEAR Protocol - scalable and usable blockchain

[![Discord](https://img.shields.io/discord/490367152054992913.svg)](http://near.chat)
[![CI](https://github.com/near/docs/actions/workflows/build-check.yml/badge.svg)](https://github.com/near/docs/actions/workflows/build-check.yml)

This is the repository for the official documentation of NEAR Protocol, a user-friendly and carbon-neutral blockchain, built from the ground up to be performant, secure, and infinitely scalable.

## Quick start

Check out the following links:

- Deployed, live documentation: https://docs.near.org
- Example applications: https://github.com/near-examples
- Community chat: https://near.chat

## Local development

This documentation site is built with [Mintlify](https://mintlify.com).

### Prerequisites

- Node.js 20.17.0 or newer
- The Mintlify CLI

```sh
npm i -g mint
```

### Run the docs locally

From the repository root, start the local preview server:

```sh
mint dev
```

The site will be available at `http://localhost:3000`.

### Sync code examples from GitHub

GitHub examples are saved as Markdown code blocks so they are available on the site and in plain-text exports. Each block has a `github-code` comment containing its source URL, last synced commit, and optional line range, filename, language, and line highlights. The source link below the code points to that exact commit.

To refresh the examples, run:

```sh
node scripts/sync-github-code.mjs
```

The script checks each repository reference once and skips source downloads when the recorded commit is unchanged. When a reference changes, it fetches each file once and updates its excerpts. Review the diff before committing: upstream edits can change what a line range selects.

To update a single page or check for pending changes without writing files:

```sh
node scripts/sync-github-code.mjs web3-apps/tutorials/mastering-near/1.1-basic.mdx
node scripts/sync-github-code.mjs --check
```

To add an example, insert a block with its source metadata and run the script. Omit `commit` on a new block; the script fills it in. Line numbers are one-based and inclusive. Without a range, the entire file is included. Use an encoded ref, such as `feature%2Fexample`, for a branch whose name contains a slash.

````mdx
{/* github-code
url: https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs
start: 5
end: 19
language: rust
fname: lib.rs
highlight: 1,3-5
*/}

{/* /github-code */}
````

Edit the metadata to change the source, range, filename, language, or highlighted lines. Highlight metadata accepts comma-separated line numbers and inclusive ranges, such as `highlight: 1,3-5`. These line numbers are one-based and relative to the displayed excerpt, not the upstream file's `start`/`end` line numbers. The script checks that highlights fall within the excerpt and renders Mintlify's `highlight={1,3-5}` fence option. Use `--force` to regenerate code that was edited manually. To pin an example permanently, replace the branch in its source URL with a full commit SHA. Ordinary page visits, agent reads, and documentation builds do not run the sync script.

The script requires Node.js 20.17.0 or newer and no additional packages. It uses `GITHUB_TOKEN`, `GH_TOKEN`, or an authenticated GitHub CLI when available to increase GitHub API rate limits. Run its tests with `node --test scripts/sync-github-code.test.mjs`.

The **Update GitHub code examples** workflow runs weekly and can also be triggered manually in GitHub Actions. It opens a pull request when examples change. To convert remaining legacy `<Github />` components, run the script with `--migrate`.

## Contributing

NEAR uses [Mintlify](https://mintlify.com) for documentation. Content is written in MDX and configured through `docs.json` at the repository root.

For simple content changes you have 2 options:

- [Submit an issue](https://github.com/near/docs/issues)
- [Submit a pull request](https://github.com/near/docs/pulls) *(we prefer PRs of course)*

### The instant PR

This is the fastest way to submit content changes directly from the page where you notice a mistake.

1. Open any page in the docs on https://docs.near.org
2. Click the `[ Edit ]` button at the top right hand side of _every_ content page
3. Make your edits to the document that opens in GitHub by clicking the ✎ (pencil) icon
4. Submit a PR with your changes and comments for context

### The typical PR

This is the standard fork-branch-commit workflow for submitting pull requests to open-source repositories:

1. Fork this repo to your own GitHub account (or just clone it directly if you are currently a member of NEAR)

2. Open your editor to the _top level repo folder_ to view the directory structure as seen below

3. Install the Mintlify CLI if you do not already have it:

  ```sh
  npm i -g mint
  ```

4. From the repository root, run the local docs development server:

  ```sh
  mint dev
  ```

  _Expected result_

  The Mintlify preview starts locally and serves the docs at `http://localhost:3000`.

5. Make changes to the docs

6. Observe those changes reflected in the local preview

7. Submit a pull request with your changes and comments for context

## Directory structure

The repo is organized around Mintlify content and configuration:

```
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE-APACHE.txt
├── LICENSE-MIT.txt
├── README.md
├── docs.json                <-- Mintlify site configuration and navigation
├── index.mdx                <-- homepage
├── openapi.json             <-- API reference source for Mintlify API docs
├── styles.css               <-- custom site styling
├── api/                     <-- API and RPC docs
├── assets/                  <-- images and static assets
├── chain-abstraction/
├── data-infrastructure/
├── getting-started/
├── primitives/
├── protocol/
├── smart-contracts/
├── snippets/                <-- reusable MDX/JSX snippets and components
├── tools/
└── web3-apps/
```

## Found a broken link?

For broken links internal to the docs, please submit an issue or PR request as per above.

If you found a broken link from a Google search, please request to remove it from their index here: https://www.google.com/webmasters/tools/removals

## Validate changes locally

Before opening a pull request, start the local Mintlify preview from the repository root and verify the pages you changed load correctly without console errors:

```bash
mint dev
mint broken-links
```
