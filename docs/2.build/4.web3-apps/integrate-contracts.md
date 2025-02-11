---
id: integrate-contracts
title: Integrating Contracts
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate NEAR to your frontend, you will leverage two tools:

1. `Wallet Selector`: Enables the user to select their preferred NEAR wallet in your dApp.
2. `NEAR API JS`: A suite of tools to interact with the NEAR RPC.

Using those tools you will implement the following flow:

1. **Setup** a wallet selector.
1. Load the wallet selector **on start-up**.
2. Ask the user to **sign-in** using a NEAR wallet.
2. **Call methods** in the contract.


:::warning NEAR BOS

  The project known as NEAR Blockchain Operating System (NEAR BOS) has been deprecated, but you can find its documentation on [this link](https://deprecated-near.github.io/legacy-docs/components/what-is)

:::

<details>

<summary> Alternatives to `near-api-js` </summary>

You can optionally use [Naxios](https://wpdas.gitbook.io/naxios). A promise-based NEAR Contract and NEAR Wallet Client for browser.

Naxios was designed to facilitate the React / Next.js integration with NEAR Blockchain and avoid the boilerplate of setting up a wallet and contract.

</details>


<details markdown="1">

<summary> Decentralized Frontend Solutions </summary>

If you need full decentralization of your entire stack, this option is ideal. However, consider the possible technical constraints, such as the absence of server-side rendering or meta frameworks like Next.js.

Although the ecosystem for developing decentralized frontends is still maturing, here are some notable projects for you to evaluate and consider:

| Name                                                                                      | <div align="center">Description</div>                                                                                                          |
|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| [**IPFS**](https://docs.ipfs.tech/how-to/websites-on-ipfs/single-page-website/)           | A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web upgradeable, resilient, and more open. |
| [**Fleek**](https://docs.fleek.co/tutorials/hosting/)                                     | Hosts websites on IPFS with a user-friendly interface and continuous deployment from popular repositories.                                     |
| [**Arweave**](https://www.arweave.org/build)                                              | Arweave lets you build quickly and simply with permanent storage. You can store anything from files to fully decentralized web applications.   |
| [**Web4**](https://web4.near.page/)                                                       | Web4 is a new way to distribute decentralized apps on NEAR Protocol. Deploy single WASM smart contract to deploy an entire web application.    |
| [**B.O.S. Components**](https://deprecated-near.github.io/legacy-docs/components/what-is) | An experimental platform that allows users to build and deploy multi-chain decentralized UI experiences.                                       |

</details>

---


## Adding NEAR API JS and Wallet Selector
As a popular framework [our examples](https://github.com/near-examples/) are based on **Next.js** so, we will go trough the steps to integrate NEAR to a default Next.js project and interact with the hello-near contract.

<details>

<summary> Alternative frontend templates </summary>

You can also choose to start from community templates such as:
* [NEARBuilders/NEAR-Vite-Starter](https://github.com/NEARBuilders/near-vite-starter) - [TODO] Includes Vite
* [Bitte/Next-Wallet-Starter](https://templates.mintbase.xyz/templates/starter-next) -  [TODO]

</details>

In order to use `near-api-js` and the `wallet-selector` you will need to first add them to your project. We will also add few of the popular wallet providers.

```bash
npm install \
  near-api-js \
  @near-wallet-selector/core \
  @near-wallet-selector/modal-ui \
  @near-wallet-selector/ledger \
  @near-wallet-selector/meteor-wallet \
  @near-wallet-selector/nightly \
  @near-wallet-selector/bitte-wallet 
```
:::tip

The wallet selector supports multiple wallet packages to select from, [see the full list on their Repo](https://github.com/near/wallet-selector#installation-and-usage).  
We cover how to support Ethereum wallets in the next section: [Ethereum Wallets on Near](ethereum-wallets.md)
:::

---

## Create a Wallet Object

In our examples, we implement a [`./wallets/near.js`](https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js) module, where we abstracted the `wallet selector` into a `Wallet` object to simplify using it.

To create a wallet, simply import the `Wallet` object from the module and initialize it. This `wallet` will later allow the user to call any contract on NEAR.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="page.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/app/page.tsx"
            start="8" end="12" />

    <Github fname="near.js"
        url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
        start="17" end="213" />

  </Language>
</CodeTabs>

Under the hood (check the `near` tab) you can see that we are actually setting up the wallet selector, and asking it if the user logged-in already. During the setup, we pass a hook to the wallet selector, which will be called each time a user logs in or out.

<details markdown="1" id="setting-customs-rpc-endpoints">

<summary> Setting customs RPC endpoints </summary>

If you want to use a user-defined RPC endpoint with the Wallet Selector, you need to set up a [network options](https://github.com/near/wallet-selector/tree/main/packages/core#options) object with the custom URLs.
For example:

<CodeTabs>
  <Language value="js" language="ts">

```js title="index.js"
const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;

const my_network = {
    networkId: "my-custom-network",
    nodeUrl: "https://rpc.custom-rpc.com",
    helperUrl: "https://helper.custom-helper.com",
    explorerUrl: "https://custom-explorer.com",
    indexerUrl: "https://api.custom-indexer.com",
  };

const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS, network: my_network });
```

</Language>

</CodeTabs>

:::tip

You can find the entire Wallet Selector [API reference here](https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/selector.md).

:::

</details>

#### Function Call Key
When instantiating the wallet you can choose if you want to **create a [Function-Call Key](/concepts/protocol/access-keys#function-call-keys)**.

If you create the key, your dApp will be able to **automatically sign non-payable transactions** on behalf of the user for contract specified.

---

## Calling View Methods

Once the wallet is up we can start calling view methods, i.e. the methods that perform read-only operations.

Because of their read-only nature, view methods are **free** to call, and do **not require** the user to be **logged in**.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/pages/hello-near/index.js"
            start="12" end="25" />

    <Github fname="near.js"
        url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
        start="76" end="96" />

</Language>

</CodeTabs>

The snippet above shows how we call view methods in our examples. Switch to the `near-wallet` tab to see under the hood: we are actually making a **direct call to the RPC** using `near-api-js`.

:::tip

View methods have by default 200 TGAS for execution

:::

---

## User Sign-In / Sign-Out

In order to interact with non-view methods it is necessary for the user to first sign in using a NEAR wallet.

Signing in is as simple as requesting the `wallet` object to `signIn`, the same simplicity applies to signing out.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="navigation.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/app/components/navigation.js"
            start="6" end="30" />

    <Github fname="near.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
            start="60" end="74" />

  </Language>
</CodeTabs>

When the user clicks the login button, they will be asked to select a wallet and use it to log in.

<hr className="subsection" />

### Function Call Key

If you instantiated the `Wallet` passing an account for the `createAccessKeyFor` parameter, then the wallet will create a [Function-Call Key](/concepts/protocol/access-keys#function-call-keys) and store it in the web's local storage.

```jsx
const wallet: Wallet = new Wallet({
  createAccessKeyFor: HelloNearContract,
  networkId: NetworkId,
});
```

By default, such key enables to expend a maximum of `0.25Ⓝ` on GAS calling methods in **the specified** contract **without prompting** the user to sign them.

If, on the contrary, you do not create an access key, then the user will be asked to sign every single transaction (except calls to `view methods`, since those are always free).

:::tip

Please notice that this only applies to **non-payable** methods, if you attach deposit to any call the user will **always** be redirected to the wallet to confirm the transaction.

:::

---

## Calling Change Methods

Once the user logs in they can start calling `change methods`. Programmatically, calling `change methods` is similar to calling `view methods`, only that now you can attach deposit to the call, and specify how much GAS you want to use.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="index.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/app/page.tsx"
            start="37" end="41" />

    <Github fname="near.js"
        url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
        start="98" end="124" />

</Language>

</CodeTabs>

Under the hood (see `near-wallet` tab) we can see that we are actually asking the **wallet** to **sign a Function-Call transaction** for us.

:::tip

Remember that you can use the `wallet` to call methods in **any** contract. If you did not ask for a function key to be created, the user will simply be prompted to confirm the transaction.

:::

<hr className="subsection" />

## Sending Multiple Transactions

The Wallet class also exposes a method that can be used to send multiple transactions.

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
            start="171" end="180" />

</Language>

</CodeTabs>

Transactions can either be sent as multiple separate  transactions simultaneously or as a batch transaction made up of actions where if one of the actions fails, they are all reverted. An example of both can be seen [here](https://docs.near.org/tutorials/examples/frontend-multiple-contracts#dispatching-multiple-transactions)

---

## Querying Account Balance

By calling the `getBalance` method the user can get the balance of the account that is currently logged in.

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
            start="144" end="169" />

</Language>

</CodeTabs>

---

## Get Access Keys

The final method the Wallet class exposes is `getAccessKeys` which is used to return an object of all the access keys on the account that is currently logged in.

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/flmel/near-starter-nextjs/blob/main/src/wallets/near.js"
            start="182" end="200" />

</Language>

</CodeTabs>

---

## Handling Data Types

When calling methods in a contract, or receiving results from them, you will need to correctly encode/decode parameters. For this, it is important to know how the contracts encode timestamps (u64) and deposit amounts (u128).

##### Time

The block timestamp in a smart contract is encoded using nanoseconds (i.e. 19 digits: `1655373910837593990`). In contrast, `Date.now()` from javascript returns a timestamp in milliseconds (i.e 13 digits: `1655373910837`). Make sure to convert between milliseconds and nanoseconds to properly handle time variables.

##### Deposits

Smart contracts speak in yocto NEAR, where 1Ⓝ = 10^24yocto, and the values are always encoded as `strings`.

- Convert from NEAR to yocto before sending it to the contract using `near-api-js.utils.format.parseNearAmount(amount.toString())`.
- Convert a response in yoctoNEAR to NEAR using `near-api-js.utils.format.formatNearAmount(amount)`

:::tip

If the contract returns a `Balance` instead of a `U128`, you will get a "scientific notation" `number` instead of a `string` (e.g. `10^6` instead of `"1000000"`). In this case, you can convert the value to NEAR by doing:

```js
function formatAmount(amount) {
  let formatted = amount.toLocaleString('fullwide', { useGrouping: false })
  formatted = utils.format.formatNearAmount(formatted)

  return Math.floor(formatted * 100) / 100
}
```

:::

---

## Leveraging NEAR API JS

NEAR API JS does not limit itself to simply calling methods in a contract. In fact, you can use it to transform your web-app into a rich user experience. While we will not cover these topics in depth, it is important for you to know that with NEAR API JS you can also:

- **[Sign and verify messages](./backend/backend.md)**: this is very useful to prove that a message was created by the user.
- **[Create batch transactions](https://github.com/near/near-api-js/tree/master/packages/cookbook/transactions/batch-transactions.ts)**: this enables to link multiple [actions](../../1.concepts/protocol/transaction-anatomy.md#actions) (e.g. multiple function calls). If one of the transactions fails, then they are all reverted.
- **[Create accounts](https://github.com/near/near-api-js/tree/master/packages/cookbook/accounts/create-testnet-account.ts)**: deploy accounts for your users!

Check the [NEAR API](../../4.tools/near-api.md) section to learn how to supercharge your web-app.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- next: `15.1.6`
- near-api-js: `^5.0.1`
- wllet-selector/core: `^8.9.16`

:::
