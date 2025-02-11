---
id: integration-test
title: Integration Tests
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Integration tests enable you to deploy a contract in the NEAR `testnet` or a local `sandbox` and create test users to interact with it. This way, you can thoroughly test your contract in a realistic environment.

Moreover, when using the local `sandbox` you gain complete control of the network:

1. Create test `Accounts` and manipulate their `State` and `Balance`.
2. Simulate errors on callbacks.
3. Control the time-flow and fast-forward into the future (Rust ready, TS coming soon).

In NEAR, integration tests are implemented using a framework called **Workspaces**. Workspaces comes in two flavors: [🦀 Rust](https://github.com/near/workspaces-rs) and [🌐 Typescript](https://github.com/near/workspaces-js).

All of our [examples](https://github.com/near-examples) come with integration testing.

:::note Sandbox Testing

NEAR Workspaces allows you to write tests once, and run them either on `testnet` or a local `Sandbox`. By **default**, Workspaces will start a **sandbox** and run your tests **locally**. Lets dive into the features of our framework and see how they can help you.
:::

---

## Create Accounts

### Dev Account

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="15" end="19" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="49" end="69" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Subaccount

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="31" end="45" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="75" end="95" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Using Secret Key

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="54" end="61" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="101" end="128" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Using Credentials From File

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="70" end="74" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="134" end="161" />

  </TabItem>
</Tabs>

---

## WASM Files

### Compile Contract Code

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="83" end="88" />

  :::tip
  You don't need to assert compiling process everytime. You can use `?` operator to get the result as `Vec<u8>` without dealing with `Result<Vec<u8>>, Error>` type. That way you can directly use this vector to deploy the wasm file into account. Your test will still fail if compiling process fails.

  ```rust
  let contract_wasm = near_workspaces::compile_project("./").await?;
  ```
  :::
  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  If you want to compile a contract each time running tests, you can put following scripts into `package.json` file. In the code you can access path to compiled file using `process.argv[2]`.

  `package.json` file:
  ```json
  "scripts": {
    "build": "near-sdk-js build src/contract.ts build/hello_near.wasm",
    "test": "$npm_execpath run build && ava -- ./build/hello_near.wasm"
  },
  ```

  `main.ava.js` file:
  ```js
  const pathToWasm = process.argv[2];
  await contract.deploy(pathToWasm);
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Loading From File

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="95" end="102" />

  :::tip
  The same as in the case of compilation wasm from code, you don't need to assert reading file process everytime. You can use `expect` method to get the reading file result as `Vec<u8>` and provide error message as a parameter. Your test will still fail if compiling process fails.

  ```rust
  let contract_wasm = std::fs::read(artifact_path)
      .expect(format!("Could not read WASM file from {}", artifact_path).as_str());
  ```
  :::
  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  If you want to use pre-compiled a contract, you can put following scripts into `package.json` file. In the code you can access path to pre-compiled file using `process.argv[2]`.

  `package.json` file:
  ```json
  "scripts": {
    "build": "near-sdk-js build src/contract.ts build/hello_near.wasm",
    "test": "ava -- ./build/hello_near.wasm"
  },
  ```

  `main.ava.js` file:
  ```js
  const pathToWasm = process.argv[2];
  await contract.deploy(pathToWasm);
  ```

  </TabItem>
</Tabs>

---

## Deploy Contracts

### Dev Deploy

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="109" end="115" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="167" end="188" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Deploy To Account

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="127" end="134" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="17" end="23" />

  </TabItem>
</Tabs>

---

## Logs

Show contract's logs.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  Use `println` method when you want to see debug information from your code.

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="15" end="19" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  Use `console.log` method when you want to see debug information from your code.

  ```js
  const balance = await account.balance();

  console.log('balance: ', balance);
  // balance:  {
  //   total: <BN: 52b7d2dcc80cd2e4000000>,
  //   stateStaked: <BN: 62a992e53a0af00000>,
  //   staked: <BN: 0>,
  //   available: <BN: 52b77033352798d9100000>
  // }
  ```

  </TabItem>
</Tabs>

---

## Account Balance

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="146" end="155" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="194" end="205" />

  </TabItem>
</Tabs>

---

## Transactions

### Call

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="164" end="176" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="42" end="43" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### View

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="185" end="209" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="36" end="37" />

  </TabItem>
</Tabs>

---

## Patch State on the Fly

In Sandbox-mode, you can add or modify any contract state, contract code, account or access key with `patchState`.

You can alter contract code, accounts, and access keys using normal transactions via the `DeployContract`, `CreateAccount`, and `AddKey` [actions](https://nomicon.io/RuntimeSpec/Actions#addkeyaction). But this limits you to altering your own account or sub-account. `patchState` allows you to perform these operations on any account.

<Tabs groupId="code-tabs">

  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="218" end="239" />

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="211" end="222" />

  To see a complete example of how to do this, see the [patch-state test](https://github.com/near/workspaces-js/blob/main/__tests__/02.patch-state.ava.ts).

  </TabItem>

</Tabs>

:::note
As an alternative to `patchState`, you can stop the node, dump state at genesis, edit the genesis, and restart the node.
This approach is more complex to do and also cannot be performed without restarting the node.
:::

---

## Time Traveling

`workspaces` offers support for forwarding the state of the blockchain to the future. This means contracts which require time sensitive data do not need to sit and wait the same amount of time for blocks on the sandbox to be produced. We can simply just call `worker.fast_forward` to get us further in time:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="248" end="272" />

  _[See the full example on Github](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs)._

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="main.ava.js" language="js"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
      start="228" end="248" />

  </TabItem>

</Tabs>

---

## Using Testnet

NEAR Workspaces is set up so that you can write tests once and run them against a local Sandbox node (the default behavior) or against [NEAR TestNet](../../../1.concepts/basics/networks.md). Some reasons this might be helpful:

* Gives higher confidence that your contracts work as expected
* You can test against deployed testnet contracts
* If something seems off in Sandbox mode, you can compare it to testnet

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="279" end="304" />

  :::tip
  If you can create a new account on each iteration as well.
  :::

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

    You can switch to testnet mode in three ways:

    <details>

    <summary> 1. Setting the `Worker` network to `testnet` </summary>

    When creating Worker set network to `testnet` and pass your master account (an account for which you have the private key):

    ```ts
    const worker = await Worker.init({
      network: 'testnet',
      testnetMasterAccountId: '<yourAccountName>',
      initialBalance: NEAR.parse("<X> N").toString(),
    })
    ```

    </details>

    <details>

    <summary> 2. Setting environment variables </summary>

    Set the `NEAR_WORKSPACES_NETWORK` and `TESTNET_MASTER_ACCOUNT_ID` (an account for which you have the private key) environment variables when running your tests:

    ```bash
    NEAR_WORKSPACES_NETWORK=testnet TESTNET_MASTER_ACCOUNT_ID=<your master account Id> node test.js
    ```

    If you set this environment variables and pass `{network: 'testnet', testnetMasterAccountId: <masterAccountId>}` to `Worker.init`, the config object takes precedence.

    </details>

    <details>

    <summary> 3. Config file </summary>

    If you are using AVA, you can use a custom config file. Other test runners allow similar config files; adjust the following instructions for your situation.

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

    Where the master account is an account for which you have the private key.

    The [near-workspaces/ava.testnet.config.cjs](https://github.com/near/workspaces-js/blob/main/ava.testnet.config.cjs) import sets the `NEAR_WORKSPACES_NETWORK` environment variable for you. A benefit of this approach is that you can then easily ignore files that should only run in Sandbox mode.

    Now you'll also want to add a `test:testnet` script to your `package.json`'s `scripts` section:

    ```diff
    "scripts": {
      "test": "ava",
    +  "test:testnet": "ava --config ./ava.testnet.config.cjs"
    }
    ```

    </details>

    To use the accounts, you will need to create the `.near-credentials/workspaces/testnet` directory and add files for your master account, for example:

    ```js
    // .near-credentials/workspaces/testnet/<your-account>.testnet.json
    {"account_id":"<your-account>.testnet","public_key":"ed25519:...","private_key":"ed25519:..."}
    ```

  Example:
  
  <Github fname="main.ava.js" language="js"
    url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
    start="252" end="263" />

  </TabItem>

</Tabs>

---

## Spooning Contracts

[Spooning a blockchain](https://coinmarketcap.com/alexandria/glossary/spoon-blockchain) is copying the data from one network into a different network. NEAR Workspaces makes it easy to copy data from Mainnet or Testnet contracts into your local Sandbox environment:

<Tabs groupId="code-tabs">

  <TabItem value="rust" label="🦀 Rust" default>

  Specify the contract name from `testnet` you want to be pulling, and a specific block ID referencing back to a specific time. (Just in case the contract you're referencing has been changed or updated)

  Create a function called `pull_contract` which will pull the contract's `.wasm` file from the chain and deploy it onto your local sandbox. You'll have to re-initialize it with all the data to run tests. This is because the contract's data is too big for the RPC service to pull down. (limits are set to 50Mb)

  <Github fname="basics.rs" language="rust"
      url="https://github.com/near-examples/near-workspaces-examples/blob/main/contract-rs/tests/basics.rs"
      start="331" end="353" />

  </TabItem>

<TabItem value="js" label="🌐 JavaScript">

```ts
const refFinance = await root.importContract({
  mainnetContract: 'v2.ref-finance.near',
  blockId: 50_000_000,
  withData: true,
});
```

This would copy the Wasm bytes and contract state from [v2.ref-finance.near](https://nearblocks.io/address/v2.ref-finance.near) to your local blockchain as it existed at block `50_000_000`. This makes use of Sandbox's special [patch state](#patch-state-on-the-fly) feature to keep the contract name the same, even though the top level account might not exist locally (note that this means it only works in Sandbox testing mode). You can then interact with the contract in a deterministic way the same way you interact with all other accounts created with near-workspaces.

:::note

`withData` will only work out-of-the-box if the contract's data is 50kB or less. This is due to the default configuration of RPC servers; see [the "Heads Up" note here](/api/rpc/contracts#view-contract-state).

:::

See a [TypeScript example of spooning](https://github.com/near/workspaces-js/blob/main/__tests__/05.spoon-contract-to-sandbox.ava.ts) contracts.

</TabItem>

</Tabs>

---

## Snippets

### Snippet I: Testing Hello NEAR

Lets take a look at the test of our [Quickstart Project](../quickstart.md) [👋 Hello NEAR](https://github.com/near-examples/hello-near-examples), where we deploy the contract on an account and test it correctly retrieves and sets the greeting.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="test_basics.rs"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/tests/test_basics.rs" start="1" end="32"/>
  </Language>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/sandbox-test/main.ava.js" start="11" end="45"/>
  </Language>
</CodeTabs>

<hr class="subsection" />

### Snippet II: Testing Donations

In most cases we will want to test complex methods involving multiple users and money transfers. A perfect example for this is our [Donation Example](https://github.com/near-examples/donation-examples), which enables users to `donate` money to a beneficiary. Lets see its integration tests

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="workspaces.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/tests/workspaces.rs" start="1" end="106"/>
  </Language>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
            start="51" end="75" />
  </Language>
</CodeTabs>

---

## Additional Resources

### Advanced Examples

- [Rust](https://github.com/near/near-workspaces-rs/tree/main/examples)
- [JavaScript](https://github.com/near/near-workspaces-js/tree/main/__tests__)

<hr class="subsection" />

### Test Driven Design Using Workspaces and AVA {#test-driven-design}

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