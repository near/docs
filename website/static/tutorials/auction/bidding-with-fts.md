---
id: bidding-with-fts
title: Bidding with FTs
---




To further develop this contract we will introduce another primitive: [fungible tokens](../../primitives/ft.md). Instead of placing bids in $NEAR tokens, they will be placed in FTs. This may be useful if, for example, an auctioneer wants to keep the bid amounts constant in terms of dollars as an auction is carried out, so bids can be placed in stablecoins such as $USDC. Another use case is if a project like Ref Finance was holding its own auction and wanted the auction to happen in its project's token $REF.

---

## Specifying the FT contract 

We want to only accept bids in one type of fungible token; accepting many different FTs would make the value of each bid difficult to compare. We're also going to adjust the contract so that the auctioneer can specify a starting bid amount for the auction.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  init({ end_time, auctioneer, ft_contract, nft_contract, token_id, starting_price }: { end_time: bigint, auctioneer: AccountId, ft_contract: AccountId, nft_contract: AccountId, token_id: string, starting_price: bigint }) {
    this.auction_end_time = end_time;
    this.highest_bid = { bidder: near.currentAccountId(), bid: starting_price };
    this.auctioneer = auctioneer;
    this.ft_contract = ft_contract;
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

    </TabItem>

</Tabs>

---

## Accepting bids in FTs

When we were making bids in $NEAR tokens we would call the auction contract directly and attach $NEAR tokens to the call. With fungible tokens, since an account's balance lives on a separate contract, we call the FT contract which then calls the auction contract and transfers tokens. The method on the FT contract to do this is named `ft_transfer_call` and it will always call a method in the target contract named `ft_on_transfer`. Take a look [here](../../primitives/ft.md#attaching-fts-to-a-call) for more information. 

![ft_transfer_call-flow](/docs/assets/auction/auction-ft-transfer.png)

