---
id: contract
title: 컨트랙트
sidebar_label: 컨트랙트
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

`Contract`의 인스턴스를 초기화할 때, 스마트 컨트랙트에 있는 함수의 이름을 지정해야 합니다. 그러면 `Contract`의 새 인스턴스에는 스마트 컨트랙트 함수와 동일한 이름을 가진 메서드가 존재할 것입니다. 예를 들어, `my_smart_contract_function` 함수가 포함된 컨트랙트를 배포한 경우, 이는 다음과 같이 작동합니다.

```js
const contract = new Contract(account, "example-contract.testnet", {
  changeMethods: ["my_smart_contract_function"], // your smart-contract has a function `my_smart_contract_function`
});
// `contract` object has `my_smart_contract_function` function on it:
contract.my_smart_contract_function();
```

### 컨트랙트 가져오기 {#load-contract}

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

[<span className="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/_near_js_accounts.contract.Contract.html)

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

[<span className="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/_near_js_accounts.contract.Contract.html)

</TabItem>
</Tabs>

### 컨트랙트 호출 {#call-contract}

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

[<span className="typedoc-icon typedoc-icon-class"></span> `Contract` 클래스](https://near.github.io/near-api-js/classes/_near_js_accounts.contract.Contract.html)
