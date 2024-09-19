---
id: creating-a-frontend
title: Creating a frontend
sidebar_label: Creating a frontend
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs"

Now that we have successfully created a contract, it's time to build a frontend to provide a user-friendly interface for interacting with it. Up until now, we have been using the CLI to send transactions and view the contract's state. However, frontends offer a more intuitive way for end users to interact with the contract. They can display all the relevant information in one place, allow users to make calls with a simple button click, and only require a wallet as a prerequisite.

## Starting the frontend

Before we look at the code let's start up the frontend and have a peak at what it looks like. Feel free to interact with the application and place some bids. To place bids you will need to retrieve some testnet DAI from the [faucet](https://near-faucet.io/). 

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

In our frontend directory, we have a simple Next.js frontend that we'll walk through to understand the basics of creating a frontend for a NEAR smart contract.

For starters, let's take a look at how the code in the frontend is structured by doing a quick overview of the important files.

| File                             | Description                                                                     |
|----------------------------------|---------------------------------------------------------------------------------|
| **_app.js**           | Responsible for rending the page, initiates the wallet object and adds it to global context  |
| **index.js**          | The main page where most of the projects components are loaded into and contains most of the logic for the application like viewing the state of the contract and logic for placing a bid |
| **near.js**           | Contains the wallet class that has methods to interact with the wallet and blockchain |
| **context.js**        | Holds the global context - the wallet object and the signed in account ID - that can be accessed anywhere |
| **config.js**         | Specifies the account ID of the auction contract |
| **Navigation.jsx**    | A component that contains a button to sign users in and out of wallets |
| **Bid.jsx**           | A component allowing a user to make a bid |
| **LastBid.jsx**       | A component that displays the highest bid and when the highest bid will next refresh |
| **AuctionItem.jsx**   | A component that displays information about the NFT being auctioned  |
| **Timer.jsx**         | A component that shows how long till the auction is over, or, if over, displays a button to claim the auction and then states the auction is over |

---

## Specifying the contract

We have a config file that specifies the contract name of the auction that the frontend will interact with. The example given is a pre-deployed contract from [part 4 of the tutorial](4-ft.md). The example contract is set up to accept bids in DAI (dai.fakes.testnet), has an NFT token pre-minted and owned by the contract account, and has an end auction time far in the future. Feel free to change the specified contract to your own auction that you deploy.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="config.js"
            url="https://github.com/near-examples/auctions-tutorial/tree/main/frontend/src/config.js"
            />
</Language>

---

## Setting up wallets

To be able to fully interact with the contract - send bids or claim the auction - you'll need a `wallet` to sign transactions. Wallets securely store your private keys and allow you to sign transactions without exposing your private key to the frontend. The wallet selector allows users to choose between a selection of wallets.

We abstract the wallet selector in our `near.js` file by exposing methods to complete various tasks. Feel free to [explore the file](https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/wallets/near.js) to understand how the wallet selector is implemented. 

We implement a sign-in and sign-out button in the navigation component to call the respective methods in the `near.js` file. When a wallet is signed in a function call access key is created. This allows the frontend to sign nonpayable transactions on behalf of the user, to the specified contract, without requiring the user to sign each transaction in the wallet; this allows for a better user experience. However, in this example, the main transaction we'll send is to make bids, which is payable so the wallet will prompt the user to sign each transaction.

<Language value="javascript" language="javascript">
    <Github fname="Navigation.jsx" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/components/Navigation.jsx"
        />
    <Github fname="near.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/wallets/near.js#L58-L72"
        start="58" end="72" />
</Language>

We add the wallet and the account ID that is signed in to the global context making it easier to access anywhere in the application.

<Language value="javascript" language="javascript">
    <Github fname="context.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/context.js"
        />
    <Github fname="_app.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/_app.js#L13-L27"
        start="13" end="27" />
</Language>

---

## Displaying the highest bid

To get all the information about the auction we call the method `get_auction_info`. This will be used to display the highest bidder, the auction end time, the NFT contract ID and token ID, and FT contract IDs.

<Language value="javascript" language="javascript">
    <Github fname="index.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L29-L35"
        start="29" end="35" />
    <Github fname="near.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/wallets/near.js#L82-L94"
        start="82" end="94" />
