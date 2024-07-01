---
sidebar_position: 2
sidebar_label: "Rust 및 컨트랙트 뼈대 설정"
title: "Rust를 설정하고, NEAR 테스트넷 계정과 NEAR CLI를 설정하며, 기본적인 스마트 컨트랙트 뼈대를 준비하세요"
---

import {Github} from "@site/src/components/codetabs"

# 시작하기

In this tutorial we'll get a `testnet` account, use [NEAR CLI RS](../../../4.tools/cli-rs.md) to add a key to our computer's file system, and set up the basic skeleton of a Rust smart contract.

## Rust 설정

Rust를 시작하기 위한 훌륭한 리소스인 [온라인 Rust Book](https://doc.rust-lang.org/stable/book)을 활용할 수도 있습니다. 그러나 블록체인 개발과 관련하여 고려해야할 주요 항목이 존재합니다. 즉, 스마트 컨트랙트는 기술적으로 [바이너리가 아니라 라이브러리](https://learning-rust.github.io/docs/cargo-crates-and-basic-project-structure/#crate)입니다. 그러나 지금은 Rust Book에서 일반적으로 발견되는 일부 명령을 사용하지 않을 것이라는 점만 알고 있어도 좋습니다.

:::caution We won't be using `cargo run` during smart contract development. :::

대신 스마트 컨트랙트를 구축하고 테스트를 실행하는 행위를 반복할 것입니다.

### `rustup`을 사용하여 Rust 설치

[Rustup 사이트](https://rustup.rs/#)의 지침을 참조하세요. OS X 또는 Unix의 경우 다음을 사용할 수 있습니다.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

([Rust 설치 가이드](https://www.rust-lang.org/tools/install)에서 가져왔습니다.)

### Wasm 툴체인 추가

스마트 컨트랙트는 WebAssembly(Wasm)로 컴파일되므로, Rust용 툴체인을 추가합니다.

```bash
rustup target add wasm32-unknown-unknown
```

(대상 및 툴체인에 대한 자세한 정보는 [여기](https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html)있습니다.)

## 테스트넷 계정 얻기

Visit [NEAR Wallet for testnet](https://testnet.mynearwallet.com/) and register for a free account. 이 튜토리얼의 목적상, 원하는 경우 2단계 인증을 추가하는 옵션을 건너뛸 수 있습니다.

:::note 방금 무슨 일이 일어났나요? When you created your NEAR `testnet` account, a private key was created and placed into your browser's local storage. 개발자 도구를 사용하여 이를 검사하고 확인할 수 있습니다. :::

## 컴퓨터에서 새 키 만들기

명령줄 인터페이스(CLI) 도구를 사용하여 컨트랙트를 배포하려고 하지만, 현재 개인 키는 브라우저에만 존재합니다. 다음으로 테스트넷 계정에 새 키를 _추가_ 하고 이를 JSON 파일로 컴퓨터에 로컬로 저장합니다. (NEAR 계정 내에는 여러 개의 키를 가질 수 있으며 이는 매우 강력합니다!)

Let's install [NEAR CLI RS](../../../4.tools/cli-rs.md) using `cargo`. You can also download the pre-compiled version of `near-cli-rs` for your OS from [GitHub's Releases page](https://github.com/near/near-cli-rs/releases/).

```bash
cargo install near-cli-rs
```

이제 다음을 실행할 수 있습니다.

```bash
near
```

to see various commands, which are covered [in detail here](https://github.com/near/near-cli-rs/blob/main/docs/GUIDE.en.md).

다음 명령으로 "로그인"하여 시작하겠습니다.

```bash
near account import-account using-web-wallet network-config testnet
```

이렇게 하면, **전체 액세스** 키 생성을 확인할 수 있는 NEAR 지갑으로 다시 이동합니다. 나중에 전체 액세스 및 함수 호출 액세스 키에 대해 알아보겠습니다. "배포"와 같은 강력한 작업에는 전체 액세스 키가 필요합니다. 로그인 명령의 지침에 따라 하드 드라이브에 키를 만듭니다. 이것은 운영 체제의 홈 디렉토리에 위치한 `.near-credentials`라는 폴더에 있습니다.

:::note 키는 어떻게 추가되었나요? `near login`를 치면, NEAR CLI가 개인 키와 공개 키의 키 쌍을 생성합니다. NEAR CLI는 개인 키를 JSON 파일에 보관하고, 공개 키를 URL 매개변수로 NEAR 지갑에 보냅니다. URL은 길고, NEAR 지갑 계정에 "전체 액세스 키를 추가"하도록 지시하는 기타 정보가 포함되어 있습니다. 우리 브라우저의 로컬 스토리지에는 다른 키를 추가하는 것을 포함하여 여러 작업을 수행할 수 있는 키(계정이 만들어질 때 생성됨)가 있습니다. It took the public key from the URL parameter, used it as an argument, and voilà: the `testnet` account has an additional key! :::

You can see the keys associated with your account by running the following command, replacing `friend.testnet` with your account name:

```
near account list-keys friend.testnet network-config testnet now
```

## Rust 작성을 시작하세요!

[여기](https://github.com/near/boilerplate-template-rs)에 복제하거나 다운로드하는 데 유용한 기본 레퍼지토리가 있습니다.

가장 먼저 할 일은 `Cargo.toml`에서 매니페스트 파일을 수정하는 것입니다:

```diff
[package]
-  name = "rust-template"
+  name = "my-crossword"
version = "0.1.0"
- authors = ["Near Inc <hello@near.org>"]
+ authors = ["NEAR Friend <friend@example.com>"]
edition = "2018"
```

여기에서 `name`을 변경하면, 빌드 스크립트를 실행한 후 컴파일된 Wasm 파일의 이름이 변경됩니다. (OS X 및 Linux용으로는 `build.sh`, Windows용으로는 `build.bat`) (OS X 및 Linux용으로는 `build.sh`, Windows용으로는 `build.bat`) 빌드 스크립트를 실행한 후, `res/my_crossword.wasm` 내에서 컴파일된 Wasm 스마트 컨트랙트를 확인할 수 있습니다.

이제 `src/lib.rs` 내 메인 파일을 살펴보겠습니다:

<Github language="rust" start="9" end="44" url="https://github.com/near/boilerplate-template-rs/blob/f1edeead98a9ec12c3f6db311f62025305f57874/contract/src/lib.rs" />

As you can see, this is a stub that's ready to be filled in. Let's pause and point out a few items:

- Note the **near** macro is above the struct and the impl
- 여기서 기본 구조체는 `Contract`이지만, 다른 예에서는 `Counter`이거나 다른 것일 수 있습니다. 이는 순전히 작성자의 마음이지만, 이전 항목의 링크에서 더 많은 정보를 얻을 수 있습니다.
- "Borsh"라는 단어를 보고 그것이 무엇을 의미하는지 궁금할 것입니다. 이것은 바이너리 직렬 변환기입니다. Eventually, we'll want to save data as ones and zeroes to validators' hard drives, and do it efficiently. We use Borsh for this, as is explained [on this website](https://borsh.io).

Next, let's modify this contract little by little…
