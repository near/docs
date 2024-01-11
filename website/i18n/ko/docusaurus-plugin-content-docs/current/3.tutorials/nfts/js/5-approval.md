---
id: approvals
title: 승인
sidebar_label: 승인
---

이 튜토리얼에서는 다른 사람이 당신을 대신해 NFT를 전송할 수 있도록 액세스 권한을 부여할 수 있는 승인 관리 시스템의 기본 사항을 배웁니다. 이것은 모든 NFT 마켓플레이스의 중추이며, 복잡하지만 아름다운 시나리오가 발생할 수 있도록 합니다. 처음 가입하는 경우 [이 레퍼지토리](https://github.com/near-examples/nft-tutorial)를 자유롭게 복제하고 `4.core` 브랜치를 확인하세요.

:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

:::


```bash
git checkout 4.core
```

:::tip 이 _승인_ 튜토리얼의 완성된 코드를 보고 싶다면, `5.approval` 브랜치에서 찾을 수 있습니다. :::

## 소개

지금까지 사용자가 [열거형(Enumeration) 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration)을 사용하여 정보를 쿼리할 뿐만 아니라, NFT를 생성 및 전송할 수 있는 스마트 컨트랙트를 만들었습니다. 이전 튜토리얼에서 수행한 것처럼 문제를 더 작고 이해하기 쉬운 작업으로 분류해 보겠습니다. 먼저 표준의 [승인 관리](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) 확장에 따라 달성하고자 하는 일부 최종 목표를 정의해 보겠습니다. 우리는 사용자가 다음과 같은 기능을 갖기를 원합니다.

- 다른 계정에 토큰별로 NFT를 전송할 수 있는 액세스 권한을 부여합니다.
- 계정에 특정 토큰에 대한 액세스 권한이 있는지 확인합니다.
- 특정 계정의 NFT 전송 승인을 취소합니다.
- NFT를 전송할 수 있는 다른 **모든** 계정의 승인을 취소합니다.

이 모든 목표를 살펴보면, 모두 토큰 기준임을 알 수 있습니다. 이것은 각 토큰에 대한 정보를 추적하는 `Token` 구조체를 변경해야 한다는 강력한 표시입니다.

## 계정에서 NFT 전송 허용

첫 번째 목표를 달성하는 것으로 시작해 봅시다. 당신을 대신하여 NFT를 전송할 수 있는 다른 계정 액세스 권한을 어떻게 부여할 수 있을까요?

이를 달성할 수 있는 가장 간단한 방법은 승인된 계정 목록을 `Token` 구조체에 추가하는 것입니다. NFT를 전송할 때 발신자가 소유자가 아닌 경우 목록에 있는지 확인할 수 있습니다.

전송하기 전에 새 소유자는 원래 소유자가 승인한 계정이 새 NFT를 이전할 수 있는 액세스 권한이 있을 것으로 기대하지 않기 때문에, 승인된 계정 목록을 지워야 합니다.

### 문제점 {#the-problem}

표면적으로는 이것이 효과가 있지만, 엣지 케이스에 대해 생각하기 시작하면 몇 가지 문제가 발생합니다. 종종 개발을 수행할 때 일반적인 접근 방식은 가장 쉽고 간단한 솔루션에 대해 생각하는 것입니다. 파악한 후에는 케이스를 나누고 최적화 및 엣지 케이스에 대해 생각할 수 있습니다.

다음 시나리오를 고려해 봅시다. Benji는 NFT를 가지고 있으며 토큰을 전송할 수 있는 두 개의 마켓플레이스에 액세스할 수 있습니다. 그렇게 함으로써 그는 NFT를 판매합니다(자세한 내용은 [마켓플레이스 통합](#marketplace-integrations) 섹션 참조). 그가 NFT를 두 마켓플레이스 모두에서 1 NEAR에 판매한다고 가정해 보겠습니다. 토큰의 승인된 계정 ID 목록은 다음과 같습니다.

```
Token: {
    owner_id: Benji
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

그런 다음 Josh가 와서 마켓플레이스 A에서 1 NEAR에 NFT를 구매합니다. 이렇게 하면 마켓플레이스 A에서 판매가 중단되고 승인된 계정 목록이 지워집니다. 그러나 마켓플레이스 B에는 여전히 1 NEAR에 판매 목록에 있는 토큰이 있으며 Josh가 해당 토큰을 마켓플레이스 A에서 구매했는지 알 방법이 없습니다. 새 토큰 구조체는 다음과 같습니다.

```
Token: {
    owner_id: Josh
    approved_accounts_ids: []
}
```

Josh가 현금이 부족하고 이 NFT를 B 마켓플레이스 가격의 10배에 판매하려고 한다고 가정해 보겠습니다. 토큰을 두 번 판매하기 위해 이전 판매 데이터를 유지합니다. 이는 마켓플레이스 B의 관점에서 토큰이 여전히 1 NEAR(Benji가 원래 상장한 가격)에 판매 중임을 의미합니다.

Josh가 판매를 시도하고 판매하도록 마켓플레이스를 승인했으므로 토큰 구조는 다음과 같습니다.

```
Token: {
    owner_id: Josh
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

그런 다음 Mike가 와서 마켓플레이스 B에서 1 ​​NEAR에 대해서만 NFT를 구매하면 마켓플레이스는 NFT를 전송하려고 시도할 것이고, 기술적으로 Josh가 마켓플레이스를 승인했고 승인된 계정 목록에 있기 때문에 트랜잭션이 제대로 진행됩니다.

### 해결책 {#the-solution}

이제 원래 솔루션의 문제를 식별했으므로 문제를 해결할 수 있는 방법에 대해 생각해 봅시다. 승인된 계정 목록을 추적하는 대신 승인된 각 계정과 함께 제공되는 특정 ID를 도입하면 이제 어떻게 될까요? 새로 승인된 계정은 이제 목록이 아닌 맵이 됩니다. 그것은 계정을 그것의 `approval id`와 매핑할 것입니다.

이것이 작동하려면, 승인 ID가 **항상** 고유한 새 ID인지 확인해야 합니다. 만약 이를 계정 승인 시마다 항상 1씩 증가하는 정수로 설정하면 제대로 작동합니다. 새 솔루션으로 동일한 시나리오를 고려해 보겠습니다.

Benji는 마켓플레이스 A와 마켓플레이스 B를 모두 승인하여 자신의 NFT를 1 NEAR에 판매합니다. "다음 승인 ID"는 NFT가 처음 발행될 때 0에서 시작하여 1씩 증가합니다. 그러면 다음과 같은 토큰 구조가 생성됩니다.

```
Token: {
    owner_id: Benji
    approved_accounts_ids: {
        marketplace A: 0
        marketplace B: 1
    }
    next_approval_id: 2
}
```

Benji가 마켓플레이스 A를 승인했을 때는, 0에서 시작하는 원래 값의 `next_approval_id`를 사용했습니다. 그런 다음 마켓플레이스가 맵에 삽입되고, 다음 승인 ID가 증가했습니다. 이 프로세스는 마켓플레이스 B에 대해 다시 발생했으며 다음 승인 ID는 현재 2인 위치에서 다시 증가했습니다.

Josh가 와서 마켓플레이스 A에서 1 NEAR에 NFT를 구매합니다. 다음 승인 ID가 어떻게 2로 유지되었는지 확인해 보세요.

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {}
    next_approval_id: 2
}
```

그런 다음 Josh는 다시 한 번 현금이 부족해 NFT를 판매하려 하고, 마켓플레이스 B를 승인합니다.

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {
        marketplace B: 2
    }
    next_approval_id: 3
}
```

마켓플레이스가 맵에 삽입되고 다음 승인 ID가 증가합니다. 마켓플레이스 B의 관점에서 볼 때는, Benji가 가치가 1인 NFT를 리스팅했을 때 원래 승인 ID를 저장합니다. Mike가 원래 판매 가격(1 NEAR)으로 마켓플레이스 B에서 NFT를 구매하려면 NFT 컨트랙트는 패닉합니다. 이는 마켓플레이스에서 승인 ID 1로 NFT를 전송하려고 하지만 토큰 구조에서 승인 ID가 2여야 **한다고** 표시하기 때문입니다.

### `Token` 및 `JsonToken` 구조체 확장

이제 계정에서 NFT를 전송하도록 허용하는, 원래 문제에 대해 제안된 솔루션을 이해했으므로 일부 로직을 구현할 차례입니다. 가장 먼저 해야 할 일은 새 변경 사항을 반영하도록 `Token`및 `JsonToken` 구조체를 수정하는 것입니다. `nft-contract/src/metadata.ts` 파일로 가보겠습니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/metadata.ts#L106-L156
```

그런 다음 토큰이 발행될 때 `approved_account_ids`와 `next_approval_id`를 모두 기본값으로 초기화해야 합니다. `nft-contract/src/mint.ts` 파일로 가서 컨트랙트에 저장할 `Token` 구조체를 생성할 때 다음 승인 ID를 0으로 설정하고, 승인된 계정 ID를 빈 객체로 설정합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/mint.ts#L23-L31
```

### 계정 승인

이제 토큰 수준에서 승인된 계정 ID 및 다음 승인 ID에 대한 지원을 추가했으므로, `nft_approve`라는 함수를 통해 해당 필드를 채우고 변경하는 로직을 추가할 차례입니다. 이 함수는 계정이 특정 토큰 ID에 액세스할 수 있도록 승인해야 합니다. `nft-contract/src/approval.ts` 파일로 이동하여 `internalNftApprove` 함수를 편집해 보겠습니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/approval.ts#L9-L73
```

이 함수는 먼저 사용자가 **적어도** 하나의 yoctoNEAR(곧 구현할 것임)를 첨부하라고 요구합니다(assert). 이것은 보안과 스토리지 비용을 감당하기 위한 것입니다. 누군가 계정 ID를 승인하면 컨트랙트에 해당 정보가 저장됩니다. [발행 튜토리얼](/tutorials/nfts/js/minting)에서 본 것처럼, 스마트 컨트랙트 계정이 스토리지를 처리하도록 하거나 사용자가 해당 비용을 처리하도록 할 수 있습니다. 후자가 더 확장 가능하며, 이 튜토리얼 전체에서 작업하게 될 접근 방식입니다.

assertion이 문제 없이 반환되면, 토큰 객체를 가져오고 소유자만 이 메서드를 호출하는지 확인합니다. 여기서 소유자만 다른 계정이 NFT를 전송하도록 허용할 수 있어야 합니다. 그런 다음 다음 승인 ID를 받고 전달된 계정을 다음 승인 ID가 있는 맵에 삽입합니다. 신규 승인 아이디라면 스토리지 비용을 지불해야 합니다. 신규 승인 아이디가 아닌 경우 스토리지 비용을 지불할 필요가 없으며, yoctoNEAR 1개만 첨부하면 됩니다.

그런 다음 맵에 새 계정을 추가함으로써 얼마나 많은 스토리지가 사용되었는지 계산하고, 토큰 `next_approval_id`을 1만큼 증가시킵니다. `tokensById` 맵에 토큰 객체를 삽입하면, 초과 스토리지를 환불받을 것입니다.

함수가 `msg` 매개변수도 가지고 있음을 확인했을 것입니다. 이 메시지는 실제로 NEAR 내 모든 마켓플레이스의 기반입니다.

#### 마켓플레이스 통합 {#marketplace-integrations}

함수에 메시지가 있는 경우, 액세스 권한이 부여된 계정에 대한 교차 컨트랙트 호출(cross-contract call)을 수행합니다. 이 교차 컨트랙트 호출은 메시지를 구문 분석하고 그에 따라 작동하는 `nft_on_approve` 함수를 호출합니다. 이에 대한 일반적인 사용 사례를 살펴보겠습니다.

판매 조건이 메시지 필드를 통해 전달될 것으로 예상하는 마켓플레이스가 있습니다. Benji는 `nft_approve` 함수를 사용하여 마켓플레이스를 승인하고, 문자열화된 JSON을 통해 판매 조건을 설명하는 메시지에 전달합니다. 이러한 판매 조건은 다음과 같을 수 있습니다.

```json
sale_conditions: {
    price: 5
}
```

메시지 필드 유형을 문자열로 남겨두면, 프로세스가 일반화되고 사용자가 다양한 마켓플레이스에 대한 판매 조건을 입력할 수 있습니다. 마켓플레이스가 적절하게 해독하고 사용할 수 있는 적절한 메시지를 전달하는 것은 승인하는 사람의 몫입니다. 이것은 일반적 으로 유용한 방식으로 `msg`를 구성하는 방법을 알고 있는 마켓플레이스의 프론트엔드 앱을 통해 수행됩니다.

#### 내부 함수

이제 계정 승인을 위한 핵심 로직이 완료되었으므로 `assertAtLeastOneYocto` 및 `bytesForApprovedAccountId` 함수를 구현해야 합니다. `nft-contract/src/internal.ts` 파일로 이동하여 `assertOneYocto` 함수 바로 아래에 다음 함수를 복사합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/internal.ts#L61-L64
```

다음으로 계정 ID를 저장하는 데 드는 비용을 계산하는 로직을 복사해야 합니다. 이 기능을 페이지 맨 위에 두세요.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/internal.ts#L55-L59
```

이제 계정 승인 로직이 완료되었으므로, 전송 제한을 변경해야 합니다.

### NFT 전송 제한 변경

현재 NFT는 소유자**만** 전송할 수 있습니다. 승인된 사람들도 NFT를 전송할 수 있도록 해당 제한을 변경해야 합니다. 또한 승인 ID가 통과되면, 보안을 강화하고, 이체하려는 계정이 모두 승인 목록에 있으며 올바른 승인 ID에 해당하는지 확인할 수 있도록 만들 것 입니다. 이것은 이전에 발생한 문제를 해결하기 위한 것입니다.

`internal.ts` 파일에서 제한이 적용되는 `internalTransfer` 메서드의 로직을 변경해야 합니다. 내부 전송 함수를 다음과 같이 변경합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/internal.ts#L108-L163
```

보낸 사람이 소유자가 아닌지 확인한 다음, 소유자가 아니면 보낸 사람이 승인 목록에 있는지 확인합니다. 승인 ID가 함수에 전달된 경우 컨트랙트에 저장된 발신자의 실제 승인 ID가 전달된 것과 일치하는지 확인합니다.

#### 전송 시 스토리지 환불

내부 파일에 있는 동안, NFT가 전송될 때 컨트랙트에 승인된 계정을 저장하기 위해 지불한 사용자를 환불하는 메서드를 추가해야 합니다. 이는 NFT가 전송될 때마다 `approved_account_ids` 객체를 지우고, 스토리지가 더 이상 사용되지 않기 때문입니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/internal.ts#L13-L28
```

이는 새 승인 로직을 포함하도록 `nft_core` 함수를 변경하는 다음 섹션에서 유용합니다.

### `nft_core.ts` 내 변경 사항

`nft-contract/src/nft_core.ts`파일로 가봅시다. 가장 먼저 변경하고 싶은 것은 `internalTransfer` 함수에 `approval_id`를 추가하는 것입니다. 이는 소유자가 아닌 토큰을 전송하려는 사람이 위에서 본 문제를 해결하기 위해 승인 ID를 전달해야 하기 때문입니다. 소유자인 경우 `internalTransfer` 함수에서 본 승인 ID가 사용되지 않습니다.


`nft_transfer` 함수의 경우, 승인 ID를 `internalTransfer` 함수에 전달한 다음, 전송이 완료된 후 이전 토큰 승인 계정 ID를 환불하기만 하면 됩니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/nft_core.ts#L38-L72
```

다음으로 `nft_transfer_call`에 대해 동일한 작업을 수행해야 하지만, 전송이 취소될 가능성이 있기 때문에, 즉시 환불하는 대신 이전 토큰의 승인된 계정 ID를 `nft_resolve_transfer`에 첨부해야 합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/nft_core.ts#L74-L135
```

또한 `nft_token`에서 반환되는 `JsonToken` 토큰에 승인된 계정 ID를 추가해야 합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/nft_core.ts#L10-L36
```

마지막으로 `internalResolveTransfer`에서 승인된 계정 ID를 환불하기 위한 로직을 추가해야 합니다. 이전이 완료되면 토큰 `approved_account_ids` 필드를 재설정하여 해제되는 스토리지에 대해 소유자에게 환불해야 합니다. 그러나 전송을 되돌려야 하는 경우 아무에게도 환불하지 않는 것만으로는 충분하지 않습니다. 수신자가 토큰을 잠시 소유했기 때문에 승인된 자체 계정 ID를 추가할 수 있기 때문입니다. 따라서 그렇게 한 경우, 환불해야 합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/nft_core.ts#L137-L208
```

완료되면 다음 작업으로 이동하여 완료할 시간입니다.

## 계정 승인 확인

이제 계정 승인 및 환불을 위한 핵심 로직이 마련되었으므로, 이 시점부터 원활하게 진행되어야 합니다. 이제 계정이 승인되었는지 확인하는 로직을 구현해야 합니다. 여기에는 계정 및 토큰 ID와 선택적 승인 ID가 필요합니다. 승인 ID가 제공되지 않은 경우, 계정 승인 여부를 반환해야 합니다.

승인 ID가 제공된 경우, 계정이 승인되었는지 여부와 제공된 승인 ID가 동일한지 여부를 반환해야 합니다. `nft-contract/src/approval.ts` 파일로 이동하여 `internalNftIsApproved` 함수에 필요한 로직을 추가해 봅시다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/approval.ts#L75-L110
```

이제 계속해서 계정 해지 로직을 추가해 보겠습니다.

## 계정 해지

튜토리얼의 다음 단계는 사용자가 자신의 NFT에 대한 액세스 권한을 갖지 못하도록 특정 계정을 취소하도록 허용하는 것입니다. 가장 먼저 해야 할 일은 보안을 위해 하나의 yocto를 첨부하도록 요구하는 것입니다. 그런 다음 호출자가 토큰의 소유자인지 확인해야 합니다. 이러한 확인 과정을 거치면, 토큰 승인 계정 ID에서 전달된 계정을 제거하고 해제되는 스토리지에 대해 소유자에게 환불해야 합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/approval.ts#L112-L145
```

## 모든 계정 해지

튜토리얼의 마지막 단계는 사용자가 NFT에 대한 액세스 권한이 없는 모든 계정을 취소할 수 있도록 허용하는 것입니다. 이것은 또한 보안 목적을 위해 하나의 yocto를 요구하고 호출자가 토큰의 소유자인지 확인해야 합니다. 그런 다음 소유자에게 맵의 모든 계정을 해제하는 데에 대한 금액을 환불하고, `approved_account_ids`를 비우면 됩니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/5.approval/src/nft-contract/approval.ts#L147-L177
```

완료되면 컨트랙트를 배포하고 테스트를 시작할 때입니다.

## 새 변경 사항 테스트 {#testing-changes}

이러한 변경 사항은 다른 모든 토큰에 영향을 미치고, 상태가 새 코드에 의해 자동으로 상속될 수 없기 때문에 단순히 컨트랙트를 재배포하면 오류가 발생합니다. 이러한 이유로 하위 계정을 만들고 거기에 컨트랙트를를 배포하는 것이 가장 좋습니다.

### 하위 계정(sub-account) 생성 {#creating-sub-account}

다음 명령을 실행하여 초기 잔액이 25 NEAR인 기본 계정의 하위 계정 `approval`을 만듭니다

```bash
near create-account approval.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

다음으로 개발을 쉽게 하기 위해 환경 변수를 내보낼 수 있습니다.

```bash
export APPROVAL_NFT_CONTRACT_ID=approval.$NFT_CONTRACT_ID
```

빌드 스크립트를 사용하여 이전 튜토리얼에서와 같이 컨트랙트 배포를 빌드합니다.

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $APPROVAL_NFT_CONTRACT_ID
```

### 초기화 및 발행 {#initialization-and-minting}

이것은 새로운 컨트랙트이므로 토큰을 초기화하고 발행해야 합니다. 다음 명령을 사용하여 컨트랙트를 초기화합니다.

```bash
near call $APPROVAL_NFT_CONTRACT_ID init '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID
```

다음으로 토큰을 발행해야 합니다. 이 명령을 실행하면 `"approval-token"`이라는 토큰 ID로 토큰을 발행하고, 수신자가 새 계정이 됩니다.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_mint '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID --amount 0.1
```

열거 함수 중 하나를 호출하여 모든 것이 제대로 진행되었는지 확인할 수 있습니다.

```bash
near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}'
```

그러면 다음과 유사한 출력이 반환됩니다.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
    },
    "approved_account_ids": {}
  }
]
```

이제 승인된 계정 ID가 함수에서 어떻게 반환되는지 확인해 보세요. 이는 좋은 징조입니다! 이제 토큰에 액세스할 수 있도록 계정을 승인하고 진행할 준비가 되었습니다.

### 계정 승인 {#approving-an-account}

이 시점에서 두 개의 계정이 있어야 합니다. 하나는 환경 변수 `$NFT_CONTRACT_ID` 아래에 저장되고 다른 하나는 환경 변수 `$APPROVAL_NFT_CONTRACT_ID` 아래에 저장됩니다. 이 두 계정을 모두 사용하여 테스트할 수 있습니다. 이전 계정을 승인하면 NFT를 자신에게 전송할 수 있는 기능이 있어야 합니다.

다음 명령을 실행하여 `$NFT_CONTRACT_ID` 내 저장된 계정이 당신의 `"approval-token"` ID로 NFT를 전송할 수 있도록 액세스 권한을 승인합니다. 이전 계정은 `nft_on_approve` 함수를 구현하지 않았으므로 메시지를 전달할 필요가 없습니다. 또한 컨트랙트에 계정을 저장하는 비용을 충당하기에 충분한 NEAR를 첨부해야 합니다. 0.1 NEAR 이상이어야 하며, 사용하지 않은 초과분은 환불됩니다.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID --deposit 0.1
```

이전과 동일한 열거 메서드를 호출하면 승인된 새 계정 ID가 반환되는 것을 볼 수 있습니다.

```bash
near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}'
```

그러면 다음과 유사한 출력이 반환됩니다.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": { "goteam.examples.testnet": 0 }
  }
]
```

### 승인된 계정으로 NFT 전송 {#transferring-the-nft}

이제 토큰을 전송하도록 다른 계정을 승인했으므로 해당 동작을 테스트할 수 있습니다. 다른 계정을 사용해서, 승인된 계정 ID를 재설정해야 하는 NFT를 자신에게 전송할 수 있어야 합니다. 잘못된 승인 ID로 NFT 전송을 테스트해 보겠습니다.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

<details>
<summary>응답 예시: </summary>
<p>

```bash
kind: {
    ExecutionError: "Smart contract panicked: panicked at 'assertion failed: `(left == right)`\n" +
      '  left: `0`,\n' +
      " right: `1`: The actual approval_id 0 is different from the given approval_id 1', src/internal.ts:165:17"
  },
```

</p>
</details>

올바른 승인 ID인 `0`​​을 전달하면 모든 것이 잘 작동하는 것을 볼 수 있습니다.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

열거 메서드를 다시 호출하면 소유자가 업데이트되고 승인된 계정 ID가 재설정되는 것을 볼 수 있습니다.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": {}
  }
]
```

이제 다른 소유자 간에 증가하는 승인 ID를 테스트해 보겠습니다. 원래 토큰을 발행한 하위 계정을 승인하면 이제 승인 ID는 1이어야 합니다.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --deposit 0.1
```

