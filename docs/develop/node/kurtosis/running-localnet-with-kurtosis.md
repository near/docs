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
- [Kurtosis CLI](https://docs.kurtosistech.com/installation.html)

---

## Setup

### Run Docker w/ 4GB RAM

To launch a Kurtosis NEAR Module you will need to have your Docker engine running with 4GB of memory. By default, Docker is configured to have 2GB of available memory, so you will need to increase this value.

- Open the "Docker Desktop" program (which will start your Docker engine if it's not already running)
- Go to settings (gear icon in upper right corner)
- Select the "Resources" tab from the left-hand menu
- Increase memory to 4GB or more
- Select "Apply & Restart"
- Wait until engine restarts and the whale icon in the bottom-left corner of the app is green

### Launch Kurtosis NEAR Module {#launching-cluster}

Next, you will launch the Kurtosis NEAR Module. 

1) Copy the [Kurtosis NEAR Module launch script](https://github.com/kurtosis-tech/near-kurtosis-module/blob/develop/launch-local-near-cluster.sh) by running the following:

```bash
curl -o ~/launch-local-near-cluster.sh https://raw.githubusercontent.com/kurtosis-tech/near-kurtosis-module/master/launch-local-near-cluster.sh -L
```

2) Grant write permission to the script file you just downloaded:

```bash
chmod u+x ~/launch-local-near-cluster.sh
```

3) Launch the the Kurtosis NEAR Module by running the script:

```bash
~/launch-local-near-cluster.sh
```

<details>
<summary>Example response: </summary>
<p>

```bash
Created directory '/Users/joshford/.neartosis' for storing all NEAR-in-Kurtosis output
INFO[2021-12-14T17:36:28-08:00] Pulling image 'kurtosistech/near-kurtosis-module'...
INFO[2021-12-14T17:36:36-08:00] Creating enclave for the module to execute inside...
INFO[2021-12-14T17:36:36-08:00] No Kurtosis engine was found; attempting to start one...
INFO[2021-12-14T17:36:36-08:00] Pulling image 'kurtosistech/kurtosis-engine-server:1.8.2'...
INFO[2021-12-14T17:36:40-08:00] Successfully started Kurtosis engine
INFO[2021-12-14T17:36:45-08:00] Enclave 'near-kurtosis-module_1639532196' created successfully
INFO[2021-12-14T17:36:45-08:00] Loading module 'kurtosistech/near-kurtosis-module' with load params '{}'...
INFO[2021-12-14T17:36:47-08:00] Module loaded successfully
INFO[2021-12-14T17:36:47-08:00] Executing the module with execute params '{}'...
INFO[2021-12-14T17:36:47-08:00] ----------------------- MODULE LOGS ----------------------
NEAR module initialization args:
{}
Serialized execute params '{}'
Adding contract helper DB running on port '5432'
Adding indexer service...
Adding contract helper service running on port '3000'
Adding wallet running on port '3004'
Near module executed successfully
INFO[2021-12-14T17:40:18-08:00] --------------------- END MODULE LOGS --------------------
INFO[2021-12-14T17:40:18-08:00] Module executed successfully and returned the following result:
{
    "networkName": "localnet",
    "rootValidatorKey": {
        "account_id": "test.near",
        "public_key": "ed25519:3UTWui7YL6ByxjmaFHUjDqSU2UvHxouwGkUgMk3HYjW1",
        "secret_key": "ed25519:2cKD9jCqWFHYcxvH7jJaZeHz4ZHr9scbyp5nB76Hpep81aEKAu2zRKAHRTtsdAfXMjJmuUshfbJ5jaDEkSrPiMnh"
    },
    "nearNodeRpcUrl": "http://127.0.0.1:51239",
    "contractHelperServiceUrl": "http://127.0.0.1:51284",
    "walletUrl": "http://127.0.0.1:51395",
    "explorerUrl": "http://127.0.0.1:51357"
}
============================================= SUCCESS ==============================================
  ACTION Paste the following in your terminal to declare the following variables so you can use them:

           export NEAR_ENV="local"
           export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
           export NEAR_NODE_URL="http://127.0.0.1:51239"
           export NEAR_CLI_LOCALNET_KEY_PATH="/Users/joshford/.neartosis/2021-12-14T17.36.28/validator-key.json"
           export NEAR_WALLET_URL="http://127.0.0.1:51395"
           export NEAR_HELPER_URL="http://127.0.0.1:51284"
           export NEAR_HELPER_ACCOUNT="test.near"
           export NEAR_EXPLORER_URL="http://127.0.0.1:51357"

  ACTION Paste the following into your terminal now to use the 'local_near' command as a replacement for the NEAR CLI for connecting to your
         local cluster (e.g. 'local_near login'):

         alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:51239" NEAR_CLI_LOCALNET_KEY_PATH="/Users/joshford/.neartosis/2021-12-14T17.36.28/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:51395" NEAR_HELPER_URL="http://127.0.0.1:51284" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:51357" near'

  ACTION If you want the 'local_near' command available in all your new terminal windows, add the above alias into your .bash_profile/.bashrc/.zshrc
         file and open a new terminal window.

  ACTION To stop your cluster:
          1. Run 'kurtosis enclave ls'
          2. Copy the enclave ID that your NEAR cluster is running inside
          3. Run 'kurtosis enclave stop ENCLAVE_ID_YOU_COPIED'

  ACTION To remove stopped clusters, run 'kurtosis clean'. You can also run 'kurtosis clean -a' to stop & remove *all* clusters,
         including running ones.
============================================= SUCCESS ==============================================
```

