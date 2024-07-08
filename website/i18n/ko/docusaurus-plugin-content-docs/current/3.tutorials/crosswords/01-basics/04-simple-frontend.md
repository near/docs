---
sidebar_position: 5
sidebar_label: "간단한 프론트엔드 추가"
title: "정답의 해시를 확인하는 간단한 프론트엔트를 십자말 풀이 퍼즐에 추가"
---

import {Github} from "@site/src/components/codetabs"

import nearReactFriends from '/docs/assets/crosswords/near-and-react--dakila.near--rodolf_dtbbx.png';

# 간단한 프론트엔드 추가

여기에서는 React를 사용하여 간단한 프론트엔드를 추가하고, [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)를 사용하여 스마트 컨트랙트와 통신할 것입니다.

<figure>
    <img src={nearReactFriends} alt="NEAR과 React라는 두 문자가 어울립니다. dakila.near 그림" width="600"/>
    <figcaption>Dynamic duo of NEAR as the backend and React as a frontend.<br/>Art by <a href="https://twitter.com/rodolf_dtbbx" target="_blank" rel="noopener noreferrer">dakila.near</a></figcaption>
</figure>

<br/>

우리가 작업할 세 가지 주요 파일은 다음과 같습니다.
1. `src/index.js`: NEAR 네트워크 구성이 설정되고 `get_solution`으로의 보기 전용 호출이 발생하는 진입점이 됩니다.
2. `src/App.js`: 그런 다음 호출되어 십자말풀이 테이블을 설정하고 정답을 찾았는지 확인합니다.
3. `src/utils.js`: 정답 및 기타 헬퍼 함수를 얻기 위해 블록체인에 대한 보기 전용 호출을 만드는 데 사용됩니다.

## 진입점

We'll go over a pattern that may look familiar to folks who have surveyed the [NEAR examples site](https://github.com/near-examples). 원하는 로직을 설정하는 비동기 JavaScript 함수로 시작한 다음, 이를 React 앱에 전달할 것입니다.

<Github language="js" start="3" end="22" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/index.js" />

Let's talk through the code above, starting with the imports.

We import from:

- `config.js`: 현재 일반적인 패턴입니다. 이 파일에는 다양한 네트워크에 대한 세부 정보가 포함되어 있습니다. (적중할 RPC 엔드포인트, 리디렉션할 NEAR Wallet 사이트, NEAR 익스플로러...)
- `utils.js`: 사람이 십자말풀이를 올바르게 완료했을 때, 올바른 정답 해시를 검색하기 위해 호출하는 보기 전용 함수 `get_solution`를 호출하기 위함입니다.
- `hardcoded-data.js`: 십자말풀이 퍼즐 단서에 대한 정보가 포함된 파일입니다. 이 챕터에서는 정답이 **near nomicon ref finance**인 십자말풀이 퍼즐을 다루었으며, 챕터 개요에서 이야기한 대로 우리는 *하나의* 퍼즐을 제공하기로 약속했습니다. 나중에 스마트 컨트랙트를 개선하여 여러 십자말풀이 퍼즐을 허용할 것이지만, 지금은 이 부분이 하드코딩되어 있습니다.

Next, we define an asynchronous function called `initCrossword` that will be called before passing data to the React app. It's often useful to set up a connection with the blockchain here, but in our case all we need to do is retrieve the crossword puzzle solution as a hash. Note that we're attempting to pass this environment variable `NEAR_ENV` into our configuration file. `NEAR_ENV` is used to designate the blockchain network (testnet, betanet, mainnet) and is also [used in NEAR CLI](../../../2.build/2.smart-contracts/release/deploy.md).

Lastly, we'll call `initCrossword` and, when everything is complete, pass data to the React app contained in `App.js`.

## React 앱

Here's a large portion of the `App.js` file, which will make use of a fork of a React crossword library by Jared Reisinger.

<Github language="js" start="3" end="54" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/App.js" />

위 코드의 몇 가지 핵심 사항에 대해 논의할 것이지만, 여기서는 블록체인에 대한 프론트엔드 연결에 초점을 맞추기 위해 라이브러리 관련 다른 부분은 건너뛸 것입니다.

짚고 넘어가야 할 두 가지 import는 다음과 같습니다.

