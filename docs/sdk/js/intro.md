---
id: introduction
title: "Getting Started"
---

# Getting Started

## Install Node

To install Node, follow the instructions on the [Node.js website](https://nodejs.org/en/download/).

## Create a new project

The best way to create a new NEAR app connected with a frontend is through [create-near-app](https://github.com/near/create-near-app). When initializing the project, be sure to select creating a project in TypeScript with a frontend option of your choice.

```bash
npx create-near-app
```

If you only wish to develop and deploy a JS contract, the [`hello-near-js`](https://github.com/near-examples/hello-near-js) repository is great to use as a template or one of the [examples in the SDK repository](https://github.com/near/near-sdk-js/tree/develop/examples/src).

If you would like to generate a new project manually with `npm init`, make sure you include the following configuration in the generated `package.json`:

```json
  "dependencies": {
    "near-sdk-js": "*"
  }
```