</Language>

In the wallet file, you'll see that we make a query to the RPC provider, since we are not signing a transaction the wallet isn't required here. Here we are using https://rpc.testnet.near.org but note there are [many different providers available](../../5.api/rpc/providers.md). We are querying the RPC with optimistic finality, which queries the latest block recorded on the node. Alternatively, one could use final finality where the block has been validated by at least 66% of the validators on the network but this will provide slightly delayed information (only by a couple of seconds).

We then pass the information about the highest bidder into the `LastBid` component to display the bid amount and the bidder's account ID.

<Language value="javascript" language="javascript">
    <Github fname="index.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L129"
        start="129" end="129" />
    <Github fname="LastBid.jsx" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/components/LastBid.jsx"
        />
</Language>

When we display the latest bid, instead of just showing the bid amount directly we divide the amount by the decimals of the FT. In this example, we are using DAI which has 18 decimals meaning that 1 DAI equals 10^18 units. We also display information about the token that is being used. We get this information from the FT contract by calling the `ft_metadata` method (remember that the FT contract ID is stored on the auction contract).

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="index.js"
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L75-L93"
        start="75" end="93" />
</Language>

---

## Updating the highest bid

We want to know the highest bid at all times, someone else could have placed a higher bid since the page was loaded. To solve this we fetch the contract information every 5 seconds using `setInterval`.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="index.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L41-L55"
        start="41" end="55" />
</Language>
---

## Auction end time

The contract stores the end time of the auction in the number of nanoseconds since the Unix epoch (1 January 1970 00:00:00 UTC). To make this look nicer we will display the time left in days, hours, minutes, and seconds.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="Timer.jsx" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/components/Timer.jsx#L11-L35"
        start="11" end="35" />
</Language>
---

## Displaying the NFT

We want to show what NFT is being auctioned. To do this we will call `nft_token` on the NFT contract to get the NFT metadata. To call this method we need to specify the NFT `contractId` and the `token_id`, which can be found in the auction information. `nft_token` also returns the owner of the NFT, so we'll check this against the contract account to verify that the auction is valid.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="index.js"
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L57-L73"
        start="57" end="73" />
</Language>

Note that this effect will only run once the `auctionInfo` updates because we first need the NFT contract ID and token ID from `auctionInfo` to make a valid call to `nft_token`.

In the `AuctionItem` component we display the NFT image, name, and description.

<Language value="javascript" language="javascript" showSingleFName={true}>
<Github fname="AuctionItem.jsx"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/components/AuctionItem.jsx"
    />
</Language>

Note that an image caching service is used to display the NFT image for better performance.

---

## Making a bid

To make a bid we call the `ft_transfer_call` method on the FT contract which subsequently calls `ft_on_transfer` on the auction contract and attaches fungible tokens to the call.

<Language value="javascript" language="javascript">
    <Github fname="index.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L95-L105"
        start="95" end="105" />
    <Github fname="near.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/wallets/near.js#L107-L126"
        start="107" end="126"/>
</Language>

We now multiply the bid amount by the decimals of the FT to get the correct amount to send. Since this method requires a 1 yoctoNEAR deposit the wallet will prompt the user to sign the transaction.

---

## Claiming the auction

Once the auction is over (the current time is greater than the end time) the auction can be claimed. At this point, the timer will be hidden and a button to claim the auction will be displayed. Once clicked the `claim` method will be called on the auction contract to send the highest bidder the NFT and the auctioneer the FTs.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="index.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/main/frontend/src/pages/index.js#L107-L114"
        start="107" end="114" />
</Language>

---

## Conclusion

In this part of the tutorial, we have implemented a simple frontend for a NEAR contract. Along the way, you have learned how to use the wallet selector to sign the user in and out, how to view the contract’s state, how to sign and send transactions, and use `ft_transfer_call` from a frontend.

While we can see the highest bid, we may want to see the auction's bidding history. Since the contract only stores the most recent bid, we need to use an indexer to pull historical data. In the [next part](./6-indexing.md) of the tutorial, we'll look at querying historical data using an API endpoint.
