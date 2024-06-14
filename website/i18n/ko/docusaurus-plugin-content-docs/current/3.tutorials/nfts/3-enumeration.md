---
id: enumeration
title: 열거(Enumeration)
sidebar_label: 열거(Enumeration)
---

import {Github} from "@site/src/components/codetabs"

이전 튜토리얼에서는 발행 함수를 스마트 컨트랙트 뼈대에 통합하는 방법을 살펴보았습니다. NFT를 지갑에 표시하려면 열거 메서드 중 하나를 구현하는 패치 수정 사항도 배포해야 했습니다. In this tutorial, you'll expand on and finish the rest of the enumeration methods as per the [standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration)

Now you'll extend the NFT smart contract and add a couple of enumeration methods that can be used to return the contract's state.

---

## 소개

[컨트랙트 업그레이드](/tutorials/nfts/upgrade-contract/) 튜토리얼에서 언급한 대로 스마트 컨트랙트에 패치 및 수정 사항을 배포할 수 있습니다. 이번에는 해당 지식을 사용하여 `nft_total_supply`, `nft_tokens` 및 `nft_supply_for_owner` 열거형 함수를 구현합니다.

---

## 컨트랙트 수정

`src/enumeration.rs` 파일을 열고 빈 `nft_total_supply` 함수를 찾는 것으로 시작하겠습니다.

**nft_total_supply**

이 함수는 컨트랙트에 저장된 총 NFT 수를 반환해야 합니다. `nft_metadata_by_id` 자료 구조의 길이를 반환하기만 하면, 이 기능을 쉽게 구현할 수 있습니다.

<Github language="rust" start="5" end="9" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

**nft_token**

This function should return a paginated list of `JsonTokens` that are stored on the contract regardless of their owners. If the user provides a `from_index` parameter, you should use that as the starting point for which to start iterating through tokens; otherwise it should start from the beginning. Likewise, if the user provides a `limit` parameter, the function shall stop after reaching either the limit or the end of the list.

:::tip Rust has useful methods for pagination, allowing you to skip to a starting index and taking the first `n` elements of an iterator. :::

<Github language="rust" start="11" end="26" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

**nft_supply_for_owner**

이 함수는 사용자 정의 소유자에 대한 모든 NFT를 찾고 결과 집합의 길이를 반환해야 합니다. 제공된 `AccountID`에 대한 토큰 집합이 없으면 함수는 `0`을 반환합니다.

<Github language="rust" start="28" end="43" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

그런 다음 CLI를 사용하여 이러한 새 메서드를 쿼리하고 올바르게 작동하는지 확인할 수 있습니다.

---

## 컨트랙트 재배포 {#redeploying-contract}

`nft_tokens_for_owner`에 필요한 로직을 구현했으므로 이제 컨트랙트를 빌드하고 계정에 재배포할 차례입니다. Using the cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

---

## 토큰 열거

업데이트된 컨트랙트가 재배포되면 이러한 새 함수가 예상대로 작동하는지 테스트하고 확인할 수 있습니다.

### NFT 토큰

컨트랙트에서 대체 불가능 토큰(NFT) 목록을 쿼리해 보겠습니다. 다음 명령을 사용하여 10번째 항목부터 최대 50개의 NFT 정보를 쿼리합니다.

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

<hr class="subsection" />

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

---

## 결론

이 튜토리얼에서는 [두 개의 새로운 열거 함수](/tutorials/nfts/enumeration#modifications-to-the-contract)를 추가했으며, 이제 생성 및 열거 메서드가 있는 기본 NFT 스마트 컨트랙트가 있습니다. 이러한 수정 사항을 구현한 후 스마트 컨트랙트를 재배포하고 CLI를 사용하여 기능을 테스트했습니다.

[다음 튜토리얼](/tutorials/nfts/core)에서는 사용자가 발행된 토큰을 전송할 수 있도록 하는 데 필요한 핵심 함수들을 구현합니다.

:::note 문서 버전 관리

글을 작성하는 시점에서, 해당 예제는 다음 버전에서 작동합니다.

- near-cli: `4.0.13`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`
- 열거 표준: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), `1.0.0` 버전

:::
