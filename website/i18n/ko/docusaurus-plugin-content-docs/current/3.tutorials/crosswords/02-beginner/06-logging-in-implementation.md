---
sidebar_position: 6
sidebar_label: "액세스 키 및 로그인 2/2"
title: "로그인 버튼 구현"
---

import loggingIn from '/docs/assets/crosswords/logging-in.png';
import explorerTransfer from '/docs/assets/crosswords/chapter-2-explorer-transfer.jpg';

# 로그인 기능 추가

## 계획

NEAR로 로그인할 때, `near-api-js`를 사용하는 로그인 버튼을 추가할 예정입니다.

다음은 로그인 워크플로우입니다.

<img src={loggingIn} alt="로그인하기 위한 세 단계. 1. 로그인 버튼을 클릭합니다. 2. 브라우저 로컬 스토리지에 개인 키를 생성합니다. 3. 서명하는 NEAR Wallet으로 리디렉션되어 새 키를 만듭니다" /><br/><br/>

1. 사용자가 로그인 버튼을 클릭합니다.
2. `near-api-js`가 브라우저에서 개인 키를 생성합니다.
3. 공용 키를 전달하는 NEAR Wallet으로 리디렉션됩니다. NEAR Wallet에는 `AddKey` Action이 가능한 전체 액세스 키가 있습니다. 사용자는 이를 따라 궁극적으로 새 키 생성을 승인합니다.

## 버튼 추가

`src` 디렉토리에서 다음을 확인할 것입니다:

- `index.js`
- `App.js`

우리는 모든 변경 사항을 검토하지 않고 대신 새로운 로직을 작성할 것입니다.

먼저 JavaScript 라이브러리에서 `WalletConnection` 객체를 설정합니다.

```js reference
https://github.com/near-examples/crossword-tutorial-chapter-2/blob/1d64bf29c3376a18c71e5c5a075e29824d7a55f5/src/index.js#L12-L20
```

그런 다음 이는 React에서 사용됩니다.

```js
const signIn = () => {
  walletConnection.requestSignIn(
    nearConfig.contractName,
    '', // title. Optional, by the way
    '', // successUrl. Optional, by the way
    '', // failureUrl. Optional, by the way
  );
};

const signOut = () => {
  walletConnection.signOut();
  …
};

…

return (
  <div id="page">
    <h1>NEAR Crossword Puzzle</h1>
    <div id="crossword-wrapper">
      <div id="login">
        { currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </div>
      …
    </div>
  </div>
);
```

로그인하면 해당 `WalletConnection` 객체는 로그인한 사용자와 연결되며, 해당 키를 사용하여 트랜잭션에 서명하고 컨트랙트와 상호 작용합니다.

:::info NEAR 지갑으로 리디렉션되는 트랜잭션 개선된 십자말풀이 퍼즐에 로그인한 사용자의 함수 호출 액세스 키는 정답을 제출하기 위해 트랜잭션에 서명하는 데에 사용됩니다.

그러나, NEAR 지갑으로 리디렉션되는 경우도 있고 그렇지 않은 경우도 있습니다.

이는 우리가 언급한 이전 규칙으로 되돌아갑니다: 함수 호출 액세스 키는 NEAR를 전송할 수 없습니다. 그들은 `Transfer` Action을 수행할 수 없습니다.

함수 호출에 1 yoctoNEAR라도 필요한 경우, 트랜잭션에 서명하려면 NEAR 지갑(또는 전체 액세스 키가 포함된 다른 지갑)이 필요합니다. :::

## JavaScript에서 컨트랙트 함수 호출

프론트엔드 코드에는 사용자가 십자말풀이 퍼즐을 성공적으로 완료했는지 확인하는 검사가 포함되어 있습니다. 여기에 스마트 컨트랙트의 `submit_solution` 함수를 호출하는 로직을 추가합니다.

```js
// Send the 5 NEAR prize to the logged-in winner
let functionCallResult = await walletConnection.account().functionCall({
  contractId: nearConfig.contractName,
  methodName: 'submit_solution',
  args: {solution: seedPhrase, memo: "Yay I won!"},
  gas: DEFAULT_FUNCTION_CALL_GAS, // optional param, by the way
  attachedDeposit: 0,
  walletMeta: '', // optional param, by the way
  walletCallbackUrl: '' // optional param, by the way
});

if (functionCallResult && functionCallResult.transaction && functionCallResult.transaction.hash) {
  // Display a link the NEAR Explorer
  console.log('Transaction hash for explorer', functionCallResult.transaction.hash)
}
```

:::tip TRY…CATCH 블록 블록체인에서 발생하는 오류를 적절하게 처리하기 위해 이러한 유형의 호출을 try…catch 블록으로 래핑하는 것은 나쁜 생각이 아닙니다.

이러한 오류는 개발자와 최종 사용자에게 매우 유용할 수 있습니다. :::

## 퍼즐 가져오기, 마무리

