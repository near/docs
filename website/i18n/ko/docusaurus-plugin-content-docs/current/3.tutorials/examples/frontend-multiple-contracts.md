---
id: frontend-multiple-contracts
title: 프론트엔드 다중 컨트랙트
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 예제는 하나의 프론트엔드에서 여러 컨트랙트와 상호 작용하는 방법을 보여줍니다.

특히 이 예에서는 다음을 수행하는 메서드를 보여줍니다.
1. 여러 컨트랙트에서 데이터 쿼리
2. 여러 컨트랙트 메서드를 동시에 호출

---

## 여러 컨트랙트에서 데이터 쿼리

여러 컨트랙트를 쿼리하려면 간단히 여러 개의 `view` 호출을 수행하세요.

<Language value="🌐 JavaScript" language="ts">
  <Github fname="index.js" 
        url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
        start="70" end="76" />
</Language>

---

## 여러 트랜잭션 전송
`wallet` 객체를 사용하면 여러 트랜잭션을 동시에 전송할 수 있습니다. 그러나 트랜잭션은 독립적으로 실행됩니다.

한 번에 여러 트랜잭션을 전달하는 것은 사용자가 지갑과 한 번만 상호 작용하기 때문에, UX를 개선하는 좋은 방법입니다.

<Language value="🌐 JavaScript" language="ts">
  <Github fname="index.js" 
          url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
          start="39" end="66" />
</Language>

이 예에서 사용자는 두 개의 독립적인 트랜잭션에 서명합니다.
1. [Hello NEAR 예제](https://github.com/near-examples/hello-near-rust) 내 `set_greeting`에서 호출할 트랜잭션
2. `방명록 예제` 내 [add_message](https://github.com/near-examples/guest-book-rust)에서 호출할 트랜잭션

:::caution
사용자가 트랜잭션 서명을 동시에 수락하더라도 트랜잭션은 **독립적**으로 유지됩니다. 즉, 하나가 실패하더라도 다른 하나는 롤백 되지 **않습니다**.
:::

---

## 일괄 Action
동일한 컨트랙트에 대한 여러 [Action](../../2.develop/contracts/actions.md)을 하나의 트랜잭션으로 모을 수 있습니다. 일괄 Action은 **순차적으로** 실행되며, 하나가 실패 하면 **모두** 되돌려진다는 추가 이점이 있습니다.

```js
  // Register a user and transfer them FT on a single take
  const REGISTER_DEPOSIT = "1250000000000000000000";

  const ftTx = {
    receiverId: FT_ADDRESS,
    actions: [
      {
        type: 'FunctionCall',
        params: {
          methodName: 'storage_deposit',
          args: { account_id: "<receiver-account>" },
          gas: THIRTY_TGAS, deposit: REGISTER_DEPOSIT
        }
      },
      {
        type: 'FunctionCall',
        params: {
          methodName: 'ft_transfer',
          args: { receiver_id: "<receiver-account>", amount: amount_in_yocto },
          gas: THIRTY_TGAS, deposit: 1 }
      }
    ]
  }

  // Ask the wallet to sign and send the transaction
  await wallet.signAndSendTransactions({ transactions: [ ftTx ] })
```
