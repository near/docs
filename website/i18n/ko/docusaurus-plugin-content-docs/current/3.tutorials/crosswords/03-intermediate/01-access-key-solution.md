---
sidebar_position: 2
sidebar_label: "시드 문구를 정답으로"
title: "정답 해시를 액세스 키로 교체"
---

import puzzleFrontrun from '/docs/assets/crosswords/puzzle-frontrun.png';
import padlockSafe from '/docs/assets/crosswords/safe-with-access-key--soulless.near--ZeroSerotonin__.png';

# 정답 해시 교체

지금까지 이 튜토리얼에서 사용자는 일반 텍스트 솔루션을 십자말풀이 스마트 컨트랙트로 보내어 해시하고 알려진 답변과 비교합니다.

이것은 작동하지만, 좀 더 신중하게, 일반 텍스트로 이루어진 정답을 보내는 것을 피하고 싶을 수 있습니다.

## 왜일까요?

블록체인은 트랜잭션을 처리하는 많은 컴퓨터에 의존합니다. 트랜잭션을 블록체인에 보내면 즉시 처리되지 않습니다. 일부 레이어 1 블록체인에서는 몇 분 이상이 걸릴 수 있습니다. NEAR 트랜잭션은 몇 초 안에 완결되지만, 그럼에도 불구하고 약간의 대기 시간이 있습니다.

이는 십자말풀이 정답을 일반 텍스트로 보냈을 때(`submit_solution`에 대한 `solution` 매개변수를 통해), 처리되기 전에 모든 사람이 볼 수 있음을 의미합니다.

이 글을 쓰는 시점에는 밸리데이터의 "프론트 러닝" 트랜잭션에 대한 미해결 사건은 없었으나, 이는 반드시 주의해야 할 사항입니다. 프론트 러닝은 밸리데이터가 수익성이 있을 수 있는 트랜잭션을 확인하면 이를 스스로 수행하는 것입니다.

이와 관련된 여러 사건이 있었고 계속해서 문제가 되고 있습니다.

<figure>
    <img src={puzzleFrontrun} alt="프론트러닝 공격으로 수만 달러를 빼앗긴 퍼즐에 대해 이야기하는 트윗" width="600"/>
    <figcaption>프론트러닝을 당한 퍼즐의 실제 예입니다.<br/>읽기 <a href="https://twitter.com/_anishagnihotri/status/1444113372715356162" target="_blank">Anish 의 스레드</a></figcaption>
</figure>

<br/>

## 어떻게 하나요?

우리는 십자말풀이로 독특하고, 솔직히 특이한 일을 하고 있습니다. 우리는 함수 호출 액세스 키를 새로운 방식으로 사용할 것입니다.

우리의 십자말풀이 퍼즐 스마트 컨트랙트는 자체에 함수 호출 액세스 키를 추가합니다. 개인 키는 시드 문구로 사용되는 정답에서 파생됩니다.

:::info 시드 문구가 또 뭐죠? 개인 키는 본질적으로 매우 큰 숫자입니다. 너무 커서 개인 키의 가능한 가짓수는 알려진 우주의 예상 원자 수와 비슷합니다.

이는 적어두면 꽤 길어지므로 숫자와 문자를 사용하여 사람이 읽을 수 있게 만든 경우가 많습니다. 그러나 사람이 읽을 수 있는 버전도 기억하기 어렵고 실수하기 쉽습니다.

시드 문구는 개인 키를 생성하는 일련의 단어(보통 12개 또는 24개 단어)입니다. (실제로 [조금 더](https://learnmeabitcoin.com/technical/mnemonic) 있습니다.)

시드 문구는 일반적으로 [BIP-30 단어 목록](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md)을 사용 하지만, 단어 목록을 사용하거나 특정 수의 단어를 포함할 *필요는 없습니다*. 단어가 엔트로피를 생성하는 한, 십자말풀이 솔루션은 결정론적 시드 문구 역할을 할 수 있습니다. 단어가 엔트로피를 생성하는 한, 십자말풀이 솔루션은 결정론적 시드 문구 역할을 할 수 있습니다. :::

따라서 새 퍼즐을 추가할 때, `AddKey` Action을 사용하여 `submit_solution` 메서드만 호출할 수 있는 제한된 함수 호출 액세스 키를 추가합니다.

퍼즐을 푸는 첫 번째 사용자는 본질적으로 개인 키를 "발견"하고 해당 메서드를 호출합니다. 이는 함수 호출 액세스 키가 들어 있는 금고라고 생각하면 됩니다.

<figure>
    <img src={padlockSafe} alt="시드 문구에 대한 단어가 포함된 자물쇠가 있는 작은 금고, 그리고 그것이 함수 호출 액세스 키를 가지고 있다는 것을 보여주면서 금고를 통해 볼 수 있습니다. soulless.near 그림."/>
    <figcaption className="full-width">Open the safe using answers to the puzzle, revealing the function-call access key.<br/>Art by <a href="https://twitter.com/ZeroSerotonin__" target="_blank">soulless.near</a></figcaption>
</figure><br/>

우리의 `submit_solution` 메서드는 더 이상 일반 텍스트 응답을 해시할 필요가 없지만, 대신 이 트랜잭션에 서명한 키를 확인합니다. 멋집니다!

## 온보딩

이전 챕터에서 십자말풀이 로그인을 구현했지만, NEAR 계정이 있어야 합니다.

최종 사용자가 십자말풀이 정답에 존재하는 키를 발견하는 경우, NEAR 계정이 필요하지 않습니다. 맞나요? 이는 절반만 맞습니다. 여전히 우리는 어딘가에 NEAR로 된 상금을 보내야 합니다.

승자에게 즉석에서 계정을 만들어줄 수 있다면 어떨까요? 그게 가능할까요? 가능합니다, 그리고 그것이 우리가 이 챕터에서 할 것입니다.