The `ft_on_transfer` method always has the same interface; the FT contract will pass it the `sender`, the `amount` of FTs being sent and a `msg` which can be empty (which it will be here) or it can contain some information needed by the method (if you want to send multiple arguments in msg it is best practice to deliver this in JSON then parse it in the contract). The method returns the number of tokens to refund the user, in our case we will use all the tokens attached to the call for the bid unless the contract panics in which case the user will automatically be refunded their FTs in full.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  ft_on_transfer({ sender_id, amount, msg }: { sender_id: AccountId, amount: bigint, msg: String }) {

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    pub fn ft_on_transfer(&mut self, sender_id: AccountId, amount: U128, msg: String) -> U128 {
        require!(
```

    </TabItem>

</Tabs>


We need to confirm that the user is attaching fungible tokens when calling the method and that they are using the right FT, this is done by checking the predecessor's account ID. Since it's the FT contract that directly calls the auction contract, the `predecessor` is now the account ID of the FT contract.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
    assert(near.predecessorAccountId() == this.ft_contract, "The token is not supported");
    assert(BigInt(amount) >= BigInt(previous.bid), "You must place a higher bid");
```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
        let ft = env::predecessor_account_id();
        require!(ft == self.ft_contract, "The token is not supported");

```

    </TabItem>

</Tabs>

The bidder's account ID is now given by the argument `sender_id` and the bid amount is passed as an argument named `amount`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
    this.highest_bid = {
      bidder: sender_id,
      bid: amount,
    };

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
        self.highest_bid = Bid {
            bidder: sender_id,
            bid: amount,
        };

```

    </TabItem>

</Tabs>

When we want to return the funds to the previous bidder we now make a cross-contract call to the FT contract. 

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Language value="javascript" language="javascript">
            ```
    return NearPromise.new(this.ft_contract)
      .functionCall("ft_transfer", JSON.stringify({ receiver_id: previous.bidder, amount: previous.bid }), BigInt(1), THIRTY_TGAS)
      .then(
        NearPromise.new(near.currentAccountId())
          .functionCall("ft_transfer_callback", JSON.stringify({}), NO_DEPOSIT, THIRTY_TGAS)
      )
      .asReturn()
  }
```
            ```
  @call({ privateFunction: true })
  ft_transfer_callback({ }): BigInt {
    return BigInt(0);
  }

```
        </Language>

        In JavaScript, we have to return the Promise to transfer the FTs but we also need to return how much to refund the user. So after transferring the FTs, we make a `callback` to our own contract to resume the contract flow. Note that the callback is private so it can only be called by the contract. We return 0 because the method uses all the FTs in the call.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            ```
        ft_contract::ext(self.ft_contract.clone())
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .with_static_gas(Gas::from_tgas(30))
            .ft_transfer(last_bidder, last_bid);

```
            ```
#[ext_contract(ft_contract)]
trait FT {
    fn ft_transfer(&self, receiver_id: AccountId, amount: U128);
}

```
        </Language>

         We then return 0 because the method uses all the FTs in the call.

        ```
        U128(0)
    }
```

    </TabItem>

</Tabs>

    If the call was to fail the FT contract will automatically refund the user their FTs.

<details> 
        
    <summary> What happens if the cross-contract call fails? </summary>

    The first time this method is called the contract will try to send itself FTs. Most fungible token contracts don't allow one to send themselves FTs so the cross-contract call will fail. However, since cross-contract calls are asynchronous and independent and we are not checking the result of the call then the auction contract does not care that the call failed and ft_on_transfer will complete successfully.

    In the other cases, the call to the fungible token contract could only fail if the receiver does not exist, the FT contract does not exist, the auction contract doesn't have enough fungible tokens to cover the amount being sent, or the receiver is not registered in the FT contract. Our contract is set up such that these errors cannot occur, the receiver must exist since they placed the previous bid, the FT contract exists since it was used to place the bid, the auction contract has enough FTs to cover the amount since it was sent that amount by the previous bid, and the receiver must be registered in the FT contract since they needed to have held the token in the first place to make a bid.

</details>  

---

## Claiming the FTs

When the auction is complete we need to send the fungible tokens to the auctioneer when we send the NFT to the highest bidder, we implement a similar call as when we were returning the funds just changing the arguments.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
    return NearPromise.new(this.nft_contract)
      .functionCall("nft_transfer", JSON.stringify({ receiver_id: this.highest_bid.bidder, token_id: this.token_id }), BigInt(1), THIRTY_TGAS)
      .then(NearPromise.new(this.ft_contract)
      .functionCall("ft_transfer", JSON.stringify({ receiver_id: this.auctioneer, amount: this.highest_bid.bid }), BigInt(1), THIRTY_TGAS))
      .asReturn()
  }
```

        In JavaScript, since we need to return each cross-contract call we chain the NFT and FT transfer.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
        // Transfer FTs to the auctioneer
        ft_contract::ext(self.ft_contract.clone())
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .with_static_gas(Gas::from_tgas(30))
            .ft_transfer(self.auctioneer.clone(), self.highest_bid.bid);

        // Transfer the NFT to the highest bidder
        nft_contract::ext(self.nft_contract.clone())
            .with_static_gas(Gas::from_tgas(30))
            .with_attached_deposit(NearToken::from_yoctonear(1))
            .nft_transfer(self.highest_bid.bidder.clone(), self.token_id.clone());
    }
```

    </TabItem>

</Tabs>

---

## Creating a new FT

Just as with the NFT contract, we will deploy an FT contract in the sandbox tests using a WASM file compiled from [this repo](https://github.com/near-examples/FT).

When the contract is deployed it is initialized with `new_default_meta` which sets the token's metadata, including things like its name and symbol, to default values while requiring the owner (where the token supply will sent), and the total supply of the token.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  const ft_contract = await root.devDeploy(FT_WASM_FILEPATH);
  await ft_contract.call(ft_contract,"new_default_meta",{"owner_id":ft_contract.accountId,"total_supply":BigInt(1_000_000).toString()});

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    let ft_wasm = std::fs::read(FT_WASM_FILEPATH)?;
    let ft_contract = sandbox.dev_deploy(&ft_wasm).await?;

    // Initialize FT contract
    let res = ft_contract
        .call("new_default_meta")
        .args_json(serde_json::json!({
            "owner_id": root.id(),
            "total_supply": U128(1_000_000),
        }))
        .transact()
        .await?;

    assert!(res.is_success());

```

    </TabItem>

</Tabs>

---

## Registering users in the FT contract

For one to receive fungible tokens, first their account ID must be [registered](../../primitives/ft.md#registering-a-user) in the FT contract. A user has to register in an FT contract to pay for the storage used to track their amount of tokens. By default, a contract pays for its own storage, but not requiring a user to register and pay for storage would drain the contract of $NEAR tokens. When the contract is live we don't need to register the accounts that we transfer tokens back to since to make a bid in the first place they would have needed to be registered, but we do need to register the auction contract in the FT contract to receive bids and the auctioneer to receive the funds at the end of the auction. It is most convenient to register users from the frontend rather than the contract.

In our tests, since we are creating a new fungible token and new accounts we will actually have to register every account that will interact with FTs.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  const contracts = [alice,bob,contract,auctioneer];
  for (const contract_to_register of contracts) {
    await contract_to_register.call(ft_contract, "storage_deposit",{ "account_id": contract_to_register.accountId },{ attachedDeposit: NEAR.from("8000000000000000000000").toString(),gas: "300000000000000" })
  }

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    for account in [
        alice.clone(),
        bob.clone(),
        contract_account.clone(),
        auctioneer.clone(),
    ]
    .iter()
    {
        let register = account
            .call(ft_contract.id(), "storage_deposit")
            .args_json(serde_json::json!({ "account_id": account.id() }))
            .deposit(NearToken::from_yoctonear(8000000000000000000000))
            .transact()
            .await?;

        assert!(register.is_success());
    }

```

    </TabItem>

</Tabs>

---

## Simple FT transfer to bidders

Then we will transfer the bidders FTs so they can use them to bid. A simple transfer of FTs is done using the method `ft_transfer` on the FT contract.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  await ft_contract.call(ft_contract,"ft_transfer",{"receiver_id":alice.accountId,"amount":BigInt(150_000).toString()},{ attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  await ft_contract.call(ft_contract,"ft_transfer",{"receiver_id":bob.accountId,"amount":BigInt(150_000).toString()},{ attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            ```
    let transfer_amount = U128(150_000);

    let root_transfer_alice =
        ft_transfer(&root, alice.clone(), ft_contract.clone(), transfer_amount).await?;
    assert!(root_transfer_alice.is_success());
    let root_transfer_bob =
        ft_transfer(&root, bob.clone(), ft_contract.clone(), transfer_amount).await?;
    assert!(root_transfer_bob.is_success());

```
            ```
async fn ft_transfer(
    root: &near_workspaces::Account,
    account: Account,
    ft_contract: Contract,
    transfer_amount: U128,
) -> Result<ExecutionFinalResult, Box<dyn std::error::Error>> {
    let transfer = root
        .call(ft_contract.id(), "ft_transfer")
        .args_json(serde_json::json!({
            "receiver_id": account.id(),
            "amount": transfer_amount
        }))
        .deposit(NearToken::from_yoctonear(1))
        .transact()
        .await?;
    Ok(transfer)
}

```
        </Language>

    </TabItem>

</Tabs>

---

## FT transfer call

As stated previously, to bid on the auction the bidder now calls `ft_transfer_call` on the FT contract which subsequently calls the auction contract's `ft_on_transfer` method with fungible tokens attached.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  await alice.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(50_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, alice.accountId);
  t.is(highest_bid.bid, BigInt(50_000).toString());

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            ```
    let alice_bid = ft_transfer_call(
        alice.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(50_000),
    )
    .await?;

    assert!(alice_bid.is_success());

    let highest_bid_alice: Bid = contract.view("get_highest_bid").await?.json()?;
    assert_eq!(highest_bid_alice.bid, U128(50_000));
    assert_eq!(highest_bid_alice.bidder, *alice.id());

```
            ```
async fn ft_transfer_call(
    account: Account,
    ft_contract_id: &AccountId,
    receiver_id: &AccountId,
    amount: U128,
) -> Result<ExecutionFinalResult, Box<dyn std::error::Error>> {
    let transfer = account
        .call(ft_contract_id, "ft_transfer_call")
        .args_json(serde_json::json!({
            "receiver_id": receiver_id, "amount":amount, "msg": "0" }))
        .deposit(NearToken::from_yoctonear(1))
        .gas(Gas::from_tgas(300))
        .transact()
        .await?;
    Ok(transfer)
}

```
        </Language>

    </TabItem>

</Tabs>

---

## Checking users' FT balance

Previously, to check a user's $NEAR balance, we pulled the details from their account. Now we are using FTs we query the balance on the FT contract using `ft_balance_of`, let's check that the contract's balance increased by the bid amount and the user's balance decreased by the bid amount.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(50_000).toString());
  alice_balance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId})
  t.is(alice_balance, BigInt(100_000).toString());

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            ```
    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(50_000));
    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(100_000));

```
            ```
async fn ft_balance_of(
    ft_contract: &Contract,
    account_id: &AccountId,
) -> Result<U128, Box<dyn std::error::Error>> {
    let result = ft_contract
        .view("ft_balance_of")
        .args_json(json!({"account_id": account_id}))
        .await?
        .json()?;

    Ok(result)
}

```
        </Language>

    </TabItem>

</Tabs>

---

## Invalid FT transfer call

If we make a lower bid than the previous this will cause the auction contract to panic. One might expect that `ft_transfer_call` will fail, but it does not. `ft_on_transfer` will fail and the FT contract will recognize this and reverse the transfer of tokens. So after making an invalid bid, we should check that the call was successful but the parties involved in the transaction (the bidder and the contract) have the same balance of fungible tokens as they did before the call.

Previous to this, Bob made a bid of 60,000 and Alice was returned her bid bringing her balance back up to 150,000. Now when Alice makes an invalid of 50,000 Alice's balance should remain at 150,000 and the contract should remain at a balance of 60,000.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  await alice.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(50_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(60_000).toString());
  alice_balance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId})
  t.is(alice_balance, BigInt(150_000).toString());

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    let alice_bid: ExecutionFinalResult = ft_transfer_call(
        alice.clone(),
        ft_contract.id(),
        contract_account.id(),
        U128(50_000),
    )
    .await?;

    assert!(alice_bid.is_success());

    let highest_bid_alice: Bid = contract.view("get_highest_bid").await?.json()?;
    assert_eq!(highest_bid_alice.bid, U128(60_000));
    assert_eq!(highest_bid_alice.bidder, *bob.id());

    let contract_account_balance: U128 = ft_balance_of(&ft_contract, contract_account.id()).await?;
    assert_eq!(contract_account_balance, U128(60_000));
    let alice_balance_after_bid: U128 = ft_balance_of(&ft_contract, alice.id()).await?;
    assert_eq!(alice_balance_after_bid, U128(150_000));

```

    </TabItem>

</Tabs>

---

## Using FTs with the CLI

If you want to interact with the auction contract you're going to need FTs. For this example, we'll use $DAI where the contract address is `dai.fakes.testnet`. One can easily acquire FTs through the [testnet faucet](https://near-faucet.io/). Select DAI and withdraw to the account you will use to place a bid. If you take a look at the transaction details you can see that the faucet registers your account in the FT contract and then sends you DAI from the faucet account.

When deploying the contract make sure to specify the FT contract `dai.fakes.testnet`.

The auction contract will need to be registered as well, you could do this by sending it an arbitrary amount of $DAI from the faucet or you can just register it since it doesn't need any FTs. You should also register the auctioneer,

```bash
near call dai.fakes.testnet storage_deposit '{"account_id": "<auctionContractId>"}' --accountId <accountId> --deposit 0.1
```

Now you can go ahead and place a bid. DAI has 18 decimals meaning that 1 $DAI is made up of 10^24 smallest units. To make a bid of 2 $DAI you can use the command:

```bash
near call dai.fakes.testnet ft_transfer_call '{"receiver_id": "<auctionContractId>", "amount": "2000000000000000000", "msg": ""}' --accountId <bidderId> --depositYocto 1
```

## Auction architecture 

When creating an application there are numerous ways to structure it. Here, we have one contract per auction meaning we have to deploy a new contract each time we want to host an auction. To make this easier we will leverage a factory contract to deploy auction contracts for an auctioneer. Deploying code for each auction gets expensive, with 100kb of storage costing 1 $NEAR, since each auction stores all the same type of information and implements the same methods one could instead decide to have multiple auctions per contract. 

In such case, the Contract struct would be a map of auctions. We would implement a method to create a new auction by adding an entry to the map with the specific details of that individual auction.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```javascript
        class Contract {
            auctions: UnorderedMap<string, Auction>
        ```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```rust 
        pub struct Contract {
            auctions: IterableMap<String, Auction>
        ```

    </TabItem>

</Tabs>

However, this architecture could be deemed less secure since if a bad actor were to gain access to the contract they would have access to every auction instead of just one.

--- 

## Conclusion

In this section, you learned a lot about fungible tokens: how to send and receive FTs in a smart contract, and then in sandbox tests how to deploy and initialize an FT contract, how to register a user in an FT contract, and send them some tokens, how to attach FTs to a smart contract call and finally how to view the FT balance of a user. With that, we now have our completed auction smart contract!  

Taking a further step back we've taken a very simple auction contract and transformed it into a more production contract with thorough testing. To improve the auction we learned how to add a prize by introducing NFTs, and enabled auctioneers to host auctions with FTs.

In the [next part of the tutorial](./3.3-new-frontend.md), we're going to update the frontend to interact with the new features of the contract.