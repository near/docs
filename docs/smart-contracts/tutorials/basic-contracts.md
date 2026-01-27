---
id: basic-contracts
title: Using our Basic Examples
description: "Learn NEAR smart contract basics through practical examples: Counter, Guest Book, Donation, Coin Flip, and Hello World."
---

import {CodeTabs, Language, Github} from '@site/src/components/UI/Codetabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from '@site/src/components/UI/Card';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

We have created a selection of basic smart contracts to help you get started building Smart Contracts on NEAR.

![img](/assets/docs/smart-contracts/tutorials/basic-contracts.png)

These examples cover fundamental concepts such as state management, function calls, and token interactions. Each example is designed to be simple and easy to understand, making them perfect for beginners.

:::tip

Before tackling these examples, be sure to follow our [Quickstart Guide](../quickstart.md)

:::

---

## Examples

<div className="row" style={{ marginTop: '2rem', gridGap: '2rem 1.5rem' }}>
  <div className="auto-col">
    <Card
      variant="image"
      image="/assets/docs/tutorials/examples/hello-near-landing-page.png"
      title="Hello World"
      href="https://github.com/near-examples/hello-near-examples"
      target="_blank"
    >
      <p>A simple smart contract that stores a `string` message on its state</p>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="image"
      image="/assets/docs/tutorials/examples/count-on-near-banner.png"
      title="Counter"
      href="https://github.com/near-examples/counters"
      target="_blank"
    >
      <p>A friendly counter that stores a number with methods to increment, decrement, and reset it</p>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="image"
      image="/assets/docs/tutorials/examples/guest-book.png"
      title="Guest Book"
      href="https://github.com/near-examples/guest-book-examples"
      target="_blank"
    >
      <p>Users can sign the guest book, optionally paying `0.01 Ⓝ` to mark their messages as "premium</p>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="image"
      image="/assets/docs/tutorials/examples/donation.png"
      title="Donation"
      href="https://github.com/near-examples/donation-examples"
      target="_blank"
    >
      <p>Forward NEAR tokens to a beneficiary while tracking all donations. Learn how contracts handle token transfers</p>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="image"
      image="/assets/docs/tutorials/examples/coin-flip.png"
      title="Coin Flip"
      href="https://github.com/near-examples/coin-flip-examples"
      target="_blank"
    >
      <p>Guess the outcome of a coin flip and earn points. Demonstrates how to handle randomness on the blockchain</p>
    </Card>
  </div>
</div>

---

## Structure of the Examples

All examples follow a consistent structure, making it easy to navigate between them. Each repository contains the **same smart contract** implemented in **Rust**, **Javascript**, and sometimes **Python**, along with a **simple frontend** to interact with the contract.

```bash
┌── contract-rs # contract's code in Rust
│    ├── src    # contract's code
│    ├── tests  # sandbox test
│    ├── Cargo.toml
│    └── rust-toolchain.toml
├── contract-ts # contract's code in Typescript
│    ├── src    # contract's code
│    ├── sandbox-test  # sandbox test
│    ├── package.json
│    └── tsconfig.json
├── contract-py # contract's code in Python (some examples)
│    ├── contract.py  # contract's code
│    ├── tests        # sandbox test
│    ├── pyproject.toml
│    └── uv.lock
├── frontend    # React + Next.JS frontend
│    ├── src    # frontend's implementation
│    ├── public 
│    ├── package.json
│    ├── next.config.js
│    └── jsconfig.json
└── README.md
```

---

## Frontend

Each example includes a **Next.JS** frontend that is very simple to start:

```bash
cd frontend
yarn
yarn dev
```

These frontends are useful to demonstrate how to connect a web application to NEAR, as well as how to interact with the smart contracts.

:::tip
Each frontend connects to a **pre-deployed version of the contract**. Check `./frontend/config.js` to see which contract is being used, or change it to your own deployed contract
:::

<hr class="subsection" />

### NEAR Connector Hooks

All frontends use [`near-connect-hooks`](https://www.npmjs.com/package/near-connect-hooks), which wrap the functionality of [NEAR Connector](../../web3-apps/tutorials/wallet-login.md) to handle the connection between the web app and the NEAR blockchain.

The `near-connect-hooks` expose a `NearProvider` that is used to wrap the entire application, usually in `pages/_app.js`:

```jsx
import { NearProvider } from "near-connect-hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NearProvider>
      <Navigation />
      <Component {...pageProps} />
    </NearProvider>
  );
}
```

<br />

We can then use the **`useNearWallet` hook** within any component to access all NEAR-related functionality, such as login/logout, view and call functions, and sign transactions:

```jsx
import { useNearWallet } from 'near-connect-hooks';

export default function App() {
  // Login / Logout functionality
  const { loading, signIn, signOut, signedAccountId } = useNearWallet();

  // To interact with the contract
  const { viewFunction, callFunction, signAndSendTransactions } = useNearWallet();
}
```

---

## Smart Contract

All repositories include the same smart contract implemented in different languages, including **Rust**, **Javascript**, and sometimes **Python**.

The contracts are implemented following the latest versions of each SDK, and include sandbox tests showcasing how to properly test smart contracts in a realistic environment. 

<hr class="subsection" />

### Testing

Each contract includes sandbox tests that simulate real user interactions. For example, in the `Guest Book` example, the tests cover scenarios like having multiple accounts signing the guest book, including premium messages.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
  
```bash
cd contract-rs
cargo test
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
cd contract-ts
yarn
yarn test
```

  </TabItem>
  <TabItem value="python" label="🐍 Python">
  
```bash
cd contract-py
uv run pytest
```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Creating an Account

All smart contracts can be built and deployed using the `NEAR CLI`. A good first step is to always create a new NEAR account to deploy your contract:

```bash
near create-account <accountId> --useFaucet
```

:::tip

Here we are using the `--useFaucet` flag to create a new account and pre-fund it with the [testnet faucet](../../faucet.md)

:::

<hr class="subsection" />

### Building & Deploying

Once you created an account to host the contract, you can build and deploy it: 

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
  
```bash
cd contract-rs
cargo near deploy build-non-reproducible-wasm <accountId>
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
cd contract-ts
npm run build
near deploy <accountId> ./build/<contract-name>.wasm
```

  </TabItem>
  <TabItem value="python" label="🐍 Python">
  
```bash
cd contract-py
uvx nearc contract.py
near deploy <accountId> <contract-name>.wasm
```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Interacting via CLI

Once your contract is deployed, check the `README.md` of each repository to see the available methods you can call.

As a general guide, the `NEAR CLI` has two main ways to interact with smart contracts:

```bash
# Call a read-only (view) method
near view <contractId> <methodName>

# Call a method that changes state
near call <contractId> <methodName> <arguments> --useAccount <yourAccount>

# Call a method and attach NEAR tokens
near call <contractId> <methodName> <arguments> --useAccount <yourAccount> --deposit 1
```

:::tip
Check each repository's README for the specific methods available in that contract.
:::

---

## Moving Forward

After exploring these basic examples, you can:

- **Modify the contracts** - Try adding new functionality to deepen your understanding
- **Learn the fundamentals** - Check out [Contract Anatomy](../../smart-contracts/anatomy/anatomy.md) and [Storage](../../smart-contracts/anatomy/storage.md)
<!-- - **Explore advanced examples** - See [Cross-Contract Calls](./xcc.md) and [Factory Contracts](./factory.md) -->

<MovingForwardSupportSection />
