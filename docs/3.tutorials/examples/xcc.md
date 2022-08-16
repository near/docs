---
id: xcc
title: Cross Contract Call
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

This example performs the simplest cross-contract call possible: it calls our [Hello NEAR](hello-near.md) example to set and retrieve a greeting.
It is one of the simplest examples on making a cross-contract call, and the perfect gateway to the world of interoperative contracts.

:::info
This example is purely technical and does not have an frontend
:::

---

## Interacting with the Project
Since this example does not have a frontend, we will interact with it through the [NEAR CLI](../../2.develop/integrate/cli.md).

<Tabs className="language-tabs" groupId="code-tabs">

  <TabItem value="🌐 JavaScript"> 

  | Gitpod                                                                                                                                                                                           | Clone locally                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/cross-contract-hello-js"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/cross-contract-hello-js.git` |

  </TabItem>

  <TabItem value="🦀 Rust">

  | Gitpod                                                                                                                                                                                           | Clone locally                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🦀 `https://github.com/near-examples/docs-examples` -> cross-contract-hello-rs |

  </TabItem>

  <TabItem value="🚀 AssemblyScript" >

  | Gitpod                                                                                                                                                                                           | Clone locally                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🚀 `https://github.com/near-examples/docs-examples` -> cross-contract-hello-as |

  </TabItem>
</Tabs>


<!-- Expand on this explanation adding snippets  -->
To try the project you will need to:
1. Deploy the Hello NEAR contract. A compiled version is available in `/test/aux_contracts/hello-near.wasm`.
2. Deploy the Cross Contract Example. A compiled version is available in `/out/main.wasm`.
3. Initialize the cross-contract example using the account's address of the `hello-near` contract deployed in (1).
4. Call `set_greeting` and `get_greeting` in the cross-contract example.

---

## Structure of the Project

The project is organized as follows:

1. The smart contract code is in the `/contract` folder.
2. The compiled smart contract can be found in `/out/main.wasm`.
3. A compiled `Hello NEAR` contract can be found in `/test/aux_contracts/hello-near.wasm`.

### Contract
The contract exposes methods to query the greeting and change it. These methods do nothing but calling `get_greeting` and
`set_greeting` in the `hello-near` example.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/lib.rs"
            start="25" end="56" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/index.ts"
            start="11" end="45"/>
  </Language>
</CodeTabs>

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. They are written in the
same language as the smart contract is. For AssemblyScript, you will find the test in the 
`__tests__` folder. If your contract is in Rust you will find the tests at the bottom of
each `.rs` file.

Since this example handles Cross-contract calls, in the unit tests we only test the `initialize`
method works. This is because unit tests are **cannot test** cross-contract calls.

### Integration test

In this project in particular, the integration tests first deploy the `hello-near` contract. Then,
they test that the cross-contract call correctly sets and retrieves the message. You will find the integration tests
in `test/`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/test/cross-hello.test.js"
            start="10" end="36" />
  </Language>
</CodeTabs>

---

## Moving Forward

A nice way to learn is by trying to expand a contract. Modify the cross contract example to use the [guest-book](guest-book.md)
contract!. In this way, you can try to make a cross-contract call that attaches money. Remember to correctly [handle the callback](../../2.develop/contracts/crosscontract.md#callback-method),
and to return the money to the user in case of error.
