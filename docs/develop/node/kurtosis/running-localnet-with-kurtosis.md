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

### Launch Kurtosis NEAR Module {#launching-cluster}

Launch your Kurtosis NEAR Module in four easy steps!

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

### Setup Environment Variables

After deploying your Kurtosis NEAR Module, you will need to setup some environment variables to make life a lot easier. Notice the **ACTION** sections in your terminal log from the module deployment. You will be using these exact values to setup these variables. 

1) Follow the first ACTION item from the deployment log by copying all of the export commands and running them in your terminal.

**Example exports: (DO NOT COPY ~ yours will be slightly different)**

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

2) Proceed to the second ACTION item which asks you to create an alias for `local_near`. This is what we wil use when running [`near-cli`](/docs/tools/near-cli) commands with our test environment. 

**Example alias: (DO NOT COPY ~ yours will be slightly different)**

```bash
alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:62285" NEAR_CLI_LOCALNET_KEY_PATH="/Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:62292" NEAR_HELPER_URL="http://127.0.0.1:62286" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:62290" near'
```

Now replacing `near` with `local_near` when running [`near-cli`](/docs/tools/near-cli) commands will perform these actions in your local test environment.

### Testing

Ensure that your alias is working correctly by checking the state of the root account `test.near`.

Run the following in your terminal:

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

**Example Response (DO NOT COPY ~ yours will be slightly different):**

```bash
http://127.0.0.1:51395
```

- Click on the URL displayed in the terminal to launch your local NEAR Wallet or copy/paste this address in your browser.

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

Again, now that you have [everything setup](#setup) you can view the transaction details of the command you just performed at the end of [the last section](/docs/develop/node/kurtosis/running-localnet-with-kurtosis#local-near-wallet). Notice that the last line of the terminal log displays a link to the transaction details in your local NEAR Explorer.

```bash
Sending 1 NEAR to test.near from goteam.test.near
Loaded master account test.near key from /Users/joshford/.neartosis/2021-12-14T23.18.50/validator-key.json with public key = ed25519:BqXJreHVemtzZuTWHYn7S3xsykPBFRHtw5sCRL5rrF9d
Transaction Id 9TtD8Fs4VjyY3NFvzp5VWnGUdCQ6krEPsWytCpNXHs2d
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:53009/transactions/9TtD8Fs4VjyY3NFvzp5VWnGUdCQ6krEPsWytCpNXHs2d
```

- Click on this link or copy/paste it into your browser:

![Local explorer sending 1 NEAR](/docs/assets/kurtosis/local-explorer-send-funds.png)

Here everything behaves exactly like the `testnet` or `mainnet` NEAR Explorer except it is retrieving data from your local NEAR blockchain!

- If you ever need to open your local NEAR Explorer and don't have the address saved, you can always run the following command:


```bash
echo $NEAR_EXPLORER_URL
```

**Example Response (DO NOT COPY ~ yours will be slightly different):**

```bash
http://127.0.0.1:51327
```

![Localnet explorer](/docs/assets/kurtosis/localnet-explorer.png)


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

Now, let's interact with the deployed contract.

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

## Connecting a dApp to `localnet`

The ability to develop decentralized applications locally is a dream come true for dApp developers and the Kurtosis NEAR Module really simplifies this process. Here you'll integrate `localnet` into one of the examples at [near.dev](http://near.dev).

### Clone Example dApp

- Clone the [NEAR Guestbook](https://github.com/near-examples/guest-book) repository:

```bash
git clone https://github.com/near-examples/guest-book.git
```

### Configure Network

- Open the `src/config.js` file inside the guestbook repo and scroll down to the `local` config:

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

Here you will need to update all of the values **except** the `contractName`.

- Start by updating the `networkId` from `local` to `localnet`. 

The remaining values will need to be retrieved by checking the [environment variables you setup earlier](#setup).

- Run:

```bash
echo $NEAR_NODE_URL
echo $NEAR_CLI_LOCALNET_KEY_PATH
echo $NEAR_WALLET_URL
```

- Now update these three values in your `config.js` file.

Your `local` config should now look something like:

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

The last thing you will need to do is set your `NODE_ENV` in your terminal to `local` so your dApp will use the values we configured above.

- Run:

```bash
export NODE_ENV=local
```

**Your dApp is now fully configured to use `localnet`!** 🎉

### Create Contract Account

As we mentioned earlier, you do not need to change the `contractName` in the `config.js` file we updated earlier. This is an environment valuable we will configure now. Let's quickly create a subaccount from [the account you created earlier](/docs/develop/node/kurtosis/running-localnet-with-kurtosis#local-near-wallet) to deploy the guest-book contract to.

- Using the `local_near CLI`, run the following command:

```bash
local_near create-account guest-book.$ACCOUNT_ID --masterAccount $ACCOUNT_ID --initialBalance 5
```

**Example Response:**

```bash
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Saving key to 'undefined/localnet/guest-book.goteam.test.near.json'
Account guest-book.goteam.test.near for network "localnet" was created.
```

- Export the `CONTRACT_NAME` environment variable as the account you just created:

```bash
export CONTRACT_NAME=guest-book.$ACCOUNT_ID
```

### Deploy Contract to `localnet`

With the network setup and contract account created you are now ready to launch your dApp! 

- Run the following command in the root directory of the guest book repo:

```bash
yarn && yarn start
```

**Example Response:**

![Local dApp build](/docs/assets/kurtosis/local-dapp-build.png)

- Open the dApp by clicking on the server address in the terminal:

```bash
Server running at http://localhost:1234
✨  Built in 1.20s.
```

You should see the Guest Book landing page:

![Local Guest Book Landing Page](/docs/assets/kurtosis/local-guest-book-landing.png)

:::tip

 If you run into any problems signing into try clearing your browser's local storage. If you've used the guest-book before your browser might think you're still logged in with your `testnet` account and it will throw an error saying it can't find that account on `localnet`.

:::

Once you've logged in, you can sign a message with an optional donation. 

![Local Guest Book Signed Message](/docs/assets/kurtosis/local-guest-book-signed-message.png)

- Sign the Guest Book which will create a transaction on `localnet`. 

- Once complete, open your local NEAR explorer and you can view the transaction you just created!

![Local Explorer Signed Transaction](/docs/assets/kurtosis/local-explorer-signed-transaction.png)


**Congratulations! You've successfully deployed and interacted with a dApp on a local NEAR blockchain!** 🎉

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
