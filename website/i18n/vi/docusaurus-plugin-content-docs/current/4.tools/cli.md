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

## Overview

_Click vào từng command để xem thông tin chi tiết và các ví dụ._

| Command                                         | Mô tả                                                                                     |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **ACCESS KEYS**                                 |                                                                                           |
| [`near add-credentials`](#near-add-credentials) | Stores credentials for an account locally                                                 |
| [`near add-key`](#near-add-key)                 | thêm một access key mới vào account                                                       |
| [`near delete-key`](#near-delete-key)           | xóa một access key từ một account                                                         |
| [`near generate-key`](#near-generate-key)       | generates a key pair and **optionally** stores it locally as credentials for an accountId |
| [`near list-keys`](#near-keys)                  | hiển thị tất cả các access key và thông tin chi tiết của chúng cho một account nhất định  |
| [`near login`](#near-login)                     | stores a full access key locally using [NEAR Wallet](https://wallet.testnet.near.org/)    |
| **ACCOUNTS**                                    |                                                                                           |
| [`near create-account`](#near-create-account)   | creates a new account, either using a faucet to fund it, or an account saved locally      |
| [`near delete-account`](#near-delete)           | xóa account và chuyển số dư còn lại sang account thụ hưởng                                |
| [`near list-keys`](#near-keys)                  | hiển thị tất cả các access key của một account nhất định                                  |
| [`near send-near`](#near-send)                  | gửi các token từ một account này đến một account khác                                     |
| [`near state`](#near-state)                     | hiển thị các thông tin chi tiết của account                                               |
| **CONTRACTS**                                   |                                                                                           |
| [`near call`](#near-call)                       | tạo một contract call có thể thực thi các `change` _hoặc_ `view` method                   |
| [`near deploy`](#near-deploy)                   | deploy một smart contract lên NEAR blockchain                                             |
| [`near storage`](#near-storage)                 | Shows the storage state of a given contract, i.e. the data stored in a contract           |
| [`near view`](#near-view)                       | tạo một contract call **chỉ có thể** thực thi một `view` method                           |
| **TRANSACTIONS**                                |                                                                                           |
| [`near tx-status`](#near-tx-status)             | truy vấn status của một transaction bằng `txHash`                                         |


[ [**OPTIONS**](#options) ]

> [`near-cli`](https://github.com/near/near-cli) là một [NodeJS](https://nodejs.org/) command line interface sử dụng [`near-api-js`](https://github.com/near/near-api-js) để kết nối và tương tác với NEAR blockchain.

---

## Cài đặt

### Cài đặt

> Để được hỗ trợ EVM, xem thêm tại [`aurora-cli`](https://github.com/aurora-is-near/aurora-cli) của [Project Aurora](https://aurora.dev).

#### Mac và Linux

1. Cài đặt `npm` và `node` bằng cách sử dụng một package manager như `nvm` vì đôi khi có những sự cố khi sử dụng Ledger do cách OS X xử lý các node package có liên quan đến các thiết bị USB. [[Nhấn vào đây]](https://nodejs.org/en/download/package-manager/)
2. Đảm bảo bạn đã cài đặt Node với version 12 trở lên.
3. Cài đặt global `near-cli` bằng cách chạy:

```bash
npm install -g near-cli
```

#### Windows

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

---

### Network selection

> Nếu bạn gặp bất kỳ vấn đề nào khi nâng cấp NEAR CLI, cách nhanh nhất để giải quyết vấn đề là gỡ cài đặt rồi cài đặt lại.

- Ngoài ra, bạn có thể thiết lập một environment variable chung bằng cách chạy đoạn code sau:

```bash
NEAR_NETWORK=betanet near send ...
```

- Ngoài ra, bạn có thể thiết lập một environment variable chung bằng cách chạy đoạn code sau:

```bash
export NEAR_NETWORK=mainnet
```

- All commands that interact with the network also allow to pass the `--networkId` option.

```bash
near send-near ... --networkId mainnet
```

---

### Custom RPC server selection
You can set custom RPC server URL by setting this env variables:
```bash
NEAR_MAINNET_RPC
NEAR_TESTNET_RPC
```
Clear them in case you want to get back to the default RPC server.

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:
```bash
export NEAR_TESTNET_RPC=<put_your_rpc_server_url_here>
```
---

## Các RPC Endpoint

All keys are stored locally at the root of your `HOME` directory:
  -   `~/.near-credentials` _(MAC / Linux)_
  -   `C:\Users\YOUR_ACCOUNT\.near-credentials` _(Windows)_

Inside `.near-credentials`, access keys are organized in network subdirectories: `testnet`, and `mainnet`.

Các thư mục con network này chứa các object`.JSON` với:
  -   `account_id`
  -   `private_key`
  -   `public_key`

### `near add-credentials <accountId>`
> Stores credentials (full-access-key) locally for an already existing account.

-   các tham số: `accountId` hoặc `không có`
-   options: `--seedPhrase` or `--secretKey`

**Examples:**

```bash
near add-credentials example-acct.testnet --seedPhrase "antique attitude say evolve ring arrive hollow auto wide bronze usual unfold"
```

---

### `near add-key`

> Adds either a **full access** or **function access** key to a given account.

**Lưu ý:** Bạn sẽ sử dụng một full access key _đang tồn tại_ cho account mà bạn muốn thêm một key _mới_. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

#### 1) thêm một `full access` key

- các tham số: `accountId` `--masterAccount`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near add-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary><strong>Ví dụ response nhận được là</strong></summary>
<p>

    Adding full access key = Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S to example-acct.testnet.
    Transaction Id EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg

</p>
</details>

#### 2) add a `function call` key

-   các tham số: `accountId` `publicKey`
-   các tuỳ chọn: `default`

> `accountId` là account bạn đang thêm key vào
> 
> `--contract-id` là contract mà bạn đang cho phép các method được gọi
> 
> `--method-names` là tùy chọn và nếu bị bỏ qua, tất cả các method của `--contract-id` có thể được gọi.
> 
> `--allowance` is the amount of Ⓝ the key is allowed to spend on gas fees _only_ (default: 0).

**Lưu ý:** Mỗi transaction được thực hiện bằng key này sẽ được khấu trừ phí gas từ khoản tiền cho phép ban đầu và khi hết tiền, bạn phải cấp phát một key mới.

**Ví dụ:**

```bash
near add-key example-acct.testnet GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi --contract-id example-contract.testnet --method-names example_method --allowance 30000000000
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

    Adding function call access key = GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi to example-acct.testnet.
    Transaction Id H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r

</p>
</details>

---

### `near delete-key`

> Xóa một key hiện có cho một account nhất định.

-   các tham số: `accountId` `--masterAccount`
-   options: `--networkId`, `force`

**Note:** Bạn sẽ cần phân biệt full access key cho account mà bạn muốn xóa key. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near delete-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

    Transaction Id 4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT

</p>
</details>

---
### `near generate-key`

> Displays a key-pair and seed-phrase and optionally stores it locally in `.near-credentials`.

-   các tham số: `accountId` hoặc `không có`
-   options: `--fromSeedPhrase`, `--saveImplicit`

**Lưu ý:** Có một vài cách để sử dụng `generate-key` trả về những kết quả rất khác nhau. Hãy tham khảo các ví dụ dưới đây để biết thêm chi tiết.

---

#### 1a) `near generate-key`

> Creates and displays a key pair

```bash
near generate-key
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```bash
Seed phrase: antique attitude say evolve ring arrive hollow auto wide bronze usual unfold
Key pair: {"publicKey":"ed25519:BW5Q957u1rTATGpanKUktjVmixEmT56Df4Dt9hoGWEXz","secretKey":"ed25519:5StmPDg9xVNzpyudwxT8Y72iyRq7Fa86hcpsRk6Cq5eWGWqwsPbPT9woXbJs9Qe69crZJHh4DMkrGEPGDDfmXmy2"}
Implicit account: 9c07afc7673ea0f9a20c8a279e8bbe1dd1e283254263bb3b07403e4b6fd7a411
```

</p>
</details>

---

#### 1b) `near generate-key --saveImplicit`

> Creates and displays a key pair, saving it locally in `.near-credentials` as an implicit account.

```bash
near generate-key --saveImplicit
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```bash
Seed phrase: antique attitude say evolve ring arrive hollow auto wide bronze usual unfold
Key pair: {"publicKey":"ed25519:BW5Q957u1rTATGpanKUktjVmixEmT56Df4Dt9hoGWEXz","secretKey":"ed25519:5StmPDg9xVNzpyudwxT8Y72iyRq7Fa86hcpsRk6Cq5eWGWqwsPbPT9woXbJs9Qe69crZJHh4DMkrGEPGDDfmXmy2"}
Implicit account: 9c07afc7673ea0f9a20c8a279e8bbe1dd1e283254263bb3b07403e4b6fd7a411

Storing credentials for account: 9d6e4506ac06ab66a25f6720e400ae26bad40ecbe07d49935e83c7bdba5034fa (network: testnet)
Saving key to '~/.near-credentials/testnet/9d6e4506ac06ab66a25f6720e400ae26bad40ecbe07d49935e83c7bdba5034fa.json'
```

</p>
</details>

---

#### 2) `near generate-key accountId`

> Tạo một cặp local key trong `.near-credentials` với một `accountId` mà bạn chỉ định.

**Note:** This does NOT create an account with this name.

```bash
near generate-key example.testnet
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```bash
Seed phrase: antique attitude say evolve ring arrive hollow auto wide bronze usual unfold
Key pair: {"publicKey":"ed25519:BW5Q957u1rTATGpanKUktjVmixEmT56Df4Dt9hoGWEXz","secretKey":"ed25519:5StmPDg9xVNzpyudwxT8Y72iyRq7Fa86hcpsRk6Cq5eWGWqwsPbPT9woXbJs9Qe69crZJHh4DMkrGEPGDDfmXmy2"}
Implicit account: 9c07afc7673ea0f9a20c8a279e8bbe1dd1e283254263bb3b07403e4b6fd7a411

Storing credentials for account: example.testnet (network: testnet)
Saving key to '~/.near-credentials/testnet/example.testnet.json'
```

</p>
</details>

---

#### 3a) `near generate-key --fromSeedPhrase="your seed phrase"`

> Uses a seed phrase to display a public key and [implicit account](../1.concepts/basics/accounts/account-id.md#implicit-accounts-implicit-accounts)

```bash
near generate-key --seedPhrase="antique attitude say evolve ring arrive hollow auto wide bronze usual unfold"
```

<details>
<summary><strong>Example Response</strong></summary>

```
Seed phrase: antique attitude say evolve ring arrive hollow auto wide bronze usual unfold
Key pair: {"publicKey":"ed25519:BW5Q957u1rTATGpanKUktjVmixEmT56Df4Dt9hoGWEXz","secretKey":"ed25519:5StmPDg9xVNzpyudwxT8Y72iyRq7Fa86hcpsRk6Cq5eWGWqwsPbPT9woXbJs9Qe69crZJHh4DMkrGEPGDDfmXmy2"}
Implicit account: 9c07afc7673ea0f9a20c8a279e8bbe1dd1e283254263bb3b07403e4b6fd7a411
```

</details>

---

#### 3b) `near generate-key accountId --seedPhrase="your seed phrase"`

Will store the key pair corresponding to the seedPhrase in `.near-credentials` with an `accountId` that you specify.

---

### `near list-keys`

> lưu trữ toàn bộ access key trên local của account bạn đã tạo với [NEAR Wallet](https://wallet.testnet.near.org/).

-   các tham số: `senderId` `receiverId` `amount`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near list-keys client.chainlink.testnet
```

<details>
<summary> <strong>Example Response</strong> </summary>
<p>

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

</p>
</details>

---

### `near login`

> locally stores a full access key of an account you created with [MyNEARWallet](https://testnet.mynearwallet.com/).

-   các tham số: `none`
-   options: `--networkId`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near login
```

**Custom wallet url:**

Default wallet url is `https://testnet.mynearwallet.com/`. But if you want to change to a different wallet url, you can setup the environmental variable `NEAR_MAINNET_WALLET` or `NEAR_TESTNET_WALLET`.

```bash
export NEAR_TESTNET_WALLET=https://wallet.testnet.near.org/
near login
```

---

## Accounts

### `near create-account`

> Creates an account using an existing account or a faucet service to pay for the account's creation and initial balance.

-   arguments: `accountId`
-   options: `--initialBalance`, `--useFaucet`, `--useAccount`

**Examples:**:

```bash
# Creating account using `example-acct.testnet` to fund it
near create-account new-acc.testnet --useAccount example-acct.testnet
```

```bash
# Creating account using the faucet to fund it
near create-account new-acc.testnet --useFaucet
```

**Ví dụ subaccount:**

```bash
near create-account sub-acct.example-acct.testnet --useAccount example-acct.testnet
```

**Ví dụ sử dụng `--initialBalance`:**

```bash
near create-account sub-acct2.example-acct.testnet --useAccount example-acct.testnet --initialBalance 10
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

    Saving key to '/HOME_DIR/.near-credentials/default/sub-acct2.example-acct.testnet.json'
    Account sub-acct2.example-acct.testnet for network "default" was created.

</p>
</details>

---

### `near delete-account`

> Chuyển NEAR token (Ⓝ) từ một account này tới một account khác.

-   các tham số: `accountId` `.wasmFile`
-   options: `force`

**Ví dụ:**

```bash
near delete-account sub-acct2.example-acct.testnet example-acct.testnet
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

    Deleting account. Account id: sub-acct2.example-acct.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, beneficiary: example-acct.testnet
    Transaction Id 4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    Account sub-acct2.example-acct.testnet for network "default" was deleted.

</p>
</details>

---


### `near send-near`

> Hiển thị chi tiết về state của account.

-   các tham số: `accountId` `beneficiaryId`

**Lưu ý:** Bạn sẽ cần một full access key cho sending account. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

**Ví dụ:**

```bash
near send-near sender.testnet receiver.testnet 10
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

    Sending 10 NEAR to receiver.testnet from sender.testnet
    Transaction Id BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN

</p>
</details>

---

### `near state`

> Hiển thị chi tiết về state của account.

-   arguments: `accountId`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near state example.testnet
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

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

</p>
</details>

---

## Contracts

### `near call`

> makes a contract call which can modify _or_ view state.

**Note:** các contract call yêu cầu một transaction fee (gas) vì vậy bạn sẽ cần một access key cho `--accountId` sẽ bị tính phí. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

-   các tham số: `contractName` `method_name` `{ args }` `--accountId`
-   options: `--gas` `--deposit`

**Ví dụ:**

```bash
near call guest-book.testnet addMessage '{"text": "Aloha"}' --account-id example-acct.testnet
```

<details>
<summary><strong>Example Response</strong></summary>

```bash
Scheduling a call: guest-book.testnet.addMessage({"text": "Aloha"})
Transaction Id FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
''
```

</details>

---

### `near deploy`

> Xóa một account và chuyển số dư còn lại vào account thụ hưởng.

-   các tham số: `.wasmFile`
-   các tuỳ chọn: `default`

**Note:** Bạn sẽ cần có một full access key cho account mà bạn đang deploy contract. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

**Ví dụ:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm
```

**Example về việc khởi tạo:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm --initFunction new --initArgs '{"owner_id": "example-contract.testnet", "total_supply": "10000000"}'
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

    Starting deployment. Account id: example-contract.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: main.wasm
    Transaction Id G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    Done deploying to example-contract.testnet

</p>
</details>

---

### `near storage`

> Shows the storage state of a given contract, i.e. the data stored in a contract.

- arguments: `contractName`
- options: `--finality`, `--utf8`, `--blockId`, `--prefix`

**Ví dụ:**

```bash
near storage hello.near-examples.testnet --finality optimistic --utf8
```

<details>
<summary><strong>Example Response</strong></summary>

```bash
[ { key: 'STATE', value: '\x10\x00\x00\x00Passei por aqui!' } ]
```

</details>


---

### `near view`

> Tạo một contract call mà **chỉ** có thể view state. _(miễn phí)_

-   các tham số: `accountId` [`finality`](/docs/api/rpc#using-finality-param) _OR_ [`block-id`](/docs/api/rpc#using-block_id-param)
-   các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near view guest-book.testnet getMessages '{}'
```

<details>
<summary><strong>Example Response</strong></summary>

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

</details>

---

## Tổng quan

### `near tx-status`

> Queries transaction status by hash and accountId.

-   arguments: `txHash` `--accountId`
-   các tuỳ chọn: `default`

**Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:**

```bash
near tx-status FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK --accountId guest-book.testnet
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```json
Transaction guest-book.testnet:FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'example-acct.testnet',
    public_key: 'ed25519:AXZZKnp6ZcWXyRNdy8FztYrniKf1qt6YZw6mCCReXrDB',
    nonce: 20,
    receiver_id: 'guest-book.testnet',
    actions: [
      {
        FunctionCall: {
          method_name: 'addMessage',
          args: 'eyJ0ZXh0IjoiQWxvaGEifQ==',
          gas: 300000000000000,
          deposit: '0'
        }
      },
      [length]: 1
    ],
    signature: 'ed25519:5S6nZXPU72nzgAsTQLmAFfdVSykdKHWhtPMb5U7duacfPdUjrj8ipJxuRiWkZ4yDodvDNt92wcHLJxGLsyNEsZNB',
    hash: 'FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK'
  },
  transaction_outcome: {
    proof: [ [length]: 0 ],
    block_hash: '6nsjvzt6C52SSuJ8UvfaXTsdrUwcx8JtHfnUj8XjdKy1',
    id: 'FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK',
    outcome: {
      logs: [ [length]: 0 ],
      receipt_ids: [ '7n6wjMgpoBTp22ScLHxeMLzcCvN8Vf5FUuC9PMmCX6yU', [length]: 1 ],
      gas_burnt: 2427979134284,
      tokens_burnt: '242797913428400000000',
      executor_id: 'example-acct.testnet',
      status: {
        SuccessReceiptId: '7n6wjMgpoBTp22ScLHxeMLzcCvN8Vf5FUuC9PMmCX6yU'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [ [length]: 0 ],
      block_hash: 'At6QMrBuFQYgEPAh6fuRBmrTAe9hXTY1NzAB5VxTH1J2',
      id: '7n6wjMgpoBTp22ScLHxeMLzcCvN8Vf5FUuC9PMmCX6yU',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ 'FUttfoM2odAhKNQrJ8F4tiBpQJPYu66NzFbxRKii294e', [length]: 1 ],
        gas_burnt: 3559403233496,
        tokens_burnt: '355940323349600000000',
        executor_id: 'guest-book.testnet',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [ [length]: 0 ],
      block_hash: 'J7KjpMPzAqE7iX82FAQT3qERDs6UR1EAqBLPJXBzoLCk',
      id: 'FUttfoM2odAhKNQrJ8F4tiBpQJPYu66NzFbxRKii294e',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'example-acct.testnet',
        status: { SuccessValue: '' }
      }
    },
    [length]: 2
  ]
}
```

</p>
</details>

---

## Global Options

| Tuỳ chọn        | Mô tả                                                     |
| --------------- | --------------------------------------------------------- |
| `--help`        | Show help  [boolean]                                      |
| `--version`     | Show version number  [boolean]                            |
| `-v, --verbose` | Prints out verbose output  \[boolean\] \[default: false\] |