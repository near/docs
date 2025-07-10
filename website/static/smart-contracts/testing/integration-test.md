---
id: integration-test
title: Integration Tests
---



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

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let dev_account = sandbox.dev_create_account().await?;

    println!("dev_account: {:#?}", dev_account);
    // dev_account: Account { id: AccountId("dev-20250131121318-56660632612680") }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;
  const devUser = await root.devCreateAccount();
  
  console.log('devUser:', devUser);
  // devUser: Account {
  //   _accountId: 'dev-32502-22496.test.near',
  //   manager: <ref *1> SandboxManager {
  //     config: {
  //       network: 'sandbox',
  //       rootAccountId: 'test.near',
  //       rpcAddr: 'http://127.0.0.1:21879',
  //       initialBalance: '100000000000000000000000000',
  //       homeDir: '/private/var/folders/yf/n8735nxj4qz69g1ck3zchh680000gn/T/sandbox/bd47fd10-f3ad-4253-a828-47a599de2bbd',
  //       port: 21879,
  //       rm: false,
  //       refDir: null
  //     },
  //     accountsCreated: Set(2) { 'test-account.test.near', 'dev-32502-22496.test.near' },
  //     _root: Account { _accountId: 'test.near', manager: [Circular *1] }
  //   }
  // }

```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Subaccount

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let root_account = sandbox.root_account().unwrap();

    println!("root_account: {:#?}", root_account);
    // root_account: Account { id: AccountId("test.near") }

    let alice_account = root_account
        .create_subaccount("alice")
        .initial_balance(NearToken::from_near(1))
        .transact()
        .await?
        .into_result()?;

    println!("alice_account: {:#?}", alice_account);
    // alice_account: Account { id: AccountId("alice.test.near") }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;
  const subaccount = await root.createSubAccount('subaccount');
  
  console.log('subaccount:', subaccount);
  // subaccount: Account {
  //   _accountId: 'subaccount.test.near',
  //   manager: <ref *1> SandboxManager {
  //     config: {
  //       network: 'sandbox',
  //       rootAccountId: 'test.near',
  //       rpcAddr: 'http://127.0.0.1:5014',
  //       initialBalance: '100000000000000000000000000',
  //       homeDir: '/private/var/folders/yf/n8735nxj4qz69g1ck3zchh680000gn/T/sandbox/f6ebeb0b-ecb9-4233-b6df-facbb9861b15',
  //       port: 5014,
  //       rm: false,
  //       refDir: null
  //     },
  //     accountsCreated: Set(2) { 'test-account.test.near', 'subaccount.test.near' },
  //     _root: Account { _accountId: 'test.near', manager: [Circular *1] }
  //   }
  // }

```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Using Secret Key

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let account_id: AccountId = "test-account.near".parse().unwrap();
    let secret_key = SecretKey::from_random(KeyType::ED25519);

    let account = Account::from_secret_key(account_id, secret_key, &sandbox);

    println!("account: {:#?}", account);
    // account: Account { id: AccountId("test-account.near") }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;

  const account_id = "secret.test.near";
  const keyPair = KeyPair.fromRandom("ED25519");

  const account = await root.createAccount(account_id, {
    keyPair,
    initialBalance: "100000000000000000000000",
  });
  
  console.log('account from secret key:', account);
  // account from secret key: Account {
  //   _accountId: 'secret.test.near',
  //   manager: <ref *1> SandboxManager {
  //     config: {
  //       network: 'sandbox',
  //       rootAccountId: 'test.near',
  //       rpcAddr: 'http://127.0.0.1:28270',
  //       initialBalance: '100000000000000000000000000',
  //       homeDir: '/private/var/folders/yf/n8735nxj4qz69g1ck3zchh680000gn/T/sandbox/04b4f82d-6232-4a87-8c7d-3396f1c3eb57',
  //       port: 28270,
  //       rm: false,
  //       refDir: null
  //     },
  //     accountsCreated: Set(2) { 'test-account.test.near', 'secret.test.near' },
  //     _root: Account { _accountId: 'test.near', manager: [Circular *1] }
  //   }
  // }

