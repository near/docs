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

Here is an easy way to launch your Kurtosis NEAR Module in four easy steps!

1) Launch [Docker](https://docs.docker.com/get-docker/)

2) Copy the [Kurtosis NEAR Module launch script](https://github.com/kurtosis-tech/near-kurtosis-module/blob/develop/launch-local-near-cluster.sh) by running the following:

```bash
curl -o ~/launch-local-near-cluster.sh https://raw.githubusercontent.com/kurtosis-tech/near-kurtosis-module/master/launch-local-near-cluster.sh -L
```

3) Grant write permission to the script file you just downloaded:

```bash
chmod u+x ~/launch-local-near-cluster.sh
```

4) Launch the the Kurtosis NEAR Module by running the script:

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

## Using Wallet and Explorer

### Local NEAR Wallet

Now that you have [everything setup](#setup), create an account using your local NEAR Wallet build. We can easily find this URL by running the following command that was configured in our variable exports during the setup.

```bash
echo $NEAR_WALLET_URL
```

Example Response:

```bash
http://127.0.0.1:51395
```

- Click on the URL displayed in the terminal to launch your local NEAR Wallet.

![Local wallet landing page](/docs/assets/kurtosis/local-wallet-landing-page.png)

The account creation is exactly the same as on mainnet or testnet but **only the passphrase recovery mode** will work here. Also note that the root account is `test.near` instead of `testnet` or `mainnet`. This means that all the accounts you create will be [subaccounts](/docs/concepts/account#subaccounts) of `test.near`. (ex. `benji.test.near`)

Now that you've created an account, try interacting with it using the local CLI. In order to use this account you will need to "login" with it via CLI which will save a full access key locally for that account. [`near login`](/docs/tools/near-cli#near-login) is the command to perform this action but as you are on `localnet` you will need to replace `near` with `local_near`.

```bash
local_near login
```

This launches the local wallet site and will ask for confirmation for this action. Once you authorize you should see confirmation in your terminal similar to this:

```bash
Logged in as [ goteam.test.near ] with public key [ ed25519:BrSg17... ] successfully
```

- Export your account ID to an environment variable by running the following: (replacing YOUR_ACCOUNT_ID)

```bash
export ACCOUNT_ID=YOUR_ACCOUNT_ID
```

- Now create a test transaction by sending 1 $NEAR to the root account `test.near`:

```bash
local_near send $ACCOUNT_ID test.near 1
```

<details>
<summary>Example response: </summary>
<p>

```bash
Sending 1 NEAR to test.near from goteam.test.near
Loaded master account test.near key from /Users/joshford/.neartosis/2021-12-14T23.18.50/validator-key.json with public key = ed25519:BqXJreHVemtzZuTWHYn7S3xsykPBFRHtw5sCRL5rrF9d
Transaction Id 9TtD8Fs4VjyY3NFvzp5VWnGUdCQ6krEPsWytCpNXHs2d
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:53009/transactions/9TtD8Fs4VjyY3NFvzp5VWnGUdCQ6krEPsWytCpNXHs2d
```

</p>
</details>

### Local NEAR Explorer

The command you just ran should have displayed something similar this:

```bash
Sending 1 NEAR to test.near from goteam.test.near
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Transaction Id B1C7MqgizuqjdPcLc3WmDuqvWtfxLtWaN8ugLss5PKPV
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:62290/transactions/B1C7MqgizuqjdPcLc3WmDuqvWtfxLtWaN8ugLss5PKPV
```

If you click on the URL at the bottom, the local NEAR Explorer will launch and display transaction details.

![Local explorer sending 1 NEAR](/docs/assets/kurtosis/local-explorer-send-funds.png)

Here everything behaves exactly like `testnet` or `mainnet` NEAR Explorer except it is retrieving data from your local NEAR blockchain!

---

## Deploy a Smart Contract

With everything setup and your `test.near` account created, let's deploy a smart contract on `localnet`. For this example we will deploy an NFT use a pre-compiled WASM smart contract from [this NFT example](https://github.com/near-examples/nft-tutorial.git).

- Download the smart contract:

```
curl -o ~/main.wasm https://github.com/near-examples/nft-tutorial/raw/main/out/main.wasm -L
```

- Deploy the smart contract:

```
local_near deploy --wasmFile ~/main.wasm --accountId $ACCOUNT_ID
```

<details>
<summary>Example response: </summary>
<p>

```
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Starting deployment. Account id: goteam.test.near, node: http://127.0.0.1:62285, helper: http://127.0.0.1:62286, file: /Users/benjaminkurrek/main.wasm
Transaction Id 7atHm2piVehEitYeMF2FxWuRJVd6ZdRQEo3K83P98GuR
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:62290/transactions/7atHm2piVehEitYeMF2FxWuRJVd6ZdRQEo3K83P98GuR
Done deploying to goteam.test.near
```

</p>
</details>

- Click on the clink to the Explorer and verify that the contract was deployed:

![Local explorer contract deployed](/docs/assets/kurtosis/local-explorer-contract-deployed.png)

### Minting an NFT

With the contract successfully deployed, mint your NFT. 

- First, initialize the contract by running the following command: 

```bash
local_near call $ACCOUNT_ID new_default_meta '{"owner_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID
```

This will initialize the contract with some default metadata and set our account ID as the owner of the contract.

- Now mint your first NFT!

```bash
local_near call $ACCOUNT_ID nft_mint '{"token_id": "team_token", "metadata": { "title": "Go Team!", "description": "Go Team!", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif", "copies": 1}, "receiver_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID --amount 0.1
```

Once the NFT has been minted, you can view the token on the local wallet's collectibles tab. If you already had the wallet site open, simply refresh. Otherwise open your local NEAR Wallet instance and view your collectible. 

![Local wallet collectibles tab](/docs/assets/kurtosis/local-wallet-collectibles-tab.png)

We won't spoil what the NFT is, but once you switch over to the collectibles tab your beautiful token should be there!

---

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
