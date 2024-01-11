---
id: skeleton
title: 뼈대 및 JavaScript 아키텍처
sidebar_label: 컨트랙트 아키텍처
---

> 이 글에서는 이 _"Zero to Hero"_ 시리즈를 진행하면서 개발하게 될 NFT 컨트랙트의 기본 아키텍처에 대해 알아봅니다. 컨트랙트의 레이아웃을 발견하고 완전한 기능을 갖춘 스마트 컨트랙트를 구축하기 위해 JavaScript 파일이 어떻게 구성되어 있는지 확인할 수 있습니다.


:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

:::

## 소개

이 튜토리얼은 NFT 스마트 컨트랙트의 코드 뼈대와 파일 구조를 보여줍니다. 모든 기능이 배치된 방법과 채워야 하는 누락된 JS 코드를 찾을 수 있습니다. 모든 파일과 기능이 다루어지면, 모형 컨트랙트를 작성하는 프로세스를 거쳐서 확인합니다. 모든 것이 올바르게 작동할 것입니다.

## 파일 구조

일반 [JavaScript](https://www.javascript.com/) 프로젝트에 따라 이 스마트 컨트랙트의 파일 구조는 다음과 같습니다.

- `package.json` : 프로젝트에서 사용되는 패키지 및 스크립트를 정의하는 파일입니다.
- `src` : 모든 JavaScript 소스 파일이 저장되는 폴더입니다.
- `build` : 컴파일된 `wasm` 파일이 출력될 폴더입니다.

### 소스 파일

| 파일                               | 설명                                              |
| -------------------------------- | ----------------------------------------------- |
| [approval.ts](#approvalts)       | 대체 불가능 토큰(NFT)의 액세스 및 전송을 제어하는 ​​내부 함수들이 존재합니다. |
| [enumeration.ts](#enumerationts) | NFT 토큰 및 해당 소유자를 쿼리하는 내부 메서드를 포함합니다.            |
| [index.ts](#indexts)             | 공개된 스마트 컨트랙트 함수들을 가지고 있습니다.                     |
| [metadata.ts](#metadatats)       | 토큰 및 메타데이터 구조를 정의합니다.                           |
| [mint.ts](#mintts)               | 내부 토큰 발행 로직을 포함합니다.                             |
| [nft_core.ts](#nft_corets)       | 사용자 간에 NFT를 전송할 수 있는 내부 핵심 로직을 포함합니다.           |
| [royalty.ts](#royaltyts)         | 내부 지불 관련 함수를 포함합니다.                             |

```
nft-tutorial-js
└── src
    market-contract
    nft-contract
    ├── approval.ts
    ├── enumeration.ts
    ├── index.ts
    ├── metadata.ts
    ├── mint.ts
    ├── nft_core.ts
    └── royalty.ts
```

:::tip [GitHub 레퍼지토리](https://github.com/near-examples/nft-tutorial-js/tree/1.skeleton)에서 코드를 살펴보세요. :::

---

## `approval.ts`

> 이를 통해 사람들은 다른 계정을 NFT를 대신 전송할 수 있게끔 승인할 수 있습니다.

이 파일에는 표준의 [승인 관리](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) 확장을 준수하는 내부 로직이 포함되어 있습니다. 다음은 메서드 및 기능에 대한 분석입니다.

| 메서드                       | 설명                                                                       |
| ------------------------- | ------------------------------------------------------------------------ |
| **internalNftApprove**    | 사용자를 대신하여 토큰을 전송할 계정 ID를 승인합니다. **nft_approve** 에서 호출됩니다.                |
| **internalNftIsApproved** | 입력 계정에 토큰 ID를 승인할 수 있는 액세스 권한이 있는지 확인합니다. **nft_is_approved**에서 호출됩니다. |
| **internalNftRevoke**     | 사용자를 대신하여 토큰을 전송하는 특정 계정을 취소합니다. **nft_revoke**에서 호출됩니다.                 |
| **internalNftRevokeAll**  | 사용자를 대신하여 토큰을 전송하는 모든 계정을 취소합니다. **nft_revoke_all**에서 호출됩니다.           |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/approval.ts#L9-L69
```

Zero to Hero 시리즈의 [승인 섹션](/tutorials/nfts/js/approvals)에서 이러한 함수들에 대해 자세히 알아볼 수 있습니다.

---

## `enumeration.ts`

> 이 파일은 NFT에 대한 정보를 보는 데 필요한 내부 함수들을 제공하며 표준의 [열거(Enumeration)](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) 확장자를 따릅니다.

| 메서드                           | 설명                                                                      |
| ----------------------------- | ----------------------------------------------------------------------- |
| **internalNftTotalSupply**    | 컨트랙트에 저장된 NFT의 총량을 반환합니다. **nft_total_supply**에서 호출됩니다.               |
| **internalNftTokens**         | 소유자와 관계없이 컨트랙트에 저장된 페이지가 매겨진 NFT 목록을 반환합니다. **nft_tokens**에서 호출됩니다.     |
| **internalNftSupplyForOwner** | 주어진 사용자가 소유한 총 NFT 수를 볼 수 있습니다. **nft_supply_for_owner**에서 호출됩니다.     |
| **internalNftTokensForOwner** | 지정된 사용자가 소유한 NFT 목록을 페이지 형태로 반환합니다. **nft_tokens_for_owner**에서 호출됩니다. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/enumeration.ts#L8-L62
```

튜토리얼 시리즈의 [열거 섹션](/tutorials/nfts/js/enumeration)에서 이러한 함수에 대해 자세히 알아볼 수 있습니다.

---

## `metadata.ts`

> 이 파일은 토큰 및 메타데이터에 대해 저장할 정보를 추적하는 데 사용됩니다. 또한 이를 통해 표준 메타데이터 확장의 일부인 컨트랙트의 [메타데이터](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)를 보는 함수를 정의할 수 있습니다.

| 이름                      | 설명                                                                  |
| ----------------------- | ------------------------------------------------------------------- |
| **TokenMetadata**       | 이 구조는 각 토큰에 대해 저장할 수 있는 메타데이터를 정의합니다. (제목, 설명, 미디어 등)               |
| **Token**               | 이 구조는 각 토큰에 대한 컨트랙트에 어떤 정보가 저장될 것인지를 설명합니다.                         |
| **JsonToken**           | View 호출을 통해 NFT에 대한 정보를 조회할 때, 반환된 정보는 이 JSON 토큰에 저장됩니다.            |
| **internalNftMetadata** | 이 함수를 통해 사용자는 컨트랙트의 내부 메타데이터를 쿼리할 수 있습니다. **nft_metadata**에서 호출됩니다. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/metadata.ts#L12-L46
```

튜토리얼 시리즈의 [발행 섹션](/tutorials/nfts/js/minting)에서 이러한 기능에 대해 자세히 알아볼 것입니다.

---

## `mint.ts`

> 내부 토큰 발행 로직을 포함합니다.

| 메서드                 | 설명                                            |
| ------------------- | --------------------------------------------- |
| **internalNftMint** | 이 함수는 대체 불가능 토큰을 생성합니다. **nft_mint**에서 호출됩니다. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/mint.ts#L7-L23
```

---

## `nft_core.ts`

> 사용자 간에 NFT를 전송할 수 있는 핵심 로직입니다.

| 메서드                            | 설명                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **internalNftTransfer**        | NFT를 수신자 ID로 전송합니다. **nft_transfer**에서 호출됩니다.                                                                                                                                                                                                                                             |
| **internalNftTransferCall**    | NFT를 수신자에게 전송하고 수신자 ID 컨트랙트의 함수를 호출합니다. 보낸 사람의 계정에서 토큰이 전송된 경우 함수는 `true`를 반환합니다. **nft_transfer_call**에서 호출됩니다.                                                                                                                                                                        |
| **internalNftToken**           | 사용자가 특정 NFT에 대한 정보를 쿼리할 수 있도록 합니다. **nft_token**에서 호출됩니다.                                                                                                                                                                                                                               | |
| **internalNftResolveTransfer** | `nft_transfer_call`을 시작하고 NFT를 전송할 때의 표준에 따르면, 수신자의 컨트랙트에 있는 메서드도 호출해야 합니다. 수신자가 발신자에게 NFT를 반환해야 하는 경우(`nft_on_transfer` 메서드의 반환 값에 따라) 이 함수를 사용하면 해당 로직을 실행할 수 있습니다. **nft_resolve_transfer**에서 호출됩니다.                                                                                 |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/nft_core.ts#L10-L85
```

튜토리얼 시리즈의 [발행 섹션](/tutorials/nfts/js/minting)에서 이러한 함수들에 대해 자세히 알아볼 것입니다.

---

## `royalty.ts`

> 내부 지불 관련 기능을 포함합니다.

| 메서드                           | 설명                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| **internalNftPayout**         | 이 내부 메서드는 주어진 토큰에 대한 지불금을 계산합니다. **nft_payout**에서 호출됩니다.                                      |
| **internalNftTransferPayout** | 토큰을 수신자 ID로 전송하고 주어진 잔고에 대해 지불해야 하는 지불 객체를 반환하는 내부 메서드입니다. **nft_transfer_payout**에서 호출됩니다. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/royalty.ts#L7-L45
```

튜토리얼 시리즈의 [로열티 섹션](/tutorials/nfts/js/royalty)에서 이러한 함수들에 대해 자세히 알아볼 수 있습니다.

---

## `index.ts`

> 이 파일은 스마트 컨트랙트 클래스와 해당 컨트랙트가 저장하고 추적하는 정보의 개요를 설명합니다. 또한 사용자가 호출할 수 있는 모든 공용 메서드를 공개합니다.

| 메서드                        | 설명                                                          |
| -------------------------- | ----------------------------------------------------------- |
| **init**                   | 일부 메타데이터 및 기본 상태로 컨트랙트를 초기화하는 데 사용되는 생성자 함수입니다.             |
| **nft_mint**               | NFT를 발행하기 위해 내부 발행 함수를 호출합니다.                               |
| **nft_token**              | 특정 NFT에 대한 정보를 쿼리하기 위해 내부 함수를 호출합니다.                        |
| **nft_transfer**           | 내부 함수를 호출하여 NFT를 전송합니다.                                     |
| **nft_transfer_call**    | 내부 함수를 호출하여 NFT를 전송하고 수신자의 컨트랙트에서 `nft_on_transfer`를 호출합니다. |
| **nft_resolve_transfer** | 전송 호출 약속을 해결하기 위해 내부 함수를 호출합니다.                             |
| **nft_is_approved**      | 누군가 NFT를 승인했는지 여부를 확인하기 위해 내부 함수를 호출합니다.                    |
| **nft_approve**            | 내부 함수를 호출하여 누군가 NFT를 전송하도록 승인합니다.                           |
| **nft_payout**             | NFT에 대한 지불 객체를 쿼리하기 위해 내부 함수를 호출합니다.                        |
| **nft_transfer_payout**  | 내부 함수를 호출하여 NFT를 전송하고 지불 객체를 반환합니다.                         |
| **nft_revoke**             | NFT를 전송하기 위해 누군가의 액세스 권한을 취소하는 내부 함수를 호출합니다.                |
| **nft_revoke_all**       | NFT를 전송하기 위해 모든 사람의 액세스 권한을 취소하는 내부 함수를 호출합니다.              |
| **nft_total_supply**     | 내부 함수를 호출하여 컨트랙트에서 NFT의 총 공급량을 쿼리합니다.                       |
| **nft_tokens**             | 컨트랙트 내 NFT를 페이지로 매기기 위해 내부 함수를 호출합니다.                       |
| **nft_tokens_for_owner** | 주어진 소유자가 가진 NFT를 페이지로 매기는 내부 함수를 호출합니다.                     |
| **nft_supply_for_owner** | 누군가가 소유한 총 NFT 수를 쿼리하기 위해 내부 함수를 호출합니다.                     |
| **nft_metadata**           | 컨트랙트의 메타데이터를 쿼리하기 위해 내부 함수를 호출합니다.                          |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/index.ts#L16-L157
```

튜토리얼 시리즈의 [발행 섹션](/tutorials/nfts/js/minting)에서 이러한 기능에 대해 자세히 알아볼 것입니다.

---

## 뼈대 구축

- 아직 기본 레퍼지토리를 복제하지 않은 경우 터미널을 열고 다음을 실행합니다.

```sh
git clone https://github.com/near-examples/nft-tutorial-js/
```

- 그런 다음 `1.skeleton` 브랜치로 전환하세요.
- 의존성을 설치합니다(JS SDK 포함): `yarn`
- `yarn build`를 통해 컨트랙트를 구축합니다.

```sh
git clone https://github.com/near-examples/nft-tutorial-js/
cd nft-tutorial-js
git checkout 1.skeleton
yarn && yarn build
```

이 작업이 완료되면, `nft-tutorial-js/build` 디렉토리에 `nft.wasm` 스마트 컨트랙트가 포함되어야 합니다!

뼈대 구축은 모든 것이 제대로 작동하는지 확인하고 다음 튜토리얼에서 이 NFT 컨트랙트의 개선 버전을 컴파일할 수 있는지 확인하는 데 유용합니다.

---

## 결론

이 NFT 스마트 컨트랙트의 레이아웃과 다양한 소스 파일에 모든 함수가 어떻게 배치되어 있는지 확인했습니다. `yarn`을 사용하여 컨트랙트를 컴파일할 수 있었고, 다음 [발행 튜토리얼](/tutorials/nfts/js/minting)에서 이 뼈대를 구체화하기 시작할 것입니다.

:::note 문서 버전 관리 이 글을 쓰는 시점에서, 이 예제는 다음 버전에서 작동합니다.

- near-sdk-js: `0.4.0-5`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전

:::
