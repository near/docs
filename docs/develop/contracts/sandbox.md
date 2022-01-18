---
id: sandbox
title: End-to-end Test in Sandbox
sidebar_label: Test in Sandbox
---

Once you've written some awesome contracts and performed a few unit tests the next step is to see how your contracts will behave on a real node. NEAR Sandbox is the perfect solution for this as it includes all components of a live `testnet` node but runs locally on your machine. Additionally, it provides features such as patching blockchain state on the fly and fast forwarding in time that makes certain tests easier.

<blockquote class="info">
<strong>Coming from Ethereum?</strong><br /><br />
  
If you're familiar with the `ganache` and `truffle` tools commonly used in Ethereum, then NEAR Sandbox will be familiar to you. It has similar functionality to the common Ethereum development workflow of:
  
- Writing e2e test in JavaScript
- Start a local `ganache` node
- Run `truffle test` to execute tests on either local `ganache` or Ethereum Testnet.
</blockquote>

## Start and Stop Sandbox Node {#start-and-stop-sandbox-node}

> Currently, to start the sandbox node you will need to do so manually. Here are the steps to start and stop a sandbox node:

1. Clone the `nearcore` repo:

```bash
git clone https://github.com/near/nearcore
cd nearcore
```

2. Build the sandbox binary which will take several minutes depending on your CPU:

```bash
make sandbox
```

3. Start the sandbox node:

```bash
target/debug/neard-sandbox --home /tmp/near-sandbox init
target/debug/neard-sandbox --home /tmp/near-sandbox run
```

Once you're finished using the sandbox node you can stop it by using `Ctrl-C`. To clean up the data it generates, simply run:

```bash
rm -rf /tmp/near-sandbox
```

## Run an End-to-end Test in Sandbox {#run-an-end-to-end-test-in-sandbox}

For this example we'll use a simple smart contract (status-message) with two methods; `set_status` & `get_status`.

