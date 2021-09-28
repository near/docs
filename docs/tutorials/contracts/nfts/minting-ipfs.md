---
id: minting-ipfs
title: Minting NFTs using IPFS
sidebar_label: Minting using IPFS
---


## Overview


## Prerequisites

To complete this tutorial successfully, you'll need:

- [Rust toolchain](/docs/develop/contracts/rust/intro#installing-the-rust-toolchain)
- [A NEAR account](/docs/develop/contracts/rust/intro#creating-a-near-account)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

## Wallet

## IPFS

The [InterPlanetary File System](https://ipfs.io/) (IPFS) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

### Upload the image

https://nft.storage/#getting-started

1. Register an [nft.storage](https://nft.storage/login/) account so that you can create API access keys.

2. [Create an API access key](https://nft.storage/manage/) and note it down.
(The key should look like `eyJhbGciOi...`)

Configure your HTTP client and set the Authorization header:

```
"Authorization": "Bearer YOUR_API_KEY"
```

3. Submit a `HTTP POST` request to `api.nft.storage/upload`, passing the file data in the request body. e.g.

```
curl -X POST --data-binary @/path/to/file/art.jpg -H 'Authorization: Bearer YOUR_API_KEY' https://api.nft.storage/upload
```

Successful requests will receive a `HTTP 200` status and `application/json` response like:

```json
{
  "ok": true,
  "value": { "cid": "bafy..." }
}
```

Check the API Docs for information on uploading multiple files and the other available endpoints.


## Non-fungible Token (NFT) contract

[This repository](https://github.com/near-examples/NFT) includes an example implementation of a [non-fungible token] contract which uses [near-contract-standards] and [simulation] tests.

  [non-fungible token]: https://nomicon.io/Standards/NonFungibleToken/README.html
  [near-contract-standards]: https://github.com/near/near-sdk-rs/tree/master/near-contract-standards
  [simulation]: https://github.com/near/near-sdk-rs/tree/master/near-sdk-sim


### Clone the NFT repository

```
git clone https://github.com/near-examples/NFT
```

### Explore the smart contract

The source for this contract is in `nft/src/lib.rs`. It provides methods to manage access to tokens, transfer tokens, check access, and get token owner. Note, some further exploration inside the rust macros is needed to see how the `NonFungibleToken` contract is implemented.

> **Note:** This contract does not include escrow functionality, as `ft_transfer_call` provides a superior approach. An escrow system can, of course, be added as a separate contract or additional functionality within this contract.

### Building the contract

Run the following, and we'll build our rust project up via `cargo`. This will generate our WASM binaries into our `res/` directory. This is the smart contract we'll be deploying onto the NEAR blockchain later.

```bash
./build.sh
```

### Testing the contract

We have some tests that you can run. For example, the following will run our simple tests to verify that our contract code is working.

```bash
cargo test -- --nocapture
```

The more complex simulation tests aren't run with this command, but we can find them in `tests/sim`.

## Use the smart contract

### Deploying the contract

This smart contract will get deployed to your NEAR account. Because NEAR allows the ability to upgrade contracts on the same account, initialization functions must be cleared. If you'd like to run this example on a NEAR account that has had prior contracts deployed, please use the `near-cli` command `near delete`, and then recreate it in Wallet. To create (or recreate) an account, please follow the directions in [Test Wallet](https://wallet.testnet.near.org) or ([NEAR Wallet](https://wallet.near.org/) if we're using `mainnet`).

In the project root, log in to your newly created account with `near-cli` by following the instructions after this command.

```bash
near login
```

To make this tutorial easier to copy/paste, we're going to set an environment variable for our account id. In the below command, replace `MY_ACCOUNT_NAME` with the account name we just logged in with, including the `.testnet` (or `.near` for `mainnet`):

```bash
ID=MY_ACCOUNT_NAME
```
We can tell if the environment variable is set correctly if our command line prints the account name after this command:

```bash
echo $ID
```

Now we can deploy the compiled contract in this example to your account:

```bash
near deploy --wasmFile res/non_fungible_token.wasm --accountId $ID
```

NFT contract should be initialized before usage. More info about the metadata at [nomicon.io](https://nomicon.io/Standards/NonFungibleToken/Metadata.html). But for now, we'll initialize with the default metadata.

```bash
near call $ID new_default_meta '{"owner_id": "'$ID'"}' --accountId $ID
```

We'll be able to view our metadata right after:

```bash
near view $ID nft_metadata
```

Then, let's mint our first token. This will create a NFT based on Olympus Mons where only one copy exists:

```
near call $ID nft_mint '{"token_id": "0", "receiver_id": "'$ID'", "token_metadata": { "title": "Olympus Mons", "description": "Tallest mountain in charted solar system", "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg", "copies": 1}}' --accountId $ID --deposit 10
```

Checking the account for tokens:

```bash
near view $ID nft_tokens_for_owner '{"account_id": "'$ID'"}'
```


### Transferring your NFT

> **Note:** Before transferring, please create an additional `testnet` account to transfer our freshly minted token to.

Then we'll transfer over the NFT into Alice's account. Exactly 1 yoctoNEAR of deposit should be attached:

```bash
near call $ID nft_transfer '{"token_id": "0", "receiver_id": "YOUR_DESTINATION_ACCOUNT.testnet", "memo": "transfer ownership"}' --accountId $ID --deposit 0.000000000000000000000001
```

If you check your target account again, the Wallet will show the NFT token that you minted in the previous step.
