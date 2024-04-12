---
id: near
title: Interacting with Near
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/widget-editor"

The components can use the `Near` object to interact with smart contracts in the NEAR blockchain. 세 가지 메서드가 존재합니다.

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

| param              | required     | type            | description                                                                         |
| ------------------ | ------------ | --------------- | ----------------------------------------------------------------------------------- |
| `contractName`     | **required** | string          | 스마트 컨트랙트의 이름                                                                        |
| `methodName`       | **required** | string          | 호출할 메서드 이름                                                                          |
| `args`             | _optional_   | object instance | 메서드에 전달할 인수                                                                         |
| `blockId/finality` | _optional_   | string          | 블록 ID 또는 트랜잭션의 완결성                                                                  |
| `subscribe`        | _optional_   | 부울              | 이 기능을 통해 사용자는 쿼리에 가입할 수 있으며, 이를 통해 5초마다 모든 가입자의 데이터가 자동으로 새로 고쳐집니다. |

</details>

:::tip
Notice that the optional parameter `subscribe` allows users to subscribe to a query, which automatically refreshes the data every 5 seconds.
:::

<hr className="subsection" />

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

If you don't want to delay the render of your component, you can also use the `useEffect` hook to control the value returned by `Near.view`

<WidgetEditor>

```js
const contractGreet = Near.view('hello.near-examples.testnet', 'get_greeting');

const [greeting, setGreeting] = useState('Loading ...');

useEffect(() => {
  if (contractGreet !== null) setGreeting(contractGreet);
}, [contractGreet]);

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

| param          | required     | type            | description                                                 |
| -------------- | ------------ | --------------- | ----------------------------------------------------------- |
| `contractName` | **required** | string          | 호출할 스마트 컨트랙트의 이름                                            |
| `methodName`   | **required** | string          | 스마트 컨트랙트에서 호출할 메서드 이름                                       |
| `args`         | _optional_   | object instance | 스마트 컨트랙트 메서드에 객체 인스턴스의 형태로 전달할 인자                           |
| `gas`          | _optional_   | 문자열 / 숫자        | 트랜잭션에 사용되는 가스의 최대 양 (기본 300Tg)           |
| `deposit`      | _optional_   | 문자열 / 숫자        | 호출에 보증금으로 첨부되는 NEAR 토큰의 양 (yoctoNEAR 단위) |

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

| param                   | required   | type | description                                                                                                      |
| ----------------------- | ---------- | ---- | ---------------------------------------------------------------------------------------------------------------- |
| `blockHeightOrFinality` | _optional_ | 모두   | 블록체인 쿼리에 사용할 블록 높이 또는 완결성 수준(원하는 블록 높이 또는 다음 문자열 중 하나: `optimistic`, `final`) |

- 원하는 블록 높이: 양의 정수로 표현되는 쿼리할 특정 블록의 높이
- `optimistic`: Uses the latest block recorded on the node that responded to your query (< 1 second delay)
- `final`: 네트워크 내 노드의 66% 이상에서 검증된 블록(약 2초)

</details>
