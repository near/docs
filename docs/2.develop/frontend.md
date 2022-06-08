---
id: frontend
title: Add a Web Frontend
sidebar_label: Add a Web Frontend
---
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Once your contract is deployed it is highly likely that you will want to interact with it from a web frontend. To do so, you can use our NEAR JS API, which will enable you to:

1. **Connect** your frontend to the contract.
2. Call **read only** methods for free ([**view** methods](deploy.md#view-methods)).
3. Make a user **sign-in** to allow calling methods on their behalf.

---

## Connecting to a Contract
In order to connect to a deployed smart contract we recommend you to create a `initContract` in which you instantiate a `Contract` object:

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js" start="1" end="23" />
    <Github fname="config.js"
      url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/config.js" />
  </Language>
</CodeTabs>

and use it in your web-app logic's to set up a "flow". This is, a simple `if` where you decide what to do if the user is logged in or not.

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

Once we have setup the connection to the NEAR network and defined the `Contract` object we can readily call view methods. Once more, view methods are those that only read from the state. They do not perform any [action](contracts/actions.md), nor access the [environment], nor write in the storage.

Since view methods only perform read access operations, they are **free** for the end user, and can be called without being logged in.

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="48" end="52" />
  </Language>
</CodeTabs>

In the snippet above we define a function to retrieve the greeting from our [hello-near](quickstart/hello-near.md) contract. Since it only reads from the contract, it can be used without a need for the user to login.


---

## User Sign-in 
For the user to interact with non-view methods in your contract they will have to sign in. 

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/hello-near-rs/blob/main/frontend/assets/js/near/utils.js"
            start="24" end="36" />
  </Language>
</CodeTabs>

:::info
Signing in actually means that the user's wallet creates and stores an `access key` in the web's local storage. Such key enables to expend a maximum of `0.25Ⓝ` on calls to the `changeMethods` you defined in the `Contract` object. **Only** those methods on that contract, nothing else.
:::

---

## Calling Change Methods
Once the user logged in, now they can call change methods. Calling change methods is similar to calling view methods, only that now you can specify if you want to attach some NEARs to the call, and how much GAS you want to use for the call.

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="63" end="67" />
  </Language>
</CodeTabs>

### Fetching Results After a Wallet Redirection
If you attach money to a change call, then the user will be redirected to their wallet to accept the transaction. After accepting, the user will be brought back to your website, with the resulting transaction hash being pass as part of the url (i.e. `your-website.com/?transactionHashes=...`).

If the method invoked returned a result, you can use the transaction hash to retrieve from the network. Assuming you created the `near` object as in the [connecting to a contract](#connecting-to-a-contract) example, then you can do the following:

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
  <Github fname="index.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/index.js"
            start="68" end="75" />
    <Github fname="utils.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/frontend/assets/js/near/utils.js"
            start="38" end="41" />
  </Language>
</CodeTabs>