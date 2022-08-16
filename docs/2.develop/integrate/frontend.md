---
id: frontend
title: Build the Web Frontend
---
import {CodeTabs, Language, Github} from "@site/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once your contract is deployed it is highly likely that you will want to interact with it from a web frontend.
To simplify this we have built [NEAR JavaScript API](https://github.com/near/near-api-js).
While the near-api-js actually allows you to do a [multitude of things](/tools/near-api-js/cookbook),
here we will focus on how to use it to interact with a contract. Particularly, how to:

1. **Connect** your frontend to the contract.
2. **Sign-in** users in your app using the NEAR wallet.
3. **Call methods** in the contract.

---

### Adding NEAR API JS
In order to use near-api-js you will need to first add it to your project.

<Tabs className="language-tabs" groupId="code-tabs">
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
  <Language value="🌐 JavaScript" language="js">
    <Github fname="utils.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js" start="1" end="23" />
    <Github fname="config.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/config.js" />
  </Language>
</CodeTabs>

Then, we use `initContract` in the web-app logic to set up a "flow", i.e. a simple `if` where we decide what to do if the user is logged in or not.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="utils.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/index.js" start="44" end="54" />
  </Language>
</CodeTabs>

:::info
When initializing the `Contract` object in the snippet above we are passing a dictionary: `nearConfig`. In that dictionary we set: the network to which we want to connect (`testnet` in our snippet), and where to store the user's login information (we store the user's keys in the website's local storage).
:::

---

## Calling View Methods
Once we have setup the connection to the NEAR network and defined the `Contract` object we can readily call view methods.
View methods are those that perform read-only operations, and do not change the contract's state.

Because of their read-only nature, view methods are **free** to call, and do not require the user to be logged in.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="48" end="56" />
  </Language>
</CodeTabs>

The snippet above if part of our `donation example`. On it, we are calling `total_donations` and `get_donation_list` to retrieve the last 10 recorded donations. These methods only read from the contract, so they can be used readily without the user needing to log in.

---

## User Sign-in
In order to interact with non-view methods it is necessary to first sign in using a NEAR wallet. Signing in is as simple as requesting the `walletConnection` object to for signing in. Once we want to logout the user, we simply need to request the `walletConnection` to sign out.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="35" end="35" />
  </Language>
</CodeTabs>

Signing in **actually means** that the user's wallet creates and stores an `access key` in the web's local storage. By default, such key enables to expend a maximum of `0.25Ⓝ` on GAS for calling our contract without asking the user to sign them.
However, if you attach money to any call, the user will be redirected to the wallet to confirm the transaction.


:::tip
You can use `walletConnection.account().function_call` to call **any** method in **any** contract. However, the user will be redirected to the wallet and asked to accept the call.
:::
---

## Calling Change Methods
Only after the user logs-in they can start calling change methods. Programmatically, calling change methods is similar to calling view methods, only that now you can attach money to the call, and specify how much GAS you want to use. It is important to notice that, if you ask for money to be attached in the call, then the user will be redirected to the NEAR wallet to accept the transaction.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="60" end="63" />
  </Language>
</CodeTabs>

:::tip
Remember that you can use `walletConnection.account().function_call` to call methods in **any** contract. However, the user will be redirected to the wallet and asked to accept the call.
:::

### Wallet Redirection
If you attach money to a change call, then the user will be redirected to their wallet to accept the transaction. After accepting, the user will be brought back to your website, with the resulting transaction hash being pass as part of the url (i.e. `your-website.com/?transactionHashes=...`).

If the method invoked returned a result, you can use the transaction hash to retrieve the result from the network. Assuming you created the `near` object as in the [example above](#connecting-to-a-contract), then you query the result by doing:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
  <Github fname="index.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/index.js"
            start="69" end="75" />
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="38" end="42" />
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

- **[Sign and verify messages](https://github.com/near/near-api-js/blob/master/examples/cookbook/utils/verify-signature.js)**: this is very useful to prove that a message was created by the user.
- **[Create batch transactions](https://github.com/near/near-api-js/tree/master/examples/cookbook/transactions/batch-transactions.js)**: this enables to link multiple [actions](/develop/contracts/actions) (e.g. multiple method calls). If one of the transactions fails, then they are all reverted.
- **[Create accounts](https://github.com/near/near-api-js/tree/master/examples/cookbook/accounts/create-testnet-account.js)**: deploy accounts for your users!

Check the [cookbook](/tools/near-api-js/cookbook) to learn how to supercharge your webapp.