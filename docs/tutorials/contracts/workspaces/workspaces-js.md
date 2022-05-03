---
id: workspaces-js
title: NEAR Workspaces (TypeScript/JavaScript Edition)
sidebar_label: Workspaces JS
---


`NEAR Workspaces` is a library for automating workflows and writing tests for NEAR smart contracts. You can use it as is or integrate with test runner of your choise (AVA, Jest, Mocha, etc.). If you don't have a preference, we suggest you to use AVA.

## Quick Start (without testing frameworks)

To get started with NEAR Workspaces you need to do only two things:

1. Initialize a `Worker`.

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

2. Writing tests.

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

## Quick Start with AVA

Since `near-workspaces` is designed for concurrency, AVA is a great fit, because it runs tests concurrently by default. To use`NEAR Workspaces` with AVA:
 1. Start with the basic setup described [here](https://github.com/avajs/ava).
 2. Add custom script for running tests on Testnet (if needed). Check instructions in `Running on Testnet` section.
 3. Add your tests following these example:

  ```ts
  import {Worker} from 'near-workspaces';
  import anyTest, {TestFn} from 'ava'

  const test = anyTest as TestFn<{
    worker: Worker;
    accounts: Record<string, NearAccount>;
  }>;

  /* If using `test.before`, each test is reusing the same worker;
  If you'd like to make a copy of the worker, use `beforeEach` after `afterEach`,
  which allows you to isolate the state for each test */
  test.before(async t => {
    const worker = await Worker.init();
    const root = worker.rootAccount;
    const contract = await root.createAndDeploy(
      'account-id-for-contract',
      'path/to/contract/file.wasm',
    );
    /* Account that you will be able to use in your tests */
    const ali = await root.createSubAccount('ali');
    t.context.worker = worker;
    t.context.accounts = {root, contract, ali};
  })

  test('Test name', async t => {
    const {ali, contract} = t.context.accounts;
    await ali.call(contract, 'set_status', {message: 'hello'});
    const result: string = await contract.view('get_status', {account_id: ali});
    t.is(result, 'hello');
  });

  test.after(async t => {
    // Stop Sandbox server
    await t.context.worker.tearDown().catch(error => {
      console.log('Failed to stop the Sandbox:', error);
    });
  });
  ```


## "Spooning" Contracts from Testnet and Mainnet

[Spooning a blockchain](https://coinmarketcap.com/alexandria/glossary/spoon-blockchain) is copying the data from one network into a different network. near-workspaces makes it easy to copy data from Mainnet or Testnet contracts into your local Sandbox environment:

```ts
const refFinance = await root.importContract({
  mainnetContract: 'v2.ref-finance.near',
  blockId: 50_000_000,
  withData: true,
});
```

This would copy the Wasm bytes and contract state from [v2.ref-finance.near](https://explorer.near.org/accounts/v2.ref-finance.near) to your local blockchain as it existed at block `50_000_000`. This makes use of Sandbox's special [patch state](#patch-state-on-the-fly) feature to keep the contract name the same, even though the top level account might not exist locally (note that this means it only works in Sandbox testing mode). You can then interact with the contract in a deterministic way the same way you interact with all other accounts created with near-workspaces.

Gotcha: `withData` will only work out-of-the-box if the contract's data is 50kB or less. This is due to the default configuration of RPC servers; see [the "Heads Up" note here](https://docs.near.org/docs/api/rpc/contracts#view-contract-state). Some teams at NEAR are hard at work giving you an easy way to run your own RPC server, at which point you can point tests at your custom RPC endpoint and get around the 50kB limit.

See an [example of spooning](https://github.com/near/workspaces-js/blob/main/__tests__/05.spoon-contract-to-sandbox.ava.ts)  contracts.

## Running on Testnet

near-workspaces is set up so that you can write tests once and run them against a local Sandbox node (the default behavior) or against [NEAR TestNet](https://docs.near.org/docs/concepts/networks). Some reasons this might be helpful:

* Gives higher confidence that your contracts work as expected
* You can test against deployed testnet contracts
* If something seems off in Sandbox mode, you can compare it to testnet

In order to use Workspaces JS in testnet mode you will need to have a testnet account. You can create one [here](https://wallet.testnet.near.org/).

You can switch to testnet mode in three ways.

1. When creating Worker set network to `testnet` and pass your master account:

   ```ts
   const worker = await Worker.init({
     network: 'testnet',
     testnetMasterAccountId: '<yourAccountName>',
  })
   ```

2. Set the `NEAR_WORKSPACES_NETWORK` and `TESTNET_MASTER_ACCOUNT_ID` environment variables when running your tests:

   ```bash
   NEAR_WORKSPACES_NETWORK=testnet TESTNET_MASTER_ACCOUNT_ID=<your master account Id> node test.js
   ```

   If you set this environment variables and pass `{network: 'testnet', testnetMasterAccountId: <masterAccountId>}` to `Worker.init`, the config object takes precedence.

3. If using `near-workspaces` with AVA, you can use a custom config file. Other test runners allow similar config files; adjust the following instructions for your situation.

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


### Stepping through a testnet example

Let's revisit a shortened version of the example from How It Works above, describing what will happen in Testnet.

1. Create a `Worker`.

   ```ts
   const worker = await Worker.init();
   ```

   `Worker.init` creates a unique testnet account as root account.

2. Write tests.

   ```ts
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
       assert.equal(result, 'some default');
     }
   ]);
   ```

Note: Sometimes account creation rate limits are reached on testnet, simply wait a little while and try again.

### Running tests only in Sandbox

If some of your runs take advantage of Sandbox-specific features, you can skip these on testnet in two ways:

1. You can skip entire sections of your files by checking `getNetworkFromEnv() === 'sandbox'`.

  ```ts
  let worker = Worker.init();
  // things make sense to any network
  const root = worker.rootAccount;
  const alice = await root.createSubAccount('alice');

  if (getNetworkFromEnv() === 'sandbox') {
    // thing that only makes sense with sandbox
  }
  ```

2. Use a separate testnet config file, as described under the "Running on Testnet" heading above. Specify test files to include and exclude in config file.

## Patch State on the Fly

In Sandbox-mode, you can add or modify any contract state, contract code, account or access key with `patchState`.

You cannot perform arbitrary mutation on contract state with transactions since transactions can only include contract calls that mutate state in a contract-programmed way. For example, with an NFT contract, you can perform some operation with NFTs you have ownership of, but you cannot manipulate NFTs that are owned by other accounts since the smart contract is coded with checks to reject that. This is the expected behavior of the NFT contract. However, you may want to change another person's NFT for a test setup. This is called "arbitrary mutation on contract state" and can be done with `patchState`. Alternatively you can stop the node, dump state at genesis, edit genesis, and restart the node. The later approach is more complicated to do and also cannot be performed without restarting the node.

It is true that you can alter contract code, accounts, and access keys using normal transactions via the `DeployContract`, `CreateAccount`, and `AddKey` [actions](https://nomicon.io/RuntimeSpec/Actions.html?highlight=actions#actions). But this limits you to altering your own account or sub-account. `patchState` allows you to perform these operations on any account.

To see an example of how to do this, see the [patch-state test](https://github.com/near/workspaces-js/blob/main/__tests__/02.patch-state.ava.ts).

## Pro Tips

* `NEAR_WORKSPACES_DEBUG=true` – run tests with this environment variable set to get copious debug output and a full log file for each Sandbox instance.

* `Worker.init` [config](https://github.com/near/workspaces-js/blob/main/packages/js/src/interfaces.ts) – you can pass a config object as the first argument to `Worker.init`. This lets you do things like:

  * skip initialization if specified data directory already exists (the default behavior)

    ```ts
    Worker.init(
      { rm: false, homeDir: './test-data/alice-owns-an-nft' },
    )
    ```

  * always recreate such data directory instead with `rm: true`

  * specify which port to run on

  * and more!
