---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---

import {Github} from "@site/src/components/codetabs"

Trong hướng dẫn này, bạn sẽ tìm hiểu những điều cơ bản của một NFT marketplace contract, nơi bạn có thể mua và bán các non-fungible token bằng $NEAR. Trong những hướng dẫn trước, bạn đã đi qua và tạo một NFT contract hoàn chỉnh đầy đủ kết hợp tất cả các tiêu chuẩn có trong [tiêu chuẩn NFT](https://nomicon.io/Standards/NonFungibleToken).



## Giới thiệu

Thông qua hướng dẫn này, bạn sẽ học cách một marketplace contract sẽ làm việc trên NEAR. Đây được xem là một ví dụ và không có triển khai chính tắc nào. Vui lòng tách branch và sửa đổi contract này để đáp ứng nhu cầu cụ thể của bạn.

Sử dụng cùng repository giống như các hướng dẫn trước, nếu bạn checkout branch `8.marketplace`, bạn sẽ có những file cần thiết để hoàn thành hướng dẫn này.

```bash
git checkout 8.marketplace
```

## Cấu trúc file {#file-structure}

```
market-contract
└── src
    ├── internal.ts
    ├── index.ts
    ├── nft_callbacks.ts
    ├── sale.ts
    └── sale_views.ts
```

Thông thường, khi làm việc trên nhiều smart contract mà tất cả điều liên quan đến cùng một repository, một ý tưởng hay là cấu trúc chúng trong các thư mục riêng giống như đã được thực hiện trong hướng dẫn này. Để giúp công việc của bạn dễ hơn khi build các smart contract, chúng tôi đã sửa file `package.json` của repository, do vậy build cả hai smart contract có thể dễ dàng thực hiện bằng cách chạy command bên dưới.

```bash
yarn build
```
Nó sẽ cài đặt các dependency cho cả hai contract và compile chúng thành các file `wasm` được lưu trữ trong các thư mục dưới đây.

```
nft-tutorial-js
└── build
    ├── nft.wasm
    └── market.wasm
```

## Hiểu về contract

Lúc đầu, contract có thể khá choáng ngợp nhưng nếu bạn loại bỏ tất cả các thứ không cần thiết và đào sâu vào các function cốt lõi, nó thực sự khá đơn giản. Contract này đã được thiết kế chỉ cho một điều duy nhất - cho phép mọi người mua và bán các NFT cho NEAR. Nó bao gồm việc hỗ trợ thanh toán royalty, cập nhật giá bán của bạn, loại bỏ sale và thanh toán cho storage.

Hãy xem qua các file, ghi chú lại một số function quan trọng và chức năng của chúng là gì.

## index.ts {#index-ts}

File này phác thảo thông tin nào được lưu trữ trên contract cũng như một số function quan trọng khác mà bạn sẽ tìm hiểu bên dưới.

### Constructor logic {#constructor-logic}

The first function you'll look at is the constructor function. Nó lấy một `owner_id` làm tham số duy nhất và sẽ mặc định tất cả các storage collection bằng giá trị mặc định của chúng.

<Github language="js" start="40" end="52" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/index.ts" />

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
- Để tránh phải gọi `storage_deposit` mỗi khi muốn niêm yết một NFT, anh ấy sẽ gọi nó một lần. Vì Dorian là một người có tiền, anh đã đã đính kèm 10 NEAR đủ để thanh toán cho 1000 lần sale. Bây giờ anh ấy thừa 9 NEAR hay 900 lần sale.
- Dorian cần 9 NEAR để để làm gì đó nhưng anh ấy không muốn gỡ 100 NFT đang niêm yết. Bởi vì anh ấy có thừa 9 NEAR, anh ấy có thể dễ dàng rút và vẫn có 100 NFT đang niêm yết. Sau khi call `storage_withdraw` và được chuyển 9 NEAR, anh ấy có 0 lần sale đang thừa.

With this behavior in mind, the following two functions outline the logic.

<Github language="js" start="58" end="121" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/index.ts" />

Trong contract này, storage yêu cầu 0.01 NEAR cho mỗi lần sale nhưng bạn có thể truy vấn thông tin đó sử dụng function `storage_minimum_balance`. Ngoài ra, bạn có thể truy vấn function `storage_balance_of` để kiểm tra một tài khoản nào đó đã thanh toán bao nhiêu storage.

With that out of the way, it's time to move onto the `nft_callbacks.ts` file where you'll look at how NFTs are put for sale.

## nft_callbacks.ts {#nft_callbacks-ts}

File này chịu trách nhiệm về logic được sử dụng để bán các NFT. Nếu bạn nhớ [phần marketplace](/tutorials/nfts/js/approvals#marketplace-integrations) của hướng dẫn approval, khi user gọi `nft_approve` và truyền vào một message, nó sẽ tiến hành một cross-contract call tới contract của `receiver_id` và gọi method `nft_on_approve`. This `nft_callbacks.ts` file will implement that function.

### Logic niêm yết {#listing-logic}

The market contract is expecting the message that the user passes into `nft_approve` on the NFT contract to be JSON stringified sale arguments. Cấu trúc này phác thảo giá bán bằng yoctoNEAR cho NFT đã được niêm yết.

The `nft_on_approve` function is called via a cross-contract call by the NFT contract. It will make sure that the signer has enough storage to cover adding another sale. It will then attempt to get the sale conditions from the message and create the listing.

<Github language="js" start="6" end="73" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/nft_callbacks.ts" />

## sale.ts {#sale-ts}

Bây giờ chúng ta đã quen với quy trình thêm storage và niêm yết các NFT trên marketplace, hãy xem những gì bạn có thể làm gì sau khi một sale đã được niêm yết. File `sale.ts` phác thảo các function cho việc cập nhật giá, xóa, và mua các NFT.

### Sale object {#sale-object}

Điều quan trọng là phải hiểu contract đang lưu trữ thông tin gì của mỗi sale object. Bởi vì marketplace có nhiều NFT được niêm yết đến từ các NFT contract khác nhau, chỉ lưu trữ token ID sẽ không đủ để phân biệt giữa các NFT khác nhau. Đây là lý do bạn cần theo dõi cả token ID và contract mà NFT đến từ đó. Ngoài ra, với mỗi niêm yết, contract phải theo dõi approval ID mà nó đã được cấp để transfer NFT. Cuối cùng, chủ sở hữu và các điều kiện sale là cần thiết.

<Github language="js" start="9" end="42" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/sale.ts" />

### Xóa các sale {#removing-sales}

Để xóa một niêm yết, chủ sở hữu phải call function `remove_sale` và truyền vào NFT contract cùng với token ID. Behind the scenes, this calls the `internallyRemoveSale` function which you can find in the `internal.ts` file. Điều này sẽ yêu cầu một yoctoNEAR vì lý do bảo mật.

<Github language="js" start="44" end="65" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/sale.ts" />

### Cập nhật giá {#updating-price}

Để cập nhật giá niêm yết của token, chủ sở hữu phải call function `update_price` và truyền vào contract, token ID, và giá mong muốn. Việc này sẽ lấy sale object, thay đổi các điều kiện sale và chèn nó trở lại. Vì lý do bảo mật, function này sẽ yêu cầu một yoctoNEAR.

<Github language="js" start="67" end="96" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/sale.ts" />

### Mua các NFT {#purchasing-nfts}

Để mua các NFT, bạn phải call function `offer`. Nó nhận `nft_contract_id` và `token_id` làm tham số. Bạn phải đính kèm đúng lượng NEAR vào call này để thanh toán. Behind the scenes, this will make sure your deposit is greater than the list price and call a private method `processPurchase` which will perform a cross-contract call to the NFT contract to invoke the `nft_transfer_payout` function. This will transfer the NFT using the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) standard that you learned about and it will return the `Payout` object which includes royalties.

Sau đó marketplace sẽ call `resolve_purchase`, nơi nó sẽ kiểm tra các payout object độc hại và sau đó nếu mọi thứ đều tốt, nó sẽ thanh toán cho đúng cho các account.

<Github language="js" start="98" end="131" url="https://github.com/near-examples/nft-tutorial-js/blob/8.marketplace/src/market-contract/sale.ts" />

## sale_view.ts {#sale_view-ts}

The final file we'll go through is the `sale_view.ts` file. Đây là nơi một vài method enumeration được phác thảo. Nó cho phép user truy vấn các thông tin quan trọng liên quan đến sale.

### Tổng lượng cung {#total-supply}

Để truy vấn cho tổng lượng cung của các NFT được niêm yết trên marketplace, bạn có thể call function `get_supply_sales`. Có thể xem ví dụ dưới đây.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_sales
```

### Tổng lượng cung bởi chủ sở hữu {#total-supply-by-owner}

Để truy vấn tổng lượng cung của các NFT được niêm yết bởi một chủ sở hữu được chỉ định trên marketplace, bạn có thể call function `get_supply_by_owner_id`. Có thể xem ví dụ dưới đây.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id '{"account_id": "benji.testnet"}'
```

### Tổng lượng cung theo contract {#total-supply-by-contract}

Để truy vấn tổng lượng cung các NFT thuộc về một contract chỉ định nào đó, bạn có thể call function `get_supply_by_nft_contract_id`. Có thể xem ví dụ dưới đây.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id '{"nft_contract_id": "fayyr-nft.testnet"}'
```

### Truy vấn thông tin niêm yết {#query-listing-information}

Để truy vấn thông tin quan trọng của một niêm yết được chỉ định, bạn có thể call function `get_sale`. Nó yêu cầu bạn truyền vào `nft_contract_token`. Đây thực chất là định danh duy nhất cho việc sale trên market contract giống như đã giải thích trước đó. Định danh này bao gồm NFT contract, theo sau là một `DELIMITER` và sau nữa là token ID. Trong contract này, `DELIMITER` đơn giản là một dấu: `.` mà thôi.  Dưới đây là một ví dụ về truy vấn này.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sale '{"nft_contract_token": "fayyr-nft.testnet.token-42"}'
```

Ngoài ra, bạn có thể truy vấn thông tin về niêm yết được phân trang của một chủ sở hữu nhất định bằng cách gọi function `get_sales_by_owner_id`.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id '{"account_id": "benji.testnet", "from_index": "5", "limit": 10}'
```

Cuối cùng, bạn có thể truy vấn thông tin về niêm yết được phân trang bắt đầu từ một NFT contract nhất định bằng cách gọi function `get_sales_by_nft_contract_id`.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id '{"nft_contract_id": "fayyr-nft.testnet, "from_index": "5", "limit": 10}'
```

## Tổng kết

Trong hướng dẫn này, bạn đã học về những thứ cơ bản của một marketplace contract và nó làm việc như thế nào. Bạn đã xem qua file [index.ts](#index-ts) và đã tìm hiểu về [initialization function](#initialization-function), thêm nữa là [storage management](#storage-management-model) model.

Sau đó, bạn đã xem qua file [nft_callbacks](#nft_callbacks-ts) để hiểu cách [niêm yết các NFT](#listing-logic). Ngoài ra, bạn đã xem qua một số function quan trọng cần thiết sau khi bạn đã niêm yết một NFT. Nó bao gồm [xóa sale](#removing-sales), [cập nhật giá](#updating-price), và [mua các NFT](#purchasing-nfts).

Cuối cùng, bạn xem qua các enumaration method trong file [`sale_view`](#sale_view-ts). Chúng cho phép bạn truy vấn thông tin quan trọng được tìm thấy trên marketplace contract.

Bây giờ bạn đã có hiểu biết vững chắc về NFT và marketplace trên NEAR. Vui lòng tách branch và mở rộng những contract này để tạo bất kỳ ứng dụng thú vị nào bạn muốn. Thế giới trong tầm tay! Cảm ơn vì đã tham gia cuộc hành trình này và đừng quên, **Tiến lên các bạn!**

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