Clone the [status example example](https://github.com/near-examples/rust-status-message) where the contract is in `res/status_message.wasm`.

Here are the two functions we'll be using:

```text
set_status(message: string)
get_status(account_id: string) -> string or null
```

- `set_status` stores a message as a string under the sender's account as the key on chain.
- `get_status` retrieves a message of given account name as a string. _(returns `null` if `set_status` was never called)_

1. Start a NEAR Sandbox node. If you've already run a sandbox node with tests make sure you delete `/tmp/near-sandbox` before restarting the node.
2. Go to the contract source code in `src/lib.rs`. The compiled contract lives in the `res` directory. Let's do some preparation for the test:

```bash
cd status-message
npm init
npm i near-api-js bn.js
```

3. Write a test `test.js` that does deploy the contract, test with the contract logic:

```js
const nearAPI = require("near-api-js");
const BN = require("bn.js");
const fs = require("fs").promises;
const assert = require("assert").strict;

function getConfig(env) {
  switch (env) {
    case "sandbox":
    case "local":
      return {
        networkId: "sandbox",
        nodeUrl: "http://localhost:3030",
        masterAccount: "test.near",
        contractAccount: "status-message.test.near",
        keyPath: "/tmp/near-sandbox/validator_key.json",
      };
  }
}

const contractMethods = {
  viewMethods: ["get_status"],
  changeMethods: ["set_status"],
};
let config;
let masterAccount;
let masterKey;
let pubKey;
let keyStore;
let near;

async function initNear() {
  config = getConfig(process.env.NEAR_ENV || "sandbox");
  const keyFile = require(config.keyPath);
  masterKey = nearAPI.utils.KeyPair.fromString(
    keyFile.secret_key || keyFile.private_key
  );
  pubKey = masterKey.getPublicKey();
  keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  keyStore.setKey(config.networkId, config.masterAccount, masterKey);
  near = await nearAPI.connect({
    deps: {
      keyStore,
    },
    networkId: config.networkId,
    nodeUrl: config.nodeUrl,
  });
  masterAccount = new nearAPI.Account(near.connection, config.masterAccount);
  console.log("Finish init NEAR");
}

async function createContractUser(
  accountPrefix,
  contractAccountId,
  contractMethods
) {
  let accountId = accountPrefix + "." + config.masterAccount;
  await masterAccount.createAccount(
    accountId,
    pubKey,
    new BN(10).pow(new BN(25))
  );
  keyStore.setKey(config.networkId, accountId, masterKey);
  const account = new nearAPI.Account(near.connection, accountId);
  const accountUseContract = new nearAPI.Contract(
    account,
    contractAccountId,
    contractMethods
  );
  return accountUseContract;
}

async function initTest() {
  const contract = await fs.readFile("./res/status_message.wasm");
  const _contractAccount = await masterAccount.createAndDeployContract(
    config.contractAccount,
    pubKey,
    contract,
    new BN(10).pow(new BN(25))
  );

  const aliceUseContract = await createContractUser(
    "alice",
    config.contractAccount,
    contractMethods
  );

  const bobUseContract = await createContractUser(
    "bob",
    config.contractAccount,
    contractMethods
  );
  console.log("Finish deploy contracts and create test accounts");
  return { aliceUseContract, bobUseContract };
}

async function test() {
  // 1. Creates testing accounts and deploys a contract
  await initNear();
  const { aliceUseContract, bobUseContract } = await initTest();

  // 2. Performs a `set_status` transaction signed by Alice and then calls `get_status` to confirm `set_status` worked
  await aliceUseContract.set_status({ args: { message: "hello" } });
  let alice_message = await aliceUseContract.get_status({
    account_id: "alice.test.near",
  });
  assert.equal(alice_message, "hello");

  // 3. Gets Bob's status and which should be `null` as Bob has not yet set status
  let bob_message = await bobUseContract.get_status({
    account_id: "bob.test.near",
  });
  assert.equal(bob_message, null);

  // 4. Performs a `set_status` transaction signed by Bob and then calls `get_status` to show Bob's changed status and should not affect Alice's status
  await bobUseContract.set_status({ args: { message: "world" } });
  bob_message = await bobUseContract.get_status({
    account_id: "bob.test.near",
  });
  assert.equal(bob_message, "world");
  alice_message = await aliceUseContract.get_status({
    account_id: "alice.test.near",
  });
  assert.equal(alice_message, "hello");
}

test();
```

The test itself is very straightforward as it performs the following:

1. Creates testing accounts and deploys a contract.
2. Performs a `set_status` transaction signed by Alice and then calls `get_status` to confirm `set_status` worked
3. Gets Bob's status and which should be `null` as Bob has not yet set status.
4. Performs a `set_status` transaction signed by Bob and then calls `get_status` to show Bob's changed status and should not affect Alice's status.

> Most of the code above is boilerplate code to set up NEAR API, key pairs, testing accounts, and deploy the contract. We're working on a NEAR CLI `near test` command to do this setup code, so you can focus on writing only `test()` for this.

## Sandbox-only Features for Testing {#sandbox-only-features-for-testing}

If you only use the above test script that just uses standard NEAR RPCs your tests can also be executed on a `testnet` node. Simply replace the network ID, node url, key path, and account names in the above script and rerun the tests. There's also some additional "Sandbox only" features that make certain tests easier. We'll review some examples of those in the following section.

### Patch State on the Fly {#patch-state-on-the-fly}

You can add or modify any contract state, contract code, account or access key during the test with `sandbox_patch_state` RPC.

For arbitrary mutation on contract state you cannot perform this with transactions as transactions can only include contract calls that mutate state in a contract programmed way. For example with an NFT contract, you can perform some operation with NFTs you have ownership of but you cannot manipulate NFTs that are owned by other accounts as the smart contract is coded with checks to reject that. This is the expected behavior of the NFT contract. However, you may want to change another person's NFT for a test setup. This is called "arbitrary mutation on contract state" and can be done by the `sandbox_patch_state` RPC. Alternatively you can stop the node, dump state at genesis, edit genesis, and restart the node. The later approach is more complicated to do and also cannot be performed without restarting the node.

For patch contract code, account, or access keys you can add them with a normal deploy contract, create account, or add key actions in a transaction but that's also limited to your account or sub-account. `sandbox_patch_state` RPC does not have this restriction.

Let's explore an example of how `patch_state` would help in a test. Assume you want to mock the real state of `mainnet` where `alice.near` has set a status and you want to retrieve that status message. The above script doesn't work out of box because your master account is `test.near` and you can only create an account of `alice.test.near` not `alice.near`. Patch state can solve this problem.

Here is a guide on running `patch_state`:

1. Fetch the current state from the sandbox node: _(You can also do this with `sendJsonRpc` of `near-api-js` or with any http client from command line)_

```bash
curl http://localhost:3030 -H 'content-type: application/json' -d '{"jsonrpc": "2.0", "id":1, "method":"query", "params":{"request_type":"view_state","finality":"final", "account_id":"status-message.test.near","prefix_base64":""}}'
```

Result:
```json
{
   "jsonrpc": "2.0",
   "result": {
      "values": [
         {
            "key": "U1RBVEU=",
            "value": "AgAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZA==",
            "proof": []
         }
      ],
      "proof": [],
      "block_height": 24229,
      "block_hash": "XeCMK1jLNCu2UbkAKk1LLXEQVqvUASLoxSEz1YVBfGH"
   },
   "id": 1
}
```

You can see the contract only has one key-value pair in state which looks like base64 encoded. Let's figure out what it is.

2. `npm i borsh` and create a JavaScript file with following content:

```javascript
const borsh = require("borsh");

class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      this[key] = properties[key];
    });
  }
}

class StatusMessage extends Assignable {}

class Record extends Assignable {}

const schema = new Map([
  [StatusMessage, { kind: "struct", fields: [["records", [Record]]] }],
  [
    Record,
    {
      kind: "struct",
      fields: [
        ["k", "string"],
        ["v", "string"],
      ],
    },
  ],
]);

const stateKey = "U1RBVEU=";
console.log(Buffer.from(stateKey, "base64"));
console.log(Buffer.from(stateKey, "base64").toString());
const stateValue =
  "AgAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZA==";
const stateValueBuffer = Buffer.from(stateValue, "base64");
let statusMessage = borsh.deserialize(schema, StatusMessage, stateValueBuffer);
console.log(statusMessage);

console.log(
  Buffer.from(borsh.serialize(schema, statusMessage)).toString("base64")
);
statusMessage.records.push(new Record({ k: "alice.near", v: "hello world" }));
console.log(statusMessage);

console.log(
  Buffer.from(borsh.serialize(schema, statusMessage)).toString("base64")
);
```

3. `node borsh.js` to run it with NodeJS, and we'll get:

```text
<Buffer 53 54 41 54 45>
STATE
StatusMessage {
  records: [
    Record { k: 'alice.test.near', v: 'hello' },
    Record { k: 'bob.test.near', v: 'world' }
  ]
}
AgAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZA==
StatusMessage {
  records: [
    Record { k: 'alice.test.near', v: 'hello' },
    Record { k: 'bob.test.near', v: 'world' },
    Record { k: 'alice.near', v: 'hello world' }
  ]
}
AwAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZAoAAABhbGljZS5uZWFyCwAAAGhlbGxvIHdvcmxk
```

So the key of the key-value pair is the ASCII string `STATE`. This is because all contracts written with [`near-sdk-rs`](https://github.com/near/near-sdk-rs) store the main contract struct under this key. The value of the key-value pair are [borsh](https://borsh.io) serialized account » message items. The exact content is as expected as we inserted these two `StatusMessage` records in the previous test.

4. Note at the bottom of the `borsh.js` file that we've added a message for `alice.near` directly to the state:

```javascript
statusMessage.records.push(new Record({ k: 'alice.near', v: 'hello world' }))
console.log(statusMessage)
```

5. After that snippet, notice how it's serialize and base64 encoded, so it can be used in a `patch_state` remote procedure call:

```javascript
console.log(
  Buffer.from(borsh.serialize(schema, statusMessage)).toString('base64')
)
```

The final output is:

```text
AwAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZAoAAABhbGljZS5uZWFyCwAAAGhlbGxvIHdvcmxk
```

6. Patch state with curl:

```
curl http://localhost:3030 -H 'content-type: application/json' -d '{"jsonrpc": "2.0", "id":1, "method":"sandbox_patch_state", "params":{
  "records": [
    {
      "Data": {
        "account_id": "status-message.test.near",
        "data_key": "U1RBVEU=",
        "value": "AwAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZAoAAABhbGljZS5uZWFyCwAAAGhlbGxvIHdvcmxk"
      }
    }
  ]
}}'
```

7. Now we can go back to the test file and rerun the test with the new state.
   Comment out the following lines of code which create accounts and deploy the contract. We can do this because they're already created in the first test:

```javascript
// await masterAccount.createAccount(
//   accountId,
//   pubKey,
//   new BN(10).pow(new BN(25))
// );

// const _contractAccount = await masterAccount.createAndDeployContract(
//   config.contractAccount,
//   pubKey,
//   contract,
//   new BN(10).pow(new BN(25))
// );
```

7. Comment everything after `const { aliceUseContract, bobUseContract } = await initTest();` and add:

```javascript
let client = new nearAPI.providers.JsonRpcProvider(config.nodeUrl)
let key = Buffer.from('STATE').toString('base64')

// Here is how patch state can be used
await client.sendJsonRpc('sandbox_patch_state', {
  records: [
    {
      Data: {
        account_id: config.contractAccount,
        data_key: key,
        value:
          'AwAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZAoAAABhbGljZS5uZWFyCwAAAGhlbGxvIHdvcmxk',
      },
    },
  ],
})

let alice_mainnet_message = await bobUseContract.get_status({
  account_id: 'alice.near',
})
assert.equal(alice_mainnet_message, 'hello world')
```

Rerun the test (`node test.js`) and it should pass.
