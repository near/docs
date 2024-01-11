---
id: minting
title: 발행
sidebar_label: 발행
---

이것은 모든 NEAR [NFT 표준](https://nomicon.io/Standards/NonFungibleToken/)을 준수하는 완전한 NFT 스마트 컨트랙트를 처음부터 만드는 시리즈의 많은 튜토리얼 중 첫 번째입니다. 오늘은 NFT를 생성하고 NEAR 지갑에 표시하는 데 필요한 로직을 생성하는 방법을 배웁니다. 여기서는, 발행 함수를 추가하는 데 필요한 필수 코드 스니펫을 작성하여 중요한 [스마트 컨트랙트의 뼈대](/tutorials/nfts/js/skeleton)를 수정하게 됩니다.


:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

:::

## 소개

시작하려면 레퍼지토리 내 `1.skeleton` 브랜치로 전환하세요. 레퍼지토리를 복제하지 않은 경우 [컨트랙트 아키텍처](/tutorials/nfts/js/skeleton)를 참조하여 시작하세요.

```
git checkout 1.skeleton
```

튜토리얼의 발행 부분에 대한 완성된 코드를 보려면, `2.minting` 브랜치에서 찾을 수 있습니다.

## 뼈대 컨트랙트 수정 {#what-does-minting-mean}

발행에 필요한 로직을 구현하려면, 발행 프로세스를 더 작은 작업으로 나누고 하나씩 처리해야 합니다. 한 걸음 물러나, NFT를 발행한다는 것은 무엇을 의미합니까?

대체 불가능 토큰(NFT)을 발행하려면, 가능한 가장 간단한 방법으로는 컨트랙트에서 블록체인의 소유자와 토큰을 연결할 수 있어야 합니다. 즉, 다음과 같은 것들이 필요합니다.

- 컨트랙트에 대한 토큰 및 기타 정보를 추적하는 방법.
- `metadata` (나중에 자세히 설명)와 같은 각 토큰에 대한 정보를 저장하는 방법.
- 소유자와 토큰을 연결하는 방법.

이게 다입니다! 이제 우리는 더 큰 문제를 더 작고 덜 어려운 하위 작업으로 분류했습니다. 첫 번째 문제를 해결하는 것으로 시작하여 나머지 작업까지 진행해 봅시다.

### 컨트랙트에 정보 저장 {#storing-information}

`nft-contract/src/index.ts`로 가서 일부 코드 블록을 채우는 것으로 시작해 봅시다. 여기서 계정이 보유한 토큰 목록과 같은 컨트랙트에 대한 중요한 정보를 저장할 수 있어야 합니다.


가장 먼저 할 일은 컨트랙트 클래스에 정보를 추가하는 것입니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/index.ts#L16-L22
```

이를 통해, 컨트랙트의 어느 곳에서나 이러한 데이터 구조에 저장된 정보를 얻을 수 있습니다. 위의 코드는 3개의 토큰별 저장소를 생성했습니다.

- **tokensPerOwner**: 모든 계정이 소유한 토큰을 추적할 수 있습니다. 이는 계정 주소를 해당 계정이 소유한 일련의 토큰 ID 문자열에 매핑합니다.
- **tokensById**: 특정 토큰에 대한 모든 정보를 반환합니다. 토큰 ID 문자열을 `Token` 객체에 매핑합니다.
- **tokenMetadataById**: 특정 토큰에 대한 메타데이터만 반환합니다. 이는 토큰 ID 문자열을 `TokenMetadata` 객체에 매핑합니다.

또한 컨트랙트의 메타데이터와 컨트랙트 소유자를 추적할 것입니다.

#### 생성자(Constructor) 함수

다음으로 생성자 함수에 로직을 추가합니다. 이 함수는 컨트랙트를 처음 배포할 때 호출해야 합니다. 이는 위에서 정의한 모든 컨트랙트 필드를 기본값으로 초기화합니다. 여기서는 `ownerId` 및 `metadata` 필드만 사용자 지정할 수 있기 때문에, 이를 함수에 매개 변수로 추가했습니다.

이 함수는 모든 컬렉션을 비우는 것을 기본으로 하고, 전달받은 것과 같은 `owner`와 `metadata`를 설정합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/index.ts#L24-L43
```

개발을 할 때 종종 컨트랙트를 여러 번 배포해야 합니다. 컨트랙트를 초기화할 때마다 메타데이터를 전달해야 하는 것이 지루할 수 있다고 생각할 수 있습니다. 따라서 메타데이터는 사용자가 전달하지 않은 경우 일부 초기 데이터로 기본 설정되었습니다.

### 메타데이터 및 토큰 정보 {#metadata-and-token-info}

이제 컨트랙트 자체에 저장할 정보를 정의하고 컨트랙트를 초기화하는 몇 가지 방법을 정의했으므로, `Token`, `TokenMetadata`, 및 `NFTContractMetadata` 자료형에 들어갈 정보를 정의해야 합니다.

`nft-contract/src/metadata.ts` 파일로 이동해 보겠습니다. 여기가 해당 정보가 들어갈 위치입니다. [메타데이터에 대한 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)을 살펴보면, `TokenMetadata` 및 `NFTContractMetadata` 모두에 대해 저장해야 하는 모든 필수 정보를 찾을 수 있습니다. 다음 코드를 입력하기만 하면 됩니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/metadata.ts#L12-L104
```

이제 `Token` 구조체와 `JsonToken`이라는 것이 남습니다. `Token` 구조체는 메타데이터를 제외하고 토큰과 직접 관련된 모든 정보를 보유합니다. 기억한다면, 메타데이터는 컨트랙트 내 맵에 `tokenMetadataById`이라는 자료 구조로 저장됩니다. 이를 통해 토큰의 ID를 전달하기만 하면 모든 토큰에 대한 메타데이터를 빠르게 가져올 수 있습니다.

`Token` 구조체의 경우, 지금은 소유자만 추적합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/metadata.ts#L106-L117
```

`JsonToken`의 목적은 누군가 View 호출을 할 때마다 JSON 형태로 다시 보내려는 NFT에 대한 모든 정보를 보유하는 것입니다. 즉, 소유자, 토큰 ID 및 메타데이터를 저장해야 합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/metadata.ts#L119-L141
```

:::tip 여러분 중 일부는 _"왜 `Token` 구조체에 모든 정보를 저장하지 않는 거죠?"_ 라고 생각할 수도 있습니다. 그 이유는 토큰 구조에 모든 정보를 저장하는 것보다 필요할 때만 즉시 JSON 토큰을 구성하는 것이 실제로 더 효율적이기 때문입니다. 또한 일부 작업에는 토큰에 대한 메타데이터만 필요할 수 있으므로 메타데이터를 별도의 자료 구조에 두는 것이 더 적합합니다. :::

#### 컨트랙트 메타데이터 조회를 위한 함수

이제 이전 섹션에서 사용된 일부 자료형을 정의했으므로, 첫 번째 View 함수 `internalNftMetadata`를 만들어 보겠습니다. 이를 통해 사용자는 [메타데이터 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)에 따라 컨트랙트의 메타데이터를 쿼리할 수 있습니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/metadata.ts#L143-L150
```

이 함수는 컨트랙트에서 `NFTContractMetadata` 자료형의 `metadata` 객체를 가져와 반환합니다.

이와 같이 처음 두 작업을 완료했으며 튜토리얼의 마지막 부분으로 이동할 준비가 되었습니다.

### 발행 로직 {#minting-logic}

이제 모든 정보와 자료형이 정의되었으므로, 생성 로직이 어떻게 실행될지 브레인스토밍을 시작하겠습니다. 결국 특정 소유자에게 `Token` 및 `TokenId`를 연결해야 합니다. 유용할 수 있는 몇 가지 자료 구조를 다시 살펴보겠습니다.

```ts
//keeps track of all the token IDs for a given account
tokensPerOwner: LookupMap<AccountId, UnorderedSet<TokenId>>;

//keeps track of the token struct for a given token ID
tokensById: LookupMap<TokenId, Token>;

//keeps track of the token metadata for a given token ID
tokenMetadataById: UnorderedMap<TokenId, TokenMetadata>;
```

이러한 자료 구조를 살펴보면 다음을 수행할 수 있습니다.

- 수신자가 소유한 토큰 집합에 토큰 ID를 추가합니다. 이는 `tokensPerOwner` 필드에서 이루어질 것입니다.
- 토큰 객체를 만들고 토큰 ID를 `tokensById` 필드의 해당 토큰 개체에 매핑합니다.
- `tokenMetadataById`를 사용하여 토큰 ID를 메타데이터에 매핑합니다.

이 단계에서는 NFT 발행의 스토리지 비용을 고려하는 것이 중요합니다. 자료 구조에 항목이 생성되어 컨트랙트에 바이트를 추가하므로, 컨트랙트에서 스토리지 비용을 충당해야 합니다. 모든 사용자가 무료로 NFT를 발행할 수 있도록 만든 경우, 해당 시스템은 쉽게 남용될 수 있으며 사용자는 본질적으로 수천 개의 NFT를 발행하여 모든 컨트랙트 내 자금을 "탈취"할 수 있습니다. 이러한 이유로 사용자가 스토리지 비용을 충당하기 위해 호출에 금액을 첨부해야 하도록 만들 것입니다. 아무것도 추가되기 전에, 초기 스토리지 사용량을 측정하고 모든 로직이 완료된 후 최종 스토리지 사용량을 측정합니다. 그런 다음 사용자가 해당 비용을 충당하기에 충분한 $NEAR를 첨부했는지 확인하고, 너무 많이 첨부한 경우 환불합니다.

이제 모든 것이 어떻게 진행되어야 하는지 잘 이해했으므로, 필요한 코드를 입력해 보겠습니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/mint.ts#L7-L44
```

여기서 `refundDeposit`과 `internalAddTokenToOwner`와 같은 몇 가지 내부 메서드를 사용하고 있음을 알 수 있습니다. 우리는 `refundDeposit`의 기능에 대해 설명했습니다. 또한 `internalAddTokenToOwner`도, 계정이 컨트랙트의 `tokensPerOwner` 자료 구조에 대해 소유한 토큰 집합에 토큰을 추가합니다. `internal.ts`라는 파일에서 이 함수들을 만들 수 있습니다. 계속해서 파일을 만드세요. 새 컨트랙트 아키텍처는 다음과 같아야 합니다.

```
nft-contract
└── src
    ├── approval.ts
    ├── enumeration.ts
    ├── internal.ts
    ├── lib.ts
    ├── metadata.ts
    ├── mint.ts
    ├── nft_core.ts
    └── royalty.ts
```

새로 만든 `internal.ts` 파일에 다음을 추가합니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/internal.ts#L1-L54
```

이 시점에서 NFT를 발행할 수 있는 핵심 로직이 모두 준비되었습니다. 이제 다음 매개변수를 사용하는 `nft_mint` 함수를 사용할 수 있습니다.

- **token_id**: 발행하려는 토큰의 ID(문자열).
- **metadata**: 생성 중인 토큰의 메타데이터(`metadata.ts` 파일 내 에서 찾을 수 있는 `TokenMetadata` 자료형).
- **receiver_id**:  토큰 소유자를 지정.

내부적으로, 함수는 다음과 같이 동작할 것입니다.

1. 내부 발행 함수를 호출합니다.
2. 컨트랙트에 무엇이든 추가하기 전에, 초기 스토리지를 계산합니다.
3. 소유자 ID로 `Token` 객체를 만듭니다.
4. `tokensById` 필드에 토큰 ID를 삽입하여 새로 만든 토큰 객체에 토큰 ID를 연결합니다.
5. 토큰 ID를 `tokenMetadataById` 필드에 삽입하여 전달된 메타데이터에 연결합니다
6. `internalAddTokenToOwner`함수를 호출하여 소유자가 소유한 토큰 목록에 토큰 ID를 추가합니다.
7. 사용자가 이러한 비용을 위해 호출에 충분한 NEAR를 연결했는지 확인하려면 최종 및 순 스토리지를 계산합니다.

### 토큰 정보 조회

계속 진행하여 이 컨트랙트를 배포하고 초기화하여 NFT를 생성한다면, 방금 생성한 토큰에 대한 정보를 알거나 조회할 방법이 없습니다. 특정 NFT의 정보를 쿼리하는 방법을 빠르게 추가해 보겠습니다. `nft-contract/src/nft_core.ts` 파일로 이동하여 `internalNftToken` 함수를 편집합니다.

이는 토큰 ID를 매개변수로 사용하고 해당 토큰에 대한 정보를 반환할 것입니다. `JsonToken`에는 토큰 ID, 소유자 ID 및 토큰의 메타데이터가 포함됩니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/nft_core.ts#L10-L35
```

이 작업이 완료되면, 이제 첫 NFT를 생성할 수 있도록 컨트랙트를 구축하고 배포할 차례입니다.

## 온체인에서 컨트랙트와 상호 작용

이제 발행 로직이 완료되고 특정 토큰에 대한 정보를 조회하는 방법을 추가했으므로 컨트랙트를 빌드하고 블록체인에 배포할 차례입니다.

### 컨트랙트 배포 {#deploy-the-contract}

이 튜토리얼 전체에서 컨트랙트를 구축하는 가장 쉬운 방법은 `yarn`입니다. 다음 명령은 컨트랙트를 작성하고 `.wasm` 파일을 `build/nft.wasm` 폴더로 복사합니다.

```bash
yarn build:nft
```

배포하려면 로컬 장치에 키가 저장된 NEAR 계정이 필요합니다. Navigate to the [NEAR wallet](https://testnet.mynearwallet.com//) site and create an account.

:::info
기존에 컨트랙트가 없는 계정에 컨트랙트를 배포했는지 확인하십시오. 새 계정을 만들거나 이 튜토리얼의 하위 계정을 만드는 것이 가장 쉽습니다.
:::

터미널에서 다음 명령을 실행하여 새로 만든 계정에 `near-cli`로 로그인합니다.

```bash
near login
```

이 튜토리얼을 더 쉽게 복사/붙여넣기할 수 있도록, 계정 ID에 대한 환경 변수를 설정하겠습니다. 아래 명령에서 `YOUR_ACCOUNT_NAME`를  `.testnet` 부분을 포함하여 방금 로그인한 계정 이름으로 바꿉니다.

```bash
export NFT_CONTRACT_ID="YOUR_ACCOUNT_NAME"
```

다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $NFT_CONTRACT_ID
```

터미널에 올바른 계정 ID가 출력되어 있는지 확인하세요. 모든 것이 올바르게 보이면 이제 컨트랙트를 배포할 수 있습니다. NFT 프로젝트의 루트에서 다음 명령을 실행하여 스마트 컨트랙트를 배포합니다.

```bash
near deploy --wasmFile build/nft.wasm --accountId $NFT_CONTRACT_ID
```

이 시점에서 컨트랙트가 당신의 계정에 배포되었어야 하며, NFT 테스트 및 발행 작업으로 이동할 준비가 된 것입니다.

### 컨트랙트 초기화 {#initialize-contract}

컨트랙트가 배포되면 가장 먼저 해야 할 일은 컨트랙트를 초기화하는 것입니다. 단순화를 위해 CLI에서 수동으로 메타데이터를 입력할 필요가 없도록, 이전에 작성한 기본 메타데이터 초기화 함수를 호출해 보겠습니다.

```bash
near call $NFT_CONTRACT_ID init '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID
```

이를 통해 일부 기본 메타데이터로 컨트랙트를 초기화하고 계정 ID를 소유자로 설정했습니다. 이제 첫 번째 view 함수를 호출할 준비가 되었습니다.

### 컨트랙트 메타데이터 보기

이제 컨트랙트가 초기화되었으므로 이전에 작성한 일부 함수를 호출할 수 있습니다. 보다 구체적으로 컨트랙트 메타데이터를 반환하는 함수를 테스트해 보겠습니다.

```bash
near view $NFT_CONTRACT_ID nft_metadata
```

그러면 다음과 유사한 출력이 반환됩니다.

```bash
{ spec: 'nft-1.0.0', name: 'NFT Tutorial Contract', symbol: 'GOTEAM' }
```

이제 첫 번째 NFT를 발행할 준비가 되었습니다.

### 첫 NFT 발행 {#minting-our-first-nft}

이제 생성한 발행 함수를 호출해 보겠습니다. 이를 위해 `token_id`와 `metadata`가 필요합니다. 이전에 생성한 `TokenMetadata` 구조체를 다시 살펴보면 잠재적으로 온체인에 저장할 수 있는 많은 필드가 있습니다.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/2.minting/src/nft-contract/metadata.ts#L91-L102
```

시작하려면 제목, 설명 및 미디어가 있는 NFT를 만들어 봅시다. 미디어 필드는 미디어 파일을 가리키는 URL일 수 있습니다. 우리에게는 생성할 수 있는 훌륭한 GIF가 있지만, 사용자 지정 NFT를 생성하고 싶다면 미디어 링크를 선택한 것으로 교체하기만 하면 됩니다. 다음 명령을 실행하면 다음 매개 변수를 사용하여 NFT를 생성합니다.

- **token_id**: "token-1"
- **metadata**:
  - _title_: "My Non Fungible Team Token"
  - _description_: "The Team Most Certainly Goes :)"
  - _media_: `https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif`
- **receiver_id**: "'$NFT_CONTRACT_ID'"

```bash
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --amount 0.1
```

:::info `amount` 플래그는 호출에 첨부할 NEAR의 양을 지정합니다. 스토리지 비용을 지불해야 하므로 0.1 NEAR가 붙고, 마지막에 사용하지 않은 초과분은 환불됩니다. :::

### NFT에 대한 정보 보기

이제 NFT가 발행되었으므로, `nft_token` 함수를 호출하여 모든 것이 올바르게 진행되었는지 확인할 수 있습니다. 이는 `token_id`, `owner_id`, 및 `metadata`를 포함해야 하는 `JsonToken`를 반환합니다.

```bash
near view $NFT_CONTRACT_ID nft_token '{"token_id": "token-1"}'
```

<details>
<summary>응답 예시: </summary>
<p>

```bash
{
  token_id: 'token-1',
  owner_id: 'goteam.examples.testnet',
  metadata: {
    title: 'My Non Fungible Team Token',
    description: 'The Team Most Certainly Goes :)',
    media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif'
  }
}
```

</p>
</details>

**완료되었습니다!** 이제 모든 것이 올바르게 작동함을 확인했으며, NEAR 지갑의 수집품 탭에서 새로 발행된 NFT를 볼 시간입니다!

## 지갑에서 NFT 보기

If you navigate to the [collectibles tab](https://testnet.mynearwallet.com//?tab=collectibles) in the NEAR wallet, this should list all the NFTs that you own. 현재 비어 있어야 합니다.

문제가 생겼습니다. 지갑은 당신이 NFT를 발행했다고 올바르게 선택했지만, 컨트랙트는 해당 view 기능을 구현하지 않습니다. 뒤에서 지갑은 컨트랙트에서 귀하의 계정이 소유한 모든 NFT 목록을 얻기 위해 `nft_tokens_for_owner` 호출을 시도하고 있습니다. 그러나 우리가 만든 유일한 함수는 `nft_token` 함수입니다. 지갑이 사용자가 정보를 얻어야 하는 모든 단일 NFT에 대해 `nft_token`을 매번 호출하는 것은 매우 효율적이지 않으므로, 대신 `nft_tokens_for_owner` 함수를 호출하려고 합니다.

다음 튜토리얼에서는 지갑에서 NFT를 볼 수 있도록 기존 컨트랙트에 패치 수정을 배포하는 방법에 대해 알아봅니다.

## 결론

이 튜토리얼에서는 컨트랙트 뼈대를 사용하여 블록체인에서 NFT를 생성하는 로직을 설정하고 이해하는 기본 사항을 살펴보았습니다.

먼저 NFT를 발행하는 것이 [무엇을 의미하는지](#what-does-minting-mean), 그리고 문제를 보다 실현 가능한 덩어리로 나누는 방법을 살펴보았습니다. 그런 다음 컨트랙트에 [정보/상태를 저장하는](#storing-information) 문제를 해결하는 것부터 시작하여 컨트랙트 뼈대의 덩어리들을 덩어리 별로 수정하기 시작했습니다. 그런 다음 [메타데이터 및 토큰 정보](#metadata-and-token-info)에 무엇을 넣을지 살펴보았습니다. 마지막으로 [NFT 발행](#minting-logic)에 필요한 로직을 살펴보았습니다.

컨트랙트가 작성된 후 블록체인에 배포할 시간이었습니다. 현재 [컨트랙트를 배포](#deploy-the-contract)하고 [초기화](#initialize-contract) 했습니다. 마지막으로, [첫 NFT를 발행](#minting-our-first-nft)하고, 지갑에서 보기 전에 일부 변경이 필요하다는 것을 확인했습니다.

## 다음 단계

[다음 튜토리얼](/tutorials/nfts/js/upgrade-contract)에서는 패치 수정 사항을 배포하는 방법과 지갑에서 NFT를 볼 수 있도록 하는 것이 무엇을 의미하는지 알아봅니다.

:::note 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전
- 메타데이터 표준: [NEP177](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata), `2.1.0` 버전

:::
