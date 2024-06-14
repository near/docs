---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---

import {Github} from "@site/src/components/codetabs"

Trong hướng dẫn này, bạn sẽ tìm hiểu những điều cơ bản của một NFT marketplace contract, nơi bạn có thể mua và bán các non-fungible token bằng $NEAR. Trong những hướng dẫn trước, bạn đã đi qua và tạo một NFT contract hoàn chỉnh đầy đủ kết hợp tất cả các tiêu chuẩn có trong [tiêu chuẩn NFT](https://nomicon.io/Standards/NonFungibleToken).

---

## Giới thiệu

Throughout this tutorial, you'll learn how a marketplace contract **could** work on NEAR. This is meant to be **an example** as there is no **canonical implementation**. Vui lòng tách branch và sửa đổi contract này để đáp ứng nhu cầu cụ thể của bạn.

```bash
cd market-contract/
```

This folder contains both the actual contract code and dependencies as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── external.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

---

## Hiểu về contract

Lúc đầu, contract có thể khá choáng ngợp nhưng nếu bạn loại bỏ tất cả các thứ không cần thiết và đào sâu vào các function cốt lõi, nó thực sự khá đơn giản. Contract này đã được thiết kế chỉ cho một điều duy nhất - cho phép mọi người mua và bán các NFT cho NEAR. Nó bao gồm việc hỗ trợ thanh toán royalty, cập nhật giá bán của bạn, loại bỏ sale và thanh toán cho storage.

Hãy xem qua các file, ghi chú lại một số function quan trọng và chức năng của chúng là gì.

---

## lib.rs {#lib-rs}

File này phác thảo thông tin nào được lưu trữ trên contract cũng như một số function quan trọng khác mà bạn sẽ tìm hiểu bên dưới.

### Initialization function {#initialization-function}

Function đầu tiên bạn sẽ xem là initialization function. Nó lấy một `owner_id` làm tham số duy nhất và sẽ mặc định tất cả các storage collection bằng giá trị mặc định của chúng.

<Github language="rust" start="92" end="107" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />

<hr className="subsection" />

### Model quản lý storage {#storage-management-model}

Next, let's talk about the storage management model chosen for this contract. On the NFT contract, users attached $NEAR to the calls that needed storage paid for. For example, if someone was minting an NFT, they would need to attach `x` amount of NEAR to cover the cost of storing the data on the contract.

On this marketplace contract, however, the storage model is a bit different. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit as much NEAR as they want so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as-needed basis.

You might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we've introduced a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to understand the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

**Scenario A**

- Benji muốn đưa NFT lên marketplace nhưng anh ấy chưa bao giờ trả tiền cho storage.
- Anh ấy nạp chính xác 0.01 NEAR sử dụng method `storage_deposit`. Nó sẽ thanh toán cho 1 lần bán.
- Anh ấy đưa NFT lên marketplace và bây giờ đang sử dụng hết 1 trong số 1 lần sale đã được thanh toán trước và không còn storage. Nếu anh ấy call `storage_withdraw`, sẽ không có gì xảy ra.
- Dorian thích NFT của anh ấy và nhanh chóng mua nó trước bất cứ ai. Điều này có nghĩa rằng đơn hàng của Benji bây giờ đã bị gỡ xuống (kể từ khi nó được mua) và Benji đã sử dụng 0 trong số 1 lần sale đã thanh toán trước. Nói cách khác, anh ấy đang thừa 1 lần sale hay 0.01 NEAR.
- Benji bây giờ có thể call `storage_withdraw` và sẽ được chuyển lại 0.01 NEAR cho anh ấy. Về phía contract, sau khi rút tiền, anh ấy sẽ có 0 lần sale được thanh toán sẽ cần phải nạp tiền storage trước khi niêm yết thêm NFT.

**Scenario B**

- Dorian sở hữu một trăm NFT rất đẹp và anh ta muốn niêm yết toàn bộ.
- Để tránh phải gọi `storage_deposit` mỗi khi muốn niêm yết một NFT, anh ấy sẽ gọi nó một lần. Vì Dorian là một người có tiền, anh đã đã đính kèm 10 NEAR đủ để thanh toán cho 1000 lần sale. Then he lists his 100 NFTs and now he has an excess of 9 NEAR or 900 sales.
- Dorian cần 9 NEAR để để làm gì đó nhưng anh ấy không muốn gỡ 100 NFT đang niêm yết. Bởi vì anh ấy có thừa 9 NEAR, anh ấy có thể dễ dàng rút và vẫn có 100 NFT đang niêm yết. Sau khi call `storage_withdraw` và được chuyển 9 NEAR, anh ấy có 0 lần sale đang thừa.

With this behavior in mind, the following two functions outline the logic.

<Github language="rust" start="111" end="139" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />
<Github language="rust" start="144" end="175" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />

Trong contract này, storage yêu cầu 0.01 NEAR cho mỗi lần sale nhưng bạn có thể truy vấn thông tin đó sử dụng function `storage_minimum_balance`. Ngoài ra, bạn có thể truy vấn function `storage_balance_of` để kiểm tra một tài khoản nào đó đã thanh toán bao nhiêu storage.

With that out of the way, it's time to move onto the `sale.rs` file where you'll look at how NFTs are put for sale.

---

## sale.rs {#sale}

This file is responsible for the internal marketplace logic.

### Logic niêm yết {#listing-logic}

In order to put an NFT on sale, a user should:

1. Approve the marketplace contract on an NFT token (by calling `nft_approve` method on the NFT contract)
2. Call the `list_nft_for_sale` method on the marketplace contract.

#### nft_approve
This method has to be called by the user to [approve our marketplace](5-approval.md), so it can transfer the NFT on behalf of the user. In our contract, we only need to implement the `nft_on_approve` method, which is called by the NFT contract when the user approves our contract.

In our case, we left it blank, but you could implement it to do some additional logic when the user approves your contract.

<Github language="rust" start="23" end="33" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/nft_callbacks.rs" />


#### list_nft_for_sale
The `list_nft_for_sale` method lists an nft for sale, for this, it takes the id of the NFT contract (`nft_contract_id`), the `token_id` to know which token is listed, the [`approval_id`](5-approval.md), and the price in yoctoNEAR at which we want to sell the NFT.

<Github language="rust" start="33" end="74" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

The function first checks if the user has [enough storage available](#storage-management-model-storage-management-model), and makes two calls in parallel to the NFT contract. The first is to check if this marketplace contract is authorized to transfer the NFT. The second is to make sure that the caller (`predecessor`) is actually the owner of the NFT, otherwise, anyone could call this method to create fake listings. This second call is mostly a measure to avoid spam, since anyways, only the owner could approve the marketplace contract to transfer the NFT.

Both calls return their results to the `process_listing` function, which executes the logic to store the sale object on the contract.

#### process_listing

The `process_listing` function will receive if our marketplace is authorized to list the NFT on sale, and if this was requested by the NFTs owner. If both conditions are met, it will proceed to check if the user has enough storage, and store the sale object on the contract.

<Github language="rust" start="264" end="344" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr class="subsection" />

### Sale object {#sale-object}

Điều quan trọng là phải hiểu contract đang lưu trữ thông tin gì của mỗi sale object. Bởi vì marketplace có nhiều NFT được niêm yết đến từ các NFT contract khác nhau, chỉ lưu trữ token ID sẽ không đủ để phân biệt giữa các NFT khác nhau. Đây là lý do bạn cần theo dõi cả token ID và contract mà NFT đến từ đó. Ngoài ra, với mỗi niêm yết, contract phải theo dõi approval ID mà nó đã được cấp để transfer NFT. Cuối cùng, chủ sở hữu và các điều kiện sale là cần thiết.

<Github language="rust" start="5" end="20" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### Xóa các sale {#removing-sales}

Để xóa một niêm yết, chủ sở hữu phải call function `remove_sale` và truyền vào NFT contract cùng với token ID. Phía đằng sau, hàm này call function `internal_remove_sale` mà bạn có thể tìm thấy trong file `internal.rs`. Điều này sẽ yêu cầu một yoctoNEAR vì lý do bảo mật.

<Github language="rust" start="76" end="87" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### Cập nhật giá {#updating-price}

Để cập nhật giá niêm yết của token, chủ sở hữu phải call function `update_price` và truyền vào contract, token ID, và giá mong muốn. Việc này sẽ lấy sale object, thay đổi các điều kiện sale và chèn nó trở lại. Vì lý do bảo mật, function này sẽ yêu cầu một yoctoNEAR.

<Github language="rust" start="90" end="118" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### Mua các NFT {#purchasing-nfts}

Để mua các NFT, bạn phải call function `offer`. Nó nhận `nft_contract_id` và `token_id` làm tham số. Bạn phải đính kèm đúng lượng NEAR vào call này để thanh toán. Phía đằng sau, việc này sẽ đảm bảo khoản tiền gửi của bạn lớn hơn giá niêm yết và call một private method `process_purchase` sẽ thực hiện một cross-contract call tới NFT contract để gọi function `nft_transfer_payout`. This will transfer the NFT using the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) standard that you learned about and it will return the `Payout` object which includes royalties.

Sau đó marketplace sẽ call `resolve_purchase`, nơi nó sẽ kiểm tra các payout object độc hại và sau đó nếu mọi thứ đều tốt, nó sẽ thanh toán cho đúng cho các account.

<Github language="rust" start="121" end="151" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

---

## sale_view.rs {#sale_view-rs}

The final file is [`sale_view.rs`](https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale_view.rs) file. Đây là nơi một vài method enumeration được phác thảo. Nó cho phép user truy vấn các thông tin quan trọng liên quan đến sale.

---

## Deployment and Initialization

Next, you'll deploy this contract to the network.

```bash
export MARKETPLACE_CONTRACT_ID=<accountId>
near create-account $MARKETPLACE_CONTRACT_ID --useFaucet
```

Using the build script, deploy the contract as you did in the previous tutorials:

```bash
near deploy $MARKETPLACE_CONTRACT_ID out/market.wasm
cargo near deploy $MARKETPLACE_CONTRACT_ID with-init-call new json-args '{"owner_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting and approving

Let's mint a new NFT token and approve a marketplace contract:

```bash
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --amount 0.1

near call $NFT_CONTRACT_ID nft_approve '{"token_id": "token-1", "account_id": "'$MARKETPLACE_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --deposit 0.1
```

<hr className="subsection" />

### Listing NFT on sale

```bash
near call $MARKETPLACE_CONTRACT_ID list_nft_for_sale '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "token_id": "token-1", "approval_id": 0, "msg": "{\"sale_conditions\": \"1\"}"}' --accountId $NFT_CONTRACT_ID --gas 30000000000000
```

<hr className="subsection" />

### Tổng lượng cung {#total-supply}

Để truy vấn cho tổng lượng cung của các NFT được niêm yết trên marketplace, bạn có thể call function `get_supply_sales`. Có thể xem ví dụ dưới đây.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_sales
```

<hr className="subsection" />

### Tổng lượng cung bởi chủ sở hữu {#total-supply-by-owner}

Để truy vấn tổng lượng cung của các NFT được niêm yết bởi một chủ sở hữu được chỉ định trên marketplace, bạn có thể call function `get_supply_by_owner_id`. Có thể xem ví dụ dưới đây.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id '{"account_id": "'$NFT_CONTRACT_ID'"}'
```

<hr className="subsection" />

### Tổng lượng cung theo contract {#total-supply-by-contract}

Để truy vấn tổng lượng cung các NFT thuộc về một contract chỉ định nào đó, bạn có thể call function `get_supply_by_nft_contract_id`. Có thể xem ví dụ dưới đây.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id '{"nft_contract_id": "'$NFT_CONTRACT_ID'"}'
```

<hr className="subsection" />

### Truy vấn thông tin niêm yết {#query-listing-information}

Để truy vấn thông tin quan trọng của một niêm yết được chỉ định, bạn có thể call function `get_sale`. Nó yêu cầu bạn truyền vào `nft_contract_token`. Đây thực chất là định danh duy nhất cho việc sale trên market contract giống như đã giải thích trước đó. Định danh này bao gồm NFT contract, theo sau là một `DELIMITER` và sau nữa là token ID. Trong contract này, `DELIMITER` đơn giản là một dấu: `.` mà thôi.  Dưới đây là một ví dụ về truy vấn này.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sale '{"nft_contract_token": "'$NFT_CONTRACT_ID'.token-1"}'
```

Ngoài ra, bạn có thể truy vấn thông tin về niêm yết được phân trang của một chủ sở hữu nhất định bằng cách gọi function `get_sales_by_owner_id`.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id '{"account_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}'
```

Cuối cùng, bạn có thể truy vấn thông tin về niêm yết được phân trang bắt đầu từ một NFT contract nhất định bằng cách gọi function `get_sales_by_nft_contract_id`.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}'
```

---

## Tổng kết

Trong hướng dẫn này, bạn đã học về những thứ cơ bản của một marketplace contract và nó làm việc như thế nào. Bạn đã xem qua file [lib.rs](#lib-rs) và đã tìm hiểu về [initialization function](#initialization-function), thêm nữa là [storage management](#storage-management-model) model.

You went through the [NFTs listing process](#listing-logic). In addition, you went through some important functions needed after you've listed an NFT. Nó bao gồm [xóa sale](#removing-sales), [cập nhật giá](#updating-price), và [mua các NFT](#purchasing-nfts).

Cuối cùng, bạn xem qua các enumaration method trong file [`sale_view`](#sale_view-rs). Chúng cho phép bạn truy vấn thông tin quan trọng được tìm thấy trên marketplace contract.

Bây giờ bạn đã có hiểu biết vững chắc về NFT và marketplace trên NEAR. Vui lòng tách branch và mở rộng những contract này để tạo bất kỳ ứng dụng thú vị nào bạn muốn. In the [next tutorial](9-series.md), you'll learn how to take the existing NFT contract and optimize it to allow for:
- Lazy Minting
- Creating Collections
- Allowlisting functionalities
- Optimized Storage Models

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`

:::