- 곧 다룰 유틸리티 파일 내 `parseSolutionSeedPhrase`. 이를 가져오면(import), 사용자가 입력한 정답을 가져와 [챕터 개요](00-overview.md#how-it-works)에서 설명한 규칙에 따라 올바른 순서로 배치합니다.
- `sha256`은 위에서 순서 정리된 답을 가져와 해시합니다. 그런 다음 해당 해시를 스마트 컨트랙트에서 검색된 해시와 비교합니다.

```js
const [solutionFound, setSolutionFound] = useState(false);
```

우리는 여기서 [React Hooks](https://reactjs.org/docs/hooks-state.html)를 사용하여 십자말풀이 플레이어가 십자말풀이의 마지막 문자를 입력할 때 변경될 `solutionFound` 변수를 설정합니다. 또한 이는 보드의 모든 문자에 대한 항목을 가지고 있습니다.

`onCrosswordComplete`와 `` checkSolution` ``코드 블록은 이벤트를 발생시켜 사용자가 입력한 최종 답변을 확인하고, 해시한 후 이전에 `index.js` 내 보기 전용 호출에서 전달된 정답 `solutionHash`와 비교합니다.

마지막으로 앱용 [JSX](https://reactjs.org/docs/introducing-jsx.html)를 반환하고 십자말풀이 퍼즐을 렌더링합니다! 이 기본 케이스에서는 사용자가 퍼즐을 성공적으로 완료했을 때를 나타내도록 제목을 변경합니다.

```html
<h3>Status: { solutionFound }</h3>
```

## 유틸리티 함수

여기서는 두 가지 유틸리티 함수를 사용합니다.

- `parseSolutionSeedPhrase`: 완성된 십자말풀이를 가지고 답을 적절한 순서로 배치합니다. (숫자로 오름차순, 가로 답이 세로 답보다 먼저 오도록)
- `viewMethodOnContract`: 정답 해시를 검색하기 위해 스마트 컨트랙트에 대한 보기 전용 호출을 만듭니다.

두 번째 메서드에만 집중하겠습니다.

<Github language="js" start="8" end="12" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/utils.js" />

이 API는 아직 따뜻하고 친근해 보이지 않습니다. 맞습니다! [이 문제에 자세히 설명된 대로](https://github.com/near/near-api-js/issues/612) API를 개선하는 데 도움을 주면 좋겠지만, 현재로서는 이것이 보기 전용 메서드에서 데이터를 가져오는 간결한 방법입니다.

우리는 아직 프로젝트에 대한 변경 가능한 메서드를 프론트엔드에서 호출하지 않았습니다. 우리는 다음 챕터에서 퍼즐을 푸는 첫 번째 사람에게 상금을 보낼 때 이에 대해 다룰 것입니다.

## React 앱 작동

테스트넷에서 프론트엔드를 실행해 봅시다! We won't add any new concepts at this point in the chapter, but note that the [near examples](https://github.com/near-examples) typically create an account for you automatically with a NodeJS command. 하위 계정(subaccount)을 만들고 여기에 스마트 컨트랙트를 배포하는 중요한 패턴을 다루었기 때문에, 프론트엔드를 시작할 때도 해당 패턴을 고수하겠습니다.

```bash
# Go into the directory containing the Rust smart contract we've been working on
cd contract

# Build
cargo near build

# Create fresh account if you wish, which is good practice
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy
cargo near deploy crossword.friend.testnet with-init-call new json-args '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send

# Return to the project root and start the React app
cd ..
env CONTRACT_NAME=crossword.friend.testnet npm run start
```

마지막 줄은 환경 변수 `CONTRACT_NAME`를 NodeJS 스크립트로 보냅니다. 이는 컨트랙트 계정 및 네트워크 구성을 설정하는 데 사용되는 `config.js` 파일에서 선택됩니다.

<Github language="js" start="1" end="2" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/config.js" />

React 앱을 시작하기 위해 마지막 명령을 실행하면 `https://localhost:1234`와 같은 로컬 웹 사이트에 대한 링크가 제공됩니다. 사이트를 방문하면 스마트 컨트랙트와 상호 작용하는 간단한 프론트엔드를 볼 수 있습니다.

![오른쪽 사이드바에 단서가 있는 작성된 퍼즐을 보여주는 십자말풀이 퍼즐 프론트엔드](/docs/assets/crosswords/basics-final-frontend.png)

Again, the full code for this chapter is [available here](https://github.com/near-examples/crossword-tutorial-chapter-1).