이전 챕터에서 프론트엔드는 간단한 십자말풀이 퍼즐의 단서에 대한 정보가 포함된 하드코딩된 파일을 가지고 있었습니다. 이 챕터에서 단서에 대한 좌표와 세부 정보를 제공했지만, 프론트엔드는 이 정보를 가져와야 합니다.

이제 컨트랙트 내 `get_unsolved_puzzles`에 대한 보기 전용 호출을 둘러싼 로직을 수정할 것입니다. 이 메서드는 단서 정보를 반환하므로, React가 십자말풀이 퍼즐을 구성할 수 있도록 적절한 형식으로 입력값을 받는 함수를 구현했습니다.

이것은 Rust 스마트 컨트랙트 개발에 대한 튜토리얼이므로, 이에 대한 세부 사항에 초점을 맞추지 않겠지만, `mungeBlockchainCrossword` 함수를 추가했음을 알아두도록 하세요. 이를 통해 맞춤형 십자말풀이 퍼즐을 계속 추가하고, 프론트엔드를 동적으로 만들 수 있습니다.

또한 사용할 수 있는 퍼즐이 없을 때를 위한 페이지를 추가하고, 로딩 화면을 추가하는 것과 같은 다른 사소한 변경 사항을 적용할 것입니다.

## React 앱 작동

이 가이드를 잘 따랐다면, 다음과 같이 React 앱을 시작하기만 하면 됩니다.

    env CONTRACT_NAME=crossword.friend.testnet npm run start

도움을 드리기 위해 다시 이야기하자면, 아래에는 하위 계정(sub-account)을 다시 만들고, 컨트랙트를 구축하고, 하위 계정을 배포하며, 컨트랙트에서 메서드를 호출하는 데 필요한 단계가 나와 있습니다.

```bash
# Go into the directory containing the Rust smart contract we've been working on
cd contract

# Build (for Windows it's build.bat)
./build.sh

# Create fresh account if you wish, which is good practice
near delete crossword.friend.testnet friend.testnet
near create-account crossword.friend.testnet --masterAccount friend.testnet

# Deploy
near deploy crossword.friend.testnet --wasmFile res/crossword_tutorial_chapter_2.wasm --initFunction new --initArgs '{"owner_id": "crossword.friend.testnet"}'
# Add the crossword puzzle
near call crossword.friend.testnet new_puzzle '{"solution_hash":"d1a5cf9ad1adefe0528f7d31866cf901e665745ff172b96892693769ad284010","answers":[{"num": 1,"start": {"x": 1,"y": 1},"direction": "Down","length": 5,"clue": "NFT market on NEAR that specializes in cards and comics."},{"num": 2,"start": {"x": 0,"y": 2},"direction": "Across","length": 13,"clue": "You can move assets between NEAR and different chains, including Ethereum, by visiting ______.app"},{"num": 3,"start": {"x": 9,"y": 1},"direction": "Down","length": 8,"clue": "NFT market on NEAR with art, physical items, tickets, and more."},{"num": 4,"start": {"x": 3,"y": 8},"direction": "Across","length": 9,"clue": "The smallest denomination of the native token on NEAR."},{"num": 5,"start": {"x": 5,"y": 8},"direction": "Down","length": 3,"clue": "You typically deploy a smart contract with the NEAR ___ tool."}]}' --accountId crossword.friend.testnet

# Return to the project root and start the React app
cd ..
env CONTRACT_NAME=crossword.friend.testnet npm run start
```

## 재미를 위해

재미로 React 프론트엔드 및 CLI를 사용하여 스마트 컨트랙트와 상호 작용해 보세요. CLI를 사용하여 퍼즐의 상태를 확인하고 프론트엔드로 퍼즐을 푼 다음 상태를 다시 확인할 수 있습니다.

퍼즐을 풀기 전후에 다음 명령을 실행합니다.

```bash
    near view crossword.friend.testnet get_puzzle_status '{"solution_hash": "d1a5cf9ad1adefe0528f7d31866cf901e665745ff172b96892693769ad284010"}'
```

이는 우리의 열거형(Enums) `PuzzleStatus`을 반환할 것입니다. 퍼즐을 풀기 전에는, 다음을 출력해야 합니다.

```json
    'Unsolved'
```

그리고 푼 다음에는:

```json
    { Solved: { memo: 'Yay I won!' } }
```

십자말풀이 퍼즐을 풀고 나면, NEAR 익스플로러에 대한 링크가 포함된 화면이 표시되어 트랜잭션 세부 정보를 볼 수 있습니다. 거기에 `Transfer` Action이 있음을 주목하세요:

<figure>
    <img src={explorerTransfer} alt="트랜잭션에서 5 NEAR가 mike.testnet으로 전송되는 위치를 강조 표시하는 NEAR 익스플로러의 스크린샷
"/>
</figure>

<br/>

---

이번 챕터는 여기까지입니다! 참고로, 전체 코드는 다음에서 확인할 수 있습니다.

https://github.com/near-examples/crossword-tutorial-chapter-2
