---
id: nft
title: NFT
sidebar_label: NFT
---

No one will enter an auction if there's nothing to win, so let's add a prize. Why not an [NFT]()? NFTs are uniquely identifiable, easily swappable and their logic comes from an external contract with audited standards so the prize will exist without the auction contract. Let's get to work!

&nbsp;

## Defining the NFT interface

Since NFTs follow standards all NFT contracts implement the same interface that defines what methods can be called, what parameters these methods take and what the method will return. When we are making calls to other contracts we write the interface of each method in a separate file `ext.rs` as a `trait`. 

```rust 
use near_sdk::{ext_contract, AccountId};

use crate::TokenId;

// NFT interface for cross-contract calls
#[ext_contract(nft_contract)]
trait NFT {
    fn nft_transfer(&self, receiver_id: AccountId, token_id: TokenId);
}
```

`nft_transfer` transfers the ownership of an NFT from one account ID to another. The method takes the arguments `receiver_id` dictating who will now own the NFT and the `token_id` specifying which token in the NFT contract is having its ownership transferred. The `ext_contract` attribute converts the NFT trait into a module with the method `nft_transfer`.

Note that we declare `TokenId` in our main file `lib.rs`. A type alias is used for future-proofing.

```rust 
pub type TokenId = String;
```

We import our interface into `lib.rs` as such:

```rust 
pub mod ext;
pub use crate::ext::*;
```

&nbsp;

## Listing the NFT

When we create an auction we need to list the NFT. To specify which NFT is being auctioned off we need the account ID of the NFT contract and the token ID of the NFT. We will specify these when the contract is initialized; amend `init` as such:  

```rust 
    #[init]
    #[private] // only callable by the contract's account
    pub fn init(
        end_time: U64,
        auctioneer: AccountId,
        nft_contract: AccountId,
        token_id: TokenId,
    ) -> Self {
        Self {
            highest_bid: Bid {
                bidder: env::current_account_id(),
                bid: NearToken::from_yoctonear(1),
            },
            auction_end_time: end_time,
            auctioneer,
            claimed: false,
            nft_contract,
            token_id,
        }
    }
```

&nbsp;

## Transferring the NFT to the winner

When the auction is ended, by calling the method `claim`, the NFT needs to be transferred to the highest bidder. We make a [cross-contract]() call to the NFT contract via the external method we defined at the end of `claim`.

```rust 
       nft_contract::ext(self.nft_contract.clone())
            .with_static_gas(Gas::from_tgas(30))
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .nft_transfer(self.highest_bid.bidder.clone(), self.token_id.clone());
```

When calling this external method we specify the NFT contract name, that we are attaching 30 Tgas to the call, that we are attaching 1 YoctoNEAR to the call (since the NFT contract requires this for [security reasons]()), and the arguments `reciever_id` and `token_id`.

&nbsp;

## NFT ownership problems

In our contract, we perform no checks to verify whether the contract actually owns the specified NFT. A bad actor could set up an auction with an NFT that the contract doesn't own causing `nft_transfer` to fail and the winning bidder to lose their bid funds with nothing in return. We could make a cross-contract call to the NFT contract to verify ownership on initialization but this would become quite complex. Instead, we will do this check off-chain by only displaying valid auctions. 