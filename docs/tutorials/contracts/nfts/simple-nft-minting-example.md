---
id: simple-minting-nft-frontend
title: Minting NFT Frontend
sidebar_label: Minting NFT Frontendg
---

# NFT Mint Frontend Overview

## App Overview

![](https://i.imgur.com/Irc4I8k.png)

The app is fairly simple. The user signs in and hits the mint button. Once the user hits the mint button their account is sent a "Go Team" NFT to their NEAR wallet!

## The Contract Code

The code for this contract can be found in the github repo for NEAR's Zero to Hero NFT tutorial [here](https://github.com/near-examples/nft-tutorial/tree/7.events/nft-contract/src) in the branch titled `7.events`

The contract methods used in this application are as follows

- "nft_mint"

  - Function used to mint tokens

- "check_token"
  - Custom function created to check for the existence of a token. This helps to ensure one token per user.

## The Frontend

The frontend of the contract was implemented using `npx create-near-app --frontend react --contract rust`

Then I simply imported the contract files needed to give me the structure to run the application from the repo linked above.

[React Bootstrap](https://react-bootstrap.github.io/) was used for the syling of the application.

Upon mounting the application the components of the application, the app checks for existence of a token.

![](https://i.imgur.com/nAE8Hzw.png)

If no prior NFT has been minted the mint button will be available for use.

Here is the function behind the mint button. A lot of the meta data has been filled out for the user already.

Token id is set by the user's wallet id, and the media link is fixed to a "go team gif"

![](https://i.imgur.com/szymYET.png)

After hitting the mint button the user is able to check out their NFT at wallet.testnet.near.org under the collections tab of the wallet.

In the configuration folder you will see that this application has been deployed to nft-frontend-simple-mint.blockhead.testnet (shortner name needed lol).

You can check out the [explorer link here](https://explorer.testnet.near.org/accounts/nft-frontend-simple-mint.blockhead.testnet) to see how many indivuals have been minting their own go team NFTs!

You can find the application repo [here](https://github.com/near-examples/nft-tutorial-frontend) to clone and run!

https://github.com/near-examples/nft-tutorial-frontend

Happy Minting!
