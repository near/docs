---
id: integrating
title: Integrating with NEAR
sidebar_label: Integrating with NEAR
---

## Overview

Integrating with NEAR is an opportunity for wallets, exchanges and oracles to take advantage of NEAR's scalability and performance for the benefit of their users.

### Prerequisites

- Hardware: Machine requirements are [here](/docs/roles/validator/hardware)
- Development:  Development environment requirements are available [here](/docs/local-setup/local-dev-testnet)
- Regulations: All regulations that apply to your jurisdiction are your sole responsibility including KYC / AML / CFT / BSA (Know Your Customer (KYC), Anti-Money Laundering (AML), Combating the Financing of Terrorism (CFT), Bank Secrecy Act (BSA))


<blockquote class="info">
<strong>did you know?</strong><br><br>

The Near team recommends that custody wallets and exchanges track all shards to remove any possibility of invalid state transition. `tracking_shards` is a node configuration parameter available in the `~/.near/config.json` file which supports tracking all shards. You can also run 8 separate nodes that track each shard individually and route requests to the right nodes for higher performance.

</blockquote>


### Server Setup

Please see [hardware requirements](/docs/roles/validator/hardware) and details of how to [run a NEAR node](/docs/local-setup/running-testnet).

## Blockchain

### Finality

To learn whether a block is final or not, NEAR accepts a flag in calls to all RPC endpoints that indicates whether the requester wants the response as of the last block or the last *final* block.

Exchanges should only use the last final block.

<blockquote class="warning">
<strong>work in progress</strong> <span>this feature is currently under development</span><br><br>

Currently the list of parameters in the example below *does not include* the finality flag mentioned above.

</blockquote>

```sh
# query format: account/<account_id>
http post http://rpc.nearprotocol.com jsonrpc=2.0 method=query  \
                                      params:='["account/test.near",""]' \
                                      id="placeholder"
# the request above returns view of account information
# ------------------------------------------------------------------------------
# response
{
  "id": "placeholder",
  "jsonrpc": "2.0",
  "result": {
    "amount": "1000000000000000011",
    "block_height": 12790,
    "code_hash": "11111111111111111111111111111111",
    "locked": "0",
    "storage_paid_at": 0,
    "storage_usage": 182
  }
}

# this example used HTTPie - a CLI, cURL-like tool for humans available at http://httpie.org
```

#### Resources

