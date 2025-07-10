---
id: updating-the-frontend
title: Updating the Frontend
---




Now we've updated the contract to include an NFT as a reward and changed the contract such that it accepts bids in fungible tokens, we need to update the frontend accordingly.

## Getting the data from the contract

Now we have a function to output the whole contract state we will call this function in our frontend 

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
    const getInfo = async () => {
      const data = await wallet.viewMethod({
        contractId: AUCTION_CONTRACT,
        method: "get_auction_info",
      });
      setAuctionInfo(data)
    }
    getInfo();

```
</Language>

This call will deliver us the contract Ids of the FT and NFT contracts along with the token Id of the NFT. We will then use this information to call the `ft_metadata` and `nft_token` methods on the FT and NFT contracts respectively to get information about the FT and NFT.

---

## Displaying the NFT

We want to show what NFT is being auctioned. To do this we will call `nft_token` on the NFT contract to get the NFT metadata. To call this method we need to specify the NFT `contractId` and the `token_id`, which can be found in the auction information. `nft_token` also returns the owner of the NFT, so we'll check this against the contract account to verify that the auction is valid.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
  useEffect(() => {
    const getNftInfo = async () => {
      const data = await wallet.viewMethod({
        contractId: auctionInfo.nft_contract,
        method: "nft_token",
        args: { token_id: auctionInfo.token_id }
      });
      setNftInfo(data)
      if (data.owner_id == AUCTION_CONTRACT) {
        setValidAuction("Valid Auction")
      }
    }
    if (auctionInfo) {
      getNftInfo();
    }

  }, [auctionInfo]);

```
</Language>

Note that this effect will only run once the `auctionInfo` updates because we first need the NFT contract ID and token ID from `auctionInfo` to make a valid call to `nft_token`.

In a new component named `AuctionItem` we display the NFT image, name, and description.

<Language value="javascript" language="javascript" showSingleFName={true}>
```
import styles from './AuctionItem.module.css';

const AuctionItem = ({ nftMetadata, validAuction }) => {
  const cardImage = nftMetadata?.media 
    ? `https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=https://arweave.net/${nftMetadata.media}` 
    : null;

  return (
    <div className={styles.container}>
       <div className={styles.description}>
          <p>{validAuction}</p>
          <h2>{nftMetadata?.title}</h2>
          <p>{nftMetadata?.description}</p>
        </div>
      <div className={styles.imageSection}>
        <img
          src={cardImage}
          alt="NFT"
        ></img>
      </div>
    </div>
  );
}

export default AuctionItem;
```
</Language>

Note that an image caching service is used to display the NFT image for better performance.

---

## Fetching FT information

Using the FT contract ID from the auction information, we can call the `ft_metadata` method on the FT contract to get information about the fungible token that is being used for the auction.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
  useEffect(() => {
    const getFtInfo = async () => {
      const ftInfo = await wallet.viewMethod({
        contractId: auctionInfo.ft_contract,
        method: "ft_metadata",
      });
      setFtContract(auctionInfo.ft_contract)
      setFtName(ftInfo.symbol)
      setFtImg(ftInfo.icon)
      setFtDecimals(ftInfo.decimals)
      let bidAmount = auctionInfo.highest_bid.bid / Math.pow(10, ftInfo.decimals)
      setLastBidDisplay(bidAmount)

      fetchPastBids();
    }
    if (auctionInfo) {
      getFtInfo();
    }
  }, [auctionInfo]);

```
</Language>

We set the FT image, symbol, icon, and decimals in state. We use the decimals to format the amount of tokens being bid. In the case of DAI it divides the amount by 10^18. The reverse process is used when making a bid, the bid amount is multiplied by 10^18 before being sent to the contract.

---

## Bidding with FTs

Instead of calling the function `bid` on the contract we now call the `ft_transfer_call` function on the FT contract. This function transfers the FTs to the auction contract and calls the `ft_on_transfer` on the auction contract. 

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
  const bid = async (amount) => {
    let real_amount = amount * Math.pow(10, ftDecimals)
    let response = await wallet.callMethod({
      contractId: auctionInfo.ft_contract,
      method: "ft_transfer_call",
      deposit: 1,
      args: { "receiver_id": AUCTION_CONTRACT, "amount": String(real_amount), "msg": "" },
      gas:"300000000000000"
    })
    return response
  }

```
</Language>

---

## Updating the indexing API call

We need to update the API call that fetches historical bids to now index each time `ft_on_transfer` is called on the auction contract from the FT contract. 

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
export default async function handler(req, res) {
    try {
      if (!process.env.API_KEY) {
        return res.status(500).json({ error: "API key not provided" });
      }
      // Get all bid transactions
      const { contractId, ftId } = req.query;
      const bidsRes = await fetch(`https://api-testnet.nearblocks.io/v1/account/${contractId}/txns?from=${ftId}&method=ft_on_transfer&page=1&per_page=25&order=desc`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${process.env.API_KEY}`
        }
      });
      
```
</Language>

And now instead of getting the bid amount from the deposit, it is now retrieved from the calls argument, from `amount`. The case is the same for the account Id of the bidder, from `sender_id`.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
        if (txn.receipt_outcome.status) {
          let args = txn.actions[0].args;
          let parsedArgs = JSON.parse(args);
          let amount = Number(parsedArgs.amount);
          let account = parsedArgs.sender_id;
  
```
</Language>

---

## Conclusion

Ok nice, that didn't take too long. To look back, we updated the frontend to now display the NFT being auctioned, to display bid amounts - both the current and historical bids - in terms of the FT being used, and changed the bidding process to now use FTs. 

In the [final section](./4-factory.md) of this mega tutorial we'll create an auction factory contract that is used to deploy and initialize new auction contracts.
