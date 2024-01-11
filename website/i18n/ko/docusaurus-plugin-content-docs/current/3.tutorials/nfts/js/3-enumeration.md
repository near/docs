---
id: enumeration
title: 열거(Enumeration)
sidebar_label: 열거(Enumeration)
---

이전 자습서에서는 발행 함수를 스마트 컨트랙트 뼈대에 통합하는 방법을 살펴보았습니다. NFT를 지갑에 표시하려면 열거 메서드 중 하나를 구현하는 패치 수정 사항도 배포해야 했습니다. 이 튜토리얼에서는 [표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration)에 따라 나머지 열거 방법을 확장하고 완료합니다. 이제 NFT 스마트 컨트랙트를 확장하고 컨트랙트 상태를 반환하는 데 사용할 수 있는 몇 가지 열거 메서드를 추가합니다.


:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

:::

## 소개

[컨트랙트 업그레이드](/tutorials/nfts/js/upgrade-contract/) 튜토리얼에서 언급한 대로 스마트 컨트랙트에 패치 및 수정 사항을 배포할 수 있습니다. 이번에는 해당 지식을 사용하여 `nft_total_supply`, `nft_tokens` 및 `nft_supply_for_owner` 열거형 함수를 구현합니다.

시작하려면 [GitHub 레퍼지토리](https://github.com/near-examples/nft-tutorial/) 내에서 `2.minting` 브랜치로 전환하거나 이전 튜토리얼에서 작업을 계속하세요. 아직 복제하지 않았다면 [컨트랙트 아키텍처](/tutorials/nfts/js/skeleton#building-the-skeleton)를 참조하여 레퍼지토리를 확인하세요.

```bash
git checkout 2.minting
```

:::tip 이 _열거_ 튜토리얼의 완성된 코드를 보려면 `3.enumeration` 브랜치에서 찾을 수 있습니다. :::

## 컨트랙트 수정

`src/enumeration.ts` 파일을 열고 빈 `internalNftTotalSupply` 함수를 찾는 것으로 시작하겠습니다.

### NFT 총 공급량

이 함수는 컨트랙트에 저장된 총 NFT 수를 반환해야 합니다. `nftMetadataById` 자료 구조의 길이를 반환하기만 하면, 이 기능을 쉽게 달성할 수 있습니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/3.enumeration/src/nft-contract/enumeration.ts#L8-L16
```

### NFT 토큰

이 함수는 소유자에 관계없이 컨트랙트에 저장된 `JsonTokens` 목록을 반환해야 합니다. 사용자가 `from_index` 매개변수를 제공하는 경우, 이를 토큰 반복을 시작하는 시작점으로 사용해야 합니다. 그렇지 않으면 처음부터 시작해야 합니다. 마찬가지로 사용자가 `limit` 매개변수를 제공하면 한계 또는 목록 끝에 도달한 후 함수가 중지됩니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/3.enumeration/src/nft-contract/enumeration.ts#L18-L43
```

### 소유자가 가진 NFT 개수

이 함수는 지정된 소유자에 대한 모든 NFT를 찾고 결과 집합의 길이를 반환해야 합니다. 제공된 계정 ID에 대한 토큰 집합이 없으면 함수는 `0`을 반환합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/3.enumeration/src/nft-contract/enumeration.ts#L45-L62
```

그런 다음, CLI를 사용하여 이러한 새 메서드를 쿼리하고 올바르게 작동하는지 확인할 수 있습니다.

## 컨트랙트 재배포 {#redeploying-contract}

`nft_tokens_for_owner`에 필요한 로직을 구현했으므로 이제 컨트랙트를 빌드하고 계정에 재배포할 차례입니다. 빌드 스크립트를 사용하여 이전 튜토리얼에서와 같이 컨트랙트를 배포합니다.

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $NFT_CONTRACT_ID
```

이렇게 하면 계정에 배포된 컨트랙트가 있다는 경고가 출력되고 계속 진행할 것인지 묻습니다. 간단히 `y`를 입력하고 엔터를 누르세요.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

## 토큰 열거

업데이트된 컨트랙트가 재배포되면 이러한 새 함수들이 예상대로 작동하는지 테스트하고 확인할 수 있습니다.

### NFT 토큰

컨트랙트에서 대체 불가능 토큰(NFT) 목록을 조회해 보겠습니다. 다음 명령을 사용하여 10번째 항목부터 최대 50개의 NFT 정보를 조회합니다.

```bash
near view $NFT_CONTRACT_ID nft_tokens '{"from_index": "10", "limit": 50}'
```

이 명령은 다음과 유사한 출력을 반환해야 합니다.

<details>
<summary>응답 예시: </summary>
<p>

```json
[]
```

</p>
</details>

### 소유자별 토큰

`goteam.testnet` 계정이 소유한 NFT의 총 공급량을 얻으려면, `nft_supply_for_owner` 함수를 호출하고 `account_id` 매개변수를 설정합니다.

```bash
near view $NFT_CONTRACT_ID nft_supply_for_owner '{"account_id": "goteam.testnet"}'
```

그러면 다음과 유사한 출력이 반환됩니다.

<details>
<summary>응답 예시: </summary>
<p>

```json
0
```

</p>
</details>

## 결론

이 튜토리얼에서는 [두 개의 새로운 열거 함수](/tutorials/nfts/js/enumeration#modifications-to-the-contract)를 추가했으며, 이제 생성 및 열거 메서드가 있는 기본 NFT 스마트 컨트랙트가 있습니다. 이러한 수정 사항을 구현한 후 스마트 컨트랙트를 재배포하고 CLI를 사용하여 기능을 테스트했습니다.

[다음 튜토리얼](/tutorials/nfts/js/core)에서는 사용자가 발행된 토큰을 전송할 수 있도록 하는 데 필요한 핵심 함수들을 구현합니다.

:::info 기억하세요 이 튜토리얼에서 완성된 코드를 보려면 `3.enumeration` 브랜치를 확인해보세요. :::

:::note 문서 버전 관리

이 글을 쓰는 시점에서, 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전
- 열거 표준: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), `1.0.0` 버전

:::