```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Using Credentials From File

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let account = Account::from_file("./tests/credentials.json", &sandbox)?;

    println!("account: {:#?}", account);
    // account: Account { id: AccountId("test-ac-1719933221123-3.testnet") }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;

  const account_id = "file.test.near";
  const keyPair = await getKeyFromFile('.near-credentials/workspaces/testnet/getKeyFromFile.json');

  const account = await root.createAccount(account_id, {
    keyPair,
    initialBalance: "100000000000000000000000",
  });
  
  console.log('account with credentials from file:', account);
  // account with credentials from file: Account {
  //   _accountId: 'file.test.near',
  //   manager: <ref *1> SandboxManager {
  //     config: {
  //       network: 'sandbox',
  //       rootAccountId: 'test.near',
  //       rpcAddr: 'http://127.0.0.1:59952',
  //       initialBalance: '100000000000000000000000000',
  //       homeDir: '/private/var/folders/yf/n8735nxj4qz69g1ck3zchh680000gn/T/sandbox/f8b61465-4fb7-48ae-9005-fcaa79d6ab62',
  //       port: 59952,
  //       rm: false,
  //       refDir: null
  //     },
  //     accountsCreated: Set(2) { 'test-account.test.near', 'file.test.near' },
  //     _root: Account { _accountId: 'test.near', manager: [Circular *1] }
  //   }
  // }

```

  </TabItem>
</Tabs>

---

## WASM Files

### Compile Contract Code

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let compiling_wasm_result = near_workspaces::compile_project("./").await;

    assert!(compiling_wasm_result.is_ok());

    let _contract_wasm =
        compiling_wasm_result.expect("Could not process WASM file after compiling");

```

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

  ```
    let artifact_path = "target/near/hello_rs.wasm";

    let reading_file_result = std::fs::read(artifact_path);

    assert!(reading_file_result.is_ok());

    let _contract_wasm = reading_file_result
        .expect(format!("Could not read WASM file from {}", artifact_path).as_str());

```

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

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let wasm_file = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&wasm_file).await?;

    println!("contract: {:#?}", contract);
    // contract: Contract { id: AccountId("dev-20250131125513-33446418241044") }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;

  const contract = await root.devDeploy('./build/hello_near.wasm');
  
  console.log('contract:', contract);
  // contract: Account {
  //   _accountId: 'dev-5878-35168.test.near',
  //   manager: <ref *1> SandboxManager {
  //     config: {
  //       network: 'sandbox',
  //       rootAccountId: 'test.near',
  //       rpcAddr: 'http://127.0.0.1:42499',
  //       initialBalance: '100000000000000000000000000',
  //       homeDir: '/private/var/folders/yf/n8735nxj4qz69g1ck3zchh680000gn/T/sandbox/f5106fc1-2495-48dc-8db3-b4b587215109',
  //       port: 42499,
  //       rm: false,
  //       refDir: null
  //     },
  //     accountsCreated: Set(2) { 'test-account.test.near', 'dev-5878-35168.test.near' },
  //     _root: Account { _accountId: 'test.near', manager: [Circular *1] }
  //   }
  // }

```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Deploy To Account

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let wasm_file = near_workspaces::compile_project("./").await?;
    let account = sandbox.dev_create_account().await?;

    let contract = account.deploy(&wasm_file).await?.unwrap();

    println!("contract: {:#?}", contract);
    // contract: Contract { id: AccountId("dev-20250131125513-33446418241044") }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

```

  </TabItem>
</Tabs>

---

## Logs

Show contract's logs.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  You can use `println` or `dbg!` when you want to see information from your code.

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let dev_account = sandbox.dev_create_account().await?;

    println!("dev_account: {:#?}", dev_account);
    // dev_account: Account { id: AccountId("dev-20250131121318-56660632612680") }

```

  In Rust, the output from your code is captured by default and not displayed in the terminal. In order to see the output, you have to use the `--nocapture` flag

    eg. `cargo test -- --nocapture`

    If you want to access the contracts logs, you can find them in the `tx_outcome.logs()` Vec.

    ```rust
    let tx_outcome = user_account
            .call(contract.id(), "set_greeting")
            .args_json(json!({"greeting": "Hello World!"}))
            .transact()
            .await?;
        assert!(tx_outcome.is_success());

        dbg!(tx_outcome.logs());
        // [tests/test_basics.rs:29:5] tx_outcome.logs() = [
        //     "Saving greeting: Hello World!",
        // ]
    ```

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

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let account = sandbox.dev_create_account().await?;

    let account_details = account
        .view_account()
        .await
        .expect("Account has to have some balance");

    println!("account_details: {:#?}", account_details);
    // account_details: AccountDetails { balance: NearToken { inner: 100000000000000000000000000 }, locked: NearToken { inner: 0 }, code_hash: 11111111111111111111111111111111, storage_usage: 182, storage_paid_at: 0 }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;

  const account = await root.devCreateAccount();
  const balance = await account.balance();
  
  console.log('balance:', balance.total.toHuman());
  // balance: {
  //   total: <BN: 52b7d2dcc80cd2e4000000>,
  //   stateStaked: <BN: 62a992e53a0af00000>,
  //   staked: <BN: 0>,
  //   available: <BN: 52b77033352798d9100000>
  // }

