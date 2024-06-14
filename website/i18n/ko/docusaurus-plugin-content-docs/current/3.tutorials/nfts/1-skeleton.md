---
id: skeleton
title: 뼈대 및 Rust 아키텍처
sidebar_label: 컨트랙트 아키텍처
---

import {Github} from "@site/src/components/codetabs"

In this article, you'll learn about the basic architecture behind the NFT contract that you'll develop while following this _"Zero to Hero"_ series.

You'll discover the contract's layout and you'll see how the Rust files are structured in order to build a feature-complete smart contract.

:::info Skeleton Contract You can find the skeleton contract in our [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/main/nft-contract-skeleton) :::

:::info Rust가 처음이신가요? If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](../../2.build/2.smart-contracts/quickstart.md) is a great place to start. :::

---

## 소개

이 튜토리얼은 NFT 스마트 컨트랙트의 코드 뼈대와 파일 구조를 보여줍니다.

Once every file and functions have been covered, we will guide you through the process of building the mock-up contract to confirm that your Rust setup works.

---

## 파일 구조

Following a regular [Rust](https://www.rust-lang.org/) project, the file structure for this smart contract has:

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    ├── events.rs
    └── royalty.rs
```

- The file `Cargo.toml` defines the code dependencies
- The `src` folder contains all the Rust source files

<hr class="subsection" />

### 소스 파일

Here is a brief description of what each source file is responsible for:

| 파일                               | 설명                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------- |
| [approval.rs](#approvalrs)       | Has the functions that controls the access and transfers of non-fungible tokens |
| [enumeration.rs](#enumerationrs) | Contains the methods to list NFT tokens and their owners                        |
| [lib.rs](#librs)                 | Holds the smart contract initialization functions                               |
| [metadata.rs](#metadatars)       | Defines the token and metadata structure                                        |
| [mint.rs](#mintrs)               | Contains token minting logic                                                    |
| [nft_core.rs](#nft_corers)       | 사용자 간에 NFT를 전송할 수 있는 내부 핵심 로직을 포함합니다.                                           |
| [royalty.rs](#royaltyrs)         | Contains payout-related functions                                               |
| [events.rs](#events)             | Contains events related structures                                              |

:::tip Explore the code in our [GitHub repository](https://github.com/near-examples/nft-tutorial/). :::

---

## `approval.rs`

> 이를 통해 사람들은 다른 계정을 NFT를 대신 전송할 수 있게끔 승인할 수 있습니다.

이 파일에는 표준의 [승인 관리](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) 확장을 준수하는 내부 로직이 포함되어 있습니다. 다음은 메서드 및 함수에 대한 분석입니다.

| 메서드                   | 설명                                                            |
| --------------------- | ------------------------------------------------------------- |
| **nft_approve**       | 사용자를 대신하여 토큰을 전송할 계정 ID를 승인합니다.                               |
| **nft_is_approved** | 입력 계정에 토큰 ID를 승인할 수 있는 액세스 권한이 있는지 확인합니다.                     |
| **nft_revoke**        | 사용자를 대신하여 토큰을 전송하는 특정 계정을 취소합니다.                              |
| **nft_revoke_all**  | 사용자를 대신하여 토큰을 전송하는 모든 계정을 취소합니다.                              |
| **nft_on_approve**  | 이 콜백 함수는 `nft_approve`에 의해 시작되어, 외부 컨트랙트로의 교차 컨트랙트 호출을 실행합니다. |

<Github language="rust" start="4" end="33" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/approval.rs" />

You'll learn more about these functions in the [approvals section](/tutorials/nfts/approvals) of the Zero to Hero series.

---

## `enumeration.rs`

> 이 파일은 NFT에 대한 정보를 보는 데 필요한 내부 함수들을 제공하며 표준의 [열거(Enumeration)](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) 확장자를 따릅니다.

| 메서드                        | 설명                                                               |
| -------------------------- | ---------------------------------------------------------------- |
| **nft_total_supply**     | Returns the total amount of NFTs stored on the contract          |
| **nft_tokens**             | 소유자와 관계없이 컨트랙트에 저장된 페이지가 매겨진 NFT 목록을 반환합니다.                      |
| **nft_supply_for_owner** | Allows you view the total number of NFTs owned by any given user |
| **nft_tokens_for_owner** | Returns a paginated list of NFTs owned by any given user         |

<Github language="rust" start="4" end="44" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/enumeration.rs" />

튜토리얼 시리즈의 [열거 섹션](/tutorials/nfts/enumeration)에서 이러한 함수에 대해 자세히 알아볼 수 있습니다.

---

## `lib.rs`

> 이 파일은 컨트랙트가 저장하고 추적하는 정보를 간략하게 설명합니다.

| 메서드                    | 설명                                                         |
| ---------------------- | ---------------------------------------------------------- |
| **new_default_meta** | 기본 `metadata`를 이용해 컨트랙트를 초기화해, 사용자가 입력값을 제공하지 않아도 되도록 합니다. |
| **new**                | 사용자가 제공한 `metadata`로 컨트랙트를 초기화합니다.                         |

:::info 기억해 두세요 초기화 함수(`new`, `new_default_meta`) 한 번만 호출될 수 있습니다. :::

<Github language="rust" start="47" end="73" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/lib.rs" />

튜토리얼 시리즈의 [발행 섹션](/tutorials/nfts/minting)에서 이러한 기능에 대해 자세히 알아볼 것입니다.

---

## `metadata.rs`

> 이 파일은 토큰 및 메타데이터에 대해 저장할 정보를 추적하는 데 사용됩니다. 또한 표준 메타데이터 확장의 일부인 컨트랙트의 [메타데이터](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)를 보는 기능을 정의할 수 있습니다.

| 이름                | 설명                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | This structure defines the metadata that can be stored for each token (title, description, media, etc.). |
| **Token**         | 이 구조는 각 토큰에 대한 컨트랙트에 어떤 정보가 저장될 것인지를 설명합니다.                                                              |
| **JsonToken**     | View 호출을 통해 NFT에 대한 정보를 조회할 때, 반환된 정보는 이 JSON 토큰에 저장됩니다.                                                 |
| **nft_metadata**  | 이 함수를 통해 사용자는 컨트랙트의 내부 메타데이터를 쿼리할 수 있습니다.                                                                |

<Github language="rust" start="12" end="60" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/metadata.rs" />

튜토리얼 시리즈 내 [발행 섹션](/tutorials/nfts/minting)에서 이러한 함수에 대해 더 많이 배울 수 있습니다.

---

## `mint.rs`

> Contains the logic to mint the non-fungible tokens

| 메서드          | 설명                      |
| ------------ | ----------------------- |
| **nft_mint** | 이 함수는 대체 불가능 토큰을 생성합니다. |

<Github language="rust" start="4" end="16" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/mint.rs" />

---

## `nft_core.rs`

> Core logic that allows to transfer NFTs between users.

| 메서드                        | 설명                                                                                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nft_transfer**           | NFT를 수신자 ID로 전송합니다.                                                                                                                                                   |
| **nft_transfer_call**    | NFT가 `nft_transfer_call` 메서드를 통해 컨트랙트 계정으로 전송될 때 다른 컨트랙트에 의해 호출됩니다. 토큰이 보낸 사람에게 다시 반환되어야 하면 `true`를 반환합니다.                                                            |
| **nft_token**              | 사용자가 특정 NFT에 대한 정보를 쿼리할 수 있도록 합니다.                                                                                                                                    |
| **nft_on_transfer**      | `nft_transfer_call`을 시작하고 NFT를 전송할 때 표준에 따르면 수신자의 컨트랙트에 있는 메서드도 호출해야 합니다. 수신자가 발신자에게 NFT를 반환해야 하는 경우(`nft_on_transfer` 메서드의 반환 값에 따라) 이 함수를 사용하면 해당 로직을 실행할 수 있습니다.   |
| **nft_resolve_transfer** | `nft_transfer_call`을 시작하고 NFT를 전송할 때의 표준에 따르면, 수신자의 컨트랙트에 있는 메서드도 호출해야 합니다. 수신자가 발신자에게 NFT를 반환해야 하는 경우(`nft_on_transfer` 메서드의 반환 값에 따라) 이 함수를 사용하면 해당 로직을 실행할 수 있습니다. |

<Github language="rust" start="7" end="56" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/nft_core.rs" />

You'll learn more about these functions in the [core section](/tutorials/nfts/core) of the tutorial series.

---

## `royalty.rs`

> 내부 지불 관련 함수를 포함합니다.

| 메서드                       | 설명                                                         |
| ------------------------- | ---------------------------------------------------------- |
| **nft_payout**            | 이 view 메서드는 주어진 토큰에 대한 지불금을 계산합니다.                         |
| **nft_transfer_payout** | 토큰을 수신자 ID로 전송하고 주어진 잔고에 대해 지불해야 하는 지불 객체를 반환하는 내부 메서드입니다. |

<Github language="rust" start="3" end="17" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/royalty.rs" />

튜토리얼 시리즈의 [로열티 섹션](/tutorials/nfts/royalty)에서 이러한 함수들에 대해 자세히 알아볼 수 있습니다.

---

## `events.rs`

> Contains events-related structures.

| Method              | Description                                         |
| ------------------- | --------------------------------------------------- |
| **EventLogVariant** | This enum represents the data type of the EventLog. |
| **EventLog**        | Interface to capture data about an event.           |
| **NftMintLog**      | An event log to capture token minting.              |
| **NftTransferLog**  | An event log to capture token transfer.             |

<Github language="rust" start="5" end="79" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/events.rs" />

You'll learn more about these functions in the [events section](/tutorials/nfts/events) of the tutorial series.

---

## 뼈대 구축

아직 기본 레퍼지토리를 복제하지 않은 경우 터미널을 열고 다음을 실행합니다.

```sh
git clone https://github.com/near-examples/nft-tutorial/
```

Next, go to the `nft-contract-skeleton/` folder and build the contract with `cargo-near`:

```sh
cd nft-tutorial
cd nft-contract-skeleton/
cargo near build
```

이 소스는 뼈대일 뿐이므로 다음과 같이 사용하지 않는 코드에 대한 많은 경고를 받게 됩니다.

```
   Compiling nft_contract_skeleton v0.1.0 (/Users/near-examples/Documents/my/projects/near/examples/nft-tutorial/nft-contract-basic)
 │ warning: unused imports: `LazyOption`, `LookupMap`, `UnorderedMap`, `UnorderedSet`
 │  --> src/lib.rs:3:29
 │   |
 │ 3 | use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
 │   |                             ^^^^^^^^^^  ^^^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^
 │   |
 │   = note: `#[warn(unused_imports)]` on by default
 │ 
 │ warning: unused import: `Base64VecU8`
 │  --> src/lib.rs:4:28
 │   |
 │ 4 | use near_sdk::json_types::{Base64VecU8, U128};
 │   |   

 │ warning: `nft_contract_skeleton` (lib) generated 48 warnings (run `cargo fix --lib -p nft_contract_skeleton` to apply 45 suggestions)
 │     Finished release [optimized] target(s) in 11.01s
 ✓ Contract successfully built!
```

이러한 경고에 대해 걱정하지 마세요. 아직 이 컨트랙트를 배포하지 않을 것입니다. 뼈대 구축하는 것은 Rust 툴체인이 제대로 작동하는지 확인하는 것이고, 이는 다음 튜토리얼에서 이 NFT 컨트랙트의 개선된 버전을 컴파일할 수 있는지 확인하는 데 유용합니다.

---

## 결론

이 NFT 스마트 컨트랙트의 레이아웃과 다양한 소스 파일에 모든 함수가 어떻게 배치되어 있는지 확인했습니다. `yarn`을 사용하여 컨트랙트를 컴파일할 수 있었고, 다음 [발행 튜토리얼](/tutorials/nfts/minting)에서 이 뼈대를 구체화하기 시작할 것입니다.

:::note 이 문서의 버전 관리 이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- rustc: `1.76.0`
- near-sdk-rs: `5.1.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`

:::
