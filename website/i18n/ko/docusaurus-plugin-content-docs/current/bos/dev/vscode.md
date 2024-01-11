---
id: vscode
title: VS Code 익스텐션
---

# NEAR BOS IDE

Visual Studio Code를 사용하여 [NEAR BOS](https://near.org) 용 [컴포넌트](../components/home.md)를 개발하는 데 도움이 되는 VS Code 익스텐션입니다.

## 특징

- BOS에서 위젯 검색
- 코드 변경 및 로컬에서 변경 사항 미리 보기
- NEAR 블록체인에 직접 퍼블리싱
- vscode 디버그 콘솔에서 위젯 로그 보기

![익스텐션 개요](/docs/vscode/extension.jpeg)

## 사용 방법

확장 프로그램을 설치하면 이름이 지정된 새 섹션이 **`Near BOS`** 익스플로러에 추가됩니다.

1. 워크스페이스를 시작합니다.

   ![설치됨](/docs/vscode/installed.png)

2. `Choose your working folder` 버튼을 사용하여 작업 디렉토리를 선택합니다.

2. 위젯 검색, 미리 보기 및 개발

   `Login& & Fetch Widgets`를 사용하여 NEAR 계정에 로그인하고 컴포넌트를 가져오거나 `Fetch Account Widgets`를 통해 NEAR BOS의 모든 계정에서 컴포넌트를 가져옵니다.

   익스플로러를 사용하여 파일을 열고 `Preview` 버튼을 클릭하여 변경 사항을 미리 봅니다.

   ![미리보기](/docs/vscode/features.png)

:::info
미리보기는 자동으로 다시 로드되지 않으므로 `preview` 버튼을 다시 눌러야 합니다.
:::

3. `Publish` 버튼을 눌러 BOS에 위젯을 저장하세요.

:::tip
`OUTPUT` 채널의 `Widget` 탭에서 `console.log`를 찾을 수 있습니다.
:::
