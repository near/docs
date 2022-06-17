---
id: frontend
title: Make a Web Frontend
---
import {CodeTabs, Language, Github} from "@site/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The most common way to interact with a smart contract is through a web frontend. To simplify this task we have built the [NEAR API Javascript](https://github.com/near/near-api-js). While the near-api-js actually allows you to do a [multitude of things](https://docs.near.org/docs/api/naj-cookbook), here we will focus on how to use it to interact with a contract. Particularly, how to:

1. **Connect** your frontend to the contract.
2. **Sign-in** users in your app using the NEAR wallet.
3. **Call methods** in the contract.

---

### Adding NEAR API JS
In order to use near-api-js you will need to first add it to your project.

<Tabs className="language-tabs">
  <TabItem value="node" label="node">

  ```bash
  npm i near-api-js
  ```
    
  </TabItem>
  <TabItem value="html" label="HTML">

  ```html
  <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.44.2/dist/near-api-js.min.js" integrity="sha256-W5o4c5DRZZXMKjuL41jsaoBpE/UHMkrGvIxN9HcjNSY=" crossorigin="anonymous"></script>
  ```

  </TabItem>
</Tabs>



---

## Connecting to a Contract
The first step on using a smart contract from a web-frontend is connecting to it. Connecting to the smart contract is actually composed by 3 simple steps:

1. Connecting to the NEAR network (`testnet` or `mainnet`)
2. Initializing a Wallet, representing the user's wallet
3. Initializing a Contract, representing the contract itself
 
In our examples we always do this within the `initContract` method:

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js" start="1" end="23" />
    <Github fname="config.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/config.js" />
  </Language>
</CodeTabs>

Then, we use `initContract` in the web-app logic to set up a "flow", i.e. a simple `if` where we decide what to do if the user is logged in or not.

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/index.js" start="44" end="54" />
  </Language>
</CodeTabs>

:::info
When initializing the `Contract` object in the snippet above we are passing a dictionary: `nearConfig`. In that dictionary we set: the network to which we want to connect (`testnet` in our snippet), and where to store the user's login information (we store the user's keys in the website's local storage).
:::

---

## Calling View Methods
Once we have setup the connection to the NEAR network and defined the `Contract` object we can readily call view methods. Once more, view methods are those that only read from the contract's state: they do not perform any [action](contracts/actions.md), nor access the [environment], nor write in the storage.

Since view methods only perform read access operations, they are **free** for the end user, and can be called without being logged in.

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="48" end="52" />
  </Language>
</CodeTabs>

In the snippet above if part of our `donation example`, in which we are calling two methods in our contract: `total_donations` and `get_donation_list` to retrieve the last 10 recorded donations. These methods only read from the contract, so they can be used readily without the user needing to log in.

---

## User Sign-in
In order to interact with non-view methods it is necessary to first sign in using a NEAR wallet. Signing in is as simple as requesting the `walletConnection` object to for signing in. Once we want to logout the user, we simply need to request the `walletConnection` to sign out.

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/hello-near-rs/blob/main/frontend/assets/js/near/utils.js"
            start="24" end="36" />
  </Language>
</CodeTabs>

:::info
Signing in actually means that the user's wallet creates and stores an `access key` in the web's local storage. By default, such key enables to expend a maximum of `0.25Ⓝ` on calls **only** to the `changeMethods` defined in the `Contract` object.
:::

---

## Calling Change Methods
Only after the user logs-in they can start calling change methods. Programmatically, calling change methods is similar to calling view methods, only that now you can attach money to the call, and specify how much GAS you want to use. It is important to notice that, if you ask for money to be attached in the call, then the user will be redirected to the NEAR wallet to accept the transaction.

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="63" end="67" />
  </Language>
</CodeTabs>

### Wallet Redirection
If you attach money to a change call, then the user will be redirected to their wallet to accept the transaction. After accepting, the user will be brought back to your website, with the resulting transaction hash being pass as part of the url (i.e. `your-website.com/?transactionHashes=...`).

If the method invoked returned a result, you can use the transaction hash to retrieve the result from the network. Assuming you created the `near` object as in the [example above](#connecting-to-a-contract), then you query the result by doing:

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
  <Github fname="index.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/index.js"
            start="68" end="74" />
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="38" end="41" />
  </Language>
</CodeTabs>

---
## Handling Data Types
When calling methods in a contract, or receiving results from them, you will need to correctly encode/decode parameters. For this, it is important to know how the contracts encode timestamps (u64) and money amounts (u128).

**Time**: The block timestamp in a smart contract is encoded using nanoseconds (i.e. 19 digits: `1655373910837593990`). In contrast, `Date.now()` from javascript returns a timestamp in milliseconds (i.e 13 digits: `1655373910837`). Make sure to convert between milliseconds and nanoseconds to properly handle time variables.

**Money**: Smart contracts speak in yocto NEARs, where 1Ⓝ = 10^24yocto, and the values are always encoded as `strings`. Remember to convert an `amount` from NEAR to yocto before sending it using the near-api-js api `utils.format.parseNearAmount(amount.toString())`. To convert a variable in yⓃ to Ⓝ we recommend using the following snippet:

<Github fname="utils.js"
  url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
  start="71" end="75" language="js" />

---

## Leveraging NEAR API JS
NEAR API JS does not limit itself to simply calling methods in a contract. In fact, you can use it to transform your web-app into a rich user experience. While we will not cover these topics in depth, it is important for you to know that with NEAR API JS you can also:

- **[Sign and verify messages](https://docs.near.org/docs/api/naj-cookbook#verify-signature)**: this is very useful to prove that a message was created by the user.
- **[Create batch transactions](https://docs.near.org/docs/api/naj-cookbook#batch-transactions)**: this enables to link multiple [actions](contracts/actions.md) (e.g. multiple method calls). If one of the transactions fails, then they are all reverted.
- **[Create accounts](https://docs.near.org/docs/api/naj-cookbook#create-account)**: deploy accounts for your users!

Check the [cookbook](https://docs.near.org/docs/api/naj-cookbook) to learn how to supercharge your webapp.