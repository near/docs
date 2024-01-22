---
id: core
title: 핵심
sidebar_label: 핵심
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 [핵심 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core)을 스마트 컨트랙트에 구현하는 방법을 배웁니다. 처음 해보는 경우 [이 레퍼지토리](https://github.com/near-examples/nft-tutorial)를 복제하고 `3.enumeration` 브랜치를 확인하세요.

```bash
git checkout 3.enumeration
```

:::tip 이 _Core_ 튜토리얼의 완성된 코드를 보고 싶다면, `4.core` 브랜치에서 찾을 수 있습니다. :::

## 소개 {#introduction}

지금까지 사용자가 토큰을 생성하고 [열거 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration)을 사용하여 정보를 볼 수 있는 간단한 NFT 스마트 컨트랙트를 만들었습니다. 오늘은 스마트 컨트랙트를 확장하여 사용자가 토큰을 발행할 뿐만 아니라 전송할 수도 있게 할 것입니다.

[발행 튜토리얼](/tutorials/nfts/js/minting)에서 했던 것처럼, 문제를 여러 하위 작업으로 나누어 더 쉽게 만들어 봅시다. 토큰이 발행되면 정보는 3곳에 저장됩니다.

- **tokens_per_owner**: 각 계정에 대한 토큰 집합입니다.
- **tokens_by_id**: 토큰 ID를 `Token` 객체에 매핑합니다.
- **token_metadata_by_id**: 토큰 ID를 해당 메타데이터에 매핑합니다.

이제 다음과 같은 시나리오를 고려해 봅시다. Benji가 토큰 A를 소유하고 Mike에게 생일 선물로 전송하려는 경우 어떻게 해야 할까요? 우선 토큰 A를 Benji의 토큰 집합에서 제거하고, Mike의 토큰 집합에 추가해야 합니다.

그것이 구현하는 유일한 로직이라면, 몇 가지 문제에 부딪히게 될 것입니다. 토큰이 Mike에게 전송된 후 해당 토큰에 대한 정보를 쿼리하기 위해 `view` 호출을 하면 여전히 Benji가 소유자라고 표시됩니다.

이는 컨트랙트가 여전히 Benji의 계정 ID로 설정된 `owner_id` 필드를 담은 이전 `Token` 객체에 토큰 ID를 매핑하고 있기 때문입니다. 토큰 ID가 Mike를 소유자로 하는 새 `Token` 객체에 매핑되도록 `tokens_by_id` 자료 구조를 변경해야 합니다.

그렇다면, 소유자가 토큰을 수신자에게 전송하는 최종 프로세스는 다음과 같아야 합니다.

- 소유자 집합에서 토큰을 제거합니다.
- 수신자 집합에 토큰을 추가합니다.
- 올바른 소유자가 포함된 새 `Token` 객체에 토큰 ID를 매핑합니다.

:::note `token_metadata_by_id` 필드를 편집하지 않는 이유가 궁금할 수 있습니다. 이는 누가 토큰을 소유하든 관계없이 토큰 ID는 항상 동일한 메타데이터에 매핑되기 때문입니다. 메타데이터는 절대로 변경되어서는 안 되므로 그대로 둘 수 있습니다. :::

이 시점에서, 스마트 컨트랙트에 필요한 수정을 할 준비가 되었습니다.

## 컨트랙트 수정

`nft-contract/src/nft_core.rs` 파일에서 시작해보겠습니다.

### 전송 함수 {#transfer-function}

`nft_transfer` 로직을 구현하여 시작합니다. 이 함수는 `"Happy Birthday Mike!"`와 같은 `memo`를 사용하여 지정된 `token_id`를 `receiver_id`로 전송합니다.

<Github language="rust" start="62" end="82" url="https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/nft_core.rs" />

There are a couple things to notice here. Firstly, we've introduced a new method called `assert_one_yocto()`. This method will ensure that the user has attached exactly one yoctoNEAR to the call. If a function requires a deposit, you need a full access key to sign that transaction. By adding the one yoctoNEAR deposit requirement, you're essentially forcing the user to sign the transaction with a full access key.

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internal_transfer` method. This will perform all the logic necessary to transfer an NFT.

### 내부 헬퍼 함수

Let's quickly move over to the `nft-contract/src/internal.rs` file so that you can implement the `assert_one_yocto()` and `internal_transfer` methods.

Let's start with the easier one, `assert_one_yocto()`.

#### assert_one_yocto

You can put this function anywhere in the `internal.rs` file but in our case, we'll put it after the `hash_account_id` function:

<Github language="rust" start="14" end="21" url="https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/internal.rs" />

#### internal_transfer

이제 이 튜토리얼의 핵심인 `internal_transfer` 함수를 구현할 차례입니다. 이 함수는 다음과 같은 매개변수를 사용합니다.

- **sender_id**: 토큰 전송을 시도하는 계정입니다.
- **receiver_id**: 토큰을 받는 계정입니다.
- **token_id**: 전송 중인 토큰 ID입니다.
- **memo**: 선택적으로 포함할 수 있는 메모입니다.

가장 먼저 해야 할 일은 발신자가 토큰을 전송할 권한이 있는지 확인하는 것입니다. 이 경우 보낸 사람이 토큰의 소유자인지 확인하기만 하면 됩니다. `token_id`를 사용하여 `Token` 객체를 가져오고, 보낸 사람이 토큰의 `owner_id`와 같은지 확인하면 됩니다.

두 번째로, 보낸 사람 목록에서 토큰 ID를 제거하고 받는 사람의 토큰 목록에 토큰 ID를 추가합니다. 마지막으로, 수신자를 소유자로 하는 새 `Token` 객체를 만들고 토큰 ID를 새로 만든 개체에 다시 매핑합니다.

컨트랙트 구현 내에서 이 함수를 만들고 싶을 것입니다(민팅 튜토리얼에서 만든 `internal_add_token_to_owner` 아래).

<Github language="rust" start="98" end="138" url="https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/internal.rs" />

이전에 소유자 집합에 토큰 ID를 추가하는 기능을 구현했지만, 소유자 집합에서 토큰 ID를 제거하는 기능은 만들지 않았습니다. `internal_transfer` 함수 바로 위와 `internal_add_token_to_owner` 함수 아래에 배치할 `internal_remove_token_from_owner`라는 새 함수를 만들어서 이를 지금 수행해 보겠습니다.

제거 함수에서는 주어진 계정 ID에 대한 토큰 집합을 가져온 다음 전달된 토큰 ID를 제거합니다. 제거 후 계정의 집합이 비어 있으면 `tokens_per_owner` 자료 구조에서 계정을 제거하기만 하면 됩니다.

<Github language="rust" start="73" end="96" url="https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/internal.rs" />

이제 `internal.rs` 파일은 다음과 같은 구조를 가지고 있어야 합니다.

```
internal.rs
├── hash_account_id
├── assert_one_yocto
├── refund_deposit
└── impl Contract
    ├── internal_add_token_to_owner
    ├── internal_remove_token_from_owner
    └── internal_transfer
```

이러한 내부 함수가 완료되면 NFT 전송 로직이 완료됩니다. 이제 표준의 가장 통합적이지만 복잡한 함수 중 하나인 `nft_transfer_call`를 구현할 때입니다.

### 전송 호출 함수 {#transfer-call-function}

다음 시나리오를 고려해 봅시다. 계정은 서비스 수행을 위해 NFT를 스마트 컨트랙트로 전송하려고 합니다. 전통적인 접근 방식은 승인 관리 시스템을 사용하는 것입니다. 수신 컨트랙트에는 완료 후 NFT를 자신에게 전송할 수 있는 권한이 부여됩니다. 튜토리얼 시리즈의 [승인 섹션](/tutorials/nfts/approvals)에서 승인 관리 시스템에 대해 자세히 알아봅니다.

이 승인 과정에서는 여러 트랜잭션을 수행합니다. 만약 단일 트랜잭션으로 구성된 "전송 및 호출" 워크플로우를 도입하면 프로세스를 크게 개선할 수 있습니다.

이러한 이유로 NFT를 수신자에게 전송하고 동일한 트랜잭션에서 수신자의 컨트랙트에 대한 메서드를 호출하는 `nft_transfer_call` 함수가 있습니다.

<Github language="rust" start="84" end="127" url="https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/nft_core.rs" />

이 함수는 먼저 호출자가 보안 목적으로 정확히 1 yocto를 첨부했다고 가정합니다. 그런 다음 `internal_transfer`를 사용하여 NFT를 전송하고 교차 컨트랙트 호출(Cross Contract Call)을 시작합니다. 이는 Promise를 반환하는 `receiver_id`의 컨트랙트에서 `nft_on_transfer` 메서드를 호출할 것입니다. Promise 실행이 끝나면 `nft_resolve_transfer` 함수가 호출됩니다. 이는 교차 컨트랙트 호출을 처리할 때 매우 일반적인 워크플로우입니다. 먼저 호출을 시작하고, 실행이 완료될 때까지 기다립니다. 그런 다음 Promise의 결과를 받아오는 함수를 호출하고 그에 따라 조치를 취합니다.

우리의 경우 `nft_on_transfer`를 호출할 때, 해당 함수는 Bool 형식으로 NFT를 원래 소유자에게 반환해야 하는지 여부를 반환합니다. 이는 `nft_resolve_transfer` 함수에서 실행되는 로직입니다.

<Github language="rust" start="149" end="201" url="https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/nft_core.rs" />

`nft_on_transfer`에서 true가 반환되면, 토큰을 원래 소유자에게 다시 보내야 합니다. 반대로 false가 반환되면 추가 로직이 필요하지 않습니다. `nft_resolve_transfer`의 반환 값에 대해, 표준은 함수가 수신자가 토큰을 성공적으로 수신했는지 여부를 나타내는 Bool을 반환해야 한다고 규정합니다.

즉, `nft_on_transfer`가 true를 반환하면, false를 반환해주어야 합니다. 이는 토큰이 원래 소유자에게 반환되는 경우 때문입니다. `receiver_id`는 결국 성공적으로 토큰을 받지 못했습니다. 반대로 `nft_on_transfer`가 false를 반환한 경우 true를 반환해야 합니다. 토큰을 반환할 필요가 없으므로 `receiver_id`가 토큰을 성공적으로 소유하기 때문입니다.

이 작업이 완료되면, 이제 사용자가 NFT를 전송할 수 있도록 필요한 로직을 성공적으로 추가한 것입니다. 이제 배포하고 몇 가지 테스트를 수행할 시간입니다.

## 컨트랙트 재배포 {#redeploying-contract}

빌드 스크립트를 사용하여 이전 튜토리얼에서와 같이 컨트랙트를 빌드하고 배포합니다.

```bash
yarn build && near deploy --wasmFile out/main.wasm --accountId $NFT_CONTRACT_ID
```

이렇게 하면 계정에 배포된 컨트랙트가 있다는 경고가 출력되고 계속 진행할 것인지 묻습니다. 간단히 `y`를 입력하고 엔터를 누르세요.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

:::tip 이전 튜토리얼을 완료하지 않았고 이 튜토리얼을 따라하는 경우 `near login`를 사용하여 계정을 만들고 CLI로 로그인하면 됩니다. 그런 다음 `export NFT_CONTRACT_ID=YOUR_ACCOUNT_ID_HERE` 환경 변수를 내보낼 수 있습니다. :::

## 새 변경 사항 테스트 {#testing-changes}

컨트랙트에 패치 수정 사항을 배포했으므로 이제 테스트를 진행할 차례입니다. 자신에게 토큰을 발행한 이전 NFT 컨트랙트를 사용하여 `nft_transfer` 메서드를 테스트할 수 있습니다. NFT를 전송하면 지갑에 표시되는 계정의 수집품에서 제거되어야 합니다. 또한 열거 함수를 쿼리하면 더 이상 소유자가 아님이 표시되어야 합니다.

NFT를 `benjiman.testnet` 계정으로 전송하고, NFT가 더 이상 당신의 소유가 아닌지 확인하여 이를 테스트해 보겠습니다.

### 전송 함수 테스트

:::note 즉, `benjiman.testnet` 계정에서 NFT를 다시 전송하지 않는 한 NFT를 복구할 수 없습니다. NFT를 잃어버리지 않으려면 새 계정을 만들고 대신 해당 계정으로 토큰을 전송하세요. :::

다음 명령을 실행하면 `"Go Team :)"`이라는 메모와 함께 `benjiman.testnet` 계정으로 `"token-1"` 토큰이 전송됩니다. 또한 `--depositYocto` 플래그를 사용하여 정확히 1 yoctoNEAR를 첨부하고 있다는 점에 유의하세요.

:::tip 이전 튜토리얼에서 다른 토큰 ID를 사용한 경우, `token-1`을 그때 사용한 토큰 ID로 바꿉니다. :::

```bash
near call $NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

이제 계정이 소유한 모든 토큰을 쿼리하면 해당 토큰이 없어야 합니다. 마찬가지로 `benjiman.testnet`가 소유한 토큰 목록을 쿼리하면, 해당 계정이 이제 NFT를 소유해야 합니다.

### 전송 호출 함수 테스트

`nft_transfer` 함수를 테스트했으므로, 이제 `nft_transfer_call` 함수를 테스트할 차례입니다. 해당 함수를 구현하지 **않은** 수신자에게 NFT를 전송하려고 하면, 컨트랙트가 패닉 상태가 되어 NFT가 전송되지 **않습니다**. 아래에서 이 기능을 테스트해 보겠습니다.

먼저 전송 호출 기능을 테스트하는 데 사용할 새 NFT를 만듭니다.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --amount 0.1
```

이제 토큰을 발행했으므로 이름에서 알 수 있듯이 컨트랙트가 없는 `no-contract.testnet` 계정으로 NFT를 전송할 수 있습니다. 이는 수신자가 `nft_on_transfer` 함수를 구현하지 않으며, 트랜잭션이 완료된 후 NFT가 당신의 것으로 유지되어야 함을 의미합니다.

```bash
near call $NFT_CONTRACT_ID nft_transfer_call '{"receiver_id": "no-contract.testnet", "token_id": "token-2", "msg": "foo"}' --accountId $NFT_CONTRACT_ID --depositYocto 1 --gas 200000000000000
```

토큰을 쿼리하는 경우 토큰이 있어야 하며 이 시점에서 `token-2`를 가지고 있다면, 완료된 것입니다!

## 결론

이 튜토리얼에서는 발행 기능을 넘어 NFT 컨트랙트를 확장하는 방법을 배웠고, 사용자가 NFT를 전송하는 방법을 추가했습니다. 문제를 더 작고 이해하기 쉬운 하위 작업으로 [분류하고](#introduction), 해당 정보를 가져와 [NFT 전송](#transfer-function) 및 [NFT 전송 호출](#transfer-call-function) 함수를 모두 구현했습니다. 또한 스마트 컨트랙트에 다른 [패치 수정 사항](#redeploying-contract)을 배포하고 전송 기능을 [테스트](#testing-changes)했습니다.

[다음 튜토리얼](/tutorials/nfts/approvals)에서는 승인 관리 시스템에 대해 알아보고, 다른 사람이 당신을 대신하여 토큰을 전송하도록 승인하는 방법을 알아봅니다.

:::note 문서 버전 관리

글을 작성하는 시점에서, 해당 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전
- 열거 표준: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), `1.0.0` 버전

:::
