---
sidebar_position: 4
sidebar_label: "퍼즐 추가"
title: "퍼즐을 추가하여, 여러 십자말풀이 퍼즐을 포함한 컬렉션을 사용"
---

import blankCrossword from '/docs/assets/crosswords/chapter-2-crossword-blank.png';
import teachingDeployment from '/docs/assets/crosswords/teaching-just-teacher--herogranada.near--GranadaHero.jpeg';
import recreatingSubaccount from '/docs/assets/crosswords/erase-recreate-subaccount--3one9.near--3one92.gif';

# 퍼즐 추가

우리는 새로운 퍼즐을 만들 것입니다. 즉, 스마트 컨트랙트에 일련의 단서와 답에 대한 정보를 제공해야 합니다.

물론 우리는 스마트 컨트랙트에 *답* 을 보내지 않을 것입니다. 만약 답을 보낸다면, 모든 사람이 볼 수 있기 때문입니다. 그러나 다음과 같은 것들을 포함하여 각 단서에 대한 세부 정보를 보냅니다.

- 단서 번호
- 가로인지 세로인지
- 좌표(x와 y 값)
- 단서의 길이 (몇 글자인지)

기본적으로 다음과 같이 빈 퍼즐에 대한 충분한 정보를 스마트 컨트랙트에 알려줄 것입니다.

<img src={blankCrossword} alt="십자말풀이 퍼즐 스마트 컨트랙트 튜토리얼 2장의 빈 십자말풀이" width="600" />
<br/>

(위의 스크린샷에는 사람이 읽을 수 있는 단서가 표시되어 있지 않지만, 앞으로 제공할 것입니다.)

## 구축 및 배포

첫 번째 챕터에서 배운 것과 동일한 단계를 사용합시다.

<figure>
    <img src={teachingDeployment} alt="선생님은 스마트 컨트랙트를 적절하게 배포하는 방법에 대한 지침이 있는 칠판을 보여줍니다. 1. 컨트랙트 구축. 2. 하위 계정 만들기(또는 계정이 있는 경우 삭제하고 다시 만들기) 3. 하위 계정에 배포 4. 4. 상호작용 herogranada.near 그림" width="600"/>
    <figcaption>Art by <a href="https://twitter.com/GranadaHero" target="_blank" rel="noopener noreferrer">herogranada.near</a></figcaption>
</figure>

<br/>

Navigate to the `contract` directory, then run:

```bash
cargo near build
```

이전 챕터에 이어서 하는 경우, 이미 생성된 하위 계정(sub-account)이 있을 수 있습니다. 시연을 위해 하위 계정(컨트랙트를 배포하는 위치) `crossword.friend.testnet`을 호출하므로, 상위 계정은 `friend.testnet`입니다.

하위 계정을 삭제하고 다시 만들어 빈 슬레이트에서 시작하겠습니다.

<figure>
    <img src={recreatingSubaccount} alt="컴퓨터가 crossword.friend.testnet 계정을 삭제하고 다시 쓰는 외계인의 애니메이션. 3one9.near 그림" width="600"/>
    <figcaption>Art by <a href="https://twitter.com/3one92" target="_blank" rel="noopener noreferrer">3one9.near</a></figcaption>
</figure>

<br/>

NEAR CLI를 사용하여 하위 계정을 삭제하고 다시 만드는 방법은 다음과 같습니다.

```bash
# Delete the subaccount and send remaining balance to friend.testnet
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

# Create the subaccount again
near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy, calling the "new" method with the parameter for owner_id
cargo near deploy crossword.friend.testnet with-init-call new json-args '{"owner_id": "crossword.friend.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send
```

이제 우리는 새로운 십자말풀이 퍼즐을 구성하고 `new_puzzle` 메서드를 통해 퍼즐을 추가할 준비가 되었습니다. 이 새로운 퍼즐의 단서부터 시작하겠습니다.

## 단서

