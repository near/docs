---
id: predeployed-contract
title: Contract đã được deploy sẵn
sidebar_label: Contract đã được deploy sẵn
---

> Learn how to easily receive fungible tokens without doing any software development by using a readily-available FT smart contract.

## Điều kiện cần

Để hoàn thành tốt hướng dẫn này, bạn sẽ cần:

- [A NEAR TestNet account](/concepts/basics/accounts/creating-accounts)
- [NEAR-CLI](/tools/near-cli#setup)

## Sử dụng FT contract

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

Be sure to replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet`.

:::

- Kiểm tra biến môi trường được cài đặt đúng hay chưa bằng cách chạy:

```bash
echo $NEARID
```

### Receiving Fungible Tokens

NEAR has deployed a new Fungible Token contract to the account `ft.predeployed.examples.testnet` which allows users to freely receive some `gtNEAR` - a new fungible token aimed to promote the power of teamwork! Each `gtNEAR` is equal to `1e24 yocto-gtNEAR` similar to how 1 $NEAR is equal to 1e24 yoctoNEAR.

Using this pre-deployed contract, let's get some gtNEAR!

Start by calling the method `ft_mint` which is a custom function implemented on this contract in order to send your account some `gtNEAR`! The following command will send `0.01 gtNEAR` to your account.

```bash
near call ft.predeployed.examples.testnet ft_mint '{"account_id": "'$NEARID'", "amount": "10000000000000000000000"}' --accountId $NEARID
```

<details>
<summary>Ví dụ response nhận được: </summary>
<p>

```json
Log [ft.predeployed.examples.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_mint","data":[{"owner_id":"benjiman.testnet","amount":"10000000000000000000000","memo":"FTs Minted"}]}
Transaction Id Fhqa8YDLKxnxM9jjHCPN4hn1w1RKESYrav3kwDjhWWUu
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/Fhqa8YDLKxnxM9jjHCPN4hn1w1RKESYrav3kwDjhWWUu
''
```

</p>
</details>

- To view tokens owned by an account you can call the FT contract with the following `near-cli` command:

```bash
near view ft.predeployed.examples.testnet ft_balance_of '{"account_id": "'$NEARID'"}'
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
'2250000000000000000000'
```

</p>
</details>

***Chúc mừng! You just received your first Team Tokens on the NEAR blockchain!*** 🎉

👉 Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your FTs in the "Balances" tab. 👈

:::note Pre-deployed Contract
The contract used in this section has been modified such that you can infinitely get `gtNEAR` by calling `ft_mint`. This function is not part of the FT [standards](https://nomicon.io/Standards/Tokens/FungibleToken/Core) and has been implemented for the purpose of this tutorial.
:::

---

## Các chú thích cuối cùng

This basic example illustrates all the required steps to call an FT smart contract on NEAR and receive your own fungible tokens.

Now that you're familiar with the process, you can jump to [Contract Architecture](/tutorials/fts/skeleton) and learn more about the smart contract structure and how you can build your own FT contract from the ground up.

***Chúc bạn mint thành công!*** 🪙

:::note Version cho bài viết này

Tại thời điểm viết bài này, ví dụ này hoạt động với các phiên bản sau:

- near-cli: `3.4.0`
:::
