---
id: workspaces
title: NEAR Workspaces
sidebar_label: NEAR Workspaces
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR Workspaces lets you automate workflows and write tests for NEAR smart contracts.
You can use it as-is or integrate it with a test runner of your choice (AVA, Jest, Mocha, etc.).
If you don't have a preference, we suggest you to use AVA.

## Overview

NEAR Workspaces provide controlled, concurrent workspaces in a local NEAR Sandbox blockchain or on NEAR TestNet. 
This allows you write tests once, and run them both on `testnet` and on a controlled Sandbox local environment,
enabling deterministic testing and powerful scripting for NEAR smart contracts.

## Libraries

The Workspaces interface is supported by the following libraries:

| Language | Link |
|----------|------|
| JavaScript | https://github.com/near/workspaces-js |
| Rust | https://github.com/near/workspaces-rs |

- TypeScript/JavaScript

  :::note
  The current version of `workspaces-js` does not support the "Time Traveling" feature provided by the `fast_forward` method. This will be addressed in a future release.
  :::

- Rust

  :::note
  The current version of `workspaces-rs` does not support macOS on M1 chip devices due to internal upgrades with wasmer. M1 users should use `workspaces-rs` version `0.1.1` until this issue is resolved. 
  :::


## Quick Start

To get started with NEAR Workspaces you need to do two things:

1. Initialize a `Worker`.
   - A worker is the gateway towards interacting with your sandbox environment.
2. Write tests.
   - See the JavaScript and Rust examples below:

### Initializing a Worker

<Tabs>
<TabItem value="js" label="JavaScript" default>

