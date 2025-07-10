---
id: winning-an-nft
title: Winning an NFT
---




No one will enter an auction if there's nothing to win, so let's add a prize. Why not an [NFT](../../primitives/nft.md)? NFTs are uniquely identifiable, easily swappable and their logic comes from an external contract so the prize will exist without the auction contract. Let's get to work!

---

## Listing the NFT

When we create an auction we need to list the NFT. To specify which NFT is being auctioned off we need the account ID of the NFT contract and the token ID of the NFT. We will specify these when the contract is initialized; amend `init` to add `nft_contract` and `token_id` as such:  

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  init({ end_time, auctioneer, nft_contract, token_id }: { end_time: bigint, auctioneer: AccountId, nft_contract: AccountId, token_id: string }) {
    this.auction_end_time = end_time;
    this.highest_bid = { bidder: near.currentAccountId(), bid: BigInt(1) };
    this.auctioneer = auctioneer;
    this.nft_contract = nft_contract;
    this.token_id = token_id;
  }

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
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

        Note that `token_id` is of type `TokenId` which is a String type alias that the NFT standards use for future-proofing.

    </TabItem>

</Tabs>

---

## Transferring the NFT to the winner

When the method `claim` is called the NFT needs to be transferred to the highest bidder. Operations regarding NFTs live on the NFT contract, so we make a cross-contract call to the NFT contract telling it to swap the owner of the NFT to the highest bidder. The method on the NFT contract to do this is `nft_transfer`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
    return NearPromise.new(this.nft_contract)
      .functionCall("nft_transfer", JSON.stringify({ receiver_id: this.highest_bid.bidder, token_id: this.token_id }), BigInt(1), TWENTY_TGAS)
      .then(NearPromise.new(this.auctioneer).transfer(this.highest_bid.bid))
  }
```

        In near-sdk-js we cannot transfer the NFT and send the $NEAR independently so we will chain the promises.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        We will create a new file in our source folder named `ext.rs`; here we are going to define the interface for the `nft_transfer` method. We define this interface as a `trait` and use the `ext_contract` macro to convert the NFT trait into a module with the method `nft_transfer`. Defining external methods in a separate file helps improve the readability of our code. 
        
        We then use this method in our `lib.rs` file to transfer the NFT.

        <Language value="rust" language="rust">
            ```
        nft_contract::ext(self.nft_contract.clone())
            .with_static_gas(Gas::from_tgas(30))
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .nft_transfer(self.highest_bid.bidder.clone(), self.token_id.clone());
    }
```
            ```
use near_sdk::{ext_contract, AccountId};

use crate::TokenId;

// NFT interface for cross-contract calls
#[ext_contract(nft_contract)]
trait NFT {
    fn nft_transfer(&self, receiver_id: AccountId, token_id: TokenId);
}

```
        </Language>

    </TabItem>

</Tabs>

When calling this method we specify the NFT contract name, that we are attaching 30 Tgas to the call, that we are attaching a deposit of 1 YoctoNEAR to the call, and give the arguments `receiver_id` and `token_id`. The NFT requires that we attach 1 YoctoNEAR for [security reasons](../../smart-contracts/security/one_yocto.md).

---

## NFT ownership problems

In our contract, we perform no checks to verify whether the contract actually owns the specified NFT. A bad actor could set up an auction where the NFT being auctioned doesn't belong to the auction contract, causing `nft_transfer` to fail and the winning bidder to lose their bid funds with nothing in return. We could make a cross-contract call to the NFT contract to verify ownership on initialization but this would become quite complex. Instead, we will do this check off-chain and validate the auction in the frontend. 

---

## Displaying the contract object

Since we are now dealing with more information in our contract, instead of implementing a function to display each field we'll create a function to display the entire contract object. Since the contract doesn't include large complex data structures like a map displaying the contract state in its entirety is easily done.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  @view({})
  get_auction_info(): AuctionContract {
    return this;
  }
}
```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
#[near(contract_state, serializers = [json, borsh])]
#[derive(PanicOnDefault)]
pub struct Contract {
    highest_bid: Bid,
    auction_end_time: U64,
    auctioneer: AccountId,
    claimed: bool,
    nft_contract: AccountId,
    token_id: TokenId,
}

