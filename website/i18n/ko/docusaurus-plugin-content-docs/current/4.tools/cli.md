---
id: near-cli
title: NEAR CLI
---

NEAR [명령줄(Command Line) 인터페이스](https://github.com/near/near-cli) (CLI)는 쉘에서 직접 NEAR 네트워크와 상호 작용할 수 있는 도구입니다. 무엇보다도, NEAR CLI를 사용하면 다음을 수행할 수 있습니다.

- NEAR 계정으로 로그인
- 컨트랙트 배포
- 배포된 컨트랙트에서 상호 작용 및 정보 쿼리

:::tip 내부적으로 NEAR CLI는 [`NEAR JavaScript API`](https://github.com/near/near-api-js)를 활용합니다. :::
:::
---

:::info

The NEAR CLI also comes with an implementation in Rust called [`near-cli-rs`](https://github.com/near/near-cli-rs). If you want to use `near-cli` while you have `near-cli-rs` installed, prefix the following commands with `npx`. :::

## Overview

_자세한 정보와 예를 보려면 명령을 클릭하세요._

| 명령                                              | 설명                                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **ACCESS KEYS**                                 |                                                                                           |
| [`near add-credentials`](#near-add-credentials) | Stores credentials for an account locally                                                 |
| [`near add-key`](#near-add-key)                 | 계정에 새 액세스 키 추가                                                                            |
| [`near delete-key`](#near-delete-key)           | 계정에서 액세스 키 삭제                                                                             |
| [`near generate-key`](#near-generate-key)       | generates a key pair and **optionally** stores it locally as credentials for an accountId |
| [`near list-keys`](#near-keys)                  | 지정된 계정에 대한 모든 액세스 키 및 세부 정보 표시                                                            |
| [`near login`](#near-login)                     | stores a full access key locally using [NEAR Wallet](https://wallet.testnet.near.org/)    |
| **ACCOUNTS**                                    |                                                                                           |
| [`near create-account`](#near-create-account)   | creates a new account, either using a faucet to fund it, or an account saved locally      |
| [`near delete-account`](#near-delete)           | 계정을 삭제하고 남은 잔액을 수령자 계정으로 이체                                                               |
| [`near list-keys`](#near-keys)                  | 주어진 계정에 대한 모든 액세스 키 표시                                                                    |
| [`near send-near`](#near-send)                  | 한 계정에서 다른 계정으로 토큰 전송                                                                      |
| [`near state`](#near-state)                     | 계정 내 세부 정보 확인                                                                             |
| **CONTRACTS**                                   |                                                                                           |
| [`near call`](#near-call)                       | `change` _또는_ `view` 메서드를 호출할 수 있는 컨트랙트 호출 생성                                             |
| [`near deploy`](#near-deploy)                   | NEAR 블록체인에 스마트 컨트랙트 배포                                                                    |
| [`near storage`](#near-storage)                 | Shows the storage state of a given contract, i.e. the data stored in a contract           |
| [`near view`](#near-view)                       | `view` 메서드**만** 호출할 수 있는 컨트랙트 호출 생성                                                       |
| **TRANSACTIONS**                                |                                                                                           |
| [`near tx-status`](#near-tx-status)             | `txHash`를 통해 트랜잭션 상태 조회                                                                   |


---

## 설정

### 설치

> `npm`과 `NodeJS`의 최신 버전이 설치되었는지 확인하세요.

#### Mac / Linux

1. OS X가 USB 장치와 관련된 노드 패키지를 처리하는 방식으로 인해 때때로 Ledger를 사용하는 데 문제가 있으므로, `nvm`과 같은 패키지 관리자를 사용하여 `npm` 및 `node`를 설치합니다. [여기를 클릭하세요](https://nodejs.org/en/download/package-manager/).
2. Node 버전 12 이상을 설치했는지 확인하세요.
3. 다음을 실행하여 `near-cli`를 전역적으로 설치합니다.

```bash
npm install -g near-cli
```

For example, on Ubuntu 20.04 `near-cli` can be installed by running:
```bash
# Install nvm (https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

# Install node
nvm install node

# Install near-cli
npm install -g near-cli

# near-cli works!
near --help
```

#### Windows

> Windows 사용자의 경우, Linux용 Windows 하위 시스템(`WSL`)을 사용하는 것이 좋습니다.

1. `WSL` 설치 [[여기를 클릭하세요]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. `npm` 설치 [[여기를 클릭하세요]](https://www.npmjs.com/get-npm)
3. `Node.js` 설치 [[여기를 클릭하세요]](https://nodejs.org/en/download/package-manager/)
4. `npm` 기본 디렉토리 변경 [[여기를 클릭하세요]](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
    - 이는 `WSL` 권한 문제를 피하기 위한 것입니다.
5. 다음을 실행하여 `WSL`을 열고 `near-cli`를 전역적으로 설치

```bash
npm install -g near-cli
```

---

### 네트워크 선택

> `near-cli`의 기본 네트워크는 `testnet`입니다.

- 명령 앞에 환경 변수를 추가하여 네트워크를 변경할 수 있습니다.

```bash
NEAR_NETWORK=testnet near send ...
```

- 또는, 다음을 실행하여 전역 환경 변수를 설정할 수 있습니다.

```bash
export NEAR_NETWORK=mainnet
```

- All commands that interact with the network also allow to pass the `--networkId` option.

```bash
near send-near ... --networkId mainnet
```

---

### Custom RPC server selection
You can set custom RPC server URL by setting these env variables:

```bash
NEAR_MAINNET_RPC
NEAR_TESTNET_RPC
```

Clear them in case you want to get back to the default RPC server.

예시:

```bash
export NEAR_TESTNET_RPC=<put_your_rpc_server_url_here>
```
---

## 액세스 키

All keys are stored locally at the root of your `HOME` directory:
  -   `~/.near-credentials` _(MAC / Linux)_
  -   `C:\Users\YOUR_ACCOUNT\.near-credentials` _(Windows)_

Inside `.near-credentials`, access keys are organized in network subdirectories: `testnet`, and `mainnet`.

이러한 네트워크 하위 디렉토리에는 다음과 같은 `.JSON` 객체들이 있습니다.
  -   `account_id`
  -   `private_key`
  -   `public_key`

### `near add-credentials <accountId>`
> Stores credentials (full-access-key) locally for an already existing account.

-   인수: `accountId`
-   options: `--seedPhrase` or `--secretKey`

**Examples:**

```bash
near add-credentials example-acct.testnet --seedPhrase "antique attitude say evolve ring arrive hollow auto wide bronze usual unfold"
```

---

### `near add-key`

> Adds either a **full access** or **function access** key to a given account.

> Optionally allows to sign with a Ledger: `--signWithLedger` `--ledgerPath`

**참고:** 보내는 계정에 대한 전체 액세스 키가 필요합니다. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

#### 1) `전체 액세스` 키 추가

- 인자: `accountId` `publicKey`

**예시:**

```bash
near add-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary><strong>응답 예시</strong></summary>
<p>

```
    Adding full access key = Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S to example-acct.testnet.
    Transaction Id EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg
```

</p>
</details>

#### 2) add a `function call` key

-   인자: `accountId` `publicKey` `--contract-id`
-   옵션: `--method-names` `--allowance`

> `accountId`는 키를 추가할 계정입니다.
> 
> `--contract-id`는 메서드 호출을 허용하는 컨트랙트입니다.
> 
> `--method-names`는 선택 사항이며, 생략하면 `--contract-id`의 모든 메서드를 호출할 수 있습니다.
> 
> `--allowance` is the amount of Ⓝ the key is allowed to spend on gas fees _only_ (default: 0).

**참고:** 이 키에 의해 이루어진 각 트랜잭션에는 초기 허용량에서 가스 요금이 공제되며, 모두 소진되면 새 키를 발급해야 합니다.

**예시:**

```bash
near add-key example-acct.testnet GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi --contract-id example-contract.testnet --method-names example_method --allowance 30000000000
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
    Adding function call access key = GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi to example-acct.testnet.
    Transaction Id H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r
```

</p>
</details>

---

### `near delete-key`

> 지정된 계정의 기존 키를 삭제합니다. Optionally allows to sign with a Ledger: `--signWithLedger` `--ledgerPath`

-   인자: `accountId` `publicKey`
-   options: `--networkId`, `force`

**참고:** 키를 삭제하려는 계정에 대해 별도의 전체 액세스 키가 필요합니다. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

**예시:**

```bash
near delete-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
    Transaction Id 4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT
```

</p>
</details>

---
### `near generate-key`

> Displays a key-pair and seed-phrase and optionally stores it locally in `.near-credentials`.

-   인자: `accountId` 또는 `none`
-   options: `--fromSeedPhrase`, `--saveImplicit`, `--queryLedgerPK`

**참고:** `generate-key`에 대한 여러 가지 사용 방법이 있고, 매우 이는 서로 다른 결과를 반환합니다. 자세한 내용은 아래 예를 참조하세요.

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

> 특정 `accountId`로 `.near-credentials` 내 로컬에서 키 쌍을 생성합니다.

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

> Uses a seed phrase to display a public key and [implicit account](../1.concepts/protocol/account-id.md#implicit-accounts-implicit-accounts)

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

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
Seed phrase: antique attitude say evolve ring arrive hollow auto wide bronze usual unfold
Key pair: {"publicKey":"ed25519:BW5Q957u1rTATGpanKUktjVmixEmT56Df4Dt9hoGWEXz","secretKey":"ed25519:5StmPDg9xVNzpyudwxT8Y72iyRq7Fa86hcpsRk6Cq5eWGWqwsPbPT9woXbJs9Qe69crZJHh4DMkrGEPGDDfmXmy2"}
Implicit account: 9c07afc7673ea0f9a20c8a279e8bbe1dd1e283254263bb3b07403e4b6fd7a411
```

</p>
</details>

---

#### 4a) `near generate-key --queryLedgerPK`

> Uses a connected Ledger device to display a public key and [implicit account](http://docs.near.org/integrator/implicit-accounts) using the default HD path (`"44'/397'/0'/0'/1'"`)

```bash
near generate-key --queryLedgerPK
```

You should then see the following prompt to confirm this request on your Ledger device:

```
  Make sure to connect your Ledger and open NEAR app
  Getting Public Key from Ledger...
```

After confirming the request on your Ledger device, a public key and implicit accountId will be displayed.

<details>
<summary><strong>Example Response</strong></summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wyeRvKIWv61NjmQZEkWTMzAYgdfx6oSeB2
Implicit account: 42c320xc20739fd9a6bqf2f89z61rd14efe5d3de234199bc771235a4bb8b0e1
```

</p>
</details>

---

#### 3b) `near generate-key --queryLedgerPK --ledgerPath="HD path you specify"`

> Uses a connected Ledger device to display a public key and [implicit account](http://docs.near.org/integrator/implicit-accounts) using a custom HD path.

```bash
near generate-key --queryLedgerPK --ledgerPath="44'/397'/0'/0'/2'"
```

You should then see the following prompt to confirm this request on your Ledger device:

```
    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...
```

After confirming the request on your Ledger device, a public key and implicit accountId will be displayed.

<details>
<summary><strong>Example Response</strong></summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wye3dfa32rDjmQZEkWTMzAYgCX6oSeB2
Implicit account: 42c320xc20739ASD9a6bqf2Dsaf289z61rd14efe5d3de23213789009afDsd5bb8b0e1
```

</p>
</details>

---

### `near list-keys`

> 지정된 계정에 대한 모든 액세스 키를 표시합니다.

-   인자: `accountId`

**Example:**

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

-   인자: `none`
-   options: `--networkId`

**Example:**

```bash
near login
```

**Custom wallet url:**

The default wallet URL is `https://testnet.mynearwallet.com/`. However, if you want to change to a different wallet URL, you can set the environmental variable `NEAR_MAINNET_WALLET` or `NEAR_TESTNET_WALLET`.

```bash
export NEAR_TESTNET_WALLET=https://wallet.testnet.near.org/
near login
```

---

## 계정

### `near create-account`

> Creates an account using an existing account or a faucet service to pay for the account's creation and initial balance.

-   arguments: `accountId`
-   options: `--initialBalance`, `--useFaucet`, `--useAccount`, `--seedPhrase`, `--publicKey`, `--signWithLedger`, `--ledgerPath`, `--useLedgerPK`, `--PkLedgerPath`

**Examples:**:

```bash
# Creating account using `example-acct.testnet` to fund it
near create-account new-acc.testnet --useAccount example-acct.testnet
```

```bash
# Creating account using the faucet to fund it
near create-account new-acc.testnet --useFaucet
```

```bash
# Creating a pre-funded account that can be controlled by the Ledger's public key
near create-account new-acc.testnet --useFaucet --useLedgerPK 
```

```bash
# Creating an account using a Ledger account
near create-account new-acc.testnet --useAccount ledger-acct.testnet --signWithLedger
```

**Subaccount example:**

```bash
# Using an account to create a sub-account
near create-account sub-acct.example-acct.testnet --useAccount example-acct.testnet
```

```bash
# Creating a sub-account using the Ledger that can also be controlled by the ledger
near create-account sub.acc.testnet --useAccount sub.acc.testnet --signWithLedger --useLedgerPK
```

**Example using `--initialBalance`:**

```bash
near create-account sub-acct2.example-acct.testnet --useAccount example-acct.testnet --initialBalance 10
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
    Saving key to '/HOME_DIR/.near-credentials/default/sub-acct2.example-acct.testnet.json'
    Account sub-acct2.example-acct.testnet for network "default" was created.
```

</p>
</details>

---

### `near delete-account`

> 계정을 삭제하고 남은 잔액을 수령자 계정으로 이체합니다.

-   인자: `accountId` `beneficiaryId`
-   options: `force`, `--signWithLedger`, `--ledgerPath`

**예시:**

```bash
near delete-account sub-acct2.example-acct.testnet example-acct.testnet
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
    Deleting account. Account id: sub-acct2.example-acct.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, beneficiary: example-acct.testnet
    Transaction Id 4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    Account sub-acct2.example-acct.testnet for network "default" was deleted.
```

</p>
</details>

---


### `near send-near`

> 한 계정에서 다른 계정으로 NEAR 토큰(Ⓝ)을 보냅니다.

- 인자: `senderId` `receiverId` `amount`
- options: `--signWithLedger`, `--ledgerPath`

**참고:** 컨트랙트를 배포할 계정에 대한 전체 액세스 키가 필요합니다. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

**예시:**

```bash
near send-near sender.testnet receiver.testnet 10
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
    Sending 10 NEAR to receiver.testnet from sender.testnet
    Transaction Id BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN
```

</p>
</details>

---

### `near state`

> 계정 상태의 세부 정보를 표시합니다.

-   arguments: `accountId`

**예시:**

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

## 컨트랙트

### `near call`

> makes a contract call which can modify _or_ view state.

**참고: ** 컨트랙트 호출에는 트랜잭션 수수료(가스)가 필요하므로, 청구될 `--accountId`에 대한 액세스 키가 필요합니다. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

-   인자: `contractName` `method_name` `{ args }` `--accountId`
-   options: `--gas` `--deposit` `--signWithLedger` `--ledgerPath`

**예시:**

```bash
near call guest-book.testnet addMessage '{"text": "Aloha"}' --account-id example-acct.testnet
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```bash
    Scheduling a call: guest-book.testnet.addMessage({"text": "Aloha"})
    Transaction Id FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
    ''
```

</p>
</details>

---

### `near deploy`

> 지정된 accountId에 스마트 컨트랙트를 배포합니다.

-   인자: `accountId` `.wasmFile`
-   옵션: `initFunction` `initArgs` `initGas` `initDeposit`

**참고:** 컨트랙트 호출에는 트랜잭션 수수료(가스)가 필요하므로, 가스가 청구될 `--accountId`에 대한 액세스 키가 필요합니다. ([`near login`](http://docs.near.org/docs/tools/near-cli#near-login))

**예시:**

```bash
near deploy example-contract.testnet out/example.wasm
```

**초기화 예시:**

```bash
near deploy example-contract.testnet out/example.wasm --initFunction new --initArgs '{"owner_id": "example-contract.testnet", "total_supply": "10000000"}'
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

```
    Starting deployment. Account id: example-contract.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: main.wasm
    Transaction Id G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    Done deploying to example-contract.testnet
```

</p>
</details>

---

### `near storage`

> Shows the storage state of a given contract, i.e. the data stored in a contract.

- arguments: `contractName`
- options: `--finality`, `--utf8`, `--blockId`, `--prefix`

**예시:**

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

> 상태**만** 볼 수 있는 컨트랙트 호출을 만듭니다. _(호출 비용은 무료)_

-   인자: `contractName` `method_name` `{ args }`
-   옵션: `default`

**예시:**

```bash
near view guest-book.testnet getMessages '{}'
```

<details>
<summary><strong>Example Response</strong></summary>
<p>

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

</p>
</details>

---

## 트랜잭션

### `near tx-status`

> Queries transaction status by hash and accountId.

-   arguments: `txHash` `--accountId`
-   옵션: `default`

**예시:**

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

| 옵션              | 설명                                                        |
| --------------- | --------------------------------------------------------- |
| `--help`        | Show help  [boolean]                                      |
| `--version`     | Show version number  [boolean]                            |
| `-v, --verbose` | Prints out verbose output  \[boolean\] \[default: false\] |