1. Initializing a `Worker`

    ```ts
    const worker = await Worker.init();
    const root = worker.rootAccount;

    const alice = await root.createSubAccount('alice');
    const contract = await root.createAndDeploy(
      root.getSubAccount('contract-name').accountId,
      'path/to/compiled.wasm'
    );
    ```

   Let's step through this.

   1. `Worker.init` initializes a new `SandboxWorker` or `TestnetWorker` depending on the config. `SandboxWorker` contains [NEAR Sandbox](https://docs.near.org/docs/develop/contracts/sandbox), which is essentially a local mini-NEAR blockchain. You can create one `Worker` per test to get its own data directory and port (for Sandbox) or root account (for Testnet), so that tests can run in parallel without race conditions in accessing states. If there's no state intervention. you can also reuse the `Worker` to speedup the tests.
   2. The worker has a `root` account. For `SandboxWorker`, it's `test.near`. For `TestnetWorker`, it creates a unique account. The following accounts are created as subaccounts of the root account. The name of the account will change from different runs, so you should not refer to them by hard coded account name. You can access them via the account object, such as `root`, `alice` and `contract` above.
   3. `root.createSubAccount` creates a new subaccount of `root` with the given name, for example `alice.<root-account-name>`.
   4. `root.createAndDeploy` creates an account with the given name, `contract-name.<root-account-name>`, then deploys the specified Wasm file to it.
   5. `path/to/compiled.wasm` will resolve relative to your project root. That is, the nearest directory with a `package.json` file, or your current working directory if no `package.json` is found. To construct a path relative to your test file, you can use `path.join(__dirname, '../etc/etc.wasm')` ([more info](https://nodejs.org/api/path.html#path_path_join_paths)).
   6. `worker` contains a reference to this data directory, so that multiple tests can use it as a starting point.
   7. If you're using a test framework, you can save the `worker` object and account objects `root`, `alice`, `contract` to test context to reuse them in subsequent tests.
   8. At the end of test, call `await worker.tearDown()` to shuts down the Worker. It gracefully shuts down the Sandbox instance it ran in the background. However, it keeps the data directory around. That's what stores the state of the two accounts that were created (`alice` and `contract-account-name` with its deployed contract).



</TabItem>
<TabItem value="rust" label="Rust">

1. Initialing a `Worker`


First, you need to declare some imports:

```rust
// macro allowing us to convert human readable units to workspace units.
use near_units::parse_near;

// macro allowing us to convert args into JSON bytes to be read by the contract.
use serde_json::json;

// Additional convenient imports that allows workspaces to function readily.
use workspaces::prelude::*;
```

You'll need to have your pre-compiled WASM contract ahead of time and know its path. 

```rust
// In this example, we will be pointing to the example's NFT contract
const NFT_WASM_FILEPATH: &str = "./examples/res/non_fungible_token.wasm";
```

This includes launching the sandbox, loading your wasm file and deploying it to the sandbox environment.

```rust

#[tokio::test]
async fn test_nft_contract() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let wasm = std::fs::read(NFT_WASM_FILEPATH)?;
    let contract = worker.dev_deploy(&wasm).await?;
```
Where
* `anyhow` - A crate that deals with error handling, making it more robust for developers.
* `worker` - Our gateway towards interacting with our sandbox environment.
* `contract`- The deployed contract on sandbox the developer interacts with.



</TabItem>
</Tabs>

### Writing tests

<Tabs>
<TabItem value="js" label="JavaScript" default>

2. Writing tests

   `near-workspaces` is designed for concurrency. Here's a simple way to get concurrent runs using plain JS:

   ```ts
   import {strict as assert} from 'assert';

   await Promise.all([
     async () => {
       await alice.call(
         contract,
         'some_update_function',
         {some_string_argument: 'cool', some_number_argument: 42}
       );
       const result = await contract.view(
         'some_view_function',
         {account_id: alice}
       );
       assert.equal(result, 'whatever');
     },
     async () => {
       const result = await contract.view(
         'some_view_function',
         {account_id: alice}
       );
       /* Note that we expect the value returned from `some_view_function` to be
       a default here, because this `fork` runs *at the same time* as the
       previous, in a separate local blockchain */
       assert.equal(result, 'some default');
     }
   ]);
   ```

   Let's step through this.

   1. `worker` and accounts such as `alice` are created before.
   2. `call` syntax mirrors [near-cli](https://github.com/near/near-cli) and either returns the successful return value of the given function or throws the encountered error. If you want to inspect a full transaction and/or avoid the `throw` behavior, you can use `callRaw` instead.
   3. While `call` is invoked on the account _doing the call_ (`alice.call(contract, …)`), `view` is invoked on the account _being viewed_ (`contract.view(…)`). This is because the caller of a view is irrelevant and ignored.
   4. Gotcha: the full account names does not match the strings passed to `createSubAccount` and `createAndDeploy`, which is why you must write `alice.call(contract, …)` rather than `alice.call('contract-account-name', …)`. But! The `Account` class overrides `toJSON` so that you can pass `{account_id: alice}` in arguments rather than `{account_id: alice.accountId}`. If you need the generated account ID in some other circumstance, remember to use `alice.accountId`.


See the [tests](https://github.com/near/workspaces-js/tree/main/__tests__) directory in this project for more examples.

</TabItem>
<TabItem value="rust" label="Rust">

2. Writing tests

Following the `Worker` initialization, you'll go directly into making a call into the contract, and initialize the smart contract's metadata:

```rust
    let outcome = contract
        .call(&worker, "new_default_meta")
        .args_json(json!({
            "owner_id": contract.id(),
        }))?
        .transact()
        .await?;

    // outcome contains data like logs, receipts and transaction outcomes.
    println!("new_default_meta outcome: {:#?}", outcome);
```

Next, let's mint an NFT via `nft_mint`. This showcases some extra arguments you can supply, such as deposit and gas:

```rust
    let deposit = 10000000000000000000000;
    let outcome = contract
        .call(&worker, "nft_mint")
        .args_json(json!({
            "token_id": "0",
            "token_owner_id": contract.id(),
            "token_metadata": {
                "title": "Olympus Mons",
                "dscription": "Tallest mountain in charted solar system",
                "copies": 1,
            },
        }))?
        .deposit(deposit)
        // nft_mint might consume more than default gas, so supply our own gas value:
        .gas(near_units::parse_gas("300 T"))
        .transact()
        .await?;

    println!("nft_mint outcome: {:#?}", outcome);
```

Then, you can view the minted NFT's metadata using a `view` call to `nft_metadata`:

```rust
    let result: serde_json::Value = contract
        .call(&worker, "nft_metadata")
        .view()
        .await?
        .json()?;

    println!("--------------\n{}", result);
    println!("Dev Account ID: {}", contract.id());
    Ok(())
}
```

</TabItem>
</Tabs>


## "Spooning" Contracts from Testnet and Mainnet


[Spooning a blockchain](https://coinmarketcap.com/alexandria/glossary/spoon-blockchain) is copying the data from one network into a different network. NEAR Workspaces makes it easy to copy data from Mainnet or Testnet contracts into your local Sandbox environment:

<Tabs>
<TabItem value="js" label="JavaScript" default>

```ts
const refFinance = await root.importContract({
  mainnetContract: 'v2.ref-finance.near',
  blockId: 50_000_000,
  withData: true,
});
```

This would copy the Wasm bytes and contract state from [v2.ref-finance.near](https://explorer.near.org/accounts/v2.ref-finance.near) to your local blockchain as it existed at block `50_000_000`. This makes use of Sandbox's special [patch state](#patch-state-on-the-fly) feature to keep the contract name the same, even though the top level account might not exist locally (note that this means it only works in Sandbox testing mode). You can then interact with the contract in a deterministic way the same way you interact with all other accounts created with near-workspaces.

:::note
`withData` will only work out-of-the-box if the contract's data is 50kB or less. This is due to the default configuration of RPC servers; see [the "Heads Up" note here](https://docs.near.org/docs/api/rpc/contracts#view-contract-state).
:::

See a [TypeScript example of spooning](https://github.com/near/workspaces-js/blob/main/__tests__/05.spoon-contract-to-sandbox.ava.ts) contracts.

</TabItem>
<TabItem value="rust" label="Rust">

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


## Running on Testnet

NEAR Workspaces is set up so that you can write tests once and run them against a local Sandbox node (the default behavior) or against [NEAR TestNet](https://docs.near.org/docs/concepts/networks). Some reasons this might be helpful:

* Gives higher confidence that your contracts work as expected
* You can test against deployed testnet contracts
* If something seems off in Sandbox mode, you can compare it to testnet

:::tip
In order to use Workspaces in testnet mode you will need to have a `testnet` account.
You can create one [here](https://wallet.testnet.near.org/).
:::

You can switch to testnet mode in three ways.

1. When creating Worker set network to `testnet` and pass your master account:

   <Tabs>
   <TabItem value="js" label="JavaScript" default>

   ```ts
   const worker = await Worker.init({
     network: 'testnet',
     testnetMasterAccountId: '<yourAccountName>',
   })
   ```

   </TabItem>
   <TabItem value="rust" label="Rust">

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

   <Tabs>
   <TabItem value="js" label="JavaScript" default>

   ```bash
   NEAR_WORKSPACES_NETWORK=testnet TESTNET_MASTER_ACCOUNT_ID=<your master account Id> node test.js
   ```

   If you set this environment variables and pass `{network: 'testnet', testnetMasterAccountId: <masterAccountId>}` to `Worker.init`, the config object takes precedence.

   </TabItem>
   </Tabs>

3. If using `near-workspaces` with AVA, you can use a custom config file. Other test runners allow similar config files; adjust the following instructions for your situation.

   <Tabs>
   <TabItem value="js" label="JavaScript" default>

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

## Patch State on the Fly

In Sandbox-mode, you can add or modify any contract state, contract code, account or access key with `patchState`.

:::tip
You can alter contract code, accounts, and access keys using normal transactions via the `DeployContract`, `CreateAccount`, and `AddKey` [actions](https://nomicon.io/RuntimeSpec/Actions#addkeyaction). But this limits you to altering your own account or sub-account. `patchState` allows you to perform these operations on any account.
:::

Keep in mind that you cannot perform arbitrary mutation on contract state with transactions since transactions can only include contract calls that mutate state in a contract-programmed way. For example, with an NFT contract, you can perform some operation with NFTs you have ownership of, but you cannot manipulate NFTs that are owned by other accounts since the smart contract is coded with checks to reject that. This is the expected behavior of the NFT contract. However, you may want to change another person's NFT for a test setup. This is called "arbitrary mutation on contract state" and can be done with `patchState`: 

<Tabs>
<TabItem value="js" label="JavaScript">

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
<TabItem value="rust" label="Rust">

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

## Time Traveling

`workspaces` testing offers support for forwarding the state of the blockchain to the future. This means contracts which require time sensitive data do not need to sit and wait the same amount of time for blocks on the sandbox to be produced. We can simply just call `worker.fast_forward` to get us further in time:

<Tabs>
<TabItem value="js" label="JavaScript">

:::note
Time Traveling in `workspaces-js` is currently unavailable.
:::

</TabItem>
<TabItem value="rust" label="Rust" default>

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

</TabItem>
</Tabs>

For a full Rust example, take a look at [examples/src/fast_forward.rs](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs).

## Examples

| Language | Link |
|----------|------|
| JavaScript | https://github.com/near/workspaces-js |
| Rust | https://github.com/near/workspaces-rs |
