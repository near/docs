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

## 개요 {#overview}

_자세한 정보와 예를 보려면 명령을 클릭하세요._

**액세스 키**

| 명령                                        | 설명                                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`near login`](#near-login)               | stores a full access key locally using [NEAR Wallet](https://testnet.mynearwallet.com//)     |
| [`near keys`](#near-keys)                 | 지정된 계정에 대한 모든 액세스 키 및 세부 정보 표시                                                               |
| [`near generate-key`](#near-generate-key) | 로컬 키 쌍을 생성 **또는** 공개 키 및 [암시적 계정](/concepts/basics/accounts/account-id#implicit-accounts) 표시 |
| [`near add-key`](#near-add-key)           | 계정에 새 액세스 키 추가                                                                               |
| [`near delete-key`](#near-delete-key)     | 계정에서 액세스 키 삭제                                                                                |

**계정**

| 명령                                            | 설명                          |
| --------------------------------------------- | --------------------------- |
| [`near create-account`](#near-create-account) | 계정 생성                       |
| [`near state`](#near-state)                   | 계정 내 세부 정보 확인               |
| [`near keys`](#near-keys)                     | 주어진 계정에 대한 모든 액세스 키 표시      |
| [`near send`](#near-send)                     | 한 계정에서 다른 계정으로 토큰 전송        |
| [`near delete`](#near-delete)                 | 계정을 삭제하고 남은 잔액을 수령자 계정으로 이체 |

**컨트랙트**

| 명령                                    | 설명                                            |
| ------------------------------------- | --------------------------------------------- |
| [`near deploy`](#near-deploy)         | NEAR 블록체인에 스마트 컨트랙트 배포                        |
| [`near dev-deploy`](#near-dev-deploy) | 개발 계정을 생성하고 여기에 컨트랙트 배포 _(`testnet` 전용)_      |
| [`near call`](#near-call)             | `change` _또는_ `view` 메서드를 호출할 수 있는 컨트랙트 호출 생성 |
| [`near view`](#near-view)             | `view` 메서드**만** 호출할 수 있는 컨트랙트 호출 생성           |
| [`near view-state`](#near-view-state) | utf-8 또는 borsh 직렬화로 컨트랙트 상태(키/값 쌍) 반환.        |

**트랜잭션**

| 명령                                  | 설명                      |
| ----------------------------------- | ----------------------- |
| [`near tx-status`](#near-tx-status) | `txHash`를 통해 트랜잭션 상태 조회 |

**밸리데이터**

| 명령                                                    | 설명                                                         |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| [`near validators current`](#near-validators-current) | 현재 [에포크](../1.concepts/basics/epoch.md) 내 밸리데이터 풀 세부 정보 표시 |
| [`near validators next`](#near-validators-next)       | 다음 [에포크](../1.concepts/basics/epoch.md)에 대한 밸리데이터 세부 정보 표시 |
| [`near proposals`](#near-proposals)                   | _2_ [에포크](../1.concepts/basics/epoch.md) 뒤에 대한 밸리데이터 제안 표시 |

**REPL**

| 명령                        | 설명                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| [`near repl`](#near-repl) | NEAR 블록체인에 대한 대화형 연결 시작([REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) |

> EVM 지원에 대해서는 [프로젝트 Aurora](https://aurora.dev)의[`aurora-cli`](https://github.com/aurora-is-near/aurora-cli)를 확인하세요.

---

## 설정 {#setup}

### 설치 {#installation}

> `npm`과 `NodeJS`의 최신 버전이 설치되었는지 확인하세요.

#### Mac / Linux {#mac-and-linux}

1. OS X가 USB 장치와 관련된 노드 패키지를 처리하는 방식으로 인해 때때로 Ledger를 사용하는 데 문제가 있으므로, `nvm`과 같은 패키지 관리자를 사용하여 `npm` 및 `node`를 설치합니다. [여기를 클릭하세요](https://nodejs.org/en/download/package-manager/).
2. Node 버전 12 이상을 설치했는지 확인하세요.
3. 다음을 실행하여 `near-cli`를 전역적으로 설치합니다.

```bash
npm install -g near-cli
```

#### Windows {#windows}

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

<blockquote class="info">
<strong>주의</strong><br /><br />

`WSL`를 사용하면 복사/붙여넣기가 약간 이상할 수 있습니다.

- "빠른 편집 모드"를 사용하면 마우스 오른쪽 버튼으로 붙여넣기를 할 수 있습니다.
- 버전에 따라 `Ctrl` + `V` 붙여넣기를 허용하는 또 다른 확인란이 있을 수 있습니다.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)

</blockquote>

---

### `near-cli` 업데이트 {#update-near-cli}

> `near-cli` 업데이트가 있는 경우, 아무 명령을 실행했을 때 터미널에 알림이 표시됩니다. _(아래 예시 참조)_

![NEAR CLI detects a new version](/docs/assets/update_near-cli.png)

- 다음을 실행하여 지침에 따라 업데이트하세요.

```bash
npm install -g near-cli
```

- 다음을 실행하여 항상 현재 버전을 확인할 수 있습니다.

```bash
near --version  # version info appears on the last line of output
```

- 또한 `npm outdated`를 사용하여 사용 가능한 최신 버전을 볼 수 있습니다.

```bash
npm outdated -g  # note the difference between Current and Latest
```

**문제 해결:**

> NEAR CLI를 업그레이드하는 데 문제가 있는 경우, 문제를 해결하는 가장 빠른 방법은 제거한 다음 다시 설치하는 것입니다.

```bash
npm uninstall -g near-cli
```

```bash
npm install -g near-cli
```

---

### 네트워크 선택 {#network-selection}

> `near-cli`의 기본 네트워크는 `testnet`입니다.

- 명령 앞에 환경 변수를 추가하여 네트워크를 변경할 수 있습니다.

```bash
NEAR_ENV=betanet near send ...
```

- 또는, 다음을 실행하여 전역 환경 변수를 설정할 수 있습니다.

```bash
export NEAR_ENV=mainnet
```

---

## 액세스 키 {#access-keys}

### `near login` {#near-login}

> locally stores a full access key of an account you created with [NEAR Wallet](https://testnet.mynearwallet.com//).

- 인자: `none`
- 옵션: `default`

**예시:**

```bash
near login
```

- You will be redirected to [NEAR Wallet](https://testnet.mynearwallet.com//) requesting full access to your account.
- 여기에서 액세스 키를 받을 계정을 선택합니다.

![near wallet login](/docs/assets/near-login.png)

- `allow`를 클릭하면, 계정 이름을 입력하여 이 승인을 확인하라는 메시지가 표시됩니다.

![near wallet confirm](/docs/assets/near-login-confirm.png)

#### 액세스 키 위치: {#access-key-location}

- 완료되면 액세스 키가 `.near-credentials`라는 숨겨진 디렉터리에 로컬로 저장됩니다.

  - 이 디렉터리는 `HOME` 디렉터리의 루트에 있습니다
    - `~/.near-credentials` _(MAC / Linux)_
    - `C:\Users\YOUR_ACCOUNT\.near-credentials` _(Windows)_

- `.near-credentials` 내에서, 액세스 키는 네트워크 하위 디렉토리에 구성됩니다.
  - _`testnet`은_ `default`
  - `betanet`
  - `mainnet`
- 이러한 네트워크 하위 디렉토리에는 다음과 같은 `.JSON` 객체들이 있습니다.
  - `account_id`
  - `private_key`
  - `public_key`

**예시:**

```json
{
  "account_id": "example-acct.testnet",
  "public_key": "ed25519:7ns2AZVaG8XZrFrgRw7g8qhgddNTN64Zkz7Eo8JBnV5g",
  "private_key": "ed25519:4Ijd3vNUmdWJ4L922BxcsGN1aDrdpvUHEgqLQAUSLmL7S2qE9tYR9fqL6DqabGGDxCSHkKwdaAGNcHJ2Sfd"
}
```

---

### `near keys` {#near-keys}

> 지정된 계정에 대한 모든 액세스 키를 표시합니다.

- 인수: `accountId`
- 옵션: `default`

**예시:**

```bash
near keys client.chainlink.testnet
```

**응답 예시:**

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

> `.near-credentials` 내에서 로컬로 키 쌍을 생성하거나, **또는** 렛저 및 시드 문구에서 공개 키를 표시합니다.

- 인자: `accountId` 또는 `none`
- 옵션: `--useLedgerKey`, `--seedPhrase`, 또는 `--seedPath`

**참고:** `generate-key`에 대한 여러 가지 사용 방법이 있고, 매우 이는 서로 다른 결과를 반환합니다. 자세한 내용은 아래 예를 참조하세요.

---

#### 1) `near generate-key` {#1-near-generate-key}

> ([`near login`](#near-login)) **참고:** _새_ 키를 추가하려는 계정에 대해, _기존_ 전체 액세스 키를 사용합니다.

```bash
near generate-key
```

<details>
<summary>응답 예시:</summary>
<p>

```bash
Key pair with ed25519:33Vn9VtNEtWQPPd1f4jf5HzJ5weLcvGHU8oz7o5UnPqy public key for an account "1e5b1346bdb4fc5ccd465f6757a9082a84bcacfd396e7d80b0c726252fe8b3e8"
```

</p>
</details>

---

#### 2) `near generate-key accountId` {#2-near-generate-key-accountid}

> 특정 `accountId`로 `.near-credentials` 내 로컬에서 키 쌍을 생성합니다.

**참고:**  이렇게 하면 이 이름으로 계정이 생성되지 않으며, 동일한 이름으로 기존 `.json` 파일을 덮어씁니다.

```bash
near generate-key example.testnet
```

<details>
<summary>응답 예시:</summary>
<p>

```bash
Key pair with ed25519:CcH3oMEFg8tpJLekyvF7Wp49G81K3QLhGbaWEFwtCjht public key for an account "example.testnet"
```

</p>
</details>

---

#### 3a) `near generate-key --useLedgerKey` {#3a-near-generate-key---useledgerkey}

> 연결된 Ledger 장치를 통해, 기본 HD 경로(`"44'/397'/0'/0'/1'"`) 를 사용하는 공개 키 및 [암시적 계정](/concepts/basics/accounts/account-id#implicit-accounts)을 표시합니다.

```bash
near generate-key --useLedgerKey
```

그러면 Ledger 장치에서 이 요청을 확인하라는 다음 프롬프트가 표시됩니다.

    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...

Ledger 장치에서 요청을 확인하면, 공개 키와 암시적 accountId가 표시됩니다.

<details>
<summary>응답 예시:</summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wyeRvKIWv61NjmQZEkWTMzAYgdfx6oSeB2
Implicit account: 42c320xc20739fd9a6bqf2f89z61rd14efe5d3de234199bc771235a4bb8b0e1
```

</p>
</details>

---

#### 3b) `near generate-key --useLedgerKey="HD path you specify"` {#3b-near-generate-key---useledgerkeyhd-path-you-specify}

> 연결된 Ledger 장치를 통해 사용자 지정 HD 경로를 사용하는 공개 키 및 [암시적 계정](/concepts/basics/accounts/account-id#implicit-accounts)을 표시합니다.

```bash
near generate-key --useLedgerKey="44'/397'/0'/0'/2'"
```

그러면 Ledger 장치에서 이 요청을 확인하라는 다음 프롬프트가 표시됩니다.

    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...

Ledger 장치에서 요청을 확인하면, 공개 키와 암시적 accountId가 표시됩니다.

<details>
<summary>응답 예시:</summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wye3dfa32rDjmQZEkWTMzAYgCX6oSeB2
Implicit account: 42c320xc20739ASD9a6bqf2Dsaf289z61rd14efe5d3de23213789009afDsd5bb8b0e1
```

</p>
</details>

---

#### 4a) `near generate-key --seedPhrase="your seed phrase"` {#4a-near-generate-key---seedphraseyour-seed-phrase}

> 시드 문구를 사용하여 공개 키 및 [암시적 계정](/concepts/basics/accounts/account-id#implicit-accounts)을 표시합니다.

```bash
near generate-key --seedPhrase="cow moon right send now cool dense quark pretty see light after"
```

<details>
<summary>응답 예시:</summary>
<p>

    Key pair with ed25519:GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi public key for an account "e9fa50ac20522987a87e566fcd6febdc97bd35c8c489999ca8aff465c56969c3"

</p>
</details>

---

#### 4b) `near generate-key accountId --seedPhrase="your seed phrase"` {#4b-near-generate-key-accountid---seedphraseyour-seed-phrase}

> 시드 구문을 사용하여 [암시적 계정](/concepts/basics/accounts/account-id#implicit-accounts) **없이** 공개 키를 표시합니다.

```bash
near generate-key example.testnet --seedPhrase="cow moon right send now cool dense quark pretty see light after"
```

<details>
<summary>응답 예시:</summary>
<p>

    Key pair with ed25519:GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi public key for an account "example.testnet"

</p>
</details>

---

### `near add-key` {#near-add-key}

> 지정된 계정에 **전체 액세스** 또는 **함수 액세스** 키를 추가합니다.

**참고:** 보내는 계정에 대한 전체 액세스 키가 필요합니다. ([`near login`](#near-login))

#### 1) `전체 액세스` 키 추가 {#1-add-a-full-access-key}

- 인자: `accountId` `publicKey`

**예시:**

```bash
near add-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary>응답 예시:</summary>
<p>

    Adding full access key = Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S to example-acct.testnet.
    Transaction Id EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg

</p>
</details>

#### 2) `함수 액세스` 키 추가 {#2-add-a-function-access-key}

- 인자: `accountId` `publicKey` `--contract-id`
- 옵션: `--method-names` `--allowance`

> `accountId`는 키를 추가할 계정입니다.
> 
> `--contract-id`는 메서드 호출을 허용하는 컨트랙트입니다.
> 
> `--method-names`는 선택 사항이며, 생략하면 `--contract-id`의 모든 메서드를 호출할 수 있습니다.
> 
> `--allowance` 는 키가 가스 요금에만 사용할 수 있는 Ⓝ의 금액입니다. 생략하면 키는 View 메서드만 호출할 수 있습니다.

**참고:** 이 키에 의해 이루어진 각 트랜잭션에는 초기 허용량에서 가스 요금이 공제되며, 모두 소진되면 새 키를 발급해야 합니다.

**예시:**

```bash
near add-key example-acct.testnet GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi --contract-id example-contract.testnet --method-names example_method --allowance 30000000000
```

<details>
<summary>응답 예시:</summary>
<p>

    Adding function call access key = GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi to example-acct.testnet.
    Transaction Id H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r

</p>
</details>

---

### `near delete-key` {#near-delete-key}

> 지정된 계정의 기존 키를 삭제합니다.

- 인자: `accountId` `publicKey`
- 옵션: `default`

**참고:** 키를 삭제하려는 계정에 대해 별도의 전체 액세스 키가 필요합니다. ([`near login`](#near-login))

**예시:**

```bash
near delete-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

**응답 예시:**

    Transaction Id 4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT

---

## 계정 {#accounts}

### `near create-account` {#near-create-account}

> 계정 생성 및 초기 잔액을 지불하는 `--masterAccount`를 사용하여 계정을 생성합니다.

- 인자: `accountId` `--masterAccount`
- 옵션: `--initialBalance` `--publicKey` `--newLedgerKey`

<blockquote class="warning">
<strong>조심하세요</strong><br /><br />

이 명령은`--masterAccount`의 [하위 계정(subaccount)](/concepts/basics/accounts/model#subaccounts) 생성만 허용합니다. 그러나, 계정 ID의 길이가 31자보다 길면 [최상위 계정](/concepts/basics/accounts/model#top-level-accounts)을 만들 수 있습니다. 이는 [암시적 계정](/concepts/basics/accounts/model#implicit-accounts) 생성에 가장 일반적으로 사용됩니다.

최상위 `.testnet` 또는 `.near` 계정을 만들고자 한다면, `near-api-js` [ [**여기**](/tools/near-api-js/cookbook#create-account) ]를 사용하여 만들 수 있습니다.

</blockquote>

**Implicit account example:**
```bash
near create-account 7e094afcfc4eda8a970f6648cdf0dbd6de --masterAccount example-acct.testnet
```

**Top level account example:**
```bash
near create-account hiiamalongnamedaccountinnearblockchain --masterAccount example-acct.testnet
```

**하위 계정 예시:**

```bash
near create-account sub-acct.example-acct.testnet --masterAccount example-acct.testnet
```

**`--initialBalance` 사용 예시:**

```bash
near create-account sub-acct2.example-acct.testnet --masterAccount example-acct.testnet --initialBalance 10
```

**.testnet example:** To create a `.testnet` (or `.mainnet`) account, you must call the testnet contract to create the account. Here is an example:
```bash
near call testnet create_account '{"new_account_id": "<account-name>.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId <account-with-funds>
```

<details>
<summary>응답 예시:</summary>
<p>

    Saving key to '/HOME_DIR/.near-credentials/default/sub-acct2.example-acct.testnet.json'
    Account sub-acct2.example-acct.testnet for network "default" was created.

</p>
</details>

---

### `near state` {#near-state}

> 계정 상태의 세부 정보를 표시합니다.

- 인자: `accountId`
- 옵션: `default`

**예시:**

```bash
near state example.testnet
```

**응답 예시:**

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

> 한 계정에서 다른 계정으로 NEAR 토큰(Ⓝ)을 보냅니다.

- 인자: `senderId` `receiverId` `amount`
- 옵션: `default`

**참고:** 컨트랙트를 배포할 계정에 대한 전체 액세스 키가 필요합니다. ([`near login`](#near-login))

**예시:**

```bash
near send sender.testnet receiver.testnet 10
```

**응답 예시**

    Sending 10 NEAR to receiver.testnet from sender.testnet
    Transaction Id BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN

---

### `near delete` {#near-delete}

> 계정을 삭제하고 남은 잔액을 수령자 계정으로 이체합니다.

:::note
이 작업을 수행하면, 삭제된 계정의 이름을 사용할 수 있게 됩니다.
:::

- 인자: `accountId` `beneficiaryId`
- 옵션: `default`

**예시:**

```bash
near delete sub-acct2.example-acct.testnet example-acct.testnet
```

**응답 예시:**

    Deleting account. Account id: sub-acct2.example-acct.testnet, node: https://rpc.testnet.near.org,  beneficiary: example-acct.testnet
    Transaction Id 4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    Account sub-acct2.example-acct.testnet for network "default" was deleted.

:::warning 토큰 손실 수령자 계정이 존재하지 않는 경우 환불 Receipt가 생성되어 원래 계정으로 다시 전송됩니다. 그러나 원래 계정이 이미 삭제되었으므로 오류가 발생할 것이고, **자금은 밸리데이터에게 분배됩니다**. :::

---

## 컨트랙트 {#contracts}

### `near deploy` {#near-deploy}

> 지정된 accountId에 스마트 컨트랙트를 배포합니다.

- 인자: `accountId` `.wasmFile`
- 옵션: `initFunction` `initArgs` `initGas` `initDeposit`

**참고:** 컨트랙트 호출에는 트랜잭션 수수료(가스)가 필요하므로, 가스가 청구될 `--accountId`에 대한 액세스 키가 필요합니다. ([`near login`](#near-login))

**예시:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm
```

**초기화 예시:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm --initFunction new --initArgs '{"owner_id": "example-contract.testnet", "total_supply": "10000000"}'
```

<details>
<summary>응답 예시:</summary>
<p>

    Starting deployment. Account id: example-contract.testnet, node: https://rpc.testnet.near.org,  file: main.wasm
    Transaction Id G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    Done deploying to example-contract.testnet

</p>
</details>

### `near dev-deploy` {#near-dev-deploy}

> 개발 계정을 생성하고, 거기에 스마트 컨트랙트를 배포합니다. 액세스 키가 필요하지 않습니다. **_(`testnet` 전용)_**

- 인자: `.wasmFile`
- 옵션: `default`

**예시:**

```bash
near dev-deploy out/main.wasm
```

**응답 예시:**

    Starting deployment. Account id: dev-1603749005325-6432576, node: https://rpc.testnet.near.org,  file: out/main.wasm
    Transaction Id 5nixQT87KeN3eZFX7zwBLUAKSY4nyjhwzLF27SWWKkAp
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/5nixQT87KeN3eZFX7zwBLUAKSY4nyjhwzLF27SWWKkAp
    Done deploying to dev-1603749005325-6432576

---

### `near call` {#near-call}

> 상태를 수정 _또는_ 조회할 수 있는 컨트랙트 호출을 만듭니다.

**참고: ** 컨트랙트 호출에는 트랜잭션 수수료(가스)가 필요하므로, 청구될 `--accountId`에 대한 액세스 키가 필요합니다. ([`near login`](#near-login))

- 인자: `contractName` `method_name` `{ args }` `--accountId`

| 옵션                        | 설명                            |
| ------------------------- | ----------------------------- |
| `--gas`                   | 이 호출이 사용할 수 있는 최대 가스 양(가스 단위) |
| `--deposit` 또는 `--amount` | 함수 호출에 첨부할 토큰 수(NEAR 단위)      |
| `--depositYocto`          | 함수 호출에 첨부할 토큰 수(yoctoNEAR 단위) |
| `--base64`                | 인자를 base64 인코딩으로 처리           |

**팁:** 빈 `{ args }`가 필요한 메서드를 처리하는 두 가지 방법이 있습니다. `{"field": null}`을 보내거나 그냥 필드를 생략하고 아무 것도 전달하지 마세요: `{}`.

**예시:**

```bash
near call guest-book.testnet addMessage '{"text": "Aloha"}' --accountId example-acct.testnet
```

**응답 예시:**

```bash
Scheduling a call: guest-book.testnet.addMessage({"text": "Aloha"})
Transaction Id FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
''
```
---

### `near view` {#near-view}

> 상태**만** 볼 수 있는 컨트랙트 호출을 만듭니다. _(호출 비용은 무료)_

- 인자: `contractName` `method_name` `{ args }`
- 옵션: `default`

**예시:**

```bash
near view guest-book.testnet getMessages '{}'
```

**응답 예시:**

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

> utf-8 또는 borsh 직렬화 형식으로 컨트랙트 상태(키/값 쌍)를 반환합니다.

- 인자: `accountId` [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block-id`](/api/rpc/setup#using-block_id-param)
- 옵션: `default`

**예시:**

```bash
near view-state dao.sputnik-v2.testnet --finality final
```

또는

```bash
near view-state dao.sputnik-v2.testnet --block-id 53199035
```

<details>
<summary>응답 예시:</summary>
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

## 트랜잭션 {#transactions}

### `near tx-status` {#near-tx-status}

> 주어진 트랜잭션 해시 및 accountId에 대한 트랜잭션 상태 세부 정보를 표시합니다.

- 인자: `tx hash` `--accountId` _또는_ `accountId:tx_hash` _(아래 예시 확인)_
- 옵션: `default`

**예시:**

```bash
near tx-status near-example.testnet:6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j
```

또는

```bash
near tx-status 6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j --accountId near-example.testnet
```

<details>
<summary>응답 예시:</summary>
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

## 밸리데이터 {#validators}

### `near validators current` {#near-validators-current}

> 현재 밸리데이터의 세부 정보를 표시합니다.
> 
> - 스테이킹된 금액
> - 자리 수
> - 가동 시간 비율
> - 예상 블록 생산
> - 실제로 생산된 블록

- 인자: `current`
- 옵션: `default`

**예시:**

```bash
near validators current
```

**`mainnet`에서의 예시:**

```bash
NEAR_ENV=mainnet near validators current
```

<details>
<summary>응답 예시:</summary>
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

> 다음 라운드의 밸리데이터에 대한 세부 정보를 표시합니다
> 
> - 사용 가능한 총 자리 수
> - 자리 가격
> - 스테이킹된 금액
> - 밸리데이터 당 할당된 자리 수

- 인자: `next`
- 옵션: `default`

**예시:**

```bash
near validators next
```

**`mainnet`에서의 예시:**

```bash
NEAR_ENV=mainnet near validators next
```

<details>
<summary>응답 예시:</summary>
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

> 다음 [에포크](../1.concepts/basics/epoch.md) 이후에 대한 밸리데이터 제안을 표시합니다.
> 
> - 예상 자리 가격
> - 제안 상태
> - 이전에 스테이킹한 금액과 스테이킹 _할_ 새 금액
> - 밸리데이터 당 할당된 자리 수

- 인자: `none`
- 옵션: `default`

**예시:**

```bash
near proposals
```

**`mainnet`에서의 예시:**

```bash
NEAR_ENV=mainnet near proposals
```

<details>
<summary>응답 예시:</summary>
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

> NEAR에 연결된 NEAR [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) _(대화형 JavaScript 프로그래밍 환경)_ 을 시작합니다.

- 인자: `none`
- 옵션: `--accountId`

시작하려면, 다음을 실행하세요.

```bash
near repl
```

- 그러면 `>` 프롬프트가 표시되고 NEAR와 상호 작용을 시작할 수 있습니다.
- NEAR(Ⓝ)를 yoctoNEAR(10^-24)로 변환하는 프롬프트에 다음을 입력해 보세요.

```bash
nearAPI.utils.format.parseNearAmount('1000')
```

> `near repl`로 `--accountId`도 사용할 수 있습니다.

**예시:**

```bash
near repl --accountId example-acct.testnet
```

- `>` 프롬프트 다음 `account`를 콘솔 로깅해보세요.

```bash
console.log(account)
```

**응답 예시:**

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

> 개인 키로부터 공개 키를 얻을 수도 있습니다.

- 먼저, `privateKey` 변수를 정의합니다.

```js
const myPrivateKey =
  "3fKM9Rr7LHyzhhzmmedXLvc59rayfh1oUYS3VfUcxwpAFQZtdx1G9aTY6i8hG9mQtYoycTEFTBtatgNKHRtYamrS";
```

- 그런 다음, 아래 명령을 실행합니다.

```js
nearAPI.KeyPair.fromString(myPrivateKey).publicKey.toString();
```

NEAR REPL을 사용하면, NEAR 플랫폼에서 개발하는 데 도움이 되는 [`near-api-js`](https://github.com/near/near-api-js)에 대한 완전한 액세스 권한을 얻을 수 있습니다.

---

## 옵션 {#options}

| 옵션                            | 설명                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `--help`                      | 도움말 표시 _(단독으로 또는 모든 명령에 대해 사용할 수 있음)_                                             |
| `--version`                   | 설치된 `near-cli` 버전을 보여줌                                                            |
| `--nodeUrl`, `--node_url`     | [RPC URL](/api/rpc/setup) _(`testnet`, `mainnet`, `betanet`)_ 선택                  |
| `--helperUrl`                 | 계정 생성/관리에 사용하려는 [컨트랙트 헬퍼](https://github.com/near/near-contract-helper) 인스턴스를 가리킴 |
| `--keyPath`                   | `--masterAccount` 키에 대한 경로 지정                                                     |
| `--accountId`, `--account_id` | 계정 ID 선택                                                                          |
| `--useLedgerKey`              | 주어진 HD 키 경로 `[default: "44'/397'/0'/0'/1'"]`로 Ledger 사용                           |
| `--seedPhrase`                | 니모닉 시드 구문 사용                                                                      |
| `--seedPath`                  | HD 경로 파생 `[default: "m/44'/397'/0'"]` 지정                                          |
| `--walletUrl`                 | selects a [NEAR wallet](https://testnet.mynearwallet.com) URL                     |
| `--contractName`              | 계정 컨트랙트 이름 선택                                                                     |
| `--masterAccount`             | 마스터 계정 선택                                                                         |
| `--helperAccount`             | 네트워크에 대해 예상되는 최상위 계정 선택                                                           |
| `--verbose`, `-v`             | 자세한 출력 보여줌                                                                        |
| `--gas`                       | 컨트랙트 호출에 사용할 가스 양 지정 (`[default: "100000000000000"]`)                             |
| `--deposit`                   | 함수 호출에 첨부할 토큰 수(yocto Ⓝ 단위) (`[default: null]`)                                   |
| `--depositYocto`              | 첨부할 NEAR 토큰(Ⓝ) 수 (`[default: "0"]`)                                               |

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>StackOverflow에 물어보세요!</h8></a>
:::
