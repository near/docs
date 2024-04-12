---
id: bos-loader
title: BOS Loader
---

# BOS Loader

이 글에서는 CLI 도구를 사용하여 BOS 컴포넌트를 개발, 테스트 및 배포하는 방법을 배웁니다. 이 워크플로우를 사용하여 BOS에 컴포넌트를 계속 배포하면서 공동 작업, 풀 리퀘스트 및 기타 GitHub의 이점을 활용할 수 있습니다.

[BOS 컴포넌트 로더](https://github.com/near/bos-loader)는 컴포넌트 파일의 로컬 디렉토리를 BOS `redirectMap`에 연결할 수 있도록 적절하게 형식이 지정된 JSON 페이로드로 제공됩니다. 이 로더를 호출하도록 구성된 뷰어와 페어링하면 로컬 컴포넌트 개발이 가능합니다.

## 개발 흐름

1. _(Optional)_ Download and install [`bos` CLI](https://bos.cli.rs).

   :::info You need `bos` CLI if you have component code on the BOS already that you want to use or if you want to manage component deploys locally instead of the GitHub actions CI/CD.
   :::

2. To get component code saved on the BOS, use `bos` to download the source code. 그렇지 않으면 `src` 폴더를 만듭니다.

3. 해당 src 폴더 내에 `src/<component name>.jsx` 와 같이 컴포넌트를 생성합니다.

   :::tip 네임스페이스에 `.`으로 구분된 컴포넌트 이름을 사용하는 것이 일반적입니다. 더 나은 파일 구성을 하려면, 폴더 이름으로 처리할 수 있습니다.

   예를 들면 `AppName.Component` → `AppName/Component.jsx`.
   :::

4. [BOS 컴포넌트 로더](https://github.com/near/bos-loader/releases) (`bos-loader`)를 다운로드하고 설치합니다.

5. `bos-loader <youraccount.near> --path src`를 실행합니다(또는 `src` 폴더에서 실행).

6. https://near.org/flags를 열고 로더 URL을 `http://127.0.0.1:3030`로 설정합니다.

7. `https://near.org/<youraccount.near>/widget/<component name>`를 엽니다(대소문자 구분).

   :::info `testnet`에서 테스팅 중이라면, 테스트넷 계정을 사용해서 https://test.near.org를 대신 여세요.

   `bos-loader <youraccount.testnet> --path src`를 로컬에서 동작시키고, https://test.near.org/flags 내 로더 URL을 설정한 후 `https://test.near.org/<youraccount.testnet>/widget/<component name>`를 열어 로컬에서 컴포넌트를 확인하세요.
   :::

   :::tip
   여러 컴포넌트를 래퍼 컴포넌트에 포함하여 한 번에 작업할 수 있습니다.
   :::

8. 컴포넌트의 코드를 변경합니다.

   :::info
   변경 사항을 보려면 브라우저의 웹 페이지를 새로 고쳐야 합니다.
   :::

9. 완료되면 배너의 <kbd>X</kbd>를 사용하여 로컬 로드를 중지합니다.

## 컴포넌트 배포

이제 새 컴포넌트를 배포할 준비가 되었습니다. 배포하려면 다음 두 경로 중 하나를 사용할 수 있습니다.

- Use `bos` CLI to deploy from command line:

  ```
  bos deploy
  ```

- [GitHub Actions](https://github.com/FroVolod/bos-cli-rs/blob/master/README.md#reusable-workflow) 배포 워크플로우를 설정합니다. 이에 대한 설명은 [이 문서](https://github.com/FroVolod/bos-cli-rs/blob/master/README.md#github-actions)를 확인하세요.

이제 검색에서 컴포넌트를 볼 수 있어야 합니다. Happy Hacking!
