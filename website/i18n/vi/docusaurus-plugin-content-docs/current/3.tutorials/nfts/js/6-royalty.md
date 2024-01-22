---
id: royalty
title: Royalty
sidebar_label: Royalty
---

import {Github} from "@site/src/components/codetabs"

Trong hướng dẫn này bạn sẽ tiếp tục build non-fungible token (NFT) smart contract của mình, và tìm hiểu cách triển khai các perpetual royalty vào các NFT. Việc này sẽ cho phép mọi người nhận được phần trăm của giá mua khi NFT được bán.

:::caution

The JS-SDK is currently in **[`Alpha`](https://github.com/near/near-sdk-js/releases/)**.

:::

## Giới thiệu

Bây giờ, bạn sẽ có một NFT contract hoàn chỉnh đầy đủ, ngoại trừ việc hỗ trợ royalty. Để bắt đầu, hãy chuyển sang branch `5.approval` từ [GitHub repository](https://github.com/near-examples/nft-tutorial-js/) của chúng tôi, hoặc tiếp tục công việc của bạn từ các hướng dẫn trước.

```bash
git checkout 5.approval
```

:::tip If you wish to see the finished code for this _Royalty_ tutorial, you can find it on the `6.royalty` branch. :::

## Suy nghĩ về vấn đề

Để triển khai tính năng này, trước tiên bạn cần hiểu các NFT được bán như thế nào. Trong bài hướng dẫn trước, bạn đã thấy cách ai đó có một NFT và họ có thể đưa nó lên marketplace bằng cách sử dụng function `nft_approve` kèm theo một message có thể được giải mã đúng cách. Khi một user mua NFT của bạn trên marketplace, điều gì sẽ xảy ra?

Sử dụng kiến thức bạn đang có, một kết luận hợp lý sẽ là marketplace transfer NFT tới người mua bằng cách thực hiện một cross-contract call và gọi NFT contract của method `nft_transfer`. Khi function đó kết thúc, marketplace sẽ thanh toán cho người bán số tiền đúng bằng người mua đã trả.

Bây giờ hãy nghĩ về cách việc này có thể được mở rộng để cho phép cắt giảm khoản thanh toán cho các account khác không chỉ là người bán.

### Mở rộng giải pháp hiện tại

Vì các perpetual royalty sẽ dựa trên cơ sở mỗi token, nên có thể an toàn khi giả định rằng bạn nên thay đổi cấu trúc của `Token` và `JsonToken`. Bạn cần một số cách để theo dõi tỷ lệ phần trăm nên có của mỗi tài khoản với một royalty. Một mẹo nhỏ là bạn có thể tạo ra một map của một account và một integer.

Bây giờ, bạn cần một vài cách để chuyển tiếp thông tin đó đến marketplace. Phương pháp này sẽ có thể transfer NFT chính xác như giải pháp cũ nhưng với lợi ích được bổ sung là thông báo cho marketplace chính xác những account nào sẽ được thanh toán số tiền bao nhiêu. Nếu bạn triển khai một phương pháp transfer NFT và sau đó tính toán chính xác account nào được thanh toán bao nhiêu dựa trên số dư được truyền vào, đó sẽ là một điều tyệt vời.

Đây là phác thảo của [nhưng tiêu chuẩn royalty](https://nomicon.io/Standards/NonFungibleToken/Payout). Bây giờ hãy tiếp tục và sửa đổi smart contract của chúng ta để thêm vào hành vi này.

## Các sửa đổi với contract

Điều đầu tiên bạn sẽ muốn làm là thêm thông tin royalty vào các cấu trúc. Open the `nft-contract/src/metadata.ts` file and add `royalty` to the `Token` and `JsonToken` structs:

```js
royalty: { [accountId: string]: number };
```

Thứ hai, bạn cũng sẽ muốn thêm `royalty` tới `JsonToken` struct:

<Github language="js" start="106" end="166" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/metadata.ts" />

### Internal helper function

**royaltyToPayout**

To simplify the payout calculation, let's add a helper `royaltyToPayout` function to `src/internal.ts`. This will convert a percentage to the actual amount that should be paid. In order to allow for percentages less than 1%, you can give 100% a value of `10,000`. This means that the minimum percentage you can give out is 0.01%, or `1`. For example, if you wanted the account `benji.testnet` to have a perpetual royalty of 20%, you would insert the pair `"benji.testnet": 2000` into the payout map.

<Github language="js" start="13" end="16" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/internal.ts" />

If you were to use the `royaltyToPayout` function and pass in `2000` as the `royaltyPercentage` and an `amountToPay` of 1 NEAR, it would return a value of 0.2 NEAR.

### Các royalty

**nft_payout**

Bây giờ hãy triển khai một phương pháp để kiểm tra xem những account nào sẽ được thanh toán từ một NFT với một số tiền hoặc một số dư nhất định. Open the `nft-contract/src/royalty.ts` file, and modify the `internalNftPayout` function as shown.

<Github language="js" start="7" end="53" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/royalty.ts" />

This function will loop through the token's royalty map and take the balance and convert that to a payout using the `royaltyToPayout` function you created earlier. Nó sẽ cung cấp cho chủ sở sữu token bất cứ thứ gì còn lại từ tổng các royalty. Ví dụ:

Bạn có một token với royalty field như dưới đây:

```js
Token {
    owner_id: "damian",
    royalty: {
        "benji": 1000,
        "josh": 500,
        "mike": 2000
    }
}
```

Nếu một user call `nft_payout` trên token và truyền vào một số dư là 1 NEAR, nó sẽ loop qua royalty field của token và chèn thông tin dưới đây vào payout object:

```js
Payout {
    payout: {
        "benji": 0.1 NEAR,
        "josh": 0.05 NEAR,
        "mike": 0.2 NEAR
    }
}
```

Cuối cùng, nó sẽ chèn `damian` vào payout object và đưa cho anh ấy `1 NEAR - 0.1 - 0.05 - 0.2 = 0.65 NEAR`.

**nft_transfer_payout**

Bây giờ thì bạn đã biết làm cách nào để tính các khoản thanh toán, đã đến lúc tạo function sẽ transfer NFT và trả lại khoản thanh toán cho marketplace.

<Github language="js" start="55" end="121" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/royalty.ts" />

### Các perpetual royalty

Để thêm tính năng hỗ trợ cho perpetual royalty, hãy chỉnh sửa file `src/mint.ts`. Đầu tiên, thêm một tham số tùy chọn cho perpetual royalty. Điều này sẽ xác định tỷ lệ phần trăm sẽ được chuyển vào các account khi NFT được mua. Bạn cũng cần tạo và chèn royalty vào trong `Token` object:

<Github language="js" start="7" end="64" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/mint.ts" />

### Thêm royalty object vào các triển khai cấu trúc

Bởi vì bạn đã thêm một filed mới vào các struct `Token` và `JsonToken` của mình, nên bạn cần phải chỉnh sửa các triển khai của mình cho phù hợp. Move to the `nft-contract/src/internal.ts` file and edit the part of your `internalTransfer` function that creates the new `Token` object:

<Github language="js" start="150" end="158" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/internal.ts" />

Once that's finished, move to the `nft-contract/src/nft_core.ts` file. You need to edit your implementation of `internalNftToken` so that the `JsonToken` sends back the new royalty information.

<Github language="js" start="10" end="37" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/nft_core.ts" />

Tiếp theo, bạn có thể sử dụng CLI để truy vấn function mới `nft_payout` và xác nhận rằng nó làm việc chính xác.

## Deploy contract {#redeploying-contract}

Giống như bạn đã thấy ở bài hướng dẫn trước, việc thêm các thay đổi như thế này sẽ gây ra các vấn đề khi redeploy. Vì những thay đổi này ảnh hưởng đến tất cả các token khác và state sẽ không thể tự động được kế thừa từ code mới, chỉ redeploy contract sẽ dẫn đến lỗi. Vì lý do này, bạn sẽ tạo một sub-account mới một lần nữa.

### Tạo một sub-account

Chạy command dưới đây để tạo một sub-account `royalty` cho account chính của bạn với số dư ban đầu là 25 NEAR, nó sẽ được transfer từ account gốc sang account mới của bạn.

```bash
near create-account royalty.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Tiếp theo, bạn sẽ muốn export một biến môi trường cho việc develop được dễ dàng hơn:

```bash
export ROYALTY_NFT_CONTRACT_ID=royalty.$NFT_CONTRACT_ID
```

Sử dụng build script, deploy contract như bạn đã làm ở các hướng dẫn trước:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $ROYALTY_NFT_CONTRACT_ID
```

### Khởi tạo và mint {#initialization-and-minting}

Vì đây là một contract mới, bạn sẽ cần phải khởi tạo và mint một token. Sử dụng command dưới đây để khởi tạo contract:

```bash
near call $ROYALTY_NFT_CONTRACT_ID init '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' --accountId $ROYALTY_NFT_CONTRACT_ID
```

Tiếp theo, bạn sẽ cần mint một token. Bằng cách chạy command này, bạn sẽ mint một token với token ID `"royalty-token"` và người nhận sẽ là account mới của bạn. Ngoài ra, bạn đang truyền vào một map với hai account sẽ nhận được perpetual royalty bất cứ khi nào token của bạn được bán.

```bash
near call $ROYALTY_NFT_CONTRACT_ID nft_mint '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' --accountId $ROYALTY_NFT_CONTRACT_ID --amount 0.1
```

Bạn có thể kiểm tra xem mọi thứ có diễn ra bình thường hay không bằng cách gọi một trong các enumeration function:

```bash
near view $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}'
```

Nó sẽ trả về một output trông giống như sau:

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "royalty.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": {},
    "royalty": {
      "josh.testnet": 500,
      "benjiman.testnet": 2000,
      "mike.testnet": 1000
    }
  }
]
```

Lưu ý, bây giờ làm thế nào để có một royalty field chứa 3 account sẽ nhận được tổng cộng 35% tổng doanh thu của NFT này? Có vẻ như nó hoạt động! Tiến lên các bạn :)

### NFT payout

Hãy tính khoản thanh toán cho `"approval-token"` NFT, với số dư là 100 yoctoNEAR. Điều quan trọng cần lưu ý là số dư được truyền vào function `nft_payout` mong muốn tính bằng yoctoNEAR.

```bash
near view $ROYALTY_NFT_CONTRACT_ID nft_payout '{"token_id": "approval-token", "balance": "100", "max_len_payout": 100}'
```

Câu lệnh này sẽ trả về một ouput kiểu như sau:

```bash
{
  payout: {
    'josh.testnet': '5',
    'royalty.goteam.examples.testnet': '65',
    'mike.testnet': '10',
    'benjiman.testnet': '20'
  }
}
```

Nếu NFT đã được bán với 100 yoctoNEAR, josh sẽ được 5, benji được 20, mike được 10, và chủ sở hữu trường hợp này là `royalty.goteam.examples.testnet` sẽ nhận được phần còn lại: 65.

## Tổng kết

Ở thời điểm này bạn đã có mọi thứ bạn cần cho một NFT contract đầy đủ tính năng để tương tác với các marketplace. Tiêu chuẩn còn lại cuối cùng mà bạn có thể thực hiện là các tiêu chuẩn event. Nó cho phép các indexer biết các function nào đang được call, qua đó giúp việc theo dõi thông tin được sử dụng để hiển thị trong collectibles tab ở wallet dễ dàng và tin cậy hơn.

:::info remember Nếu bạn muốn xem code hoàn chỉnh của hướng dẫn này, có thể checkout branch `6.royalty`. :::

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Royalties standard: [NEP199](https://nomicon.io/Standards/Tokens/NonFungibleToken/Payout), version `2.0.0`

:::