view 함수를 다시 호출하면, 이제 승인된 하위 계정에 대한 승인 ID인 1이 반환됩니다.

```bash
near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}'
```

<details>
<summary>응답 예시: </summary>
<p>

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": { "approval.goteam.examples.testnet": 1 }
  }
]
```

</p>
</details>

테스트가 완료되면, 표준에 대한 승인 확장을 성공적으로 구현한 것입니다!

## 결론

오늘 [승인 확장](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement)을 구현하기 위해 많은 로직을 거쳤으므로, 수행한 작업을 정확히 분석해 보겠습니다.

먼저 문제를 해결하는 방법에 대한 [기본 접근 방식](#basic-solution)을 살펴보았습니다. 그런 다음 해당 솔루션의 몇 가지 [문제점](#the-problem)을 살펴보고 [이를 수정](#the-solution)하는 방법을 배웠습니다.

승인 확장을 구현하기 위해 수행해야 하는 작업을 이해한 후, 컨트랙트에서 JsonToken 및 Token 구조를 [수정](#expanding-json-and-token)하였습니다. 그런 다음 [계정 승인](#approving-accounts) 로직을 구현하고 [마켓플레이스](#marketplace-integrations)에 통합하는 방법도 확인했습니다.

계정 승인 로직을 구현한 후 NFT 전송에 필요한 [제한 사항을 변경](#changing-restrictions)했습니다. 승인 로직을 마무리하기 위해 수행한 마지막 단계는, 돌아가서 새 변경 사항과 호환되도록 [nft_core](#nft-core-changes) 파일을 편집하는 것입니다.

이 시점에서 계정을 승인할 수 있기 위한 모든 것이 구현되었으며, 승인된 계정이 토큰을 전송할 수 있도록 [핵심 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core)의 기능을 확장했습니다.

또한, 계정이 승인되었는지 [확인](#check-if-account-approved)하고 튜토리얼의 코딩 파트를 완료하기 위해 view 메서드를 구현하고 [계정을 해지](#revoke-account) 및 [모든 계정을 해지](#revoke-all-accounts)하는 데 필요한 로직을 구현했습니다.

그 후 컨트랙트 코드가 작성 완료되었으며, [하위 계정](#creating-sub-account)을 생성하고, NFT [승인](#approving-an-account) 및 [전송](#transferring-the-nft)을 테스트할 시간입니다.

다음 튜토리얼에서는 로열티 표준과 NFT 마켓플레이스와 상호 작용하는 방법에 대해 알아봅니다.

:::note 문서 버전 관리

이 글을 쓰는 시점에서, 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전
- 열거 표준: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), `1.0.0` 버전
- 승인 표준: [NEP178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement), `1.0.0` 버전

:::
