# NEAR Protocol Documentation

This is source code for https://docs.nearprotocol.com

## Documenting

### On github

Just open the file and press "Edit" to change Markdown (mdx) files.
Create a pull request and send it over for review.

TODO: automatic pipeline to generate docs for pull requests.

### Locally

Install [Yarn](https://www.yarnpkg.com):

`npm install -g yarn`

Run it once to verify everything is working:

`yarn`

To develop:

    git clone git@github.com:nearprotocol/docs.git
    yarn docz:dev

To build docs:

    yarn docz:build

To publish docs:

    git push
