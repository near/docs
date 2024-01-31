---
id: get-started
title: "Getting Started"
---

# Getting Started

:::tip Using the JS SDK on Windows
You can develop smart contracts on Windows using Windows Subsystem for Linux (WSL2).
:::

In order to use WSL2, follow the next steps:

- Run `PowerShell` as Administrator
- Execute `wsl --install` to install Ubuntu and do additional setup automatically. Check more details [here](https://learn.microsoft.com/en-us/windows/wsl/install)
- Restart your machine
- `WSL2` will continue setup process on start. Setup your username and password when prompted.
- Check [this](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) guide to setup `npm`, `node`, `npx`, `VSCode` and other tools of your choice in order to start developing.

In case of any issues of setting up WSL2 make sure that:

- Your Windows OS is up to date
- Virtualisation is turned on in BIOS
- `Windows Subsystem for Linux` and `Virtual Machine Platform` are turned on in `Windows Features` (Start -> Search -> Turn Windows Feature On or Off)

## Install Node

To install Node, follow the instructions on the [Node.js website](https://nodejs.org/en/download/).

## Create a new project

The best way to create a new NEAR app connected with a frontend is through [create-near-app](https://github.com/near/create-near-app). When initializing the project, be sure to select creating a project in TypeScript with a frontend option of your choice.

```bash
npx create-near-app
```

If you only wish to develop and deploy a JS contract, the [`hello-near-js`](https://github.com/near-examples/hello-near-examples) repository is great to use as a template or one of the [examples in the SDK repository](https://github.com/near/near-sdk-js/tree/develop/examples/src).

If you would like to generate a new project manually with `npm init`, make sure you include the following configuration in the generated `package.json`:

```json
  "dependencies": {
    "near-sdk-js": "*"
  }
```
