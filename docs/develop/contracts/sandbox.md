---
id: sandbox
title: End-to-end Test in Sandbox
sidebar_label: Test in Sandbox
---

Once you've written some awesome contracts and performed a few unit tests the next step is to see how your contracts will behave on a real node. `near-sandbox` is the perfect solution for this as it includes all components of a live `testnet` node but runs locally on your machine. Additionally, it provides features such as patching blockchain state on the fly and fast forwarding in time that makes certain tests easier.

> Coming from Ethereum the typical workflow would be something like: 

- Writing e2e test in JavaScript
- Start a local `ganache` node
- Run `truffle test` to execute tests on either local `ganache` or Ethereum Testnet.

## Start and Stop Sandbox Node

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
target/debug/near-sandbox --home /tmp/near-sandbox init
target/debug/near-sandbox --home /tmp/near-sandbox run
```

Once you're finished using the sandbox node you can stop it by using `Ctrl-C`. To clean up the data it generates, simply run: 

```bash
rm -rf /tmp/near-sandbox

## Run an End-to-end Test in Sandbox

For this example we'll use a simple smart contract (status-message) with two methods; `set_status` & `get_status`. 

[ [Click here](https://github.com/near/near-sdk-rs/blob/master/examples/status-message/res/status_message.wasm) ] to download the contract (`status_message.wasm`).

```text
set_status(message: string)
get_status(account_id: string) -> string or null
```

- `set_status` stores a message as a string under the sender's account as the key on chain.
- `get_status` retrieves a message of given account name as a string. _(returns `null` if `set_status` was never called)_

1. Start a near-sandbox node. If you have already ran a sandbox node with tests make sure you delete `/tmp/near-sandbox` before restarting the node.
2. Assume you clone the repo with status-message and source code stays in `status-message/`. The compiled contract lives in `status-message/res`. Let's do some preparation for the test:

```bash
cd status-message
npm init
npm i near-api-js bn.js
```

Change `package.json`, specify near-api-js version to be:

```
    "near-api-js": "near/near-api-js#bace1ee"
```

And run `npm i` again.

3. Write a test `test.js` that does deploy the contract, test with the contract logic:

```javascript
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
  // 1
  await initNear();
  const { aliceUseContract, bobUseContract } = await initTest();

  // 2
  await aliceUseContract.set_status({ args: { message: "hello" } });
  let alice_message = await aliceUseContract.get_status({
    account_id: "alice.test.near",
  });
  assert.equal(alice_message, "hello");

  // 3
  let bob_message = await bobUseContract.get_status({
    account_id: "bob.test.near",
  });
  assert.equal(bob_message, null);

  // 4
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

The test itself is very straightfoward as it performs the following:

1. Create testing accounts and deploy contract.
2. Alice sign the transaction to set status, and get status to see set status works.
3. Get Bob's status and that should be null because Bob has not set status.
4. Bob set status and get status, should show Bob's status changed and not affect Alice status.

> Most of the code above is boilerplate setup code to setup NEAR API, key pairs, testing accounts and deploy the contract. We're working on a near-cli `near test` command to do these setup code so you can focus on writing only `test()` for this kind of test.

## Sandbox-only Features for Testing

If you only use above test script that only uses standard NEAR rpcs, your tests can also be executed on a testnet node. Just replace the network ID, node url, key path and account names in above script and rerun. There's also some additional Sandbox-only features that make certain tests easier. We'll review some examples in this section.

### Patch State on the Fly

You can add or modify any contract state, contract code, account or access key during the test with `sandbox_patch_state` RPC.

For arbitrary mutation on contract state, you cannot do it via transactions since transaction can only include contract calls that mutate state in contract programmed way. For example, for a NFT contract, you can do some operation with your owned NFTs but you cannot manipulate other people owned NFTs because smart contract has coded with checks to reject that. This is the expected behavior of the NFT contract. However you may want to change other people's NFT for test setup. This is called "arbitary mutation on contract state" and can be done by `sandbox_patch_state` RPC or stop the node, dump state as genesis, edit genesis and restart the node. The later approach is more complicated to do and also cannot be done without restart the node.

For patch contract code, account or access key, you can add them with normal deploy contract, create account or add key actions in transaction, but that's also limited to your account or sub-account. `sandbox_patch_state` RPC does not have this restriction.

Let's see an example of how patch_state would help in a test. Assume you want to mock the real state of a mainnet, where `alice.near` has set a status, and you want to retrieve that message. Above script doesn't work out of box, because your master account is `test.near` and you can only
create account of `alice.test.near`, not `alice.near`. Patch state can solve this problem.

1. Fetch current state from sandbox node. You can also do this with `sendJsonRpc` of `near-api-js`, or with any http client from command line:

```bash
$ curl http://localhost:3030 -H 'content-type: application/json' -d '{"jsonrpc": "2.0", "id":1, "method":"query", "params":{"request_type":"view_state","finality":"final", "account_id":"status-message.test.near","prefix_base64":""}}'

{"jsonrpc":"2.0","result":{"values":[{"key":"U1RBVEU=","value":"AgAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZA==","proof":[]}],"proof":[],"block_height":24229,"block_hash":"XeCMK1jLNCu2UbkAKk1LLXEQVqvUASLoxSEz1YVBfGH"},"id":1}
```

You can see the contract only has one key-value pair in state, looks like base64 encoded. Let's figure out what it is.

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
const statusMessage = borsh.deserialize(
  schema,
  StatusMessage,
  stateValueBuffer
);
console.log(statusMessage);
```

3. Run it with nodejs, we'll get:

```text
<Buffer 53 54 41 54 45>
STATE
StatusMessage {
  records: [
    Record { k: 'alice.test.near', v: 'hello' },
    Record { k: 'bob.test.near', v: 'world' }
  ]
}
```

So the key of the key-value pair is ASCII string `STATE`. This is because all contracts written with near-sdk-rs store the main contract struct under this key. The value of the key-value pair is borsh serialized account-message items. The exact content is as expected as we inserted these two StatusMessage records in the previous test.

4. Now let's add an message for `alice.near` directly to the state:

```javascript
statusMessage.records.push(new Record({ k: "alice.near", v: "hello world" }));
console.log(statusMessage);
```

5. It looks good now, let's serialize it and base64 encode it so it can be used in patch_state RPC:

```javascript
console.log(
  Buffer.from(borsh.serialize(schema, statusMessage)).toString("base64")
);
```

You'll get:

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

7. Now we can back to the test file and rerun the test with new state.
   Comment these two lines which create accounts and deploy contract, because they're already created in the first test:

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

7. comment everything after `const { aliceUseContract, bobUseContract } = await initTest();` and add:

```javascript
let client = new nearAPI.providers.JsonRpcProvider(config.nodeUrl);
let key = Buffer.from("STATE").toString("base64");

// Here is how patch state can be used
await client.sendJsonRpc("sandbox_patch_state", {
  records: [
    {
      Data: {
        account_id: config.contractAccount,
        data_key: key,
        value:
          "AwAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZAoAAABhbGljZS5uZWFyCwAAAGhlbGxvIHdvcmxk",
      },
    },
  ],
});

let alice_mainnet_message = await bobUseContract.get_status({
  account_id: "alice.near",
});
assert.equal(alice_mainnet_message, "hello world");
```

Rerun the test it should pass.