```

  </TabItem>
</Tabs>

---

## Transactions

### Call

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let ft_wasm = near_workspaces::compile_project("./tests/contracts/ft").await?;
    let ft_contract = sandbox.dev_deploy(&ft_wasm).await?;

    let initialize_result = ft_contract
        .call("new_default_meta")
        .args_json(json!({"owner_id": ft_contract.id(), "name": "token", "symbol": "tt", "total_supply": "1000000000000000000000000" }))
        .gas(Gas::from_tgas(100))
        .transact()
        .await?;

    println!("initialize_result: {:#?}", initialize_result);
    // initialize_result: ExecutionFinalResult { total_gas_burnt: NearGas { inner: 2225558148031 }, transaction: ExecutionOutcome { transaction_hash: 9NhQxh78Q7bdnYeYr7ccmhkb9z9iBnyf9JyoL4PF5uUb, block_hash: 4iQtc95L2SmyoU3XdxtcHQQURzbQJod6VFSgYZvYKwBy, logs: [], receipt_ids: [3qtZNe36azn73j2ndQNWNL4kDEeMBn3fQiBunAokoaop], gas_burnt: NearGas { inner: 308363587024 }, tokens_burnt: NearToken { inner: 30836358702400000000 }, executor_id: AccountId("dev-20250131130629-49143087716943"), status: SuccessReceiptId(3qtZNe36azn73j2ndQNWNL4kDEeMBn3fQiBunAokoaop) }, receipts: [ExecutionOutcome { transaction_hash: 3qtZNe36azn73j2ndQNWNL4kDEeMBn3fQiBunAokoaop, block_hash: 4iQtc95L2SmyoU3XdxtcHQQURzbQJod6VFSgYZvYKwBy, logs: ["EVENT_JSON:{\"standard\":\"nep141\",\"version\":\"1.0.0\",\"event\":\"ft_mint\",\"data\":[{\"owner_id\":\"dev-20250131130629-49143087716943\",\"amount\":\"1000000000000000000000000\",\"memo\":\"new tokens are minted\"}]}"], receipt_ids: [FrSvWZWMUCZbiuGrmkj19UTciXMTZgenZmJmLkUPt1AK], gas_burnt: NearGas { inner: 1917194561007 }, tokens_burnt: NearToken { inner: 191719456100700000000 }, executor_id: AccountId("dev-20250131130629-49143087716943"), status: SuccessValue('') }], status: SuccessValue('') }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting = await contract.view('get_greeting', {});
```

  </TabItem>
</Tabs>

<hr class="subsection" />

### View

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let ft_wasm = near_workspaces::compile_project("./tests/contracts/ft").await?;
    let ft_contract = sandbox.dev_deploy(&ft_wasm).await?;

    let initialize_result = ft_contract
        .call("new_default_meta")
        .args_json(json!({"owner_id": ft_contract.id(), "name": "token", "symbol": "tt", "total_supply": "1000000000000000000000000" }))
        .gas(Gas::from_tgas(100))
        .transact()
        .await?;
    assert!(initialize_result.is_success());

    let view_transaction_result = ft_contract
        .call("ft_balance_of")
        .args_json((ft_contract.id(),))
        .view()
        .await?;

    println!("view_transaction_result: {:#?}", view_transaction_result);
    // ViewResultDetails { result: [34, 49, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 34], logs: [] }

    let account_balance = view_transaction_result.json::<NearToken>()?;

    println!("account_balance: {:#?}", account_balance);
    // account_details: AccountDetails { balance: NearToken { inner: 100000000000000000000000000 }, locked: NearToken { inner: 0 }, code_hash: 11111111111111111111111111111111, storage_usage: 182, storage_paid_at: 0 }

