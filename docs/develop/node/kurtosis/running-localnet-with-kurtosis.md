---
id: running-localnet-with-kurtosis
title: Running the NEAR Stack Locally with Kurtosis
sidebar_label: Running the NEAR Stack Locally with Kurtosis
description: Using Kurtosis to easily run NEAR's stack on your local machine.
---

> [Kurtosis](https://www.kurtosistech.com/) has created an easy way to spin up a local NEAR testing environment using a [Docker container](https://www.docker.com/). 

This Kurtosis NEAR Module contains the following components:

- [Indexer for Explorer](https://github.com/near/near-indexer-for-explorer)
- [NEAR Explorer](https://github.com/near/near-explorer)
- [NEAR Wallet](https://github.com/near/near-wallet)
- [Local RPC Endpoint](https://github.com/near/nearup)

---

## Prerequisites {#prerequisites}

- [Docker](https://docs.docker.com/get-docker/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [NEAR-CLI](docs/tools/near-cli#setup)

---

## Setup Guide

1. Make sure Docker is running with at least 4GB of memory:
   1. If you don't already have Docker installed, do so using [this link](https://docs.docker.com/get-docker/)
   1. Open the "Docker Desktop" program (which will start your Docker engine if it's not running already)
   1. Give Docker >= 4GB of memory:
      1. Click the gear icon in the top-right of Docker Desktop
      1. Select the "Resources" tab from the left-hand menu
      1. Give Docker at least 4GB of memory
      1. Select "Apply & Restart"
      1. Wait until the whale icon in the bottom-left corner is green once more
1. Visit [this link](https://docs.kurtosistech.com/installation.html) to install the Kurtosis CLI (or upgrade it to latest if it's already installed)

### Launch the local NEAR cluster in Kurtosis {#launching-cluster}

For a brief video presentation put together by the Kurtosis team, be sure to check out [this link](https://www.loom.com/share/8a1b8e2138334a81a380f5d523fba27e). We'll now step through the requirements for getting the local cluster setup.

We've created a simple script that will get the cluster running. To download and run the script in a simple command, run the following:

```
curl -o ~/launch-local-near-cluster.sh https://raw.githubusercontent.com/kurtosis-tech/near-kurtosis-module/master/launch-local-near-cluster.sh -L
chmod u+x ~/launch-local-near-cluster.sh
~/launch-local-near-cluster.sh
```

If you would like to do it manually you can do as follows:

1.  Create a shell script on your local machine (by creating a file ending with `.sh`).
1.  Copy the raw contents of [this script](https://github.com/kurtosis-tech/near-kurtosis-module/blob/develop/launch-local-near-cluster.sh) into file you just created.
1.  Run the script by going to the directory and running `./path/to/your/script.sh`
1.  If your terminal complains about permissions, give the file executable permissions by running `chmod u+x /path/to/your/script`.

This should print some very useful information such as the URLs for the wallet and explorer. The output should look something like the following:

```
ACTION Paste the following in your terminal to declare the following variables so you can use them:

           export NEAR_ENV="local"
           export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
           export NEAR_NODE_URL="http://127.0.0.1:62285"
           export NEAR_CLI_LOCALNET_KEY_PATH="/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json"
           export NEAR_WALLET_URL="http://127.0.0.1:62292"
           export NEAR_HELPER_URL="http://127.0.0.1:62286"
           export NEAR_HELPER_ACCOUNT="test.near"
           export NEAR_EXPLORER_URL="http://127.0.0.1:62290"

  ACTION Paste the following into your terminal now to use the 'local_near' command as a replacement for the NEAR CLI for connecting to your
         local cluster (e.g. 'local_near login'):

         alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:62285" NEAR_CLI_LOCALNET_KEY_PATH="/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:62292" NEAR_HELPER_URL="http://127.0.0.1:62286" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:62290" near'
```

Let's copy all the export commands and run them. In my case it was the following:

```
export NEAR_ENV="local"
export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
export NEAR_NODE_URL="http://127.0.0.1:62285"
export NEAR_CLI_LOCALNET_KEY_PATH="/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json"
export NEAR_WALLET_URL="http://127.0.0.1:62292"
export NEAR_HELPER_URL="http://127.0.0.1:62286"
export NEAR_HELPER_ACCOUNT="test.near"
export NEAR_EXPLORER_URL="http://127.0.0.1:62290"
```

Now we want to run the command that creates the `local_near` alias. Copy the command from the output and run it In my case, the command was:

```bash
alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:62285" NEAR_CLI_LOCALNET_KEY_PATH="/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:62292" NEAR_HELPER_URL="http://127.0.0.1:62286" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:62290" near'
```

What we've done is that we've created an alias to the NEAR CLI called `local_near`. It will behave exactly the same as the regular CLI, we've just set some variables to be used so we don't have to keep adding flags everytime we want to run a NEAR CLI command. Running the command `local_near` should give a similar output to if you were running the command `near`.

To test out the new alias, let's check the state of the root account `test.near` by running the following command:

```bash
local_near state test.near
```

This should return something similar to the following output:

```bash
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Account test.near
{
  amount: '1000000000000000000000000000000000',
  locked: '50000000000000000000000000000000',
  code_hash: '11111111111111111111111111111111',
  storage_usage: 182,
  storage_paid_at: 0,
  block_height: 220,
  block_hash: 'GyXkd3wAbci8ZKtobSFkh4CHZde2JeJzrBVTT4q8qVQa',
  formattedAmount: '1,000,000,000'
}
```

## Using the Local Wallet

Now that we've setup our local environment, it's time to play around with some of the powerful tools that come with Kurtosis. Let's now navigate to the local wallet page which can be found using the `NEAR_ALLET_URL` we previously set when creating the `local_near` alias. To quickly gain access of that URL, simply run the following command:

```bash
echo $NEAR_WALLET_URL
```

which should return something similar to the following:

```bash
http://127.0.0.1:61379
```

### Creating a Local Account using the Wallet

If you navigate to the URL that was outputted, you should be greeted by a local version of the NEAR Wallet as shown below:

![Local wallet landing page](/docs/assets/kurtosis/local-wallet-landing-page.png)

At this point, you can create a local NEAR account by simply following the same steps you would to create one on mainnet or testnet. On localnet, the root account is `test.near` instead of `testnet` or `mainnet`. This means that all the accounts you create will be subaccounts of `test.near`.

On testnet, for example, if you wanted the account ID `benji`, you would get `benji.testnet` but on localnet, it would be `benji.test.near` instead.

Currently, only the passphrase recovery mode works on localnet so be sure to check that option when creating the account.

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
export ACCOUNT_ID=INSERT_YOUR_ACCOUNT_ID
```

At this point, let's try to create a transaction so that we can view it in the local explorer. Run the following command to send 1 NEAR to the root account `test.near`

```bash
local_near send $ACCOUNT_ID test.near 1
```

## Using the Local Explorer

The command we just ran should have outputted something similar to the following:

```bash
Sending 1 NEAR to test.near from goteam.test.near
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Transaction Id B1C7MqgizuqjdPcLc3WmDuqvWtfxLtWaN8ugLss5PKPV
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:62290/transactions/B1C7MqgizuqjdPcLc3WmDuqvWtfxLtWaN8ugLss5PKPV
```

If we navigate to the URL, we will be greeted by a local version of the explorer where you can then view the transaction.

![Local explorer sending 1 NEAR](/docs/assets/kurtosis/local-explorer-send-funds.png)

## Interacting with a Smart Contract

Let's now go ahead and deploy a basic NFT contract on localnet. The end goal is to have the NFT show up under the collectibles tab in the wallet. The repo can be found [here](https://github.com/near-examples/nft-tutorial.git).

### Deploying the Contract

To download and deploy the wasm file, run the following in your terminal:

```
curl -o ~/main.wasm https://github.com/near-examples/nft-tutorial/raw/main/out/main.wasm -L
local_near deploy --wasmFile ~/main.wasm --accountId $ACCOUNT_ID
```

Alternatively, you can clone the following repo and build the smart contract by running `yarn build`. This will compile both a marketplace contract and NFT contract into WebAssembly so that we can deploy to the local blockchain. For the purpose of this tutorial, we only care about the NFT contract.

```bash
git clone https://github.com/near-examples/nft-tutorial.git
```

The command we just ran should have created a folder `out` which contains both a `market.wasm` and a `main.wasm` file.

After deploying the contract, the output should be as follows:

```
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Starting deployment. Account id: goteam.test.near, node: http://127.0.0.1:62285, helper: http://127.0.0.1:62286, file: /Users/benjaminkurrek/main.wasm
Transaction Id 7atHm2piVehEitYeMF2FxWuRJVd6ZdRQEo3K83P98GuR
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:62290/transactions/7atHm2piVehEitYeMF2FxWuRJVd6ZdRQEo3K83P98GuR
Done deploying to goteam.test.near
```

If we open the link to the explorer, we should see the transaction where the contract was deployed:

![Local explorer contract deployed](/docs/assets/kurtosis/local-explorer-contract-deployed.png)

### Minting an NFT

Let's go ahead and mint an NFT now. Firstly, we need to initialize the contract by running the following command. This will initialize the contract with some default metadata and set our account ID as the owner of the contract:

```bash
local_near call $ACCOUNT_ID new_default_meta '{"owner_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID
```

Now that the contract is initialized, everything is ready to go and we can mint our first NFT! Run the following command to mint a surprise NFT:

```bash
local_near call $ACCOUNT_ID nft_mint '{"token_id": "team_token", "metadata": { "title": "Go Team!", "description": "Go Team!", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif", "copies": 1}, "receiver_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID --amount 0.1
```

### Seeing your NFT in the Collectibles Tab

Once the NFT has been minted, we can view the token on the local wallet's collectibles tab. If you already had the wallet site open, simply refresh.

![Local wallet collectibles tab](/docs/assets/kurtosis/local-wallet-collectibles-tab.png)

I won't spoil what the NFT is but once you switch over to the collectibles tab, your beautiful token should be there!

With that, we've covered how to deploy a contract and view a collectible in the local wallet site. In the next section, we'll discuss how to wire up a dApp to localnet.

## Wiring up a dApp Locally

Let's see how we can integrate localnet into one of the most popular NEAR examples, the [guestbook](https://github.com/near-examples/guest-book) tutorial. We'll start off by cloning the repo by running the following command:

```bash
git clone https://github.com/near-examples/guest-book.git
```

We then need to tell dApp's config what node URL, wallet URL and validator key path to use. This can be done by navigating to the `src/config.js` file and scrolling down to where we see the localnet config. This is what the app will use when interacting with the blockchain. We need to replace the networkId, nodeUrl, keyPath, and walletUrl to be what we're using locally. The local case should start out looking like this:

```javascript
case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        contractName: CONTRACT_NAME
      };
```

To get access to the networkId, nodeUrl, keyPath, and walletUrl, we can quickly check the contents of our environment variables we had set earlier:

```bash
echo $NEAR_CLI_LOCALNET_NETWORK_ID
echo $NEAR_NODE_URL
echo $NEAR_CLI_LOCALNET_KEY_PATH
echo $NEAR_WALLET_URL
```

After replacing the variables in the config and saving, the config should look similar to the following:

```javascript
 case 'local':
      return {
        networkId: 'localnet',
        nodeUrl: 'http://127.0.0.1:62285',
        keyPath: `/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json`,
        walletUrl: 'http://127.0.0.1:62292',
        contractName: CONTRACT_NAME
      };
```

We now need to tell the dApp that we want to use localnet. To do this, simply set the `NODE_ENV` environment variable to be `local` as follows:

```bash
export NODE_ENV=local
```

At this point, our dApp is fully configured to use localnet. You may have noticed a contractName variable. This is where the guest-book contract should be deployed to. In our case, we only have 1 account with the NFT contract deployed. Let's quickly create a subaccount to deploy the guest-book contract to.

Using the local_near CLI, let's run the following command:

```bash
local_near create-account guest-book.$ACCOUNT_ID --masterAccount $ACCOUNT_ID --initialBalance 5
```

This should output the following:

```bash
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Saving key to 'undefined/localnet/guest-book.goteam.test.near.json'
Account guest-book.goteam.test.near for network "localnet" was created.
```

You can also create an account using the flow we've seen before where you navigate to the wallet site, create an acccount, and login on your machine using `local_near login`.

Once your new account has been created, let's export the `CONTRACT_NAME` environment variable to be equal to the account we just created:

```bash
export CONTRACT_NAME=guest-book.$ACCOUNT_ID
```

We are now ready to startup the frontend on localnet! Simply running a `yarn && yarn start` in the root directory of the repo should do the trick. It should output something similar to the following:

![Local dApp build](/docs/assets/kurtosis/local-dapp-build.png)

> **Tip:** If you run into any problems getting to the frontend, try clearing your browser's local storage. If you've used the guest-book before, your browser might think you're still logged in with your testnet account and it will throw an error saying it can't find that account on localnet.

If we now navigate to the local port that the app was deployed to (in my case it was `http://localhost:1234`), we should be greeted by the guest-book landing page as shown below:

![Local Guest Book Landing Page](/docs/assets/kurtosis/local-guest-book-landing.png)

If you now click the login button and login with your original account (not the account the guest-book contract is deployed to), it will create a function call access key as shown below:

![Local Guest Book Function Access Key Login](/docs/assets/kurtosis/guest-book-function-access-key.png)

Once you've logged in, you can sign a message with an optional Donation parameter. The transaction should show up once signed in the Messages table as shown below:

![Local Guest Book Signed Message](/docs/assets/kurtosis/local-guest-book-signed-message.png)

If we go to the local explorer, we can see the transaction we just signed and voila! We've connected our dApp to localnet!

![Local Explorer Signed Transaction](/docs/assets/kurtosis/local-explorer-signed-transaction.png)

## Conclusion

At this point, we've deployed an NFT contract, minted an NFT, and had it show up in a local instance of the NEAR wallet. We've signed messages on the guest-book dApp, and analyzed transactions on a local explorer. Local testing has never been easier!

## Manage your local NEAR cluster

The cluster you started will continue to run on your local machine for as long as your Docker engine is running (which, in most cases, is for as long as you don't restart your computer). The cluster runs inside of a Kurtosis "enclave", an environment isolated from both your computer and other enclaves; in practice, this means that you can have multiple independent local NEAR clusters running on your machine simply by rerunning the script we executed from the [first step](#launching-cluster).

To see the status of your existing enclaves, run:

```
kurtosis enclave ls
```

To see detailed information about an enclave, copy an enclave ID and run:

```
kurtosis enclave inspect THE_ENCLAVE_ID
```

To shut down your cluster to free up resources on your machine, run the following (NOTE: You will not be able to restart the cluster! If this is something you need, please file an issue [here](https://github.com/kurtosis-tech/kurtosis-cli-release-artifacts) so we can prioritize it):

```
kurtosis enclave stop THE_ENCLAVE_ID
```

Stopping an enclave leaves its resources intact so that you can examine them if need be. To destroy a stopped enclave and free its resources, run:

```
kurtosis clean
```

If you would like to destroy _all_ enclaves, regardless of if they're running, pass the `-a` flag to `clean` like so:

```
kurtosis clean -a
```

This can be a handy way to clear all your Kurtosis data.
