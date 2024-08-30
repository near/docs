---
id: chain-hosted-ui-tutorial
title: Chain Hosted UI tutorial
sidebar_label: Chain Hosted UI Tutorial
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";

[Chain Hosted UI](chain-ui.md) lets you to deploy dApp frontends directly on the NEAR blockchain.
In this tutorial you'll learn how to build and deploy a simple [React](https://react.dev/) web app using Chain Hosted UI.

:::warning

This experiment reached the MVP stage of functionality but no longer has a maintainer due to [Pagoda winding down](https://docs.near.org/blog/2024-08-13-pagoda-services).
We encourage interested parties to fork the project and carry it forward. The smart contract has not yet been audited.

:::

## Requirements

To build and deploy your web3 dApp, you'll need to have installed:

- [NodeJS](https://nodejs.org)
- [TypeScript](https://typescriptlang.org)
- [pnpm](https://pnpm.io/)

If you already have NodeJS, installing TypeScript and `pnpm` is simple:

#### TypeScript

```sh
npm install -g typescript
```

#### pnpm

```sh
npm install -g pnpm
```

## Getting Started

Let's get started by cloning the [chain hosted repository](https://github.com/near/chain-hosted-ui/) from GitHub.
You'll take advantage of a demo React project in this monorepo to build your new React application.

```sh
git clone https://github.com/near/chain-hosted-ui
```

After cloning, you need to install the dependencies from the `chain-hosted-ui` folder:

#### Install

```sh
cd chain-hosted-ui
pnpm install
```

Next, it's time to build all the packages included in the Chain Hosted solution:

#### Build all

```sh
pnpm run build
```

## React App


Now you can jump to the demo React project included in the `chain-hosted-ui` repository. This demo project provides the boilerplate code and preconfigured settings so you can start building your web app right away:

```sh
cd packages/react
```

In this folder you can build, edit, add components, content, or `npm` dependecies to your React web app.
For example, you can edit `src/App.tsx` and add a "Hello World!" paragraph:

<CodeTabs>
  <TabItem value="App.tsx">
    <Github url="https://github.com/near/chain-hosted-ui/blob/35e3b518e2a1348eb94d85749a12a591616cc64e/packages/react/src/App.tsx" start="16" end="21" language="jsx" />
  </TabItem>
</CodeTabs>


When ready, you can test your sample React dApp locally:

#### Run web app

```sh
npm run dev
```

## Blockchain Deployment

If you want to deploy your React frontend to the NEAR blockchain, you'll need to update the project's settings, and then run the deploy script.

### Settings

To update the settings, configure the `nearDeployConfig` field in `package.json`:

<CodeTabs>
  <TabItem value="package.json">
    <Github url="https://github.com/near/chain-hosted-ui/blob/35e3b518e2a1348eb94d85749a12a591616cc64e/packages/react/package.json" start="42" end="46" language="jsx" />
  </TabItem>
</CodeTabs>

#### Configuration parameters

 - `application` is developer-defined and will be used as part of the URL (names should match `[a-z_-]+`)
 - `deployerAccount` is the account paying for bundle storage and calling smart contract methods (must match `DEPLOYER_ACCOUNT.near` referenced above)
 - `filestoreContract` is the hosted storage contract
   - `v1.chain-hosted-ui.testnet` on testnet
`v1.chain-hosted-ui.near`
   - or deployed and configured separately

### Account login

Before you can deploy your app, you need to set credentials to your NEAR account. You can do it by [adding a new key](../../4.tools/cli.md#add-key) into your account and saving it into the legacy keychain.

```bash
near account add-key <accountId> grant-full-access autogenerate-new-keypair save-to-legacy-keychain network-config testnet sign-with-keychain send
```

The JSON file will be saved at the path `~/.near-credentials/mainnet/YOUR_ACCOUNT.near.json` (replace `mainnet` with `testnet` for testnet). Edit the created file to make sure it has following structure:

```js
{
  "account_id":"YOUR_ACCOUNT.near",
  "public_key":"ed25519:44_CHARACTERS_BASE_58",
  "private_key":"ed25519:88_CHARACTERS_BASE_58"
}
```

### Deploy

After you've set up your account and contract settings, you can build the project bundle and deploy the application on chain by running:

```sh
npm run deploy
```

The deployment script will estimate the storage cost in NEAR tokens, and ask you to confirm the transaction:

```
react-example deployment calculated to cost 4.08204 N {
  appKey: '<YOUR_ACCOUNT_ID>/react-example',
  newAppChars: 96,
  fileKeyChars: 327,
  partitionKeyChars: 339,
  fileBytes: 388004
}
? Estimated cost to deploy is 4.08204 N. Continue? (y/N)
```

Once you've deployed your frontend, you can load the web application at `https://chain-hosted-ui.near.dev//<FILE_CONTRACT>/<DEPLOYER_ACCOUNT.near>/<APPLICATION-NAME>`
 - `<FILE_CONTRACT>`: `v1.chain-hosted-ui.testnet` or `v1.chainui.near`
 - `<DEPLOYER_ACCOUNT.near>`: the NEAR account used to deploy, e.g. `myaccount.testnet`
 - `<APPLICATION-NAME>`: the application name you defined, e.g. `react-example`
 - [Check this deployed example](https://chain-hosted-ui.near.dev/v1.chain-hosted-ui.testnet/solops2.testnet/react-example)

### Redeployment

Once deployed, new deployments can be made or the application can be removed (with any remaining storage being refunded):
- To deploy a new version after making changes, run
  ```sh
  pnpm run deploy
  ```
  This will increment the application version, delete previous files, and refund any remaining available balance.
- To delete application storage, refund storage-staked Near, and unregister the deployment account, run
  ```sh
  pnpm delete-and-unregister
  ```
- To drop and recreate the application, run
  ```sh
  pnpm clean-deploy
  ```

Also note that in order to do a roll forward deployment, both sets of application files must exist simultaneously to avoid downtime.
Consequently, storage must be paid ahead of each deployment to account for the new files, regardless
of whether the application is already deployed. Once the deployment is live, the files from the previous deployment are deleted and storage is refunded as part of the deployment script.
