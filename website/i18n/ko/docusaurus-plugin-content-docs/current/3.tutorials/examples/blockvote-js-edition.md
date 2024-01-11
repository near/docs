---
id: blockvote-js
sidebar_label: BlockVote JS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"


# BlockVote JS 에디션

BlockVote JS Edition은 Near Protocol 블록체인에서 JavaScript를 사용하여 구축된 블록체인 기반 투표 애플리케이션입니다. 이 애플리케이션을 통해 사용자는 선거에서 안전하게 투표하고 결과를 블록체인에 기록하여 투명하고 변경될 수 없도록 할 수 있습니다.

![image](/docs/assets/blockvote.png)

## 설치

BlockVote JS Edition을 설치하려면 다음 단계를 따르세요:

1. 다음 명령을 사용하여 로컬 시스템에 레퍼지토리를 복제합니다:

```bash
git clone https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial.git
```

2. 프로젝트 디렉토리로 이동합니다:

```bash
cd BlockVote-JS-Edition-Tutorial
```

3. 다음 명령을 사용하여 필요한 의존성을 설치합니다:

```bash
yarn install-deps
```

4. 애플리케이션을 시작합니다:

```bash
yarn start
```

:::note

`yarn`이 설치되어 있지 않은 경우에는 `npm install -g yarn`을 실행하여 설치할 수 있습니다.

:::

## 사용법

이 애플리케이션을 사용하면 두 명의 후보자가 있는 의견조사를 작성할 수 있으며 각 사용자는 한 번만 의견조사에 투표할 수 있습니다. 결과는 투표 후에 표시됩니다.

투표를 생성하려면 다음 단계를 수행합니다:

1. 두 후보의 이름과 URL 링크를 입력 필드에 입력합니다.
2. "투표 생성 단추"를 눌러 의견조사를 작성합니다.
3. 다른 사용자가 투표할 수 있도록 다른 사용자와 투표 링크를 공유합니다.

투표하려면 다음 단계를 수행합니다:

1. 투표할 후보자의 이름을 클릭합니다.
2. 각 투표에서 한 번만 투표할 수 있습니다.
3. 투표 후, 투표 결과가 화면에 표시됩니다.

이게 전부입니다! BlockVote JS Edition을 사용하는 동안 질문이나 문제가 있으면 [프로젝트의 GitHub 페이지](https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial)에서 이슈를 열어 보세요.

## 스마트 컨트랙트

컨트랙트에는 사용자가 컨트랙트와 상호 작용할 수 있는 다음과 같은 몇 가지 view 및 호출 방법이 포함되어 있습니다:

### View 메서드

- `getUrl`: 후보의 이름과 프롬프트를 기준으로 특정 후보의 URL 링크를 검색합니다.
- `didParticipate`: 특정 사용자가 지정된 프롬프트에 참여했는지 확인합니다.
- `participateArray`: 지정된 프롬프트에 참여한 사용자의 목록을 검색합니다.
- `getAllPrompts`: 컨트랙트에서 현재 사용 가능한 모든 프롬프트 목록을 검색합니다.
- `getVotes`: 특정 프롬프트에 대한 투표 집계를 검색합니다.
- `getCandidatePair`: `getCandidatePair`:

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial/blob/main/contract/src/contract.ts"
            start="20" end="60" />
  </Language>
</CodeTabs>

### Call 메서드

- `addCandidatePair`: 컨트랙트 내 정렬되지 않은 후보 쌍 맵에 특정 프롬프트에 대한 후보 쌍을 추가합니다.
- `initializeVotes`: 특정 프롬프트에 대한 투표 집계를 초기화합니다.
- `addToPromptArray`: 컨트랙트 내 순서가 지정되지 않은 프롬프트 집합에 프롬프트를 추가합니다
- `clearPromptArray`: 컨트랙트 내 모든 프롬프트 및 관련 데이터(후보 쌍, 투표 집계 및 사용자 참여)를 지웁니다
- `addVote`: 컨트랙트 내 정렬되지 않은 투표 집계 맵에서 해당 후보에 대한 투표 집계를 업데이트하여 신속하게 특정 후보에게 투표합니다. 해당 메서드는 후보자의 프롬프트와 인덱스를 받아들입니다.
- `recordUser`: 사용자의 계정 ID를 컨트랙트 내 사용자 참여 맵 배열에 추가하여 특정 프롬프트에서 사용자의 참여를 기록합니다.

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial/blob/main/contract/src/contract.ts"
            start="61" end="110" />
  </Language>
</CodeTabs>

## 테스트

스마트 컨트랙트를 작성할 때는 모든 메서드를 철저히 테스트하는 것이 매우 중요합니다. 이 프로젝트에서는 단위 테스트와 통합 테스트의 두 가지 테스트 유형이 있습니다. 이를 조사하기 전에 `yarn test` 명령을 통해 dApp에 있는 테스트를 실행하는 것이 중요합니다.

### 단위 테스트(Unit Test)

단위 테스트는 스마트 컨트랙트의 개별 함수와 메서드를 테스트하기 위해 설계되었습니다. 이러한 테스트는 시스템의 다른 구성 요소와 상호 작용하지 않고 독립적으로 실행됩니다. 단위 테스트의 목적은 각 개별 함수 또는 메서드가 예상대로 작동하는지 확인하는 것입니다.

이 프로젝트에서는 `yarn test:unit` 명령을 실행하여 단위 테스트를 실행할 수 있습니다.

### 통합 테스트(Integration Test)

이러한 테스트는 시스템의 여러 구성 요소가 예상대로 함께 작동하는지 확인하기 위해 실행됩니다. 스마트 컨트랙트의 맥락에서, 통합 테스트는 컨트랙트와 블록체인 간의 상호 작용을 테스트하는 데 사용됩니다.

이 프로젝트에서는 `yarn test` 명령을 실행하여 통합 테스트를 실행할 수 있습니다.

이 테스트는 `Ava` 및 `near-workspaces`의 조합을 사용합니다.

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial/blob/main/integration-tests/src/main.ava.ts"
            start="6" end="92" />
  </Language>
</CodeTabs>
