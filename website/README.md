# Welcome to the NEAR Docs!

This README is for maintaining the docs. If you want to read the docs themselves, I recommend you head on over to [our documentation](https://docs.nearprotocol.com)

* [Get Started in 5 Minutes](#get-started-in-5-minutes)
* [Directory Structure](#directory-structure)
* [Editing Content](#editing-content)
* [Adding Content](#adding-content)
* [Full Documentation](#full-documentation)

# Get Started in 5 Minutes

1. Make sure all the dependencies for the website are installed:

```sh
# Install dependencies
$ yarn
```
2. Run your dev server:

```sh
# Start the site
$ yarn start
```

## Directory Structure

Your project file structure should look something like this

```
my-docusaurus/
  docs/
    doc-1.md
    doc-2.md
    doc-3.md
  website/
    blog/
      2016-3-11-oldest-post.md
      2017-10-24-newest-post.md
    core/
    node_modules/
    pages/
    static/
      css/
      img/
    package.json
    sidebar.json
    siteConfig.js
```

# Editing Content

## Editing an existing docs page

Edit docs by navigating to `docs/` and editing the corresponding document:

`docs/doc-to-be-edited.md`

```markdown
---
id: page-needs-edit
title: This Doc Needs To Be Edited
---

Edit me...
```

For more information about docs, click [here](https://docusaurus.io/docs/en/navigation)

# Adding Content

## Adding a new docs page to an existing sidebar

1. Create the doc as a new markdown file in `/docs`, example `docs/newly-created-doc.md`:

```md
---
id: newly-created-doc
title: This Doc Needs To Be Edited
---

My new content here..
```

1. Refer to that doc's ID in an existing sidebar in `website/sidebar.json`:

```javascript
// Add newly-created-doc to the Getting Started category of docs
{
  "docs": {
    "Getting Started": [
      "quick-start",
      "newly-created-doc" // new doc here
    ],
    ...
  },
  ...
}
```

For more information about adding new docs, click [here](https://docusaurus.io/docs/en/navigation)

## Adding items to your site's top navigation bar

1. Add links to docs, custom pages or external links by editing the headerLinks field of `website/siteConfig.js`:

`website/siteConfig.js`
```javascript
{
  headerLinks: [
    ...
    /* you can add docs */
    { doc: 'my-examples', label: 'Examples' },
    /* you can add custom pages */
    { page: 'help', label: 'Help' },
    /* you can add external links */
    { href: 'https://github.com/facebook/Docusaurus', label: 'GitHub' },
    ...
  ],
  ...
}
```

For more information about the navigation bar, click [here](https://docusaurus.io/docs/en/navigation)

## Adding custom pages

1. Docusaurus uses React components to build pages. The components are saved as .js files in `website/pages/en`:
1. If you want your page to show up in your navigation header, you will need to update `website/siteConfig.js` to add to the `headerLinks` element:

`website/siteConfig.js`
```javascript
{
  headerLinks: [
    ...
    { page: 'my-new-custom-page', label: 'My New Custom Page' },
    ...
  ],
  ...
}
```

For more information about custom pages, click [here](https://docusaurus.io/docs/en/custom-pages).

## Found a broken link?

For broken links internal to the docs, please submit an issue

If you found a broken link from a Google search please request to remove it from their index here: https://www.google.com/webmasters/tools/removals

### Check for broken links before pushing

Contributors, please considering checking for broken links before pushing to this repo so our CI doesn't fail, forcing someone (maybe you) to fix broken links before merging.

Here's one way to always make this happen automatically on every push:

1. there's a file in this `/website` folder called `test-links.sh` that mimics the CI build script by checking all links then cleaning itself up.  *no action needed, just FYI*
2. create a new githook in your local copy of the repo called `.git/hooks/pre-push` and copy the entire contents of the snippet below into that file.

Now every time you try to push to the repo, links will be checked for you automagically.

```bash
#!/bin/sh

set -e

echo "Push detected in NEAR docs repo"

if [[ $NEAR__CHECK_ALL_LINKS ]]
# only stop and check all links if this is enabled
# since it request npm installed (uses npx) and can generally be surprising to new contributors
then
    echo "Checking all links before push"

    GIT_DIR=$(git rev-parse --show-toplevel)

    cd "$GIT_DIR/website"

    ./test-links.sh
else
# just let them know there's a way to do this before every push
    echo "export NEAR__CHECK_ALL_LINKS=1 to check all links before pushing"
    echo
fi
```
