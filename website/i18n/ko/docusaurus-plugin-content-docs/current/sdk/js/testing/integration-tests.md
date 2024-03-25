---
sidebar_position: 2
---

# 통합 테스트(Integration Test)

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