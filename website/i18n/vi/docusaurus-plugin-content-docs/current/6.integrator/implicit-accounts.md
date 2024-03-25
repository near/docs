---
id: implicit-accounts
title: Implicit Account
sidebar_label: Implicit Account
---

## Background {#background}

Các implicit account làm việc tương tự như các account Bitcoin/Ethereum.
 - They allow you to reserve an account ID before it's created by generating a ED25519 key-pair locally.
 - This key-pair has a public key that maps to the account ID.
 - The account ID is a lowercase hex representation of the public key.
 - An ED25519 Public key contains 32 bytes that maps to 64 characters account ID.
 - The corresponding secret key allows you to sign transactions on behalf of this account once it's created on chain.

## [Đặc điểm kỹ thuật](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) {#specifications}

## Tạo một account local {#creating-an-account-locally}

For the purpose of this demo, we'll use the `betanet` network.

### Cài đặt `betanet` network {#set-betanet-network}

```bash
export NEAR_ENV=betanet
```

### Tạo một key-pair đầu tiên {#generating-a-key-pair-first}

```bash
near generate-key --saveImplicit
```

Ví dụ output
```
Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
Storing credentials for account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8 (network: testnet)
Saving key to '~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json'
```

#### Using the Implicit Account
We can export our account ID to a bash env variable:
```bash
export ACCOUNT="8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8"
```

Giả sử bạn đã nhận các token trên account mới của mình, bạn có thể transfer từ nó sử dụng command dưới đây:
```bash
near $ACCOUNT <receiver> <amount>
```

Bạn cũng có thể thay thế `$ACCOUNT` với account ID thật của mình, ví dụ.
```bash
near send 98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de <receiver> <amount>
```

## Transfer tới implicit account {#transferring-to-the-implicit-account}

Giả sử ai đó đưa cho bạn account ID `0861ea8ddd696525696ccf3148dd706c4fda981c64d8a597490472594400c223` của họ. Bạn chỉ có thể transfer tới nó bằng cách chạy:
```bash
near send <your_account_id> 0861ea8ddd696525696ccf3148dd706c4fda981c64d8a597490472594400c223 <amount>
```

## Bổ sung: convert public key sử dụng python (dành cho mục đích học tập) {#bonus-converting-public-key-using-python-for-learning-purposes}

Chúng ta sẽ sử dụng `python3` (version `3.5+`) với thư viện `base58` để thực hiện lại flow phía trên.

Bạn có thể cài thư viện này với `pip3`:
```bash
pip3 install --user base58
```

Khởi động trình thông dịch python3:
```bash
python3
```

Việc đầu tiên là lấy phần dữ liệu từ public key (không có tiền tố `ed25519:`). Hãy lưu nó trong biến `pk58`:
```python
pk58 = 'BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX'
```

Bây giờ hãy import base58:
```python
import base58
```

Cuối cùng, hãy convert base58 publickey của chúng ta tới các byte và sau đó là hex:
```python
base58.b58decode(pk58).hex()
```

Kết quả:
```
'98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de'
```

Cách này tạo ra cho chúng ta cùng một account ID giống như sử dụng `near-cli`, vì vậy nó được khuyến khích.

**Chú ý:** Network mặc định cho `near-cli` là `testnet`. Nếu bạn muốn thay network thành `mainnet` hoặc `betanet`, vui lòng xem hướng dẫn [lựa chọn network với `near-cli`](/tools/near-cli#network-selection).

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
