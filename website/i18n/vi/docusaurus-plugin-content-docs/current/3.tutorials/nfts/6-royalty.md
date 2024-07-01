---
id: royalty
title: Royalty
sidebar_label: Royalty
---

import {Github} from "@site/src/components/codetabs"

Trong hướng dẫn này bạn sẽ tiếp tục build non-fungible token (NFT) smart contract của mình, và tìm hiểu cách triển khai các perpetual royalty vào các NFT. Việc này sẽ cho phép mọi người nhận được phần trăm của giá mua khi NFT được bán.

## Giới thiệu

Bây giờ, bạn sẽ có một NFT contract hoàn chỉnh đầy đủ, ngoại trừ việc hỗ trợ royalty. To get started, go to the `nft-contract-approval/` folder from our [GitHub repository](https://github.com/near-examples/nft-tutorial/), or continue your work from the previous tutorials.

```bash
cd nft-contract-approval/
```

:::tip If you wish to see the finished code for this _Royalty_ tutorial, you can find it in the `nft-contract-royalty` folder. :::

---

## Suy nghĩ về vấn đề

Để triển khai tính năng này, trước tiên bạn cần hiểu các NFT được bán như thế nào. Trong bài hướng dẫn trước, bạn đã thấy cách ai đó có một NFT và họ có thể đưa nó lên marketplace bằng cách sử dụng function `nft_approve` kèm theo một message có thể được giải mã đúng cách. Khi một user mua NFT của bạn trên marketplace, điều gì sẽ xảy ra?

Sử dụng kiến thức bạn đang có, một kết luận hợp lý sẽ là marketplace transfer NFT tới người mua bằng cách thực hiện một cross-contract call và gọi NFT contract của method `nft_transfer`. Khi function đó kết thúc, marketplace sẽ thanh toán cho người bán số tiền đúng bằng người mua đã trả.

Bây giờ hãy nghĩ về cách việc này có thể được mở rộng để cho phép cắt giảm khoản thanh toán cho các account khác không chỉ là người bán.

<hr class="subsection" />

### Mở rộng giải pháp hiện tại

Since perpetual royalties will be on a per-token basis, it's safe to assume that you should be changing the `Token` and `JsonToken` structs. You need some way of keeping track of what percentage each account with a royalty should have. If you introduce a map of an account to an integer, that should do the trick.

Now, you need some way to relay that information to the marketplace. This method should be able to transfer the NFT exactly like the old solution but with the added benefit of telling the marketplace exactly what accounts should be paid what amounts. If you implement a method that transfers the NFT and then calculates exactly what accounts get paid and to what amount based on a passed-in balance, that should work nicely.

This is what the [royalty standards](https://nomicon.io/Standards/NonFungibleToken/Payout) outlined. Let's now move on and modify our smart contract to introduce this behavior.

---

## Các sửa đổi với contract

The first thing you'll want to do is add the royalty information to the structs. Open the `nft-contract-approval/src/metadata.rs` file and add `royalty` to the `Token` struct:

```rust
pub royalty: HashMap<AccountId, u32>,
```

Second, you'll want to add `royalty` to the `JsonToken` struct as well:

```rust
pub royalty: HashMap<AccountId, u32>,
```

<hr class="subsection" />

### Internal helper function

**royalty_to_payout**

To simplify the payout calculation, let's add a helper `royalty_to_payout` function to `src/internal.rs`. This will convert a percentage to the actual amount that should be paid. In order to allow for percentages less than 1%, you can give 100% a value of `10,000`. This means that the minimum percentage you can give out is 0.01%, or `1`. For example, if you wanted the account `benji.testnet` to have a perpetual royalty of 20%, you would insert the pair `"benji.testnet": 2000` into the payout map.

<Github language="rust" start="5" end="8" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-royalty/src/internal.rs" />

If you were to use the `royalty_to_payout` function and pass in `2000` as the `royalty_percentage` and an `amount_to_pay` of 1 NEAR, it would return a value of 0.2 NEAR.

<hr class="subsection" />

### Các royalty

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.rs` file, and modify the `nft_payout` function as shown.

<Github language="rust" start="22" end="67" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-royalty/src/royalty.rs" />

This function will loop through the token's royalty map and take the balance and convert that to a payout using the `royalty_to_payout` function you created earlier. It will give the owner of the token whatever is left from the total royalties. As an example:

You have a token with the following royalty field:

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

If a user were to call `nft_payout` on the token and pass in a balance of 1 NEAR, it would loop through the token's royalty field and insert the following into the payout object:

```rust
Payout {
    payout: {
        "benji": 0.1 NEAR,
        "josh": 0.05 NEAR,
        "mike": 0.2 NEAR
    }
}
```

At the very end, it will insert `damian` into the payout object and give him `1 NEAR - 0.1 - 0.05 - 0.2 = 0.65 NEAR`.

**nft_transfer_payout**

Now that you know how payouts are calculated, it's time to create the function that will transfer the NFT and return the payout to the marketplace.

<Github language="rust" start="68" end="135" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-royalty/src/royalty.rs" />

<hr class="subsection" />

### Các perpetual royalty

To add support for perpetual royalties, let's edit the `src/mint.rs` file. First, add an optional parameter for perpetual royalties. This is what will determine what percentage goes to which accounts when the NFT is purchased. You will also need to create and insert the royalty to be put in the `Token` object:

<Github language="rust" start="6" end="80" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-royalty/src/mint.rs" />

Next, you can use the CLI to query the new `nft_payout` function and validate that it works correctly.

### Thêm royalty object vào các triển khai cấu trúc

Since you've added a new field to your `Token` and `JsonToken` structs, you need to edit your implementations accordingly. Move to the `nft-contract/src/internal.rs` file and edit the part of your `internal_transfer` function that creates the new `Token` object:

<Github language="rust" start="184" end="192" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-royalty/src/internal.rs" />

Once that's finished, move to the `nft-contract-approval/src/nft_core.rs` file. You need to edit your implementation of `nft_token` so that the `JsonToken` sends back the new royalty information.

<Github language="rust" start="160" end="177" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-royalty/src/nft_core.rs" />

---

## Deploy contract {#redeploying-contract}

As you saw in the previous tutorial, adding changes like these will cause problems when redeploying. Since these changes affect all the other tokens and the state won't be able to automatically be inherited by the new code, simply redeploying the contract will lead to errors. For this reason, you'll create a new account again.

### Deployment and initialization

Next, you'll deploy this contract to the network.

```bash
export ROYALTY_NFT_CONTRACT_ID=<accountId>
near account create-account sponsor-by-faucet-service $ROYALTY_NFT_CONTRACT_ID autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy $ROYALTY_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

### Minting {#minting}

Tiếp theo, bạn sẽ cần mint một token. Bằng cách chạy command này, bạn sẽ mint một token với token ID `"royalty-token"` và người nhận sẽ là account mới của bạn. Ngoài ra, bạn đang truyền vào một map với hai account sẽ nhận được perpetual royalty bất cứ khi nào token của bạn được bán.

```bash
near contract call-function as-transaction $ROYALTY_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "royalty-token", "metadata": {"title": "Royalty Token", "description": "testing out the new royalty extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $ROYALTY_NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

Bạn có thể kiểm tra xem mọi thứ có diễn ra bình thường hay không bằng cách gọi một trong các enumeration function:

```bash
near contract call-function as-read-only $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
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
near contract call-function as-read-only $ROYALTY_NFT_CONTRACT_ID nft_payout json-args '{"token_id": "royalty-token", "balance": "100", "max_len_payout": 100}' network-config testnet now
```

Câu lệnh này sẽ trả về một ouput kiểu như sau:

```js
{
  payout: {
    'josh.testnet': '5',
    'royalty.goteam.examples.testnet': '65',
    'mike.testnet': '10',
    'benjiman.testnet': '20'
  }
}
```

If the NFT was sold for 100 yoctoNEAR, josh would get 5, Benji would get 20, mike would get 10, and the owner, in this case `royalty.goteam.examples.testnet` would get the rest: 65.

## Tổng kết

Ở thời điểm này bạn đã có mọi thứ bạn cần cho một NFT contract đầy đủ tính năng để tương tác với các marketplace. Tiêu chuẩn còn lại cuối cùng mà bạn có thể thực hiện là các tiêu chuẩn event. Nó cho phép các indexer biết các function nào đang được call, qua đó giúp việc theo dõi thông tin được sử dụng để hiển thị trong collectibles tab ở wallet dễ dàng và tin cậy hơn.

:::info remember If you want to see the finished code from this tutorial, you can go to the `nft-contract-royalty` folder. :::

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Royalties standard: [NEP199](https://nomicon.io/Standards/Tokens/NonFungibleToken/Payout), version `2.0.0`

:::
