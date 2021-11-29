---
id: running-localnet-with-kurtosis
title: Running the NEAR Stack Locally with Kurtosis
sidebar_label: Running the NEAR Stack Locally with Kurtosis
description: Using Kurtosis to easily run NEAR's stack on your local machine.
---

Kurtosis has made local testing and development trivial with the use of Docker. This tutorial provides an easy way to setup a local environment which includes the indexer for explorer, the NEAR wallet, the explorer itself, and a local RPC endpoint you can connect dApps to.

## Prerequisites {#prerequisites}

To complete this tutorial successfully, you'll need:

- [Docker](https://docs.docker.com/get-docker/)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

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

1. Download and run [this script](https://github.com/kurtosis-tech/near-kurtosis-module/blob/develop/launch-local-near-cluster.sh). An easy way to do this is as follows:
   1. Create a shell script on your local machine (by creating a file ending with `.sh`).
   1. Copy the contents of the script into file you just created.
   1. Run the script by going to the directory and running `./path/to/your/script.sh`
   1. If your terminal complains about permissions, give the file executable permissions by running `chmod u+x /path/to/your/script`.

This should print some very useful information such as the URLs for the wallet and explorer. The output should look as follows:

```
Explorer URL: http://127.0.0.1:60211
Wallet URL: http://127.0.0.1:60211

  ACTION Paste the following into your terminal now to use the 'local_near' command as a replacement for the NEAR CLI for connecting to your local cluster (e.g. 'local_near login'):

           alias local_near='near --nodeUrl http://127.0.0.1:60199 --walletUrl http://127.0.0.1:60211 --helperUrl http://127.0.0.1:60200 --keyPath /Users/benjaminkurrek/.neartosis/2021-11-23T17.17.13/validator-key.json --networkId localnet --masterAccount test.near'

  ACTION If you want the 'local_near' command available in all your terminal windows, add the above alias into your .bash_profile/.bashrc/.zshrc
         file and open a new terminal window

  ACTION To stop your cluster:
          1. Run 'kurtosis enclave ls'
          2. Copy the enclave ID that your NEAR cluster
          3. Run 'kurtosis enclave stop THE_ID_YOU_COPIED'

  ACTION To remove stopped clusters, run 'kurtosis clean'. You can also run 'kurtosis clean -a' to stop & remove *all* clusters, including running ones.
```

For later, let's export some environment variables for quick reference. Let's create one for the explorer URL, the wallet URL, and the node URL by running the following (replace `INSERT_URL` with the correct URLs found in the output above). In addition, let's create one for the path to our validator key.

> **Tip:** The node URL and validator key path can be found in the `alias local_near` command and the wallet / explorer URLs are found at the top of the output above.

```bash
export EXPLORER_URL=INSERT_URL
export WALLET_URL=INSERT_URL
export NODE_URL=INSERT_URL
export VALIDATOR_KEY_PATH=INSERT_PATH
```

At this point, we want to run the command that creates the `local_near` alias. In my case, the command was:

```bash
alias local_near='near --nodeUrl http://127.0.0.1:60199 --walletUrl http://127.0.0.1:60211 --helperUrl http://127.0.0.1:60200 --keyPath /Users/benjaminkurrek/.neartosis/2021-11-23T17.17.13/validator-key.json --networkId localnet --masterAccount test.near'
```

What we've done is that we've created an alias to the NEAR CLI called `local_near`. It will behave exactly the same as the regular CLI, we've just set some variables to be used so we don't have to keep adding flags everytime we want to run a NEAR CLI command. Running the command `local_near` should give a similar output to if you were running the command `near`.

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

![Local explorer sending 1 NEAR](/docs/assets/kurtosis/local-explorer-send-funds.png)

## Interacting with a Smart Contract

Let's now go ahead and deploy a basic NFT contract on localnet. The end goal is to have the NFT show up under the collectibles tab in the wallet. The repo can be found [here](https://github.com/near-examples/nft-tutorial.git).

### Deploying the Contract

To clone the repo, run the following in your terminal:

```bash
git clone https://github.com/near-examples/nft-tutorial.git
```

After cloning the repo, let's build the smart contract by running `yarn build`. This will compile both a marketplace contract and NFT contract into WebAssembly so that we can deploy to the local blockchain. For the purpose of this tutorial, we only care about the NFT contract.

> **Tip:** If you don't have yarn installed, be sure to check out these installation [instructions](https://classic.yarnpkg.com/lang/en/docs/install)

The command we just ran should have created a folder `out` which contains both a `market.wasm` and a `main.wasm` file. Let's go ahead and deploy the NFT contract to the account ID we've been using by running the following command:

```bash
local_near deploy --wasmFile out/main.wasm --accountId $ACCOUNT_ID
```

If we not open the explorer and navigate to our account page, we should see the contract was deployed:

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

Once the NFT has been minted, we can view token on the local wallet's collectibles tab which can be found here:

![Local wallet collectibles tab](/docs/assets/kurtosis/local-wallet-collectibles-tab.png)

I won't spoil what the NFT is but once you switch over to the collectibles tab, your beautiful token should be there!

With that, we've covered how to deploy a contract and view a collectible in the local wallet site. In the next section, we'll discuss how to wire up a dApp to localnet.

## Wiring up a dApp Locally

Let's see how we can integrate localnet into one of the most popular NEAR examples, the [guestbook](https://github.com/near-examples/guest-book) tutorial. We'll start off by cloning the repo by running the following command:

```bash
git clone https://github.com/near-examples/guest-book.git
```

We then need to tell dApp's config what node URL, wallet URL and validator key path to use. This can be done by navigating to the `src/config.js` file and scrolling down to where we see the localnet config. This is what the app will use when interacting with the blockchain. We need to replace the networkId, nodeUrl, keyPath, and walletUrl to be what we're using locally.

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

To get access to the nodeUrl, keyPath, and walletUrl, we can quickly check the contents of our environment variables we had set earlier:

```bash
echo $NODE_URL
echo $VALIDATOR_KEY_PATH
echo $WALLET_URL
```

After replacing the variables in the config and saving, it should look similar to the following:

```javascript
case 'local':
      return {
        networkId: 'localnet',
        nodeUrl: 'http://127.0.0.1:63437',
        keyPath: `/Users/benjaminkurrek/.neartosis/2021-11-24T09.38.32/validator-key.json`,
        walletUrl: 'http://127.0.0.1:59537',
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

You can also create an account using the flow we've seen before where you navigate to the wallet site, create an acccount, and login on your machine using `local_near login`.

Once your new account has been created, let's export the `CONTRACT_NAME` environment variable to be equal to the account we just created:

```bash
export CONTRACT_NAME=YOUR_ACCOUNT_HERE
```

We are now ready to startup the frontend on localnet! Simply running a `yarn start` in the root directory of the repo should do the trick. It should output something similar to the following:

![Local dApp build](/docs/assets/kurtosis/local-dapp-build.png)

If we now navigate to the local port that the app was deployed to (in my case it was `http://localhost:1234`), we should be greeted by the guest-book landing page as shown below:

![Local Guest Book Landing Page](/docs/assets/kurtosis/local-guest-book-landing.png)

If you now click the login button and login with your original account (not the account the guest-book contract is deployed to), it will create a function call access key as shown below:

![Local Guest Book Function Access Key Login](/docs/assets/kurtosis/guest-book-function-access-key.png)

Once you've logged in, you can sign a message with an optional Donation parameter. The transaction should show up once signed in the Messages table as shown below:

![Local Guest Book Signed Message](/docs/assets/kurtosis/local-guest-book-signed-message.png)

If we go to the local explorer (kept in our EXPLORER_URL environment variable), we can see the transaction we just signed and voila! We've connected our dApp to localnet!

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
