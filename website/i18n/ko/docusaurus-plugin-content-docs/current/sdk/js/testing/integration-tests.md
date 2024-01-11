---
sidebar_position: 2
---

# 통합 테스트(Integration Test)

**참고:** 시뮬레이션 테스트는 더 이상 적극적으로 지원되지 않습니다. NEAR 시뮬레이터는 NEAR 컨트랙트를 테스트할 목적으로 블록체인 환경을 대체하기 위한 것이었습니다. 그러나 NEAR 렛저를 시뮬레이션하는 것은 예상했던 것보다 훨씬 더 복잡한 노력이 든다는 것이 밝혀졌습니다. 결국 워크플로우를 자동화하고 실제 NEAR 네트워크(로컬넷, 테스트넷 또는 메인넷)를 사용하여 NEAR 스마트 컨트랙트에 대한 테스트를 작성하기 위한 라이브러리인 '작업 공간(Workspace)'에 대한 아이디어가 탄생했습니다. 따라서 NEAR 시뮬레이터는 더 이상 사용되지 않고, 작업 공간의 Rust 버전인 [`workspaces-rs`](https://github.com/near/workspaces-rs)가 대신 사용되고 있습니다. 두 라이브러리에는 크게 다른 두 API가 있으므로, [이 가이드](/develop/testing/workspaces-migration)는 개발자의 마이그레이션 프로세스를 쉽게 하기 위해 만들어졌습니다.
:::

## 설정

JS의 통합 테스트는 `/integration-tests`([자세히 보기](https://doc.rust-lang.org/cargo/reference/cargo-targets.html#integration-tests))라는 `/src`와 동일한 수준의 별도 디렉토리에 배치합니다. 이 폴더를 단위 테스트(Unit Test) 폴더가 포함된 루트 수준의 폴더에 배치하는 것도 가능합니다. 아래의 이 폴더 구조를 참고하세요.

```sh
├── package.json                ⟵ contains `dependencies` for contract and `devDependencies` for workspaces-js tests
├── src
│  └── index.js                 ⟵ contract code
├── node_modules
└── integration-tests           ⟵ integration test directory
   └── tests.js                 ⟵ integration test file
```

이 프로젝트 내 `package.json`의 샘플 구성은 다음과 같습니다.

```json
{
  "name": "simple-example",
  "version": "0.1.0",
  "description": "Simple json file example",
  "main": "index.js",
  "type": "module",
  "license": "MIT",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "build": "near-sdk-js build",
    "test": "ava"
  },
  "dependencies": {
    "near-sdk-js": "0.6.0"
  },
  "devDependencies": {
    "ava": "^4.3.3",
    "near-workspaces": "^3.2.2"
  },
  "ava": {
    "files": [
      "test/**/*.ava.js"
    ],
    "require": [],
    "failFast": false,
    "timeout": "2m",
    "failWithoutAssertions": true,
    "environmentVariables": {},
    "verbose": true,
    "nodeArguments": []
  }
}
```

위의 `tests.js` 파일에는 통합 테스트가 포함됩니다. 이는 테스트 `package.json` 파일과 동일한 수준에서 다음 명령으로 실행할 수 있습니다.

    npm test

<!-- TODO: add snippets of code, living everywhere spread across docs -->