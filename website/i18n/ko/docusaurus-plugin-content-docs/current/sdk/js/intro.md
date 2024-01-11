---
id: get-started
title: "시작하기"
---

# 시작하기

Linux용 Windows 하위 시스템(WSL2)을 사용하여 Windows에서 스마트 컨트랙트를 개발할 수 있습니다.
:::

WSL2를 사용하려면 다음 단계를 따르세요.

- `PowerShell`을 관리자 권한으로 실행합니다.
- Ubuntu 설치를 위해 `wsl --install`을 실행하고, 추가 설정을 자동으로 진행합니다. [여기](https://learn.microsoft.com/en-us/windows/wsl/install)에서 세부 사항을 살펴보세요.
- 장치를 재시작합니다.
- `WSL2`는 다시 시작할 때 설정 프로세스를 계속할 것입니다. 메시지가 표시되면 사용자 이름과 암호를 설정합니다.
- [이 가이드](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)를 확인해 `npm`, `node`, `npx`, `VSCode` 및 다른 도구들을 설정하고, 개발을 시작하세요.

WSL2 설정에 문제가 있는 경우 다음을 확인하세요.

- Windows OS가 최신 상태입니다.
- BIOS에서 가상화(Virtualisation)가 켜져 있습니다.
- `Windows Subsystem for Linux`와 `Virtual Machine Platform`이 `Windows Features`에서 켜져 있습니다(시작 -> 검색 -> Windows 기능 On 또는 Off)

## 노드 설치

노드를 설치하려면 [Node.js 웹사이트](https://nodejs.org/en/download/)의 지침을 따르세요.

## 새 프로젝트 생성

프론트엔드와 연결된 새 NEAR 앱을 만드는 가장 좋은 방법은 [create-near-app](https://github.com/near/create-near-app)을 사용하는 것입니다. 프로젝트를 초기화할 때 선택한 프론트엔드 옵션을 사용하여 TypeScript에서 프로젝트 만들기를 선택합니다.

```bash
npx create-near-app
```

JS 컨트랙트만 개발하고 배포하려는 경우, [`hello-near-js`](https://github.com/near-examples/hello-near-js) 레퍼지토리를 템플릿 또는 [SDK 레퍼지토리의 예제](https://github.com/near/near-sdk-js/tree/develop/examples/src) 중 하나로 사용하는 것이 좋습니다.

`npm init`를 사용하여 새 프로젝트를 수동으로 생성하려면, 생성된 `package.json` 내에 다음 구성이 포함되는지 확인해야 합니다.

```json
  "dependencies": {
    "near-sdk-js": "*"
  }
```
