---
id: sandbox-testing
title: Sandbox Testing
---




In the previous section, we went through the contract's code, analyzing how it worked. Now, we need to test it and make sure it works as expected! For contracts, there are two types of testing you can do: unit testing and sandbox testing.

Here, we will focus on sandbox testing, as it enables one to deploy the contract in a realistic environment, allowing us to create multiple accounts and interact with the contract as if it was deployed on the blockchain.

:::info unit testing

Unit tests are built into the language and are used to test the contract functions individually. These tests work well when little context is required. However, they cannot test chain interactions - like sending accounts $NEAR tokens - since they need to be processed by the network.

:::

---

## Account Creation

The first thing our test does is to create multiple accounts with 10 $NEAR tokens each and deploy the contract to one of them.

<Tabs groupId="code-tabs">
    <TabItem value="js" label="🌐 JavaScript">
        ```
  const worker = t.context.worker = await Worker.init();

  // Create accounts
  const root = worker.rootAccount;

  const alice = await root.createSubAccount("alice", { initialBalance: NEAR.parse("10 N").toString() });
  const bob = await root.createSubAccount("bob", { initialBalance: NEAR.parse("10 N").toString() });
  const auctioneer = await root.createSubAccount("auctioneer", { initialBalance: NEAR.parse("10 N").toString() });
  const contract = await root.createSubAccount("contract", { initialBalance: NEAR.parse("10 N").toString() });

  // Deploy contract (input from package.json)
  await contract.deploy(process.argv[2]);

```
        
        To deploy the contract, we pass the path to the compiled WASM contract as an argument to the test in `package.json`. Indeed, when executing `npm run test`, the command will first compile the contract and then run the tests.

    </TabItem>
    <TabItem value="rust" label="🦀 Rust">
        ```
    let sandbox = near_workspaces::sandbox().await?;

    let root = sandbox.root_account()?;

    // Create accounts
    let alice = create_subaccount(&root, "alice").await?;
    let bob = create_subaccount(&root, "bob").await?;
    let auctioneer = create_subaccount(&root, "auctioneer").await?;
    let contract_account = create_subaccount(&root, "contract").await?;

    // Deploy and initialize contract
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = contract_account.deploy(&contract_wasm).await?.unwrap();

```

        Notice that the sandbox compiles the code itself, so we do not need to pre-compile the contract before running the tests.
    </TabItem>
</Tabs>

---

## Contract Initialization

To initialize, the contract's account calls itself, invoking the `init` function with an `end_time` set to 60 seconds in the future.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  await contract.call(contract, "init", {
    end_time: String((Date.now() + 60000) * 10 ** 6),
    auctioneer: auctioneer.accountId,
  });

```

:::warning Time Units

The contract measures time in **nanoseconds**, for which we need to multiply the result of `Date.now()` (expressed in milliseconds) by `10^6`

:::

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    let now = Utc::now().timestamp();
    let a_minute_from_now = (now + 60) * 1000000000;

    let init = contract
        .call("init")
        .args_json(json!({"end_time": a_minute_from_now.to_string(),"auctioneer":auctioneer.id()}))
        .transact()
        .await?;

```

:::warning Time Units

The contract measures time in **nanoseconds**, for which we need to multiply the result of `Utc::now().timestamp()` (expressed in seconds) by `10^9`

:::

    </TabItem>
</Tabs>

:::info Time is a String

Notice that the time is passed as a `String` to the contract, this is because smart contracts cannot receive numbers larger than `52 bits` and we want to pass a `unix timestamp` in **nanoseconds**

:::

---

## Bidding

Now that the contract is deployed and initialized, we can start bidding and checking if the contract behaves as expected.

We first make `alice` place a bid of 1 NEAR, and check that the contract correctly registers the bid. Then, we have `bob` place a bid of 2 NEAR, and check that the highest bid is updated, and that `alice` gets her NEAR refunded.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  // Alice makes first bid
  await alice.call(contract, "bid", {}, { attachedDeposit: NEAR.parse("1 N").toString() });
  let highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, alice.accountId);
  t.is(highest_bid.bid, NEAR.parse("1 N").toString());
  const aliceBalance = await alice.balance();

  // Bob makes a higher bid
  await bob.call(contract, "bid", {}, { attachedDeposit: NEAR.parse("2 N").toString() });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, NEAR.parse("2 N").toString());

  // Check that alice was returned her bid
  const aliceNewBalance = await alice.balance();
  t.deepEqual(aliceNewBalance.available, aliceBalance.available.add(NEAR.parse("1 N")));

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    // Alice makes first bid
    let alice_bid = alice
        .call(contract.id(), "bid")
        .deposit(NearToken::from_near(1))
        .transact()
        .await?;

    assert!(alice_bid.is_success());

    let highest_bid_json = contract.view("get_highest_bid").await?;
    let highest_bid: Bid = highest_bid_json.json::<Bid>()?;
    assert_eq!(highest_bid.bid, NearToken::from_near(1));
    assert_eq!(highest_bid.bidder, *alice.id());

    let alice_balance = alice.view_account().await?.balance;

    // Bob makes a higher bid
    let bob_bid = bob
        .call(contract.id(), "bid")
        .deposit(NearToken::from_near(2))
        .transact()
        .await?;

    assert!(bob_bid.is_success());

    let highest_bid_json = contract.view("get_highest_bid").await?;
    let highest_bid: Bid = highest_bid_json.json::<Bid>()?;
    assert_eq!(highest_bid.bid, NearToken::from_near(2));
    assert_eq!(highest_bid.bidder, *bob.id());

    // Check that Alice was returned her bid
    let new_alice_balance = alice.view_account().await?.balance;
    assert!(new_alice_balance == alice_balance.saturating_add(NearToken::from_near(1)));

