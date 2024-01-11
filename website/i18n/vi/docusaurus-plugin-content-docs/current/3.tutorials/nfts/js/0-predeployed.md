---
id: predeployed-contract
title: Contract đã được deploy sẵn
sidebar_label: Contract đã được deploy sẵn
---

> Bạn sẽ biết cách dễ dàng tạo ra các non-fungible token của riêng mình mà không dùng bất cứ phần mềm phát triển nào, bằng cách sử dụng một NFT smart contract đã có sẵn.


:::caution

The JS-SDK is currently in **[`Alpha`](https://github.com/near/near-sdk-js/releases/)**.

:::

## Điều kiện cần

Để hoàn thành tốt hướng dẫn này, bạn sẽ cần:

- [Một NEAR Wallet](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli#setup)

## Sử dụng NFT contract

### Cài đặt

- Đăng nhập vào account mới tạo của bạn với `near-cli` bằng cách chạy câu lệnh sau trong terminal:

```bash
near login
```

 - Đặt một biến môi trường cho ID account của bạn để giúp dễ dàng sao chép và dán các lệnh từ hướng dẫn này:

```bash
export NEARID=YOUR_ACCOUNT_NAME
```
:::note

Hãy thay `YOUR_ACCOUNT_NAME` với account name mà bạn mới vừa đăng nhập, bao gồm cả `.testnet` (hoặc `.near` nếu trên `mainnet`).

:::

- Kiểm tra biến môi trường được cài đặt đúng hay chưa bằng cách chạy:

```bash
echo $NEARID
```

### Mint các NFT của bạn

NEAR đã deploy một NFT contract tới account `nft.examples.testnet`, nó cho phép các user có thể mint các token. Hãy mint ra token đầu tiên của chúng ta bằng contract đã được deploy này!


- Hãy chạy câu lệnh này trong terminal của bạn, tuy nhiên bạn **phải thay thế value `token_id` bằng một UNIQUE string**.

```bash
near call nft.examples.testnet nft_mint '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "'$NEARID'", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' --accountId $NEARID --deposit 0.1
```

:::tip Bạn cũng cũng có thể thay `media` URL bằng một link của bất kỳ file hình ảnh nào chứa trên web server của bạn. :::

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["TYPE_A_UNIQUE_VALUE_HERE"]}]}
Transaction Id 8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
''
```

</p>
</details>

- Để xem các token được sở hữu bởi một account bạn có thể call NFT contract với câu lệnh `near-cli` sau:

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "'$NEARID'"}'
```

<details>
<summary>Ví dụ response nhận được: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "dev-xxxxxx-xxxxxxx",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg",
      "media_hash": null,
      "copies": 1,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

</p>
</details>

***Chúc mừng! Bạn vừa mới mint NFT token đầu tiên của mình trên NEAR blockchain!*** 🎉

👉 Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your NFT in the "Collectibles" tab. 👈

---

## Các chú thích cuối cùng

Ví dụ cơ bản này minh họa tất cả các bước được yêu cầu để call một NFT smart contract trên NEAR và bắt đầu mint các non-fungible token cho riêng bạn.

Now that you're familiar with the process, you can jump to [Contract Architecture](/tutorials/nfts/js/skeleton) and learn more about the smart contract structure and how you can build your own NFT contract from the ground up.

***Chúc bạn mint thành công!*** 🪙

:::note Version cho bài viết này

Tại thời điểm viết bài, ví dụ này tương thích với các version dưới đây:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
