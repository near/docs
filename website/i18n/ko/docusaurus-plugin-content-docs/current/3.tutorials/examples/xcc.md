---
id: xcc
title: 교차 컨트랙트 호출(Cross Contract Call)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 예제는 가능한 가장 간단한 교차 컨트랙트 호출을 수행합니다. 인사말을 설정하고 검색하기 위해 [Hello NEAR](hello-near.md) 예제를 호출합니다. 이는 교차 컨트랙트 호출에 대한 가장 간단한 예 중 하나이며, 상호 작용 컨트랙트의 세계로 들어가는 완벽한 관문입니다.

:::info Advanced Cross-Contract Calls Check the tutorial on how to perform cross-contract calls [in batches and in parallel](./advanced-xcc) :::

---

## Obtaining the Cross Contract Call Example

You have two options to start the project:

1. You can use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                                      | Clone locally                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

---

## Structure of the Example

The smart contract is available in two flavors: Rust and JavaScript

<Tabs>

  <TabItem value="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── hello-near
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    └── contract.ts
├── package.json
├── README.md
└── tsconfig.json
```

  </TabItem>

  <TabItem value="🦀 Rust">

```bash
┌── tests # sandbox testing
│    ├── hello-near
│    │    └── hello-near.wasm
│    └── tests.rs
├── src # contract's code
│    ├── external.rs
│    └── lib.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Smart Contract

### Contract
컨트랙트는 인사말을 쿼리하고 변경하는 메서드를 공개합니다. 이러한 메서드는 `hello-near` 예제에서 `get_greeting` 및 `set_greeting` 호출만 수행합니다.

<CodeTabs>
<Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="17" end="39" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="25" end="50" />
            <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external.rs" />
  </Language>
</CodeTabs>

### Testing the Contract

The contract readily includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs>
  <TabItem value="🌐 JavaScript">

```bash
cd contract-simple-ts
yarn
yarn test
```

  </TabItem>
  <TabItem value="🦀 Rust">
  
  ```bash
  cd contract-simple-rs
  cargo test
  ```

  </TabItem>

</Tabs>

:::tip The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract. :::

In this project in particular, the integration tests first deploy the `hello-near` contract. Then, they test that the cross-contract call correctly sets and retrieves the message. You will find the integration tests in `sandbox-ts/` for the JavaScript version and in `tests/` for the Rust version.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/sandbox-ts/main.ava.ts"
            start="8" end="52" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/tests/tests.rs"
            start="4" end="77" />
  </Language>
</CodeTabs>

<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to create a NEAR account.

<Tabs>
  <TabItem value="🌐 JavaScript">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-simple-ts
yarn build
near deploy <accountId> ./build/cross_contract.wasm init --initFunction init --initArgs '{"hello_account":"hello.near-example.testnet"}'
```

  </TabItem>
  <TabItem value="🦀 Rust">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-simple-rs

cargo near build

# During deploying pass {"hello_account":"hello.near-example.testnet"} as init arguments
cargo near deploy <accountId>
```
  </TabItem>
</Tabs>

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

```bash
# Get message from the hello-near contract
# Replace <accountId> with your account ID
near call <accountId> query_greeting --accountId <accountId>

# Set a new message for the hello-near contract
# Replace <accountId> with your account ID
near call <accountId> change_greeting '{"new_greeting":"XCC Hi"}' --accountId <accountId>
```

---

## 더 알아보기

배울 수 있는 좋은 방법은 컨트랙트를 확장하는 것입니다. [방명록](guest-book.md) 컨트랙트를 사용하도록 교차 컨트랙트 예제를 수정합니다! 이런 식으로 돈을 붙이는 교차 컨트랙트 호출을 시도할 수 있습니다. Remember to correctly [handle the callback](../../2.build/2.smart-contracts/anatomy/crosscontract.md#callback-method), and to return the money to the user in case of error.

### 고급 교차 컨트랙트 호출

컨트랙트 여러 교차 컨트랙트 호출을 동시에 수행할 수 있고, 이를 병렬로 실행되는 Promise 생성 혹은 배치(Batch) 트랜잭션으로 수행할 수 있습니다. Check the [advanced cross contract calls tutorial](./advanced-xcc) to learn more.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