```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { contract } = t.context.accounts;
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');
```

  </TabItem>
</Tabs>

---

## Patch State on the Fly

In Sandbox-mode, you can add or modify any contract state, contract code, account or access key with `patchState`.

You can alter contract code, accounts, and access keys using normal transactions via the `DeployContract`, `CreateAccount`, and `AddKey` [actions](https://nomicon.io/RuntimeSpec/Actions#addkeyaction). But this limits you to altering your own account or sub-account. `patchState` allows you to perform these operations on any account.

<Tabs groupId="code-tabs">

  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let wasm_file = near_workspaces::compile_project("./").await?;
    let contract = sandbox.dev_deploy(&wasm_file).await?;

    let new_greeting = "Howdy";

    let _ = sandbox
        .patch_state(
            contract.id(),
            "STATE".as_bytes(),
            &borsh::to_vec(new_greeting)?,
        )
        .await?;

    let current_greeting = contract
        .call("get_greeting")
        .view()
        .await?
        .json::<String>()?;

    println!("current_greeting: {:#?}", current_greeting);
    // current_greeting: "Howdy"

```

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { contract } = t.context.accounts;
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');

  const new_greeting = 'Howdy';

  await contract.patchState('STATE', JSON.stringify({"greeting": new_greeting}));

  const updated_greeting = await contract.view('get_greeting', {});

  console.log('updated_greeting:', updated_greeting);
  // updated_greeting: Howdy

```

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

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let wasm_file = near_workspaces::compile_project("./tests/contracts/simple-contract").await?;
    let contract = sandbox.dev_deploy(&wasm_file).await?;

    let (timestamp, epoch_height): (u64, u64) =
        contract.call("current_env_data").view().await?.json()?;

    println!("timestamp = {}, epoch_height = {}", timestamp, epoch_height);

    let block_info = sandbox.view_block().await?;

    println!("BlockInfo pre-fast_forward {:#?}", block_info);

    // Call into fast_forward. This will take a bit of time to invoke, but is
    // faster than manually waiting for the same amounts of blocks to be produced
    sandbox.fast_forward(10000).await?;

    let (timestamp, epoch_height): (u64, u64) =
        contract.call("current_env_data").view().await?.json()?;

    println!("timestamp = {}, epoch_height = {}", timestamp, epoch_height);

    let block_info = sandbox.view_block().await?;

    println!("BlockInfo post-fast_forward {:#?}", block_info);

```

  _[See the full example on Github](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs)._

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

  ```
  const { root } = t.context.accounts;
  const { worker } = t.context;
  const simpleContract = await root.devDeploy('./sandbox-test/contracts/simple_contract.wasm');

  const [initialTimestamp, initialEpochHeight] = await simpleContract.view('current_env_data', {});
  console.log(`initialTimestamp = ${initialTimestamp}, initialEpochHeight = ${initialEpochHeight}`);

  const initialBlockInfo = await worker.provider.block({ finality: 'final' });
  console.log('initialBlockInfo:', initialBlockInfo);

  const delta = 10000;
  await worker.provider.fastForward(delta);

  const [finalTimestamp, finalEpochHeight] = await simpleContract.view('current_env_data', {});
  console.log(`finalTimestamp = ${finalTimestamp}, finalEpochHeight = ${finalEpochHeight}`);

  const finalBlockInfo = await worker.provider.block({ finality: 'final' });
  console.log('finalBlockInfo:', finalBlockInfo);

  // Rounding off to nearest hundred, providing wiggle room incase not perfectly `forward_height`
  t.true(Math.ceil(finalBlockInfo.header.height / 100) * 100 === delta);
});
```

  </TabItem>

</Tabs>

---

## Using Testnet

NEAR Workspaces is set up so that you can write tests once and run them against a local Sandbox node (the default behavior) or against [NEAR TestNet](../../protocol/network/networks.md). Some reasons this might be helpful:

* Gives higher confidence that your contracts work as expected
* You can test against deployed testnet contracts
* If something seems off in Sandbox mode, you can compare it to testnet

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust" default>

  ```
    let testnet = near_workspaces::testnet().await?;

    let account_id: AccountId = "test-ac-1719933221123-3.testnet".parse().unwrap();
    let secret_key: SecretKey = "ed25519:4ERg5chhrvzbqv4jUzbcSwejcEzzqaqxF5NL9RhPV3X9MF5pJjrSeWPMic8QcJaJz8mL7xHqgyQxZoHn6XJWstQe".parse().unwrap();

    let account = Account::from_secret_key(account_id, secret_key, &testnet);

    println!("account: {:#?}", account);
    // account: Account { id: AccountId("test-ac-1719933221123-3.testnet") }

    assert_eq!(account.id(), "test-ac-1719933221123-3.testnet");

    let hello_near_id: AccountId = "hello.near-examples.testnet".parse().unwrap();

    let current_greeting_on_testnet = account
        .call(&hello_near_id, "get_greeting")
        .view()
        .await?
        .json::<String>()
        .unwrap();

    println!(
        "current_greeting_on_testnet: {:#?}",
        current_greeting_on_testnet
    );
    // current_greeting_on_testnet: "defi is cool"

