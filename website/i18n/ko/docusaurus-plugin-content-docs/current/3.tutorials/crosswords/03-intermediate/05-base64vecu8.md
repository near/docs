---
sidebar_position: 6
sidebar_label: "Base64 매개변수, 마무리"
title: "새 십자말풀이 퍼즐 생성 시 Base64 인코딩된 인자 사용"
---

import {Github} from "@site/src/components/codetabs"

# 최종 수정

import base64Encode from '/docs/assets/crosswords/boop-base64-encode.gif';

`new_puzzle` 메서드를 약간 수정하고, 스마트 컨트랙트 작성자가 base64로 인코딩된 인자를 사용하는 방법을 보여드리겠습니다.

이전 챕터에서 우리는 모든 단서에 대한 매개 변수를 제공하는 `new_puzzle`을 호출하는 상당히 긴 NEAR CLI 명령을 사용했습니다. CLI에 이러한 긴 매개변수가 있으면 번거로울 수 있습니다. 작은따옴표나 큰따옴표를 이스케이프해야 하는 문제가 있을 수 있으며 각 운영 체제는 터미널 또는 명령 프롬프트에서 다른 형식을 원할 수 있습니다.

우리는 모든 인수를 base64로 인코딩된 문자열로 보낼 것이며, 이를 좀 더 간단하게 만들 것입니다. 이를 위해 [SDK에서 `Base64VecU8`](https://docs.rs/near-sdk/latest/near_sdk/json_types/struct.Base64VecU8.html)를 사용할 것입니다

:::note `Base64VecU8`는 바이너리 페이로드에 적합합니다. 우리가 하고 있는 것은 이치에 맞지만, `Base64VecU8` 바이너리 매개변수를 보낼 때 사용하는 것이 아마도 더 일반적이라는 점은 주목할 가치가 있습니다.

Read more [about it here](../../../2.build/2.smart-contracts/anatomy/serialization-interface.md). :::

먼저 예상되는 인자에 대한 구조체를 설정합니다.

<Github language="rust" start="103" end="108" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

Then we modify our `new_puzzle` method like so:

<Github language="rust" start="281" end="289" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

우리는 원하는 방법을 사용하여 원래 인수를 가져와 base64로 인코딩할 수 있습니다. 많은 온라인 도구, 터미널 명령 및 [Boop](https://boop.okat.best)과 같은 오픈 소스 애플리케이션이 있습니다.

우리는 다음을 복사할 것입니다:

```js
{
  "answer_pk": "ed25519:7PkKPmVUXcupA5oU8d6TbgyMwzFe8tPV6eV1KGwgo9xg",
  "dimensions": {
   "x": 11,
   "y": 10
  },
  "answers": [
   {
     "num": 1,
     "start": {
       "x": 0,
       "y": 1
     },
     "direction": "Across",
     "length": 12,
     "clue": "NEAR transactions are more ______ instead of atomic."
   },
   {
     "num": 2,
     "start": {
       "x": 6,
       "y": 0
     },
     "direction": "Down",
     "length": 7,
     "clue": "In a smart contract, when performing an Action, you use this in Rust."
   },
   {
     "num": 3,
     "start": {
       "x": 9,
       "y": 0
     },
     "direction": "Down",
     "length": 6,
     "clue": "In docs.rs when you search for the near-sdk crate, these items a considered a what: collections, env, json_types."
   },
   {
     "num": 4,
     "start": {
       "x": 1,
       "y": 1
     },
     "direction": "Down",
     "length": 10,
     "clue": "A series of words that can deterministically generate a private key."
   },
   {
     "num": 5,
     "start": {
       "x": 1,
       "y": 3
     },
     "direction": "Across",
     "length": 3,
     "clue": "When doing high-level cross-contract calls, we import this that ends in _contract. When calling ourselves in a callback, it is convention to call it THIS_self."
   },
   {
     "num": 6,
     "start": {
       "x": 0,
       "y": 8
     },
     "direction": "Across",
     "length": 8,
     "clue": "Use this to determine the execution outcome of a cross-contract call or Action."
   },
   {
     "num": 7,
     "start": {
       "x": 4,
       "y": 6
     },
     "direction": "Across",
     "length": 4,
     "clue": "You chain this syntax onto a promise in order to schedule a callback afterward."
   }
  ]
}
```

그리고 이를 base64로 인코딩합니다.

<figure>
    <img src={base64Encode} alt="Boop 프로그램으로 base64를 인코딩하는 매개 변수의 애니메이션 gif" width="600"/>
</figure>

<br/>

이제 이전과 마찬가지로 새로운 십자말풀이 퍼즐 컨트랙트를 구축하고 실행할 수 있습니다.

```bash
cargo near build

export NEAR_ACCT=crossword.friend.testnet
export PARENT_ACCT=friend.testnet

near account delete-account $NEAR_ACCT beneficiary $PARENT_ACCT network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself $NEAR_ACCT '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as $PARENT_ACCT network-config testnet sign-with-legacy-keychain send

cargo near deploy $NEAR_ACCT with-init-call new json-args '{"owner_id": "'$NEAR_ACCT'", "creator_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send

near contract call-function as-transaction $NEAR_ACCT new_puzzle json-args '{
  "args": "ewogICJhbnN3ZXJfcGsiOiAiZWQyNTUxOTo3UGtLUG1WVVhjdXBBNW9VOGQ2VGJneU13ekZlOHRQVjZlVjFLR3dnbzl4ZyIsCiAgImRpbWVuc2lvbnMiOiB7CiAgICJ4IjogMTEsCiAgICJ5IjogMTAKICB9LAogICJhbnN3ZXJzIjogWwogICB7CiAgICAgIm51bSI6IDEsCiAgICAgInN0YXJ0IjogewogICAgICAgIngiOiAwLAogICAgICAgInkiOiAxCiAgICAgfSwKICAgICAiZGlyZWN0aW9uIjogIkFjcm9zcyIsCiAgICAgImxlbmd0aCI6IDEyLAogICAgICJjbHVlIjogIk5FQVIgdHJhbnNhY3Rpb25zIGFyZSBtb3JlIF9fX19fXyBpbnN0ZWFkIG9mIGF0b21pYy4iCiAgIH0sCiAgIHsKICAgICAibnVtIjogMiwKICAgICAic3RhcnQiOiB7CiAgICAgICAieCI6IDYsCiAgICAgICAieSI6IDAKICAgICB9LAogICAgICJkaXJlY3Rpb24iOiAiRG93biIsCiAgICAgImxlbmd0aCI6IDcsCiAgICAgImNsdWUiOiAiSW4gYSBzbWFydCBjb250cmFjdCwgd2hlbiBwZXJmb3JtaW5nIGFuIEFjdGlvbiwgeW91IHVzZSB0aGlzIGluIFJ1c3QuIgogICB9LAogICB7CiAgICAgIm51bSI6IDMsCiAgICAgInN0YXJ0IjogewogICAgICAgIngiOiA5LAogICAgICAgInkiOiAwCiAgICAgfSwKICAgICAiZGlyZWN0aW9uIjogIkRvd24iLAogICAgICJsZW5ndGgiOiA2LAogICAgICJjbHVlIjogIkluIGRvY3MucnMgd2hlbiB5b3Ugc2VhcmNoIGZvciB0aGUgbmVhci1zZGsgY3JhdGUsIHRoZXNlIGl0ZW1zIGEgY29uc2lkZXJlZCBhIHdoYXQ6IGNvbGxlY3Rpb25zLCBlbnYsIGpzb25fdHlwZXMuIgogICB9LAogICB7CiAgICAgIm51bSI6IDQsCiAgICAgInN0YXJ0IjogewogICAgICAgIngiOiAxLAogICAgICAgInkiOiAxCiAgICAgfSwKICAgICAiZGlyZWN0aW9uIjogIkRvd24iLAogICAgICJsZW5ndGgiOiAxMCwKICAgICAiY2x1ZSI6ICJBIHNlcmllcyBvZiB3b3JkcyB0aGF0IGNhbiBkZXRlcm1pbmlzdGljYWxseSBnZW5lcmF0ZSBhIHByaXZhdGUga2V5LiIKICAgfSwKICAgewogICAgICJudW0iOiA1LAogICAgICJzdGFydCI6IHsKICAgICAgICJ4IjogMSwKICAgICAgICJ5IjogMwogICAgIH0sCiAgICAgImRpcmVjdGlvbiI6ICJBY3Jvc3MiLAogICAgICJsZW5ndGgiOiAzLAogICAgICJjbHVlIjogIldoZW4gZG9pbmcgaGlnaC1sZXZlbCBjcm9zcy1jb250cmFjdCBjYWxscywgd2UgaW1wb3J0IHRoaXMgdGhhdCBlbmRzIGluIF9jb250cmFjdC4gV2hlbiBjYWxsaW5nIG91cnNlbHZlcyBpbiBhIGNhbGxiYWNrLCBpdCBpcyBjb252ZW50aW9uIHRvIGNhbGwgaXQgVEhJU19zZWxmLiIKICAgfSwKICAgewogICAgICJudW0iOiA2LAogICAgICJzdGFydCI6IHsKICAgICAgICJ4IjogMCwKICAgICAgICJ5IjogOAogICAgIH0sCiAgICAgImRpcmVjdGlvbiI6ICJBY3Jvc3MiLAogICAgICJsZW5ndGgiOiA4LAogICAgICJjbHVlIjogIlVzZSB0aGlzIHRvIGRldGVybWluZSB0aGUgZXhlY3V0aW9uIG91dGNvbWUgb2YgYSBjcm9zcy1jb250cmFjdCBjYWxsIG9yIEFjdGlvbi4iCiAgIH0sCiAgIHsKICAgICAibnVtIjogNywKICAgICAic3RhcnQiOiB7CiAgICAgICAieCI6IDQsCiAgICAgICAieSI6IDYKICAgICB9LAogICAgICJkaXJlY3Rpb24iOiAiQWNyb3NzIiwKICAgICAibGVuZ3RoIjogNCwKICAgICAiY2x1ZSI6ICJZb3UgY2hhaW4gdGhpcyBzeW50YXggb250byBhIHByb21pc2UgaW4gb3JkZXIgdG8gc2NoZWR1bGUgYSBjYWxsYmFjayBhZnRlcndhcmQuIgogICB9CiAgXQp9"
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $NEAR_ACCT network-config testnet sign-with-legacy-keychain send
```

프로젝트 루트(`contract` 디렉토리가 아님)로 돌아가서 앱을 실행하고, 새로운 십자말풀이 퍼즐을 볼 수 있습니다.

```bash
CONTRACT_NAME=crossword.friend.testnet npm run start
```

## 마무리

교차 컨트랙트 호출(Cross-contract call) 및 콜백과 로직이 어디로 가야 하는지 이해하면 NEAR에서 거의 모든 것을 구축할 수 있습니다.

공개 키를 기반으로 메서드에 대한 권한을 확인하는 이 십자말풀이 퍼즐은 약간 특이합니다. 원래라면, 허용된 사용자에 대한 간단한 컬렉션 또는 매핑이 있거나, 설정한 `owner_id` 필드를 활용하는 것이 더 일반적입니다. NEAR의 계정 및 액세스 키 시스템은 매우 강력하며, 이 튜토리얼이 십자말 풀이를 통한 원활한 온보딩과 같이 가능한 것의 한계를 확장하는 데 도움이 되기를 바랍니다.

다시 말하지만 이 챕터의 최종 코드는 다음과 같습니다.

https://github.com/near-examples/crossword-tutorial-chapter-3

즐거운 해킹 되세요!
