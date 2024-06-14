---
sidebar_position: 2
title: Sending Native Tokens
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sending $NEAR

You might want to send tokens from a contract for many reasons.

- The contract uses something like the [Storage Standard](https://nomicon.io/Standards/StorageManagement) and needs to return deposits to users when they unregister.
- Users pay into the contract and the contract later pays these fees to the maintainers, redistributes them to users, or disburses them to some cause the users vote on.
- And more!

Blockchains give us programmable money, and the ability for a smart contract to send tokens lies at the heart of that ability.

NEAR makes this easy. NEAR makes this easy. Transferring NEAR tokens is the simplest transaction you can send from a smart contract. Here's all you need: Here's all you need:

```js
let amount = BigInt(1_000_000_000_000_000_000_000_000); // 1 $NEAR as yoctoNEAR
let to = "alice.near";

NearPromise.new(to).transfer(amount);
```

In the context of a full contract and function call, this could look like:

```js
import { NearPromise, NearBindgen } from "near-sdk-js";

@NearBindgen({})
export class Contract {
  pay({ amount, to }) {
    return NearPromise.new(to).transfer(amount);
  }
}
```

Most of this is boilerplate you're probably familiar with by now – imports, setting up [`NearBindgen`](../contract-structure/near-bindgen.md), etc. Some interesting details related to the transfer itself: Some interesting details related to the transfer itself:

- The `pay` method defined here accepts JSON as input, and numbers in JS [cannot be larger than `2^53-1`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER), so for compatibility with deserializing JSON to JS, the integer is serialized as a string. Since the `transfer` method takes a value in [yocto](https://en.wikipedia.org/wiki/Yocto-)NEAR, it's likely to need numbers much larger than `2^53-1`. Since the `transfer` method takes a value in [yocto](https://en.wikipedia.org/wiki/Yocto-)NEAR, it's likely to need numbers much larger than `2^53-1`.

- Returning the `NearPromise`: This allows NEAR Explorer, near-cli, near-api-js, and other tooling to correctly determine if a whole chain of transactions is successful. If your function does not return `Promise`, tools like near-cli will return immediately after your function call. And then even if the `transfer` fails, your function call will be considered successful. If your function does not return `Promise`, tools like near-cli will return immediately after your function call. And then even if the `transfer` fails, your function call will be considered successful.

Using near-cli or near-cli-rs, someone could invoke this function with a call like:

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  near call <contract> pay '{"amount": "1000000000000000000000000", "to": "example.near"}' --accountId benjiman.near
  ```

  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  near contract call-function as-transaction <contract> pay json-args '{"amount": "1000000000000000000000000", "to": "example.near"}' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as benjiman.near network-config testnet sign-with-keychain send
  ```

  </TabItem>
</Tabs>

