---
id: basics
title: "기본 지침"
---

# 기본 지침
스마트 컨트랙트의 릴리스 버전을 컴파일하려면 빌드 스크립트를 실행할 수 있습니다. (프로젝트 내 `package.json`에 `{ build: near-sdk-js build, ... }`로 지정됨):

```bash
npm run build
```

위 `build` 명령은 `/src`에서 `index.js` 파일을 찾아 `/src`와 같은 디렉토리에서 새로 생성된 `/build` 폴더로 `contract.wasm` 파일을 출력합니다. 자세한 내용은 [여기에서 CLI 명령의 소스 코드](https://github.com/near/near-sdk-js/blob/2a51b6c6233c935c7957b91818cfe6f9c3073d71/packages/near-sdk-js/src/cli/cli.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L28-L36)를 참고하세요.
:::

<!-- TODO: custom build commands using CLI -->
