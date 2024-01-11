---
id: implicit-accounts
title: Implicit Account
sidebar_label: Implicit Account
---

## Background {#background}

Các implicit account làm việc tương tự như các account Bitcoin/Ethereum.
 - Chúng cho phép bạn đặt account ID trước khi tạo bằng cách generate ra key-pair ED25519 một cách cục bộ.
 - Key-pair này có một public key map với account ID.
 - Account ID là một hex viết thường của public key.
 - Một ED25519 Public key chứa 32 byte, map với 64 ký tự của account ID.
 - Secret key tương ứng cho phép bạn sign các transaction thay cho account này sau khi nó được tạo trên chain.

## [Đặc điểm kỹ thuật](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) {#specifications}

## Tạo một account local {#creating-an-account-locally}

For the purpose of this demo, we'll use the `betanet` network.

### Cài đặt `betanet` network {#set-betanet-network}

```bash
export NEAR_ENV=betanet
```

### Tạo một key-pair đầu tiên {#generating-a-key-pair-first}

```bash
near generate-key tmp1
```

Ví dụ output
```
Generated key pair with ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX public key
```

Nó sẽ tạo một key-pair cho account ID `tmp1`. Public key mới là `ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`.

Một public key của NEAR được biểu diễn bởi `<curve>:<data>`.
- Curve là `ed25519` hoặc `secp256k1`. Với các implicit account chúng tôi chỉ hỗ trợ `ed25519`.
- Data là một mã hóa base58 của public key. Đối với `ed25519`, data chứa 32 byte.

Command này đã tạo ra một key-pair và lưu trữ nó ở local tại:
```
~/.near-credentials/betanet/tmp1.json
```

### Chi tiết hơn về key-pair {#viewing-the-key-pair}

Chạy command này để hiển thị nội dung của tệp key-pair:
```bash
cat ~/.near-credentials/betanet/tmp1.json
```

Nội dung:
```json
{"account_id":"tmp1","public_key":"ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX","private_key":"ed25519:4qAABW9HfVW4UNQjuQAaAWpB21jqoP58kGqDia18FZDRat6Lg6TLWdAD9FyvAd3PPQLYF4hhx2mZAotJudVjoqfs"}
```

Như bạn thấy, nó là một json-file hợp lệ và public key trùng với key chúng ta đã tạo ra. `private_key` là một secret/private key của key pair, nó có thể được sử dụng để sign các transaction với public key tương ứng.

### Convert một public key thành một account ID. {#converting-a-public-key-to-an-account-id}

Hãy convert một public key của NEAR từ chuỗi `ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`

Cách dễ nhất là sử dụng `near-cli` tương tác với `repl` thông qua console

1) Bắt đầu với `near repl`:
```bash
near repl
```

2) Gán base58 public key bằng một local constant:
```javascript
const pk58 = 'ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX'
```

3) Bây giờ hãy parse public key và convert nó tới hex trên cùng một dòng:
```javascript
nearAPI.utils.PublicKey.fromString(pk58).data.hexSlice()
```

Kết quả là một account ID có dạng hex (không bao gồm `'`):
```javascript
'98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de'
```

Bây giờ account ID mới là `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`.

4) Chúng ta đưa account ID cho ai đó và bảo họ transfer các token.

### Di chuyển key-pair tạm thời {#moving-the-temporary-key-pair}

Cuối cùng, chúng ta cần chuyển `tmp1.json` key-pair tới account ID thật, để `near-cli` có thể sử dụng nó để sign các transaction.

Đầu tiên hãy export account ID tới một bash env variable:
```bash
export ACCOUNT="98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de"
```

Bây giờ bạn có thể chuyển file `tmp1.json`:
```bash
mv ~/.near-credentials/betanet/tmp1.json ~/.near-credentials/betanet/$ACCOUNT.json
```

*Chú ý: Hoàn toàn bình thường khi tệp key-pair `.json` vẫn chứa `"account_id":"tmp1"`. Bởi vì `near-cli` không quan tâm đến việc này.*

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
