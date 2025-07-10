---
id: xcc
title: Cross Contract Call
---





This example performs the simplest cross-contract call possible: it calls our [Hello NEAR](https://github.com/near-examples/hello-near-examples) example to set and retrieve a greeting.
It is one of the simplest examples on making a cross-contract call, and the perfect gateway to the world of interoperative contracts.

:::info Advanced Cross-Contract Calls
Check the tutorial on how to perform cross-contract calls [in batches and in parallel](./advanced-xcc)
:::

---

## Obtaining the Cross Contract Call Example

You have two options to start the project:

1. You can use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                                      | Clone locally                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

---

## Structure of the Example

The smart contract is available in two flavors: Rust and JavaScript

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── hello-near
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    └── contract.ts
├── package.json
├── README.md
└── tsconfig.json
```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

```bash
┌── tests # sandbox testing
│    ├── hello-near
│    │    └── hello-near.wasm
│    └── tests.rs
├── src # contract's code
│    ├── external.rs
│    └── lib.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Smart Contract

### Contract
The contract exposes methods to query the greeting and change it. These methods do nothing but calling `get_greeting` and
`set_greeting` in the `hello-near` example.

<CodeTabs>
<Language value="js" language="ts">
    ```
class CrossContractCall {
  hello_account: AccountId = "hello-nearverse.testnet";

  @initialize({})
  init({ hello_account }: { hello_account: AccountId }) {
    this.hello_account = hello_account;
  }

  @call({})
  query_greeting(): NearPromise {
    const promise = NearPromise.new(this.hello_account)
      .functionCall("get_greeting", NO_ARGS, NO_DEPOSIT, THIRTY_TGAS)
      .then(
        NearPromise.new(near.currentAccountId())
          .functionCall(
            "query_greeting_callback",
            NO_ARGS,
            NO_DEPOSIT,
            THIRTY_TGAS,
          ),
      );

    return promise.asReturn();
  }
```
  </Language>
  <Language value="rust" language="rust">
    ```
impl Contract {
    #[init]
    #[private] // Public - but only callable by env::current_account_id()
    pub fn init(hello_account: AccountId) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        Self { hello_account }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const HELLO_NEAR: &str = "beneficiary";

    #[test]
    fn initializes() {
        let beneficiary: AccountId = HELLO_NEAR.parse().unwrap();
        let contract = Contract::init(beneficiary);
        assert_eq!(contract.hello_account, HELLO_NEAR)
    }
}

```
            <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external.rs"
            start="2" end="12" />
  </Language>
</CodeTabs>

### Testing the Contract

The contract readily includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  cd contract-simple-ts
  yarn
  yarn test
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cd contract-simple-rs
  cargo test
  ```
  </TabItem>

</Tabs>

:::tip
The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract.
:::

In this project in particular, the integration tests first deploy the `hello-near` contract. Then,
they test that the cross-contract call correctly sets and retrieves the message. You will find the integration tests
in `sandbox-ts/` for the JavaScript version and in `tests/` for the Rust version.

<CodeTabs>
  <Language value="js" language="js">
    ```
test.beforeEach(async (t) => {
  // Create sandbox, accounts, deploy contracts, etc.
  const worker = t.context.worker = await Worker.init();
  
  // Get root account
  const root = worker.rootAccount;

  // Create test accounts
  const alice = await root.createSubAccount("alice");
  const xcc = await root.createSubAccount("xcc");
  const helloNear = await root.createSubAccount("hello-near");

  // Deploy the hello near contract
  await helloNear.deploy("./sandbox-ts/hello-near/hello-near.wasm");

  // Deploy the xcc contract
  await xcc.deploy(process.argv[2]);
  await xcc.call(xcc, "init", { hello_account: helloNear.accountId });

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, alice, xcc, helloNear };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test("returns the default greeting", async (t) => {
  const { xcc, alice } = t.context.accounts;
  const greeting = await alice.call(xcc, "query_greeting", {}, { gas: "200000000000000" });
  t.is(greeting, 'Hello');
});

test("change the greeting", async (t) => {
  const { xcc, alice } = t.context.accounts;

  const howdyChangingResult = await alice.call(xcc, "change_greeting", { new_greeting: "Howdy" }, { gas: "200000000000000" });
  t.is(howdyChangingResult, true);

  const howdyResult = await alice.call(xcc, "query_greeting", {}, { gas: "200000000000000" });
  t.is(howdyResult, 'Howdy');
});
```
  </Language>
  <Language value="rust" language="rust">
    ```
#[tokio::test]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;

    // Build and deploy hello contract
    let hello_contract_wasm = near_workspaces::compile_project("./tests/hello-near").await?;
    let hello_contract: Contract = worker.dev_deploy(&hello_contract_wasm).await?;

    // Deploy contract for testing
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Create accounts
    let account = worker.dev_create_account().await?;
    let alice = account
        .create_subaccount("alice")
        .initial_balance(NearToken::from_near(30))
        .transact()
        .await?
        .into_result()?;

    // Init contract
    let _ = contract
        .call("init")
        .args_json(json!({ "hello_account": hello_contract.id() }))
        .transact()
        .await?
        .into_result()?;

    // Begin tests
    test_hl_default_greeting(&alice, &contract).await?;
    test_hl_change_greeting(&alice, &contract).await?;
    test_ll_change_greeting(&alice, &contract).await?;
    Ok(())
}

async fn test_hl_default_greeting(
    user: &Account,
    contract: &Contract,
) -> Result<(), Box<dyn std::error::Error>> {
    let greeting: String = user
        .call(contract.id(), "hl_query_greeting")
        .args_json(json!({}))
        .max_gas()
        .transact()
        .await?
        .json()?;

    assert_eq!(greeting, "Hello".to_string());
    Ok(())
}

async fn test_hl_change_greeting(
    user: &Account,
    contract: &Contract,
) -> Result<(), Box<dyn std::error::Error>> {
    let result: bool = user
        .call(contract.id(), "hl_change_greeting")
        .args_json(json!({ "new_greeting": "Howdy" }))
        .max_gas()
        .transact()
        .await?
        .json()?;

    assert!(result);

    let greeting: String = user
        .call(contract.id(), "hl_query_greeting")
        .args_json(json!({}))
        .max_gas()
        .transact()
        .await?
        .json()?;

    assert_eq!(greeting, "Howdy".to_string());
```
  </Language>
</CodeTabs>


<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to create a NEAR account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account pre-funded by a faucet
  near create-account <accountId> --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account pre-funded by a faucet
  near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Go into the directory containing the smart contract (`cd contract-advanced-ts` or `cd contract-advanced-rs`), build and deploy it:

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```bash
    npm run build
    near deploy <accountId> ./build/cross_contract.wasm --initFunction new --initArgs '{"hello_account":"hello.near-example.testnet"}'
    ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cargo near deploy build-non-reproducible-wasm <accountId> with-init-call new json-args '{"hello_account":"hello.near-example.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send

  ```

  </TabItem>

</Tabs>

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Get message from the hello-near contract
  # Replace <accountId> with your account ID
  near call <accountId> query_greeting --accountId <accountId>

  # Set a new message for the hello-near contract
  # Replace <accountId> with your account ID
  near call <accountId> change_greeting '{"new_greeting":"XCC Hi"}' --accountId <accountId>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Get message from the hello-near contract
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> query_greeting json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send

  # Set a new message for the hello-near contract
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> change_greeting json-args '{"new_greeting":"XCC Hi"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

---

## Moving Forward

A nice way to learn is by trying to expand a contract. Modify the cross contract example to use the [guest-book](guest-book.md)
contract!. In this way, you can try to make a cross-contract call that attaches money. Remember to correctly [handle the callback](/smart-contracts/anatomy/crosscontract#callback-function),
and to return the money to the user in case of error.

### Advanced Cross Contract Calls

Your contract can perform multiple cross-contract calls in simultaneous, creating promises that execute in parallel, or as a batch transaction. Check the [advanced cross contract calls
tutorial](./advanced-xcc) to learn more.

<MovingForwardSupportSection />

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