```

    </TabItem>

</Tabs>

#### Checking the balance
It is important to notice how we check if `alice` was refunded. We query her balance after her first bid, and then check if it has increased by 1 NEAR after `bob` makes his bid. 

You might be tempted to check if `alice`'s balance is exactly 10 NEAR after she gets refunded, but `alice` balance cannot be 10 NEAR anymore, because some $NEAR was **consumed as `gas` fees** when `alice` called `bid`.

#### Testing invalid calls

When testing we should also check that the contract does not allow invalid calls. The next part checks that the contract doesn't allow for bids with fewer $NEAR tokens than the previous to be made.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```
  await t.throwsAsync(alice.call(contract, "bid", {}, { attachedDeposit: NEAR.parse("1 N").toString() }));

```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
    let alice_bid = alice
        .call(contract.id(), "bid")
        .deposit(NearToken::from_near(1))
        .transact()
        .await?;

    assert!(alice_bid.is_failure());

```

    </TabItem>

</Tabs>

---

## Fast Forwarding Time
The sandbox allows us to fast-forward time, which is useful for testing the contract when the auction is over. The test advances 200 blocks in order to pass a minute, and thus allowing the auction to be claimed. 

After which the auction can now be claimed. Once claimed the test checks that the auctioneer has received the correct amount of $NEAR tokens.

<Tabs groupId="code-tabs">
    <TabItem value="js" label="🌐 JavaScript">

        ```
  // Fast forward 200 blocks
  await t.context.worker.provider.fastForward(200)

  const auctioneerBalance = await auctioneer.balance();
  const available = parseFloat(auctioneerBalance.available.toHuman());

  // Auctioneer claims the auction
  await auctioneer.call(contract, "claim", {}, { gas: "300000000000000" });

  // Checks that the auctioneer has the correct balance
  const contractNewBalance = await auctioneer.balance();
  const new_available = parseFloat(contractNewBalance.available.toHuman());
  t.is(new_available.toFixed(1), (available + 2).toFixed(1));

```

    </TabItem>
    <TabItem value="rust" label="🦀 Rust">

        ```
    // Fast forward 200 blocks
    let blocks_to_advance = 200;
    sandbox.fast_forward(blocks_to_advance).await?;

    // Auctioneer claims the auction
    let auctioneer_claim = auctioneer
        .call(contract_account.id(), "claim")
        .args_json(json!({}))
        .gas(Gas::from_tgas(300))
        .transact()
        .await?;

    assert!(auctioneer_claim.is_success());

    // Checks the auctioneer has the correct balance
    let auctioneer_balance = auctioneer.view_account().await?.balance;
    assert!(auctioneer_balance <= NearToken::from_near(12));
    assert!(auctioneer_balance > NearToken::from_millinear(11990));

```

    </TabItem>
</Tabs>

If you review the tests in full you'll see that we also test other invalid calls such as the auctioneer trying to claim the auction before it is over and a user attempting to bid once the auction is over.

---

## Executing the tests 

Now that we understand what we are testing, let's go ahead and run the tests!


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```bash
        # if you haven't already, install the dependencies
        npm install

        # run the tests
        npm run test 
        ```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```bash
        cargo test
        ```

    </TabItem>

</Tabs>

All tests should pass, and you should see the output of the tests in the console. If you see any errors, please contact us in the [NEAR Discord](https://near.chat) or through [Telegram](https://t.me/neardev) and we'll help you out!

---

## Conclusion 

In this part of the tutorial, we've seen how to use our sandbox testing environment to test the contract. We've tested the contract's initialization, bidding, and time advancement.

You are now ready to move to the [next section](./1.3-deploy.md), where we will deploy the contract to `testnet` and interact with it through the CLI.