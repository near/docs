---
id: near-cli
title: NEAR CLI
---

The NEAR [Command Line Interface](https://github.com/near/near-cli) (CLI) is a tool that enables to interact with the NEAR network directly from the shell. Among other things, the NEAR CLI enables you to:

- Login with a NEAR account
- Deploy a contract
- Interact and query information from a deployed contract

:::tip Under the hood, NEAR CLI utilizes the [`NEAR JavaScript API`](https://github.com/near/near-api-js)
:::
---

:::info

The NEAR CLI also comes with an implementation in Rust called [`near-cli-rs`](https://github.com/near/near-cli-rs). If you want to use `near-cli` while you have `near-cli-rs` installed, prefix the following commands with `npx`. :::

## Overview {#overview}

_Click vào từng command để xem thông tin chi tiết và các ví dụ._

**Các RPC Endpoint**

| Command                                   | Mô tả                                                                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [`near login`](#near-login)               | stores a full access key locally using [NEAR Wallet](https://testnet.mynearwallet.com//)                                |
| [`near keys`](#near-keys)                 | hiển thị tất cả các access key và thông tin chi tiết của chúng cho một account nhất định                                |
| [`near generate-key`](#near-generate-key) | tạo một cặp key local ** hoặc ** hiển thị public key & [implicit account](/docs/roles/integrator/implicit-accounts) |
| [`near add-key`](#near-add-key)           | thêm một access key mới vào account                                                                                     |
| [`near delete-key`](#near-delete-key)     | xóa một access key từ một account                                                                                       |

**Accounts**

| Command                                       | Mô tả                                                      |
| --------------------------------------------- | ---------------------------------------------------------- |
| [`near create-account`](#near-create-account) | tạo một account                                            |
| [`near state`](#near-state)                   | hiển thị các thông tin chi tiết của account                |
| [`near keys`](#near-keys)                     | hiển thị tất cả các access key của một account nhất định   |
| [`near send`](#near-send)                     | gửi các token từ một account này đến một account khác      |
| [`near delete`](#near-delete)                 | xóa account và chuyển số dư còn lại sang account thụ hưởng |

**Contracts**

| Command                               | Mô tả                                                                                    |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`near deploy`](#near-deploy)         | deploy một smart contract lên NEAR blockchain                                            |
| [`near dev-deploy`](#near-dev-deploy) | tạo một development account và deploy contract trên account đó _(`testnet` only)_        |
| [`near call`](#near-call)             | tạo một contract call có thể thực thi các `change` _hoặc_ `view` method                  |
| [`near view`](#near-view)             | tạo một contract call **chỉ có thể** thực thi một `view` method                          |
| [`near view-state`](#near-view-state) | trả về state của contract (các cặp key/value) hoặc dưới dạng utf-8 hoặc borsh serialized |

**Tổng quan**

| Command                             | Mô tả                                             |
| ----------------------------------- | ------------------------------------------------- |
| [`near tx-status`](#near-tx-status) | truy vấn status của một transaction bằng `txHash` |

**Các Validator**

| Command                                               | Mô tả                                                                             |
| ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`near validators current`](#near-validators-current) | hiển thị chi tiết [epoch](/docs/concepts/epoch) validator pool hiện tại           |
| [`near validators next`](#near-validators-next)       | hiển thị chi tiết validator cho [epoch](/docs/concepts/epoch) tiếp theo           |
| [`near proposals`](#near-proposals)                   | hiển thị các validator proposal cho [epoch](/docs/concepts/epoch) tiếp theo _sau_ |

**REPL**

| Command                   | Mô tả                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [`near repl`](#near-repl) | khởi chạy một kết nối tương tác với NEAR blockchain ([REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) |

> [`near-cli`](https://github.com/near/near-cli) là một [NodeJS](https://nodejs.org/) command line interface sử dụng [`near-api-js`](https://github.com/near/near-api-js) để kết nối và tương tác với NEAR blockchain.

---

## Cài đặt {#setup}

### Cài đặt {#installation}

> Để được hỗ trợ EVM, xem thêm tại [`aurora-cli`](https://github.com/aurora-is-near/aurora-cli) của [Project Aurora](https://aurora.dev).

#### Mac và Linux {#mac-and-linux}

1. Cài đặt `npm` và `node` bằng cách sử dụng một package manager như `nvm` vì đôi khi có những sự cố khi sử dụng Ledger do cách OS X xử lý các node package có liên quan đến các thiết bị USB. [[Nhấn vào đây]](https://nodejs.org/en/download/package-manager/)
2. Đảm bảo bạn đã cài đặt Node với version 12 trở lên.
3. Cài đặt global `near-cli` bằng cách chạy:

```bash
npm install -g near-cli
```

#### Windows {#windows}

> Đảm bảo rằng máy tính của bạn đã cài đặt phiên bản hiện tại của `npm` và `NodeJS`.

1. Cài đặt `WSL` [[nhấn vào đây]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. Cài đặt `npm` [[nhấn vào đây]](https://www.npmjs.com/get-npm)
3. Cài đặt `Node.js` [ [nhấn vào đây ]](https://nodejs.org/en/download/package-manager/)
4. Thay đổi thư mục `npm` mặc định [ [ nhấn vào đây ] ](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - Điều này giúp tránh mọi vấn đề về quyền hạn với `WSL`
5. Mở `WSL` và cài đặt global `near-cli` bằng cách chạy:

```bash
npm install -g near-cli
```

<blockquote class="info">
<strong>Chú ý</strong><br /><br />

Copy/paste có thể bị lỗi khi sử dụng `WSL`.

- "Quick Edit Mode" sẽ cho phép paste bằng việc click chuột phải.
- Tùy thuộc vào phiên bản của bạn, có thể có một checkbox khác cho phép paste bằng `Ctrl` +` V`.

![Tùy chọn Windows được gọi là Quick Edit cho phép paste bằng right-click vào WSL](/docs/assets/windows-quickedit-mode.png)

</blockquote>

---

### Update `near-cli` {#update-near-cli}

> Nếu có một bản update `near-cli` khả dụng, bạn sẽ được thông báo trên terminal sau khi chạy bất kỳ lệnh nào. _(xem ví dụ bên dưới)_

![NEAR CLI xác định một version mới](/docs/assets/update_near-cli.png)

- Bạn luôn có thể kiểm tra phiên bản hiện tại của mình bằng cách chạy dòng lệnh sau:

```bash
npm install -g near-cli
```

- Ngoài ra, bạn có thể xem phiên bản mới nhất hiện có bằng cách sử dụng `npm outdated`.

```bash
near --version  # thông tin về version được hiển thị tại dòng cuối cùng của output
```

- Bạn có thể thay đổi network bằng cách thêm một environment variable vào command của mình.

```bash
npm outdated -g  # lưu ý sự khác nhau giữa Current và Latest
```

**Xử lý sự cố:**

> Nếu bạn gặp bất kỳ vấn đề nào khi nâng cấp NEAR CLI, cách nhanh nhất để giải quyết vấn đề là gỡ cài đặt rồi cài đặt lại.

```bash
npm uninstall -g near-cli
```

```bash
npm install -g near-cli
```

---

### Network selection {#network-selection}

> Nếu bạn gặp bất kỳ vấn đề nào khi nâng cấp NEAR CLI, cách nhanh nhất để giải quyết vấn đề là gỡ cài đặt rồi cài đặt lại.

- Ngoài ra, bạn có thể thiết lập một environment variable chung bằng cách chạy đoạn code sau:

```bash
NEAR_ENV=betanet near send ...
```

- Ngoài ra, bạn có thể thiết lập một environment variable chung bằng cách chạy đoạn code sau:

```bash
export NEAR_ENV=mainnet
```

---

## Các RPC Endpoint {#access-keys}

### `near login` {#near-login}

> locally stores a full access key of an account you created with [NEAR Wallet](https://testnet.mynearwallet.com//).

- các tham số: `none`
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near login
```

- You will be redirected to [NEAR Wallet](https://testnet.mynearwallet.com//) requesting full access to your account.
- Tiếp theo, hãy chọn account bạn muốn có một access key.

![near wallet login](/docs/assets/near-login.png)

- Sau khi bạn click vào `allow`, bạn sẽ được yêu cầu xác nhận sự ủy quyền này bằng cách nhập tên account.

![near wallet confirm](/docs/assets/near-login-confirm.png)

#### Vị trí Access Key: {#access-key-location}

- Sau khi hoàn tất, bạn sẽ có Access Key của mình được lưu trữ trong local trong một thư mục ẩn được gọi là `.near-credentials`

  - Thư mục này nằm ở root của thư mục `HOME`:
    - `~/.near-credentials` _(MAC / Linux)_
    - `C:\Users\YOUR_ACCOUNT\.near-credentials` _(Windows)_

- Bên trong `.near-credentials`, các access key được tổ chức trong các thư mục con của network:
  - `default` _cho `testnet`_
  - `betanet`
  - `mainnet`
- Các thư mục con network này chứa các object`.JSON` với:
  - `account_id`
  - `private_key`
  - `public_key`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```json
{
  "account_id": "example-acct.testnet",
  "public_key": "ed25519:7ns2AZVaG8XZrFrgRw7g8qhgddNTN64Zkz7Eo8JBnV5g",
  "private_key": "ed25519:4Ijd3vNUmdWJ4L922BxcsGN1aDrdpvUHEgqLQAUSLmL7S2qE9tYR9fqL6DqabGGDxCSHkKwdaAGNcHJ2Sfd"
}
```

---

### `near keys` {#near-keys}

> lưu trữ toàn bộ access key trên local của account bạn đã tạo với [NEAR Wallet](https://wallet.testnet.near.org/).

- các tham số: `accountId` hoặc `không có`
- các tuỳ chọn: `default`

**Ví dụ:**

```bash
near keys client.chainlink.testnet
```

**Ví dụ response nhận được là:**

```
Keys for account client.chainlink.testnet
[
  {
    public_key: 'ed25519:4wrVrZbHrurMYgkcyusfvSJGLburmaw7m3gmCApxgvY4',
    access_key: { nonce: 97, permission: 'FullAccess' }
  },
  {
    public_key: 'ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW',
    access_key: {
      nonce: 88,
      permission: {
        FunctionCall: {
          allowance: '18483247987345065500000000',
          receiver_id: 'client.chainlink.testnet',
          method_names: [ 'get_token_price', [length]: 1 ]
        }
      }
    }
  },
  [length]: 2
]
```

---

### `near generate-key` {#near-generate-key}

> Hiển thị tất cả các access key cho một account nhất định.

- các tham số: `accountId` hoặc `không có`
- các tuỳ chọn: `--useLedgerKey`, `--seedPhrase`, or `--seedPath`

**Lưu ý:** Có một vài cách để sử dụng `generate-key` trả về những kết quả rất khác nhau. Hãy tham khảo các ví dụ dưới đây để biết thêm chi tiết.

---

#### 1) `near generate-key` {#1-near-generate-key}

> Creates a key pair locally in `.near-credentials` with an [implicit account](/concepts/basics/accounts/account-id#implicit-accounts) as the accountId. _(đại diện hash của public key)_

```bash
near generate-key
```

<details>
<summary>**Ví dụ response nhận được là:**</summary>
<p>

```bash
cặp Key với ed25519:33Vn9VtNEtWQPPd1f4jf5HzJ5weLcvGHU8oz7o5UnPqy public key cho một account "1e5b1346bdb4fc5ccd465f6757a9082a84bcacfd396e7d80b0c726252fe8b3e8"
```

</p>
</details>

---

#### 2) `near generate-key accountId` {#2-near-generate-key-accountid}

> Tạo một cặp local key trong `.near-credentials` với một `accountId` mà bạn chỉ định.

**Lưu ý:** Điều này KHÔNG tạo account với tên này và sẽ ghi đè lên file `.json` hiện có với tên giống nhau.

```bash
near generate-key example.testnet
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```bash
Key pair with ed25519:CcH3oMEFg8tpJLekyvF7Wp49G81K3QLhGbaWEFwtCjht public key for an account "example.testnet"
```

</p>
</details>

---

#### 3a) `near generate-key --useLedgerKey` {#3a-near-generate-key---useledgerkey}

> Tạo một cặp local key trong `.near-credentials` với một `accountId` mà bạn chỉ định.

```bash
near generate-key --useLedgerKey
```

Sau đó, bạn sẽ thấy lời nhắc xác nhận yêu cầu này trên thiết bị Ledger của mình:

    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...

Sau khi xác nhận yêu cầu từ thiết bị Ledger của bạn, một public key và implicit accountId sẽ được hiển thị.

<details>
<summary>**Ví dụ response nhận được là:**</summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wyeRvKIWv61NjmQZEkWTMzAYgdfx6oSeB2
Implicit account: 42c320xc20739fd9a6bqf2f89z61rd14efe5d3de234199bc771235a4bb8b0e1
```

</p>
</details>

---

#### 3b) `near generate-key --useLedgerKey="HD path you specify"` {#3b-near-generate-key---useledgerkeyhd-path-you-specify}

> Sử dụng một thiết bị Ledger đã được kết nối để hiển thị public key và [implicit account](/docs/roles/integrator/implicit-accounts) sử dụng đường dẫn HD mặc định (`"44'/397'/0'/0'/1'"`)

```bash
near generate-key --useLedgerKey="44'/397'/0'/0'/2'"
```

Sau đó, bạn sẽ thấy lời nhắc xác nhận yêu cầu này trên thiết bị Ledger của mình:

    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...

Sau khi xác nhận yêu cầu từ thiết bị Ledger của bạn, một public key và implicit accountId sẽ được hiển thị.

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wye3dfa32rDjmQZEkWTMzAYgCX6oSeB2
Implicit account: 42c320xc20739ASD9a6bqf2Dsaf289z61rd14efe5d3de23213789009afDsd5bb8b0e1
```

</p>
</details>

---

#### 4a) `near generate-key --seedPhrase="your seed phrase"` {#4a-near-generate-key---seedphraseyour-seed-phrase}

> Sử dụng thiết bị Ledger đã được kết nối để hiển thị một pubic key và [implicit account](/docs/roles/integrator/implicit-accounts) sử dụng đường dẫn HD mặc định.

```bash
near generate-key --seedPhrase="cow moon right send now cool dense quark pretty see light after"
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

    Key pair with ed25519:GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi public key for an account "e9fa50ac20522987a87e566fcd6febdc97bd35c8c489999ca8aff465c56969c3"

</p>
</details>

---

#### 4b) `near generate-key accountId --seedPhrase="your seed phrase"` {#4b-near-generate-key-accountid---seedphraseyour-seed-phrase}

> Sử dụng một seed phrase để hiển thị public key và [implicit account](/docs/roles/integrator/implicit-accounts)

```bash
near generate-key example.testnet --seedPhrase="cow moon right send now cool dense quark pretty see light after"
```

<details>
<summary>**Ví dụ về response nhận được:**</summary>
<p>

    Key pair with ed25519:GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi public key for an account "example.testnet"

</p>
</details>

---

### `near add-key` {#near-add-key}

> Sử dụng một seed phrase để hiển thị public key **mà không có** [implicit account](/docs/roles/integrator/implicit-accounts).

**Lưu ý:** Bạn sẽ sử dụng một full access key _đang tồn tại_ cho account mà bạn muốn thêm một key _mới_. ([`near login`](#near-login))

#### 1) thêm một `full access` key {#1-add-a-full-access-key}

- các tham số: `accountId` `--masterAccount`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near add-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

    Adding full access key = Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S to example-acct.testnet.
    Transaction Id EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg

</p>
</details>

#### 2) thêm một `function access` key {#2-add-a-function-access-key}

- các tham số: `accountId` `publicKey`
- các tuỳ chọn: `default`

> `accountId` là account bạn đang thêm key vào
> 
> `--contract-id` là contract mà bạn đang cho phép các method được gọi
> 
> `--method-names` là tùy chọn và nếu bị bỏ qua, tất cả các method của `--contract-id` có thể được gọi.
> 
> `--allowance` là số Ⓝ của key _chỉ_ được phép chi cho phí gas. Nếu bị bỏ qua thì key sẽ chỉ có thể gọi các view method.

**Lưu ý:** Mỗi transaction được thực hiện bằng key này sẽ được khấu trừ phí gas từ khoản tiền cho phép ban đầu và khi hết tiền, bạn phải cấp phát một key mới.

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near add-key example-acct.testnet GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi --contract-id example-contract.testnet --method-names example_method --allowance 30000000000
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

    Adding function call access key = GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi to example-acct.testnet.
    Transaction Id H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r

</p>
</details>

---

### `near delete-key` {#near-delete-key}

> Xóa một key hiện có cho một account nhất định.

- các tham số: `accountId` `--masterAccount`
- các tuỳ chọn: `default`

**Note:** Bạn sẽ cần phân biệt full access key cho account mà bạn muốn xóa key. ([`near login`](#near-login))

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near delete-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

**Ví dụ về response nhận được là:**

    Transaction Id 4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT

---

## Accounts {#accounts}

### `near create-account` {#near-create-account}

> Xóa một key hiện có cho một account nhất định.

- các tham số: `accountId`
- options: `--initialBalance` `--publicKey` `--newLedgerKey`

<blockquote class="warning">
<strong>heads up</strong><br /><br />

This command will only allow the creation of [subaccounts](/concepts/basics/accounts/model#subaccounts) of the `--masterAccount`. You can, however, create a [top-level account](/concepts/basics/accounts/model#top-level-accounts) if the length of the account ID is greater than 31 characters. This is most commonly used for [implicit account](/concepts/basics/accounts/model#implicit-accounts) creation.

If you are looking to create a top-level `.testnet` or `.near` account you can do so using `near-api-js` [ [**here**](/tools/near-api-js/cookbook#create-account) ].

</blockquote>

**Implicit account example:**
```bash
near create-account 7e094afcfc4eda8a970f6648cdf0dbd6de --masterAccount example-acct.testnet
```

**Top level account example:**
```bash
near create-account hiiamalongnamedaccountinnearblockchain --masterAccount example-acct.testnet
```

**Ví dụ subaccount:**

```bash
near create-account sub-acct.example-acct.testnet --masterAccount example-acct.testnet
```

**Ví dụ sử dụng `--initialBalance`:**

```bash
near create-account sub-acct2.example-acct.testnet --masterAccount example-acct.testnet --initialBalance 10
```

**.testnet example:** To create a `.testnet` (or `.mainnet`) account, you must call the testnet contract to create the account. Here is an example:
```bash
near call testnet create_account '{"new_account_id": "<account-name>.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId <account-with-funds>
```

<details>
<summary>**Ví dụ về response nhận được:**</summary>
<p>

    Saving key to '/HOME_DIR/.near-credentials/default/sub-acct2.example-acct.testnet.json'
    Account sub-acct2.example-acct.testnet for network "default" was created.

</p>
</details>

---

### `near state` {#near-state}

> Hiển thị chi tiết về state của account.

- các tham số: `senderId` `receiverId` `amount`
- các tuỳ chọn: `default`

**Ví dụ:**

```bash
near state example.testnet
```

**Ví dụ về response nhận được là:**

```json
{
  "amount": "99999999303364037168535000",
  "locked": "0",
  "code_hash": "G1PCjeQbvbUsJ8piXNb7Yg6dn3mfivDQN7QkvsVuMt4e",
  "storage_usage": 53528,
  "storage_paid_at": 0,
  "block_height": 21577354,
  "block_hash": "AWu1mrT3eMJLjqyhNHvMKrrbahN6DqcNxXanB5UH1RjB",
  "formattedAmount": "99.999999303364037168535"
}
```

---

### `near send` {#near-send}

> Hiển thị chi tiết về state của account.

- các tham số: `accountId` `beneficiaryId`
- các tuỳ chọn: `default`

**Lưu ý:** Bạn sẽ cần một full access key cho sending account. ([`near login`](#near-login))

**Ví dụ:**

```bash
near send sender.testnet receiver.testnet 10
```

**Ví dụ response nhận được là**

    Sending 10 NEAR to receiver.testnet from sender.testnet
    Transaction Id BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN

---

### `near delete` {#near-delete}

> Chuyển NEAR token (Ⓝ) từ một account này tới một account khác.

:::note
Tên của account bị xoá sẽ trở nên khả dụng sau khi hành động này được thực thi.
:::

- các tham số: `accountId` `.wasmFile`
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near delete sub-acct2.example-acct.testnet example-acct.testnet
```

**Ví dụ response nhận được là:**

    Deleting account. Account id: sub-acct2.example-acct.testnet, node: https://rpc.testnet.near.org,  beneficiary: example-acct.testnet
    Transaction Id 4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    Account sub-acct2.example-acct.testnet for network "default" was deleted.

:::warning Token Loss If the beneficiary account does not exist, a refund receipt will be generated and sent back to the original account. But since the original account has already been deleted an error will rise, and **the funds will be dispersed among validators**. :::

---

## Contracts {#contracts}

### `near deploy` {#near-deploy}

> Xóa một account và chuyển số dư còn lại vào account thụ hưởng.

- các tham số: `.wasmFile`
- các tuỳ chọn: `default`

**Note:** Bạn sẽ cần có một full access key cho account mà bạn đang deploy contract. ([`near login`](#near-login))

**Ví dụ:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm
```

**Example về việc khởi tạo:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm --initFunction new --initArgs '{"owner_id": "example-contract.testnet", "total_supply": "10000000"}'
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

    Starting deployment. Account id: example-contract.testnet, node: https://rpc.testnet.near.org,  file: main.wasm
    Transaction Id G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    Done deploying to example-contract.testnet

</p>
</details>

### `near dev-deploy` {#near-dev-deploy}

> Tạo một development account và deploy một smart contract cho account này. Không cần có access keys. **_(`testnet` only)_**

- các tham số: `.wasmFile`
- các tuỳ chọn: `default`

**Ví dụ:**

```bash
near dev-deploy out/main.wasm
```

**Ví dụ response nhận được là:**

    Starting deployment. Account id: dev-1603749005325-6432576, node: https://rpc.testnet.near.org,  file: out/main.wasm
    Transaction Id 5nixQT87KeN3eZFX7zwBLUAKSY4nyjhwzLF27SWWKkAp
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/5nixQT87KeN3eZFX7zwBLUAKSY4nyjhwzLF27SWWKkAp
    Done deploying to dev-1603749005325-6432576

---

### `near call` {#near-call}

> Thực hiện một contract call có thể sửa đổi _hoặc_ xem state.

**Note:** các contract call yêu cầu một transaction fee (gas) vì vậy bạn sẽ cần một access key cho `--accountId` sẽ bị tính phí. ([`near login`](#near-login))

- các tham số: `contractName` `method_name` `{ args }` `--accountId`

| Options                     | Mô tả                                                              |
| --------------------------- | ------------------------------------------------------------------ |
| `--gas`                     | Lượng gas tối đa mà call này có thể sử dụng (tính theo đơn vị gas) |
| `--deposit` hoặc `--amount` | Số lượng token đính kèm (đơn vị NEAR) vào một function call        |
| `--depositYocto`            | Số lượng token đính kèm (đơn vị yoctoNEAR) vào một function call   |
| `--base64`                  | Coi các tham số là base64-encoded                                  |

**Tip:** Có hai cách thực hiện đối với các method yêu cầu `{ args }` rỗng. Hoặc là send `{"field": null}` hoặc đơn giản là bỏ qua trường này và không truyền bất kỳ giá trị nào: `{}`

**Ví dụ:**

```bash
near call guest-book.testnet addMessage '{"text": "Aloha"}' --accountId example-acct.testnet
```

**Ví dụ về response nhận được là:**

```bash
Scheduling a call: guest-book.testnet.addMessage({"text": "Aloha"})
Transaction Id FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
''
```
---

### `near view` {#near-view}

> Tạo một contract call mà **chỉ** có thể view state. _(miễn phí)_

- các tham số: `accountId` [`finality`](/docs/api/rpc#using-finality-param) _OR_ [`block-id`](/docs/api/rpc#using-block_id-param)
- các tuỳ chọn: `mặc định`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near view guest-book.testnet getMessages '{}'
```

**Ví dụ về response nhận được là:**

```bash
    View call: guest-book.testnet.getMessages({})
    [
      { premium: false, sender: 'waverlymaven.testnet', text: 'TGIF' },
      {
        premium: true,
        sender: 'waverlymaven.testnet',
        text: 'Hello from New York 🌈'
      },
      { premium: false, sender: 'fhr.testnet', text: 'Hi' },
      { premium: true, sender: 'eugenethedream', text: 'test' },
      { premium: false, sender: 'dongri.testnet', text: 'test' },
      { premium: false, sender: 'dongri.testnet', text: 'hello' },
      { premium: true, sender: 'dongri.testnet', text: 'hey' },
      { premium: false, sender: 'hirokihori.testnet', text: 'hello' },
      { premium: true, sender: 'eugenethedream', text: 'hello' },
      { premium: false, sender: 'example-acct.testnet', text: 'Aloha' },
      [length]: 10
    ]
```

## `near view-state` {#near-view-state}

> Trả về state của contract (các cặp key / value) ở định dạng utf-8 hoặc định dạng borsh serialized.

- arguments: `accountId` [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block-id`](/api/rpc/setup#using-block_id-param)
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near view-state dao.sputnik-v2.testnet --finality final
```

HOẶC

```bash
near view-state dao.sputnik-v2.testnet --block-id 53199035
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```js
[
  {
    key: <Buffer 00>,
    value: <Buffer 07 00 67 65 6e 73 69 0b 47 20 44 41 4f>
  },
  {
    key: <Buffer 01>,
    value: <Buffer 01 02 00 03 61 6c 0d 2a 3a 41 64 50 72 6f 70 73 07 63 75 6e 69 ... 222 more bytes>
  },
  {
    key: <Buffer 03 00>,
    value: <Buffer 00 14 6e 65 61 72 2d 78 6d 70 6c 2e 74 73 0f 41 64 20 4e 77 43 6f 75 63 69 02 18 ... 133 more bytes>
  },
  {
    key: <Buffer 53 54 41 45>,
    value: <Buffer 01 00 80 66 de c1 b9 a2 df e3 03 02 ... 39 more bytes>
  }
]
```

</p>
</details>

---

## Tổng quan {#transactions}

### `near tx-status` {#near-tx-status}

> Hiển thị chi tiết các trạng thái của transaction cho một transaction hash và accountId chỉ định.

- tham số: `tx hash` `--accountId` _HOẶC_ `accountId:tx_hash` _(xem ví dụ bên dưới)_
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near tx-status near-example.testnet:6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j
```

HOẶC

```bash
near tx-status 6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j --accountId near-example.testnet
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```json
Transaction near-example.testnet:6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'near-example.testnet',
    public_key: 'ed25519:3PTXqkrMLb1nVchxzC4RX5fUShq7EBqkSV7Te17n5J42',
    nonce: 50891444000001,
    receiver_id: 'receiver.testnet',
    actions: [ { Transfer: { deposit: '1000000000000000000000000' } } ],
    signature: 'ed25519:4oBvWrBYJT6YPRaJctWxtsMSMcKBcLhCvWAipoQ18qRe4myxJNnkR6hypw2Nqcc99Yg6e47yqmwt3VDXiyGHth7w',
    hash: '6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j'
  },
  transaction_outcome: {
    proof: [],
    block_hash: 'ASUCV9Zk5R9KbXB2ngMernS38KgFwK3Y8x8zZjSX8xcK',
    id: '6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j',
    outcome: {
      logs: [],
      receipt_ids: [ 'JBXhsPNwx1g2gmrAXFy9UmP8ziSgsZn6kxDcijNsbABo' ],
      gas_burnt: 223182562500,
      tokens_burnt: '22318256250000000000',
      executor_id: 'near-example.testnet',
      status: {
        SuccessReceiptId: 'JBXhsPNwx1g2gmrAXFy9UmP8ziSgsZn6kxDcijNsbABo'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [],
      block_hash: '5gsqDtub9x2L6jnThg6gi3FZTVzusvjqhxFWYQ31hedw',
      id: 'JBXhsPNwx1g2gmrAXFy9UmP8ziSgsZn6kxDcijNsbABo',
      outcome: {
        logs: [],
        receipt_ids: [ 'DxBEN5ZcfZJ21e2axAe7aLwTVSyxCmgDuht1TsDXT2DT' ],
        gas_burnt: 223182562500,
        tokens_burnt: '22318256250000000000',
        executor_id: 'receiver.testnet',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [],
      block_hash: '9BcSFdzHzXtQhSS5uPUY6mAtNWwbQJoEiyqwZk4GAbe6',
      id: 'DxBEN5ZcfZJ21e2axAe7aLwTVSyxCmgDuht1TsDXT2DT',
      outcome: {
        logs: [],
        receipt_ids: [],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'near-example.testnet',
        status: { SuccessValue: '' }
      }
    }
  ]
}
```

</p>
</details>

---

## Các Validator {#validators}

### `near validators current` {#near-validators-current}

> Hiển thị chi tiết của các validator hiện tại.
> 
> - lượng tiền đã được stake
> - số lượng seat
> - tỷ lệ uptime
> - block dự kiến sản xuất
> - các block thực sự đã được sản xuất

- các tham số: `current`
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near validators current
```

**Ví dụ cho `mainnet`:**

```bash
NEAR_ENV=mainnet near validators current
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```bash
Validators (total: 49, seat price: 1,976,588):
.--------------------------------------------------------------------------------------------------------------------.
| Validator Id                                 | Stake      | Seats | % Online | Blocks produced | Blocks expected |
|----------------------------------------------|------------|-------|----------|-----------------|-----------------|
| cryptium.poolv1.near                         | 13,945,727 | 7     | 100%     | 1143            | 1143            |
| astro-stakers.poolv1.near                    | 11,660,189 | 5     | 100%     | 817             | 817             |
| blockdaemon.poolv1.near                      | 11,542,867 | 5     | 76.74%   | 627             | 817             |
| zavodil.poolv1.near                          | 11,183,187 | 5     | 100%     | 818             | 818             |
| bisontrails.poolv1.near                      | 10,291,696 | 5     | 99.38%   | 810             | 815             |
| dokiacapital.poolv1.near                     | 7,906,352  | 3     | 99.54%   | 650             | 653             |
| chorusone.poolv1.near                        | 7,480,508  | 3     | 100%     | 490             | 490             |
| figment.poolv1.near                          | 6,931,070  | 3     | 100%     | 489             | 489             |
| stardust.poolv1.near                         | 6,401,678  | 3     | 100%     | 491             | 491             |
| anonymous.poolv1.near                        | 6,291,821  | 3     | 97.55%   | 479             | 491             |
| d1.poolv1.near                               | 6,265,109  | 3     | 100%     | 491             | 491             |
| near8888.poolv1.near                         | 6,202,968  | 3     | 99.38%   | 486             | 489             |
| rekt.poolv1.near                             | 5,950,212  | 3     | 100%     | 490             | 490             |
| epic.poolv1.near                             | 5,639,256  | 2     | 100%     | 326             | 326             |
| fresh.poolv1.near                            | 5,460,410  | 2     | 100%     | 327             | 327             |
| buildlinks.poolv1.near                       | 4,838,398  | 2     | 99.38%   | 325             | 327             |
| jubi.poolv1.near                             | 4,805,921  | 2     | 100%     | 326             | 326             |
| openshards.poolv1.near                       | 4,644,553  | 2     | 100%     | 326             | 326             |
| jazza.poolv1.near                            | 4,563,432  | 2     | 100%     | 327             | 327             |
| northernlights.poolv1.near                   | 4,467,978  | 2     | 99.39%   | 326             | 328             |
| inotel.poolv1.near                           | 4,427,152  | 2     | 100%     | 327             | 327             |
| baziliknear.poolv1.near                      | 4,261,142  | 2     | 100%     | 328             | 328             |
| stakesabai.poolv1.near                       | 4,242,618  | 2     | 100%     | 326             | 326             |
| everstake.poolv1.near                        | 4,234,552  | 2     | 100%     | 327             | 327             |
| stakin.poolv1.near                           | 4,071,704  | 2     | 100%     | 327             | 327             |
| certusone.poolv1.near                        | 3,734,505  | 1     | 100%     | 164             | 164             |
| lux.poolv1.near                              | 3,705,394  | 1     | 100%     | 163             | 163             |
| staked.poolv1.near                           | 3,683,365  | 1     | 100%     | 164             | 164             |
| lunanova.poolv1.near                         | 3,597,231  | 1     | 100%     | 163             | 163             |
| appload.poolv1.near                          | 3,133,163  | 1     | 100%     | 163             | 163             |
| smart-stake.poolv1.near                      | 3,095,711  | 1     | 100%     | 164             | 164             |
| artemis.poolv1.near                          | 3,009,462  | 1     | 99.39%   | 163             | 164             |
| moonlet.poolv1.near                          | 2,790,296  | 1     | 100%     | 163             | 163             |
| nearfans.poolv1.near                         | 2,771,137  | 1     | 100%     | 163             | 163             |
| nodeasy.poolv1.near                          | 2,692,745  | 1     | 99.39%   | 163             | 164             |
| erm.poolv1.near                              | 2,653,524  | 1     | 100%     | 164             | 164             |
| zkv_staketosupportprivacy.poolv1.near        | 2,548,343  | 1     | 99.39%   | 163             | 164             |
| dsrvlabs.poolv1.near                         | 2,542,925  | 1     | 100%     | 164             | 164             |
| 08investinwomen_runbybisontrails.poolv1.near | 2,493,123  | 1     | 100%     | 163             | 163             |
| electric.poolv1.near                         | 2,400,532  | 1     | 99.39%   | 163             | 164             |
| sparkpool.poolv1.near                        | 2,378,191  | 1     | 100%     | 163             | 163             |
| hashquark.poolv1.near                        | 2,376,424  | 1     | 100%     | 164             | 164             |
| masternode24.poolv1.near                     | 2,355,634  | 1     | 100%     | 164             | 164             |
| sharpdarts.poolv1.near                       | 2,332,398  | 1     | 99.38%   | 162             | 163             |
| fish.poolv1.near                             | 2,315,249  | 1     | 100%     | 163             | 163             |
| ashert.poolv1.near                           | 2,103,327  | 1     | 97.56%   | 160             | 164             |
| 01node.poolv1.near                           | 2,058,200  | 1     | 100%     | 163             | 163             |
| finoa.poolv1.near                            | 2,012,304  | 1     | 100%     | 163             | 163             |
| majlovesreg.poolv1.near                      | 2,005,032  | 1     | 100%     | 164             | 164             |
'--------------------------------------------------------------------------------------------------------------------'
```

</p>
</details>

---

### `near validators next` {#near-validators-next}

> Hiển thị thông tin chi tiết của các validator ở vòng tiếp theo.
> 
> - tổng số các seat khả dụng
> - giá một seat
> - lượng tiền đã được stake
> - số lượng seat đã được đăng ký trên mỗi validator

- các tham số: `next`
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near validators next
```

**Ví dụ cho `mainnet`:**

```bash
NEAR_ENV=mainnet near validators next
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```bash
Next validators (total: 49, seat price: 1,983,932):
.----------------------------------------------------------------------------------------------.
| Status   | Validator                                    | Stake                    | Seats |
|----------|----------------------------------------------|--------------------------|-------|
| Rewarded | cryptium.poolv1.near                         | 13,945,727 -> 14,048,816 | 7     |
| Rewarded | astro-stakers.poolv1.near                    | 11,660,189 -> 11,704,904 | 5     |
| Rewarded | blockdaemon.poolv1.near                      | 11,542,867 -> 11,545,942 | 5     |
| Rewarded | zavodil.poolv1.near                          | 11,183,187 -> 11,204,123 | 5     |
| Rewarded | bisontrails.poolv1.near                      | 10,291,696 -> 10,297,923 | 5     |
| Rewarded | dokiacapital.poolv1.near                     | 7,906,352 -> 8,097,275   | 4     |
| Rewarded | chorusone.poolv1.near                        | 7,480,508 -> 7,500,576   | 3     |
| Rewarded | figment.poolv1.near                          | 6,931,070 -> 6,932,916   | 3     |
| Rewarded | stardust.poolv1.near                         | 6,401,678 -> 6,449,363   | 3     |
| Rewarded | anonymous.poolv1.near                        | 6,291,821 -> 6,293,497   | 3     |
| Rewarded | d1.poolv1.near                               | 6,265,109 -> 6,266,777   | 3     |
| Rewarded | near8888.poolv1.near                         | 6,202,968 -> 6,204,620   | 3     |
| Rewarded | rekt.poolv1.near                             | 5,950,212 -> 5,951,797   | 2     |
| Rewarded | epic.poolv1.near                             | 5,639,256 -> 5,640,758   | 2     |
| Rewarded | fresh.poolv1.near                            | 5,460,410 -> 5,461,811   | 2     |
| Rewarded | buildlinks.poolv1.near                       | 4,838,398 -> 4,839,686   | 2     |
| Rewarded | jubi.poolv1.near                             | 4,805,921 -> 4,807,201   | 2     |
| Rewarded | openshards.poolv1.near                       | 4,644,553 -> 4,776,692   | 2     |
| Rewarded | jazza.poolv1.near                            | 4,563,432 -> 4,564,648   | 2     |
| Rewarded | northernlights.poolv1.near                   | 4,467,978 -> 4,469,168   | 2     |
| Rewarded | inotel.poolv1.near                           | 4,427,152 -> 4,428,331   | 2     |
| Rewarded | baziliknear.poolv1.near                      | 4,261,142 -> 4,290,338   | 2     |
| Rewarded | stakesabai.poolv1.near                       | 4,242,618 -> 4,243,748   | 2     |
| Rewarded | everstake.poolv1.near                        | 4,234,552 -> 4,235,679   | 2     |
| Rewarded | stakin.poolv1.near                           | 4,071,704 -> 4,072,773   | 2     |
| Rewarded | certusone.poolv1.near                        | 3,734,505 -> 3,735,500   | 1     |
| Rewarded | lux.poolv1.near                              | 3,705,394 -> 3,716,381   | 1     |
| Rewarded | staked.poolv1.near                           | 3,683,365 -> 3,684,346   | 1     |
| Rewarded | lunanova.poolv1.near                         | 3,597,231 -> 3,597,836   | 1     |
| Rewarded | appload.poolv1.near                          | 3,133,163 -> 3,152,302   | 1     |
| Rewarded | smart-stake.poolv1.near                      | 3,095,711 -> 3,096,509   | 1     |
| Rewarded | artemis.poolv1.near                          | 3,009,462 -> 3,010,265   | 1     |
| Rewarded | moonlet.poolv1.near                          | 2,790,296 -> 2,948,565   | 1     |
| Rewarded | nearfans.poolv1.near                         | 2,771,137 -> 2,771,875   | 1     |
| Rewarded | nodeasy.poolv1.near                          | 2,692,745 -> 2,693,463   | 1     |
| Rewarded | erm.poolv1.near                              | 2,653,524 -> 2,654,231   | 1     |
| Rewarded | dsrvlabs.poolv1.near                         | 2,542,925 -> 2,571,865   | 1     |
| Rewarded | zkv_staketosupportprivacy.poolv1.near        | 2,548,343 -> 2,549,022   | 1     |
| Rewarded | 08investinwomen_runbybisontrails.poolv1.near | 2,493,123 -> 2,493,787   | 1     |
| Rewarded | masternode24.poolv1.near                     | 2,355,634 -> 2,456,226   | 1     |
| Rewarded | fish.poolv1.near                             | 2,315,249 -> 2,415,831   | 1     |
| Rewarded | electric.poolv1.near                         | 2,400,532 -> 2,401,172   | 1     |
| Rewarded | sparkpool.poolv1.near                        | 2,378,191 -> 2,378,824   | 1     |
| Rewarded | hashquark.poolv1.near                        | 2,376,424 -> 2,377,057   | 1     |
| Rewarded | sharpdarts.poolv1.near                       | 2,332,398 -> 2,332,948   | 1     |
| Rewarded | ashert.poolv1.near                           | 2,103,327 -> 2,103,887   | 1     |
| Rewarded | 01node.poolv1.near                           | 2,058,200 -> 2,058,760   | 1     |
| Rewarded | finoa.poolv1.near                            | 2,012,304 -> 2,015,808   | 1     |
| Rewarded | majlovesreg.poolv1.near                      | 2,005,032 -> 2,005,566   | 1     |
'----------------------------------------------------------------------------------------------'
```

</p>
</details>

---

### `near proposals` {#near-proposals}

> Displays validator proposals for [epoch](../1.concepts/basics/epoch.md) after next.
> 
> - giá seat được kỳ vọng
> - trạng thái của các proposal
> - lượng tiền đã được stake trước đó và lượng tiền mới _sẽ_ được stake
> - số lượng seat được đăng ký trên mỗi validator

- các tham số: `none`
- các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near proposals
```

**Ví dụ cho `mainnet`:**

```bash
NEAR_ENV=mainnet near proposals
```

<details>
<summary>** Ví dụ về response nhận được:**</summary>
<p>

```bash
Proposals for the epoch after next (new: 51, passing: 49, expected seat price = 1,983,932)
.--------------------------------------------------------------------------------------------------------.
| Status             | Validator                                    | Stake => New Stake       | Seats |
|--------------------|----------------------------------------------|--------------------------|-------|
| Proposal(Accepted) | cryptium.poolv1.near                         | 13,945,727 => 14,041,766 | 7     |
| Proposal(Accepted) | astro-stakers.poolv1.near                    | 11,660,189 => 11,705,673 | 5     |
| Proposal(Accepted) | blockdaemon.poolv1.near                      | 11,542,867 => 11,545,942 | 5     |
| Proposal(Accepted) | zavodil.poolv1.near                          | 11,183,187 => 11,207,805 | 5     |
| Proposal(Accepted) | bisontrails.poolv1.near                      | 10,291,696 => 10,300,978 | 5     |
| Proposal(Accepted) | dokiacapital.poolv1.near                     | 7,906,352 => 8,097,275   | 4     |
| Proposal(Accepted) | chorusone.poolv1.near                        | 7,480,508 => 7,568,268   | 3     |
| Proposal(Accepted) | figment.poolv1.near                          | 6,931,070 => 6,932,916   | 3     |
| Proposal(Accepted) | stardust.poolv1.near                         | 6,401,678 => 6,449,363   | 3     |
| Proposal(Accepted) | anonymous.poolv1.near                        | 6,291,821 => 6,293,497   | 3     |
| Proposal(Accepted) | d1.poolv1.near                               | 6,265,109 => 6,266,777   | 3     |
| Proposal(Accepted) | near8888.poolv1.near                         | 6,202,968 => 6,204,620   | 3     |
| Proposal(Accepted) | rekt.poolv1.near                             | 5,950,212 => 5,951,797   | 2     |
| Proposal(Accepted) | epic.poolv1.near                             | 5,639,256 => 5,640,758   | 2     |
| Proposal(Accepted) | fresh.poolv1.near                            | 5,460,410 => 5,461,811   | 2     |
| Proposal(Accepted) | buildlinks.poolv1.near                       | 4,838,398 => 4,839,686   | 2     |
| Proposal(Accepted) | jubi.poolv1.near                             | 4,805,921 => 4,807,201   | 2     |
| Proposal(Accepted) | openshards.poolv1.near                       | 4,644,553 => 4,776,692   | 2     |
| Proposal(Accepted) | jazza.poolv1.near                            | 4,563,432 => 4,564,648   | 2     |
| Proposal(Accepted) | northernlights.poolv1.near                   | 4,467,978 => 4,469,168   | 2     |
| Proposal(Accepted) | inotel.poolv1.near                           | 4,427,152 => 4,428,331   | 2     |
| Proposal(Accepted) | baziliknear.poolv1.near                      | 4,261,142 => 4,290,891   | 2     |
| Proposal(Accepted) | stakesabai.poolv1.near                       | 4,242,618 => 4,243,748   | 2     |
| Proposal(Accepted) | everstake.poolv1.near                        | 4,234,552 => 4,235,679   | 2     |
| Proposal(Accepted) | stakin.poolv1.near                           | 4,071,704 => 4,072,773   | 2     |
| Proposal(Accepted) | certusone.poolv1.near                        | 3,734,505 => 3,735,500   | 1     |
| Proposal(Accepted) | lux.poolv1.near                              | 3,705,394 => 3,716,381   | 1     |
| Proposal(Accepted) | staked.poolv1.near                           | 3,683,365 => 3,684,346   | 1     |
| Proposal(Accepted) | lunanova.poolv1.near                         | 3,597,231 => 3,597,836   | 1     |
| Proposal(Accepted) | appload.poolv1.near                          | 3,133,163 => 3,152,302   | 1     |
| Proposal(Accepted) | smart-stake.poolv1.near                      | 3,095,711 => 3,096,509   | 1     |
| Proposal(Accepted) | artemis.poolv1.near                          | 3,009,462 => 3,010,265   | 1     |
| Proposal(Accepted) | moonlet.poolv1.near                          | 2,790,296 => 2,948,565   | 1     |
| Proposal(Accepted) | nearfans.poolv1.near                         | 2,771,137 => 2,771,875   | 1     |
| Proposal(Accepted) | nodeasy.poolv1.near                          | 2,692,745 => 2,693,463   | 1     |
| Proposal(Accepted) | erm.poolv1.near                              | 2,653,524 => 2,654,231   | 1     |
| Proposal(Accepted) | dsrvlabs.poolv1.near                         | 2,542,925 => 2,571,865   | 1     |
| Proposal(Accepted) | zkv_staketosupportprivacy.poolv1.near        | 2,548,343 => 2,549,022   | 1     |
| Proposal(Accepted) | 08investinwomen_runbybisontrails.poolv1.near | 2,493,123 => 2,493,787   | 1     |
| Proposal(Accepted) | masternode24.poolv1.near                     | 2,355,634 => 2,456,226   | 1     |
| Proposal(Accepted) | fish.poolv1.near                             | 2,315,249 => 2,415,831   | 1     |
| Proposal(Accepted) | electric.poolv1.near                         | 2,400,532 => 2,401,172   | 1     |
| Proposal(Accepted) | sparkpool.poolv1.near                        | 2,378,191 => 2,378,824   | 1     |
| Proposal(Accepted) | hashquark.poolv1.near                        | 2,376,424 => 2,377,057   | 1     |
| Proposal(Accepted) | sharpdarts.poolv1.near                       | 2,332,398 => 2,332,948   | 1     |
| Proposal(Accepted) | ashert.poolv1.near                           | 2,103,327 => 2,103,887   | 1     |
| Proposal(Accepted) | 01node.poolv1.near                           | 2,058,200 => 2,059,314   | 1     |
| Proposal(Accepted) | finoa.poolv1.near                            | 2,012,304 => 2,015,808   | 1     |
| Proposal(Accepted) | majlovesreg.poolv1.near                      | 2,005,032 => 2,005,566   | 1     |
| Proposal(Declined) | huobipool.poolv1.near                        | 1,666,976                | 0     |
| Proposal(Declined) | hb436_pool.poolv1.near                       | 500,030                  | 0     |
'--------------------------------------------------------------------------------------------------------'

```

</p>
</details>

---

## REPL {#repl}

### `near repl` {#near-repl}

> Khởi chạy NEAR [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) _(một môi trường lập trình JavaScript)_ được kết nối đến NEAR.

- các tham số: `none`
- các tuỳ chọn: `--accountId`

Để khởi chạy, run:

```bash
near repl
```

- Bạn sẽ được nhìn thấy một prompt `>` và có thể bắt đầu tương tác với NEAR.
- Thử nhập nội dung sau vào prompt của bạn để chuyển đổi NEAR (Ⓝ) thành yoctoNEAR (10^-24):

```bash
nearAPI.utils.format.parseNearAmount('1000')
```

> Bạn cũng có thể sử dụng `--accountId` với `near repl`.

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near repl --accountId example-acct.testnet
```

- Sau đó thử log `account` phía sau `>` prompt.

```bash
console.log(account)
```

**Ví dụ về response nhận được là:**

```json
Account {
  accessKeyByPublicKeyCache: {},
  connection: Connection {
    networkId: 'default',
    provider: JsonRpcProvider { connection: [Object] },
    signer: InMemorySigner { keyStore: [MergeKeyStore] }
  },
  accountId: 'example-acct.testnet',
  _ready: Promise { undefined },
  _state: {
    amount: '98786165075093615800000000',
    locked: '0',
    code_hash: '11111111111111111111111111111111',
    storage_usage: 741,
    storage_paid_at: 0,
    block_height: 21661252,
    block_hash: 'HbAj25dTzP3ssYjNRHov9BQ72UxpHGVqZK1mZwGdGNbo'
  }
}
```

> Bạn cũng có thể lấy private key của một public key.

- Đầu tiên, khai báo một `privateKey` variable:

```js
const myPrivateKey =
  "3fKM9Rr7LHyzhhzmmedXLvc59rayfh1oUYS3VfUcxwpAFQZtdx1G9aTY6i8hG9mQtYoycTEFTBtatgNKHRtYamrS";
```

- Sau đó, run:

```js
nearAPI.KeyPair.fromString(myPrivateKey).publicKey.toString();
```

Với NEAR REPL, bạn có thể hoàn toàn truy cập đến [`near-api-js`](https://github.com/near/near-api-js) để giúp bạn develop trên NEAR platform.

---

## Options {#options}

| Tuỳ chọn                      | Mô ta                                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `--help`                      | hiển thị trợ giúp _(Có thể sử dụng độc lập hoặc sử dụng với bất kỳ command nào)_                                                       |
| `--version`                   | hiển thị version của `near-cli` đã được cài đặt                                                                                        |
| `--nodeUrl`, `--node_url`     | selects an [RPC URL](/api/rpc/setup) _(`testnet`, `mainnet`, `betanet`)_                                                               |
| `--helperUrl`                 | trỏ đến một [contract helper](https://github.com/near/near-contract-helper) instance mà bạn muốn sử dụng để khởi tạo / quản lý account |
| `--keyPath`                   | chỉ định một path cho `--masterAccount` key                                                                                            |
| `--accountId`, `--account_id` | chọn một account ID                                                                                                                    |
| `--useLedgerKey`              | sử dụng Ledger với một HD key path xác định `[default: "44'/397'/0'/0'/1'"]`                                                           |
| `--seedPhrase`                | sử dụng một seed phrase dễ nhớ                                                                                                         |
| `--seedPath`                  | chỉ định một HD path derivation `[default: "m/44'/397'/0'"]`                                                                           |
| `--walletUrl`                 | selects a [NEAR wallet](https://testnet.mynearwallet.com) URL                                                                          |
| `--contractName`              | chọn một tên account contract                                                                                                          |
| `--masterAccount`             | chọn một master account                                                                                                                |
| `--helperAccount`             | chọn một top-level account mong muốn cho một network                                                                                   |
| `--verbose`, `-v`             | hiển thị verbose output                                                                                                                |
| `--gas`                       | chỉ định một lượng gas để sử dụng cho một contract call `[default: "100000000000000"]`                                                 |
| `--deposit`                   | Lượng NEAR token (Ⓝ) được đính kèm `[default: "0"]`                                                                                    |
| `--depositYocto`              | Lượng token được đính kèm (tính theo yocto Ⓝ) cho một function call `[default: null]`                                                  |

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>Ask it on StackOverflow!</h8></a>
:::
