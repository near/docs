---
id: donation
title: Donation
description: "Build a donation smart contract that accepts NEAR tokens, tracks donations, and distributes funds to beneficiaries with transparent accounting."
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

While users can already "donate" to others by transferring tokens with their wallet or through an exchange, it's not the best UX compared to a donation app. You would need to carefully write the wallet address to send tokens to, and you'd have to query the blockchain using something like an [indexer](../../tools/indexing) for the app to display recipients and donation amounts, which is **not efficient**.

Instead, we can make an app use a smart contract that handles token transfers and tracks relevant data.

With a smart contract, we can set a beneficiary, and we can track donors and their total donation amounts, similar to how platforms like *Ko-fi* and *Buy Me a Coffee* work. Then the app's frontend can fetch this data from the smart contract easily and show a more user-friendly UI for sending donations.

In this tutorial, we'll set up an example donation app and learn how to implement a smart contract for a donations-like service.

![img](/docs/assets/examples/donation.png)
_Frontend of the Donation App_

---

## Obtaining the Donation Example

You have two options to start the Donation Example.

1. Use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                      | Clone locally                                               |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/donation-examples) | 🌐 `https://github.com/near-examples/donation-examples.git` |

The example is divided in two main components:

1. The smart contract, available in two flavors: Rust and TypeScript
2. The frontend, which interacts with an already deployed contract.

---

## Smart Contract

The contract's state consists of:
- A `beneficiary` account ID
- A `donations` map of (account ID, token amount) pairs

The contract has the following methods:
- A call function `donate` to send tokens to the beneficiary
- A view function `get_beneficiary` to get the current beneficiary
- A view function `get_donation_for_account` to retrieve the recorded donations for a specific account
- A view function `number_of_donors` to get the total number of donors
- A view function `get_donations` to get a specific range of donations, used for pagination in the app

#### Project structure for the contract:

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 Typescript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── src
│    │    └── main.ava.ts
│    ├── ava.config.cjs
│    └── package.json
├── src # contract's code
│    ├── contract.ts
│    ├── model.ts
│    └── utils.ts
├── package.json # package manager
├── README.md
└── tsconfig.json # test script
```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

```bash
┌── tests # workspaces testing
│    ├── workspaces.rs
├── src # contract's code
│    ├── donation.rs
│    └── lib.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

#### Source code for the contract:

<CodeTabs>
  <Language value="ts" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
            start="16" end="44" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
            start="17" end="74" />
  </Language>
</CodeTabs>

<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract, you will need a NEAR account. Create one if you don't have one already.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account pre-funded by a faucet
  near create-account <accountId> --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account pre-funded by a faucet
  near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Go into the directory containing the smart contract (`cd contract-ts` or `cd contract-rs`), and then build and deploy it:

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 Typescript">

    ```bash
    npm run build
    near deploy <accountId> ./build/donation.wasm
    ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cargo near deploy build-non-reproducible-wasm <accountId>
  ```

  </TabItem>

</Tabs>

<hr class="subsection" />

### Testing the Contract

After building and deploying the contract, you can test it through the [CLI](#cli-interacting-with-the-contract) or the [frontend](#frontend).

The contract also includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 Typescript">

  ```bash
  cd contract-ts
  yarn
  yarn test
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
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

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

#### Get donations

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view donation.near-examples.testnet get_donations '{"from_index": "0","limit": "10"}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only donation.near-examples.testnet get_donations json-args '{"from_index": "0","limit": "10"}' network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

#### Get beneficiary

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view donation.near-examples.testnet get_beneficiary
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only donation.near-examples.testnet get_beneficiary json-args {} network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

#### Get number of donors

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view donation.near-examples.testnet number_of_donors
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only donation.near-examples.testnet number_of_donors json-args {} network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

#### Get donation for an account

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Require accountId
  near view donation.near-examples.testnet get_donation_for_account '{"account_id":<accountId>}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Require accountId
  near contract call-function as-read-only donation.near-examples.testnet get_donation_for_account json-args '{"account_id":<accountId>}' network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

#### Donate to the contract

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Replace <accountId> with your account ID
  # Require deposit
  near call donation.near-examples.testnet donate --accountId <accountId> --deposit 0.1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Replace <accountId> with your account ID
  # Require deposit
  near contract call-function as-transaction donation.near-examples.testnet donate json-args {} prepaid-gas '30.0 Tgas' attached-deposit '0.1 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

:::tip
If you're using your own account, replace `donation.near-examples.testnet` with your `accountId`.
:::

---

## Frontend

The donation example includes a frontend that interacts with an already deployed smart contract, allowing the user to donate NEAR tokens to a faucet service.

<hr class="subsection" />

### Running the Frontend

To start the frontend, install the dependencies and start the server. The example is a Next.js project, so you can install and run it like any other Next.js project:

```bash
cd frontend
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To test, login with your NEAR account. If you don't have one, you'll be prompted to create one.

Once logged in, input the amount of NEAR you want to donate and press the donate button. You will be redirected to your NEAR Wallet to confirm the transaction. After confirming it, the donation will be listed in the "Latest Donations".

:::tip
To interact with your own contract from this frontend, simply replace the contract name in the `contractPerNetwork` variable in `config.js`.
:::

<hr class="subsection" />

### Understanding the Frontend

The frontend is a [Next.JS](https://nextjs.org/) project generated by [create-near-app](https://github.com/near/create-near-app). See `DonationsTable.jsx` and `DonationsForm.jsx` to understand how the components interact with the smart contract.

<Language value="js" language="js">
  <Github fname="DonationsTable.jsx"
          url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationsTable.jsx"/>
  <Github fname="DonationsForm.jsx"
          url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationForm.jsx"/>
</Language>

The `DonationsTable.jsx` component is a typical implementation of a table display, but fetches data using the view functions  from the smart contract.

The `DonationsForm.jsx` form handles the donation feature in the `setDonation` function. Notice how we use CoinGecko's free API to display the price of NEAR in USD. This is good enough for the purpose of this tutorial, but you can also use an alternative, such as an [oracle](../../primitives/oracles.md), your own solution, or even omit the price altogether if your app doesn't need it.

---

## Conclusion

In this tutorial, we learned how to create a smart contract to handle token transfers as donations and store them to display in a donations web app. The contract is implemented in both Rust and TypeScript, and the example frontend that consumes the contract is a standard Next.js app.

### What's next?

We can expand the contract further if we want to include other features that a donation service has, such as:
- Accumulating tokens in the contract instead of sending them immediately. Then add a new call function for the `beneficiary` to retrieve the tokens.
- Posting fundraising goals (like *Kickstarter*), where the `beneficiary` can set a goal and time limit with a new call function. If the goal is reached within the time limit, the contract automatically transfers the tokens to the `beneficiary`, otherwise it refunds the tokens to all donators.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
