---
id: contract
title: Contract
sidebar_label: Contract
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you instantiate an instance of `Contract` you need to specify the names of the functions you have on your smart contract. Then the new instance of `Contract` will have methods with the same names as your smart contract functions. For example if you deployed a contract with `my_smart_contract_function` function on it, then this will work:

```js
const contract = new Contract(account, "example-contract.testnet", {
  changeMethods: ["my_smart_contract_function"], // your smart-contract has a function `my_smart_contract_function`
});
// `contract` object has `my_smart_contract_function` function on it:
contract.my_smart_contract_function();
```

### Load Contract {#load-contract}

<Tabs>
<TabItem value="Standard" label="Standard" default>

```js
const { Contract } = nearAPI;

const contract = new Contract(
  account, // the account object that is connecting
  "example-contract.testnet",
  {
    // name of contract you're connecting to
    viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    changeMethods: ["addMessage"], // change methods modify state
  }
);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/_near_js_accounts.contract.Contract.html)

</TabItem>
<TabItem value="wallet" label="Using Wallet">

```js
const { Contract } = nearAPI;

const contract = new Contract(
  wallet.account(), // the account object that is connecting
  "example-contract.testnet",
  {
    // name of contract you're connecting to
    viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    changeMethods: ["addMessage"], // change methods modify state
  }
);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/_near_js_accounts.contract.Contract.html)

</TabItem>
</Tabs>

### Call Contract {#call-contract}

<Tabs>
<TabItem value="method" label="Change Method" default>

```js
const contract = new Contract(account, "example-contract.testnet", {
  changeMethods: ["method_name"],
});
await contract.method_name(
  {
    arg_name: "value", // argument name and value - pass empty object if no args required
  },
  "300000000000000", // attached GAS (optional)
  "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
);
```

</TabItem>
<TabItem value="callback" label="Change Method w/ callbackUrl and meta">

```js
const contract = new Contract(account, "example-contract.testnet", {
  changeMethods: ["method_name"],
});
await contract.method_name({
  callbackUrl: "https://example.com/callback", // callbackUrl after the transaction approved (optional)
  meta: "some info", // meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url param
  args: {
    arg_name: "value", // argument name and value - pass empty object if no args required
  },
  gas: 300000000000000, // attached GAS (optional)
  amount: 1000000000000000000000000, // attached deposit in yoctoNEAR (optional)
});
```

</TabItem>
<TabItem value="view" label="View Method">

```js
const contract = new Contract(account, "example-contract.testnet", {
  viewMethods: ["view_method_name"],
});
const response = await contract.view_method_name();
```

</TabItem>
<TabItem value="args" label="View Method w/ args">

```js
const contract = new Contract(account, "example-contract.testnet", {
  viewMethods: ["view_method_name"],
});
const response = await contract.view_method_name({ arg_name: "arg_value" });
```

</TabItem>
</Tabs>

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/_near_js_accounts.contract.Contract.html)
