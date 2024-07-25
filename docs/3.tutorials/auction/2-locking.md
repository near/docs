---
id: locking-the-contract
title: Locking the contract
sidebar_label: Locking the contract
---

Up till now to claim the funds from bids on the contract the contract owner would have to log into a wallet using a key a withdraw NEAR to their main wallet. This provides poor UX but even more importantly it is a security flaw. Since there is a key to the contract a keyholder can maliciously mutate the contract's storage as they wish, for example, alter the highest bidder to list their own account. The whole idea behind smart contracts is that you don't have to trust anyone when interacting with an application, thus we will [lock]() the contract by removing all access keys and implementing a new method to claim the funds.

&nbsp;

## Adding an auctioneer

We want to restrict this method to claim the funds to only be called by the individual or entity that sets up the auction. To do this we now initialize the contract with an `auctioneer` (type AccountId).

```rust 
    #[init]
    #[private] // only callable by the contract's account
    pub fn init(end_time: U64, auctioneer: AccountId) -> Self {
        Self {
            highest_bid: Bid {
                bidder: env::current_account_id(),
                bid: NearToken::from_yoctonear(1),
            },
            auction_end_time: end_time,
            claimed: false,
            auctioneer,
        }
    }
```

Let's also introduce a boolean `claimed` field to track whether the funds have been claimed by the auctioneer yet.

&nbsp;

## Adding the claim method

The claim method should only be callable when the auction is over, can only be executed once and should transfer the funds to the auctioneer. We implement this as so:

```rust
    pub fn claim(&mut self) -> Promise {
        require!(
            env::block_timestamp() > self.auction_end_time.into(),
            "Auction has not ended yet"
        );

        require!(!self.claimed, "Auction has already been claimed");
        self.claimed = true;

        // Transfer tokens to the auctioneer
        Promise::new(self.auctioneer.clone()).transfer(self.highest_bid.bid)
    }
```

