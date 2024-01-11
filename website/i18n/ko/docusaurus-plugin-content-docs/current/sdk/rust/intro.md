---
id: get-started
---

# 시작하기

## Rust 및 Wasm 툴체인 설치

Rust를 설정하려면 [다음 지침](https://doc.rust-lang.org/book/ch01-01-installation.html)을 따르세요.

Linux 또는 MacOS에 Rust를 설치하려면 다음 명령을 사용하세요.

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

source $HOME/.cargo/env
```

그런 다음 `wasm32-unknown-unknown` 툴체인을 추가하세요. 이 툴체인은 우리가 구축할 컨트랙트를 NEAR 블록체인에서 실행되도록 [Wasm](https://webassembly.org/)으로 컴파일하기 때문에 필요합니다.

```bash
rustup target add wasm32-unknown-unknown
```

## 새 프로젝트 생성

프론트엔드와 연결된 새 NEAR 앱을 만드는 가장 좋은 방법은 [create-near-app](https://github.com/near/create-near-app)을 사용하는 것입니다. 프로젝트를 초기화할 때 Rust SDK를 사용하려면 `--contract=rust` 플래그를 반드시 포함해야 합니다. React를 사용하려면 `--frontend=react`를 추가하세요. 기본값은 바닐라 HTML입니다.

```bash
npx create-near-app my-project --contract rust --frontend none --tests rust
```

Rust 컨트랙트만 개발하고 배포하려는 경우, [상태 메시지 예제](https://github.com/near-examples/rust-status-message)를 템플릿으로 사용하거나, [cargo-generate](https://github.com/cargo-generate/cargo-generate)를 통해 사용하는 것이 좋습니다.

`cargo-generate`를 사용하여 새 프로젝트를 초기화하려면, 다음 명령을 실행합니다.

```bash
cargo install cargo-generate --features vendored-openssl

cargo generate --git https://github.com/near-examples/rust-status-message --name my-project
cd my-project
```

`cargo new --lib <crate-name>`를 사용하여 새 크레이트를 수동으로 생성하려면, 생성된 `Cargo.toml` 파일에 다음 구성을 포함해야 합니다.

```toml
[dependencies]
near-sdk = "4.0.0"

[lib]
crate-type = ["cdylib"]

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
# Opt into extra safety checks on arithmetic operations https://stackoverflow.com/a/64136471/249801
overflow-checks = true
```
