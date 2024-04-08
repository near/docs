---
id: count-near
title: NEAR 숫자 세기
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 숫자 세기 예제는 숫자를 저장하고 `increment`, `decrement`, 그리고 `reset` 메서드를 공개하는 친근한 탈중앙화 앱입니다

![img](/docs/assets/examples/count-on-near-banner.png)

---

## Obtaining the Counter Example

You have two options to start the Counter Example.

1. You can use the app through `GitHub Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                             | Clone locally                                 |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/counters) | 🌐 `https://github.com/near-examples/counters` |

---

## Structure of the Example

The example is divided in two main components:

1. The smart contract, available in two flavors: Rust and JavaScript
2. The frontend, that interacts with an already deployed contract.

<Tabs>

  <TabItem value="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── src
│    │    └── main.ava.ts
│    ├── ava.config.cjs
│    └── package.json
├── src # contract's code
│    └── contract.ts
├── package.json # package manager
├── README.md
└── tsconfig.json # test script
```

  </TabItem>

  <TabItem value="🦀 Rust">

```bash
┌── src # contract's code
│    └── lib.rs
├── tests # sandbox test
│    └── test_basics.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Frontend

The counter example includes a frontend interface designed to interact seamlessly with an existing smart contract that has been deployed. This interface allows users to increase or decrease the counter as needed.

<hr class="subsection" />

### Running the Frontend

To start the frontend you will need to install the dependencies and start the server.

```bash
cd frontend
yarn
yarn start
```

계속해서 NEAR 계정으로 로그인하세요. 계정이 없는 경우 즉시 만들 수 있습니다. 로그인한 후 `+` 및 `-` 버튼을 사용하여 숫자를 높이거나 낮춥니다. 그런 다음 Gameboy 버튼을 사용하여 재설정하고 카운터가 눈을 깜박이게 만드세요!

![img](/docs/assets/examples/count-on-near.png) _Frontend of the Counter_

<hr class="subsection" />

### Understanding the Frontend

The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/index.js`, which communicates with the contract through `/near-wallet.js`. You will notice in `/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/counters/blob/main/frontend/index.js"
            start="10" end="21" />
  </Language>
</CodeTabs>

위 코드에서, 앱이 시작될 때 사용자가 이미 로그인되어 있는지 확인하고 `signedInFlow()` 또는 `signedOutFlow()`를 실행함을 알 수 있습니다.

---

## Smart Contract

컨트랙트에는 `get_num`, `increment`, `decrement`, 그리고 `reset`이라는 네 가지 메서드가 있습니다. `get_num` 메서드는 현재 값을 반환하고, 나머지 메서드들은 값을 수정합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/counters/blob/main/contract-ts/src/contract.ts"
            start="3" end="29" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/counters/blob/main/contract-rs/src/lib.rs"
            start="5" end="39" />
  </Language>
</CodeTabs>

---

### Testing the Contract

The contract readily includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs>
  <TabItem value="🌐 JavaScript">

```bash
cd contract-ts
yarn
yarn test
```

  </TabItem>
  <TabItem value="🦀 Rust">
  
  ```bash
  cd contract-rs
  cargo test
  ```

  </TabItem>

</Tabs>

:::tip The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract. :::

<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to [create a NEAR account](/develop/contracts/quickstart#create-a-testnet-account).

<Tabs>
  <TabItem value="🌐 JavaScript">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-ts
yarn build
near deploy <accountId> ./build/counter.wasm
```

  </TabItem>
  <TabItem value="🦀 Rust">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-rs
cargo build
near deploy <accountId> ./target/wasm32-unknown-unknown/release/counter.wasm
```

  </TabItem>
</Tabs>

:::tip To interact with your contract from the [frontend](#frontend), simply replace the variable `CONTRACT_NAME` in the `index.js` file. :::

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands

```bash
# Get the current number of the counter
near view counter.near-examples.testnet get_num

# Increment the counter 
# Replace <accountId> with your account ID
near call counter.near-examples.testnet increment --accountId <accountId>

# Decrement the counter
# Replace <accountId> with your account ID
near call counter.near-examples.testnet decrement --accountId <accountId>

# Reset the counter to zero 
# Replace <accountId> with your account ID
near call counter.near-examples.testnet reset --accountId <accountId>
```

:::tip If you're using your own account, replace `counter.near-examples.testnet` with your `accountId`. :::

---

## Moving Forward

A nice way to learn is by trying to expand the contract. `increment` 및 `decrement`에 인자를 추가하여, 사용자가 변화시킬 값의 정도를 선택할 수 있도록 수정해 보세요. For this, you will need to use knowledge from the [anatomy](../../2.develop/contracts/anatomy.md) and [storage](../../2.develop/contracts/storage.md) sections.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
