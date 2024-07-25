---
id: ft
title: FT
sidebar_label: FT
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



register ft 

Write about factory contract to deploy auctions, talk about how you could have multiple auctions in one smart contract cheaper on storage but could be more vulnerable (if get access to one contract get access to all)