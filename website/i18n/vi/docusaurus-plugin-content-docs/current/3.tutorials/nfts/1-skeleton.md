---
id: skeleton
title: Bộ khung và Kiến trúc ngôn ngữ Rust"
sidebar_label: Kiến trúc của Contract
---

import {Github} from "@site/src/components/codetabs"

In this article, you'll learn about the basic architecture behind the NFT contract that you'll develop while following this _"Zero to Hero"_ series.

You'll discover the contract's layout and you'll see how the Rust files are structured in order to build a feature-complete smart contract.

:::info Skeleton Contract You can find the skeleton contract in our [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/main/nft-contract-skeleton) :::

:::info Bạn mới đến với Rust? If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](../../2.build/2.smart-contracts/quickstart.md) is a great place to start. :::

---

## Giới thiệu

Hướng dẫn này trình bày bộ khung mã nguồn cho NFT smart contract và cấu trúc file của nó.

Once every file and functions have been covered, we will guide you through the process of building the mock-up contract to confirm that your Rust setup works.

---

## Cấu trúc file

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

### Các file source

Here is a brief description of what each source file is responsible for:

| File                             | Mô tả                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------- |
| [approval.rs](#approvalrs)       | Has the functions that controls the access and transfers of non-fungible tokens |
| [enumeration.rs](#enumerationrs) | Contains the methods to list NFT tokens and their owners                        |
| [lib.rs](#librs)                 | Holds the smart contract initialization functions                               |
| [metadata.rs](#metadatars)       | Defines the token and metadata structure                                        |
| [mint.rs](#mintrs)               | Contains token minting logic                                                    |
| [nft_core.rs](#nft_corers)       | Logic chính cho phép bạn transfer các NFT giữa những user.                      |
| [royalty.rs](#royaltyrs)         | Contains payout-related functions                                               |
| [events.rs](#events)             | Contains events related structures                                              |

:::tip Explore the code in our [GitHub repository](https://github.com/near-examples/nft-tutorial/). :::

---

## `approval.rs`

> Đoạn này cho phép mọi người approve cho các tài khoản khác thay mặt họ transfer các NFT.

This file contains the logic that complies with the standard's [approvals management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension. Dưới đây là bảng liệt kê các method và function của chúng:

| Method                | Mô tả                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| **nft_approve**       | Approve một account ID quyền transfer token dưới danh nghĩa của bạn.                                         |
| **nft_is_approved** | Kiểm tra xem account nhập vào có quyền truy cập để approve token ID hay không.                               |
| **nft_revoke**        | Thu hồi quyền của một account cụ thể trong việc transfer token thay bạn.                                     |
| **nft_revoke_all**  | Thu hồi quyền của tất cả các account trong việc transfer token thay bạn.                                     |
| **nft_on_approve**  | Function callback này, được khởi tạo trong `nft_approve`, là cross contract call tới một contract bên ngoài. |

<Github language="rust" start="4" end="33" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/approval.rs" />

You'll learn more about these functions in the [approvals section](/tutorials/nfts/approvals) of the Zero to Hero series.

---

## `enumeration.rs`

> This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) extension.

| Method                     | Mô tả                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| **nft_total_supply**     | Returns the total amount of NFTs stored on the contract                                          |
| **nft_tokens**             | Trả về danh sách phân trang của các NFT lưu trữ trên contract bất kể chủ sở hữu của chúng là ai. |
| **nft_supply_for_owner** | Allows you view the total number of NFTs owned by any given user                                 |
| **nft_tokens_for_owner** | Returns a paginated list of NFTs owned by any given user                                         |

<Github language="rust" start="4" end="44" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/enumeration.rs" />

You'll learn more about these functions in the [enumeration section](/docs/tutorials/contracts/nfts/enumeration) of the tutorial series.

---

## `lib.rs`

> File này phác thảo những thông tin mà contract lưu trữ và theo dõi.

| Method                 | Mô tả                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| **new_default_meta** | Init contract với default `metadata` do đó user không cần phải cung cấp bất kì input nào. |
| **new**                | Init contract với `metadata` mà user cung cấp.                                            |

:::info Hãy ghi nhớ Các init function (`new`, `new_default_meta`) chỉ có thể được call một lần duy nhất. :::

<Github language="rust" start="47" end="73" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/lib.rs" />

You'll learn more about these functions in the [minting section](/docs/tutorials/contracts/nfts/minting) of the tutorial series.

---

## `metadata.rs`

> File này được sử dụng để theo dõi thông tin được lưu trữ cho các token và metadata. In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) extension.

| Tên               | Mô tả                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | This structure defines the metadata that can be stored for each token (title, description, media, etc.).   |
| **Token**         | Structure này liệt kê những thông tin sẽ được lưu trữ trong contract cho mỗi token.                        |
| **JsonToken**     | Khi truy vấn thông tin về NFT thông qua các view call, thông tin trả về được lưu trữ trong JSON token này. |
| **nft_metadata**  | Function này cho phép user query metadata bên trong contact.                                               |

<Github language="rust" start="12" end="60" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/metadata.rs" />

Bạn có thể tìm hiểu thêm về các function này trong [minting section](/docs/tutorials/contracts/nfts/minting) của serie hướng dẫn.

---

## `mint.rs`

> Contains the logic to mint the non-fungible tokens

| Method       | Mô tả                                        |
| ------------ | -------------------------------------------- |
| **nft_mint** | Function này sẽ mint một non-fungible token. |

<Github language="rust" start="4" end="16" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/mint.rs" />

---

## `nft_core.rs`

> Core logic that allows to transfer NFTs between users.

| Method                     | Mô tả                                                                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **nft_transfer**           | Transfer một NFT đến một receiver ID.                                                                                                                                                                                                                                          |
| **nft_transfer_call**    | Transfer một NFT đến một receiver và call một function trong contract của receiver ID. Function trả về `true` nếu token đã được transfer từ account của sender.                                                                                                                |
| **nft_token**              | Cho phép các user query thông tin của một NFT cụ thể.                                                                                                                                                                                                                          |
| **nft_on_transfer**      | Được call bởi các contract khác khi một NFT được transfer đến contract account của bạn thông qua method `nft_transfer_call`. Method sẽ trả về `true` nếu token có thể được trả về cho sender.                                                                                  |
| **nft_resolve_transfer** | Khi bạn bắt đầu câu lệnh `nft_transfer_call` và transfer một NFT, theo chuẩn một method cũng được call trên contract của receiver. Nếu receiver cần bạn trả về NFT cho sender (theo giá trị trả về của phương thức `nft_on_transfer`), hàm này cho phép bạn thực thi logic đó. |

<Github language="rust" start="7" end="56" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/nft_core.rs" />

You'll learn more about these functions in the [core section](/tutorials/nfts/core) of the tutorial series.

---

## `royalty.rs`

> Chứa các function liên quan đến thanh toán.

| Method                    | Mô tả                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| **nft_payout**            | View method này tính toán khoản thanh toán cho một token nhất định.                                   |
| **nft_transfer_payout** | Transfer token đến receiver ID và trả về payout object cần được thanh toán với một balance cho trước. |

<Github language="rust" start="3" end="17" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/royalty.rs" />

You'll learn more about these functions in the [royalty section](/docs/tutorials/contracts/nfts/royalty) of the tutorial series.

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

## Build bộ khung này

Nếu bạn chưa clone repository chính, hãy mở một terminal và chạy câu lệnh:

```sh
git clone https://github.com/near-examples/nft-tutorial/
```

Next, go to the `nft-contract-skeleton/` folder and build the contract with `cargo-near`:

```sh
cd nft-tutorial
cd nft-contract-skeleton/
cargo near build
```

Vì source này chỉ là một bộ khung nên bạn sẽ nhận được nhiều warning về code không sử dụng, chẳng hạn như:

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

Đừng lo lắng về những warning này, vì bạn sẽ không deploy contract này. Việc build một bộ khung rất hữu ích để xác nhận rằng Rust toolchain của bạn hoạt động bình thường và bạn sẽ có thể compile các phiên bản cải tiến của NFT contract này trong các hướng dẫn sắp tới.

---

## Kết luận

Bạn đã xem bố cục của NFT smart contract này và cách tất cả các function được bố trí qua các source file khác nhau. Sử dụng `yarn`, bạn đã có thể compile contract, và bạn sẽ bắt đầu bổ sung thêm cho skeleton này trong [Minting tutorial](/tutorials/nfts/minting) tiếp theo.

:::note Versioning for this article At the time of this writing, this example works with the following versions:

- rustc: `1.76.0`
- near-sdk-rs: `5.1.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`

:::
