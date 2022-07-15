---
id: minting-nft-frontend
title: Minting NFT Front-end
sidebar_label: Minting Front-end
---

# NFT Minting Front-end

> In this tutorial you'll learn how to create a simple NFT front-end and mint a "Go Team" NFT on the NEAR blockchain straight from your web browser.

## App Overview

The app is fairly simple: the user signs in and hits the <kbd>Mint NFT</kbd> button. Once the user hits the mint button, a "Go Team" NFT is minted and sent to their NEAR Wallet.

![Front-end](/docs/assets/nfts/nft-mint-frontend.png)

## Smart Contract code

The code for the NFT smart contract can be found in the [Zero to Hero NFT tutorial](/tutorials/nfts/introduction)'s  [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/main/nft-contract/src), under the `main` branch.

The contract methods used in this application are as follows:

- `nft_mint`: Function used to mint tokens.
- `check_token`: Custom function created to check for the existence of a token. This helps to ensure one token per user.

## Front-end

The front-end of the contract was implemented using `create-near-app`. [React Bootstrap](https://react-bootstrap.github.io/) was used for the styling of the application.

To bootstrap your React front-end, run the following command on your terminal:

```sh
npx create-near-app --frontend react --contract rust
```

Then, simply import the contract files from the `main` branch, and you'll have the needed structure to run the application.

### Start

Upon mounting the application's components, the app checks for the existence of a non-fungible token.

```js reference
https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/App.js#L24-L46
```

If no prior NFT has been minted, the mint button will be available for use.

### Mint button

Here is the function behind the mint button. The meta data has been filled out for the user already:

- `token_id` is set by the user's account id,
- and the `media` link is hard-coded to a `goteam-gif.gif` hosted on IPFS.

```js reference
https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/Components/MintingTool.js#L7-L23
```

After hitting the <kbd>Mint NFT</kbd> button the user will be able to check out the newly minted NFT at [wallet.testnet.near.org](https://wallet.testnet.near.org/?tab=collectibles), under the Wallet's `Collectibles` tab.

## Final remarks

You can find the complete application repository [on GitHub](https://github.com/near-examples/nft-tutorial-frontend) to clone and run.
In the configuration folder you can see that this smart contract has been deployed to `nft-frontend-simple-mint.blockhead.testnet`:

```js reference
https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/config.js#L1-L2
```

You can also check out the [explorer link here](https://explorer.testnet.near.org/accounts/nft-frontend-simple-mint.blockhead.testnet) to see how many individuals have been minting their own _Go Team_ NFTs. _**Happy Minting!**_

:::tip
Clone and run this example from https://github.com/near-examples/nft-tutorial-frontend
:::
