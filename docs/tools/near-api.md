---
id: near-api
title: NEAR API
sidebar_label: NEAR API
description: "Learn to use APIs in JavaScript, Rust, and Python to interact with the blockchain."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/UI/Codetabs"

The NEAR API is a collection of language-specific SDKs that allow developers to interact with the NEAR blockchain from both frontend and backend applications.

These libraries enable you to:

- Invoke view and call functions on deployed smart contracts
- Query on-chain data such as account state, keys, balance
- Create and manage NEAR accounts
- Transfer tokens, including native NEAR, Fungible Tokens, Non-Fungible Tokens
- Sign transactions/meta-transactions/messages and broadcasting them to the network
- Deploy smart contracts

Our API is available in multiple languages, including:
- JavaScript/TypeScript:
  - [`@near-js/accounts`](https://github.com/near/near-api-js/tree/master/packages/accounts) - A collection of classes, functions, and types for interacting with accounts and contracts.
  - [`@near-js/signers`](https://github.com/near/near-api-js/tree/master/packages/signers) - A collection of classes and types to facilitate cryptographic signing.
  - [`@near-js/transactions`](https://github.com/near/near-api-js/tree/master/packages/transactions) - A collection of classes, functions, and types for composing, serializing, and signing NEAR transactions.
  - [`@near-js/tokens`](https://github.com/near/near-api-js/tree/master/packages/tokens) - A collection of standard tokens.
  - [`@near-js/providers`](https://github.com/near/near-api-js/tree/master/packages/providers) - A collection of classes, functions, and types for communicating with the NEAR RPC.
  - [`@near-js/utils`](https://github.com/near/near-api-js/tree/master/packages/utils) - A collection of commonly-used functions and constants.
  - [`@near-js/crypto`](https://github.com/near/near-api-js/tree/master/packages/crypto) - A collection of classes and types for working with cryptographic key pairs.
  - [`@near-js/types`](https://github.com/near/near-api-js/tree/master/packages/types) - A collection of commonly-used classes and types..
  - [`@near-js/keystores`](https://github.com/near/near-api-js/tree/master/packages/keystores), [`@near-js/keystores-node`](https://github.com/near/near-api-js/tree/master/packages/keystores-node) and [`@near-js/keystores-browser`](https://github.com/near/near-api-js/tree/master/packages/keystores-browser) - A collection of classes for storing and managing NEAR-compatible cryptographic keys.
  :::info
  The legacy [`near-api-js`](https://github.com/near/near-api-js/tree/master/packages/near-api-js) package has been replaced with a set of modular packages under the `@near-js/*` namespace. These new libraries offer improved developer experience, better performance, and more flexibility by allowing you to import only the functionality you need.
  :::
- Rust: [`near-api-rs`](https://github.com/near/near-api-rs)
- Python: [`py-near`](https://github.com/pvolnov/py-near)

:::tip Wallet Integration
To allow users to login into your web application using a wallet you will need a wallet connector. Read more in our [NEAR Connect](../web3-apps/tutorials/wallet-login) article
:::

---

## Install

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  Include the following core libraries as most applications will need them:

  ```bash
  npm i @near-js/accounts@2 @near-js/providers@2 @near-js/signers@2
  ```

  :::tip Static HTML
  If you are building a site without using `npm`, you can include libraries directly in your HTML file through a CDN.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@near-js/accounts/lib/esm/index.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@near-js/providers/lib/esm/index.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@near-js/signers/lib/esm/index.min.js"></script>
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

 <Github fname="send_tokens.js" language="javascript"
    url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/send-tokens.js"
    start="1" end="3" />
  <details>
    <summary>Using the API in Node.js</summary>

    All these examples are written for the browser, to use these examples in Node.js you should convert the project to an ES module. To do this, add the following to your `package.json`:

  <Github fname="package.json" language="javascript"
    url="https://github.com/near-examples/near-api-examples/tree/main/javascript/package.json#L1-L2"
    start="1" end="2" />

  </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  The methods to interact with the NEAR API are available through the `near_api` module.

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/send_tokens.rs#L2"
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
  <TabItem value="rust" label="🦀 Rust">

  To interact with the blockchain you'll need to create a `NetworkConfig` object.

  Preset connections `mainnet` and `testnet` are available that come with standard configurations for each network.

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/send_tokens.rs#L19"
    start="19" end="19" />

  You can also create your own custom connection.

  <Github fname="custom_rpc.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/custom_rpc.rs#L6-L16"
    start="6" end="16" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Key Handlers: Stores & Signers

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  In previous versions of the NEAR SDK, signing transactions required setting up a `KeyStore` to manage and retrieve keys. With the new `@near-js/signers` package, this process has been simplified.

  You can now use the `Signer` abstraction, which provides a clean and extensible interface for signing. For most use cases, the `KeyPairSigner` implementation is the simplest option — it allows you to sign transactions directly using a single in-memory key pair, without needing a persistent keystore.

  <Tabs>
  <TabItem value="browser" label="Browser" default>

  In browser, you typically don’t need to manage private keys manually. Instead, use [NEAR Connect](../web3-apps/tutorials/wallet-login.md) to handle the user authentication and signing process securely

  <details>
    <summary>Manually managing keys in the browser (not recommended)</summary>

    If your use case requires direct control over keys in the browser (e.g. building a custom signing flow), you can use the `KeyPairSigner` together with in-browser storage.

    ```js
    // Creates Signer using private key from local storage
    import { KeyPairSigner } from "@near-js/signers";
    import { BrowserLocalStorageKeyStore } from "@near-js/keystores-browser";

    const keyStore = new BrowserLocalStorageKeyStore();
    const key = await keyStore.getKey('testnet', 'user.testnet');
    const signer = new KeyPairSigner(key);
    ```

  </details>

  </TabItem>
  <TabItem value="dir" label="Credentials Path">

  For Node.js environments (CLI tools, backend services, etc) you can load signing keys from files using the `UnencryptedFileSystemKeyStore` that reads unencrypted `.json` key files stored in a directory on your local machine.

  ```js
  import { UnencryptedFileSystemKeyStore } from "@near-js/keystores-node";
  import { homedir } from "os";
  import path from "path";
  
  // Create Signer using private key from a folder on the local machine
  const credentialsDirectory = ".near-credentials";
  const credentialsPath = path.join(homedir(), credentialsDirectory);
  const keyStore = new UnencryptedFileSystemKeyStore(credentialsPath);
  const key = await keyStore.getKey('testnet', 'user.testnet');
  const signer = new KeyPairSigner(key);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keystore-options/credentials-directory.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="file" label="File">

  If you have a raw JSON file that includes a NEAR account’s private key — it can directly parsed to then construct a KeyPairSigner.

  ```js
  import { KeyPairSigner } from "@near-js/signers";
  import fs from "fs";
  
  // Create Signer using private key from a JSON file on the local machine
  const credentialsPath = "../credentials-file.json"; // Path relative to the working directory
  const credentials = JSON.parse(fs.readFileSync(credentialsPath));
  const signer = KeyPairSigner.fromSecretKey(credentials.private_key);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keystore-options/credentials-file.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="key" label="Private Key">

  It's common to load the NEAR private key from an environment variable or secret manager. With the new version of `KeyPairSigner`, you can create ir directly from a raw private key string.

  The private key must be in the format `"ed25519:xxxxx..."`

  ```js
  import { KeyPairSigner } from "@near-js/signers";
  
  // Create Signer using private key from a raw private key string
  const privateKey = "ed25519:1111222222....."; // put real key here
  const signer = KeyPairSigner.fromSecretKey(privateKey);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keystore-options/private-key-string.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="seed" label="Seed Phrase">

  If you're working wallet recovery flows, developer tooling, or onboarding flows where users input their phrasesm you can derive the corresponding secret key and use it for signing.

  To parse and derive a NEAR-compatible key pair from a seed phrase, you’ll need to install the near-seed-phrase package:
  ```bash
  npm i near-seed-phrase
  ```

  Seed phrases are typically 12 words long, and are in the format "show three gate bird ..."

  ```js
  import { KeyPairSigner } from "@near-js/signers";
  import { parseSeedPhrase } from "near-seed-phrase";
  
  // Create Signer using seed phrase
  const seedPhrase = "show three gate bird ..."; // 12 words long
  const { secretKey } = parseSeedPhrase(seedPhrase);
  const signer = KeyPairSigner.fromSecretKey(secretKey);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keystore-options/seed-phrase.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  </Tabs>
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  To sign transactions you'll need to create a `Signer` that holds a valid keypair.

  <Tabs>
  <TabItem value="keystore" label="Keystore" default>

  Signers can be created using the Keystore that is also used as the standard for saving keys with the NEAR CLI.

  <Github fname="keystore.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/signer_options/keystore.rs#L12-L18"
    start="12" end="18" />

  </TabItem>
  <TabItem value="dir" label="Credentials Path">

  Signers can be created using the credentials directory which is the legacy option for saving keys with the NEAR CLI.

  <Github fname="credentials_directory.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/signer_options/credentials_directory.rs#L10-L13"
    start="10" end="13" />

  </TabItem>
  <TabItem value="file" label="File">

  Signers can be created by loading a public and private key from a file.

  <Github fname="credentials_file.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/signer_options/credentials_file.rs#L12-L13"
    start="12" end="13" />

  </TabItem>
  <TabItem value="key" label="Private Key">

  Signers can be created by using a private key string.

  Private keys have the format `ed25519:5Fg2...`.

  <Github fname="private_key_string.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/signer_options/private_key_string.rs#L13-L14"
    start="13" end="14" />

  </TabItem>
  <TabItem value="seed" label="Seed Phrase">

  Signers can be created by using a seed phrase.

  Seed phrases have the format `shoe three gate ...` and are usually 12 words long.

  <Github fname="seed_phrase.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/signer_options/seed_phrase.rs#L11-L12"
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

  RPC endpoints can occasionally become unreliable due to network issues, server downtime, or rate limiting - leading to failed requests or dropped transactions. To make your application more resilient, you can define multiple RPC endpoints and automatically fall back to the next available one when an issue occurs.

  <Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  You can pass multiple individual `Provider` instances into the `FailoverRpcProvider` to improve the reliability of your application's connection.

  It’s also important to note that each `Provider` can internally use different transport protocols (such as HTTPS or WebSocket), making the failover strategy flexible across various infrastructure setups.

  ```js
  import { JsonRpcProvider, FailoverRpcProvider } from "@near-js/providers";
  
  const jsonProviders = [
    new JsonRpcProvider({ url: "https://incorrect-rpc-url.com" }), // Incorrect RPC URL
    new JsonRpcProvider(
      { url: "https://test.rpc.fastnear.com" }, // Valid RPC URL
      {
        retries: 3, // Number of retries before giving up on a request
        backoff: 2, // Backoff factor for the retry delay
        wait: 500, // Wait time between retries in milliseconds
      } // Retry options
    ),
  ];

  const provider = new FailoverRpcProvider(jsonProviders);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/rpc-failover.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

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

  You can create an `Account` instance using the code below. At a minimum, it requires a `Provider` to fetch data from the blockchain. If you also want to perform actions on behalf of the account (such as sending tokens, signing transactions, or managing keys) - you’ll need to pass a `Signer` as well. See the [section above](#key-handlers-stores--signers) on how to create one using a private key, seed phrase, or JSON file.

  <Github fname="account-details.js" language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/account-details.js"
    start="1" end="13"/>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="account_details.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/account_details.rs#L5-L7"
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

  Once you've [created an `Account` instance](#instantiate-account), you can use it to query the balance of a token in its smallest unit — whether it's the native NEAR token or any other fungible token (FT). Let's start by checking the balance of NEAR.

  :::info Pro Tip
  If you need to display the balance in a human-readable format, each `Token` instance provides a `toDecimal` method that you can use to convert raw values to their standard decimal representation.
  :::

  ```js
  import { NEAR } from "@near-js/tokens";

  const account = new Account("user.testnet", provider);

  // returns yoctoNear amount as bigint
  const amount = await account.getBalance(NEAR);
  // converts to human-readable string like "1.234"
  NEAR.toDecimal(amount);
  ```

  For commonly used tokens like USDT or USDC, you can access pre-configured token definitions from the either `@near-js/tokens/testnet`, or `@near-js/tokens/mainnet` package, depending on the network. These built-in tokens make it easy to fetch balances without additional setup.

  ```js
  import { USDT } from "@near-js/tokens/testnet";
  // import { USDT } from "@near-js/tokens/mainnet";

  const account = new Account("user.testnet", provider);

  // returns units as bigint
  const amount = await account.getBalance(USDT);
  // converts to human-readable string like "1.234"
  USDT.toDecimal(amount);
  ```

  If your token isn’t included in the provided collections, no problem—you can manually create a `Token` instance for any fungible token contract by following the example below.

  ```js
  import { FungibleToken } from "@near-js/tokens";

  const account = new Account("user.testnet", provider);

  const REF = new FungibleToken("ref.fakes.testnet", {
    decimals: 18,
    symbol: "REF",
  });

  // returns units as bigint
  const amount = await account.getBalance(REF);
  // converts to human-readable string like "1.234"
  REF.toDecimal(amount);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/tokens-balance.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="account_details.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/account_details.rs#L13-L18"
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

  Once you've [created an `Account` instance](#instantiate-account), you can use it to query basic on-chain information about the account, such as its code hash and current storage usage.

  ```js
  const account = new Account("user.testnet", provider);

  await account.getState();
  ```

  While the `Account` class represents a wallet on-chain, some use cases, like simply reading account state or contract data — do not require full account access. In those cases, you can skip creating an `Account` and use the `Provider` directly, as shown below.

  ```js
  await provider.viewAccount("user.testnet");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/account-details.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  <Github fname="account_details.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/account_details.rs#L21-L21"
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

### Create Named Account {#create-named-account}

To create a named account like `user.testnet`, you need to call the `create_account` function on a [top-level account’s contract](https://github.com/near/near-linkdrop) — that’s `testnet` on testnet or `near` on mainnet. Yes, on NEAR, every account can have a contract deployed to it, even top-level ones.

Keep in mind that creating a named account requires a small amount of NEAR to cover Gas fees.

When creating a new account, you’ll need to provide:
- A public key, which will be added to the account as [FullAccess key](/protocol/access-keys#full-access-keys)
- An optional initial balance in NEAR (this can be zero if you don’t want to fund it right away)

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can create any available named account (as long as it's not already taken). To do this, the creator account must include a `Signer`, since signing a transaction is required. If you're not sure how to set that up, check [the section above](#key-handlers-stores--signers) on how to connect a signer.

  ```js
  const account = new Account("user.testnet", provider, signer);

  // generate a keypair randomly
  const keyPair = KeyPair.fromRandom("ed25519");
  await account.createAccount(
    "another_user.testnet",
    keyPair.getPublicKey(),
    // attaches 1.234 NEAR tokens that will become
    // an initial balance of "another_user.testnet"
    NEAR.toUnits("1.234")
  );
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/create-tla.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  In some cases, you might need to create an account using a seed phrase. Here’s how you can do that:

  ```js
  import { generateSeedPhrase } from "near-seed-phrase";

  const account = new Account("user.testnet", provider, signer);

  // get public key from a randomly generated seed phrase
  const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();

  await account.createAccount(
    "another_user.testnet",
    publicKey,
    // attaches 1.234 NEAR tokens that will become
    // an initial balance of "another_user.testnet"
    NEAR.toUnits("1.234")
  );
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/create-account-from-seed.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="create_account.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/create_account.rs#L32-L47"
    start="32" end="47" />

  <details>
    <summary>Creating an account from a seed phrase</summary>

    You can also create an account via a randomly generated seed phrase.

    <Github fname="create_account_from_seed.rs" language="rust"
      url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/create_account_from_seed.rs#L32-L48"
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

### Create Sub-Account {#create-sub-account}

Accounts on NEAR can create sub-accounts under their own namespace, which is useful for organizing accounts by purpose — for example, `project.user.testnet`.

:::warning
The parent account **DOES NOT** have any control over its sub-accounts once they are created.
:::

Keep in mind that creating a sub-account requires a small amount of NEAR to cover Gas fees.

To create a sub-account, the parent must send a transaction to itself with the [`CreateAccount` action](/protocol/transaction-anatomy#actions). Just like when creating named accounts, you'll need to provide a public key that will be assigned to the new sub-account, along with an optional initial deposit to fund it (can be zero).

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can create any sub-account (as long as it hasn't been created previously). To do this, the creator account must include a `Signer`, since signing a transaction is required. If you're not sure how to set that up, check [the section above](#key-handlers-stores--signers) on how to connect a signer.

  ```js
  const account = new Account("user.testnet", provider, signer);

  // generate a keypair randomly
  const keyPair = KeyPair.fromRandom("ed25519");
  await account.createAccount(
    "project.user.testnet",
    keyPair.getPublicKey(),
    // attaches 1.234 NEAR tokens that will become
    // an initial balance of "project.user.testnet"
    NEAR.toUnits("1.234")
  );
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/create-subaccount.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="create_account.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/create_account.rs#L61-L82"
    start="61" end="82" />

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

An account on NEAR can only delete itself — it **CANNOT** delete other accounts or its sub-accounts.

To delete an account, it must send a transaction to itself with the [`DeleteAccount` action](/protocol/transaction-anatomy#actions), including a required parameter called `beneficiary_id`. This is the account that will receive any remaining NEAR tokens.

:::info
Deleting an account **DOES NOT** affect its sub-accounts - they will remain active.
:::

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = new Account("user.testnet", provider, signer);

  // account "user.testnet" gets deleted
  // and remaining funds will go to account "beneficiary.testnet" (if it exists)
  await account.deleteAccount("beneficiary.testnet");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/delete-account.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="delete_account.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/delete_account.rs#L51-L59"
    start="51" end="59" />

  </TabItem>
</Tabs>

:::danger Keep in mind
- Only NEAR tokens are transferred to the beneficiary.
- Fungible (FTs) or Non-Fungible tokens (NFTs) held by the account **ARE NOT** automatically transferred. These tokens are still associated with the account, even after the account is deleted. Make sure to transfer those assets manually before deletion, or you're risking losing them permanently! Once the account is gone, those assets are effectively stuck unless the same account is recreated by anyone (not necessarily you).
- If the beneficiary account doesn't exist, all NEAR tokens sent to it will be burned. Double-check the account ID before proceeding.
:::

---

## Transactions

### Send Tokens {#send-tokens}

Accounts can transfer different types of tokens to other accounts, including the native NEAR token and [NEP-141](https://github.com/near/NEPs/tree/master/neps/nep-0141.md) fungible tokens.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  To begin with, you’ll need the `@near-js/tokens` package, which provides the necessary utilities.
  
  Once you've [created an `Account` instance](#instantiate-account), you can transfer tokens to others. Let’s start by looking at how to transfer native `NEAR` tokens.

  ```js
  import { NEAR } from "@near-js/tokens";

  const account = new Account("user.testnet", provider, signer);

  // transfer 0.1 NEAR tokens to receiver.testnet
  await account.transfer({
    token: NEAR,
    amount: NEAR.toUnits("0.1"),
    receiverId: "receiver.testnet"
  });
  ```

  You can also use the same package to send fungible tokens (NEP-141) like USDT — many of the most common tokens are included out of the box and can be imported from `@near-js/tokens/testnet` or `@near-js/tokens/mainnet`, depending on the network you're using.

  :::warning
  Before receiving fungible tokens (NEP-141), the recipient must be registered on the token’s contract. If they aren’t, the transfer will fail.

  If your use case involves sending tokens to users, you have two options:

  - Cover the storage cost and register them yourself
  - Ask the user to register in advance

  Good news - *if the account is already registered, any repeated registration attempt will automatically refund the storage deposit — so you’ll never pay it twice*.
  :::

  ```js
  import { USDT } from "@near-js/tokens/testnet";

  const account = new Account("user.testnet", provider, signer);

  // double-check that a recipient is registered
  await USDT.registerAccount({
    accountIdToRegister: "receiver.testnet",
    fundingAccount: account,
  })

  // transfer 1.23 USDT to receiver.testnet
  await account.transfer({
    token: USDT,
    amount: USDT.toUnits("1.23"),
    receiverId: "receiver.testnet"
  });
  ```

  For more advanced use cases, such as working with custom or less common tokens, you can create your own instance of the `FungibleToken` class by passing the appropriate parameters. The example below demonstrates this using the `REF` token.

  ```js
  import { FungibleToken } from "@near-js/tokens/testnet";

  const account = new Account("user.testnet", provider, signer);

  const REF = new FungibleToken("ref.fakes.testnet", {
    decimals: 18,
    symbol: "REF",
  });

  // double-check that a recipient is registered
  await REF.registerAccount({
    accountIdToRegister: "receiver.testnet",
    fundingAccount: account,
  })

  // transfer 2.34 REF to receiver.testnet
  await account.transfer({
    token: REF,
    amount: REF.toUnits("2.34"),
    receiverId: "receiver.testnet"
  });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/send-tokens.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/send_tokens.rs#L22-L28"
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

A smart contract exposes its methods, and making a function call that modifies state requires a `Signer`/`KeyPair`. You can optionally attach a `NEAR` deposit to the call.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can start interacting with smart contracts.

  The most convenient way to interact with contracts is the `TypedContract` class. It provides full type safety for method names, arguments, and return values, especially when used together with an ABI.

  For example, lets say there is a [Guestbook](https://github.com/near-examples/guest-book-examples) contract deployed at `guestbook.near-examples.testnet`, and you want to add a message to it. To do that, you’d call its `add_message` method.

  ```js
  import { NEAR } from "@near-js/tokens";
  import { TypedContract, AbiRoot } from "@near-js/accounts";

  // "as const satisfies AbiRoot" is necessary for TypeScript to infer ABI types
  const guestbookAbi = {...} as const satisfies AbiRoot;

  const account = new Account("user.testnet", provider, signer);
  const contract = new TypedContract({
    contractId: "guestbook.near-examples.testnet",
    provider,
    abi: guestbookAbi,
  });

  await contract.call.add_message({
    account: account, // Account must have Signer to sign tx
    args: {
      text: "Hello, world!"
    },
    deposit: NEAR.toUnits("0.0001"), // optional
    gas: BigInt("30000000000000") // 30 TGas, optional
  });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/typed-contract-interaction.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  In this function call, we’ve attached a small deposit of 0.001 NEAR to [cover the storage cost](/protocol/storage/storage-staking) of adding the message.

  We’ve also [attached 30 TGas](/protocol/gas) to limit the amount of computational resources the method can consume.

  <details>
    <summary>What if I don't have ABI?</summary>

    If no ABI was provided, `TypedContract` would still work, though return types by default would be `unknown`, which you could override with generics as in the example below:

    ```js
    type Message = { sender: string; text: string; premium: boolean };
    const messages = await contract.view.get_messages<Message[]>();
    //      ^? { sender: string; text: string; premium: boolean }[]
    ```

  </details>

  ----------------------

  You can also call contract methods directly using the `Account` class. This approach is supported, but not recommended anymore, because it doesn’t provide compile-time safety for method names or arguments. The main benefit of this style is that it is quick to set up.

  ```js
  import { NEAR } from "@near-js/tokens";

  const account = new Account("user.testnet", provider, signer);

  await account.callFunction({
    contractId: "guestbook.near-examples.testnet",
    methodName: "add_message",
    args: { text: "Hello, world!" },
    deposit: NEAR.toUnits('0.001'), // 0.001 NEAR
    gas: "30000000000000" // 30 TGas
  });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/contract-interaction.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L23-L24"
    start="23" end="24" />

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L37-L49"
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

You can send multiple [actions](../protocol/transaction-anatomy.md#actions) in a batch to a **single** receiver. If one action fails then the entire batch of actions will be reverted.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can start sending transactions.

  Let’s take a look at an example of a batched transaction that performs multiple actions in a single call - it increments a counter on a smart contract `counter.near-examples.testnet` twice, then transfers 0.1 NEAR tokens to this address.

  Each function call to increment the counter has [10 TGas attached](/protocol/gas), which is enough for a lightweight state update.
  No deposit is included with these calls, since they don’t store new data — just update existing values.
  
  ```js
  import { NEAR } from "@near-js/tokens";

  const account = new Account("user.testnet", provider, signer);

  await account.signAndSendTransaction({
    receiverId: "counter.near-examples.testnet",
    actions: [
      actionCreators.functionCall(
        "increment",
        {},
        "10000000000000", // 10 TGas
        0 // 0 NEAR
      ),
      actionCreators.functionCall(
        "increment",
        {},
        "10000000000000", // 10 TGas
        0 // 0 NEAR
      ),
      actionCreators.transfer(NEAR.toUnits("0.1"))
    ],
  });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/batch-actions.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="batch_actions.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/batch_actions.rs#L22-L42"
    start="22" end="42" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Simultaneous Transactions

While many other blockchains don’t support truly parallel transactions due to nonce collisions, NEAR takes a different approach. It supports [access keys](/protocol/access-keys), and each key maintains its own independent nonce.

This means you can add multiple keys to an account and use them to sign and send transactions concurrently, without running into nonce conflicts. It’s a powerful feature for parallel execution and high-throughput use cases.

:::warning Keep in mind
Simultaneous execution means there’s no guarantee of order or success. Any transaction may fail independently.

If your use case requires strict ordering or depends on all actions succeeding together, consider using [cross-contract calls](/tutorials/examples/xcc) instead. They allow you to chain calls with guarantees around execution flow and error handling.
:::

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can start by generating [two new key pairs](/protocol/access-keys) and adding them to the account. In our example, we’re using Full Access keys, but that’s not a requirement — Function Call access keys can work just as well, depending on your use case.

  If you already have the keys prepared, feel free to skip this step. We're including it here to show the full setup for learning purposes.

  :::note
  Notice that we’re adding both keys in a batched transaction. Learn more about it [here](#batch-actions).
  :::

  ```js
  const account = new Account("user.testnet", provider, signer);

  const keyPairOne = KeyPair.fromRandom("ed25519");
  const keyPairTwo = KeyPair.fromRandom("ed25519");

  // add two keys in a single transaction
  await account.signAndSendTransaction({
    receiverId: account.accountId,
    actions: [
      actionCreators.addKey(
        keyPairOne.getPublicKey(),
        actionCreators.fullAccessKey()
      ),
      actionCreators.addKey(
        keyPairTwo.getPublicKey(),
        actionCreators.fullAccessKey()
      ),
    ],
    waitUntil: "FINAL",
  });
  ```

  Now that we’ve created two separate keys, we need to create corresponding `Account` instances for each one. These will be used to build and send different transactions independently.

  One of the transactions adds a message to the [Guestbook](https://github.com/near-examples/guest-book-examples) contract, while the other increments a counter on a different contract.

  ```js
  const accountOne = new Account(
    accountId,
    provider,
    new KeyPairSigner(keyPairOne)
  );
  const accountTwo = new Account(
    accountId,
    provider,
    new KeyPairSigner(keyPairTwo)
  );

  const signedTxOne = await accountOne.createSignedTransaction(
    "guestbook.near-examples.testnet",
    [
      actionCreators.functionCall(
        "add_message",
        { text: "Hello, world!" },
        "30000000000000", // 30 TGas
        NEAR.toUnits("0.001") // 0.001 NEAR
      ),
    ]
  );
  const signedTxTwo = await accountTwo.createSignedTransaction(
    "counter.near-examples.testnet",
    [
      actionCreators.functionCall(
        "increment",
        {},
        "10000000000000", // 10 TGas
        0 // 0 NEAR
      ),
    ]
  );
  ```

  The last step is to broadcast both transactions concurrently to the network using the `Provider`.

  ```js
  const sendTxOne = provider.sendTransaction(signedTxOne);
  const sendTxTwo = provider.sendTransaction(signedTxTwo);

  const transactionsResults = await Promise.all([sendTxOne, sendTxTwo]);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/simultaneous-transactions.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="simultaneous_transactions.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/simultaneous_transactions.rs#L23-L55"
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

On NEAR, a smart contract is deployed as a WASM file. Every account has the potential to become a contract — you simply need to deploy code to it.

:::note
Unlike many other blockchains, contracts on NEAR are mutable, meaning you have the ability to redeploy updated versions to the same account. However, if you remove all access keys from the account, it becomes impossible to sign new deploy transactions, effectively locking the contract code permanently.
:::

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can deploy a smart contract to it.

  Let's read a `.wasm` file from your local machine and deploy its content directly to the account.

  ```js
  import { readFileSync } from "fs";

  const account = new Account("user.testnet", provider, signer);

  const wasm = readFileSync("../contracts/contract.wasm");
  await account.deployContract(wasm);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-contract.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  Note that the `signer` here needs to be a signer for the same `account_id` as the one used to construct the `Contract` object.

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L54-L61"
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

<hr class="subsection" />

### Deploy a Global Contract {#deploy-a-global-contract}

[Global contracts](../smart-contracts/global-contracts.md) allow smart contracts to be deployed once and reused by any account without incurring high storage costs.

There are two ways to reference a global contract:
- **[By account](../smart-contracts/global-contracts.md#reference-by-account):** The contract code is tied to another account.
- **[By hash](../smart-contracts/global-contracts.md#reference-by-hash):** You reference the contract by its immutable code hash.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've created an Account instance, you can deploy your regular contract as a global contract.

  <Tabs>
  <TabItem value="account" label="By Account" default>

  Let’s look at an example of deploying a global contract by account.
  
  To do this, use the `deployGlobalContract` function and set the mode to `accountId`, along with the contract’s code bytes.
  
  ```js
  import { readFileSync } from "fs";

  const account = new Account("user.testnet", provider, signer);

  const wasm = readFileSync("../contracts/contract.wasm");
  await account.deployGlobalContract(wasm, "accountId");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-account.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  Let’s look at an example of deploying a global contract by hash.
  
  To do this, use the `deployGlobalContract` function and set the mode to `codeHash`, along with the contract’s code bytes.
  
  ```js
  import { readFileSync } from "fs";

  const account = new Account("user.testnet", provider, signer);

  const wasm = readFileSync("../contracts/contract.wasm");
  await account.deployGlobalContract(wasm, "codeHash");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-hash.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  Once you've created an Account instance, you can deploy your regular contract as a global contract.

  <Tabs>
  <TabItem value="account" label="By Account" default>

  Let’s look at an example of deploying a global contract by account.
  
  To do this, use the `deploy_global_contract_code` function and use the method `as_account_id`, along with the contract’s code bytes.
  
  ```rust
    let global_account_id: AccountId = "nft-contract.testnet".parse().unwrap();
    let code = std::fs::read("path/to/your/contract.wasm").unwrap();
    let signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy_global_contract_code(code)
        .as_account_id(global_account_id)
        .with_signer(signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_accountid.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  Let’s look at an example of deploying a global contract by hash.
  
  To do this, use the `deploy_global_contract_code` function and use the method `as_hash`, along with the contract’s code bytes.
  
  ```rust
    let account_id: AccountId = "my-account.testnet".parse().unwrap();
    let code = std::fs::read("path/to/your/contract.wasm").unwrap();
    let signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy_global_contract_code(code)
        .as_hash()
        .with_signer(account_id, signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_hash.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

</Tabs>

### Use a Global Contract

Once a [global contract](../smart-contracts/global-contracts.md) has been [deployed](#deploy-a-global-contract), let’s see how you can reference and use it from another account.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  <Tabs>
  <TabItem value="account" label="By Account" default>

  To reference a global contract by account, you need to call the `useGlobalContract` function and pass the source `accountId` where the contract was originally deployed.

  ```js
  const account = new Account("another_user.testnet", provider, signer);

  await account.useGlobalContract({ accountId: "user.testnet" });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-account.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  To reference a global contract by hash, you need to call the `useGlobalContract` function and pass the source `codeHash` of the original contract.

  ```js
  const account = new Account("another_user.testnet", provider, signer);

  await account.useGlobalContract({
    codeHash: "36b15ea09f737220583f63ad120d91b7e233d2039bebea43be527f8fd85450c9",
  });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-hash.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  <Tabs>
  <TabItem value="account" label="By Account" default>

  To reference a global contract by account, you need to call the `use_global_account_id` function and pass the source `accountId` where the contract was originally deployed.

  ```rust
    let global_account_id: AccountId = "nft-contract.testnet".parse().unwrap();
    let my_account_id: AccountId = "my-contract.testnet".parse().unwrap();
    let my_signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy(my_account_id)
        .use_global_account_id(global_account_id)
        .without_init_call()
        .with_signer(my_signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_accountid.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  To reference a global contract by hash, you need to call the `use_global_hash` function and pass the source `hash` of the original contract.

  ```rust
    let global_hash: types::CryptoHash = "DxfRbrjT3QPmoANMDYTR6iXPGJr7xRUyDnQhcAWjcoFF".parse().unwrap();
    let account_id: AccountId = "my-contract.testnet".parse().unwrap();
    let signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy(account_id)
        .use_global_hash(global_hash)
        .without_init_call()
        .with_signer(signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_hash.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

</Tabs>

---

## View Function

View functions are read-only methods on a smart contract that do not modify state. You can call them without needing a `Signer` or `KeyPair`, and there’s no need to attach gas or a deposit.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Let’s look at an example using the [Guestbook](https://github.com/near-examples/guest-book-examples) contract to read how many messages are currently stored.

  ```js
  import { JsonRpcProvider } from "@near-js/providers";

  const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" });

  await provider.callFunction(
    "guestbook.near-examples.testnet",
    "total_messages",
    {}
  );
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/contract-interaction.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L22-L33"
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

  Let’s walk through an example of how to query the list of access keys associated with an account.

  ```js
  import { JsonRpcProvider } from "@near-js/providers";

  const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" });

  await provider.viewAccessKeyList("user.testnet");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keys.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L22-L22"
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

Each account on NEAR can have multiple access keys, each with different permissions.

A [Full Access key](/protocol/access-keys.md#full-access-keys), as the name suggests, grants complete control over the account. Anyone with this key can transfer funds, sign transactions, interact with contracts, or even delete the account entirely.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can add another Full Access key to it.

  Simply generate a new key pair, then use the method below to add it to the account.

  ```js
  import { KeyPair } from "@near-js/crypto";

  const account = new Account("user.testnet", provider, signer);

  const keyPair = KeyPair.fromRandom("ed25519");

  await account.addFullAccessKey(
    keyPair.getPublicKey()
  );
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keys.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L25-L37"
    start="25" end="37" />

  </TabItem>
  <TabItem value="python" label="🐍 Python">

  ```python
  keys = await account.add_full_access_public_key("5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj")
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Add Function Call Key {#add-function-call-key}

Each account on NEAR can have multiple access keys, each with different permissions.

A [Function Call access key](/protocol/access-keys.md#function-call-keys) is designed specifically to sign transactions that include only [`functionCall` actions](/protocol/transaction-anatomy#actions) to a specific contract.

You can further restrict this key by:
- Limiting which method names can be called
- Capping the amount of `NEAR` the key can spend on transaction fees

:::warning
For security reasons, Function Call access keys **can only be used with function calls that attach zero `NEAR` tokens. Any attempt to include a deposit will result in a failed transaction.
:::

:::tip
One of the most powerful use cases for this type of key is enabling seamless user experiences — such as allowing a user to sign actions in a browser game without being redirected to a wallet for every interaction.
:::

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can add a Functional Access key to it.

  Simply generate a new key pair, then use the method below to add it to the account.

  ```js
  import { KeyPair } from "@near-js/crypto";
  import { NEAR } from "@near-js/tokens";

  const account = new Account("user.testnet", provider, signer);

  const keyPair = KeyPair.fromRandom("ed25519");

  await account.addFunctionCallAccessKey({
      publicKey: keyPair.getPublicKey(),
      contractId: "example-contract.testnet", // Contract this key is allowed to call
      methodNames: ["example_method"], // Methods this key is allowed to call (optional)
      allowance: NEAR.toUnits("0.25") // Gas allowance key can use to call methods (optional)
    }
  );
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keys.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L38-L56"
    start="38" end="56" />

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

Each account on Near can have multiple access keys, or even none at all. An account has the ability to remove its own keys, but not the keys of any other account, including its sub-accounts.

:::danger
Be very careful when deleting keys. If you remove the same key used to sign the deletion, and it’s your only key, you will lose access to the account permanently. There’s no recovery unless another key was previously added. Always double-check before removing your access key.
:::

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  Once you've [created an `Account` instance](#instantiate-account), you can delete a key from it by simply providing the public key of the key pair you want to remove.

  ```js
  const account = new Account("user.testnet", provider, signer);
  
  const publicKey = "ed25519:xxxxxxxx";
  await account.deleteKey(publicKey);
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/keys.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L57-L72"
    start="57" end="72" />

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
      url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/verify-signature.js" />

  </TabItem>
</Tabs>

---


## Utilities

### NEAR to yoctoNEAR {#near-to-yoctonear}

Convert an amount in NEAR to an amount in yoctoNEAR.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  The `@near-js/tokens` package provides ready-to-use instances of common tokens, making it easy to format and convert token amounts.

  Let’s import the `NEAR` token and see how effortlessly you can convert a human-readable amount into `yoctoNEAR` units.

  ```js
  import { NEAR } from "@near-js/tokens";

  // outputs as BigInt(100000000000000000000000)
  NEAR.toUnits("0.1");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/utils.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  <Github fname="utils.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/utils.rs#L7"
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

  The `@near-js/tokens` package provides ready-to-use instances of common tokens, making it easy to format and convert token amounts.

  Let’s import the `NEAR` token and see how easily you can convert values from `yoctoNEAR` back to a human-readable decimal amount.

  ```js
  import { NEAR } from "@near-js/tokens";

  // outputs as "1.23"
  NEAR.toDecimal("1230000000000000000000000");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/utils.js" class="text-center" target="_blank" rel="noreferrer noopener">
    See full example on GitHub
  </a>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  Format an amount of NEAR into a string of NEAR or yoctoNEAR depending on the amount.

  <Github fname="utils.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/utils.rs#L32"
    start="32" end="32" />

  </TabItem>
</Tabs>

---

## Additional resources

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  - [Documentation](https://near.github.io/near-api-js)
  - [Github](https://github.com/near/near-api-js)
  - [Full Examples](https://github.com/near-examples/near-api-examples/tree/main)
  - [Cookbook](https://github.com/near/near-api-js/tree/master/packages/cookbook) which contains examples using the near-js/client package, a wrapper tree shakable package for near-api-js.

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  - [Documentation](https://docs.rs/near-api/latest/near_api/)
  - [Github](https://github.com/near/near-api-rs)
  - [Full Examples](https://github.com/near-examples/near-api-examples/tree/main/rust)

  </TabItem>
  <TabItem value="python" label="🐍 Python">

    - [Phone number transfer](https://py-near.readthedocs.io/en/latest/clients/phone.html)

  </TabItem>
</Tabs>
