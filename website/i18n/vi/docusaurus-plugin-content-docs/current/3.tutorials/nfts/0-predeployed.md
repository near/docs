---
id: predeployed-contract
title: Contract đã được deploy sẵn
sidebar_label: Contract đã được deploy sẵn
---

Create your first non-fungible token by using a pre-deployed NFT smart contract which works exactly as the one you will build on this tutorial.

---

## Điều kiện cần

To complete this tutorial successfully, you'll need [a NEAR Wallet](https://testnet.mynearwallet.com/create) and [NEAR CLI RS](../../4.tools/cli-rs.md#setup)

---

## Sử dụng NFT contract

Minting an NFT token on NEAR is a simple process that involves calling a smart contract function.

To interact with the contract you will need to first login to your NEAR account through `near-cli`.

<hr class="subsection" />

### Cài đặt

Đăng nhập vào account mới tạo của bạn với `near-cli` bằng cách chạy câu lệnh sau trong terminal:

```bash
near account import-account using-web-wallet network-config testnet
```

Đặt một biến môi trường cho ID account của bạn để giúp dễ dàng sao chép và dán các lệnh từ hướng dẫn này:

```bash
export NEARID=YOUR_ACCOUNT_NAME
```

<hr class="subsection" />

### Mint các NFT của bạn

We have already deployed an NFT contract to `nft.examples.testnet` which allows users to freely mint tokens. Let's use it to mint our first token.

Run this command in your terminal, remember to replace the `token_id` with a string of your choice. This string will uniquely identify the token you mint.

```bash
near contract call-function as-transaction nft.examples.testnet nft_mint json-args '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "'$NEARID'", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NEARID network-config testnet sign-with-legacy-keychain send
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["TYPE_A_UNIQUE_VALUE_HERE"]}]}
Transaction Id 8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
''
```

</p>
</details>

:::tip Bạn cũng cũng có thể thay `media` URL bằng một link của bất kỳ file hình ảnh nào chứa trên web server của bạn. :::

<hr class="subsection" />

### Querying your NFT

Để xem các token được sở hữu bởi một account bạn có thể call NFT contract với câu lệnh `near-cli` sau:

```bash
near contract call-function as-read-only nft.examples.testnet nft_tokens_for_owner json-args '{"account_id": "'$NEARID'"}' network-config testnet now
```

<details>
<summary>Ví dụ response nhận được: </summary>
<p>

```json
[
  {
    "token_id": "Goi0CZ",
    "owner_id": "bob.testnet",
    "metadata": {
      "title": "GO TEAM",
      "description": "The Team Goes",
      "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/",
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

**Congratulations!** You just minted your first NFT token on the NEAR blockchain! 🎉

Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your NFT in the "Collectibles" tab.

---

## Các chú thích cuối cùng

Ví dụ cơ bản này minh họa tất cả các bước được yêu cầu để call một NFT smart contract trên NEAR và bắt đầu mint các non-fungible token cho riêng bạn.

Giờ thì có lẽ bạn đã quen với process, bạn có thể đến với [Kiến trúc của Contract](/docs/tutorials/contracts/nfts/skeleton) và tìm hiểu thêm về cấu trúc smart contract cũng như cách build một NFT contract từ đầu cho riêng mình.

***Chúc bạn mint thành công!*** 🪙

:::note Version cho bài viết này

Tại thời điểm viết bài, ví dụ này tương thích với các version dưới đây:

- near-cli-rs: `0.11.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
