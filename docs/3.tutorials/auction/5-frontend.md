---
id: creating-a-frontend
title: Creating a frontend
sidebar_label: Creating a frontend
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs"

Now we have created a complete contract, we'll need a frontend to make it easy to interact with it. Up until now, we've just been using the CLI to interact with the contract. Frontends make interacting with the contract much easier for end users as all the contracts information can be displayed infront of the user simultaneously, calls can be made with a click of a button and the only prequesit is a wallet.

## Starting the frontend 

Before we look at the code let's start up the frontend and have a peak at what it looks like. Feel free to interact with the application and place some bids.

Navigate to the `frontend` directory then install dependencies and start the frontend.

<Tabs groupId="code-tabs">

    <TabItem value="yarn" label="yarn">

        ```
        yarn install
        yarn dev
        ```

    </TabItem>

    <TabItem value="npm" label="npm">

        ```
        npm install
        npm run dev
        ```

    </TabItem>

</Tabs>


## Frontend structure

In our frontend directory we have a simple Next.js frontend that we'll walk through to understand the basics of creating a frontend for a NEAR smart contract.

Lets take a look at how the code in the frontend is structured.

```
TODO add file structure of frontend

nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    ├── events.rs
    └── royalty.rs
```

TODO add info about each file

| File                             | Description                                                                     |
|----------------------------------|---------------------------------------------------------------------------------|
| approval.rs     | Has the functions that controls the access and transfers of non-fungible tokens |
| enumeration.rs | Contains the methods to list NFT tokens and their owners                        |
| lib.rs              | Holds the smart contract initialization functions                               |
| metadata.rs      | Defines the token and metadata structure                                        |
| mint.rs             | Contains token minting logic                                                    |
| nft_core.rs       | Core logic that allows you to transfer NFTs between users.                      |
| royalty.rs         | Contains payout-related functions                                               |
| events.rs            | Contains events related structures                                              |

---

## Specifying the contract

We have a config file that specifies the contract name of the auction that the frontend will interact with. The example given is a pre deployed contract from part 4 of the tutorial. The example contract is set up to accept bids in DAI (dai.fakes.testnet), has an NFT token pre minted and owned by the contract account and has an end auction time far in the future. Feel free to change the specified contract to your own auction that you deploy.

TODO add config file code 

---

## Setting up wallets 

To be able to interact with the contract - send bids or claim the auction - you'll need a `wallet` to sign transactions. Wallets store your private keys in a secure way and allow you to sign transactions without exposing your private key to the frontend. For this we use the wallet selector.

We abstract the wallet selector in our `near.js` file by exposing methods to complete various tasks. Feel free to explore the file to understand how the wallet selector is implemented. TODO insert link to near.js file.

We implement a sign in and sign out button to call the respective methods in the `near.js` file. When a wallet is signed in a function call access key is created. This allows the frontend to sign non payable transactions on behalf of the user, to the specified contract, without requiring the user to sign each transaction in the wallet; this creates a better user experience. However, in this example the main transaction we'll send is to make bids, which is payable so the wallet will prompt the user to sign each transaction.

TODO sign in and out button + near.js file code 

We add the wallet and the account ID that is signed in to the frontend's context making it easier to access in each componenet. 

TODO add code for context and where context is added

---

## Displaying the highest bid

We call the method `get_auction_info` to get all the information about the auction. This will be used to display the highest bidder, the auction end time, and the NFT and FT contract IDs. 

TODO add code for get_auction_info and the view call.

In the wallet file you'll see that we make a query to the RPC provider, since we are not signing a transaction the wallet isn't required here. Here we are using https://rpc.testnet.near.org but note there are [many different providers avaiable](../../5.api/rpc/providers.md). We are querying the RPC with optimistic finality, which uses the queries the latest block recorded on the node. Alternatively, one can use final finality where the block has been validated by at least 66% of the validators on the network but this will provide slightly delayed information (only by a couple of seconds).

We then pass the information about the highest bidder into the `LastBid` component and dispay the bid amount and the bidder's account ID in the component.

TODO add code for passing props into Last Bid component and the LastBid component code.

When we display the latest bid, instead of just showing the bid amount directly we divide the amount by the decimals of the FT. In this example we are using DAI which has 18 decimals meaning that 1 DAI equals 10^18 units. We also display information about the token that is being used. We get this information from the FT contract by calling the `ft_metadata` method (remember that the FT contract ID is stored on the auction contract).

TODO add code for calling FT contract ft metadata

---

## Updating the highest bid

We want to know the highest bid at all times, someone else could have placed a higher bid since the page was loaded. To solve this we fetch the contract information every 5 seconds using `setInterval`.

TODO add code for updating the highest bid every 5 seconds

---

## Auction end time

The contract stores the end time of the auction in the number of nanoseconds since the Unix epoch (1 January 1970 00:00:00 UTC). To make this look nicer we will display the time left in days, hours, minutes and seconds.

TODO add code for displaying the time left

---

## Displaying the NFT

We want to show what NFT is being auctioned. To do this we will call `nft_token` on the NFT contract to get the NFTs metadata. To call this method we need to specify the NFT `contractId` and the `token_id`, which can be found in the auction information. `nft_token` also returns the owner of the NFT, so we'll check this against the contract account to verify that the auction is valid. 

TODO Show getNftInfo method

Note that this effect will only run once the `auctionInfo` updates because we first need the the NFT contract ID and token ID from `auctionInfo` to make a valid call to `nft_token`.

In the `AuctionItem` component we display the NFT image, name and description.

TODO add code for displaying the NFT

Note that the an image caching service is used to display the NFT image for better performance.

---

## Making a bid

To make a bid we call the `ft_transfer_call` method on the FT contract which subsequently calls `ft_on_transfer` on the auction contract and attaches fungible tokens to the call.

TODO add bid code in index.js and the call method in near.js

We now multiply the bid amount by the decimals of the FT to get the correct amount to send. Since this method requires a 1 yoctoNEAR deposit the wallet will prompt the user to sign the transaction.

---

## Claiming the auction

Once the the auction is over (the current time is greater than the end time) the auction can be claimed. At this point the timer will be hidden and a button to claim the auction will be displayed. Once clicked the `claim` method will be called on the auction contract to send the highest bidder the NFT and the contract account the FTs.

TODO add claim code in index.js

---

## Conclusion

In this part of the tutorial we have implemented a simple frontend for a NEAR contract. Along the way we have learnt how to use the wallet selector to sign the user in and out, how to view the contracts state, how to sign and send transactions, and use ft_transfer_call from a frontend.

Whilst we can see the highest bid we may want to see the auctions bidding history. Since the contract only stores the most recent bid we need to use an indexer to pull historical data. In the next part of the tutorial we'll look at using an indexer to query historical data.
