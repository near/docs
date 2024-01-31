---
id: donation
title: Donation
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Our donation example enables to forward money to an account while keeping track of it.
It is one of the simplest examples on making a contract receive and send money, and the
perfect gateway to enter the world of decentralized finance.

![img](/docs/assets/examples/donation.png)

---

## Starting the Donation Example

You have two options to start the Donation Example. The first and recommended is to use the app through Gitpod, which will open a web-based interactive environment. The second option is to clone the repository locally, for which you will need to install all the [Prerequisites](../../2.develop/prerequisites.md).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript" >

  | Codespaces                                                                                                                                                                               | Clone locally                                                     |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
  | [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/donation-examples) | 🌐 `https://github.com/near-examples/donation-js.git` |

  </TabItem>
  <TabItem value="🦀 Rust">

| Codespaces                                                                                                                                                                               | Clone locally                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/donation-examples) | 🦀 `https://github.com/near-examples/donation-rust.git` |

  </TabItem>

</Tabs>

If you choose Gitpod a new browser window will open automatically with the code. The project will compile and eventually the frontend will open in a new window/tab (make sure the pop-up window is not blocked).

If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd donation
yarn
yarn deploy
yarn start
```

Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the dApp

Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, input the amount of NEAR you want
to donate and press the donate button. You will be redirected to the NEAR Wallet to confirm the transaction. After confirming it, the donation will be listed
in the "Latest Donations".

![img](/docs/assets/examples/donation.png)
*Frontend of the Donation App*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract

The contract exposes methods to donate money (`donate`), and methods to retrieve the recorded donations (e.g. `get_donation_by_number`).

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
            start="16" end="44" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
            start="20" end="49" />
  </Language>
</CodeTabs>

### Frontend

The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.
The website's logic lives in `/assets/js/index.js`, which communicates with the contract through `/assets/js/near/utils.js`.

An interesting aspect of the donation example is that it showcases how to retrieve a result after being redirected to the
NEAR wallet to accept a transaction.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/donation-examples/blob/main/frontend/index.js"
            start="71" end="93" />
    <Github fname="near-interface.js"
            url="https://github.com/near-examples/donation-examples/blob/main/frontend/near-interface.js"
            start="29" end="32" />
    <Github fname="near-wallet.js"
            url="https://github.com/near-examples/donation-examples/blob/main/frontend/near-wallet.js"
            start="105" end="113" />
  </Language>
</CodeTabs>

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. They are written in the
same language as the smart contract is.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
            start="63" end="92" />
  </Language>
</CodeTabs>

### Integration test

Integration tests are generally written in javascript. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests
in `tests/integration-tests`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-ts/src/main.ava.ts"
            start="50" end="73" />
  </Language>
</CodeTabs>

---

## Moving Forward

A nice way to learn is by trying to expand a contract. Modify the donation example so it accumulates the money in the contract
instead of sending it immediately. Then, make a method that only the `beneficiary` can call to retrieve the money.
