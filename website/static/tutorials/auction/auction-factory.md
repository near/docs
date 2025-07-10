---
id: auction-factory
title: Auction factory
sidebar_label: Auction Factory
---


Since an auction contract hosts a single auction, each time you would like to host a new auction you will need to deploy a new contract. Rather than finding the compiled WASM file, creating a new account, deploying the contract, and then initializing it each time, you can use a factory contract to do this for you.

Luckily for us, there is already a [factory contract example](https://github.com/near-examples/factory-rust)! We will fork this example and slightly modify it to suit our use case. If you would like to learn more about how the factory contract works, you can take a look at the [associated documentation](/tutorials/examples/factory#generic-factory).

The factory example only comes in rust since, currently, the JavaScript SDK does not allow you to embed the WASM file in the contract. This is a limitation of the SDK and not the blockchain itself.

---

## Changing the default contract

In the current example, the factory contract deploys the donation contract example. We will change this to deploy our auction contract instead. 

Firstly, we'll need the compiled auction contract WASM file. You can get this by running the following command in [03-bid-with-fts](https://github.com/near-examples/auctions-tutorial/tree/reorg-auction/contract-rs/03-bid-with-fts) of `contract-rs`

```bash
cargo near build 
```

You will find the resulting WASM file in `target/near`; copy this file and use it to replace the WASM of the donation contract in the factory contract's source folder. Now edit the auction contract changing the path to the auction contract.

<Language value="rust" language="rust">
    ```
impl Default for Contract {
    fn default() -> Self {
        Self {
            code: LazyOption::new("code".as_bytes(), Some(AUCTION_CONTRACT.to_vec())),
        }
    }
}

```
    ```
const AUCTION_CONTRACT: &[u8] = include_bytes!("./auction-contract/auction.wasm");
const TGAS: Gas = Gas::from_tgas(1);
```
</Language>

On initialization, the factory will add the auction contracts WASM, as bytes, to the factory's state. It is more efficient to not store the WASM in the factory's state, however, we may want to update the auction contract if we find a bug or want to add new features. The factory implements a method to update the auction contract - we'll change the name to `update_auction_contract` as this factory will only deploy auction contracts.

```
    pub fn update_auction_contract(&mut self) {
        // This method receives the code to be stored in the contract directly
        // from the contract's input. In this way, it avoids the overhead of
        // deserializing parameters, which would consume a huge amount of GAS
        self.code.set(env::input());
    }

```

---

## Modifying deploy method

The method to deploy a new contract is specific to the contract being deployed (in the case the contract has custom initialization parameters). We will modify the method to take in the auction contract's initialization parameters.

```
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct AuctionInitArgs {
    end_time: U64,
    auctioneer: AccountId,
    ft_contract: AccountId,
    nft_contract: AccountId,
    token_id: TokenId,
    starting_price: U128,
}

#[near]
impl Contract {
    #[payable]
    pub fn deploy_new_auction(
        &mut self,
        name: String,
        end_time: U64,
        auctioneer: AccountId,
        ft_contract: AccountId,
        nft_contract: AccountId,
        token_id: TokenId,
        starting_price: U128,
    ) -> Promise {
        // Assert the sub-account is valid
        let current_account = env::current_account_id().to_string();
        let subaccount: AccountId = format!("{name}.{current_account}").parse().unwrap();
        assert!(
            env::is_valid_account_id(subaccount.as_bytes()),
            "Invalid subaccount"
        );

        // Assert enough tokens are attached to create the account and deploy the contract
        let attached = env::attached_deposit();

        let code = self.code.clone().unwrap();
        let contract_bytes = code.len() as u128;
        let contract_storage_cost = NEAR_PER_STORAGE.saturating_mul(contract_bytes);
        let minimum_needed = contract_storage_cost.saturating_add(NearToken::from_millinear(100));
        assert!(
            attached >= minimum_needed,
            "Attach at least {minimum_needed} yⓃ"
        );

        let args = &AuctionInitArgs {
            end_time,
            auctioneer,
            ft_contract,
            nft_contract,
            token_id,
            starting_price,
        };

        let init_args = near_sdk::serde_json::to_vec(args).unwrap();

        let promise = Promise::new(subaccount.clone())
            .create_account()
            .transfer(attached)
            .deploy_contract(code)
            .function_call(
                "init".to_owned(),
                init_args,
                NO_DEPOSIT,
                TGAS.saturating_mul(5),
            );

        // Add callback
        promise.then(
            Self::ext(env::current_account_id()).deploy_new_auction_callback(
                subaccount,
                env::predecessor_account_id(),
                attached,
            ),
        )
    }
```

In this fork, we have also removed the option to add an access key to the contract account since, as discussed [earlier](./1.3-deploy.md#locking-the-contract), we want auctions to be locked.

---

## Using the factory 

Build and deploy the factory like you would any other contract, this time without any initialization parameters. 

```bash
# compile the contract using cargo-near
cargo near build

# deploy the contract
near deploy <contractId> ./target/near/contract.wasm
```

You can now use the factory to deploy new auction contracts, here is an example command. 

```bash
near call auction-factory.testnet deploy_new_auction '{"name": "new-auction", "end_time": "3000000000000000000", "auctioneer": "pivortex.testnet", "ft_contract": "dai.fakes.testnet", "nft_contract": "nft.examples.testnet", "token_id": "7777", "starting_price": "1000000000000000000"}' --accountId pivortex.testnet --deposit 1.6 --gas 100000000000000
```

:::info Deposit and storage costs
Note that we attach 1.6 $NEAR to the call to cover the storage costs of deploying the new auction. The storage cost on NEAR is 1 $NEAR per 100 kb, and our auction contract is around 140 kb, but we'll add a little to cover the storage used on initialization.
:::

The command results in a fresh auction contract being deployed and initialized at `new-auction.auction-factory.testnet`.

---

## Conclusion

In this part of the tutorial, you have learned how to fork and modify the factory contract example to deploy our auction contracts. You have also learned how to use the factory to deploy new auction contracts. If you're feeling adventurous you could create a frontend to interact with the factory contract to make it even easier to deploy new auctions. If you do so feel free to share it in our developer [Telegram](https://t.me/neardev) or [Discord](https://discord.gg/vMGH5QywTH) channels!

And with that, this tutorial series is over, congratulations! Through this tutorial, we've built an auction contract and iterated on it adding improvements and extending its functionality, created a frontend to interact with the auction, used an API to index previous bids, and deployed a factory contract to make deploying new auctions easier. Along the way we've learned a great deal about NEAR, we learned about the anatomy of smart contracts, how to lock a contract to make it more secure, how to use primitives such as NFTs and FTs, how to perform cross-contract calls, how to use wallets from a frontend to interact with the blockchain and display data about a smart contract, how to pull historical data from the blockchain using an API, how to deploy contracts from other contracts and a lot of other little bits that will help you in the future. 

That's a lot, so once again congratulations!
