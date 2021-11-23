---
id: running-localnet-with-kurtosis
title: Running the NEAR Stack Locally with Kurtosis
sidebar_label: Running the NEAR Stack Locally with Kurtosis
description: Using Kurtosis to easily run NEAR's stack on your local machine.
---

Kurtosis has made local testing and development trivial with the use of Docker. This tutorial provides an easy way to setup a local environment which includes the indexer for explorer, the NEAR wallet, the explorer itself, and a local RPC endpoint you can connect dApps to.

## Prerequisites {#prerequisites}

To complete this tutorial successfully, you'll need:

- [Docker](https://www.docker.com/products/docker-desktop)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

## Setup Guide

1. Visit [this link](https://docs.kurtosistech.com/installation.html) to install the Kurtosis CLI (or upgrade it to latest if it's already installed)
2. Launch the local NEAR cluster which will create a local instance of the wallet, explorer, indexer, and RPC node:

   ```
   kurtosis module exec kurtosistech/near-kurtosis-module --execute-params '{"isWalletEnabled":true}'
   ```

> **Tip:** If you'd prefer an environment that starts faster but doesn't have a Wallet, leave out the `--execute-params '{"isWalletEnabled":true}'` part.

3. Wait until the execution finishes, returning an output with information about the cluster (will be different on your machine):
   ```javascript
   {
       "networkName": "localnet",
       "rootValidatorKey": {
           "account_id": "test.near",
           "public_key": "ed25519:HM5NrScjfBDZH8hBJUGQnqEdD9rQdvMN9TvcuNz7pS9j",
           "secret_key": "ed25519:5uxHbUY1SoW1EUPbuJgrYU5zR6bob7kLEN19TxaMg9pbvgyqsHFvduPj3ZFK3pn8DCb6ypHEimzFQ9hyFbc23Hh7"
       },
       "nearNodeRpcUrl": "http://127.0.0.1:56212",
       "contractHelperServiceUrl": "http://127.0.0.1:56213",
       "walletUrl": "http://127.0.0.1:56218",
       "explorerUrl": "http://127.0.0.1:56216"
   }
   ```
4. Copy the output to a place where you can reference it in the future.
5. If you ever lose the output above, you can reacquire the service ports with the following steps:
   1. List the running Kurtosis enclaves:
      ```
      kurtosis enclave ls
      ```
   2. Copy the ID of the enclave
   3. Inspect the enclave by running the following, replacing `ENCLAVE_ID` with the enclave ID you copied:
      ```
      kurtosis enclave inspect ENCLAVE_ID
      ```

### Configure the NEAR CLI to use the local NEAR cluster

1. Save the value of the `rootValidatorKey` property into a file somewhere on your machine called `neartosis_validator_key.json`, with contents like so (public & secret keys will be different on your machine):
   ```javascript
   {
       "account_id": "test.near",
       "public_key": "ed25519:HM5NrScjfBDZH8hBJUGQnqEdD9rQdvMN9TvcuNz7pS9j",
       "secret_key": "ed25519:5uxHbUY1SoW1EUPbuJgrYU5zR6bob7kLEN19TxaMg9pbvgyqsHFvduPj3ZFK3pn8DCb6ypHEimzFQ9hyFbc23Hh7"
   }
   ```
2. We will now create a local version of the NEAR CLI with a preset node, wallet, and helper URL. Enter the following in your terminal, replacing:

   a) `NODE_URL` with the `nearNodeRpcUrl` value from the output above

   b) `WALLET_URL` with the `walletUrl` value from above

   c) `HELPER_URL` with the `contractHelperServiceUrl` value from above

   d) `KEY_PATH` with the path to the `neartosis_validator_key.json` file you saved in the step above:

   ```
   alias local_near="near --nodeUrl NODE_URL --walletUrl WALLET_URL --helperUrl HELPER_URL --keyPath KEY_PATH --networkId localnet --masterAccount test.near"
   ```

For later, let's export an environment variable for the explorer URL by running the following:

```bash
export EXPLORER_URL=http://127.0.0.1:56216
```

At this point, we've created an alias to the NEAR CLI called `local_near`. It will behave exactly the same as the regular CLI, we've just set some variables to be used so we don't have to keep adding the flags everytime we want to run a NEAR CLI command. Running the command `local_near` should give a similar output to if you were running the command `near`.

To test out the new alias, let's check the state of the root account `test.near` by running the following command:

```bash
local_near state test.near
```

This should return something similar to the following output:

```bash
Loaded master account test.near key from neartosis_validator_key.json with public key = ed25519:JEKD2XoiTXj5bi6eYbukC9B8vLa9ChHu2BjszVogLjpt
Account test.near
{
  amount: '1000000000000000000000000000000000',
  locked: '50002972823584033336760087100935',
  code_hash: '11111111111111111111111111111111',
  storage_usage: 182,
  storage_paid_at: 0,
  block_height: 5004,
  block_hash: '5BZeccFpBL3YMAqMaRfUCkL5kh3LSLtgGCFbXpD9mQmV',
  formattedAmount: '1,000,000,000'
}
```

