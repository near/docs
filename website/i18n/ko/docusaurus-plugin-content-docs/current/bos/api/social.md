---
id: social
title: Social Interactions
---

import {WidgetEditor} from "@site/src/components/widget-editor"

NEAR components can natively communicate with the [SocialDB smart contract](https://github.com/NearSocial/social-db) (currently deployed at [social.near](https://nearblocks.io/address/social.near)).

The `SocialDB` is a contract that stores `key-value` pairs, and is used mostly to store social-related data, such as `posts`, `likes`, or `profiles`.

:::tip
Besides user data, the `SocialDB` contract stores **all existing NEAR components**.
:::

---

## Social.get

`Social.get` queries a key from the SocialDB contract and returns the data. The key being queried can contain wildcards.

For example:

  - `alice.near/profile/**`  will match the entire profile data of account alice.near.
  - `alice.near/profile/*` will match all the fields of the profile, but not the nested objects.
  - `alice.near/profile/name` will match only the name field of the profile.
  - `*/widget/*` will match all the widgets of all the accounts.

<br />

<WidgetEditor>

```js
// Ask for the `profile` key of the influencer.testnet account
const profile = Social.get("influencer.testnet/profile/*");

// Ask a component from the influencer.testnet account
const widget = Social.get("influencer.testnet/widget/Greeter");

if(profile === null || widget === null) return "Loading ..."

return (
  <div>
    <p>Profile: {JSON.stringify(profile)}</p>
    <p>Widgets: {JSON.stringify(widget)} </p>
  </div>
);
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| 매개변수       | 필수 여부  | 자료형               | 설명           |
| ---------- | ------ | ----------------- | ------------ |
| `patterns` | **필수** | string / string[] | 경로 패턴        |
| `finality` | _선택사항_ | `"final"` / 숫자    | 블록 높이 또는 완결성 |
| `options`  | _선택사항_ | 객체                | `options` 객체 |

:::info options object

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `return_deleted` _(선택 사항)_: 삭제된 값을 (`null`로) 반환할지 여부를 나타냅니다. 기본값은 `false`입니다.

:::

The block height or finality can be used to get the data at a specific block height or finality. If the block height or finality is not specified, the data will be fetched at the `optimistic` finality (the latest block height).

For block height and finality `final`, instead of calling the NEAR RPC directly, the VM uses the Social API Server to fetch the data.

Social API server indexes the data for SocialDB and allows to fetch the data at any block height with additional options.

It also allows returning more data than an RPC call because it's not restricted by the gas limit. In general, the API server also serves data faster than the NEAR RPC, because it doesn't execute the contract code in a virtual machine.

</details>

:::tip
While the data is fetching, `Social.get` returns `null`.
:::


---

## Social.getr
`Social.getr`은 `Social.get`의 래퍼 헬퍼일 뿐이며, 각 경로 패턴에 `**`를 추가합니다.

<WidgetEditor>

```js
const profile = Social.getr("influencer.testnet/profile");

return (
  <div>
    <p>Profile: {JSON.stringify(profile)}</p>
  </div>
);
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| 매개변수       | 필수 여부  | 자료형               | 설명           |
| ---------- | ------ | ----------------- | ------------ |
| `patterns` | **필수** | string / string[] | 경로 패턴        |
| `finality` | _선택사항_ | `"final"` / 숫자    | 블록 높이 또는 완결성 |
| `options`  | _선택사항_ | 객체                | `options` 객체 |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `return_deleted` _(선택 사항)_: 삭제된 값을 (`null`로) 반환할지 여부를 나타냅니다. 기본값은 `false`입니다.

:::

</details>

---

## Social.keys

The `keys` method allows to get the list of keys that match a pattern. It's useful for querying the data without reading values.

It also has an additional `options` field that can be used to specify the return type and whether to return deleted keys.

<WidgetEditor height="80">

```js
const data = Social.keys(`influencer.testnet/profile/*`, "final");

return JSON.stringify(data)
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

`Social.key`는 최대 3개의 인수를 사용합니다:

| 매개변수       | 필수 여부  | 자료형               | 설명           |
| ---------- | ------ | ----------------- | ------------ |
| `patterns` | **필수** | string / string[] | 경로 패턴        |
| `finality` | _선택사항_ | `"final"` / 숫자    | 블록 높이 또는 완결성 |
| `options`  | _선택사항_ | 객체                | `options` 객체 |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `return_type` _(선택 사항)_: `"History"`, `"True"` 또는 `"Block Height"` 중 하나입니다. 지정하지 않으면 `"True"`가 반환됩니다.
- `return_deleted` _(선택 사항)_: 삭제된 값을 (`null`로) 반환할지 여부를 나타냅니다. 기본값은 `false`입니다.
- `values_only` _(선택 사항)_: 값만 반환할지 여부입니다(객체는 포함하지 않음). 기본값은 `false`입니다.

:::

</details>

:::tip
Social API 서버는 사용자 지정 옵션 `return_type: "History"`를 지원합니다. 각 일치 키에 대해 값이 오름차순으로 변경되었을 때 모든 블록 높이가 포함된 배열을 반환합니다. 값을 덮어쓰는 피드를 만드는 데 사용할 수 있습니다.
:::

---

## Social.set

`data` 객체를 가져와 SocialDB에 커밋합니다. The data object can contain multiple keys, and each key can contain multiple values.

Importantly, a user can only commit to **their own** space in `SocialDB` (e.g. `alice.near` can only write in `alice.near/**`), except if [**given explicit permission**](https://github.com/NearSocial/social-db#permissions) by the owner of another space.

Each time a user wants to commit data, they will be prompted to confirm the action. On confirming, the user can choose to not be asked again in the future.

<WidgetEditor>

```js
const onClick = () => {
  Social.set({
    post: {
      main: JSON.stringify({
        type: "md",
        text: "I've read the docs!"
      })
    }
  })
}

if(!context.accountId) return "Please login...";

return <>
  <p> Save a message showing some love to the NEAR Docs </p>
  <button onClick={onClick}> Save the Message </button>
</>
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

`Social.index` 인자:

 | 매개변수      | 필수 여부  | 자료형 | 설명                                                      |
 | --------- | ------ | --- | ------------------------------------------------------- |
 | `data`    | **필수** | 객체  | 커밋될 데이터 객체입니다. `CommitButton`과 마찬가지로 계정 ID로 시작하면 안 됩니다. |
 | `options` | _선택사항_ | 객체  | 추가 객체입니다.                                               |

:::info options 객체

- `force` _(선택 사항)_: 데이터를 덮어쓸지 여부를 의미합니다.
- `onCommit` _(선택 사항)_: 성공적인 커밋에서 트리거하는 함수입니다. 작성된 데이터(`accountID` 포함)를 전달합니다.
- `onCancel` _(선택 사항)_: 사용자가 커밋을 취소할 때 트리거하는 함수입니다.

:::

</details>

:::tip
By default `Social.set` will omit saving data that is already saved (e.g. if the user already liked a post, it won't save the like again). To force saving the data, pass the `force` option.
:::

---

## Social.index
NEAR Social readily provides an indexer - a service that listen to actions in SocialDB, and caches them so they can be retrieved without needing to interact with the contract.

The indexer is very useful, for example, to rapidly store and retrieve information on all comments for a post. Without the indexer, we would need to check all entries in the contract to see who answered, surely running out of GAS before completion.

<hr className="subsection" />

### Indexing an Action
To index an action we need to add the `index` key to the data being saved, within the `index` key we will save the `action` being indexed, alongside a `key` and a `value` that identifies this specific instance.

<WidgetEditor>

```js
// General form of an indexed action
// {
//   index: {
//     actionName: JSON.stringify({ key, value })
//   }
// }

const onClick = () => {
  Social.set({
    index: {
      readDocs: JSON.stringify({key: "docs", value: "like"})
    } ,
  })
}

return <>
  {context.accountId ?
  <>
    <p> Index an action showing some love to the NEAR Docs </p>
    <button onClick={onClick}> Index Action </button>
  </> :
  <p> Login to index an action </p>}
</>
```

</WidgetEditor>

In the example above we index a `docs` action. In this case the `action` is `docs`, and the `key` that identifies it is `"read"`.

<details markdown="1">

<summary> Standards </summary>

#### Indexing a Post
To index a post, the standard is to save the action `post`, with `{key: "main", value: {type: "md"}`.

```js
{
  index: {
    post: JSON.stringify({
      key: "main",
      value: {type: "md"}
    })
  }
}
```

#### Indexing a Like
To index a like, the standard is to save the action `like`, with `{key: object-representing-the-post, value: {type: "like" }}`

```js
{
  index: {
    like: JSON.stringify({
      key: {type: 'social', path: 'influencer.testnet/post/main', blockHeight: 152959480 },
      value: {type: "like"}})
  }
}
```

</details>

<hr className="subsection" />

### Retrieving Indexed Actions

To retrieve indexed actions we use the `Social.index` method. It takes the `action` and the `key` as arguments, and returns an array of all the indexed values alongside the `blockHeight` in which they were indexed, and which user made the action.


<WidgetEditor>

```js
const readDocs = Social.index("readDocs", "docs")

return <>
  <p> Number of indexed "readDocs" actions with key "docs": {readDocs.length} </p>

  <b>Indexed actions</b>
  {JSON.stringify(readDocs)}
</>
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

`Social.index` 인자:

 | 매개변수      | 필수 여부        | 자료형 | 설명                                                              |
 | --------- | ------------ | --- | --------------------------------------------------------------- |
 | `action`  | **필수**       | 문자열 | 표준의 `index_type`입니다. 예를 들어 경로 `index/like`에서 action은 `like`입니다. |
 | `key`     | **required** | 문자열 | 표준의 내부 인덱스 값입니다.                                                |
 | `options` | _선택사항_       | 객체  | `options` 객체입니다.                                                |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `accountId` _(선택 사항)_: 지정된 경우 값을 필터링하려면 문자열 또는 계정 ID 배열이어야 합니다. 그렇지 않으면 계정 ID로 필터링하지 않습니다.
- `order` _(선택 사항)_: `asc` 또는 `desc` 중 하나입니다. 기본값은 `asc`입니다.
- `limit` _(선택 사항)_: 기본값은 `100`입니다. 반환할 값의 수를 의미합니다. 마지막 요소의 블록 높이가 같은 경우 인덱스 값보다 많은 값을 반환할 수 있습니다.
- `from` _(선택 사항)_: 순서에 따라 기본값은 `0` 또는 `Max`입니다.

:::

</details>