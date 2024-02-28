---
id: royalty
title: Royalty
sidebar_label: Royalty
---

import {Github} from "@site/src/components/codetabs"

Trong hướng dẫn này bạn sẽ tiếp tục build non-fungible token (NFT) smart contract của mình, và tìm hiểu cách triển khai các perpetual royalty vào các NFT. Việc này sẽ cho phép mọi người nhận được phần trăm của giá mua khi NFT được bán.

## Giới thiệu

Bây giờ, bạn sẽ có một NFT contract hoàn chỉnh đầy đủ, ngoại trừ việc hỗ trợ royalty. Để bắt đầu, hãy chuyển sang branch `5.approval` từ [GitHub repository](https://github.com/near-examples/nft-tutorial/) của chúng tôi, hoặc tiếp tục công việc của bạn từ các hướng dẫn trước.

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

Điều đầu tiên bạn sẽ muốn làm là thêm thông tin royalty vào các cấu trúc. Mở file `nft-contract/src/metadata.rs` và thêm `royalty` vào `Token` struct:

```rust
pub royalty: HashMap<AccountId, u32>,
```

Thứ hai, bạn cũng sẽ muốn thêm `royalty` tới `JsonToken` struct:

```rust
pub royalty: HashMap<AccountId, u32>,
```

### Internal helper function

**royalty_to_payout**

Để đơn giản hóa việc tính khoản thanh toán, hãy thêm một helper function là `royalty_to_payout` vào `src/internal.rs`. Điều này sẽ chuyển đổi tỷ lệ phần trăm thành số tiền thực thế cần được thanh toán. Tỷ lệ phần trăm là một integer nên để cho phép nó nhỏ hơn 1%, bạn có thể quy định 100% tương ứng với giá trị `10,000`. Điều này có nghĩa rằng phần trăm tối thiểu bạn có thể đưa ra là 0.01% hay `1`. Ví dụ, nếu bạn muốn account `benji.testnet` có perpetual royalty là 20%, bạn sẽ chèn cặp `"benji.testnet": 2000` tới payout map.

<Github language="rust" start="5" end="8" url="https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/internal.rs" />

If you were to use the `royalty_to_payout` function and pass in `2000` as the `royalty_percentage` and an `amount_to_pay` of 1 NEAR, it would return a value of 0.2 NEAR.

### Các royalty

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.rs` file, and modify the `nft_payout` function as shown.

<Github language="rust" start="22" end="60" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/royalty.rs" />

Function này sẽ loop qua các royalty map của token và lấy số dư để chuyển thành khoản thanh toán sử dụng function `royalty_to_payout` mà bạn đã tạo trước đó. Nó sẽ cung cấp cho chủ sở sữu token bất cứ thứ gì còn lại từ tổng các royalty. Ví dụ:

Bạn có một token với royalty field như dưới đây:

```rust
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

```rust
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

<Github language="rust" start="64" end="125" url="https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/royalty.rs" />

### Các perpetual royalty

Để thêm tính năng hỗ trợ cho perpetual royalty, hãy chỉnh sửa file `src/mint.rs`. Đầu tiên, thêm một tham số tùy chọn cho perpetual royalty. Điều này sẽ xác định tỷ lệ phần trăm sẽ được chuyển vào các account khi NFT được mua. Bạn cũng cần tạo và chèn royalty vào trong `Token` object:

<Github language="rust" start="6" end="60" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/mint.rs" />

Tiếp theo, bạn có thể sử dụng CLI để truy vấn function mới `nft_payout` và xác nhận rằng nó làm việc chính xác.

### Thêm royalty object vào các triển khai cấu trúc

Bởi vì bạn đã thêm một filed mới vào các struct `Token` và `JsonToken` của mình, nên bạn cần phải chỉnh sửa các triển khai của mình cho phù hợp. Chuyển sang file `nft-contract/src/internal.rs` và chỉnh sửa một phần của function `internal_transfer` để tạo `Token` object mới:

<Github language="rust" start="189" end="197" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/internal.rs" />

Sau khi hoàn tất, chuyển tới file `nft-contract/src/nft_core.rs`. Bạn cần chỉnh sửa việc triển khai `nft_token` để `JsonToken` gửi lại thông tin royalty mới.

<Github language="rust" start="147" end="164" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/nft_core.rs" />

## Deploy contract {#redeploying-contract}

Giống như bạn đã thấy ở bài hướng dẫn trước, việc thêm các thay đổi như thế này sẽ gây ra các vấn đề khi redeploy. Vì những thay đổi này ảnh hưởng đến tất cả các token khác và state sẽ không thể tự động được kế thừa từ code mới, chỉ redeploy contract sẽ dẫn đến lỗi. For this reason, you'll create a new account again.

### Deployment

Next, you'll deploy this contract to the network.

```bash
export ROYALTY_NFT_CONTRACT_ID=<accountId>
near create-account $ROYALTY_NFT_CONTRACT_ID --useFaucet
```

Sử dụng build script, deploy contract như bạn đã làm ở các hướng dẫn trước:

```bash
yarn build && near deploy $ROYALTY_NFT_CONTRACT_ID out/main.wasm
```

### Khởi tạo và mint {#initialization-and-minting}

Vì đây là một contract mới, bạn sẽ cần phải khởi tạo và mint một token. Sử dụng command dưới đây để khởi tạo contract:

```bash
near call $ROYALTY_NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' --accountId $ROYALTY_NFT_CONTRACT_ID
```

Tiếp theo, bạn sẽ cần mint một token. Bằng cách chạy command này, bạn sẽ mint một token với token ID `"royalty-token"` và người nhận sẽ là account mới của bạn. Ngoài ra, bạn đang truyền vào một map với hai account sẽ nhận được perpetual royalty bất cứ khi nào token của bạn được bán.

```bash
near call $ROYALTY_NFT_CONTRACT_ID nft_mint '{"token_id": "royalty-token", "metadata": {"title": "Royalty Token", "description": "testing out the new royalty extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' --accountId $ROYALTY_NFT_CONTRACT_ID --amount 0.1
```

Bạn có thể kiểm tra xem mọi thứ có diễn ra bình thường hay không bằng cách gọi một trong các enumeration function:

```bash
near view $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}'
```

Nó sẽ trả về một output trông giống như sau:

```json
[
  {
    "token_id": "royalty-token",
    "owner_id": "royalty.goteam.examples.testnet",
    "metadata": {
      "title": "Royalty Token",
      "description": "testing out the new royalty extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
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

Let's calculate the payout for the `"royalty-token"` NFT, given a balance of 100 yoctoNEAR. Điều quan trọng cần lưu ý là số dư được truyền vào function `nft_payout` mong muốn tính bằng yoctoNEAR.

```bash
near view $ROYALTY_NFT_CONTRACT_ID nft_payout '{"token_id": "royalty-token", "balance": "100", "max_len_payout": 100}'
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

- near-cli: `4.0.4`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Royalties standard: [NEP199](https://nomicon.io/Standards/Tokens/NonFungibleToken/Payout), version `2.0.0`

:::
