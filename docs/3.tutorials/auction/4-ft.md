---
id: bidding-with-FTs
title: Bidding with FTs
sidebar_label: Bidding with FTs
---

To make this contract more interesting we're going to introduce another primitive: [fungible tokens](). Instead of placing bids in NEAR tokens, they will be placed in FTs. This may be useful if, for example, an auctioneer wants to keep the bid amounts constant in terms of dollars as an auction is carried out, so bids can be placed in stablecoins such as $USDC, or if a project like Ref Finance were holding their own auction and would want the auction to happen in their project's token $REF.

&nbsp;

## Defining the FT interface

Unlike NEAR tokens, fungible token amounts are not tracked on the user's account but rather they have their own contract (as do NFTs); so we're going to have to define an interface to interact with the FT contract. We will use the method `fr_transfer` to send fungible tokens to a specified account from our contract.

```rust
// FT interface for cross-contract calls
#[ext_contract(ft_contract)]
trait FT {
    fn ft_transfer(&self, receiver_id: AccountId, amount: U128) -> String;
}
```

&nbsp;

## Specifying the FT contract 

We want our bids to only happen in one type of fungible token; accepting many would make the value of each bid difficult to compare. We're also going to adjust the contract so that the auctioneer can specify a starting price for the NFT.

```rust
    #[init]
    #[private] // only callable by the contract's account
    pub fn init(
        end_time: U64,
        auctioneer: AccountId,
        ft_contract: AccountId,
        nft_contract: AccountId,
        token_id: TokenId,
        starting_price: U128,
    ) -> Self {
        Self {
            highest_bid: Bid {
                bidder: env::current_account_id(),
                bid: starting_price,
            },
            auction_end_time: end_time,
            auctioneer,
            claimed: false,
            ft_contract,
            nft_contract,
            token_id,
        }
    }
```

&nbsp;

## Accepting bids in FTs

For making bids in NEAR we call the contract directly and add NEAR tokens to the call. With fungible tokens, since the balance lives on a separate contract, we call the FT contract to call the auction contract and to transfer tokens. The method on the FT contract to do this is named `ft_transfer_call` and it will always call a method in the target contract named `ft_on_transfer`. Take a look [here]() for more information. 

**insert FT diagram**

Thus we swap our `bid` method for `ft_on_transfer`.

```rust
    pub fn ft_on_transfer(&mut self, sender_id: AccountId, amount: U128, msg: String) -> U128 {
```

We do a check to confirm that the user is using the required fungible token contract by checking the predecessor's account ID. Since it is the FT contract that called the auction contract the predecessor is the FT contract.

```rust
        let ft = env::predecessor_account_id();
        require!(ft == self.ft_contract, "The token is not supported");
```

The bidder's account ID is now given as an argument `sender_id`.

```rust
        self.highest_bid = Bid {
            bidder: sender_id,
            bid: amount,
        };
```

Now when we want to return the funds to the previous bidder we make a cross-contract call the the FT contract. We shouldn't transfer funds if it is the first bid so we'll implement a check for that as well.

```rust 
        if last_bidder != env::current_account_id() {
            ft_contract::ext(self.ft_contract.clone())
                .with_attached_deposit(NearToken::from_yoctonear(1))
                .with_static_gas(Gas::from_tgas(30))
                .ft_transfer(last_bidder, last_bid);
        }
```

The method `ft_on_transfer` needs to return the number of unused tokens in the call so the FT contract can refund the sender. We will always use the full amount of tokens in this call so we simply return 0.

```rust
U128(0)
```

&nbsp;

## Claiming the FTs

When the auction is complete we need to send the fungible tokens to the auctioneer, we implement a similar call as when we were returning the funds just changing the arguments.

```rust
            ft_contract::ext(self.ft_contract.clone())
                .with_attached_deposit(NearToken::from_yoctonear(1))
                .with_static_gas(Gas::from_tgas(30))
                .ft_transfer(self.auctioneer.clone(), self.highest_bid.bid);
```

&nbsp;

## Registering the user in the FT contract

For one to receive fungible tokens first their account ID must be [registered]() in the FT contract. We don't need to register the accounts that we transfer tokens back to since to make a bid in the first place they would need to be registered, but we do need to register the auction contract in the FT contract to receive bids and the auctioneer to receive the funds at the end of the auction. It is most convenient to register users from the frontend rather than the contract.

&nbsp;

---

There we have it, a completed auction smart contract! 

## Auction architecture 

When creating an application there are numerous ways to structure it. Here, we have one contract per auction meaning we have to deploy a new contract each time we want to host an auction. To make this easier we would leverage a [factory contract]() to deploy auction contracts for an auctioneer. Deploying code for each auction gets expensive, with 100kb of storage costing 1 NEAR, since each auction stores all the same type of information and implements the same methods one could instead decide to have multiple auctions per contract. 

In such case, the Contract struct would be a map of auctions. We would implement a method to create a new auction by adding an entry to the map with the specific details of that individual auction.

```rust 
pub struct Contract {
    auctions: unorderedMap<String, Auction>
}
```

However, this architecture could be deemed as less secure since if a bad actor were to gain access to the contract they would have access to every auction instead of just one.