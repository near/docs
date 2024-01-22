---
id: series
title: NFT 컨트랙트 커스터마이징
sidebar_label: 게으른 발행, 컬렉션 등!
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 작업한 [기존 NFT 컨트랙트](https://github.com/near-examples/nft-tutorial)를 사용하여 생태계에서 가장 일반적인 요구 사항을 충족하도록 수정하는 방법을 배웁니다. 여기에는 다음이 포함됩니다.
- NFT 게으른 발행(Lazy Minting)
- 컬렉션 만들기
- 발행 액세스 제한
- 고도로 최적화된 스토리지
- 해킹 열거 메서드

## 소개

이제 기본 NFT 스마트 컨트랙트에 대해 더 깊이 이해했으므로, 창의력을 발휘하고 더 고유한 기능을 구현할 수 있습니다. 기본 컨트랙트는 간단한 사용 사례에 정말 잘 작동하지만, NFT의 잠재력을 탐색하기 시작하면 이를 기반으로 확장할 수 있습니다.

재미있는 비유를 들어보겠습니다. 여러분이 이제 머핀 표준 레시피를 가지고 있습니다. 이제 자신만의 맛있는 머핀을 만들기 위해 어떻게 변경할지 결정하는 것은 여러분에게 달려 있습니다. 블루베리는 어떠신가요?

아래에서, 위 문제에 대한 잠재적 솔루션을 보여줌으로써, 우리는 이러한 새로운 것들을 몇 가지를 만들었습니다. 기본 NFT 컨트랙트를 커스터마이징하는 방법을 시연하면서, 귀하의 독창성을 활성화하여 가능한 것들을 소개할 것입니다. NFT의 진정한 잠재력을 발견하는 데 도움이 되기를 바랍니다. 💪

<img width="45%" src="/docs/assets/nfts/customizing-logic-meme.png" />

### NFT 컬렉션 및 시리즈

NFT 컬렉션은 기본 NFT 컨트랙트를 처리할 때, 다음과 같은 두 가지 일반적인 문제를 해결하는 데 도움이 됩니다.
- 반복되는 데이터 저장
- 데이터 및 코드 구성

NFT 공간에서 컬렉션의 개념은 매우 느슨한 의미를 가지며, 다양한 방식으로 해석될 수 있습니다. 우리의 경우, 컬렉션을 **유사한 메타데이터**를 공유하는 토큰 집합으로 정의합니다. 예를 들어 당신은 그림을 만들고 100개의 동일한 사본을 판매하기를 원할 수 있습니다. 이 경우 100개 모두 동일한 *컬렉션* 의 일부가 됩니다. 각 작품에는 동일한 아티스트, 제목, 설명, 미디어 등이 있습니다.

기본 NFT 컨트랙트의 가장 큰 문제 중 하나는, 유사한 데이터를 여러 번 저장한다는 것입니다. NFT를 발행하는 경우 컨트랙트는 모든 **단일 토큰 ID**에 대해 메타데이터를 개별적으로 저장합니다. NFT의 시리즈 또는 컬렉션 아이디어를 도입하여, 이 문제를 해결할 수 있습니다.

시리즈는 *모두* 유사한 정보를 공유하는 토큰 ID의 버킷으로 생각할 수 있습니다. 이 정보는 시리즈가 **생성** 될 때 지정되며 메타데이터, 로열티, 가격 등이 될 수 있습니다. **모든 토큰 ID**에 대해 이 정보를 저장하는 대신, 시리즈에 한 번만 저장한 다음 토큰 ID를 해당 버킷과 연결할 수 있습니다.

### 제한된 액세스

현재 NFT 컨트랙트를 통해 누구나 NFT를 발행할 수 있습니다. 이는 일부 프로젝트에서 잘 작동하지만, 대다수의 dApp과 제작자는 컨트랙트에서 NFT를 생성할 수 있는 사람을 제한하기를 원합니다. 이것이 시리즈와 NFT 모두에 대한 허용 목록 기능을 도입하는 이유입니다. 여기에는 컨트랙트 소유자가 사용자 정의할 수 있는 두 가지 데이터 구조가 있습니다.
- 승인된 발행자
- 승인된 크리에이터

승인된 발행자라면, 주어진 시리즈에 대해 NFT를 자유롭게 발행할 수 있습니다. 그러나 새 시리즈를 만들 수는 없습니다.

반면, 승인된 크리에이터가 될 수도 있습니다. 이를 통해 NFT를 발행할 수 있는 새 시리즈를 정의할 수 있습니다. 귀하가 승인된 크리에이터라고 해서, 자동으로 승인된 발행자가 아니라는 점에 유의하는 것이 중요합니다. 이러한 각 권한은 컨트랙트 소유자가 부여해야 하며, 언제든지 취소할 수 있습니다.

### 게으른 발행

게으른 발행은 사용자가 *필요에 따라* 민팅할 수 있도록 합니다. 모든 NFT를 발행하고 스토리지 비용으로 $NEAR를 지불하는 대신, **구매 시에** 토큰을 발행할 수 있습니다. 이것은 불필요한 가스를 소각하는 것을 피하고, 모든 NFT가 판매되지 않을 때 스토리지를 절약하는 데 도움이 됩니다. 이해를 돕기 위해 일반적인 시나리오를 살펴보겠습니다.

Benji는 유명한 Go Team gif의 놀라운 디지털 그림을 만들었습니다. 그는 각각 1$NEAR에 1000개를 판매하려고 합니다. 전통적인 접근 방식을 사용하면, 그는 각 사본을 개별적으로 발행하고 스토리지 비용을 직접 지불해야 합니다. 그런 다음 그는 마켓플레이스 컨트랙트를 찾거나 배포하고, 1000개 사본을 판매할 스토리지 비용을 지불해야 합니다. 그는 각 토큰 ID를 판매 리스트에 올리기 위해 가스를 매번 소각해야 합니다.

그 후 사람들은 NFT를 구매할 것이고, 전부 또는 일부가 판매될 것이라는 보장은 없을 것입니다. 그의 작품이 단 한 점도 판매되지 않을 가능성이 있으며, Benji는 그 모든 시간과 노력과 돈을 낭비해 버릴 수도 있습니다. 😢

게으른 발행은 NFT가 주문형으로 자동으로 발행될 수 있도록 합니다. Benji는 시장에서 NFT를 구매하는 대신, NFT 컨트랙트에 대한 가격을 지정할 수 있으며, 사용자는 자금이 Benji의 계정으로 직접 분배되는 `nft_mint` 함수를 직접 호출할 수 있습니다.

이 모델을 사용하면, NFT는 실제로 구매할 **때만** 발행되며, Benji가 1000개의 NFT를 모두 발행하기 위해 지불해야 하는 선불 수수료는 없습니다. 또한 별도의 마켓플레이스 컨트랙트가 필요하지 않습니다.

이 예를 통해, 게으른 발행에 대한 높은 수준의 개요는 누군가가 "주문형"으로 주조할 수 있는 기능을 제공한다는 것입니다. NFT에 대한 수요가 있는지 확실하지 않습니다. 이 모델을 사용하면 누군가가 실제로 작품을 구매할 때만 NFT가 발행되기 때문에, 가스나 스토리지 비용을 낭비할 필요가 없습니다.


## 새로운 컨트랙트 파일 구조

지금까지 논의한 문제에 대한 솔루션을 구현한 방법을 살펴보겠습니다.

[`nft-tutorial`](https://github.com/near-examples/nft-tutorial)의 로컬로 복제된 예시에서 `main` 브랜치를 확인하고 최신 버전을 가져오세요.

```bash
git checkout main && git pull
```

프로젝트 루트에 `nft-series`라는 폴더가 있음을 알 수 있습니다. 이것은 스마트 컨트랙트 코드가 있는 곳입니다. `src` 폴더를 열면, 다음과 같이 표시됩니다.

```
src
├── approval.rs
├── enumeration.rs
├── events.rs
├── internal.rs
├── lib.rs
├── metadata.rs
├── nft_core.rs
├── owner.rs
├── royalty.rs
├── series.rs
```

## 차이점

이 코드의 대부분은 NFT 컨트랙트와 동일하지만, 이 컨트랙트와 기본 NFT 컨트랙트 사이에는 몇 가지 차이점이 있습니다.

### 메인 라이브러리 파일

`lib.rs`를 보면, 이제 다음 정보를 저장하도록 컨트랙트 구조가 수정되었음을 알 수 있습니다.

```diff
pub owner_id: AccountId,
+ pub approved_minters: LookupSet<AccountId>,
+ pub approved_creators: LookupSet<AccountId>,
pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,
pub tokens_by_id: UnorderedMap<TokenId, Token>,
- pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,
+ pub series_by_id: UnorderedMap<SeriesId, Series>,
pub metadata: LazyOption<NFTContractMetadata>,
```

보시다시피 `token_metadata_by_id`를 `series_by_id`로 교체하였고, 두 검색 집합을 추가했습니다.

- **series_by_id**: 시리즈 ID(u64)를 시리즈 객체에 매핑합니다.
- **approved_minters**: `nft_mint` 함수를 호출할 수 있는 계정을 추적합니다.
- **approved_creators**: 새 시리즈를 생성할 수 있는 계정을 추적합니다.

#### 시리즈 객체 {#series-object}
또한 이제 `Series`이라는 새 객체를 추적하고 있습니다

```rust
pub struct Series {
    // Metadata including title, num copies etc.. that all tokens will derive from
    metadata: TokenMetadata,
    // Royalty used for all tokens in the collection
    royalty: Option<HashMap<AccountId, u32>>,
    // Set of tokens in the collection
    tokens: UnorderedSet<TokenId>,
    // What is the price of each token in this series? If this is specified, when minting,
    // Users will need to attach enough $NEAR to cover the price.
    price: Option<Balance>,
    // Owner of the collection
    owner_id: AccountId,
}
```

이 객체는 각 토큰이 상속할 정보를 저장합니다. 여기에는 다음이 포함됩니다.
- 2-minting.md#metadata-and-token-info
- [로열티](6-royalty.md)
- 가격

:::caution 가격이 지정되면, 시리즈에서 누가 토큰을 발행할 수 있는지에 대한 제한이 없습니다. 또한, 만약 메타데이터에 `copies` 필드가 지정되어 있으면 해당 개수의 NFT**만** 발행할 수 있습니다. 필드를 생략하면 무제한의 토큰을 발행할 수 있습니다. :::

또한 이 시리즈에 대해 발행된 모든 토큰 ID를 추적하는 `tokens` 필드를 추가했습니다. 이를 통해 세트의 길이를 확인하여 `copies`의 상한선을 처리할 수 있습니다. 또한 시리즈의 모든 토큰을 통해 페이지로 정리할 수 있습니다.

### 시리즈 만들기

`series.rs`는 이전 [발행](2-minting.md) 로직을 대체하는 새 파일입니다. 이 파일은 시리즈 생성 및 발행 로직을 하나로 합치기 위해 생성되었습니다.

<Github language="rust" start="7" end="58" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/series.rs" />

The function takes in a series ID in the form of a [u64](https://doc.rust-lang.org/std/primitive.u64.html), the metadata, royalties, and the price for tokens in the series. It will then create the [Series object](#series-object) and insert it into the contract's series_by_id data structure. It's important to note that the caller must be an approved creator and they must attach enough $NEAR to cover storage costs.

### NFT 발행

Next, we'll look at the minting function. If you remember from before, this used to take the following parameters:
- 토큰 ID
- 메타데이터
- 수신자 ID
- 영구 로열티

With the new and improved minting function, these parameters have been changed to just two:
- 시리즈 ID
- 수신자 ID

The mint function might look complicated at first but let's break it down to understand what's happening. The first thing it does is get the [series object](#series-object) from the specified series ID. From there, it will check that the number of copies won't be exceeded if one is specified in the metadata.

It will then store the token information on the contract as explained in the [minting section](2-minting.md#storage-implications) of the tutorial and map the token ID to the series. Once this is finished, a mint log will be emitted and it will ensure that enough deposit has been attached to the call. This amount differs based on whether or not the series has a price.

#### 필요 금액

As we went over in the [minting section](2-minting.md#storage-implications) of this tutorial, all information stored on the contract costs $NEAR. When minting, there is a required deposit to pay for this storage. For *this contract*, a series price can also be specified by the owner when the series is created. This price will be used for **all** NFTs in the series when they are minted. If the price is specified, the deposit must cover both the storage as well as the price.

If a price **is specified** and the user more deposit than what is necessary, the excess is sent to the **series owner**. There is also *no restriction* on who can mint tokens for series that have a price. The caller does **not** need to be an approved minter.

If **no price** was specified in the series and the user attaches more deposit than what is necessary, the excess is *refunded to them*. In addition, the contract makes sure that the caller is an approved minter in this case.

:::info Notice how the token ID isn't required? This is because the token ID is automatically generated when minting. The ID stored on the contract is `${series_id}:${token_id}` where the token ID is a nonce that increases each time a new token is minted in a series. This not only reduces the amount of information stored on the contract but it also acts as a way to check the specific edition number. :::

<Github language="rust" start="60" end="149" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/series.rs" />

### View 함수

이제 시리즈 개념을 도입했으므로 더 많은 View 함수도 추가되었습니다.

:::info 일반적인 `Series` 구조체를 반환하는 대신, 새 `JsonSeries` 구조체를 생성한 방법에 주목하세요. `Series` 구조체에 직렬화할 수 없는 `UnorderedSet`이 포함되어 있기 때문입니다.

로열티 함수는 [이제](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/royalty.rs#L43) 토큰의 로열티가 아닌 시리즈의 로열티를 사용하여 지불 객체를 계산합니다.
<!-- TODO: add a learn more here call to action -->
:::

<Github language="rust" start="5" end="16" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs" />

view 함수는 아래에 나열되어 있습니다.
- **[get_series_total_supply](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L92)**: 현재 컨트랙트 있는 총 시리즈 수를 가져옵니다.
  - 인자: 없음.
- **[get_series](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L97)**: 컨트랙트의 모든 시리즈에 대해 페이지를 매기고, `JsonSeries` 객체의 벡터를 반환합니다.
  - 인자: `from_index: String | null`, `limit: number | null`.
- **[get_series_details](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L115)**: 특정 시리즈에 대한 `JsonSeries` 세부 정보를 가져옵니다.Get the
  - 인자: `id: number`.
- **[nft_supply_for_series](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L133)**: 특정 시리즈에 대해 발행된 총 NFT 수를 봅니다.
  - Arguments: `id: number`.
- **[nft_tokens_for_series](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L146)**: 특정 시리즈에 대한 모든 NFT에 대해 페이지를 매기고, `JsonToken` 객체의 벡터를 반환합니다.
  - 인자: `id: number`, `from_index: String | null`, `limit: number | null`.

:::info 모든 페이지 매김 함수에 총 공급량을 보기 위한 게터도 포함되어 있습니다. 이렇게 하면 전체 공급량과 함께 페이지 매김 함수의 `from_index` 및 `limit` 매개변수를 사용할 수 있으므로, 페이지 매김을 끝낼 위치를 알 수 있습니다. :::

### 최적화를 위한 View 호출 수정

정보를 온체인에 저장하는 것은 매우 비쌀 수 있습니다. 스마트 컨트랙트 개발 기술의 레벨이 올라감에 따라 조사해야 할 한 가지 영역은, 저장되는 정보의 양을 줄이는 것입니다. View 호출은 이러한 최적화의 완벽한 예입니다.

예를 들어 제목에 주어진 NFT의 에디션 번호를 전달하려는 경우, 모든 토큰에 대해 반드시 이를 온체인을 저장할 필요는 없습니다. 대신, 이 정보를 반환하기 전에 제목에 수동으로 추가하도록 view 함수를 수정할 수 있습니다.

이를 위해, 모든 열거 메서드의 중심인 `nft_token` 함수를 수정하는 방법이 있습니다.

<Github language="rust" start="156" end="193" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/nft_core.rs" />

예를 들어 토큰에 `"My Amazing Go Team Gif"`라는 제목이 있고, NFT가 에디션 42인 경우, 반환되는 새 제목은 `"My Amazing Go Team Gif - 42"`입니다. NFT의 메타데이터에 제목이 없으면, 시리즈 및 에디션 번호가 `Series {} : Edition {}` 형식으로 반환됩니다.

이는 작은 최적화이지만, 잠재적으로 많은 스토리지를 절약할 수 있으므로 이 아이디어는 매우 강력합니다. As an example: most of the time NFTs don't utilize the following fields in their metadata.
- issued_at
- expires_at
- starts_at
- updated_at

최적화를 위해, 이러한 필드를 포함하지 않도록 컨트랙트에 **저장된** 토큰 메타데이터를 변경할 수 있지만, `nft_token`에서 정보를 반환할 때 간단히 `null` 값으로 추가할 수 있습니다.

### 소유자 파일

마지막으로 살펴볼 파일은 `owner.rs`에 있는 소유자 파일입니다. 이 파일에는 컨트랙트 소유자만 호출할 수 있는 승인된 크리에이터 및 승인된 채굴자를 가져오고 설정하기 위한 모든 함수들이 포함되어 있습니다.

:::info 컨트랙트에 대해 원하는 경우 확인할 수 있는 다른 작은 변경 사항이 있습니다. 가장 주목할만한 것은 다음과 같습니다.
- 새 시리즈 ID를 반영하도록 `Token`및 `JsonToken` 객체가 [변경](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/metadata.rs#L40)되었습니다.
- `token_metadata_by_id`으로의 모든 참조가 `tokens_by_id`로 [변경](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L23)되었습니다.
- 로열티 함수는 [이제](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/royalty.rs#L43) 토큰의 로열티가 아닌 시리즈의 로열티를 사용하여 지불 객체를 계산합니다. :::

## 컨트랙트 구축

이제 컨트랙트를 잘 이해했으므로, 빌드를 시작하겠습니다. 다음 빌드 명령을 실행하여 컨트랙트를 wasm으로 컴파일합니다.

```bash
yarn build
```

이렇게 하면 `out/series.wasm` 디렉토리에 새 wasm 파일이 생성됩니다. 이것이 온체인에 배포할 파일입니다.

## 배포 및 초기화

다음으로, dev-account를 사용하여 이 컨트랙트를 네트워크에 배포합니다. 이전에 이 튜토리얼에서 이를 이미 사용한 적이 있는 경우, 새 계정을 만들기 전에 기존 dev 계정을 제거하는 `-f` 플래그를 포함해야 합니다.

```bash
near dev-deploy out/series.wasm && export NFT_CONTRACT_ID=$(cat neardev/dev-account)
```
환경 변수를 반영하여 이것이 올바르게 작동하는지 확인하세요.
```bash
echo $NFT_CONTRACT_ID
```
이것은 `dev-1660936980897-79989663811468`와 유사한 결과를 반환해야 합니다. 다음 단계는 일부 기본 메타데이터로 컨트랙트를 초기화하는 것입니다.

```bash
near call $NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID
```

이제 컨트랙트의 메타데이터를 쿼리하면 기본 메타데이터가 반환되어야 합니다.
```bash
near view $NFT_CONTRACT_ID nft_metadata
```

## 시리즈 생성

다음 단계는 두 개의 다른 시리즈를 만드는 것입니다. 하나는 게으른 발행에 대한 가격이 있고, 다른 하나는 단순히 가격이 없는 기본 시리즈입니다. 첫 번째 단계는 두 시리즈를 만드는 데 사용할 수 있는 소유자인 [하위 계정(sub-account)](../../4.tools/cli.md#create-a-sub-account)을 만드는 것입니다.

```bash
near create-account owner.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25 && export SERIES_OWNER=owner.$NFT_CONTRACT_ID
```

### 기본 시리즈

이제 가격과 로열티가 없는 간단한 시리즈를 만들어야 합니다. 소유자 계정을 승인된 크리에이터로 추가하기 전에, 다음 명령을 실행하려고 하면 컨트랙트에서 오류가 발생합니다.

```bash
near call $NFT_CONTRACT_ID create_series '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}}' --accountId $SERIES_OWNER --amount 1
```

예상되는 출력은 다음과 같은 오류입니다: `ExecutionError: 'Smart contract panicked: only approved creators can add a type`. 이제 시리즈 소유자를 크리에이터로 추가하면 제대로 작동합니다.

```bash
near call $NFT_CONTRACT_ID add_approved_creator '{"account_id": "'$SERIES_OWNER'"}' --accountId $NFT_CONTRACT_ID
```
```bash
near call $NFT_CONTRACT_ID create_series '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}}' --accountId $SERIES_OWNER --amount 1
```

이제 시리즈 정보를 쿼리하면 제대로 작동합니다!

```bash
near view $NFT_CONTRACT_ID get_series
```
다음과 유사한 결과를 반환해야 합니다.
```bash
[
  {
    series_id: 1,
    metadata: {
      title: 'SERIES!',
      description: 'testing out the new series contract',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    royalty: null,
    owner_id: 'owner.dev-1660936980897-79989663811468'
  }
]
```

### 가격이 있는 시리즈

이제 첫 번째 간단한 시리즈를 만들었으니, 가격이 1 $NEAR인 두 번째 시리즈를 만들어 보겠습니다.

```bash
near call $NFT_CONTRACT_ID create_series '{"id": 2, "metadata": {"title": "COMPLEX SERIES!", "description": "testing out the new contract with a complex series", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "price": "1000000000000000000000000"}' --accountId $SERIES_OWNER --amount 1
```

이제 시리즈를 통해 다시 페이지를 매기면, 둘 다 표시되어야 합니다.
```bash
near view $NFT_CONTRACT_ID get_series
```

이는 다음을 포함합니다.

```bash
[
  {
    series_id: 1,
    metadata: {
      title: 'SERIES!',
      description: 'testing out the new series contract',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    royalty: null,
    owner_id: 'owner.dev-1660936980897-79989663811468'
  },
  {
    series_id: 2,
    metadata: {
      title: 'COMPLEX SERIES!',
      description: 'testing out the new contract with a complex series',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    royalty: null,
    owner_id: 'owner.dev-1660936980897-79989663811468'
  }
]
```

## NFT 발행

두 시리즈를 모두 만들었으므로 이제 NFT를 만들 차례입니다. [`near login`](../../4.tools/cli.md#near-login)를 사용하여 기존 NEAR 지갑으로 로그인하거나, NFT 컨트랙트의 하위 계정을 만들 수 있습니다. 우리의 경우 하위 계정을 사용합니다.

```bash
near create-account buyer.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25 && export BUYER_ID=buyer.$NFT_CONTRACT_ID
```

### 게으른 발행

테스트할 첫 번째 워크플로우는 [게으른 발행](#lazy-minting) NFT입니다. 두 번째 시리즈의 가격은 1$NEAR입니다. 이는 발행 제한이 없으며, 누구나 NFT를 시도하고 구매할 수 있음을 의미합니다. 시도해 봅시다.

NEAR 지갑에서 NFT를 보려면, `receiver_id`가 현재 지갑 사이트에서 사용할 수 있는 계정이어야 합니다. 이를 환경 변수로 내보냅시다. 다음 명령을 실행하되, `YOUR_ACCOUNT_ID_HERE`를 실제 NEAR 계정 ID로 변경하세요.

```bash
export NFT_RECEIVER_ID=YOUR_ACCOUNT_ID_HERE
```
이제 발행 명령을 실행하려고 하지만, 충분한 $NEAR를 첨부하지 않으면 오류가 발생합니다.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"id": "2", "receiver_id": "'$NFT_RECEIVER_ID'"}' --accountId $BUYER_ID
```

명령을 다시 실행하되, 이번에는 1.5 $NEAR를 첨부합니다.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"id": "2", "receiver_id": "'$NFT_RECEIVER_ID'"}' --accountId $BUYER_ID --amount 1.5
```

그러면 다음과 같은 로그가 출력되어야 합니다.

```bash
Receipts: BrJLxCVmxLk3yNFVnwzpjZPDRhiCinNinLQwj9A7184P, 3UwUgdq7i1VpKyw3L5bmJvbUiqvFRvpi2w7TfqmnPGH6
    Log [dev-1660936980897-79989663811468]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["2:1"]}]}
Transaction Id FxWLFGuap7SFrUPLskVr7Uxxq8hpDtAG76AvshWppBVC
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/FxWLFGuap7SFrUPLskVr7Uxxq8hpDtAG76AvshWppBVC
''
```

익스플로러 링크를 확인하면, 소유자가 `1.493 $NEAR` 만큼의 주문을 받은 것으로 표시되어야 합니다.

<img width="80%" src="/docs/assets/nfts/explorer-payout-series-owner.png" />

### 허용된 발행자 되기

가격 없이 간단한 시리즈에 대해 NFT를 발행하려고 하면 승인된 발행자가 아니라는 오류가 발생합니다.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"id": "1", "receiver_id": "'$NFT_RECEIVER_ID'"}' --accountId $BUYER_ID --amount 0.1
```

계속해서 다음 명령을 실행하여 구매자 계정을 승인된 발행자로 추가하세요.

```bash
near call $NFT_CONTRACT_ID add_approved_minter '{"account_id": "'$BUYER_ID'"}' --accountId $NFT_CONTRACT_ID
```

이제 발행 명령을 다시 실행하면, 제대로 작동합니다.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"id": "1", "receiver_id": "'$NFT_RECEIVER_ID'"}' --accountId $BUYER_ID --amount 0.1
```

### 지갑에서 NFT 보기

이제 두 NFT를 모두 받았으므로 NEAR 지갑에 표시되어야 합니다. 수집품 탭을 열고 `NFT Series Contract` 제목이 있는 컨트랙트를 검색하면, 두 개의 NFT를 소유하고 있을 것입니다. 하나는 복잡한 시리즈여야 하고 다른 하나는 단순한 버전이어야 합니다. NFT는 각 시리즈의 첫 번째 에디션이기 때문에, 둘 다 제목 끝에 `- 1`이 추가 되어야 합니다.

<img width="80%" src="/docs/assets/nfts/series-wallet-collectibles.png" />

만세! 시리즈 컨트랙트를 성공적으로 배포하고 테스트했습니다! **화이팅!**

## 결론

이 튜토리얼에서는 기본 NFT 컨트랙트를 가져오고 이를 반복하여 커뮤니티의 요구 사항을 충족하는 복잡한 사용자 지정 버전을 만드는 방법을 배웠습니다. 스토리지를 최적화하고, 컬렉션 아이디어를 도입하며, 게으른 발행 기능을 만들고, 열거 함수를 해킹하여 스토리지를 절약하며, 허용 목록 기능을 만들었습니다.

그런 다음 컨트랙트를 작성하고 체인에 배포했습니다. 컨트랙트가 온체인 상태가 되면, 이를 초기화하고 두 시리즈 집합을 만들었습니다. 하나는 가격이 복잡하고 다른 하나는 일반적인 시리즈였습니다. NFT를 게으르게 발행하고, `1.5 $NEAR`에 구매한 다음, 자신을 승인된 발행자로 추가했습니다. 그런 다음 일반 시리즈에서 NFT를 생성하고 NEAR 지갑에서 둘 다 확인해 보았습니다.

저희와 함께 이 여정을 함께 해주셔서 정말 감사합니다! 최선을 다하길 바라며, 어떤 종류의 깔끔하고 독특한 사용 사례를 생각해 낼 수 있는지 보고 싶습니다. 질문이 있으시면 [Discord](https://near.chat)나 다른 소셜 미디어 채널에 언제든지 문의해 주세요. 문제가 발생하거나 피드백이 있는 경우 오른쪽에 있는 `Feedback` 버튼을 자유롭게 사용하세요.

:::note 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전

:::
