---
id: near-api
title: NEAR API
sidebar_label: NEAR API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The NEAR API is a set of libraries that allow you to interact with the NEAR blockchain. You can use it to create accounts, send tokens, deploy contracts, and more. 

The API is available in multiple languages, including:
- JavaScript: [`near-api-js`](https://github.com/near/near-api-js)
- Rust: [`near-jsonrpc-client`](https://github.com/near/near-jsonrpc-client-rs)
- Python: [`py-near`](https://github.com/pvolnov/py-near)

For example, you could use [`near-api-js`](https://github.com/near/near-api-js) to create web applications or backend services written in node.js servers.

:::tip Wallet Integration
To allow users to login into your web application using a wallet you will need the `wallet-selector`. Read more in our [Web Frontend integration](/build/web3-apps/integrate-contracts) article
:::

---

## Install

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  Include `near-api-js` as a dependency in your package.

  ```bash
  npm i --save near-api-js
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
  cargo add near-jsonrpc-client
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Import {#import}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  You can use the API library in the browser, or in Node.js runtime. Some features are available only in one of the environments. For example, the `WalletConnection` is only for the browser, and there are different `KeyStore` providers for each environment.

  ```js
  import * as nearAPI from "near-api-js";
  ```
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  Each one of the valid JSON RPC methods are defined in the methods module.
  ```rust
  use near_jsonrpc_client::methods;
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Connecting to NEAR {#connect}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  The object returned from `connect` is your entry-point for all commands in the API.
  To sign a transaction you'll need a [`KeyStore`](#key-store) to create a connection.

  ```js
  const { connect } = nearAPI;

  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };
  const nearConnection = await connect(connectionConfig);
  ```

  <details>
    <summary>Mainnet/Localnet connection</summary>

    ```js
    // Mainnet config example
    const connectionConfig = {
      networkId: "mainnet",
      keyStore: myKeyStore, // first create a key store
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://nearblocks.io",
    };

    // Localnet config example
    const connectionConfig = {
      networkId: "local",
      nodeUrl: "http://localhost:3030",
      walletUrl: "http://localhost:4000/wallet",
    };
    ```
  </details>

  <hr class="subsection" />

  #### Key Store

  If you sign transactions, you need to create a _Key Store_. In the browser, the LocalStorage KeyStore will be used once you ask your user to Sign In with the Wallet.

  <Tabs>
  <TabItem value="browser" label="Using Browser" default>

  ```js
  // creates keyStore using private key in local storage

  const { keyStores } = nearAPI;
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  ```

  </TabItem>
  <TabItem value="dir" label="Using Credentials Directory">

  ```js
  // creates a keyStore that searches for keys in .near-credentials
  // requires credentials stored locally by using a NEAR-CLI command: `near login`
  // https://docs.near.org/tools/cli#near-login

  const { keyStores } = nearAPI;
  const homedir = require("os").homedir();
  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
  const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  ```

  </TabItem>
  <TabItem value="file" label="Using a File">

  ```js
  // creates keyStore from a provided file
  // you will need to pass the location of the .json key pair

  const { KeyPair, keyStores } = require("near-api-js");
  const fs = require("fs");
  const homedir = require("os").homedir();

  const ACCOUNT_ID = "near-example.testnet"; // NEAR account tied to the keyPair
  const NETWORK_ID = "testnet";
  // path to your custom keyPair location (ex. function access key for example account)
  const KEY_PATH = "/.near-credentials/near-example-testnet/get_token_price.json";

  const credentials = JSON.parse(fs.readFileSync(homedir + KEY_PATH));
  const myKeyStore = new keyStores.InMemoryKeyStore();
  myKeyStore.setKey(
    NETWORK_ID,
    ACCOUNT_ID,
    KeyPair.fromString(credentials.private_key)
  );
  ```

  </TabItem>
  <TabItem value="key" label="Using a private key string">

  ```js
  // creates keyStore from a private key string
  // you can define your key here or use an environment variable

  const { keyStores, KeyPair } = nearAPI;
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY =
    "by8kdJoJHu7uUkKfoaLd2J2Dp1q1TigeWMG123pHdu9UREqPcshCM223kWadm";
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  // adds the keyPair you created to keyStore
  await myKeyStore.setKey("testnet", "example-account.testnet", keyPair);
  ```

  </TabItem>
  </Tabs>

  <details>
    <summary>Window error using `Node.js`</summary>
    
    You're maybe using a KeyStore that's for the browser. Instead, use a [filesystem key](/tools/near-api-js/quick-reference#key-store) or private key string.

    **Browser KeyStore:**

    ```js
    const { keyStores } = require("near-api-js");
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    ```

    **FileSystem KeyStore:**

    ```js
    const { keyStores } = require("near-api-js");
    const KEY_PATH = "~./near-credentials/testnet/example-account.json";
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);
    ```
  </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```rust
  use near_jsonrpc_client::JsonRpcClient;

  let testnet_client = JsonRpcClient::connect("https://rpc.testnet.near.org");
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### RPC Failover

RPC providers can experience intermittent downtime, connectivity issues, or rate limits that cause client transactions to fail. This can be prevented by using the `FailoverRpcProvider` that supports multiple RPC providers.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const jsonProviders = [
    new JsonRpcProvider({
      url: 'https://rpc.mainnet.near.org',
    }),
    new JsonRpcProvider(
      {
        url: 'https://another-rpc.cloud.com',
        headers: { 'X-Api-Key': 'some string' },
      },
      { retries: 3, backoff: 2, wait: 500 }
    ),
  ];
  const provider = new FailoverRpcProvider(jsonProviders);

  await connect({
    networkId: 'mainnet',
    provider: provider,
    // this isn't used if `provider` is specified, but is still required for backward compatibility
    nodeUrl: 'https://rpc.mainnet.near.org',
  });
  ```

  </TabItem>
</Tabs>

---

## Account

### Instantiate Account {#instantiate-account}

This will return an Account object for you to interact with.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("example-account.testnet");
  ```

  </TabItem>
</Tabs>

:::warning
In order to be able to use the account, its credentials must be stored in the [key store](#key-store)
:::

<hr class="subsection" />

### Get Balance {#get-balance}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // gets account balance
  const account = await nearConnection.account("example-account.testnet");
  const accountBalance = await account.getAccountBalance();
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Get Details {#get-details}

Returns information about an account, such as authorized apps.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // gets account details in terms of authorized apps and transactions
  const account = await nearConnection.account("example-account.testnet");
  const accountDetails = await account.getAccountDetails();
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Get State {#get-state}

Get basic account information, such as amount of tokens the account has or the amount of storage it uses.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("example-account.testnet");
  const accountState = await account.state();
  ```
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```rust
  use near_jsonrpc_client::methods;
  use near_jsonrpc_primitives::types::query::QueryResponseKind;
  use near_primitives::types::{AccountId, BlockReference, Finality};
  use near_primitives::views::QueryRequest;

  mod utils;

  #[tokio::main]
  async fn main() -> Result<(), Box<dyn std::error::Error>> {
      env_logger::init();

      let client = utils::select_network()?;

      let account_id: AccountId = utils::input("Enter an Account ID to lookup: ")?.parse()?;

      let request = methods::query::RpcQueryRequest {
          block_reference: BlockReference::Finality(Finality::Final),
          request: QueryRequest::ViewAccount { account_id },
      };

      let response = client.call(request).await?;

      if let QueryResponseKind::ViewAccount(result) = response.kind {
          println!("{:#?}", result);
      }

      Ok(())
  }
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Create Sub-Account {#create-account}

Create a sub-account.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // creates a sub-account using funds from the account used to create it.
  const account = await nearConnection.account("example-account.testnet");
  await account.createAccount(
    "sub.example-account.testnet", // sub-account name
    "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for sub account
    "10000000000000000000" // initial balance for new account in yoctoNEAR
  );
  ```

  <details>
    <summary> Creating .near or .testnet accounts </summary>

    In order to create .near or .testnet accounts, you need to make a function call to the top-level-domain (i.e. `near` or `testnet`),  calling `create_account`:

    ```js
    return await creatorAccount.functionCall({
        contractId: "testnet",
        methodName: "create_account",
        args: {
        new_account_id: "new-account.testnet",
        new_public_key: "ed25519:2ASWccunZMBSygADWG2pXuHM6jWdnzLzWFU6r7wtaHYt",
        },
        gas: "300000000000000",
        attachedDeposit: utils.format.parseNearAmount(amount),
        });
    ```

  </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```rust
  //! Creates an account on the network.
  //!
  //! Creates either;
  //! - a top-level mainnet / testnet account
  //! - or a sub-account for any account on the network.
  //!
  //! top-level account example: `miraclx.near` creates `foobar.near`
  //! sub-account example: `miraclx.near` creates `test.miraclx.near`
  //!
  //! This script is interactive.

  use near_crypto::Signer;
  use near_jsonrpc_client::methods::broadcast_tx_commit::RpcTransactionError;
  use near_jsonrpc_client::{methods, JsonRpcClient};
  use near_jsonrpc_primitives::types::query::QueryResponseKind;
  use near_jsonrpc_primitives::types::transactions::TransactionInfo;
  use near_primitives::hash::CryptoHash;
  use near_primitives::transaction::{
      Action, AddKeyAction, CreateAccountAction, FunctionCallAction, Transaction, TransactionV0,
      TransferAction,
  };
  use near_primitives::types::{AccountId, BlockReference};
  use near_primitives::views::{FinalExecutionStatus, TxExecutionStatus};

  use serde_json::json;
  use tokio::time;

  mod utils;

  async fn account_exists(
      client: &JsonRpcClient,
      account_id: &AccountId,
  ) -> Result<bool, Box<dyn std::error::Error>> {
      let access_key_query_response = client
          .call(methods::query::RpcQueryRequest {
              block_reference: BlockReference::latest(),
              request: near_primitives::views::QueryRequest::ViewAccount {
                  account_id: account_id.clone(),
              },
          })
          .await;

      match access_key_query_response {
          Ok(_) => Ok(true),
          Err(near_jsonrpc_client::errors::JsonRpcError::ServerError(
              near_jsonrpc_client::errors::JsonRpcServerError::HandlerError(
                  near_jsonrpc_primitives::types::query::RpcQueryError::UnknownAccount { .. },
              ),
          )) => Ok(false),
          Err(res) => Err(res)?,
      }
  }

  async fn get_current_nonce(
      client: &JsonRpcClient,
      account_id: &AccountId,
      public_key: &near_crypto::PublicKey,
  ) -> Result<Option<(CryptoHash, u64)>, Box<dyn std::error::Error>> {
      let query_response = client
          .call(methods::query::RpcQueryRequest {
              block_reference: BlockReference::latest(),
              request: near_primitives::views::QueryRequest::ViewAccessKey {
                  account_id: account_id.clone(),
                  public_key: public_key.clone(),
              },
          })
          .await;

      match query_response {
          Ok(access_key_query_response) => match access_key_query_response.kind {
              QueryResponseKind::AccessKey(access_key) => Ok(Some((
                  access_key_query_response.block_hash,
                  access_key.nonce,
              ))),
              _ => Err("failed to extract current nonce")?,
          },
          Err(near_jsonrpc_client::errors::JsonRpcError::ServerError(
              near_jsonrpc_client::errors::JsonRpcServerError::HandlerError(
                  near_jsonrpc_primitives::types::query::RpcQueryError::UnknownAccessKey { .. },
              ),
          )) => Ok(None),
          Err(res) => Err(res)?,
      }
  }

  #[tokio::main]
  async fn main() -> Result<(), Box<dyn std::error::Error>> {
      env_logger::init();

      let client = utils::select_network()?;

      let signer_account_id = loop {
          let signer_account_id = utils::input("Enter the creators Account ID: ")?.parse()?;
          if account_exists(&client, &signer_account_id).await? {
              break signer_account_id;
          }
          println!("(i) This account doesn't exist, please reenter!");
      };

      let (signer, latest_hash, current_nonce) = loop {
          let signer_secret_key = utils::input("Enter the creators's private key: ")?.parse()?;

          let signer = near_crypto::InMemorySigner::from_secret_key(
              signer_account_id.clone(),
              signer_secret_key,
          );

          if let Some((latest_hash, current_nonce)) =
              get_current_nonce(&client, &signer.account_id, &signer.public_key).await?
          {
              break (signer, latest_hash, current_nonce);
          }
          println!("(i) Invalid access key, please reenter!");
      };

      let new_account_id = loop {
          let new_account_id = utils::input("What's the new Account ID: ")?.parse()?;
          if !account_exists(&client, &new_account_id).await? {
              break new_account_id;
          }
          println!("(i) This account already exists, please reenter!");
      };

      let initial_deposit = loop {
          let deposit: f64 =
              utils::input("How much do you want to fund this account with (in Ⓝ units)? ")?
                  .parse()?;
          if deposit >= 0.0 {
              break ((deposit * 1_000_000.0) as u128) * 1_000_000_000_000_000_000_u128;
          }
          println!("(i) Enter a non-zero deposit value!");
      };

      let is_sub_account = new_account_id.is_sub_account_of(&signer.account_id);
      let new_key_pair = near_crypto::SecretKey::from_random(near_crypto::KeyType::ED25519);

      let (transaction, expected_output) = if is_sub_account {
          (
              TransactionV0 {
                  signer_id: signer.account_id.clone(),
                  public_key: signer.public_key.clone(),
                  nonce: current_nonce + 1,
                  receiver_id: new_account_id.clone(),
                  block_hash: latest_hash,
                  actions: vec![
                      Action::CreateAccount(CreateAccountAction {}),
                      Action::AddKey(Box::new(AddKeyAction {
                          access_key: near_primitives::account::AccessKey {
                              nonce: 0,
                              permission: near_primitives::account::AccessKeyPermission::FullAccess,
                          },
                          public_key: new_key_pair.public_key(),
                      })),
                      Action::Transfer(TransferAction {
                          deposit: initial_deposit,
                      }),
                  ],
              },
              vec![],
          )
      } else {
          let contract_id = if client.server_addr().ends_with("testnet.near.org") {
              "testnet".parse()?
          } else if client.server_addr().ends_with("mainnet.near.org") {
              "near".parse()?
          } else {
              Err("can only create non-sub accounts for mainnet / testnet\nconsider creating a sub-account instead")?
          };
          (
              TransactionV0 {
                  signer_id: signer.account_id.clone(),
                  public_key: signer.public_key.clone(),
                  nonce: current_nonce + 1,
                  receiver_id: contract_id,
                  block_hash: latest_hash,
                  actions: vec![Action::FunctionCall(Box::new(FunctionCallAction {
                      method_name: "create_account".to_string(),
                      args: json!({
                          "new_account_id": new_account_id,
                          "new_public_key": new_key_pair.public_key(),
                      })
                      .to_string()
                      .into_bytes(),
                      gas: 300_000_000_000_000,
                      deposit: initial_deposit,
                  }))],
              },
              b"true".to_vec(),
          )
      };

      println!("=============================================================");
      println!("New Account ID: {}", new_account_id);
      println!("    Secret Key: {}", new_key_pair);
      println!("    Public Key: {}", new_key_pair.public_key());
      println!("       Deposit: {}", initial_deposit);
      println!("-------------------------------------------------------------");

      let request = methods::broadcast_tx_async::RpcBroadcastTxAsyncRequest {
          signed_transaction: Transaction::V0(transaction).sign(&Signer::InMemory(signer.clone())),
      };

      let sent_at = time::Instant::now();

      let tx_hash = client.call(request).await?;

      println!("       Tx Hash: {}", tx_hash);
      println!("=============================================================");

      loop {
          let response = client
              .call(methods::tx::RpcTransactionStatusRequest {
                  transaction_info: TransactionInfo::TransactionId {
                      tx_hash,
                      sender_account_id: signer.account_id.clone(),
                  },
                  wait_until: TxExecutionStatus::Final,
              })
              .await;
          let received_at = time::Instant::now();
          let delta = (received_at - sent_at).as_secs();

          if delta > 60 {
              Err("time limit exceeded for the transaction to be recognized")?;
          }

          match response {
              Ok(tx) => {
                  // it's fine to unwrap because we asked for finalized tx
                  let outcome = tx.final_execution_outcome.unwrap().into_outcome();
                  match outcome.status {
                      FinalExecutionStatus::Failure(err) => {
                          println!("{:#?}", err);
                          println!("(!) Creating the account failed, check above for full logs");
                          break;
                      }
                      FinalExecutionStatus::SuccessValue(ref s) => {
                          if s == &expected_output {
                              println!("(i) Account successfully created after {}s", delta);
                          } else {
                              println!("{:#?}", outcome);
                              println!("(!) Creating the account failed, check above for full logs");
                          }
                          break;
                      }
                      _ => {}
                  }
              }
              Err(err) => match err.handler_error() {
                  Some(
                      RpcTransactionError::TimeoutError
                      | RpcTransactionError::UnknownTransaction { .. },
                  ) => {
                      time::sleep(time::Duration::from_secs(2)).await;
                      continue;
                  }
                  _ => Err(err)?,
              },
          }
      }

      Ok(())
  }
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Delete Account {#delete-account}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // deletes account found in the `account` object
  // transfers remaining account balance to the accountId passed as an argument
  const account = await nearConnection.account("example-account.testnet");
  await account.deleteAccount("beneficiary-account.testnet");
  ```

  </TabItem>
</Tabs>

---

## Transactions

### Send Tokens {#send-tokens}

Transfer NEAR tokens between accounts. This returns an object with transaction and receipts outcomes and status.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("sender-account.testnet");
  await account.sendMoney(
    "receiver-account.testnet", // receiver account
    "1000000000000000000000000" // amount in yoctoNEAR
  );
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### View Function

View functions are read-only functions that don't change the state of the contract. We can call these functions without instantiating an account or a key store.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  import { providers } from 'near-api-js';

  const url = `https://rpc.${this.networkId}.near.org`;
  const provider = new providers.JsonRpcProvider({ url });
  const args = { greeting: 'hello' };

  const response = await provider.query({
    request_type: 'call_function',
    account_id: 'hello.near-examples.testnet',
    method_name: 'get_greeting',
    args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
    finality: 'optimistic',
  });

  const result = JSON.parse(Buffer.from(res.result).toString());
  ```
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```rust
  use near_jsonrpc_client::{methods, JsonRpcClient};
  use near_jsonrpc_primitives::types::query::QueryResponseKind;
  use near_primitives::types::{BlockReference, Finality, FunctionArgs};
  use near_primitives::views::QueryRequest;

  use serde::Deserialize;
  use serde_json::{from_slice, json};

  mod utils;

  #[derive(Debug, Deserialize)]
  pub struct AccountStatus {
      pub rating: f32,
      pub given: u64,
      pub received: u64,
  }

  #[tokio::main]
  async fn main() -> Result<(), Box<dyn std::error::Error>> {
      env_logger::init();

      let client = JsonRpcClient::connect("https://rpc.testnet.near.org");

      let account_id = utils::input("Enter the account to view: ")?;

      let request = methods::query::RpcQueryRequest {
          block_reference: BlockReference::Finality(Finality::Final),
          request: QueryRequest::CallFunction {
              account_id: "nosedive.testnet".parse()?,
              method_name: "status".to_string(),
              args: FunctionArgs::from(
                  json!({
                      "account_id": account_id,
                  })
                  .to_string()
                  .into_bytes(),
              ),
          },
      };

      let response = client.call(request).await?;

      if let QueryResponseKind::CallResult(result) = response.kind {
          println!("{:#?}", from_slice::<AccountStatus>(&result.result)?);
      }

      Ok(())
  }
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Call Function

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  import { connect, transactions, keyStores } from "near-api-js";

  const account = await nearConnection.account("example-account.testnet");
  const result = await account.signAndSendTransaction({
      receiverId: "example-contract.testnet",
      actions: [
          transactions.functionCall(
              "new",
              Buffer.from(JSON.stringify(newArgs)),
              10000000000000,
              "0"
          ),
      ],
  });
  ```
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```rust
  use near_crypto::Signer;
  use near_jsonrpc_client::{methods, JsonRpcClient};
  use near_jsonrpc_primitives::types::query::QueryResponseKind;
  use near_jsonrpc_primitives::types::transactions::{RpcTransactionError, TransactionInfo};
  use near_primitives::transaction::{Action, FunctionCallAction, Transaction, TransactionV0};
  use near_primitives::types::BlockReference;
  use near_primitives::views::TxExecutionStatus;

  use serde_json::json;
  use tokio::time;

  mod utils;

  #[tokio::main]
  async fn main() -> Result<(), Box<dyn std::error::Error>> {
      env_logger::init();

      let client = JsonRpcClient::connect("https://rpc.testnet.near.org");

      let signer_account_id = utils::input("Enter the signer Account ID: ")?.parse()?;
      let signer_secret_key = utils::input("Enter the signer's private key: ")?.parse()?;

      let signer = near_crypto::InMemorySigner::from_secret_key(signer_account_id, signer_secret_key);

      let access_key_query_response = client
          .call(methods::query::RpcQueryRequest {
              block_reference: BlockReference::latest(),
              request: near_primitives::views::QueryRequest::ViewAccessKey {
                  account_id: signer.account_id.clone(),
                  public_key: signer.public_key.clone(),
              },
          })
          .await?;

      let current_nonce = match access_key_query_response.kind {
          QueryResponseKind::AccessKey(access_key) => access_key.nonce,
          _ => Err("failed to extract current nonce")?,
      };

      let other_account = utils::input("Enter the account to be rated: ")?;
      let rating = utils::input("Enter a rating: ")?.parse::<f32>()?;

      let transaction = TransactionV0 {
          signer_id: signer.account_id.clone(),
          public_key: signer.public_key.clone(),
          nonce: current_nonce + 1,
          receiver_id: "nosedive.testnet".parse()?,
          block_hash: access_key_query_response.block_hash,
          actions: vec![Action::FunctionCall(Box::new(FunctionCallAction {
              method_name: "rate".to_string(),
              args: json!({
                  "account_id": other_account,
                  "rating": rating,
              })
              .to_string()
              .into_bytes(),
              gas: 100_000_000_000_000, // 100 TeraGas
              deposit: 0,
          }))],
      };

      let request = methods::broadcast_tx_async::RpcBroadcastTxAsyncRequest {
          signed_transaction: Transaction::V0(transaction).sign(&Signer::InMemory(signer.clone())),
      };

      let sent_at = time::Instant::now();
      let tx_hash = client.call(request).await?;

      loop {
          let response = client
              .call(methods::tx::RpcTransactionStatusRequest {
                  transaction_info: TransactionInfo::TransactionId {
                      tx_hash,
                      sender_account_id: signer.account_id.clone(),
                  },
                  wait_until: TxExecutionStatus::Executed,
              })
              .await;
          let received_at = time::Instant::now();
          let delta = (received_at - sent_at).as_secs();

          if delta > 60 {
              Err("time limit exceeded for the transaction to be recognized")?;
          }

          match response {
              Err(err) => match err.handler_error() {
                  Some(
                      RpcTransactionError::TimeoutError
                      | RpcTransactionError::UnknownTransaction { .. },
                  ) => {
                      time::sleep(time::Duration::from_secs(2)).await;
                      continue;
                  }
                  _ => Err(err)?,
              },
              Ok(response) => {
                  println!("response gotten after: {}s", delta);
                  println!("response: {:#?}", response);
                  break;
              }
          }
      }

      Ok(())
  }
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Batch Transactions

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">
  
  You may batch send transactions by using the `signAndSendTransaction({})` method from `account`. This method takes an array of transaction actions, and if one fails, the entire operation will fail. Here's a simple example:

  ```js
  const { connect, transactions, keyStores } = require("near-api-js");
  const fs = require("fs");
  const path = require("path");
  const homedir = require("os").homedir();

  const CREDENTIALS_DIR = ".near-credentials";
  const CONTRACT_NAME = "spf.idea404.testnet";
  const WASM_PATH = path.join(__dirname, "../build/uninitialized_nft.wasm");

  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

  const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
  };

  sendTransactions();

  async function sendTransactions() {
    const near = await connect({ ...config, keyStore });
    const account = await near.account(CONTRACT_NAME);
    const args = { some_field: 1, another_field: "hello" };

    const balanceBefore = await account.getAccountBalance();
    console.log("Balance before:", balanceBefore);

    try {
      const result = await account.signAndSendTransaction({
        receiverId: CONTRACT_NAME,
        actions: [
          transactions.deployContract(fs.readFileSync(WASM_PATH)),  // Contract does not get deployed
          transactions.functionCall("new", Buffer.from(JSON.stringify(args)), 10000000000000, "0"),  // this call fails
          transactions.transfer("1" + "0".repeat(24)), // 1 NEAR is not transferred either
        ],
      });
      console.log(result);
    } catch (e) {
      console.log("Error:", e);
    }

    const balanceAfter = await account.getAccountBalance();
    console.log("Balance after:", balanceAfter);
  }
  ```

  <details>
    <summary>Response Example</summary>
    ```bash
    Balance before: {
      total: '49987878054959838200000000',
      stateStaked: '4555390000000000000000000',
      staked: '0',
      available: '45432488054959838200000000'
    }
    Receipts: 2PPueY6gnA4YmmQUzc8DytNBp4PUpgTDhmEjRSHHVHBd, 3isLCW9SBH1MrPjeEPAmG9saHLj9Z2g7HxzfBdHmaSaG
      Failure [spf.idea404.testnet]: Error: {"index":1,"kind":{"ExecutionError":"Smart contract panicked: panicked at 'Failed to deserialize input from JSON.: Error(\"missing field `owner_id`\", line: 1, column: 40)', nft/src/lib.rs:47:1"}}
    Error: ServerTransactionError: {"index":1,"kind":{"ExecutionError":"Smart contract panicked: panicked at 'Failed to deserialize input from JSON.: Error(\"missing field `owner_id`\", line: 1, column: 40)', nft/src/lib.rs:47:1"}}
        at parseResultError (/Users/dennis/Code/naj-test/node_modules/near-api-js/lib/utils/rpc_errors.js:31:29)
        at Account.<anonymous> (/Users/dennis/Code/naj-test/node_modules/near-api-js/lib/account.js:156:61)
        at Generator.next (<anonymous>)
        at fulfilled (/Users/dennis/Code/naj-test/node_modules/near-api-js/lib/account.js:5:58)
        at processTicksAndRejections (node:internal/process/task_queues:96:5) {
      type: 'FunctionCallError',
      context: undefined,
      index: 1,
      kind: {
        ExecutionError: "Smart contract panicked: panicked at \'Failed to deserialize input from JSON.: Error("missing field `owner_id`", line: 1, column: 40)\', nft/src/lib.rs:47:1"
      },
      transaction_outcome: {
        block_hash: '5SUhYcXjXR1svCxL5BhCuw88XNdEjKXqWgA9X4XZW1dW',
        id: 'SKQqAgnSN27fyHpncaX3fCUxWknBrMtxxytWLRDQfT3',
        outcome: {
          executor_id: 'spf.idea404.testnet',
          gas_burnt: 4839199843770,
          logs: [],
          metadata: [Object],
          receipt_ids: [Array],
          status: [Object],
          tokens_burnt: '483919984377000000000'
        },
        proof: [ [Object], [Object], [Object], [Object], [Object] ]
      }
    }
    Balance after: {
      total: '49985119959346682700000000',
      stateStaked: '4555390000000000000000000',
      staked: '0',
      available: '45429729959346682700000000'
    }
    ```
  </details>

  You may also find an example of batch transactions in the [Cookbook](/tools/near-api-js/cookbook).
  </TabItem>
</Tabs>

<hr class="subsection" />

### Deploy a Contract {#deploy-a-contract}

You can deploy a contract from a compiled WASM file. This returns an object with transaction and receipts outcomes and status.

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("example-account.testnet");
  const transactionOutcome = await account.deployContract(
    fs.readFileSync("example-file.wasm")
  );
  ```
  </TabItem>
</Tabs>

---

## Keys

You can get and manage keys for an account.

### Add Function Access Key {#add-function-access-key}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("example-account.testnet");
  await account.addKey(
    "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
    "example-account.testnet", // contract this key is allowed to call (optional)
    "example_method", // methods this key is allowed to call (optional)
    "2500000000000" // allowance key can use to call methods (optional)
  );
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Add Full Access Key {#add-full-access-key}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // takes public key as string for argument
  const account = await nearConnection.account("example-account.testnet");
  await account.addKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Get All Access Keys {#get-all-access-keys}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("example-account.testnet");
  await account.getAccessKeys();
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```rust
  use near_jsonrpc_client::methods;
  use near_jsonrpc_primitives::types::query::QueryResponseKind;
  use near_primitives::types::BlockReference;

  mod utils;

  fn indent(indentation: usize, s: String) -> String {
      let mut lines = s.split_inclusive("\n");
      let mut r = lines.next().unwrap().to_string();
      for l in lines {
          r.push_str(&" ".repeat(indentation - 3));
          r.push_str("\x1b[38;5;244m>\x1b[0m ");
          r.push_str(l);
      }
      r
  }

  #[tokio::main]
  async fn main() -> Result<(), Box<dyn std::error::Error>> {
      env_logger::init();

      let client = utils::select_network()?;

      let account_id = utils::input("Enter the Account ID whose keys we're listing: ")?.parse()?;

      let access_key_query_response = client
          .call(methods::query::RpcQueryRequest {
              block_reference: BlockReference::latest(),
              request: near_primitives::views::QueryRequest::ViewAccessKeyList { account_id },
          })
          .await?;

      if let QueryResponseKind::AccessKeyList(response) = access_key_query_response.kind {
          for access_key in response.keys {
              println!("🗝 [{}]", access_key.public_key);
              println!("     \u{21b3}      nonce: {}", access_key.access_key.nonce);
              println!(
                  "     \u{21b3} permission: {}",
                  indent(20, format!("{:#?}", access_key.access_key.permission))
              );
          }
      }

      Ok(())
  }
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Delete Access Key {#delete-access-key}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  const account = await nearConnection.account("example-account.testnet");
  await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
  ```

  </TabItem>
</Tabs>

---

## Utilities

### NEAR => yoctoNEAR {#near--yoctonear}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // converts NEAR amount into yoctoNEAR (10^-24)

  const { utils } = nearAPI;
  const amountInYocto = utils.format.parseNearAmount("1");
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### YoctoNEAR => NEAR {#yoctonear--near}

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  ```js
  // converts yoctoNEAR (10^-24) amount into NEAR

  const { utils } = nearAPI;
  const amountInNEAR = utils.format.formatNearAmount("1000000000000000000000000");
  ```

  </TabItem>
</Tabs>

---

## Additional resources

<Tabs groupId="api">
  <TabItem value="js" label="🌐 JavaScript">

  - [Handling Passphrases](https://github.com/near/near-seed-phrase)
  - [Type Docs](https://near.github.io/near-api-js)

  </TabItem>
</Tabs>