```

        We add the `serilizers` macro to enable json serialization so the object as a whole can easily be displayed to the frontend without having to output each field individually.

        ```
    pub fn get_auction_info(&self) -> &Contract {
        self
    }
}
```


    </TabItem>

</Tabs>


## Testing with multiple contracts

In our tests, we're now going to be using two contracts; the auction contract and an NFT contract. Sandbox testing is great as it allows us to test multiple contracts in a realistic environment.

In our tests folder, we need the WASM for an NFT contract. For this tutorial, we compiled an example NFT contract from [this repo](https://github.com/near-examples/NFT/tree/master).

To deploy the NFT contract, this time we're going to use `dev deploy` which creates an account with a random ID and deploys the contract to it by specifying the path to the WASM file. After deploying we will initialize the contract with default metadata and specify an account ID which will be the owner of the NFT contract (though the owner of the NFT contract is irrelevant in this example). Default metadata sets information such as the name and symbol of the NFT contract to default values.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  const nft_contract = await root.devDeploy(NFT_WASM_FILEPATH);
  await nft_contract.call(nft_contract, "new_default_meta", { "owner_id": nft_contract.accountId });

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    let nft_wasm = std::fs::read(NFT_WASM_FILEPATH)?;
    let nft_contract = sandbox.dev_deploy(&nft_wasm).await?;

    let res = nft_contract
        .call("new_default_meta")
        .args_json(serde_json::json!({"owner_id": root.id()}))
        .transact()
        .await?;

    assert!(res.is_success());

```

    </TabItem>

</Tabs>

---

## Minting an NFT

To start a proper auction the auction contract should own an NFT. To do this the auction account calls the NFT contract to mint a new NFT providing information such as the image for the NFT.  

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  const TOKEN_ID = "1";
  let request_payload = {
    "token_id": TOKEN_ID,
    "receiver_id": contract.accountId,
    "metadata": {
      "title": "LEEROYYYMMMJENKINSSS",
      "description": "Alright time's up, let's do this.",
      "media": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1"
    },
  };

  await nft_contract.call(nft_contract, "nft_mint", request_payload, { attachedDeposit: NEAR.from("8000000000000000000000").toString(), gas: "300000000000000" });

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    const TOKEN_ID: &str = "1";
    let request_payload = json!({
        "token_id": TOKEN_ID,
        "receiver_id": contract_account.id(),
        "token_metadata": {
            "title": "LEEROYYYMMMJENKINSSS",
            "description": "Alright time's up, let's do this.",
            "media": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1"
        },
    });

    let res = contract_account
        .call(nft_contract.id(), "nft_mint")
        .args_json(request_payload)
        .deposit(NearToken::from_millinear(80))
        .transact()
        .await?;

    assert!(res.is_success());

```

    </TabItem>

</Tabs>

---

## Verifying ownership of an NFT

After `claim` is called, the test should verify that the auction winner now owns the NFT. This is done by calling `nft_token` on the NFT contract and specifying the token ID which will return the account ID that the token belongs to.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  const response = await nft_contract.call(nft_contract, "nft_token",{"token_id": "1"},{ gas: "300000000000000" });
  t.is(response.owner_id,bob.accountId);

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    let token_info: serde_json::Value = nft_contract
        .call("nft_token")
        .args_json(json!({"token_id": TOKEN_ID}))
        .transact()
        .await?
        .json()
        .unwrap();
    let owner_id: String = token_info["owner_id"].as_str().unwrap().to_string();

    assert_eq!(
        owner_id,
        bob.id().to_string(),
        "token owner is not the highest bidder"
    );

```

    </TabItem>

</Tabs>

---

## Getting an NFT

If you would like to interact with the new contract via the CLI you can mint an NFT from a pre-deployed NFT contract 

```bash
near call nft.examples.testnet nft_mint '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "<accountId>", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' --accountId <accountId> --deposit 0.1 
```

You can also just buy an NFT with testnet $NEAR on a testnet marketplace like [Mintbase](https://testnet.mintbase.xyz/explore/new/0).

---

## Conclusion 

In this part of the tutorial we have added NFTs as a reward which has taught us how to interact with NFT standards, make cross-contract calls and test multiple contracts that interact with each other in workspaces. In the [next part](./3.2-ft.md) we'll learn how to interact with fungible token standards by adapting the auction to receive bids in FTs. This will allow users to launch auctions in different tokens, including stablecoins. 