개선된 퍼즐을 위해 아래 단서를 사용할 것입니다. **답** 열은 우리가 `new_puzzle`을 호출할 때 스마트 컨트랙트로 전송되지 않습니다.

| 숫자 | 정답            | 단서                                                        | (x, y) 좌표 | 길이 |
| -- | ------------- | --------------------------------------------------------- | --------- | -- |
| 1  | paras         | 카드와 만화에 특화된 NEAR의 NFT 마켓플레이스입니다.                          | (1, 1)    | 5  |
| 2  | rainbowbridge | ______.app을 방문하여 NEAR와 이더리움을 포함한 다른 체인 간에 자산을 이동할 수 있습니다. | (0, 2)    | 13 |
| 3  | mintbase      | 예술품, 실물 아이템, 티켓 등이 있는 NEAR의 NFT 마켓플레이스입니다.                | (9, 1)    | 8  |
| 4  | yoctonear     | NEAR에 있는 네이티브 토큰의 가장 작은 단위입니다.                            | (3, 8)    | 9  |
| 5  | cli           | 일반적으로 NEAR ___ 도구를 사용하여 스마트 컨트랙트를 배포합니다.                  | (5, 8)    | 3  |

x 및 y 좌표는 퍼즐 격자의 왼쪽 상단에 원점이 있다고 가정하며, 각 행과 열은 0에서 시작합니다.

## 정답 해시

정답 해시를 찾기 위해 [쉬운 온라인 도구](https://www.wolframalpha.com/input/?i=sha256+%22paras+rainbowbridge+mintbase+yoctonear+cli%22)(다른 많은 오프라인 도구들도 있음)를 사용하여 sha256 해시를 만들어 보겠습니다.

```
    d1a5cf9ad1adefe0528f7d31866cf901e665745ff172b96892693769ad284010
```

## 퍼즐 추가

이 긴 명령과 함께 NEAR CLI를 사용하여 새 퍼즐을 추가하고 `crossword.friend.testnet`을 당신의 하위 계정으로 바꿉니다.

```bash
near contract call-function as-transaction crossword.friend.testnet new_puzzle json-args '{
  "solution_hash": "d1a5cf9ad1adefe0528f7d31866cf901e665745ff172b96892693769ad284010",
  "answers": [
   {
     "num": 1,
     "start": {
       "x": 1,
       "y": 1
     },
     "direction": "Down",
     "length": 5,
     "clue": "NFT market on NEAR that specializes in cards and comics."
   },
   {
     "num": 2,
     "start": {
       "x": 0,
       "y": 2
     },
     "direction": "Across",
     "length": 13,
     "clue": "You can move assets between NEAR and different chains, including Ethereum, by visiting ______.app"
   },
   {
     "num": 3,
     "start": {
       "x": 9,
       "y": 1
     },
     "direction": "Down",
     "length": 8,
     "clue": "NFT market on NEAR with art, physical items, tickets, and more."
   },
   {
     "num": 4,
     "start": {
       "x": 3,
       "y": 8
     },
     "direction": "Across",
     "length": 9,
     "clue": "The smallest denomination of the native token on NEAR."
   },
   {
     "num": 5,
     "start": {
       "x": 5,
       "y": 8
     },
     "direction": "Down",
     "length": 3,
     "clue": "You typically deploy a smart contract with the NEAR ___ tool."
   }
  ]
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as crossword.friend.testnet network-config testnet sign-with-legacy-keychain send
```

컨트랙트 이름과 이것을 호출하는 계정은 모두 `crossword.friend.testnet`입니다. `new_puzzle`의 상단에 체크를 추가하여 전임자(predecessor)가 `owner_id`인지 확인했기 때문입니다.

이제 우리의 스마트 컨트랙트에는 이 두 번째 십자말풀이 퍼즐에 대한 정보가 있습니다.

프론트엔드에 로그인 버튼을 추가하고, 이를 진정으로 탈중앙화 앱(dApp)으로 바꾸는 방법을 살펴보겠습니다!
