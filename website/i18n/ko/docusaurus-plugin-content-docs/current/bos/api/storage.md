---
id: storage
title: 스토리지 API
sidebar_label: 스토리지
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`Storage` 객체는 새로 고침을해도 지속되는 컴포넌트에 대한 데이터를 저장하는 객체입니다. `localStorage` 액세스를 시뮬레이션합니다. 4가지 메서드가 있습니다.

- [`Storage.get`](#storageget)
- [`Storage.set`](#storageset)
- [`Storage.privateGet`](#storageprivateget)
- [`Storage.privateSet`](#storageprivateset)

## Storage.get

`Storage.get(key, widgetSrc?)` - `widgetSrc`가 생략된 경우 주어진 widgetSrc 또는 현재 컴포넌트 아래의 주어진 키에 대한 공개 값을 반환합니다. 공용 값만 읽을 수 있습니다.

 | 매개변수        | 필수 여부  | 자료형 | 설명          |
 | ----------- | ------ | --- | ----------- |
 | `key`       | **필수** | 객체  | 사용자 정의 키    |
 | `widgetSrc` | _선택사항_ | 객체  | 사용자 정의 컴포넌트 |

### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
const notificationFeedSrc = "mob.near/widget/NotificationFeed";

const lastBlockHeight = Storage.get("lastBlockHeight", notificationFeedSrc);
```

</TabItem>
<TabItem value="response" label="Response">

```json
// the value for the "lastBlockHeight" key under the
// 'mob.near/widget/NotificationFeed' widget is retrieved
```

</TabItem>
</Tabs>

:::tip
[NotificationButton 소스 코드](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/NotificationButton)에서 전체 예제를 참고하세요.
:::

---

## Storage.set

`Storage.set(key, value)` - 현재 위젯에서 주어진 키에 대한 공개 값을 설정합니다. 값은 공개되므로 다른 위젯에서 읽을 수 있습니다.

 | 매개변수    | 필수 여부  | 자료형 | 설명       |
 | ------- | ------ | --- | -------- |
 | `key`   | **필수** | 객체  | 사용자 정의 키 |
 | `value` | **필수** | 객체  | 사용자 정의 값 |


### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
const accountId = context.accountId;

const notifications = Social.index("notify", accountId, {
  order: "desc",
  limit: 100,
  subscribe: true,
});

Storage.set("lastBlockHeight", notifications[0].blockHeight);
```

</TabItem>
<TabItem value="response" label="Response">

```json
// the "lastBlockHeight" key is set to the value from notifications[0].blockHeight
```

</TabItem>
</Tabs>

:::tip
[NotificationFeed 소스 코드](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/NotificationFeed)에서 전체 예제를 참고하세요.
:::

---

## Storage.privateGet

`Storage.privateGet(key)` - 현재 컴포넌트 아래의 지정된 키에 대한 개인 값을 반환합니다.

 | 매개변수  | 필수 여부  | 자료형 | 설명                   |
 | ----- | ------ | --- | -------------------- |
 | `key` | **필수** | 객체  | 현재 컴포넌트 아래의 사용자 정의 키 |

### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
const mySecretData = Storage.privateGet("secretKey");
```

</TabItem>
<TabItem value="response" label="Response">

```json
// the current value of 'secretKey' is retrieved from private storage
```

</TabItem>
</Tabs>

---

## Storage.privateSet

`Storage.privateSet(key, value)` - 현재 컴포넌트에서 주어진 키에 대한 개인 값을 설정합니다. 값은 비공개이며 현재 컴포넌트만 읽을 수 있습니다.

:::note
비공개 및 공개 값은 동일한 키를 공유할 수 있으며 충돌하지 않습니다.
:::

 | 매개변수    | 필수 여부  | 자료형 | 설명                   |
 | ------- | ------ | --- | -------------------- |
 | `key`   | **필수** | 객체  | 현재 컴포넌트 아래의 사용자 정의 키 |
 | `value` | **필수** | 객체  | 사용자 정의 값             |

### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
Storage.privateSet("secretKey", "my-secret-value");
```

</TabItem>
<TabItem value="response" label="Response">

```json
// "my-secret-value" is privately stored under 'secretKey'
```

</TabItem>
</Tabs>
