---
id: skeleton
title: Skeleton and JavaScript Architecture
sidebar_label: Kiến trúc của Contract
---

> Trong chủ đề này, bạn sẽ tìm hiểu về kiến trúc cơ bản đằng sau một NFT contract mà bạn sẽ develop khi tham gia serie _"Từ Zero đến Hero"_ này. You'll discover the contract's layout and you'll see how the JavaScript files are structured in order to build a feature-complete smart contract.


:::caution

The JS-SDK is currently in **[`Alpha`](https://github.com/near/near-sdk-js/releases/)**.

:::

## Giới thiệu

Hướng dẫn này trình bày bộ khung mã nguồn cho NFT smart contract và cấu trúc file của nó. You'll find how all the functions are laid out as well as the missing JS code that needs to be filled in. Once every file and function has been covered, you'll go through the process of building the mock-up contract to confirm that everything is working correctly.

## Cấu trúc file

Following a regular [JavaScript](https://www.javascript.com/) project, the file structure for this smart contract has:

- `package.json` file to define the packages and scripts used in the project.
- `src` folder where all the JavaScript source files are stored
- `build` folder where the compiled `wasm` will output to.

### Các file source

| File                             | Mô tả                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| [approval.ts](#approvalts)       | Has the internal functions that controls the access and transfers of non-fungible tokens. |
| [enumeration.ts](#enumerationts) | Contains the internal methods to query for NFT tokens and their owners.                   |
| [index.ts](#indexts)             | Holds the exposed smart contract functions.                                               |
| [metadata.ts](#metadatats)       | Defines the token and metadata structures.                                                |
| [mint.ts](#mintts)               | Contains the internal token minting logic.                                                |
| [nft_core.ts](#nft_corets)       | Has the internal core logic that allows you to transfer NFTs between users.               |
| [royalty.ts](#royaltyts)         | Contains the internal payout-related functions.                                           |

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

:::tip Hãy khám phá code trong [GitHub repository](https://github.com/near-examples/nft-tutorial-js/tree/1.skeleton). :::

---

## `approval.ts`

> Đoạn này cho phép mọi người approve cho các tài khoản khác thay mặt họ transfer các NFT.

This file contains the internal logic that complies with the standard's [approvals management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension. Dưới đây là bảng liệt kê các method và function của chúng:

| Method                    | Mô tả                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **internalNftApprove**    | Approve một account ID quyền transfer token dưới danh nghĩa của bạn. Called during **nft_approve**.                 |
| **internalNftIsApproved** | Kiểm tra xem account nhập vào có quyền truy cập để approve token ID hay không. Called during **nft_is_approved**. |
| **internalNftRevoke**     | Thu hồi quyền của một account cụ thể trong việc transfer token thay bạn. Called during **nft_revoke**.              |
| **internalNftRevokeAll**  | Thu hồi quyền của tất cả các account trong việc transfer token thay bạn. Called during **nft_revoke_all**.        |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/approval.ts#L9-L69
```

Bạn có thể tìm hiểu thêm về các function này trong [phần các approval](/tutorials/nfts/js/approvals) của serie Từ Zero đến Hero.

---

## `enumeration.ts`

> This file provides the internal functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) extension.

| Method                        | Mô tả                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **internalNftTotalSupply**    | Trả về tổng số NFT được lưu trữ trên contract. Called during **nft_total_supply**.                                              |
| **internalNftTokens**         | Trả về danh sách phân trang của các NFT lưu trữ trên contract bất kể chủ sở hữu của chúng là ai. Called during **nft_tokens**.    |
| **internalNftSupplyForOwner** | Cho phép bạn xem tổng số NFT được sở hữu bởi một người dùng nhất định. Called during **nft_supply_for_owner**.                  |
| **internalNftTokensForOwner** | Trả về một danh sách NFT được phân trang, thuộc về sở hữu của một người dùng nhất định. Called during **nft_tokens_for_owner**. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/enumeration.ts#L8-L62
```

Bạn có thể tìm hiểu thêm về các function này trong [enumeration section](/tutorials/nfts/js/enumeration) của serie hướng dẫn.

---

## `metadata.ts`

> File này được sử dụng để theo dõi thông tin được lưu trữ cho các token và metadata. In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) extension.

| Tên                     | Mô tả                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **TokenMetadata**       | Structure này định nghĩa metadata có thể được chứa trong mỗi token. (title, description, media, v.v.       |
| **Token**               | Structure này liệt kê những thông tin sẽ được lưu trữ trong contract cho mỗi token.                        |
| **JsonToken**           | Khi truy vấn thông tin về NFT thông qua các view call, thông tin trả về được lưu trữ trong JSON token này. |
| **internalNftMetadata** | Function này cho phép user query metadata bên trong contact. Called during **nft_metadata**.               |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/metadata.ts#L12-L46
```

Bạn có thể tìm hiểu thêm về các function này trong [minting section](/tutorials/nfts/js/minting) của serie hướng dẫn.

---

## `mint.ts`

> Contains the internal token minting logic.

| Method              | Mô tả                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| **internalNftMint** | Function này sẽ mint một non-fungible token. Called during **nft_mint**. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/mint.ts#L7-L23
```

---

## `nft_core.ts`

> Logic chính cho phép bạn transfer các NFT giữa những user.

| Method                         | Mô tả                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **internalNftTransfer**        | Transfer một NFT đến một receiver ID. Called during **nft_transfer**.                                                                                                                                                                                                                                                                  |
| **internalNftTransferCall**    | Transfer một NFT đến một receiver và call một function trong contract của receiver ID. Function trả về `true` nếu token đã được transfer từ account của sender. Called during **nft_transfer_call**.                                                                                                                                 |
| **internalNftToken**           | Cho phép các user query thông tin của một NFT cụ thể. Called during **nft_token**.                                                                                                                                                                                                                               |                     |
| **internalNftResolveTransfer** | When you start the `nft_transfer_call` and transfer an NFT, the standard dictates that you should also call a method on the receiver's contract. Nếu receiver cần bạn trả về NFT cho sender (theo giá trị trả về của phương thức `nft_on_transfer`), hàm này cho phép bạn thực thi logic đó. Called during **nft_resolve_transfer**. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/nft_core.ts#L10-L85
```

Bạn có thể tìm hiểu thêm về các function này trong [minting section](/tutorials/nfts/js/minting) của serie hướng dẫn.

---

## `royalty.ts`

> Contains the internal payout-related functions.

| Method                        | Mô tả                                                                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **internalNftPayout**         | This internal method calculates the payout for a given token. Called during **nft_payout**.                                                                             |
| **internalNftTransferPayout** | Internal method to transfer the token to the receiver ID and return the payout object that should be paid for a given balance. Called during **nft_transfer_payout**. |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/royalty.ts#L7-L45
```

Bạn có thể tìm hiểu thêm về các function này trong [royalty section](/tutorials/nfts/js/royalty) của serie hướng dẫn.

---

## `index.ts`

> This file outlines the smart contract class and what information it stores and keeps track of. In addition, it exposes all public facing methods that are callable by the user.

| Method                     | Mô tả                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| **init**                   | Constructor function used to initialize the contract with some metadata and default state.           |
| **nft_mint**               | Calls the internal mint function to mint an NFT.                                                     |
| **nft_token**              | Calls the internal function to query for info on a specific NFT                                      |
| **nft_transfer**           | Calls the internal function to transfer an NFT                                                       |
| **nft_transfer_call**    | Calls the internal function to transfer an NFT and call `nft_on_transfer` on the receiver's contract |
| **nft_resolve_transfer** | Calls the internal function to resolve the transfer call promise.                                    |
| **nft_is_approved**      | Calls the internal function to check whether someone is approved for an NFT                          |
| **nft_approve**            | Calls the internal function to approve someone to transfer your NFT                                  |
| **nft_payout**             | Calls the internal function to query for the payout object for an NFT                                |
| **nft_transfer_payout**  | Calls the internal function to transfer an NFT and return the payout object.                         |
| **nft_revoke**             | Calls the internal function to revoke someone access to transfer your NFT                            |
| **nft_revoke_all**       | Calls the internal function to revoke everyone's access to transfer your NFT                         |
| **nft_total_supply**     | Calls the internal function to query the total supply of NFTs on the contract.                       |
| **nft_tokens**             | Calls the internal function to paginate through NFTs on the contract                                 |
| **nft_tokens_for_owner** | Calls the internal function to paginate through NFTs for a given owner                               |
| **nft_supply_for_owner** | Calls the internal function to query for the total number of NFTs owned by someone.                  |
| **nft_metadata**           | Calls the internal function to query for the contract's metadata                                     |

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/1.skeleton/src/nft-contract/index.ts#L16-L157
```

Bạn có thể tìm hiểu thêm về các function này trong [minting section](/tutorials/nfts/js/minting) của serie hướng dẫn.

---

## Build bộ khung này

- Nếu bạn chưa clone repository chính, hãy mở một terminal và chạy câu lệnh:

```sh
git clone https://github.com/near-examples/nft-tutorial-js/
```

- Next, switch to the `1.skeleton` branch.
- Install the dependencies (including the JS SDK): `yarn`
- Build the contract with `yarn build`:

```sh
git clone https://github.com/near-examples/nft-tutorial-js/
cd nft-tutorial-js
git checkout 1.skeleton
yarn && yarn build
```

Once this finishes, the `nft-tutorial-js/build` directory should contain the `nft.wasm` smart contract!

Building the skeleton is useful to validate that everything works properly and that you'll be able to compile improved versions of this NFT contract in the upcoming tutorials.

---

## Kết luận

Bạn đã xem bố cục của NFT smart contract này và cách tất cả các function được bố trí qua các source file khác nhau. Sử dụng `yarn`, bạn đã có thể compile contract, và bạn sẽ bắt đầu bổ sung thêm cho skeleton này trong [Minting tutorial](/tutorials/nfts/js/minting) tiếp theo.

:::note Versioning for this article At the time of this writing, this example works with the following versions:

- near-sdk-js: `0.4.0-5`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
