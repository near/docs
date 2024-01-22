---
id: minting-nfts
title: NFT 발행
sidebar_label: NFT 발행
---

이 튜토리얼에서는 쉽게 사용할 수 있는 스마트 컨트랙트와, [IPFS](https://ipfs.io/)와 같은 분산 스토리지 솔루션을 사용하여 소프트웨어 개발을 하지 않고도 자신만의 NFT를 쉽게 생성하는 방법을 배웁니다.

## 개요 {#overview}

이 글은 [NFT 스마트 컨트랙트](#non-fungible-token-contract)를 설정하는 방법에 대해 안내하고, NEAR에서 NFT 컨트랙트를 [구축](#building-the-contract), [테스트](#testing-the-contract) 및 [배포](#deploying-the-contract)하는 방법에 대해 보여줍니다. 컨트랙트가 배포되면 [IPFS에 저장된](#uploading-the-image) 미디어 파일에서 대체 불가능한 토큰을 생성하고, 이를 지갑에서 보는 방법을 배우게 됩니다.

## 전제 조건 {#prerequisites}

이 튜토리얼을 성공적으로 완료하려면 다음이 필요합니다.

- [Rust 툴체인](/develop/prerequisites)
- [NEAR 계정](#wallet)
- [nft.storage 계정](#uploading-the-image)
- [NEAR 명령줄 인터페이스](/tools/near-cli#설정) (`near-cli`)

## Wallet {#wallet}

To store your non-fungible tokens you'll need a [NEAR Wallet](https://testnet.mynearwallet.com//). If you don't have one yet, you can create one easily by following [these instructions](https://testnet.mynearwallet.com/create).

> **팁:** 이 튜토리얼에서는 `testnet` 지갑 계정을 사용합니다. `testnet` 네트워크는 무료이며, 자금을 예치할 필요가 없습니다.

Once you have your Wallet account, you can click on the [Collectibles](https://testnet.mynearwallet.com//?tab=collectibles) tab where all your NFTs will be listed:

![Wallet](/docs/assets/nfts/nft-wallet.png)


<!--
Briefly talks about how the wallet listens for methods that start with `nft_` and then flags the contracts.
-->

## IPFS {#ipfs}

IPFS ([InterPlanetary File System](https://ipfs.io/))는 분산 파일 시스템에서 데이터를 저장하고 공유하기 위한 프로토콜 및 피어 투 피어 네트워크입니다. IPFS는 콘텐츠 주소를 지정하여 모든 컴퓨팅 장치를 연결하는 글로벌 네임스페이스에서 각 파일을 고유하게 식별합니다.

### 이미지 업로드 {#uploading-the-image}

NFT 이미지를 업로드하기 위해, 오프체인 NFT 데이터 저장 용도로 특별히 구축된 [무료 NFT 스토리지](https://nft.storage/#getting-started) 서비스를 사용할 것입니다. NFT 스토리지는 [IPFS](https://ipfs.io/) 및 [Filecoin](https://filecoin.io/)에서 NFT를 위한 무료 분산형 스토리지 및 대역폭을 제공합니다.

#### 단계 {#steps}

1. [계정을 등록](https://nft.storage/login/)하고 [nft.storage](https://nft.storage/login/)에 로그인하세요.

2. [파일](https://nft.storage/files/) 섹션 으로 이동하여 [업로드](https://nft.storage/new-file/) 버튼을 클릭합니다.

   ![nft.storage](/docs/assets/nfts/nft-storage.png)

3. 파일을 업로드하면 컨텐츠에 대한 고유한 `CID`를 얻게 되고, 다음과 같은 URL을 얻게 됩니다.
   ```
   https://bafyreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/
   ```

> **팁:** 여러 파일 업로드 및 사용 가능한 API 엔드포인트에 대한 정보는 [NFT.Storage 문서](https://nft.storage/api-docs/)를 확인하세요.

## 대체 불가능 토큰 컨트랙트 {#non-fungible-token-contract}

[이 레퍼지토리](https://github.com/near-examples/NFT)에는 [컨트랙트 표준][] 및 시뮬레이션 테스트를 사용하는 [대체 불가능 토큰][] 컨트랙트의 구현 예시가 포함되어 있습니다.

### NFT 레퍼지토리 복제 {#clone-the-nft-repository}

터미널에서 다음 명령을 실행하여 NFT 레퍼지토리를 복제합니다.

```
git clone https://github.com/near-examples/NFT
```

### 스마트 컨트랙트 알아보기 {#explore-the-smart-contract}

이 컨트랙트의 소스 코드는 `nft/src/lib.rs`에서 찾을 수 있습니다. 이 컨트랙트에는 [NEP-171 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken)(NEAR Enhancement Proposal)을 따르는 로직과 [여기](https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs)에서 찾을 수 있는 표준의 구현이 포함되어 있습니다.

처음에는 코드가 다소 복잡할 수 있지만, 발행과 관련된 측면만 고려하면 컨트랙트 구조와 발행 프로세스라는 두 가지 주요 범주로 나눌 수 있습니다.

#### 컨트랙트 구조 {#contract-struct}

컨트랙트는 `tokens`과 `metadata` 두 가지 정보를 추적합니다. 이 튜토리얼의 목적을 위해, 우리는 `tokens` 필드만 다룰 것입니다.

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
}
```

이 토큰은 [핵심 표준](https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs) 내 `NonFungibleToken` 자료형입니다. 구조체를 구성하는 여러 필드가 있지만, 이 튜토리얼의 목적상 `owner_by_id` 필드에만 관심을 둘 것입니다. 이 필드는 주어진 토큰의 소유자를 추적합니다.

```rust
pub struct NonFungibleToken {
    // owner of contract
    pub owner_id: AccountId,

    // keeps track of the owner for any given token ID.
    pub owner_by_id: TreeMap<TokenId, AccountId>,

    ...
}
```

이제 뒤에서 데이터가 어디에 보관되는지 살펴보았으므로, 발행 기능으로 이동하겠습니다.

#### 발행 {#minting}

토큰을 발행하려면 `nft_mint` 함수를 호출해야 합니다. 이 함수에 전달되는 세 가지 인자는 다음과 같습니다.

- `token_id`
- `receiver_id`
- `token_metadata`

이 함수는 [핵심 표준](https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs)에서 발행 함수를 호출하는 `self.tokens.mint`를 실행하여, `receiver_id`인 소유자의 토큰 기록을 생성합니다.

```rust
#[payable]
pub fn nft_mint(
    &mut self,
    token_id: TokenId,
    receiver_id: ValidAccountId,
    token_metadata: TokenMetadata,
) -> Token {
    self.tokens.mint(token_id, receiver_id, Some(token_metadata))
}
```

이는 이전 섹션에서 언급한 `owner_by_id` 자료구조에 토큰을 삽입하여 해당 기록을 생성합니다.

```rust
self.owner_by_id.insert(&token_id, &owner_id);
```

### 컨트랙트 구축 {#building-the-contract}

컨트랙트를 구축하려면, 터미널에서 다음 명령을 실행해 Rust의 `cargo`를 사용하는 컨트랙트를 구축하세요.

```bash
./scripts/build.sh
```

이렇게 하면 `res/` 디렉토리에 WASM 바이너리가 생성됩니다. 이 WASM 파일은 NEAR 블록체인에 배포할 스마트 컨트랙트입니다.

> **팁:** 오류가 발생하면 [Rust가 설치](/develop/prerequisites)되어 있는지, NFT 예제 내 루트 디렉토리에 있는지 확인하세요.

### 컨트랙트 테스트 {#testing-the-contract}

스마트 컨트랙트에는, 실행할 수 있는 미리 작성된 테스트가 작성되어 있습니다. 터미널에서 다음 명령을 실행하여 간단한 테스트를 수행하고, 컨트랙트 코드가 작동하는지 확인하십시오.

```bash
cargo test -- --nocapture
```

> **참고:** 더 복잡한 시뮬레이션 테스트는 이 명령으로 수행되지 않지만, `tests/sim`에서 찾을 수 있습니다.

## NFT 컨트랙트 사용 {#using-the-nft-contract}

NFT 스마트 컨트랙트를 성공적으로 구축하고 테스트했으므로, 이제 이를 [배포](#deploying-the-contract)하고,이를 사용해 [NFT를 발행](#minting-your-nfts)할 준비가 되었습니다.

### 컨트랙트 배포 {#deploying-the-contract}

이 스마트 컨트랙트는 NEAR 계정에 배포됩니다. NEAR는 동일한 계정에서 컨트랙트를 업그레이드할 수 있는 기능을 허용하므로, 초기화 함수를 클리어해야 합니다.

> **참고:** 이전에 컨트랙트가 배포되었던 NEAR 계정에서 이 예제를 실행하려면, `near delete`라는 `near-cli` 명령을 사용한 다음 지갑에서 이를 재생성하세요. To create (or recreate) an account, please follow the directions in [Test Wallet](https://testnet.mynearwallet.com/) or ([NEAR Wallet](https://wallet.near.org/) if we're using `mainnet`).

터미널에서 다음 명령을 실행하여 `near-cli`로 새로 만든 계정에 로그인하세요.

```bash
near login
```

이 튜토리얼을 더 쉽게 복사/붙여넣기할 수 있도록, 계정 ID에 대한 환경 변수를 설정하겠습니다. 아래 명령에서 `YOUR_ACCOUNT_NAME`를 `.testnet` (또는`mainnet`을 쓰는 경우 `.near`)에서 방금 로그인한 계정 이름으로 바꿔 보세요.

```bash
export ID=YOUR_ACCOUNT_NAME
```

다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $ID
```

터미널에 올바른 계정 ID가 표시되어 있는지 확인하십시오. 모든 것이 올바르게 보이면 이제 컨트랙트를 배포할 수 있습니다. NFT 프로젝트의 루트에서 다음 명령을 실행하여 스마트 컨트랙트를 배포합니다.

```bash
near deploy --wasmFile res/non_fungible_token.wasm --accountId $ID
```

<details>
<summary>응답 예시: </summary>
<p>

```bash
Starting deployment. Account id: ex-1.testnet, node: https://rpc.testnet.near.org, file: res/non_fungible_token.wasm
Transaction Id E1AoeTjvuNbDDdNS9SqKfoWiZT95keFrRUmsB65fVZ52
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/E1AoeTjvuNbDDdNS9SqKfoWiZT95keFrRUmsB65fVZ52
Done deploying to ex-1.testnet
```

</p>
</details>

> **참고:** `mainnet`에서는 명령 앞에 `NEAR_ENV=mainnet`를 붙여야 합니다. 더 많은 정보는 [여기서 볼 수 있습니다](/tools/near-cli#네트워크-선택).

### NFT 발행 {#minting-your-nfts}

스마트 컨트랙트는 컨트랙트의 초기 상태를 설정하는 데 사용할 수 있는 초기화 방법을 정의할 수 있습니다. 우리의 경우, 사용하기 전에 NFT 컨트랙트를 초기화해야 합니다. 지금은 기본 메타데이터로 초기화하겠습니다.

> **참고:** 각 계정에는 함수 호출과 트랜잭션 간 지속되는 `storage`라는 데이터 영역이 있습니다. 예를 들어, 컨트랙트를 초기화하면 초기 상태가 영구 스토리지에 저장됩니다.

```bash
near call $ID new_default_meta '{"owner_id": "'$ID'"}' --accountId $ID
```

> **팁:** [nomicon.io](https://nomicon.io/Standards/NonFungibleToken/Metadata.html)에서 NFT 메타데이터에 대한 자세한 정보를 찾을 수 있습니다.

그런 다음, `view` 호출을 실행하여 메타데이터를 볼 수 있습니다.

```bash
near view $ID nft_metadata
```

<details>
<summary>응답 예시: </summary>
<p>

```json
{
  "spec": "nft-1.0.0",
  "name": "Example NEAR non-fungible token",
  "symbol": "EXAMPLE",
  "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
  "base_uri": null,
  "reference": null,
  "reference_hash": null
}
```

</p>
</details>

이제 첫 번째 토큰을 발행해 봅시다! 다음 명령은 NFT의 사본 하나를 생성합니다. `media` URL을 이전에 [IPFS에 업로드](#uploading-the-image)한 URL로 바꿉니다.

```bash
near call $ID nft_mint '{"token_id": "0", "receiver_id": "'$ID'", "token_metadata": { "title": "Some Art", "description": "My NFT media", "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/", "copies": 1}}' --accountId $ID --deposit 0.1
```

<details>
<summary>응답 예시: </summary>
<p>

```json
{
  "token_id": "0",
  "owner_id": "dev-xxxxxx-xxxxxxx",
  "metadata": {
    "title": "Some Art",
    "description": "My NFT media",
    "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/",
    "media_hash": null,
    "copies": 1,
    "issued_at": null,
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": null,
    "reference_hash": null
  },
  "approved_account_ids": {}
}
```

</p>
</details>

계정이 소유한 토큰을 보려면, 다음과 같은 `near-cli` 명령을 사용하여 NFT 컨트랙트를 호출할 수 있습니다.

```bash
near view $ID nft_tokens_for_owner '{"account_id": "'$ID'"}'
```

<details>
<summary>응답 예시: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "dev-xxxxxx-xxxxxxx",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/",
      "media_hash": null,
      "copies": 1,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

</p>
</details>

> <br/>
> 
> **Tip:** after you mint your first non-fungible token, you can [view it in your Wallet](https://testnet.mynearwallet.com//?tab=collectibles):
> 
> ![Wallet with token](/docs/assets/nfts/nft-wallet-token.png)
> 
> <br/>

**_축하합니다! NEAR 블록체인에서 첫 번째 NFT 토큰을 발행했습니다!_** 🎉

## 끝맺는 말 {#final-remarks}

이 기본 예제는 NFT 스마트 컨트랙트를 배포하고, IPFS에 미디어 파일을 저장하며, 대체 불가능 토큰을 만들기 시작하는 데 필요한 모든 단계를 보여줍니다.

이제 프로세스에 익숙해졌으므로, [NFT 예제](https://examples.near.org/NFT)를 확인하고 스마트 컨트랙트 코드와 발행된 토큰을 다른 계정으로 전송하는 방법에 대해 자세히 알아볼 수 있습니다. 마지막으로 Rust를 처음 사용하고, 스마트 컨트랙트 개발에 뛰어들고 싶다면 [빠른 시작 가이드](/develop/quickstart-guide)로 시작하는 것을 추천드립니다.

**_즐거운 민팅 되세요!_** 🪙

## Blockcraft - 실용적인 확장

Minecraft를 사용하여 NFT를 생성하고 모든 데이터를 온체인에 저장하면서 여러 세계에서 빌드를 복사/붙여넣는 방법을 알아보려면 [Minecraft 튜토리얼](/tutorials/nfts/minecraft-nfts)을 확인하세요.

## 문서 버전 관리 {#versioning-for-this-article}

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- cargo: `cargo 1.54.0 (5ae8d74b3 2021-06-22)`
- rustc: `rustc 1.54.0 (a178d0322 2021-07-26)`
- near-cli: `2.1.1`

[대체 불가능 토큰]: https://nomicon.io/Standards/NonFungibleToken
[컨트랙트 표준]: https://github.com/near/near-sdk-rs/tree/master/near-contract-standards