```

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

  ```
  const testnet = await Worker.init({ network: 'testnet', testnetMasterAccountId: 'test-ac-1719933221123-3.testnet', initialBalance: NEAR.parse("0.1 N").toString()});

  const currentGreetingOnTestnet = await testnet.rootAccount.call('hello.near-examples.testnet', 'get_greeting', {});
  console.log('currentGreetingOnTestnet:', currentGreetingOnTestnet);

  const newGreeting = `howdy`;

  await testnet.rootAccount.call('hello.near-examples.testnet', 'set_greeting', { greeting: newGreeting });
  const updatedGreetingOnTestnet = await testnet.rootAccount.call('hello.near-examples.testnet', 'get_greeting', {});
  console.log('updatedGreetingOnTestnet:', updatedGreetingOnTestnet);

  t.is(updatedGreetingOnTestnet, newGreeting);
});
```

  </TabItem>

</Tabs>

---

## Spooning Contracts

[Spooning a blockchain](https://coinmarketcap.com/alexandria/glossary/spoon-blockchain) is copying the data from one network into a different network. NEAR Workspaces makes it easy to copy data from Mainnet or Testnet contracts into your local Sandbox environment:

<Tabs groupId="code-tabs">

  <TabItem value="rust" label="🦀 Rust" default>

  Specify the contract name from `testnet` you want to be pulling, and a specific block ID referencing back to a specific time. (Just in case the contract you're referencing has been changed or updated)

  Create a function called `pull_contract` which will pull the contract's `.wasm` file from the chain and deploy it onto your local sandbox. You'll have to re-initialize it with all the data to run tests. This is because the contract's data is too big for the RPC service to pull down. (limits are set to 50Mb)

  ```
    let sandbox = near_workspaces::sandbox().await?;
    let testnet = near_workspaces::testnet_archival().await?;

    const BLOCK_HEIGHT: BlockHeight = 186705486;

    let hello_near_id: AccountId = "hello.near-examples.testnet".parse().unwrap();

    let sandbox_contract = sandbox
        .import_contract(&hello_near_id, &testnet)
        .block_height(BLOCK_HEIGHT)
        .initial_balance(NearToken::from_near(10))
        .transact()
        .await?;

    let greeting = sandbox_contract
        .call("get_greeting")
        .view()
        .await?
        .json::<String>()
        .unwrap();

    println!("greeting: {:#?}", greeting);
    // greeting: "Hello"

```

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
    ```
use near_workspaces::types::NearToken;
use serde_json::json;

const FIVE_NEAR: NearToken = NearToken::from_near(5);

#[tokio::test]
async fn test_contract_is_operational() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let root = sandbox.root_account()?;

    let user_account = root.create_subaccount("user").transact().await?.unwrap();
    let contract_account = root.create_subaccount("contract").initial_balance(FIVE_NEAR).transact().await?.unwrap();

    let contract = contract_account.deploy(&contract_wasm).await?.unwrap();

    let outcome = user_account
        .call(contract.id(), "set_greeting")
        .args_json(json!({"greeting": "Hello World!"}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    let user_message_outcome = contract
        .view("get_greeting")
        .args_json(json!({}))
        .await?;
    assert_eq!(user_message_outcome.json::<String>()?, "Hello World!");

    Ok(())
}

```
  </Language>
  <Language value="js" language="js">
    ```
test.beforeEach(async t => {
  // Create sandbox
  const worker = t.context.worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the default greeting', async (t) => {
  const { contract } = t.context.accounts;
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');
});

test('changes the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Howdy');
});
```
  </Language>
</CodeTabs>

<hr class="subsection" />

### Snippet II: Testing Donations

In most cases we will want to test complex methods involving multiple users and money transfers. A perfect example for this is our [Donation Example](https://github.com/near-examples/donation-examples), which enables users to `donate` money to a beneficiary. Lets see its integration tests

<CodeTabs>
  <Language value="rust" language="rust">
    ```
