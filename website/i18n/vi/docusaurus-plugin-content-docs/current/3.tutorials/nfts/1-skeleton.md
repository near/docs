---
id: skeleton
title: Bộ khung và Kiến trúc ngôn ngữ Rust"
sidebar_label: Kiến trúc của Contract
---

import {Github} from "@site/src/components/codetabs"

> Trong chủ đề này, bạn sẽ tìm hiểu về kiến trúc cơ bản đằng sau một NFT contract mà bạn sẽ develop khi tham gia serie _"Từ Zero đến Hero"_ này. Bạn sẽ khám phá layout của contract và sẽ thấy cách mà các file Rust được cấu trúc để build một smart contract đầy đủ tính năng.

:::info Bạn mới đến với Rust? Nếu bạn là người mới đến với ngôn ngữ Rust và mong muốn tiến sâu hơn nữa vào lập trình smart contract, phần [Hướng dẫn nhanh](/develop/quickstart-guide) của chúng tôi là một điểm khởi đầu tốt. :::

---

## Giới thiệu

Hướng dẫn này trình bày bộ khung mã nguồn cho NFT smart contract và cấu trúc file của nó. Bạn sẽ tìm thấy cách mà tất cả các function được bố trí, cũng như phần code Rust bị thiếu cần được điền vào. Khi mọi file và function đã được hoàn thiện, bạn sẽ thực hiện quá trình build một mock-up contract để xác nhận Rust toolchain của bạn hoạt động như mong đợi.

## Cấu trúc file