## Using the Local Wallet

Now that we've setup our local environment, it's time to play around with some of the powerful tools that come with Kurtosis. Let's now navigate to the local wallet page which can be found using the `WALLET_URL` we previously set when creating the `local_near` alias. To quickly gain access of that URL, simply run the following command:

```bash
echo $WALLET_URL
```

which should return something similar to the following:

```bash
http://127.0.0.1:59537
```

### Creating a Local Account using the Wallet

If you navigate to the URL that was outputted, you should be greeted by a local version of the NEAR Wallet as shown below:

![Local wallet landing page](/docs/assets/kurtosis/local-wallet-landing-page.png)

At this point, you can create a local NEAR account by simply following the same steps you would to create one on mainnet or testnet. On localnet, the root account is `test.near` instead of `testnet` or `mainnet`. This means that all the accounts you create will be subaccounts of `test.near`.

On testnet, for example, if you wanted the account ID `benji`, you would get `benji.testnet` but on localnet, it would be `benji.test.near` instead.

> **Tip:** You can finally have the account ID you've always wanted because nobody else has it! You can even get the most prized account of them all `goteam.test.near`!

### Interacting with the Local Account

Now that we've created an account, it's time to interact with it using the local CLI. First, we want to login to the account to create a full access key on our local machine. This is the same as if we were developing on testnet. Run the following command to login to your newly created account:

```bash
local_near login
```

After being redirected to the local wallet site, you should see the following in your terminal (with your account ID instead of `goteam.test.near`):

```bash
Logged in as [ goteam.test.near ] with public key [ ed25519:BrSg17... ] successfully
```

For ease of development, let's export our account ID to an environment variable by running the following (and typing your account ID)

```bash
export ID=YOUR_ACCOUNT_ID
```

At this point, let's try to create a transaction so that we can view it in the local explorer. Run the following command to send 1 NEAR to the root account `test.near`

```bash
local_near send $ID test.near 1
```

## Using the Local Explorer

To view the transaction in the explorer, let's get the explorer URL that we exported at the start of the tutorial by running the following:

```bash
echo $EXPLORER_URL
```

which should return something similar to the following:

```bash
http://127.0.0.1:59536
```

If we navigate to that URL, we will be greeted by a local version of the explorer as shown below:

![Local explorer landing page](/docs/assets/kurtosis/local-explorer-landing-page.png)

Once here, we can type our local account ID and it should show all the transactions for the account similar to how it would on testnet or mainnet. You can then view the transaction where you sent 1 NEAR to the test account and it should look something like this:

## Interacting with a Smart Contract

Let's now go ahead and deploy a basic NFT contract on localnet. The end goal is to have the NFT show up under the collectibles tab in the wallet. The repo can be found [here](https://github.com/near-examples/nft-tutorial.git).

### Deploying the Contract

To clone the repo, run the following in your terminal:

```bash
git clone https://github.com/near-examples/nft-tutorial.git
```

After cloning the repo, let's build the smart contract by running `yarn build`. This will compile both a marketplace contract and NFT contract into WebAssembly so that we can deploy to the local blockchain. For the purpose of this tutorial, we only care about the NFT contract.

The command we just ran should have created a folder `out` which contains both a `market.wasm` and a `main.wasm` file. Let's go ahead and deploy the NFT contract to the account ID we've been using by running the following command:

```bash
local_near deploy --wasmFile out/main.wasm --accountId $ID
```

If we not open the explorer and navigate to our account page, we should see the contract was deployed:

![Local explorer contract deployed](/docs/assets/kurtosis/local-explorer-contract-deployed.png)

### Minting an NFT

Let's go ahead and mint an NFT now. Firstly, we need to initialize the contract by running the following command. This will initialize the contract with some default metadata and set our account ID as the owner of the contract:

```bash
local_near call $ID new_default_meta '{"owner_id": "'$ID'"}' --accountId $ID
```

Now that the contract is initialized, everything is ready to go and we can mint our first NFT! Run the following command to mint a surprise NFT:

```bash
local_near call $ID nft_mint '{"token_id": "team_token", "metadata": { "title": "Go Team!", "description": "Go Team!", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif", "copies": 1}, "receiver_id": "'$ID'"}' --accountId $ID --amount 0.1
```

### Seeing your NFT in the Collectibles Tab

Once the NFT has been minted, we can view token on the local wallet's collectibles tab which can be found here:

![Local wallet collectibles tab](/docs/assets/kurtosis/local-wallet-collectibles-tab.png)

I won't spoil what the NFT is but once you switch over to the collectibles tab, your beautiful token should be there!

With that, we've covered how to deploy a contract and view a collectible in the local wallet site. In the next section, we'll discuss how to wire up a dApp to localnet.

## Wiring up a dApp Locally

Let's see how we can integrate localnet into one of the most popular NEAR examples, the [guestbook](https://github.com/near-examples/guest-book) tutorial. We'll start off by cloning the repo by running the following command:

```bash
git clone https://github.com/near-examples/guest-book.git
```

We can then start