use near_sdk::{json_types::{U128, U64}, AccountId};
use near_workspaces::types::NearToken;
use serde_json::json;

const ONE_NEAR: NearToken = NearToken::from_near(1);
const STORAGE_COST: NearToken = NearToken::from_millinear(1);

#[tokio::test]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let alice_account = sandbox.dev_create_account().await?;
    let bob_account = sandbox.dev_create_account().await?;
    let beneficiary_account = sandbox.dev_create_account().await?;

    let initial_balance = beneficiary_account.view_account().await?.balance;

    let outcome_init = contract
        .call("init")
        .args_json(json!({"beneficiary": beneficiary_account.id()}))
        .transact()
        .await?;

    assert!(outcome_init.is_success());

    let alice_first_donation_outcome = alice_account
        .call(contract.id(), "donate")
        .args_json({})
        .deposit(ONE_NEAR)
        .transact()
        .await?;

    assert!(alice_first_donation_outcome.is_success());

    let bob_first_donation_outcome = bob_account
        .call(contract.id(), "donate")
        .args_json({})
        .deposit(ONE_NEAR)
        .transact()
        .await?;

    assert!(bob_first_donation_outcome.is_success());

    let _ = alice_account
        .call(contract.id(), "donate")
        .args_json({})
        .deposit(ONE_NEAR.saturating_mul(3))
        .transact()
        .await?
        .into_result();

    let number_of_donors: U64 = contract
        .view("number_of_donors")
        .args_json({})
        .await?
        .json()?;

    #[derive(near_sdk::serde::Serialize, near_sdk::serde::Deserialize, Debug, PartialEq)]
    #[serde(crate = "near_sdk::serde")]
    struct Donation {
        account_id: AccountId,
        total_amount: U128,
    }

    let donation: Donation = contract
        .view("get_donation_for_account")
        .args_json(json!({"account_id": alice_account.id()}))
        .await?
        .json()?;

    assert_eq!(number_of_donors, U64::from(2));
    assert_eq!(u128::from(donation.total_amount), NearToken::from_near(4).as_yoctonear());

    let donation_vec: Vec<Donation> = contract
        .view("get_donations")
        .args_json(json!({}))
        .await?
        .json()?;

    assert_eq!(
        donation_vec,
        vec![
            Donation {
                account_id: alice_account.id().clone(),
                total_amount: U128::from(NearToken::from_near(4).as_yoctonear()),
            },
            Donation {
                account_id: bob_account.id().clone(),
                total_amount: U128::from(NearToken::from_near(1).as_yoctonear()),
            },
        ]
    );

    // total donation amount excluding the costs necesseary for storage
    let donation_amount = NearToken::from_near(5).saturating_sub(STORAGE_COST.saturating_mul(2));
    let expected_balance = initial_balance.saturating_add(donation_amount);

    assert_eq!(
        beneficiary_account.view_account().await?.balance,
        expected_balance
    );

    Ok(())
}

```
  </Language>
  <Language value="js" language="js">
    ```
test("sends donations to the beneficiary", async (t) => {
  const { contract, alice, beneficiary } = t.context.accounts;

  const balance = await beneficiary.balance();
  const available = parseFloat(balance.available.toHuman());

  await alice.call(contract, "donate", {}, { attachedDeposit: NEAR.parse("1 N").toString() });

  const new_balance = await beneficiary.balance();
  const new_available = parseFloat(new_balance.available.toHuman());

  t.is(new_available, available + 1 - 0.001);
});

test("records the donation", async (t) => {
  const { contract, bob } = t.context.accounts;

  await bob.call(contract, "donate", {}, { attachedDeposit: NEAR.parse("2 N").toString() });

  /** @type {Donation} */
  const donation = await contract.view("get_donation_for_account", { account_id: bob.accountId });

  t.is(donation.account_id, bob.accountId);
  t.is(donation.total_amount, NEAR.parse("2 N").toString());
});

```
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
