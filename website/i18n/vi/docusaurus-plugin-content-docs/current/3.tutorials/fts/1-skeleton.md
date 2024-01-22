---
id: skeleton
title: Bộ khung và Kiến trúc ngôn ngữ Rust"
sidebar_label: Kiến trúc của Contract
---

import {Github} from "@site/src/components/codetabs"

> In this article, you'll learn about the basic architecture behind the FT contract that you'll develop while following this _"Zero to Hero"_ series. Bạn sẽ khám phá layout của contract và sẽ thấy cách mà các file Rust được cấu trúc để build một smart contract đầy đủ tính năng.

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/develop/quickstart-guide) is a great place to start.
:::

---

## Giới thiệu

This tutorial presents the code skeleton for the FT smart contract and its file structure. Bạn sẽ tìm thấy cách mà tất cả các function được bố trí, cũng như phần code Rust bị thiếu cần được điền vào. Khi mọi file và function đã được hoàn thiện, bạn sẽ thực hiện quá trình build một mock-up contract để xác nhận Rust toolchain của bạn hoạt động như mong đợi.

## Cấu trúc file

The repository comes with many different folders. Each folder represents a different milestone of this tutorial starting with the skeleton folder and ending with the finished contract folder. If you step into any of these folders, you'll find that they each follow a regular [Rust](https://www.rust-lang.org/) project. The file structure for these smart contracts have:

- `Cargo.toml` file to define the code dependencies (similar to `package.json` in JavaScript and node projects)
- Thư mục `src` chứa tất cả các file của Rust
- Thư mục `target` chứa file `wasm` được compile
- Script `build.sh` được thêm vào để tiện lợi cho việc compile source code

### Các file source

