---
id: post-processing
title: "사후 처리 도구"
---

# 사후 처리 도구
컨트랙트 크기는 중요한 특성입니다. 이를 작게 유지하는 가장 좋은 방법은, 의존성(dependency)이 적고 잘 설계된 최소한의 코드입니다. 배포하는 데 많은 비용이 소요될 수 있는 대규모 컨트랙트 및 대규모 다중 컨트랙트 dApp의 경우, 컨트랙트 크기를 줄이는 것은 특히 중요합니다.

코드 최적화에 최선을 다했다면, 컨트랙트를 축소하여 크기를 줄여야 합니다.

## 스크립트 사용 준비
`.wasm` 컨트랙트 파일을 축소하는 데 사용할 수 있는 간단한 `bash` 스크립트를 준비했습니다. 이는 [여기](https://github.com/near/near-sdk-rs/blob/master/minifier/minify.sh)에서 찾을 수 있습니다.

최소화에 대한 현재 접근 방식은 다음과 같습니다.
1. `wasm-snip`을 통해, 표준 라이브러리에서 크기가 큰 몇 가지의 함수(float 포맷 및 패닉 관련 함수 등)를 잘라냅니다(예: 사용되지 않는 지침 대체).
2. `wasm-gc`을 실행해서, 잘라낸 함수에서 실행할 수 있는 모든 함수를 제거합니다.
3. `wasm-strip`이 포함된 이름과 같은 불필요한 섹션을 제거합니다.
4. `binaryen wasm-opt`를 실행하여 나머지를 정리합니다.

### 스크립트를 실행하기 위한 요구 사항:
- Cargo를 통해 [wasm-snip](https://docs.rs/wasm-snip/0.4.0/wasm_snip/) 및 [wasm-gc](https://docs.rs/crate/wasm-gc/0.1.6)를 설치합니다.
```bash
cargo install wasm-snip wasm-gc
```
- 시스템에 [binaryen](https://github.com/WebAssembly/binaryen)과 [wabt](https://github.com/WebAssembly/wabt)를 설치합니다. Ubuntu 및 다른 Debian 기반 Linux 배포판의 경우 다음을 실행합니다.
```bash
apt install binaryen wabt
```
## 경고
컨트랙트 크기 축소는 다소 공격적일 수 있으므로, 축소 후 컨트랙트를 테스트해야 합니다. [여기](https://github.com/nearprotocol/nearcore/tree/master/runtime/near-vm-runner)서 독립 실행형(Standalone) NEAR 런타임이 도움이 될 수 있습니다.