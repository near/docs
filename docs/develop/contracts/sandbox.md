---
id: sandbox
title: End-to-end Test in Sandbox
sidebar_label: Test in Sandbox
---

After you wrote some awesome contracts and did some unit tests, let's see how your contracts will behave in a real node. `near-sandbox` is the right tool to go, it includes all components as a real testnet node does but runs locally. And it provides additional features like patch blockchain state on the fly and fast forward in time that makes certain tests easier.

> If you come from Ethereum, this workflow would sound familiar to you: You wrote e2e test in JavaScript, start a local `ganache` node, then run `truffle test` to execute tests on either local `ganache` or Ethereum Testnet.

## Start and Stop Sandbox Node

As of now, you need to start a sandbox manually.
First clone the nearcore repo:

```bash
git clone https://github.com/near/nearcore
cd nearcore
```

Then let's build the sandbox binary, it takes several minutes depend on your CPU.

```bash
make sandbox
```

Now we can start sandbox node:

```bash
target/debug/near-sandbox --home /tmp/near-sandbox init
target/debug/near-sandbox --home /tmp/near-sandbox run
```

After you're done with sandbox node, you can stop it by `Ctrl-C`. And to clean up the data it generates, just `rm -rf /tmp/near-sandbox`.

## Run an End-to-end Test in Sandbox

Let's take status-message contract as an example. You can get this contract from: https://github.com/near/near-sdk-rs/blob/master/examples/status-message/res/status_message.wasm. This is a very straightforward contract. It has two methods:

```text
set_status(message: string)
get_status(account_id: string) -> string or null
```

`set_status` method stores message string under the sender's account name key on chain. And get_status retrieve message of given account name. If it were set by `set_status` before, it returns that string, otherwise it returns null.

1. Start a near-sandbox node. If you have run a sandbox node with some tests before, delete `/tmp/near-sandbox` before start near-sandbox.
2. Assume you clone the repo with status-message and source code stays in `status-message/`. The compiled contract lives in `status-message/res`. Let's do some preparation for the test:

```bash
cd status-message
npm init
npm i near-api-js bn.js
```

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

The test itself is very straightfoward. It does:

1. Create testing accounts and deploy contract.
2. Alice sign the transaction to set status, and get status to see set status works.
3. Get Bob's status and that should be null because Bob has not set status.
4. Bob set status and get status, should show Bob's status changed and not affect Alice status.

> Most of the code above is boilerplate setup code to setup NEAR API, key pairs, testing accounts and deploy the contract. We're working on a near-cli `near test` command to do these setup code so you can focus on writing only `test()` for this kind of test.
