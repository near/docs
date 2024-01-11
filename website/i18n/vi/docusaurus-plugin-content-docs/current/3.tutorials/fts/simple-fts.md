---
id: simple-fts
title: Minting Fungible Tokens
---

Trong hướng dẫn này, bạn sẽ học được cách dễ dàng tạo ra các Fungible Token (FT) của riêng mình mà không cần dùng bất cứ phần mềm phát triển nào bằng cách chỉ sử dụng một smart contract đã có sẵn. This article will show you how to use an existing [FT smart contract](0-predeployed.md), and you'll learn [how to mint](#minting-your-fts) fungible tokens and [view them](#checking-your-wallet) in your Wallet.

## Điều kiện cần

Để hoàn thành được hướng dẫn này, bạn sẽ cần:

- [Một NEAR account](#wallet)
- [NEAR command-line interface](/docs/tools/near-cli#setup) (`near-cli`)

### NEAR Wallet

To store your fungible tokens you'll need a [NEAR Wallet](https://testnet.mynearwallet.com//). If you don't have one yet, you can create one easily by following [these instructions](https://testnet.mynearwallet.com/create).

Once you have your Wallet account, you can click on the [Balances Tab](https://testnet.mynearwallet.com//?tab=balances) where all your Fungible Tokens will be listed:

![Wallet](/docs/assets/fts/empty-wallet-ft-tab.png)

## Sử dụng FT contract

Bây giờ đã có đầy đủ các công cụ, bạn có thể sẵn sằng bắt đầu sử dụng FT smart contract để [mint các FT của mình](#minting-your-fts).

:::note Nếu bạn không có command line interface, vui lòng [thực hiện các bước này](/tools/near-cli#setup). :::

Đảm bảo bạn đã lưu ở local các thông tin xác thực của `testnet` account mà bạn sẽ sử dụng để mint các token bằng cách chạy command `near-cli` dưới đây trong terminal:

```bash
near login
```

Để làm cho hướng dẫn này dễ dàng hơn với copy/paste, chúng tôi đã set một biến môi trường cho account ID của bạn. Trong command dưới đây, thay `YOUR_ACCOUNT_NAME` với account name bạn vừa đăng nhập, bao gồm `.testnet`):

```bash
export ID=YOUR_ACCOUNT_NAME
```

Kiểm tra biến môi trường được cài đặt đúng hay chưa bằng cách chạy:

```bash
echo $ID
```

### Mint các FT của bạn

NEAR đã deploy một contract tới account `ft.examples.testnet`, nó cho phép bất cứ ai có thể mint miễn phí `các TeamToken`. Đây là account bạn sẽ tương tác để mint các fungible token của mình.

Bây giờ, chúng ta hãy mint một vài token! Command dưới đây sẽ mint `25` TeamToken tới account của bạn. Nếu để ý, bạn sẽ thấy `receiver_id` xác định chủ sở hữu mới của các token bạn đang mint, trong khi `--accountId` chỉ rõ account nào sẽ được sử dụng để sign và thanh toán cho transaction này. Ngoài ra, có flag là `--deposit` đính kèm `.001` $NEAR vào lệnh call để [thanh toán cho storage](/concepts/storage/storage-staking) trên fungible token contract. Số tiền sử dụng sẽ ít hơn con số này nhưng bạn sẽ được trả lại phần chênh lệch. (Nhìn transaction trong wallet của bạn) Số lượng token được mint là 25 nhưng bạn có thể tăng con số này lên đến 1000.

```bash
near call ft.examples.testnet ft_mint '{"receiver_id": "'$ID'", "amount": "25"}' --deposit 0.1 --accountId $ID
```

Sau khi mint các token, bạn có thể truy vấn contract để xem số dư tài khoản của bất kỳ accountId nào. Việc này được thực hiện bằng cách thực hiện một contract `view` call và sử dụng `ft_balance_of` endpoint trên fungible token contract. Chạy lệnh dưới đây trong terminal để xem số dư tài khoản:

```bash
near view ft.examples.testnet ft_balance_of '{"account_id": "'$ID'"}'
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
View call: ft.examples.testnet.ft_balance_of({"account_id": "benji_test.testnet"})
'25'
```

</p>
</details>

### Kiểm tra Wallet của bạn

:::tip After you mint your fungible token you can [view it in your NEAR Wallet](https://testnet.mynearwallet.com/)! :::

> <br/>
> 
> ![Wallet với token](/docs/assets/fts/teamtoken.png) <br/>

**_Chúc mừng! Bạn vừa mới mint Fungible Token đầu tiên của mình trên NEAR blockchain!_** 🎉

## Các chú thích cuối cùng

Ví dụ cơ bản này minh họa tất cả các bước được yêu cầu để call một FT smart contract trên NEAR và bắt đầu mint các fungible token cho riêng bạn.

**_Chúc bạn mint thành công!_** 🪙

## Version cho bài viết này

Tại thời điểm viết bài, ví dụ này tương thích với các version dưới đây:

- near-cli: `2.1.1`
