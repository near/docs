---
id: near-api
title: NEAR API
sidebar_label: NEAR API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs"

The NEAR API is a set of libraries that allow you to interact with the NEAR blockchain. You can use it to create accounts, send tokens, deploy contracts, and more. 

The API is available in multiple languages, including:
- JavaScript: [`near-api-js`](https://github.com/near/near-api-js)
- Rust: [`near-api-rs`](https://github.com/near/near-api-rs)
- Python: [`py-near`](https://github.com/pvolnov/py-near)

For example, you could use [`near-api-js`](https://github.com/near/near-api-js) to create web applications or backend services written in node.js servers.

:::tip Wallet Integration
To allow users to login into your web application using a wallet you will need the `wallet-selector`. Read more in our [Web Frontend integration](/build/web3-apps/integrate-contracts) article
:::

These examples are references to code snippets, feel free to explore the full code examples in context by clicking `See full example on GitHub` below each example.

---

## Install

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  Include `near-api-js` as a dependency in your package.

  ```bash
  npm i near-api-js
  ```

  :::tip Static HTML
  If you are building a site without using `npm`, you can include the library directly in your HTML file through a CDN.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/near-api-js/dist/near-api-js.min.js"></script>
  ```
  :::

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo add near-api
  ```
  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```shell
  pip install py-near
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Import {#import}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  You can use the API library in the browser, or in Node.js runtime. 

  <Github fname="send-tokens.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/send-tokens.js#L1"
    start="1" end="1" />

  <details>
    <summary>Using the API in Node.js</summary>

    All these examples are written for the browser, to use these examples in Node.js you should convert the project to an ES module. To do this, add the following to your `package.json`:

  <Github fname="package.json" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/package.json#L1-L2"
    start="1" end="2" />

  </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  The methods to interact with the NEAR API are available through the `prelude` module.

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/send_tokens.rs#L2"
    start="2" end="2" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  You can use the NEAR API by importing the `py_near` package, either entirely
  ```python
  import py_near
  ```

  or only the parts you need, for example:
  ```python
  from py_near.account import Account
  from py_near.providers import JsonProvider
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Connecting to NEAR {#connect}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  The object returned from `connect` is your entry-point for all commands in the API.
  To transactions you'll need a [`KeyStore`](#signers).

  <Github fname="send-tokens.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/send-tokens.js#L17-L22"
    start="17" end="22" />

  <details>
    <summary>Mainnet/Localnet connection</summary>

    ```js
    // Mainnet config example
    const connectionConfig = {
      networkId: "mainnet",
      keyStore: myKeyStore,
      nodeUrl: "https://rpc.mainnet.near.org",
    };

    // Localnet config example
    const connectionConfig = {
      networkId: "local",
      nodeUrl: "http://localhost:3030",
    };
    ```
  </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  To interact with the blockchain you'll need to create a `NetworkConfig` object.

  Preset connections `mainnet` and `testnet` are available that come with standard configurations for each network.

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/send_tokens.rs#L19"
    start="19" end="19" />

  You can also create your own custom connection.

  <Github fname="custom_rpc.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/custom_rpc.rs#L6-L16"
    start="6" end="16" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Key Handlers: Stores & Signers 

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  To sign transactions you'll need to a `KeyStore` with valid keypairs.

  <Tabs>
  <TabItem value="browser" label="Browser" default>

  `BrowserLocalStorageKeyStore` can only be used in the browser, it uses the browser's local storage to store the keys.

  ```js
  // Creates keyStore using private key in local storage

  const { keyStores } = nearAPI;
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  ```

  </TabItem>
  <TabItem value="dir" label="Credentials Path">

  `UnencryptedFileSystemKeyStore` can be used is used to load keys from the legacy credentials directory used by the NEAR CLI.

  <Github fname="credentials-directory.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keystore-options/credentials-directory.js#L11-L13"
    start="11" end="13" />

  </TabItem>
  <TabItem value="file" label="File">

  Keystores can be created by loading a private key from a json file.

  <Github fname="credentials-file.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keystore-options/credentials-file.js#L10-L16"
    start="10" end="16" />

  </TabItem>
  <TabItem value="key" label="Private Key">

  Keystores can be created by using a private key string.

  Private keys have the format "ed25519:5Fg2...".

  <Github fname="private-key-string.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keystore-options/private-key-string.js#L10-L12"
    start="10" end="12" />

  </TabItem>
  <TabItem value="seed" label="Seed Phrase">

  Keystores can be created by using a seed phrase. To parse the seed phrase into a private key, the `near-seed-phrase` library is needed.

  ```bash
  npm i near-seed-phrase
  ```

  Seed phrases have the format "shoe three gate ..." and are usually 12 words long.

  <Github fname="seed-phrase.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keystore-options/seed-phrase.js#L11-L14"
    start="11" end="14" />

  </TabItem>
  </Tabs>
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  To sign transactions you'll need to create a `Signer` that holds a valid keypair.

  <Tabs>
  <TabItem value="keystore" label="Keystore" default>

  Signers can be created using the Keystore that is also used as the standard for saving keys with the NEAR CLI.

  <Github fname="keystore.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/signer_options/keystore.rs#L12-L18"
    start="12" end="18" />

  </TabItem>
  <TabItem value="dir" label="Credentials Path">

  Signers can be created using the credentials directory which is the legacy option for saving keys with the NEAR CLI.

  <Github fname="credentials_directory.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/signer_options/credentials_directory.rs#L10-L13"
    start="10" end="13" />

  </TabItem>
  <TabItem value="file" label="File">

  Signers can be created by loading a public and private key from a file.

  <Github fname="credentials_file.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/signer_options/credentials_file.rs#L12-L13"
    start="12" end="13" />

  </TabItem>
  <TabItem value="key" label="Private Key">

  Signers can be created by using a private key string.

  Private keys have the format "ed25519:5Fg2...".

  <Github fname="private_key_string.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/signer_options/private_key_string.rs#L13-L14"
    start="13" end="14" />

  </TabItem>
  <TabItem value="seed" label="Seed Phrase">

  Signers can be created by using a seed phrase.

  Seed phrases have the format "shoe three gate ..." and are usually 12 words long.

  <Github fname="seed_phrase.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/signer_options/seed_phrase.rs#L11-L12"
    start="11" end="12" />

  </TabItem>
    </Tabs>

  </TabItem>
  <TabItem value="python" label="🐍 Python">
  TODO: not exactly the same in Python, it's more and account + RPC URL, or a JSON RPC provider
  </TabItem>
</Tabs>


  <hr class="subsection" />

  ### RPC Failover

  RPC providers can experience intermittent downtime, connectivity issues, or rate limits that cause client transactions to fail. This can be prevented by using the `FailoverRpcProvider` that supports multiple RPC providers.

  <Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="rpc-failover.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/rpc-failover.js#L12-L34"
    start="12" end="34" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">
    You can pass multiple RPC providers to `JsonRpcProvider`

    ```python
    from py_near.providers import JsonProvider

    provider = JsonProvider(["https://test.rpc.fastnear.com", "https://rpc.testnet.pagoda.co"])
    ```
  </TabItem>
</Tabs>

---

## Account

### Instantiate Account {#instantiate-account}

This will return an Account object for you to interact with.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="account-details.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/account-details.js#L9"
    start="9" end="9" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="account_details.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/account_details.rs#L5-L7"
    start="5" end="7" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">
    You can instantiate any account with the following code:

    ```python
    from py_near.account import Account

    account = Account(account_id="example-account.testnet", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()
    ```

    If you want to use it to submit transactions later, you need to also pass the `private_key` param:

    ```python
    account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Get Balance {#get-balance}

Gets the available and staked balance of an account in yoctoNEAR.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="account-details.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/account-details.js#L12"
    start="12" end="12" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="account_details.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/account_details.rs#L13-L18"
    start="13" end="18" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

    ```python
    from py_near.account import Account

    account = Account(account_id="example-account.testnet", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    account_balance = account.get_balance()
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Get State {#get-state}

Get basic account information, such as its code hash and storage usage.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="account-details.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/account-details.js#L16"
    start="16" end="16" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  <Github fname="account_details.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/account_details.rs#L21-L21"
    start="21" end="21" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

    ```python
    from py_near.account import Account

    account = Account(account_id="example-account.testnet", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    account_state = account.fetch_state()
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Get Details {#get-details}

Returns the authorized apps of an account. This is a list of contracts that the account has function call access keys for.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="account-details.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/account-details.js#L20"
    start="20" end="20" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Create an Account {#create-account}

In order to create .near or .testnet accounts, you need to make a function call to the top-level-domain account (i.e. `near` or `testnet`), calling `create_account`. In this example we generate a new public key for the account by generating a random private key.

The deposit determines the initial balance of the account.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="create-account.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/create-account.js#L24-L39"
    start="24" end="39" />

  <details>
    <summary>Creating an account from a seed phrase</summary>

    You can also create an account with a public key that is derived from a randomly generated seed phrase.

    <Github fname="create-account-from-seed.js" language="javascript"
      url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/create-account-from-seed.js#L26-L39"
      start="26" end="39" />

  </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="create_account.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/create_account.rs#L32-L49"
    start="32" end="49" />

  <details>
    <summary>Creating an account from a seed phrase</summary>

    You can also create an account via a randomly generated seed phrase.

    <Github fname="create_account_from_seed.rs" language="rust"
      url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/create_account_from_seed.rs#L32-L48"
      start="32" end="48" />

  </details>

  </TabItem>
  <TabItem value="python" label="🐍 Python">
  
    ```python
    await account.function_call("testnet", "create_account", {"new_account_id": "example-account.testnet", "new_public_key": "ed25519:..."}, "30000000000000", 1 * NEAR)
    ```

  </TabItem>

</Tabs>

<hr class="subsection" />

### Create a Sub-Account {#create-sub-account}

Accounts can create sub-accounts of themselves, which are useful for creating separate accounts for different purposes. It is important to remark that the parent account has no control over any of its sub-accounts.

The deposit determines the initial balance of the account.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="create-account.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/create-account.js#L45-L56"
    start="45" end="56" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="create_account.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/create_account.rs#L65-L82"
    start="65" end="82" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

    Create a sub-account and fund it with your main account:

    ```python
    from py_near.account import Account
    from py_near.dapps.core import NEAR

    account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    res = account.create_account(account_id="sub.example-account.testnet", public_key="...", initial_balance=1 * NEAR))
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Delete Account {#delete-account}

When deleting an account, you need to specify a beneficiary account id. This is the account that will receive the remaining NEAR balance of the account being deleted. 

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="delete-account.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/delete-account.js#L45-L46"
    start="45" end="46" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="delete_account.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/delete_account.rs#L54-L59"
    start="54" end="59" />

  </TabItem>
</Tabs>

:::warning

Only NEAR tokens will be transferred to the beneficiary, so you should transfer all your FTs, NFTs, etc. to another account before deleting.

:::

:::danger

If the beneficiary account does not exist, the NEAR tokens will be burned

:::

---

## Transactions

### Send Tokens {#send-tokens}

Transfer NEAR tokens between accounts. 

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="send-tokens.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/send-tokens.js#L27-L30"
    start="27" end="30" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/send_tokens.rs#L22-L28"
    start="22" end="28" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

    ```python
    from py_near.account import Account
    from py_near.dapps.core import NEAR

    account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    await account.send_money("receiver-account.testnet", 1 * NEAR))
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Call Function

A call function changes the contract's state and requires a signer/keypair.


<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="contract-interaction.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/contract-interaction.js#L65-L73"
    start="65" end="73" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L23-L24"
    start="23" end="24" />

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L37-L49"
    start="37" end="49" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  await account.function_call("usn.near", "ft_transfer", {"receiver_id": "bob.near", "amount": "1000000000000000000000000"})
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Batch Actions

You can send multiple [actions](../1.concepts/protocol/transaction-anatomy.md#actions) in a batch to a single receiver. If one action fails then the entire batch of actions will be reverted.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  
  <Github fname="batch-actions.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/batch-actions.js#L22-L35"
    start="22" end="35" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="batch_actions.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/batch_actions.rs#L22-L42"
    start="22" end="42" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Simultaneous Transactions

Transactions can be sent in parallel to the network, so you don't have to wait for one transaction to complete before sending the next one. Note that these one transaction could be successful and the other one could fail. 

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="simultaneous-transactions.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/simultaneous-transactions.js#L22-L49"
    start="22" end="49" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="simultaneous_transactions.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/simultaneous_transactions.rs#L23-L55"
    start="23" end="55" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  import asyncio
  from py_near.account import Account

  account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
  await account.startup()

  # Prepare the transactions
  tx1 = account.function_call("guestbook.near-examples.testnet", "add_message", { "text": "Hello, world!" })
  tx2 = account.function_call("counter.near-examples.testnet", "increment", {})

  # Send the transactions simultaneously
  const transactionsResults = await asyncio.gather(tx1, tx2)
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Deploy a Contract {#deploy-a-contract}

You can deploy a contract from a compiled WASM file. 

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="contract-interaction.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/contract-interaction.js#L77-L80"
    start="77" end="80" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  Note that the `signer` here needs to be a signer for the same `account_id` as the one used to construct the `Contract` object.

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L54-L61"
    start="54" end="61" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  import asyncio
  from py_near.account import Account

  account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
  await account.startup()

  with open("contract.wasm", "rb") as f:
    contract_code = f.read()
  await account.deploy_contract(contract_code)
  ```
  </TabItem>
</Tabs>

---

## View Function

View functions are read-only functions that don't change the state of the contract. We can call these functions without a signer / keypair or any gas.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="contract-interaction.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/contract-interaction.js#L23-L62"
    start="23" end="62" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L22-L33"
    start="22" end="33" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  view_call_result = await account.view_function("guestbook.near-examples.testnet", "total_messages", {})
  # If args are required, they can be passed in like this in the 3rd argument:
  # {
  #   "from_index": "0",
  #   "limit": "10"
  # }
  print(view_call_result)
  ```
  </TabItem>
</Tabs>

---

## Keys

### Get All Access Keys {#get-all-access-keys}

List all the access keys for an account.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="keys.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keys.js#L22-L22"
    start="22" end="22" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/keys.rs#L22-L22"
    start="22" end="22" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  keys = await account.get_access_key_list()
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Add Full Access Key {#add-full-access-key}

Add a new [full access key](../1.concepts/protocol/access-keys.md#full-access-keys) to an account. Here we generate a random keypair, alternatively you can use a keypair from a seed phrase.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="keys.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keys.js#L26-L33"
    start="26" end="33" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/keys.rs#L22-L39"
    start="22" end="39" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  keys = await account.add_full_access_public_key("5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj")
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Add Function Call Key {#add-function-call-key}

Add a new [function call key](../1.concepts/protocol/access-keys.md#function-call-keys) to an account. When adding the key you should specify the contract id the key can call, an array of methods the key is allowed to call, and the allowance in gas for the key.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="keys.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keys.js#L37-L47"
    start="36" end="43" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/keys.rs#L43-L62"
    start="43" end="62" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  await account.add_public_key(
    "5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj",
    "example-contract.testnet", # Contract this key is allowed to call
    ["example_method"], # Methods this key is allowed to call (optional)
    0.25 * NEAR # Gas allowance key can use to call methods (optional)
  )
  ```
  </TabItem>

</Tabs>

<hr class="subsection" />

### Delete Access Key {#delete-access-key}

When deleting an access key, you need to specify the public key of the key you want to delete.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="keys.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/keys.js#L52-L52"
    start="52" end="52" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/keys.rs#L67-L72"
    start="67" end="72" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  await account.delete_public_key("5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj")
  ```
  </TabItem>
</Tabs>

---

## Validate Message Signatures

Users can sign messages using the `wallet-selector` `signMessage` method, which returns a signature. This signature can be verified using the following code:

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

    <Github fname="authenticate.js" language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/verify-signature/authentication.js" />

  </TabItem>
</Tabs>

---


## Utilities

### NEAR to yoctoNEAR {#near-to-yoctonear}

Convert an amount in NEAR to an amount in yoctoNEAR.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="utils.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/utils.js#L4-L4"
    start="4" end="4" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="utils.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/utils.rs#L7"
    start="7" end="7" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

   ```python
   from py_near.dapps.core import NEAR

   amount_in_yocto = 1 * NEAR
   ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Format Amount {#format-amount}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Format an amount in yoctoNEAR to an amount in NEAR.

  <Github fname="utils.js" language="javascript"
    url="https://github.com/PiVortex/near-api-examples/tree/main/javascript/examples/utils.js#L8"
    start="8" end="8" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  Format an amount of NEAR into a string of NEAR or yoctoNEAR depending on the amount.

  <Github fname="utils.rs" language="rust"
    url="https://github.com/PiVortex/near-api-examples/tree/main/rust/examples/utils.rs#L32"
    start="32" end="32" />

  </TabItem>
</Tabs>

---

## Additional resources

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  - [Documentation](https://near.github.io/near-api-js)
  - [Github](https://github.com/near/near-api-js)
  - [Full Examples](https://github.com/PiVortex/near-api-examples/tree/main/javascript)
  - [Cookbook](https://github.com/near/near-api-js/tree/master/packages/cookbook) which contains examples using the near-js/client package, a wrapper tree shakable package for near-api-js.

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  - [Documentation](https://docs.rs/near-api/latest/near_api/)
  - [Github](https://github.com/near/near-api-rs)
  - [Full Examples](https://github.com/PiVortex/near-api-examples/tree/main/rust)

  </TabItem>
  <TabItem value="python" label="🐍 Python">

    - [Phone number transfer](https://py-near.readthedocs.io/en/latest/clients/phone.html)

  </TabItem>
</Tabs>