Cũng như các project [Rust](https://www.rust-lang.org/) thông thường khác, cấu trúc file của smart contract gồm:

- File `Cargo.toml` để định nghĩa các code dependency (giống như `package.json`)
- Thư mục `src` chứa tất cả các file của Rust
- Thư mục `target` chứa file `wasm` được compile
- Script `build.sh` được thêm vào để tiện lợi cho việc compile source code

### Các file source

| File                             | Mô tả                                                                       |
| -------------------------------- | --------------------------------------------------------------------------- |
| [approval.rs](#approvalrs)       | Có các function kiểm soát việc truy cập và transfer các non-fungible token. |
| [enumeration.rs](#enumerationrs) | Chứa các method để list ra các NFT token và chủ sở hữu của chúng.           |
| [lib.rs](#librs)                 | Chứa các function dùng để init smart contract.                              |
| [metadata.rs](#metadatars)       | Định nghĩa token và cấu trúc metadata.                                      |
| [mint.rs](#mintrs)               | Chứa phần logic cho việc mint token.                                        |
| [nft_core.rs](#nft_corers)       | Logic chính cho phép bạn transfer các NFT giữa những user.                  |
| [royalty.rs](#royaltyrs)         | Chứa các function liên quan đến thanh toán.                                 |

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    └── royalty.rs
```

:::tip Hãy khám phá code trong [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/1.skeleton/). :::

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

<Github language="rust" start="4" end="33" url="https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/approval.rs" />

You'll learn more about these functions in the [approvals section](/tutorials/nfts/approvals) of the Zero to Hero series.

---

## `enumeration.rs`

> This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) extension.

| Method                     | Mô tả                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| **nft_total_supply**     | Trả về tổng số NFT được lưu trữ trên contract                                                    |
| **nft_tokens**             | Trả về danh sách phân trang của các NFT lưu trữ trên contract bất kể chủ sở hữu của chúng là ai. |
| **nft_supply_for_owner** | Cho phép bạn xem tổng số NFT được sở hữu bởi một người dùng nhất định.                           |
| **nft_tokens_for_owner** | Trả về một danh sách NFT được phân trang, thuộc về sở hữu của một người dùng nhất định.          |

<Github language="rust" start="4" end="44" url="https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/enumeration.rs" />

You'll learn more about these functions in the [enumeration section](/docs/tutorials/contracts/nfts/enumeration) of the tutorial series.

---

## `lib.rs`

> File này phác thảo những thông tin mà contract lưu trữ và theo dõi.

| Method                 | Mô tả                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| **new_default_meta** | Init contract với default `metadata` do đó user không cần phải cung cấp bất kì input nào. |
| **new**                | Init contract với `metadata` mà user cung cấp.                                            |

:::info Hãy ghi nhớ Các init function (`new`, `new_default_meta`) chỉ có thể được call một lần duy nhất. :::

<Github language="rust" start="45" end="71" url="https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/lib.rs" />

You'll learn more about these functions in the [minting section](/docs/tutorials/contracts/nfts/minting) of the tutorial series.

---

## `metadata.rs`

> File này được sử dụng để theo dõi thông tin được lưu trữ cho các token và metadata. In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) extension.

| Tên               | Mô tả                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | Structure này định nghĩa metadata có thể được chứa trong mỗi token. (title, description, media, v.v.       |
| **Token**         | Structure này liệt kê những thông tin sẽ được lưu trữ trong contract cho mỗi token.                        |
| **JsonToken**     | Khi truy vấn thông tin về NFT thông qua các view call, thông tin trả về được lưu trữ trong JSON token này. |
| **nft_metadata**  | Function này cho phép user query metadata bên trong contact.                                               |

<Github language="rust" start="10" end="55" url="https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/metadata.rs" />

Bạn có thể tìm hiểu thêm về các function này trong [minting section](/docs/tutorials/contracts/nfts/minting) của serie hướng dẫn.

---

## `mint.rs`

> Chứa phần logic cho việc mint token.

| Method       | Mô tả                                        |
| ------------ | -------------------------------------------- |
| **nft_mint** | Function này sẽ mint một non-fungible token. |

<Github language="rust" start="4" end="16" url="https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/mint.rs" />

---

## `nft_core.rs`

> Logic chính cho phép bạn transfer các NFT giữa những user.

| Method                     | Mô tả                                                                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **nft_transfer**           | Transfer một NFT đến một receiver ID.                                                                                                                                                                                                                                          |
| **nft_transfer_call**    | Transfer một NFT đến một receiver và call một function trong contract của receiver ID. Function trả về `true` nếu token đã được transfer từ account của sender.                                                                                                                |
| **nft_token**              | Cho phép các user query thông tin của một NFT cụ thể.                                                                                                                                                                                                                          |
| **nft_on_transfer**      | Được call bởi các contract khác khi một NFT được transfer đến contract account của bạn thông qua method `nft_transfer_call`. Method sẽ trả về `true` nếu token có thể được trả về cho sender.                                                                                  |
| **nft_resolve_transfer** | Khi bạn bắt đầu câu lệnh `nft_transfer_call` và transfer một NFT, theo chuẩn một method cũng được call trên contract của receiver. Nếu receiver cần bạn trả về NFT cho sender (theo giá trị trả về của phương thức `nft_on_transfer`), hàm này cho phép bạn thực thi logic đó. |

<Github language="rust" start="7" end="56" url="https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/nft_core.rs" />

Bạn có thể tìm hiểu thêm về các function này trong [minting section](/docs/tutorials/contracts/nfts/minting) của serie hướng dẫn.

---

## `royalty.rs`

> Chứa các function liên quan đến thanh toán.

| Method                    | Mô tả                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| **nft_payout**            | View method này tính toán khoản thanh toán cho một token nhất định.                                   |
| **nft_transfer_payout** | Transfer token đến receiver ID và trả về payout object cần được thanh toán với một balance cho trước. |

<Github language="rust" start="3" end="17" url="https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/royalty.rs" />

You'll learn more about these functions in the [royalty section](/docs/tutorials/contracts/nfts/royalty) of the tutorial series.

---

## Build bộ khung này

- Nếu bạn chưa clone repository chính, hãy mở một terminal và chạy câu lệnh:

```sh
git clone https://github.com/near-examples/nft-tutorial/
```

- Kế tiếp, switch đến branch `1.skeleton` và build contract với `yarn`:

```sh
cd nft-tutorial
git switch 1.skeleton
yarn build
```

Vì source này chỉ là một bộ khung nên bạn sẽ nhận được nhiều warning về code không sử dụng, chẳng hạn như:

```
   Compiling nft_simple v0.1.0 (/Users/dparrino/near/nft-tutorial/nft-contract)
warning: unused imports: `LazyOption`, `LookupMap`, `UnorderedMap`, `UnorderedSet`
 --> src/lib.rs:3:29
  |
3 | use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
  |                             ^^^^^^^^^^  ^^^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^
  |
  = note: `#[warn(unused_imports)]` on by default
...
...
...
warning: constant is never used: `NO_DEPOSIT`
 --> src/nft_core.rs:6:1
  |
6 | const NO_DEPOSIT: Balance = 0;
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: `nft_simple` (lib) generated 50 warnings
    Finished release [optimized] target(s) in 22.58s
✨  Done in 22.74s.
```

Đừng lo lắng về những warning này, vì bạn sẽ không deploy contract này. Việc build một bộ khung rất hữu ích để xác nhận rằng Rust toolchain của bạn hoạt động bình thường và bạn sẽ có thể compile các phiên bản cải tiến của NFT contract này trong các hướng dẫn sắp tới.

---

## Kết luận

Bạn đã xem bố cục của NFT smart contract này và cách tất cả các function được bố trí qua các source file khác nhau. Sử dụng `yarn`, bạn đã có thể compile contract, và bạn sẽ bắt đầu bổ sung thêm cho skeleton này trong [Minting tutorial](/tutorials/nfts/minting) tiếp theo.

:::note Versioning for this article At the time of this writing, this example works with the following versions:

- rustc: `1.6.0`
- near-sdk-rs: `4.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
