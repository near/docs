---
id: auction-factory
title: Auction factory
sidebar_label: Auction factory
---

import {Github, Language} from "@site/src/components/codetabs"

Since an auction contract hosts a single auction, each time you would like to host a new auction you will need to deploy a new contract. Rather than finding the compiled WASM file, creating a new account, deploying the contract, and then initializing it each time, you can use a factory contract to do this for you.

Luckily for us, there is already a [factory contract example](https://github.com/near-examples/factory-rust)! We will fork this example and slightly modify it to suit our use case. If you would like to learn more about how the factory contract works, you can take a look at the [associated documentation](https://docs.near.org/tutorials/examples/factory#generic-factory).

The factory example only comes in rust since, currently, the JavaScript SDK does not allow you to embed the WASM file in the contract. This is a limitation of the SDK and not the blockchain itself.

---

## Changing the default contract

In the current example, the factory contract deploys the donation contract example. We will change this to deploy our auction contract instead. 

Firstly, we'll need the compiled auction contract WASM file. You can get this by running the following command in [part four](4-ft.md) of `contract-rs`

```
cargo near build 
```

You will find the resulting WASM file in `target/near`; copy this file and use it to replace the WASM of the donation contract in the factory contract's source folder. Now edit the auction contract changing the path to the auction contract.

<Language value="rust" language="rust">
    <Github fname="Default init" 
            url="https://github.com/near-examples/auctions-tutorial/blob/add-factory/factory/src/lib.rs#L9"
            start="25" end="31" />
    <Github fname="Contract path" 
            url="https://github.com/near-examples/auctions-tutorial/blob/add-factory/factory/src/lib.rs#L9"
            start="9" end="9" />
</Language>

On initialization, the factory will add the auction contracts WASM, as bytes, to the factory's state. It is more efficient to not store the WASM in the factory's state, however, we may want to update the auction contract if we find a bug or want to add new features. The factory implements a method to update the auction contract - we'll change the name to `update_auction_contract` as this factory will only deploy auction contracts.

<Github fname="Contract path" language="rust"
        url="https://github.com/near-examples/auctions-tutorial/blob/add-factory/factory/src/manager.rs#L8-L13"
        start="8" end="13" />

---

## Modifying deploy method

The method to deploy a new contract is specific to the contract being deployed (in the case the contract has custom initialization parameters). We will modify the method to take in the auction contract's initialization parameters.

<Github fname="Contract path" language="rust"
        url="https://github.com/near-examples/auctions-tutorial/blob/add-factory/factory/src/deploy.rs#L9-L82"
        start="9" end="82" />

In this fork, we have also removed the option to add an access key to the contract account since, as discussed in [part 2](2-locking.md), we want auctions to be locked.

---

## Using the factory 

Build and deploy the factory like you would any other contract, this time without any initialization parameters. 

```
cargo near build
```

then

```
cargo near deploy <accountId> without-init-call network-config testnet sign-with-legacy-keychain send
```

You can now use the factory to deploy new auction contracts, here is an example command. 

```
near contract call-function as-transaction auction-factory.testnet deploy_new_auction json-args '{"name": "new-auction", "end_time": "3000000000000000000", "auctioneer": "pivortex.testnet", "ft_contract": "dai.fakes.testnet", "nft_contract": "nft.examples.testnet", "token_id": "7777", "starting_price": "1000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '1.6 NEAR'
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
