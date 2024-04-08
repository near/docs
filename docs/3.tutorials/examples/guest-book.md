---
id: guest-book
title: Guest Book
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Our Guest Book example is a simple app composed by two main components:

1. A smart contract that stores messages from users, allowing to attach money to them.
2. A simple web-based frontend that displays the last 10 messages posted.

![img](/docs/assets/examples/guest-book.png)

---

## Obtaining the Guest book Example

You have two options to start the Guest book Example.

1. You can use the app through `GitHub Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                        | Clone locally                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/guest-book-examples) | 🌐 `https://github.com/near-examples/guest-book-examples` |

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
│    ├── contract.ts
│    └── model.ts
├── package.json # package manager
├── README.md
└── tsconfig.json # test script
```

  </TabItem>

  <TabItem value="🦀 Rust">

```bash
┌── tests # workspaces testing
│    ├── workspaces.rs
├── src # contract's code
│    └── lib.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Frontend

The guest book example includes a frontend that interacts with an already deployed smart contract, allowing user to sign a message.

<hr class="subsection" />

### Running the Frontend

To start the frontend you will need to install the dependencies and start the server.

```bash
cd frontend
yarn
yarn start
```

Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, you will be able to sign a message in the guest book. You can further send some money alongside your message. If you attach more than 0.01Ⓝ then your message will be marked as "premium".

<hr class="subsection" />

### Understanding the Frontend

The frontend is composed by a single HTML file (`/index.html`) and uses REACT. Check `/App.js` and `/index.js` to understand how
components are displayed in the screen.

You will notice in `/src/App.jsx` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="App.jsx"
            url="https://github.com/near-examples/guest-book-examples/blob/main/frontend/src/App.jsx"/>
  </Language>
</CodeTabs>

It setups the necessary variables and starts the app.

---

## Smart Contract

The contract presents 3 methods: `add_message`, `get_message` and `total_messages`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/guest-book-examples/blob/main/contract-ts/src/contract.ts"
            start="4" end="27" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/guest-book-examples/blob/main/contract-rs/src/lib.rs"
            start="31" end="64" />
  </Language>
  
</CodeTabs>

<hr class="subsection" />

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

:::tip
The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract.
:::

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
near deploy <accountId> ./build/guestbook.wasm
```

  </TabItem>
  <TabItem value="🦀 Rust">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-rs
cargo near build
near deploy <accountId> ./target/wasm32-unknown-unknown/release/guestbook.wasm
```

  </TabItem>
</Tabs>

:::tip
To interact with your contract from the [frontend](#frontend), simply replace the variable `CONTRACT_NAME` in the `index.js` file.
:::

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands

```bash
# Get messages with optional arguments for pagination
near view guestbook.near-examples.testnet get_messages --args='{"from_index": "0","limit": "10"}'

# Get total number of messages
near view guestbook.near-examples.testnet total_messages

# Add a message
# Replace <accountId> with your account ID
# Required a text
# Optional deposit to make the message premium
near call guestbook.near-examples.testnet add_message '{"text":"Hello Near"}' --accountId <accountId> --deposit 0.1
```

:::tip
If you're using your own account, replace `guestbook.near-examples.testnet` with your `accountId`.
:::

---

## Moving Forward

A nice way to learn is by trying to expand a contract. You can modify the guestbook example to incorporate a feature where users can give likes to messages. Additionally, implement a method to toggle the like.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
