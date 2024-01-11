---
id: basics
title: "기본 지침"
---

# 기본 지침
스마트 컨트랙트의 릴리스 버전을 컴파일하려면 다음을 실행할 수 있습니다.

```bash
cargo build --target wasm32-unknown-unknown --release
```

:::info

위의 `build` 명령은 WebAssembly `.wasm` 파일을 생성하는 `target` 플래그를 설정합니다.

:::

이제 프로젝트 디렉터리에 몇 가지 추가 항목이 있습니다.

```bash
.
├── Cargo.lock  ⟵ created during build to lock dependencies
├── Cargo.toml
├── src
│  └── lib.rs
└── target      ⟵ created during build, holds the compiled wasm
```
# 빌드 및 플래그
Cargo.toml 파일의 다음 플래그를 사용하여 빌드 아티팩트를 최적화하는 것이 좋습니다. 다중 컨트랙트 빌드를 수행하는 경우, 프로젝트 루트에 있는 Cargo.toml에 이러한 설정을 포함해야 합니다.

```bash
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

위의 명령은 본질적으로 특수 플래그를 설정하고, 결과로 나오는 `.wasm`파일을 최적화합니다. 하루가 끝나면, 이는 `cargo build --release` 명령을 사용자 정의할 수 있게끔 해줄 것입니다.

# 맞춤 플래그
빌드에 사용자 지정 플래그를 추가하려는 경우, 이 예제에 설명된 대로 빌드 플래그를 `ProjectFolder/.cargo/config.toml`에 추가하여 수행할 수 있습니다.

```toml
[target.wasm32-unknown-unknown]
rustflags = ["-C", "link-arg=-s"]
```

전체 빌드 옵션 집합은 https://doc.rust-lang.org/cargo/reference/config.html에서 액세스할 수 있습니다.


[여기](https://github.com/near/near-sdk-rs/blob/05e4539a8f3db86dd43b768ee9660dd4c8e7ea5c/examples/fungible-token/.cargo/config.toml)에서 예를 찾을 수 있습니다.