</p>
</details>

Notice the **ACTION** sections in your terminal log. We will use these in the next steps.

- First let's follow the first ACTION item by copying all of the export commands and run them in your terminal.

<details>
<summary>Example exports: (DO NOT COPY ~ Yours will be slightly different) </summary>
<p>

```bash
export NEAR_ENV="local"
export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
export NEAR_NODE_URL="http://127.0.0.1:52993"
export NEAR_CLI_LOCALNET_KEY_PATH="/Users/joshford/.neartosis/2021-12-14T23.18.50/validator-key.json"
export NEAR_WALLET_URL="http://127.0.0.1:53013"
export NEAR_HELPER_URL="http://127.0.0.1:52997"
export NEAR_HELPER_ACCOUNT="test.near"
export NEAR_EXPLORER_URL="http://127.0.0.1:53009"
```

</p>
</details>

- Proceed to the second ACTION item which asks you to create an alias for `local_near`. This is what we wil use when running `near-cli` commands with our test environment. 

<details>
<summary>Example alias: (DO NOT COPY ~ Yours will be slightly different) </summary>
<p>

```bash
alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:62285" NEAR_CLI_LOCALNET_KEY_PATH="/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:62292" NEAR_HELPER_URL="http://127.0.0.1:62286" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:62290" near'
```

</p>
</details>

Now replacing `near` with `local_near` when running `near-cli` commands will perform these actions in your local test environment.

Try testing out the new alias. Check the state of the root account `test.near` by running the following command:

```bash
local_near state test.near
```

This should return something similar to the following output:

```bash
Loaded master account test.near key from /Users/joshford/.neartosis/2021-12-14T23.18.50/validator-key.json with public key = ed25519:BqXJreHVemtzZuTWHYn7S3xsykPBFRHtw5sCRL5rrF9d
Account test.near
{
  amount: '1000000000000000000000000000000000',
  locked: '50000000000000000000000000000000',
  code_hash: '11111111111111111111111111111111',
  storage_usage: 182,
  storage_paid_at: 0,
  block_height: 220,
  block_hash: 'ASmGecQSktKmbD9HdCXPA48Lo3u7Ypm5ngWwRdrTWBnr',
  formattedAmount: '1,000,000,000'
}
```

**Congratulations! Setup is complete and you are ready to start exploring your local NEAR blockchain!** 🎉

:::tip

The Kurtosis Team has created a great [video presentation](https://www.loom.com/share/8a1b8e2138334a81a380f5d523fba27e) that covers the above steps as well as demoing the functionality of this local network setup.

:::

---

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
