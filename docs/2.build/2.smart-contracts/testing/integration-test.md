---
id: integration-test
title: Integration Tests
#sidebar_label: 🥼 Integration Test
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Integration tests enable to deploy your contract in the NEAR `testnet` or a local `sandbox`, and create test-users to interact with it. In this way, you can thoroughly test your contract in a realistic environment.

Moreover, when using the local `sandbox` you gain complete control of the network:

1. Create test `Accounts` and manipulate their `State` and `Balance`.
2. Simulate errors on callbacks.
3. Control the time-flow and fast-forward into the future (Rust ready, TS coming soon).

:::tip NEAR Workspaces

In NEAR, integration tests are implemented using a framework called **Workspaces**. Workspaces comes in two flavors: [🦀 Rust](https://github.com/near/workspaces-rs) and [🌐 Typescript](https://github.com/near/workspaces-js).

All of our [examples](https://github.com/near-examples/docs-examples) come with integration testing.

:::

---

## Snippet I: Testing Hello NEAR

Lets take a look at the test of our [Quickstart Project](../quickstart.md) [👋 Hello NEAR](https://github.com/near-examples/hello-near-examples), where we deploy the contract on an account and test it correctly retrieves and sets the greeting.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/sandbox-test/main.ava.js" start="11" end="45"/>
  </Language>
</CodeTabs>

---

## Snippet II: Testing Donations

In most cases we will want to test complex methods involving multiple users and money transfers. A perfect example for this is our [Donation Example](https://github.com/near-examples/donation-examples), which enables users to `donate` money to a beneficiary. Lets see its integration tests

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
            start="51" end="75" />
  </Language>
</CodeTabs>

---

## Sandbox Testing

NEAR Workspaces allows you to write tests once, and run them either on `testnet` or a local `Sandbox`. By **default**, Workspaces will start a **sandbox** and run your tests **locally**. Lets dive into the features of our framework and see how they can help you.

### Spooning Contracts

[Spooning a blockchain](https://coinmarketcap.com/alexandria/glossary/spoon-blockchain) is copying the data from one network into a different network. NEAR Workspaces makes it easy to copy data from Mainnet or Testnet contracts into your local Sandbox environment:

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript" default>

```ts
const refFinance = await root.importContract({
  mainnetContract: 'v2.ref-finance.near',
  blockId: 50_000_000,
  withData: true,
});
```

This would copy the Wasm bytes and contract state from [v2.ref-finance.near](https://nearblocks.io/address/v2.ref-finance.near) to your local blockchain as it existed at block `50_000_000`. This makes use of Sandbox's special [patch state](#patch-state-on-the-fly) feature to keep the contract name the same, even though the top level account might not exist locally (note that this means it only works in Sandbox testing mode). You can then interact with the contract in a deterministic way the same way you interact with all other accounts created with near-workspaces.

:::note

`withData` will only work out-of-the-box if the contract's data is 50kB or less. This is due to the default configuration of RPC servers; see [the "Heads Up" note here](../../../5.api/rpc/contracts.md#view-contract-state-view-contract-state).

:::

See a [TypeScript example of spooning](https://github.com/near/workspaces-js/blob/main/__tests__/05.spoon-contract-to-sandbox.ava.ts) contracts.

</TabItem>

<TabItem value="rust" label="🦀 Rust">

Specify the contract name from `testnet` you want to be pulling, and a specific block ID referencing back to a specific time. (Just in case the contract you're referencing has been changed or updated)

```rust
const CONTRACT_ACCOUNT: &str = "contract_account_name_on_testnet.testnet";
const BLOCK_HEIGHT: BlockHeight = 12345;
```

Create a function called `pull_contract` which will pull the contract's `.wasm` file from the chain and deploy it onto your local sandbox. You'll have to re-initialize it with all the data to run tests.

```rust
async fn pull_contract(owner: &Account, worker: &Worker<Sandbox>) -> anyhow::Result<Contract> {
    let testnet = workspaces::testnet_archival();
    let contract_id: AccountId = CONTRACT_ACCOUNT.parse()?;
```

This next line will actually pull down the relevant contract from testnet and set an initial balance on it with 1000 NEAR.

```rust
    let contract = worker
        .import_contract(&contract_id, &testnet)
        .initial_balance(parse_near!("1000 N"))
        .block_height(BLOCK_HEIGHT)
        .transact()
        .await?;
```

Following that you'll have to init the contract again with your metadata.
This is because the contract's data is too big for the RPC service to pull down. (limits are set to 50Mb)

```rust
    owner
        .call(&worker, contract.id(), "init_method_name")
        .args_json(serde_json::json!({
            "arg1": value1,
            "arg2": value2,
        }))?
        .transact()
        .await?;
    Ok(contract)
}
```

</TabItem>

</Tabs>

### Patch State on the Fly

In Sandbox-mode, you can add or modify any contract state, contract code, account or access key with `patchState`.

:::tip

You can alter contract code, accounts, and access keys using normal transactions via the `DeployContract`, `CreateAccount`, and `AddKey` [actions](https://nomicon.io/RuntimeSpec/Actions#addkeyaction). But this limits you to altering your own account or sub-account. `patchState` allows you to perform these operations on any account.

:::

Keep in mind that you cannot perform arbitrary mutation on contract state with transactions since transactions can only include contract calls that mutate state in a contract-programmed way. For example, with an NFT contract, you can perform some operation with NFTs you have ownership of, but you cannot manipulate NFTs that are owned by other accounts since the smart contract is coded with checks to reject that. This is the expected behavior of the NFT contract. However, you may want to change another person's NFT for a test setup. This is called "arbitrary mutation on contract state" and can be done with `patchState`:

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript" >

```js
    const {contract, ali} = t.context.accounts;
    // Contract must have some state for viewState & patchState to work
    await ali.call(contract, 'set_status', {message: 'hello'});
    // Get state
    const state = await contract.viewState();
    // Get raw value
    const statusMessage = state.get('STATE', {schema, type: StatusMessage});
    // Update contract state
    statusMessage.records.push(
      new BorshRecord({k: 'alice.near', v: 'hello world'}),
    );
    // Serialize and patch state back to runtime
    await contract.patchState(
      'STATE',
      borsh.serialize(schema, statusMessage),
    );
    // Check again that the update worked
    const result = await contract.view('get_status', {
      account_id: 'alice.near',
    });
    t.is(result, 'hello world');
```

To see a complete example of how to do this, see the [patch-state test](https://github.com/near/workspaces-js/blob/main/__tests__/02.patch-state.ava.ts).

</TabItem>

<TabItem value="rust" label="🦀 Rust" >

```rust
    // Grab STATE from the testnet status_message contract. This contract contains the following data:
    //   get_status(dev-20211013002148-59466083160385) => "hello from testnet"
    let (testnet_contract_id, status_msg) = {
        let worker = workspaces::testnet().await?;
        let contract_id: AccountId = TESTNET_PREDEPLOYED_CONTRACT_ID
            .parse()
            .map_err(anyhow::Error::msg)?;
        let mut state_items = worker.view_state(&contract_id, None).await?;
        let state = state_items.remove(b"STATE".as_slice()).unwrap();
        let status_msg = StatusMessage::try_from_slice(&state)?;
        (contract_id, status_msg)
    };
    info!(target: "spooning", "Testnet: {:?}", status_msg);
    // Create our sandboxed environment and grab a worker to do stuff in it:
    let worker = workspaces::sandbox().await?;
    // Deploy with the following status_message state: sandbox_contract_id => "hello from sandbox"
    let sandbox_contract = deploy_status_contract(&worker, "hello from sandbox").await?;
    // Patch our testnet STATE into our local sandbox:
    worker
        .patch_state(
            sandbox_contract.id(),
            "STATE".as_bytes(),
            &status_msg.try_to_vec()?,
        )
        .await?;
    // Now grab the state to see that it has indeed been patched:
    let status: String = sandbox_contract
        .view(
            &worker,
            "get_status",
            serde_json::json!({
                "account_id": testnet_contract_id,
            })
            .to_string()
            .into_bytes(),
        )
        .await?
        .json()?;
    info!(target: "spooning", "New status patched: {:?}", status);
    assert_eq!(&status, "hello from testnet");
```

</TabItem>

</Tabs>

As an alternative to `patchState`, you can stop the node, dump state at genesis, edit the genesis, and restart the node.
This approach is more complex to do and also cannot be performed without restarting the node.

### Time Traveling

`workspaces` offers support for forwarding the state of the blockchain to the future. This means contracts which require time sensitive data do not need to sit and wait the same amount of time for blocks on the sandbox to be produced. We can simply just call `worker.fast_forward` to get us further in time:

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript" default>

  <Github fname="fast-forward.ava.ts" language="js"
          url="https://github.com/near/near-workspaces-js/blob/main/__tests__/08.fast-forward.ava.ts"
          start="34" end="53" />

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
#[tokio::test]
async fn test_contract() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let contract = worker.dev_deploy(WASM_BYTES);
    let blocks_to_advance = 10000;
    worker.fast_forward(blocks_to_advance);
    // Now, "do_something_with_time" will be in the future and can act on future time-related state.
    contract.call(&worker, "do_something_with_time")
        .transact()
        .await?;
}
```

_[See the full example on Github](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs)._

</TabItem>

</Tabs>

---

## Using Testnet

NEAR Workspaces is set up so that you can write tests once and run them against a local Sandbox node (the default behavior) or against [NEAR TestNet](../../../1.concepts/basics/networks.md). Some reasons this might be helpful:

* Gives higher confidence that your contracts work as expected
* You can test against deployed testnet contracts
* If something seems off in Sandbox mode, you can compare it to testnet

:::tip

In order to use Workspaces in testnet mode you will need to have a `testnet` account.
You can create one [here](https://testnet.mynearwallet.com/).

:::

You can switch to testnet mode in three ways.

1. When creating Worker set network to `testnet` and pass your master account:

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript"  default>

```ts
const worker = await Worker.init({
 network: 'testnet',
 testnetMasterAccountId: '<yourAccountName>',
})
```

</TabItem>

<TabItem value="rust" label="🦀 Rust" >

```rust
#[tokio::main]  // or whatever runtime we want
async fn main() -> anyhow::Result<()> {
// Create a sandboxed environment.
// NOTE: Each call will create a new sandboxed environment
let worker = workspaces::sandbox().await?;
// or for testnet:
let worker = workspaces::testnet().await?;
}
```

</TabItem>

</Tabs>

2. Set the `NEAR_WORKSPACES_NETWORK` and `TESTNET_MASTER_ACCOUNT_ID` environment variables when running your tests:

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript"  default>

```bash
NEAR_WORKSPACES_NETWORK=testnet TESTNET_MASTER_ACCOUNT_ID=<your master account Id> node test.js
```

If you set this environment variables and pass `{network: 'testnet', testnetMasterAccountId: <masterAccountId>}` to `Worker.init`, the config object takes precedence.

</TabItem>

</Tabs>

3. If using `near-workspaces` with AVA, you can use a custom config file. Other test runners allow similar config files; adjust the following instructions for your situation.

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript"  default>

Create a file in the same directory as your `package.json` called `ava.testnet.config.cjs` with the following contents:

```js
module.exports = {
 ...require('near-workspaces/ava.testnet.config.cjs'),
 ...require('./ava.config.cjs'),
};
module.exports.environmentVariables = {
    TESTNET_MASTER_ACCOUNT_ID: '<masterAccountId>',
};
```

The [near-workspaces/ava.testnet.config.cjs](https://github.com/near/workspaces-js/blob/main/ava.testnet.config.cjs) import sets the `NEAR_WORKSPACES_NETWORK` environment variable for you. A benefit of this approach is that you can then easily ignore files that should only run in Sandbox mode.

Now you'll also want to add a `test:testnet` script to your `package.json`'s `scripts` section:

```diff
"scripts": {
  "test": "ava",
+  "test:testnet": "ava --config ./ava.testnet.config.cjs"
}
```

</TabItem>

</Tabs>

---

## Additional Media

#### Test Driven Design Using Workspaces and AVA {#test-driven-design}

The video below walks through how to apply TDD with Workspaces and AVA for a simple contract:

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/LCu03IYwu1I"
  title="TDD Using Workspaces"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
