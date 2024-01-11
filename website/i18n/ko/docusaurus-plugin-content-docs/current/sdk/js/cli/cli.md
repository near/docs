---
title: JS SDK CLI
---

SDK [명령줄 인터페이스](https://github.com/near/near-sdk-js/blob/develop/packages/near-sdk-js/src/cli/cli.ts) (CLI)는 빌드 프로세스의 여러 부분에서 작동하고, 유효성 검사 및 [ABI](https://github.com/near/abi)를 생성할 수 있는 도구입니다. 무엇보다도 SDK CLI를 사용하면 다음을 수행할 수 있습니다.

- 빌드 프로세스의 다양한 부분 제어
- 컨트랙트 및 TypeScript 코드 유효성 검사
- ABI JSON 파일 생성

---

## 개요 {#overview}

_자세한 정보와 예를 보려면 명령을 클릭하세요._

**명령**

| 명령                                                             | 설명                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`near-sdk-js build`](#build)                                  | NEAR JS 스마트 컨트랙트 구축                                                 |
| [`near-sdk-js validateContract`](#validate-contract)           | NEAR JS 스마트 컨트랙트 검증                                                 |
| [`near-sdk-js checkTypescript`](#check-ts)                     | 일부 CLI 플래그로 TSC 실행                                                  |
| [`near-sdk-js createJsFileWithRollup`](#create-js-file)        | 나중에 QJSC로 처리할 중간 JavaScript 파일 생성                                   |
| [`near-sdk-js transpileJsAndBuildWasm`](#transpile-js-to-wasm) | 대상 javascript 파일을 QJSC를 사용하여 .c 및 .h로 변환한 다음 clang을 사용하여 wasm으로 컴파일 |

---

## 설정 {#setup}

### 설치 {#installation}

> `npm`과 `NodeJS`의 최신 버전이 설치되어 있는지 확인하세요.

#### Mac / Linux {#mac-and-linux}

1. `nvm`과 같이 [패키지 매니저](https://nodejs.org/en/download/package-manager/)를 사용해 `npm`과 `node`를 설치합니다. 이는 macOS가 USB 장치와 관련된 노드 패키지를 처리하는 방식으로 인해 떄떄로 Ledger 사용에 문제가 생길 수 있기 때문입니다.
2. Node 버전 12 이상을 설치했는지 확인합니다.
3. 다음을 실행하여 `near-cli`를 전역적으로 설치합니다.

```bash
npm install -g near-cli
```

#### Windows {#windows}

> Windows 사용자의 경우 Linux용 Windows 하위 시스템(`WSL`)을 사용하는 것이 좋습니다.

1. `WSL` 설치 [[여기를 클릭]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. `npm` 설치 [[여기를 클릭]](https://www.npmjs.com/get-npm)
3. `Node.js` 설치 [[여기를 클릭]](https://nodejs.org/en/download/package-manager/)
4. `npm` 기본 디렉토리 변경 [[여기를 클릭]](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - 이는 `WSL` 관련 권한 문제를 피하기 위한 것입니다.
5. 다음을 실행하여 `WSL`을 열고 `near-cli`를 설치합니다.

```bash
npm install -g near-cli
```

:::info 주의

`WSL`를 사용하는 복사/붙여넣기는 약간 이상할 수 있습니다.

- "빠른 편집 모드"를 사용하면 마우스 오른쪽 버튼으로 붙여넣기를 할 수 있습니다.
- 버전에 따라 `Ctrl` + `V` 붙여넣기를 허용하는 또 다른 확인란이 있을 수 있습니다.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)

:::

---

## 명령 {#commands}

### `near-sdk-js build` {#build}

소스, 대상, `package.json` 및 `tsconfig.json` 파일을 지정하여 NEAR JS 스마트 컨트랙트를 구축합니다. 아무것도 지정하지 않으면 기본값이 사용됩니다. 인자 기본값은 다음과 같습니다.

- 소스: `src/index.js`
- 타겟: `build/contract.wasm`
- packageJson: `package.json`
- tsConfig: `tsconfig.json`

옵션 기본값은 `false`로 설정됩니다.

- 인자 (선택 사항): `[source] [target] [packageJson] [tsConfig]`
- 옵션: `--verbose --generateABI`

**예시:**

```bash
near-sdk-js build src/main.ts out/main.wasm package.json tsconfig.json --verbose true --generateABI true
```

### `near-sdk-js validateContract` {#validate-contract}

NEAR JS 스마트 컨트랙트를 검증합니다. 생성자에서 모든 매개변수가 초기화되었는지 확인하여 컨트랙트를 검증합니다. 이는 TypeScript에서만 작동합니다.

- 인자: `[source]`
- 옵션: `--verbose`

**예시:**

```bash
near-sdk-js validateContract src/main.ts --verbose true
```

**응답 예시:**

```bash
npx near-sdk-js validateContract src/index.ts
[validate] › …  awaiting  Validating src/index.ts contract...
```

---

### `near-sdk-js checkTypescript` {#check-ts}

일부 CLI 플래그와 함께 TSC를 실행합니다.

 :::note 주의 이 명령어는 `tsconfig.json`을 무시합니다.
:::

- 인자: `[source]`
- 옵션: `--verbose`

**예시:**

```bash
near-sdk-js checkTypescript src/main.ts --verbose true
```

**응답 예시:**

```bash
npx near-sdk-js checkTypescript src/index.ts
[checkTypescript] › …  awaiting  Typechecking src/index.ts with tsc...
```

---

### `near-sdk-js createJsFileWithRollup` {#create-js-file}

나중에 QJSC로 처리할 중간 JavaScript 파일을 만듭니다.

- 인자: `[source]` `[target]`
- 옵션: `--verbose`

**예시:**

```bash
near-sdk-js createJsFileWithRollup src/main.ts out/main.js --verbose true
```

**응답 예시:**

```bash
npx near-sdk-js createJsFileWithRollup src/index.ts
[createJsFileWithRollup] › …  awaiting  Creating src/index.ts file with Rollup...
```

### `near-sdk-js transpileJsAndBuildWasm` {#transpile-js-to-wasm}

나중에 QJSC로 처리할 중간 JavaScript 파일을 만듭니다.

- 인자: `[source]` `[target]`
- 옵션: `--verbose`

**예시:**

```bash
near-sdk-js transpileJsAndBuildWasm src/main.js out/main.wasm --verbose true
```

**응답 예시:**

```bash
npx near-sdk-js transpileJsAndBuildWasm
[transpileJsAndBuildWasm] › ✔  success   Generated build/contract.wasm contract successfully!
```
