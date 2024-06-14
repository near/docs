---
id: near-cli-rs
title: NEAR CLI RS
---

# NEAR-CLI-RS

## 빠른 시작 가이드

`near-cli-rs` 도구는 명령줄(command line)에서 [NEAR 프로토콜](https://near.org/)과 상호 작용하는 데 도움이 되는 동반자입니다. 여기에는 Rust 기반으로 자신만의 명령을 만드는 데 도움이 되는 안내 프롬프트 인터페이스가 있습니다.

:::info 메모

이는 유사한 기능을 하지만 프롬프트 가이드가 없는 CLI 도구 [near-cli](https://docs.near.org/tools/near-cli)와는 별도의 도구입니다.

:::

## 설치

[GitHub 릴리스 페이지](https://github.com/near/near-cli-rs/releases/)에서 OS용으로 미리 컴파일된 `near-cli-rs` 버전을 다운로드하거나 다음 명령을 통해 [Cargo](https://doc.rust-lang.org/cargo/)(Rust의 패키지 관리자 도구)로 설치합니다.

```
$ cargo install near-cli-rs
```

## 시작하기

트랜잭션, 토큰 전송, 컨트랙트 배포 등과 관련된 명령을 활용하려면, 컴퓨터의 지정된 계정에 대한 전체 액세스 키를 저장해야 합니다.

다음을 실행하세요...

```
near
```

화살표 키를 사용하여 탐색합니다...

```
account  -Manage accounts
```

다음으로 이동하세요...

```
import-account -Import existing account (a.k.a. "sign-in")
```

원하는 로그인 방법을 선택하세요. 이 예제에서는 다음을 선택합니다...

```
using-web-wallet -Import existing account using NEAR Wallet (a.k.a. "sign in")
```

이 튜토리얼의 경우 `testnet`을 선택합니다.

```
What is the name of the network?
mainnet
>testnet
shardnet
```

`wallet.testnet.near.org`로 리디렉션될 것입니다. 그곳에서 권한을 부여하세요. 그런 다음, 터미널에서 계정 ID를 입력하라는 메시지가 표시됩니다. 방금 액세스 권한을 부여한 계정의 이름과 전체 액세스 키를 제공하세요.

Mac을 사용하는 경우 [Mac 키체인](https://support.apple.com/guide/keychain-access/what-is-keychain-access-kyca1083/mac) 옵션을 사용할 수 있습니다.

스토리지 옵션은 괜찮습니다. 원래 스토리지 옵션을 사용하면 루트 디렉터리 내 파일을 숨겨진 폴더인 `./near-credentials`에 저장할 것입니다. 이 스토리지 옵션은 `near-cli` 도구(안내 프롬프트가 없지만 유사한 기능이 있는 CLI 도구)와 호환됩니다.

**잘하셨습니다!** 이제 `near-cli-rs` 내 모든 기능을 사용할 수 있습니다.

---

## 사용

`near-cli-rs`를 사용하려면, 터미널에서 다음을 실행하세요.

```bash
$ near
```

그러면 다음이 표시됩니다. 화살표 키를 사용하여 `enter`를 누르거나, 가능한 옵션 중 하나를 간단히 입력하여 옵션을 선택하십시오.

![](/docs/assets/near-cli-rs.png)

### 계정

이 옵션을 사용하면 계정에 대한 정보를 관리, 제어 및 검색할 수 있습니다.

| 옵션                     | 설명                               |
| ---------------------- | -------------------------------- |
| `view-account-summary` | 계정 속성 보기                         |
| `import-account`       | 기존 계정 가져오기("로그인" 이라고도 함) 이라고도 함) |
| `create-account`       | 새 계정 생성                          |
| `delete-account`       | 계정 삭제                            |
| `list-keys`            | 계정의 키 목록 보기                      |
| `add-key`              | 계정에 액세스 키 추가                     |
| `delete-key`           | 계정에서 액세스 키 삭제                    |

### 토큰

이를 통해 NEAR, FT 및 NFT와 같은 토큰 자산을 관리할 수 있습니다.

| 옵션                  | 설명                                      |
| ------------------- | --------------------------------------- |
| `send-near`         | NEAR 또는 yoctoNEAR 단위로 지정된 수신자에게 NEAR 전송 |
| `send-ft`           | 지정된 사용자에게 대체 가능한 토큰 전송                  |
| `send-nft`          | 계정 간 NFT 전송                             |
| `view-near-balance` | NEAR 토큰의 잔액 보기                          |
| `view-ft-balance`   | View the balance of Fungible Tokens     |
| `view-nft-assets`   | NEAR 토큰의 잔액 보기                          |

### 컨트랙트

이 옵션을 사용하면 스마트 컨트랙트를 관리하고 상호 작용할 수 있습니다.

| 옵션              | 설명           |
| --------------- | ------------ |
| `call-function` | 함수 실행        |
| `deploy`        | 새 컨트랙트 코드 추가 |
| `download-wasm` | Wasm 다운로드    |

### 트랜잭션

트랜잭션을 관리합니다.

| 옵션                     | 설명         |
| ---------------------- | ---------- |
| `view-status`          | 트랜잭션 상태 보기 |
| `construct-tansaction` | 새 트랜잭션 구성  |

### 구성

`near-cli-rs`에 대한 `config.toml` 내에서 연결 매개변수를 관리합니다.

이렇게 하면 CLI에 대한 네트워크 연결을 변경하거나 수정할 수 있습니다.

| 옵션                  | 설명            |
| ------------------- | ------------- |
| `show-connections`  | 네트워크 연결 목록 표시 |
| `add-connection`    | 네트워크 연결 추가    |
| `delete-connection` | 네트워크 연결 삭제    |

---