- RPC interface in related documentation [here](/docs/interaction/rpc)
- Consensus and finality here [NEAR Lunch and Learn Ep. 04: Nightshade: Consensus and finality](https://www.youtube.com/watch?v=k2ziZiZWquQ&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y&index=4)

### `/status` Endpoint

The `/status` endpoint is available for querying the most current state of the blockchain.

For example, TestNet status is available via `http://rpc.nearprotocol.com/status`

An `HTTP GET` request to this endpoint produces the following output:

```js
{
  "chain_id": "testnet", // universal name of the chain, configured in ~/.near/genesis.json
  "rpc_addr": "0.0.0.0:8080",
  "sync_info": {
    "latest_block_hash": "9MZPsj3fzF2tQtPsZz12M1XKCWZHcZU1QFjBw9coHboW",
    "latest_block_height": 12793,
    "latest_block_time": "2019-12-17T07:01:09.474230160Z",
    "latest_state_root": "FFrjV9UrH5gT4mwUYuat6xr19vVATWJstatnUj9V196z",
    "syncing": false
  },
  "validators": [
    {
      "account_id": "far",
      "is_slashed": false
    }
  ],
  "version": {
    "build": "c4046b02-modified",
    "version": "0.4.10"
  }
}
```

## Accounts

### Accounts

The NEAR platform provides an account name system with a scoping structure similar to the domain name system.  You can read more about [accounts on the NEAR platform here](https://nomicon.io/Primitives/Account.html).

Each account lives on one and only one shard.

All related data for an account also lives on the same shard including:
- Account Balance
- Locked balance (for staking)
- Code of the contract
- Key-value storage of the contract. Stored in a trie
- Access Keys
- Postponed ActionReceipts
- Received DataReceipts

### Access Keys

Each account can have an unlimited number of access keys.

An access key grants access to the resources of an account on the system. Each access key is identified by a unique public key. This public key is used to validate signatures on transactions. Each access key contains a unique `nonce` to prevent transaction replay and determine order when multiple transactions arrive at the same time from the same user.

Access keys represent a specific level of access to an account and operating under its name with other accounts/contracts.  Currently the NEAR platform supports two types of access keys but others are possible:

- `FullAccess` keys represent full, unrestricted access to the resources of an account.
- `FunctionCall` access keys represent limited permissions to invoke functions on specific contracts. For example, you can restrict a `FunctionCall` access key to use a single function on a contract deployed to given account.  Alternatively you can describe a list of functions on some third-party contract.

Access keys for accounts can be discovered using our RPC interface as follows.


Discovering access keys on an account:

```sh
# query format: access_key/<account_id>
http post http://rpc.nearprotocol.com jsonrpc=2.0 method=query  \
                                      params:='["access_key/test.near",""]' \
                                      id="placeholder"

# request above returns all access keys for given account.
# ------------------------------------------------------------------------------
# response
{
  "id": "placeholder",
  "jsonrpc": "2.0",
  "result": [
    {
      "access_key": {
        "nonce": 1,
        "permission": "FullAccess"           # FullAccess key
      },
      "public_key": "ed25519:23vYngy8iL7q94jby3gszBnZ9JptpMf5Hgf7KVVa2yQi"
    },
    {
      "access_key": {
        "nonce": 2,
        "permission": {
          "FunctionCall": {                  # FunctionCall access key
            "allowance": "100000000",
            "method_names": [],
            "receiver_id": "crypto-corgis"
          }
        }
      },
      "public_key": "ed25519:GmgaX1Na1yVwu1XXcsh7Gugxdqy5PTshcVbrc72KEtTU"
    }
  ]
}
# this example used HTTPie - a CLI, cURL-like tool for humans available at http://httpie.org
```

Discovering the details of a specific access key for a given account.

```sh
# query format: access_key/<account_id>/<public_key>
http post http://rpc.nearprotocol.com jsonrpc=2.0 method=query  \
                                      params:='["access_key/test.near/ed25519:23vYngy8iL7q94jby3gszBnZ9JptpMf5Hgf7KVVa2yQi",""]' \
                                      id="placeholder"

# the request above returns details about an access key for given account with this public key.
# If there is no such access key, it returns nothing.
# ------------------------------------------------------------------------------
# response
{
  "id": "placeholder",
  "jsonrpc": "2.0",
  "result": {
    "nonce": 1,
    "permission": "FullAccess"
  }
}
# this example used HTTPie - a CLI, cURL-like tool for humans available at http://httpie.org
```

### Account Events

The NEAR platform emits events related to changes on the blockchain.  Developers can subscribe to these events and receive changes as blocks are processed.  Events are organized around account compute and storage.

<blockquote class="warning">
<strong>work in progress</strong> <span>support for events is currently under heavy development</span><br><br>

Discussion is here: https://github.com/nearprotocol/nearcore/issues/1546

Briefly, as of Nov 2019, the Near team is developing a [WAMP-proto](https://wamp-proto.org/_static/gen/wamp_latest.html#protocol-overview) router protocol with support for a [dealer [RPC] role](https://wamp-proto.org/_static/gen/wamp_latest.html#remote-procedure-calls) with an advanced extension for [progressive calls](https://wamp-proto.org/_static/gen/wamp_latest.html#progressive-call-results) using Actix WebSocket.

</blockquote>

### Create key pair (offline)

NEAR supports generating public/private key pairs from a random seed or using a string to generate a public key from a given private key.

Generating key pairs two ways and comparing them

```js
// generating a key pair
const keyPair = nearlib.utils.key_pair.KeyPairEd25519.fromRandom();

// generating another key pair based on the private key of the key pair above
const newKeyPair = nearlib.utils.key_pair.KeyPair.fromString(keyPair.toString());

// the two will match
console.assert(newKeyPair.secretKey === keyPair.secretKey);
```

Generating a key pair to sign and verify a message

```js
// generate a key pair
const keyPair = nearlib.utils.key_pair.KeyPairEd25519.fromRandom();

// create and sign a message
const message = new Uint8Array(sha256.array('some message'));
const signature = keyPair.sign(message);

// the message is verifiably signed by the correct key
console.assert(keyPair.verify(message, signature.signature));
```

## Transaction signing

### Life cycle of a transaction

- **An app requests wallet to sign transaction(s)**  \
  This is generally using wallet-specific protocols. The API used by NEAR Wallet is being defined in [NEP](https://github.com/nearprotocol/NEPs/pull/10).

- **Wallet decodes [Borsh](http://borsh.io/)-serialized transactions and displays approval UI**  \
  Schema defined [here](https://github.com/nearprotocol/nearlib/blob/8f5063bfee4ea7e7eba1f8dbfc20862534c0febf/src.ts/transaction.ts#L119)

- **SHA-256 hash of transaction signed using ed25519**  \
  For examples see [nearlib](https://github.com/nearprotocol/nearlib/blob/8f5063bfee4ea7e7eba1f8dbfc20862534c0febf/src.ts/transaction.ts#L198), [wallet-core](https://github.com/trustwallet/wallet-core/blob/951e73abfa0362b4d61202bac4e399a4faae97a8/src/NEAR/Signer.cpp#L20), [Ledger app](https://github.com/nearprotocol/near-ledger-app/blob/5abe5f5d57dff9cefe4535057d7a39f476d32d77/workdir/near-ledger-app/src/crypto/near.c#L7).

- **Transaction sent to NEAR node**  \
  This is a relatively simple [JSON-RPC call.](https://github.com/nearprotocol/nearlib/blob/8f5063bfee4ea7e7eba1f8dbfc20862534c0febf/src.ts/providers/json-rpc-provider.ts#L41) which is [documented with our API](/docs/interaction/rpc)

- **The App is notified**  \
  With NEAR Wallet this is a simple redirect to the URL provided by the app when sending transaction.

- **Transaction is available in block explorer**  \
  Every transaction eventually will show up in [NEAR Explorer](http://explorer.nearprotocol.com) which can be also used by a wallet or exchange to query activity for given account.


For additional detail around the life of a transaction on the NEAR platform please see this [Key Concepts: Transaction](/docs/concepts/transaction) page

### Creating transaction offline

Offline transaction signing in 3 steps:

(1) Fetch latest block hash (online: requires access to pull data from the live network)

```js
const networkStatus = await near.connection.provider.status(); // see the full example below for near.connection
const blockHash = networkStatus.sync_info.latest_block_hash;
```

(2) Create transaction (offline)

```js
const transaction = nearlib.transactions.createTransaction(fromAccount, publicKey, receiverAccount, nonce_for_publicKey, actions, blockHash);
const bytes = transaction.encode();
```

(3) Sign transaction (offline with access to the key)

```js
// WARNING: this sample won't work because Signature is not exported by nearlib
const signature = await signer.signMessage(message, accountId, networkId);
const signedTx = new nearlib.transactions.SignedTransaction({transaction, signature: new Signature(signature.signature) });
```

See other examples of using our [JavaScript SDK here](/docs/roles/developer/examples/nearlib/examples)


### Submitting transaction

```js
let receipt = await near.connection.provider.sendTransaction(signedTx);  // see the full example below for near.connection
```

### Full working example

You can use a local client-side [playground](/docs/roles/developer/examples/nearlib/guides#prepare-your-playground) to run the code below in your browser.

```js
 // ADD YOUR ACCOUNT HERE with a valid private key
const account = {
  name: 'YOUR_ACCOUNT',
  network: 'default',
  privateKey: 'ed25519:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
};

// const nearlib = require('nearlib');                              // if not using the playground (linked above) you will need to import nearlib here

// Configure the connection to the NEAR
const config = {
  networkId: account.network,                                       // this can be any label to namespace user accounts
  nodeUrl: "https://rpc.nearprotocol.com",                          // this endpoint must point to the network you want to reach
    deps: {
      keyStore: new nearlib.keyStores.InMemoryKeyStore()            // keys are stored in memory
    }
  };



const near = await nearlib.connect(config);                         // connect to the NEAR platform

// Generate a new keypair
const keypair = nearlib.utils.key_pair.KeyPair.fromString(account.privateKey);
console.assert(keypair.toString() === account.privateKey, 'the key pair does not match expected value');

// Fetch and decode latest block hash
const networkStatus = await near.connection.provider.status();
const recentBlock = networkStatus.sync_info.latest_block_hash;
const blockHash = nearlib.utils.serialize.base_decode(recentBlock);

// Fetch access key nonce for given key
const keys = await near.connection.provider.query(`access_key/${account.name}`, '');
const key = keys.filter(k => k.public_key === keypair.publicKey.toString())[0];
console.assert(key.access_key.permission === 'FullAccess');
const nonce = key.access_key.nonce; // will increment with each use of the key

// Create a transaction
const sender = account.name;
const publicKey = keypair.publicKey;
const receiver = 'test.near';

// Intend to create a new account and send it some tokens
const actions = [
  nearlib.transactions.createAccount(`friend-of-${account.name}`),
  nearlib.transactions.transfer(1) // send some yN ("wine" :)
];

// Create transaction
const transaction = nearlib.transactions.createTransaction(sender, publicKey, receiver, nonce, actions, blockHash);
const bytes = transaction.encode();

// Sign transaction
near.connection.signer.keyStore.setKey(account.network, account.name, keypair);
const signedMsg = await near.connection.signer.signMessage(bytes, account.name, account.network);

// WARNING: this line won't work bc Signature is not exported by nearlib
const signedTx = new nearlib.transactions.SignedTransaction({transaction, signature: new Signature(signedMsg.signature) });

// Send transaction
try {
  let receipt = await near.connection.provider.sendTransaction(signedTx);
  console.log(JSON.stringify(receipt, null, 2));

} catch (error) {
  let {type, message} = error;
  console.log(`[${type}]`, message);

  switch (type) {
    case 'InvalidTxError::Expired':
      console.log('[ FIX --> ] grab a more recent block hash')
      break;

    case 'InvalidTxError::InvalidNonce':
      console.log('[ FIX --> ] increment the nonce')
      break;

    default:
      break;
  }
}
```

## Going Further

### Concepts

- See the [Nearnomicon](http://nomicon.io/) for an authoritative technical reference on the inner workings of the NEAR blockchain, it's primitives and runtime.
- Key concepts
  - [Account](/docs/concepts/account)
  - [Transaction](/docs/concepts/transaction)
