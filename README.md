<br />
<br />

<p align="center">
<img src="website/static/docs/assets/near_logo.png" width="240">
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

## Contributing

NEAR uses [Docusaurus](https://docusaurus.io) for documentation. Please refer to their documentation for details on major structural contributions to the documentation.

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

3. Move into the `/website` folder where you will run the following commands:

   - Make sure all the dependencies for the website are installed:

     ```sh
     # Install dependencies
     yarn
     ```

   - Run the local docs development server

      ```sh
      # Start the site
      yarn start
      ```

      _Expected Output_

      ```sh
      # Website with live reload is started
      LiveReload server started on port 35729
      Docusaurus server started on port 3000
      ```

      The website for docs will open your browser locally to port `3000`

4. Make changes to the docs

5. Observe those changes reflected in the local docs

6. Submit a pull request with your changes - **[Please check for broken links before opening PR 🙏](#check-for-broken-links)**

## Directory Structure

Your project file structure should look something like this with a few key files and folders highlighted

```
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE-APACHE.txt
├── LICENSE-MIT.txt
├── README.md             <-- the document you are reading right now
├── docs                  <-- all the content for the site is in this folder as markdown files
└── website
    ├── build
    ├── core
    ├── i18n
    ├── package.json
    ├── pages
    ├── sidebars.js     <-- rarely used for changing left-hand-side page navigation
    ├── docusaurus.config.js     <-- rarely used for general site configuration (including header links)
    ├── static
    └── test-links.sh     <-- always used to test links before submitting changes
```

## Found a broken link?

For broken links internal to the docs, please submit an issue or PR request as per above.

If you found a broken link from a Google search, please request to remove it from their index here: https://www.google.com/webmasters/tools/removals

## Check for broken links

Before opening a pull request, please check for broken links by navigating to `./website` directory and run:

```bash
yarn full-test
```
