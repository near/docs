import {Github, Language} from "@site/src/components/codetabs"

In our frontend, we can easily display the previous bid since it's stored in the contract's state. However, we're unable to see previous bids to the auction. An indexer is used to fetch historical data from the blockchain and store it in a database. Since indexers can take a while to set up and can be expensive to run, we will use a pre-defined API point provided by NEAR Blocks to query an indexer they run that will fetch us the data we need.

---

## NEAR Blocks API key

NEAR Blocks provides a free tier that allows you to make 6 calls per minute, which will be plenty for our use case. To get an API key, head over to https://dash.nearblocks.io/user/overview and sign up. Once signed go to `API Keys` then click `Add key` and give it whatever name you like. 

We'll create a new file named `.env.local` to store our API key.

```env
API_KEY=YOUR_API_KEY_GOES_HERE
```

We put the API key in a `.env.local` file so the user cannot access it in the browser and use our key elsewhere. We should also add `.env.local` to our `.gitignore` file so it is not pushed to GitHub.

---

## Calling the API endpoint

NextJS allows us to easily create server-side functions with API routes. We need to make this API call on the server-side rather than the client side so as to not expose our API key. We'll create a new file in src/pages/api named `getBidHistory.js`. Here we'll define our function to get the bid history.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="getBidHistory.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/reorg-auction/frontend/src/pages/api/getBidHistory.js#L1-L13"
        start="1" end="13" />
</Language>

Here we are retrieving the auction contract ID and fungible token contract ID from the API route call and then calling the NEAR Blocks API. This specific API endpoint allows us to retrieve transactions made to a specific contract calling a specific method. Some details are worth discussing here:

- We pass the account ID of the auction contract, which is `auction-example.testnet` in the example repo.
- We specify the method name on the auction contract that we want the transactions for, this will be `ft_on_transfer` as it will give all bids made to the auction.
- We pass the fungible token account ID as the sender since we know only transactions from the correct FT contract will be successful.
- We'll receive a JSON object of 25 transactions, ordered by the most recent first.
- We pass our API key to authenticate the request.

---

## Filtering out invalid transactions

The API call itself does not filter out invalid transactions. A transaction may be rejected for example if the bid is lower than the current highest bid. To check whether a transaction was successful, therefore the bid was valid, we check that the `receipt outcome status` is `true`. If a transaction is valid we store the account ID of the bidder and the amount they bid, gathered from the args of the transaction. We loop through each transaction until we either have 5 valid transactions or we've looped through the whole page of 25. Note that, in our example, if the previous 25 bids were invalid the API will return an empty array. 

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="getBidHistory.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/reorg-auction/frontend/src/pages/api/getBidHistory.js#L15-L43"
        start="15" end="43" />
</Language>

---

## Using the API Route

In our main page, we'll define a function to call the API route we just created. This function will be called as soon as the fungible token account ID is set and each time the page timer reaches zero.

<Language value="javascript" language="javascript" showSingleFName={true}>
    <Github fname="getBidHistory.js" 
        url="https://github.com/near-examples/auctions-tutorial/blob/reorg-auction/frontend/src/pages/index.js#L114-L124"
        start="116" end="124" />
</Language>

The `pastBids` will then be passed into the `Bid` component to be displayed.

---

You may like to explore NEAR Blocks APIs further to see what other data you can retrieve from the blockchain. You can find the documentation at https://api.nearblocks.io/api-docs/

---

## Conclusion

In this short part of the tutorial, we've added the ability to display the previous 5 valid bids made to the auction contract. In doing this we learned how to interact with the NEAR Blocks APIs to retrieve historical data from the blockchain and how to make server-side calls in NextJS to not expose our API key. Now we have a pretty good frontend that displays all the information we need about the auction contract.

In the [final part](./7-factory.md) of this tutorial series you'll learn how to deploy a factory contract - a contract that deploys other contracts - to make it easier for anyone to launch a new auction.