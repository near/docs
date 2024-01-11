---
id: account-id
title: 주소 (계정 ID)
---

모든 NEAR 계정은 특정 주소로 식별됩니다. 이름에 따라 두 가지 유형의 계정으로 구분할 수 있습니다.
1. `alice.near`와 같이 사람이 읽을 수 있는 이름을 가진 **명명된 계정**(Named Account).
2. 64자(예: `98793cd91a3f870fb126f662858[...]`) 형태의 **암시적 계정**(Implicit Account).

:::tip 계정 이름이 유효하려면 [계정 ID 규칙](https://nomicon.io/DataStructures/Account#account-id-rules)을 준수해야 합니다. :::

---

## 암시적 계정 {#implicit-accounts}
암시적 계정은 기존 Bitcoin/Ethereum 계정과 유사합니다. 이는 고유한 ED25519 키 쌍에 해당하는 64자 주소로 정의됩니다.

예를 들어:
- base58 형태의 공개 키: `BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`
- 이에 해당하는 암시적 계정:  `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`

:::tip [암시적 계정을 만드는 방법에 대한 섹션](creating-accounts.md#local-implicit-account)을 확인하세요. :::

---


## 명명된 계정
NEAR에서 사용자는 기억 및 사용하기 더 간단한 명명된 계정(예: `bob.near`)을 등록할 수 있습니다.

또한 이름이 지정된 계정 은 자신의 **하위 계정**을 생성하여 관련된 계정들을 구성할 수 있습니다. 이러한 방식으로 명명된 계정은 다음과 같은 도메인의 형태으로 작동합니다.
1. Only the [`registrar`](https://nearblocks.io/address/registrar) account can create short top-level accounts (< 32 char).
2. 누구나 긴 최상위 계정(>=32자)을 만들 수 있습니다.
3. 계정은 자신의 **직계** 하위 계정만 만들 수 있습니다.

다시 말해:
1. Only [`registrar`](https://nearblocks.io/address/registrar) can create short top-level accounts (e.g. `near`, `aurora`).
2. 누구나 긴 최상위 계정(예: `verylongaccountnamethatis32chars`)을 만들 수 있습니다.
3. `near`는 `bob.near`를 만들 수 있고, `bob.near`는 `app.bob.near`를 만들 수 있습니다.
4. `near`는 `app.bob.near`를 만들 수 **없고**, `test.near`도 `sub.example.near`를 만들 수 **없습니다**.

현재 메인넷 계정은 `.near`(`example.near`)의 하위 계정이고, **테스트넷** 계정은 `testnet`(`example.testnet`)의 하위 계정입니다.

:::info 계정은 [액세스 키](access-keys.md)를 공유 하지 **않으므로**, 하위 계정을 제어 할 수 없습니다. :::

:::tip [명명된 계정을 만드는 방법](creating-accounts.md#local-named-account)에 대한 섹션을 확인하십시오. :::
