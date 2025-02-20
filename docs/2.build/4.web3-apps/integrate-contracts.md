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

In order to use `near-api-js` and the `wallet-selector` you will need to first add them to your project.

The wallet selector has multiple wallet packages to select from, [see in their website](https://github.com/near/wallet-selector#installation-and-usage).

```bash
npm install \
  near-api-js \
  @near-wallet-selector/core \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/ledger \
  @near-wallet-selector/modal-ui
```
---

## Create a Wallet Object

In our examples, we implement a [`./wallets/near.js`](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js) module, where we abstracted the `wallet selector` into a `Wallet` object to simplify using it.

To create a wallet, simply import the `Wallet` object from the module and initialize it. This `wallet` will later allow the user to call any contract in NEAR.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="_app.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/pages/_app.js"
            start="7" end="23" />

    <Github fname="near.js"
        url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
        start="22" end="218" />

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
When instantiating the wallet you can choose if you want to **create a [FunctionCall Key](/concepts/protocol/access-keys#function-call-keys)**.

If you create the key, your dApp will be able to **automatically sign non-payable transactions** for the user on the specified contract.

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
        url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
        start="83" end="103" />

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
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/components/navigation.js"
            start="9" end="23" />

    <Github fname="near.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
            start="67" end="81" />

  </Language>
</CodeTabs>

When the user clicks the login button, they will be asked to select a wallet and use it to log in.

<hr className="subsection" />

### Function Call Key

If you instantiated the `Wallet` passing an account for the `createAccessKeyFor` parameter, then the wallet will create a [FunctionCall Key](/concepts/protocol/access-keys#function-call-keys) and store it in the web's local storage.

```jsx
const wallet = new Wallet({
  createAccessKeyFor: HelloNearContract,
  networkId: NetworkId,
});
```

By default, such key enables to expend a maximum of `0.25Ⓝ` on GAS calling methods in **the specified** contract **without prompting** the user to sign them.

If, on the contrary, you do not create an access key, then the user will be asked to sign every single transaction (except calls to `view methods`, since those are always free).

:::tip

Please notice that this only applies to **non-payable** methods, if you attach money to any call the user will **always** be redirected to the wallet to confirm the transaction.

:::

---

## Calling Change Methods

Once the user logs in they can start calling change methods. Programmatically, calling change methods is similar to calling view methods, only that now you can attach money to the call, and specify how much GAS you want to use.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/pages/hello-near/index.js"
            start="33" end="33" />

    <Github fname="near.js"
        url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
        start="105" end="134" />

</Language>

</CodeTabs>

Under the hood (see `near-wallet` tab) we can see that we are actually asking the **wallet** to **sign a FunctionCall transaction** for us.

:::tip

Remember that you can use the `wallet` to call methods in **any** contract. If you did not ask for a function key to be created, the user will simply be prompted to confirm the transaction.

:::

<hr className="subsection" />

### Wallet Redirection

When calling a change call with **attached deposit** (or any change call if no function call key was created), then the user will be prompted to sign the transaction in the wallet.

If using a web wallet, as opposed to an extension, the user will be redirected to the wallet's website to sign the transaction.
After accepting, the user will be brought back to your application, with the resulting transaction hash being passed as part of the URL (i.e. `your-website.com/?transactionHashes=...`).

If the method invoked returned a result, you can use the transaction hash to retrieve the result from the network. You can fetch the transaction hash via:

```jsx
const txHash = new URLSearchParams(window.location.search).get('transactionHashes');
```

Assuming you created the `near` object as in the [example above](#calling-change-methods), then you query the result by utilizing:

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
            start="136" end="149" />

</Language>

</CodeTabs>

---

## Sending Multiple Transactions

The Wallet class also exposes a method that can be used to send multiple transactions.

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
            start="177" end="186" />

</Language>

</CodeTabs>

Transactions can either be sent as multiple separate  transactions simultaneously or as a batch transaction made up of actions where if one of the actions fails, they are all reverted. An example of both can be seen [here](https://docs.near.org/tutorials/examples/frontend-multiple-contracts#dispatching-multiple-transactions)

---

## Querying Account Balance

By calling the `getBalance` method the user can get the balance of the account that is currently logged in.

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
            start="151" end="175" />

</Language>

</CodeTabs>

---

## Get Access Keys

The final method the Wallet class exposes is `getAccessKeys` which is used to return an object of all the access keys on the account that is currently logged in.

<CodeTabs>
  <Language value="js" language="js">

    <Github fname="near.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js"
            start="188" end="206" />

</Language>

</CodeTabs>

---

## Handling Data Types

When calling methods in a contract, or receiving results from them, you will need to correctly encode/decode parameters. For this, it is important to know how the contracts encode timestamps (u64) and money amounts (u128).

##### Time

The block timestamp in a smart contract is encoded using nanoseconds (i.e. 19 digits: `1655373910837593990`). In contrast, `Date.now()` from javascript returns a timestamp in milliseconds (i.e 13 digits: `1655373910837`). Make sure to convert between milliseconds and nanoseconds to properly handle time variables.

##### Money

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
