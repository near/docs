---
id: remix-ide-plugin
sidebar_label: Remix IDE 플러그인
---

# Remix IDE 플러그인 통합

이 튜토리얼에서는 Remix IDE에서 NEAR 스마트 컨트랙트를 배포하고 실행하는 방법을 자세히 설명합니다. 이는 NEAR 스마트 컨트랙트를 개발하기 위한 GUI가 있는 무설치 도구입니다.

![remix-plugin](/docs/assets/remix-ide-plugin/remix-ide.png?raw=true "remix-plugin")

## Remix IDE에 연결하기

[WELLDONE Code](https://docs.welldonestudio.io/code)는 공식 Remix IDE 플러그인입니다. [Remix IDE](https://remix.ethereum.org/) 를 방문하여 아래 가이드를 따르세요.

왼쪽 막대의 **플러그인 관리자** 버튼을 클릭하고 **CODE BY WELDONE STUDIO** 를 검색한 후 Activate 버튼을 클릭합니다.

<img src={require('/docs/assets/remix-ide-plugin/plugin-manager.png').default} alt='plugin-manager' style={{width: '500px', marginRight: '10px', display: 'inline'}} />

<img src={require('/docs/assets/remix-ide-plugin/activate-plugin.png').default} alt='active-plugin' style={{width: '300px', display: 'inline'}} />

## 체인 선택

체인 목록에서 NEAR(NVM)을 클릭합니다.

`Documentation` 버튼을 클릭하면 WELL DONE Docs로 이동하고, 사용 중 문제가 발견되거나 궁금한 사항이 있으면 `Make an issue` 버튼을 클릭하여 [Github Repository](https://github.com/welldonestudio/welldonestudio.github.io) 로 이동한 후 자유롭게 이슈를 생성할 수 있습니다.

<img src={require('/docs/assets/remix-ide-plugin/select-chain.png').default} alt='select-chain' style={{width: '318px'}} />

## 브라우저 익스텐션 지갑 설치

:::info 
다른 지갑은 곧 지원될 예정이며, WELLDONE 지갑은 지금 사용할 수 있습니다.
:::

체인을 선택한 후, `Connect to WELLDONE` 버튼을 클릭하여 **WELLDONE 지갑**에 연결합니다.

WELLDONE WALLET을 아직 설치하지 않은 경우 다음 [매뉴얼](https://docs.welldonestudio.io/wallet/manual/) 에 따라 지갑을 설치 및 생성하고 선택한 체인에 대한 계정을 만드세요. 마지막으로 지갑의 설정 탭으로 들어가 개발자 모드를 활성화합니다.

<img src={require('/docs/assets/remix-ide-plugin/wallet-developer-mode.png').default} alt='wallet-developer-mode' style={{width: '318px', marginBottom: '10px'}} />

그리고 변경 사항을 지갑에 적용하려면 플러그인의 오른쪽 상단 모서리에 있는 새로 고침 버튼을 클릭해야 합니다.

## 프로젝트 만들기

In NEAR, you can write smart contracts with Rust, JavaScript, and TypeScript. 각 언어별로 컨트랙트 구조가 다르기 때문에, **WELLDONE Code**는 NEAR에 처음 온 개발자들에게 도움이 되는 두 가지 기능을 제공합니다.

### 템플릿 선택

Create a simple example contract code written in Rust, JavaScript, and TypeScript. 템플릿 옵션을 선택하고 `Create` 버튼을 클릭하여 샘플 컨트랙트를 생성할 수 있습니다. 더 많은 템플릿은 [NEAR Samples](https://github.com/near-examples/)에서 찾을 수 있습니다.

<img src={require('/docs/assets/remix-ide-plugin/template-code-near.png').default} alt='template-code-near' style={{width: '318px'}} />

### 새 프로젝트

사용할 스마트 컨트랙트 언어를 기반으로 컨트랙트 구조를 자동으로 생성합니다. 언어 옵션을 선택하고 프로젝트의 이름을 작성한 후 `Create` 버튼을 눌러 언어에 적합한 컨트랙트 구조를 만듭니다.

<img src={require('/docs/assets/remix-ide-plugin/new-project-near.png').default} alt='new-project-near' style={{width: '318px'}} />

:::info
위의 기능을 사용하지 않고 직접 컨트랙트 프로젝트를 만들 수도 있습니다. 그러나 Remix 플러그인이 컨트랙트를 빌드하고 배포하려면 `near/` 디렉토리에 빌드되어야 합니다. 새 프로젝트를 시작할 경우 구조는 다음과 같아야 합니다.
:::

#### 1. Rust로 컨트랙트 작성
  ```
  near
  └── <YOUR_PROJECT_NAME>
      ├── Cargo.toml
      └── src
          └── lib.rs
  ```

#### 2. TypeScript로 컨트랙트 작성
  ```
  near
  └── <YOUR_PROJECT_NAME>
      ├── package.json
      ├── babel.config.json
      ├── tsconfig.json
      └── src
        └── contract.ts
  ```

#### 3. JavaScript로 컨트랙트 작성
  ```
  near
  └── <YOUR_PROJECT_NAME>
      ├── package.json
      ├── babel.config.json
      └── src
        └── contract.js
  ```

## 컨트랙트 컴파일

:::info
Six compilation options are now available in WELLDONE Code: `Rust`, `CARGO-NEAR`, `EMBED-ABI`, `JavaScript`, and `TypeScript`.

현재는 AMD 컴파일 서버만 지원하지만 곧 ARM 컴파일 서버에 대한 지원을 추가할 예정입니다.
:::

**1단계**: **TARGET PROJECT** 섹션에서 컴파일할 프로젝트를 선택합니다.

**2단계**: 컴파일 옵션을 선택하고 `Compile` 버튼을 클릭합니다.

**3단계**: 컴파일이 완료되면 wasm 파일이 반환됩니다.

<img src={require('/docs/assets/remix-ide-plugin/project-compile.png').default} alt='project-compile' style={{width: '318px'}} />

:::note
반환된 wasm 파일은 `near/<YOUR_PROJECT_NAME>/out` 디렉토리에서 확인하실 수 있습니다.

컨트랙트를 수정하고 다시 컴파일해야 할 경우 `out` 디렉토리를 삭제하고 컴파일 버튼을 클릭합니다.
:::

### 1. Rust 컴파일

`cargo build` 명령을 사용하여 러스트로 작성된 스마트 컨트랙트를 작성합니다. 이는 안정적인 컴파일을 제공하지만 컨트랙트를 실행할 때 메소드의 매개 변수를 직접 입력하기가 불편합니다.

### 2. CARGO-NEAR 컴파일 (Rust 버전) - `Experimental`

NEAR에서 공식적으로 개발 중인 `cargo near`을 사용하여 컴파일합니다. 컴파일에 성공하면 실행 가능한 wasm 바이너리 파일과 컨트랙트의 ABI가 포함된 json 파일이 함께 생성됩니다. `cargo-near`를 사용하여 컴파일된 컨트랙트를 배포하고 가져온 경우, 메서드의 매개 변수 유형을 확인할 수 있으므로 컨트랙트를 보다 쉽게 실행할 수 있습니다.

그러나 이 기능은 아직 개발 중이므로 `Cargo.toml` 파일에서 `near-sdk-rs` 버전을 **4.1.0** 이상으로 지정해야 하며, 컴파일 중에 예기치 않은 문제가 발생할 수 있습니다. 자세한 내용은 NEAR의 [레퍼지토리](https://github.com/near/abi)를 확인하십시오.

### 3. EMBED-ABI 컴파일 (Rust 버전) - `Experimental`

`cargo-near`에서 `-embed-abi` 옵션을 사용하면 내부에 ABI가 포함된 wasm 파일을 생성합니다. 이 옵션을 사용하여 wasm 파일 컴파일을 배포한 컨트랙트의 경우, `At Address` 버튼을 통해 컨트랙트를 가져올 때도 ABI 정보를 얻을 수 있습니다. 옵션에 대한 자세한 설명은 [cargo-near](https://github.com/near/cargo-near) 레퍼지토리를 참조하세요.

### 4. JavaScript & TypeScript 컴파일

[`near-sdk-js`](https://github.com/near/near-sdk-js)를 사용하여 JavaScript 또는 TypeScript로 작성된 스마트 컨트랙트를 컴파일합니다.

:::note
JavaScript 또는 TypeScript 컴파일 옵션을 사용하는 경우 컴파일이 오류 없이 실행되도록 컴파일할 컨트랙트 파일의 이름을 다음과 같이 작성해야 합니다.
- JavaScript: `contract.js`
- TypeScript: `contract.ts`
:::

## 컨트랙트 배포

:::tip
WELLDONE WALLET은 자동으로 지갑 주소와 연결된 네트워크를 찾아 가져옵니다. 따라서 배포하기 전에 트랜잭션을 메인넷으로 보낼지 테스트넷으로 보낼지 선택해야 합니다.
:::

**1단계**: 컴파일된 계약 코드가 있는 경우 `Deploy` 버튼이 활성화됩니다.

**2단계**: 컨트랙트를 배포할 계정 ID를 입력하고 `Deploy` 버튼을 클릭합니다. `init function`을 추가하려면 `Deploy Option`을 클릭하여 메서드 이름과 인수를 추가합니다.

<img src={require('/docs/assets/remix-ide-plugin/deploy-option-near.png').default} alt='deploy-option-near' style={{width: '318px'}} />

**3단계**: AccountId에 이미 배포된 컨트랙트가 있는 경우 다시 한 번 확인합니다.

**4단계**: **WELLDONE WALLET**에서 `Send Tx` 버튼을 클릭하여 트랜잭션에 서명합니다.

<img src={require('/docs/assets/remix-ide-plugin/deploy-near.png').default} alt='deploy-near' style={{width: '500px'}} />

**5단계**: 트랜잭션 성공 로그가 터미널에 인쇄되고 컨트랙트 배포가 성공적인 경우, 컨트랙트를 실행할 수 있습니다.

<img src={require('/docs/assets/remix-ide-plugin/deployed-contract-near.png').default} alt='deployed-contract-near' style={{width: '318px'}} />

## 컨트랙트 실행

:::info
컨트랙트를 가져오는 방법은 두 가지가 있습니다.

1. 위의 프로세스를 통해 배포된 컨트랙트를 자동으로 가져옵니다.
2. `At Address` 버튼을 통해 배포된 기존 컨트랙트를 가져옵니다.

:::

**1단계**: 실행할 메서드를 선택합니다.

**2단계**: 필요에 따라 매개변수를 추가합니다.

**3단계**: `Call` 함수의 경우, 함수 호출에 첨부할 NEAR 토큰의 수와 GAS LIMIT을 지정할 수 있습니다.

**4단계**: `View` 또는 `Call` 버튼을 클릭하여 메서드를 실행합니다. 트랜잭션을 보내는 경우 **WELLDONE WALLET**에서 `Send Tx` 버튼을 클릭하여 트랜잭션에 서명해야 합니다.

<img src={require('/docs/assets/remix-ide-plugin/function-call.png').default} alt='function-call' style={{width: '318px'}} />


:::info
`CARGO-NEAR` 또는 `IMBED-ABI` 옵션을 사용하여 컴파일된 컨트랙트를 배포한 경우, 메서드의 매개 변수를 직접 입력하지 않고도 ABI를 사용하여 보다 쉽게 컨트랙트를 실행할 수 있습니다.
:::

<img src={require('/docs/assets/remix-ide-plugin/cargo-near.png').default} alt='cargo-near' style={{width: '250px', display: 'inline-block'}} />
<img src={require('/docs/assets/remix-ide-plugin/cargo-near1.png').default} alt='cargo-near1' style={{width: '250px', display: 'inline-block'}} />
<img src={require('/docs/assets/remix-ide-plugin/cargo-near2.png').default} alt='cargo-near2' style={{width: '250px', display: 'inline-block'}} />