| File                       | Mô tả                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ft_core.rs](#corers)      | Contains the logic for transferring and controlling FTs. This file represents the implementation of the [core](https://nomicon.io/Standards/Tokens/FungibleToken/Core) standard. | |
| [lib.rs](#librs)           | Holds the smart contract initialization functions and dictates what information is kept on-chain.                                                                                  |
| [metadata.rs](#metadatars) | Defines the metadata structure. This file represents the implementation of the [metadata](https://nomicon.io/Standards/Tokens/FungibleToken/Metadata) extension of the standard.   |
| [storage.rs](#storagers)   | Contains the logic for registration and storage.  This file represents the implementation of the [storage management](https://nomicon.io/Standards/StorageManagement) standard.    |

```
skeleton
├── Cargo.lock
├── Cargo.toml
├── build.sh
└── src
    ├── ft_core.rs
    ├── lib.rs
    ├── metadata.rs
    └── storage.rs
```

:::tip
Explore the code in our [GitHub repository](https://github.com/near-examples/ft-tutorial/tree/main/1.skeleton).
:::

---

## `ft_core.rs`

> Core logic that allows you to transfer FTs between users and query for important information.

| Method                    | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ft_transfer**           | Transfers a specified amount of FTs to a receiver ID.                                                                                                                                                                                                                                                                                                                                                                                                      |
| **ft_transfer_call**    | Transfers a specified amount of FTs to a receiver and attempts to perform a cross-contract call on the receiver’s contract to execute the `ft_on_transfer` method. The implementation of this `ft_on_transfer` method is up to the contract writer. You’ll see an example implementation in the marketplace section of this tutorial. Once `ft_on_transfer` finishes executing, `ft_resolve_transfer` is called to check if things were successful or not. |
| **ft_total_supply**     | Returns the total amount of fungible tokens in circulation on the contract.                                                                                                                                                                                                                                                                                                                                                                                |
| **ft_balance_of**       | Returns how many fungible tokens a specific user owns.                                                                                                                                                                                                                                                                                                                                                                                                     |
| **ft_on_transfer**      | Method that lives on a receiver's contract. It is called when FTs are transferred to the receiver's contract account via the `ft_transfer_call` method. It returns how many FTs should be refunded back to the sender.                                                                                                                                                                                                                                     |
| **ft_resolve_transfer** | Invoked after the `ft_on_transfer` is finished executing. This function will refund any FTs not used by the receiver contract and will return the net number of FTs sent to the receiver after the refund (if any).                                                                                                                                                                                                                                        |

<Github language="rust" start="61" end="166" url="https://github.com/near-examples/ft-tutorial/blob/main/1.skeleton/src/ft_core.rs" />

You'll learn more about these functions in the [circulating supply](/tutorials/fts/circulating-supply) and [transfers](/tutorials/fts/transfers) sections of the tutorial series.

---

## `lib.rs`

> File này phác thảo những thông tin mà contract lưu trữ và theo dõi.

| Method                 | Mô tả                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **new_default_meta** | Init contract với default `metadata` do đó user không cần phải cung cấp bất kì input nào. In addition, a total supply is passed in which is sent to the owner |
| **new**                | Initializes the contract with the user-provided `metadata` and total supply.                                                                                  |

:::info Keep in mind
The initialization functions (`new`, `new_default_meta`) can only be called once.
:::

<Github language="rust" start="34" end="58" url="https://github.com/near-examples/ft-tutorial/blob/main/1.skeleton/src/lib.rs" />

You'll learn more about these functions in the [define a token](2-define-a-token.md) section of the tutorial series.

---

## `metadata.rs`

> This file is used to outline the metadata for the Fungible Token itself. Thêm nữa, bạn có thể định nghĩa một function để xem metadata của contract, là một phần của extension [metadata](https://nomicon.io/Standards/Tokens/FungibleToken/Metadata) tiêu chuẩn.

| Tên                       | Mô tả                                                        |
| ------------------------- | ------------------------------------------------------------ |
| **FungibleTokenMetadata** | This structure defines the metadata for the fungible token.  |
| **ft_metadata**           | This function allows users to query for the token's metadata |

<Github language="rust" start="10" end="30" url="https://github.com/near-examples/ft-tutorial/blob/main/1.skeleton/src/metadata.rs" />

You'll learn more about these functions in the [define a token](2-define-a-token.md) section of the tutorial series.

---

## `storage.rs`

> Contains the registration logic as per the [storage management](https://nomicon.io/Standards/StorageManagement) standard.

| Method                       | Mô tả                                                                                                                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **storage_deposit**          | Payable method that receives an attached deposit of Ⓝ for a given account. This will register the user on the contract.                                                                            |
| **storage_balance_bounds** | Returns the minimum and maximum allowed storage deposit required to interact with the contract. In the FT contract's case, min = max.                                                              |
| **storage_balance_of**     | Returns the total and available storage paid by a given user. In the FT contract's case, available is always 0 since it's used by the contract for registration and you can't overpay for storage. |

<Github language="rust" start="79" end="106" url="https://github.com/near-examples/ft-tutorial/blob/main/1.skeleton/src/storage.rs" />

:::tip
You'll learn more about these functions in the [storage](4.storage.md) section of the tutorial series.
:::

## Build bộ khung này

- Nếu bạn chưa clone repository chính, hãy mở một terminal và chạy câu lệnh:

```sh
git clone https://github.com/near-examples/ft-tutorial/
```

- Next, build the skeleton contract with the build script found in the `1.skeleton/build.sh` file.

```sh
cd ft-tutorial/1.skeleton
./build.sh
cd ..
```

Vì source này chỉ là một bộ khung nên bạn sẽ nhận được nhiều warning về code không sử dụng, chẳng hạn như:

```
   = note: `#[warn(dead_code)]` on by default

warning: constant is never used: `GAS_FOR_RESOLVE_TRANSFER`
 --> src/ft_core.rs:5:1
  |
5 | const GAS_FOR_RESOLVE_TRANSFER: Gas = Gas(5_000_000_000_000);
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: constant is never used: `GAS_FOR_FT_TRANSFER_CALL`
 --> src/ft_core.rs:6:1
  |
6 | const GAS_FOR_FT_TRANSFER_CALL: Gas = Gas(25_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER.0);
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: `fungible-token` (lib) generated 25 warnings
    Finished release [optimized] target(s) in 1.93s
✨  Done in 2.03s.
```

Đừng lo lắng về những warning này, vì bạn sẽ không deploy contract này. Building the skeleton is useful to validate that your Rust toolchain works properly and that you'll be able to compile improved versions of this FT contract in the upcoming tutorials.

---

## Tổng kết

You've seen the layout of this FT smart contract, and how all the functions are laid out across the different source files. Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [section](/tutorials/fts/circulating-supply) of the tutorial.

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.6.0`
- near-sdk-rs: `4.0.0`
:::
