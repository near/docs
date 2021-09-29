---
id: minting-ipfs
title: Minting NFTs using IPFS
sidebar_label: Minting using IPFS
---

<!--
Introduces the tutorial and the end goals of minting an NFT and having it show up in your wallet. 

Thanks to a fast protocol and low gas fees, NEAR is a perfect platform to create Non-Fungible Tokens (NFTs).



This tutorial will guide you in setting up an NFT smart contract, and show you how to test, deploy, and run your NFT contract on NEAR. In this article, 

There is no previous Rust development required for this tutorial. Users familiar with the `near-cli` may choose to jump straight into the samples available at near.dev.
-->


## What's an NFT?

Non-Fungible Tokens (NFTs) are digital certificates of ownership for digital assets.
An NFT is a smart contract that is utilized for securing a digital asset.
Once written, it is published into a token (ERC-721) on the blockchain.
Anything can be turned into an NFT, with the most popular being videos, media files, or images.

NFTs are unique digital assets that have their identifying information recorded on a smart contract.
The information on the smart contract is what makes an NFT unique. Fungible assets like Bitcoin
can be exchanged, meaning you can send or receive bitcoins without any hitches. Fungible assets
are also divisible, allowing you to send smaller amounts. Non-fungible assets are not divisible.
For example, you can’t send someone a part of a painting or a ticket.

> A non-fungible asset has a distinct property or properties that set it apart from other assets.
> Non-fungible tokens are based on non-fungible assets and are unique digital assets that use blockchain technology.
> An example of a non-fungible asset can be a unique painting or limited edition collectibles.

## Prerequisites

To complete this tutorial successfully, you'll need:

- [Rust toolchain](/docs/develop/contracts/rust/intro#installing-the-rust-toolchain)
- [A NEAR account](#wallet)
- [nft.storage account](#uploading-the-image)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

## Wallet

To store your non-fungible tokens you'll need a [Wallet](https://wallet.testnet.near.org/) account.
If you don't have one yet, you can create one easily by following [these instructions](/docs/develop/basics/create-account).

> **Tip:** for this tutorial we'll use a `testnet` wallet account. The `testnet` network is free and there's no need to deposit funds.

Once you have your Wallet account, you can click on the [Collectibles](https://wallet.testnet.near.org/?tab=collectibles) tab where all your NFTs will be listed:

![Wallet](/docs/assets/nfts/nft-wallet.png)

<!--
Briefly talks about how the wallet listens for methods that start with `nft_` and then flags the contracts. 
-->

## IPFS

The [InterPlanetary File System](https://ipfs.io/) (IPFS) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

### Uploading the image

To upload the NFT image, we are going to use the free [NFT Storage](https://nft.storage/#getting-started) service,
built specifically for storing off-chain NFT data.
NFT Storage offers free decentralized storage and bandwidth for NFTs on [IPFS](https://ipfs.io/) and [Filecoin](https://filecoin.io/).

#### Steps

1. [Register an account](https://nft.storage/login/) and log in to [nft.storage](https://nft.storage/login/).

2. Go to the [Files](https://nft.storage/files/) section, and click on the [Upload](https://nft.storage/new-file/) button.

![nft.storage](/docs/assets/nfts/nft-storage.png)

3. Once you have uploaded your file, you'll get a unique `CID` for your content, and a URL like:
   ```
   https://bafyreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/
   ```

> **Tip:** check the [NFT.Storage Docs](https://nft.storage/api-docs/) for information on uploading multiple files and available API endpoints.


## Non-fungible Token contract

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

> **Note:** the more complex simulation tests aren't run with this command, but we can find them in `tests/sim`.

## Use the NFT contract

Now that you have successfully built and tested the NFT smart contract, you're ready to [deploy it](#deploying-the-contract),
and start using it [to mint](#minting-your-nfts) and [transfer](#transferring-your-nfts) your non-fungible tokens.

### Deploying the contract

This smart contract will get deployed to your NEAR account. Because NEAR allows the ability to upgrade contracts on the same account, initialization functions must be cleared. 

> **Note:** If you'd like to run this example on a NEAR account that has had prior contracts deployed, please use the `near-cli` command `near delete`, and then recreate it in Wallet. To create (or recreate) an account, please follow the directions in [Test Wallet](https://wallet.testnet.near.org) or ([NEAR Wallet](https://wallet.near.org/) if we're using `mainnet`).

In the project root, log in to your newly created account with `near-cli` by following the instructions after this command.

```bash
near login
```

To make this tutorial easier to copy/paste, we're going to set an environment variable for our account id. In command below, replace `MY_ACCOUNT_NAME` with the account name we just logged in with, including the `.testnet` (or `.near` for `mainnet`):

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

### Minting your NFTs

The NFT contract should be initialized before usage. But for now, we'll initialize with the default metadata:

```bash
near call $ID new_default_meta '{"owner_id": "'$ID'"}' --accountId $ID
```

> **Tip:** you can find more info about the NFT metadata at [nomicon.io](https://nomicon.io/Standards/NonFungibleToken/Metadata.html).

We'll be able to view our metadata right after:

```bash
near view $ID nft_metadata
```

<details>
<summary>Example response: </summary>
<p>

```json
{
  spec: 'nft-1.0.0',
  name: 'Example NEAR non-fungible token',
  symbol: 'EXAMPLE',
  icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
  base_uri: null,
  reference: null,
  reference_hash: null
}
```
</p>
</details>

Then, let's mint our first token. This will create a NFT based on the file we [uploaded to IPFS](#uploading-the-image), where only one copy exists:

```
near call $ID nft_mint '{"token_id": "0", "receiver_id": "'$ID'", "token_metadata": { "title": "Some Art", "description": "My NFT media", "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/", "copies": 1}}' --accountId $ID --deposit 10
```

<details>
<summary>Example response: </summary>
<p>

```json
{
  token_id: '0',
  owner_id: 'dev-xxxxxx-xxxxxxx',
  metadata: {
    title: 'Some Art',
    description: 'My NFT media',
    media: 'https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/',
    media_hash: null,
    copies: 1,
    issued_at: null,
    expires_at: null,
    starts_at: null,
    updated_at: null,
    extra: null,
    reference: null,
    reference_hash: null
  },
  approved_account_ids: {}
}
```
</p>
</details>

Checking the account for tokens:

```bash
near view $ID nft_tokens_for_owner '{"account_id": "'$ID'"}'
```

<details>
<summary>Example response: </summary>
<p>

```json
[
  {
    token_id: '0',
    owner_id: 'dev-xxxxxx-xxxxxxx',
    metadata: {
      title: 'Some Art',
      description: 'My NFT media',
      media: 'https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/',
      media_hash: null,
      copies: 1,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    approved_account_ids: {}
  }
]
```
</p>
</details>

> <br/>
>
> **Tip:** after you mint your first non-fungible token, you can [view it in your Wallet](https://wallet.testnet.near.org/?tab=collectibles):
>
> ![Wallet with token](/docs/assets/nfts/nft-wallet-token.png)
>
> <br/>

## Final remarks

Talks about possible extensions and some cool projects using NFTs
If we end up expanding the tutorial, mention this here. 
