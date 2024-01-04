---
id: near
title: Interacting with Near
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/social-widget"

The components can use the `Near` object to interact with smart contracts in the NEAR blockchain. There are three methods:

- [`Near.view`](#nearview)
- [`Near.block`](#nearblock)
- [`Near.call`](#nearcall)

---

## Near.view
Queries a read-only method from a NEAR smart contract, returning:
- **`null`**: If the query is still being processed
- **`undefined`**: If the query is complete and no value was returned by the contract
- A **value**: If the query is complete and a value was returned by the contract

<WidgetEditor>

```js
const greeting = Near.view("hello.near-examples.testnet", "get_greeting", {});

if (greeting === null) return "Loading...";

return `The contract says: ${greeting}`;
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| param              | required     | type            | description                                                                                                                    |
|--------------------|--------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------|
| `contractName`     | **required** | string          | Name of the smart contract                                                                                                     |
| `methodName`       | **required** | string          | Name of the method to call                                                                                                     |
| `args`             | _optional_   | object instance | Arguments to pass to the method                                                                                                |
| `blockId/finality` | _optional_   | string          | Block ID or finality of the transaction                                                                                        |
| `subscribe`        | _optional_   | boolean         | This feature allows users to subscribe to a query, which automatically refreshes the data for all subscribers every 5 seconds. |

</details>

:::tip
Notice that the optional parameter `subscribe` allows users to subscribe to a query, which automatically refreshes the data every 5 seconds.
:::

<hr class="subsection" />

#### Avoiding a Common Pitfall

If you want to initialize the state with the result of a `Near.view` call, be sure to check first that the value was obtained, to avoid initializing the state with `null`.

<WidgetEditor>

```js
const contractGreet = Near.view("hello.near-examples.testnet", "get_greeting", {});

// you need to first check that the value was obtained
if (contractGreet === null) return "Loading...";

const [greeting, setGreeting] = useState(contractGreet);

return `The contract says: ${greeting}`;
```

</WidgetEditor>

---

## Near.call

Calls a smart contract method from the blockchain. Since a transaction needs to be signed, the user must be logged in in order to make the call.

<WidgetEditor>

```js
if (!context.accountId) return "Please login...";

const onClick = () => {
  Near.call(
    "hello.near-examples.testnet",
    "set_greeting",
    { greeting: "Hello!" }
  );
};

return <>
  <h5> Hello {context.accountId} </h5>
  <button onClick={onClick}> Set Greeting </button>
</>;
```
</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| param          | required     | type            | description                                                                 |
|----------------|--------------|-----------------|-----------------------------------------------------------------------------|
| `contractName` | **required** | string          | Name of the smart contract to call                                          |
| `methodName`   | **required** | string          | Name of the method to call on the smart contract                            |
| `args`         | _optional_   | object instance | Arguments to pass to the smart contract method as an object instance        |
| `gas`          | _optional_   | string / number | Maximum amount of gas to be used for the transaction (default 300Tg)        |
| `deposit`      | _optional_   | string / number | Amount of NEAR tokens to attach to the call as deposit (in yoctoNEAR units) |

</details>

:::tip
Remember that you can login using the `Login` button at the navigation bar.
:::

---

## Near.block

Queries a block from the blockchain.

<WidgetEditor height="40px">

```js
return Near.block("optimistic");
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| param                   | required   | type | description                                                                                                                                       |
|-------------------------|------------|------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `blockHeightOrFinality` | _optional_ | any  | The block height or finality level to use for the blockchain query (desired block height, or one of the following strings: `optimistic`, `final`) |

- desired block height: The height of the specific block to query, expressed as a positive integer
- `optimistic`: Uses the latest block recorded on the node that responded to your query (< 1 second delay)
- `final`: a block that has been validated on at least 66% of the nodes in the network (approx. 2s)

</details>