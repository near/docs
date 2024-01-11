---
id: upgrade
title: Updating Contracts
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR accounts separate their logic (contract's code) from their state (storage), allowing the code to be changed.

Contract's can be updated in two ways:

1. **Through tools** such as [NEAR CLI](../4.tools/cli.md) or [near-api-js](../4.tools/near-api-js/quick-reference.md) (if you hold the account's [full access key](../1.concepts/basics/accounts/access-keys.md)).
2. **Programmatically**, by implementing a method that [takes the new code and deploys it](#programmatic-update).

---

## Updating Through Tools
Simply re-deploy another contract using your preferred tool, for example, using [NEAR CLI](../4.tools/cli.md):

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  # If you already used dev-deploy the same account will be used
  near dev-deploy --wasmFile <new-contract>

  # If you logged in
  near deploy <account-id> --wasmFile <new-contract>
  ```

  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  # If you already used dev-deploy the same account will be used
  near contract deploy <my-new-dev-account>.testnet use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain

  # If you logged in
  near contract deploy <accountId> use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

---

## Programmatic Update
A smart contract can also update itself by implementing a method that:
1. Takes the new wasm contract as input
2. Creates a Promise to deploy it on itself

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="update.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/self-updates/base/src/update.rs"
        start="10" end="28" />
  </Language>
</CodeTabs>

#### How to Invoke Such Method?
<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  # Load the contract's raw bytes
  CONTRACT_BYTES=`cat ./path/to/wasm.wasm | base64`

  # Call the update_contract method
  near call <contract-account> update_contract "$CONTRACT_BYTES" --base64 --accountId <manager-account> --gas 300000000000000
  ```

  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  # Load the contract's raw bytes
  CONTRACT_BYTES=`cat ./path/to/wasm.wasm | base64`

  # Call the update_contract method
  near contract call-function as-transaction <contract-account> update_contract base64-args  "$CONTRACT_BYTES" prepaid-gas '300 TeraGas' attached-deposit '0 NEAR' sign-as <manager-account> network-config testnet sign-with-keychain send
  ```

  </TabItem>
  <TabItem value="🌐 JavaScript">

  ```js
  // Load the contract's raw bytes
  const code = fs.readFileSync("./path/to/wasm.wasm");

  // Call the update_contract method
  await wallet.callMethod({contractId: guestBook, method: "update_contract", args: code, gas: "300000000000000"});
  ```
  </TabItem>
</Tabs>

:::tip DAO Factories
This is how DAO factories [update their contracts](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao-factory2/src/factory_manager.rs#L60)
:::

---

## Migrating the State
Since the account's logic (smart contract) is separated from the account's state (storage), **the account's state persists** when re-deploying a contract.

Because of this, **adding methods** or **modifying existing ones** will yield **no problems**.

However, deploying a contract that **modifies or removes structures**  stored in the state will raise an error: `Cannot deserialize the contract state`, in which case you can choose to:
1. Use a different account
2. Rollback to the previous contract code
3. Add a method to migrate the contract's state

<hr class="subsection" />

### The Migration Method
If you have no option but to migrate the state, then you need to implement a method that:
1. Reads the current state of the contract
2. Applies different functions to transform it into the new state
3. Returns the new state

:::tip DAO Update
This is how DAOs [update themselves](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao2/src/upgrade.rs#L59)
:::

<hr class="subsection" />

### Example: Guest Book Migration

Imagine you have a Guest Book where you store messages, and the users can pay for such messages to be "premium". You keep track of the messages and payments using the following state:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/basic-updates/base/src/lib.rs"
        start="9" end="23" />        
  </Language>
</CodeTabs>

#### Update Contract
At some point you realize that you could keep track of the `payments` inside of the `PostedMessage` itself, so you change the contract to:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/basic-updates/update/src/lib.rs"
        start="11" end="25" />        
  </Language>
</CodeTabs>

#### Incompatible States
If you deploy the update into an initialized account the contract will fail to deserialize the account's state, because:
1. There is an extra `payments` vector saved in the state (from the previous contract)
2. The stored `PostedMessages` are missing the `payment` field (as in the previous contract)

<br />

#### Migrating the State
To fix the problem, you need to implement a method that goes through the old state, removes the `payments` vector and adds the information to the `PostedMessages`:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/basic-updates/update/src/migrate.rs"
        start="3" end="45" />
  </Language>
</CodeTabs>

Notice that `migrate` is actually an [initialization method](./contracts/anatomy.md#initialization-method) that **ignores** the existing state (`[#init(ignore_state)]`), thus being able to execute and rewrite the state.

:::tip
You can follow a migration step by step in the [official migration example](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/basic-updates/base)
:::
