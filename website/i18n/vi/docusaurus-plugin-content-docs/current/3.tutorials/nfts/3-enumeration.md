---
id: enumeration
title: Enumeration
sidebar_label: Enumeration
---

import {Github} from "@site/src/components/codetabs"

Trong các hướng dẫn trước, bạn đã xem xét các cách tích hợp chức năng mint vào một skeleton smart contract. Để NFT của bạn hiển thị trong ví, bạn cũng phải deploy một bản vá lỗi đã được implement một trong các enumeration method. In this tutorial, you'll expand on and finish the rest of the enumeration methods as per the [standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration).

Now you'll extend the NFT smart contract and add a couple of enumeration methods that can be used to return the contract's state.

---

## Giới thiệu

As mentioned in the [Upgrade a Contract](2-upgrade.md) tutorial, you can deploy patches and fixes to smart contracts. Lần này, bạn sẽ dùng kiến thức đó để implement các enumeration function `nft_total_supply`, `nft_tokens` và `nft_supply_for_owner`.

---

## Các sửa đổi đối với contract

Hãy bắt đầu bằng cách mở file  `src/enumeration.rs` và đến với empty function `nft_total_supply`.

**nft_total_supply**

Function này sẽ trả về tổng số các NFT được lưu trữ trên contract. Bạn dễ dàng có được tính năng này, bằng cách chỉ cần trả về độ dài của data structure `nft_metadata_by_id`.

<Github language="rust" start="5" end="9" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

**nft_token**

This function should return a paginated list of `JsonTokens` that are stored on the contract regardless of their owners. If the user provides a `from_index` parameter, you should use that as the starting point for which to start iterating through tokens; otherwise it should start from the beginning. Likewise, if the user provides a `limit` parameter, the function shall stop after reaching either the limit or the end of the list.

:::tip Rust has useful methods for pagination, allowing you to skip to a starting index and taking the first `n` elements of an iterator. :::

<Github language="rust" start="11" end="26" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

**nft_supply_for_owner**

Function này sẽ tìm kiếm tất cả các non-fungible token của owner do người dùng xác định và trả về độ dài của tập hợp kết quả. Nếu không có một bộ token nào thuộc sở hữu của `AccountID` tương ứng, function sẽ trả về `0`.

<Github language="rust" start="28" end="43" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

Tiếp theo, bạn có thể sử dụng CLI để truy vấn các method mới này và xác nhận rằng chúng hoạt động chính xác.

---

## Deploying lại một contract {#redeploying-contract}

Giờ đây bạn đã implement xong phần logic cần thiết cho `nft_tokens_for_owner`, giờ là lúc build và deploy lại contract cho account của bạn. Using the cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

---

## Các token enumerating

Khi contract cập nhật đã được deploy lại, bạn có thể kiểm tra và xem liệu các function mới này có hoạt động như mong đợi hay không.

### Các token NFT

Hãy query một list của non-fungible token trên contract. Sử dụng lệnh sau để truy vấn thông tin của tối đa 50 NFT bắt đầu từ item thứ 10:

```bash
near contract call-function as-read-only $NFT_CONTRACT_ID nft_tokens json-args '{"from_index": "10", "limit": 50}' network-config testnet now
```

Câu lệnh này sẽ trả về một ouput kiểu như sau:

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
[]
```

</p>
</details>

<hr class="subsection" />

### Các token theo owner

Để lấy tổng số lượng NFT sở hữu bởi account `goteam.testnet`, hãy call function `nft_supply_for_owner` và set parameter `account_id`:

```bash
near contract call-function as-read-only $NFT_CONTRACT_ID nft_supply_for_owner json-args '{"account_id": "goteam.testnet"}' network-config testnet now
```

Lệnh này sẽ trả về kết quả tương tự như sau:

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
0
```

</p>
</details>

---

## Kết luận

Trong hướng dẫn này, bạn đã thêm hai [enumeration function mới](/tutorials/nfts/enumeration#modifications-to-the-contract), và bây giờ bạn đã có NFT smart contract cơ bản với mint và enumeration method. Sau khi implement các sửa đổi này, bạn deploy lại smart contract và test các function bằng CLI.

In the [next tutorial](4-core.md), you'll implement the core functions needed to allow users to transfer the minted tokens.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
