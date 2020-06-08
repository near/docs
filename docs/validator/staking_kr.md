---
id: staking
title: 검증인 노드운영 
sidebar_label: Running the Node
---

## 공식 배타넷에 스테이킹하기

### 시작전 이부분을 읽어주세요_

Wait until your node is fully synced before you send a staking transaction. 
스테이킹 트렌젝션을 전송하기 전, 당신의 노드가 완전히 싱크될때 까지 기다리세요.
싱크가 되지 않은 노드는 블록을 생성하거나 검증할 수 없기 때문에, 검증인에 선정되더라도 
검증인 풀에서 쫒겨나거나, 적당한 업타임을 유지하지 못할 경우 당신의 보상을 잃을 수 있습니다.
(예시: 해당 epoch에 할당된 숫자의 블록을  검증하거나 생성)


현재 스테이킹은 *TestNet* 에서 비활성화 되어 있기 때문에, *BetaNet*에서 작업하게 될 것입니다.
그러므로 당신의 NEAR Shell을 다음 두단계를 통해 BetaNet으로 설정하세요.
1. 현재 세션을 위해서: `export NODE_ENV=betanet` 를 실행하세요.
2. 머신의 재시작에도 동일한 환경을 유지하기 위해 `~/.bashrc`의 끝에, 동일한 라인인 (`export NODE_ENV=betanet`) 를 추가하세요.

다음의 서비스들을 사용하게 될 것입니다.

|             ⛔️ TestNet             |             ✅ BetaNet             |
| :-------------------------------: | :-------------------------------: |
| https://explorer.testnet.near.org | https://explorer.betanet.near.org |
|  https://wallet.testnet.near.org  |  https://wallet.betanet.near.org  |
|   https://rpc.testnet.near.org    |   https://rpc.betanet.near.org    |

BetaNet은주간 Release를 위해 매주 화요일 오후 6시에 재설정됩니다. 검증인 상태를 잃는 것을 방지하기 위해 자동 업데이트를 활성화 하는 `nearup`을 사용하여 노드를 재시작해야 할 것입니다.
최신 릴리즈가 언제 배포될 것인지 그리고 언제 당신의 노드를 안전하게 재시작할지를 알기 위해서 Near Protocol [validator channel on Telegram](https://t.me/near_validators) 이나 [Discord](https://discord.gg/ZMPr3VB) 에가입하세요.


## 노드 요구사항

검증인이 되기 위해서, 로컬 머신에 노드를 운영하거나 다음의 최소 요구사양을 가진 클라우드 머신을 사용하세요.

```bash
At least 2 CPUs
At least 4GB RAM
At least 50 GB free disk
```

## 환경을 설정하세요.

**중요: 최신 버전의 NEAR Shell과 12.x**의 노드버전을 확인하세요.

그렇지 않은 경우, 당신의 환경 설정을 위해 아래의 단계를 따라주시기 바랍니다. 오래걸리지않으니 걱정 마십시오.
스테이크를 위해 다음을 확인하세요

* 토큰이 있는 **BetaNet**의 계정. 만일 아직 계정을 설정하지 않았다면, 다음의 페이로 가셔서 설정을 하고 돌아오십시오:[Create Account](../local-setup/create-account.md). 다음 링크를 사용하는 것을 잊지 마십시오 [BetaNet wallet](https://wallet.betanet.near.org)!
* `near-shell`, 은 우리의 CLI 도구로서 [node.js](https://nodejs.org/en/download/) 와 [npm](https://www.npmjs.com/get-npm)를 요구합니다.
다음의 방법으로 이미 node.js와 npm이 설치되어 있는지 확인할 수 있습니다.

  1. 커맨드 라인을 엽니다.
  2. 다음의 명령어를 입력합니다.
    ```bash
    node -v
    ```
    이 명령어는 당신의 노드버전을 커맨드라인에 보여줄 것입니다.
    ```bash
    npm -v
    ```
    이 명령어는 당신의 npm버전을 커맨드라인에 보여줄 것입니다.

    그렇지 않다면, 다음의 링크로 가서 설치를 진행하세요[node.js](https://nodejs.org/en/download/). 
    노드는 주로 npm을 자동으로 설치한다는 것을 기억하세요. 그러나 만약 npm이 설치되지 않을 경우 [여기](https://www.npmjs.com/get-npm)에서 설치하세요.

node와 npm이 설치되었다면 Near Shell을 다운로드 받고 다음을 당신의 터미널에 입력하세요.

```bash
# npm으로 Near Shell 다운 받기:
npm i -g near-shell
```
Near Shell이 설치되면, 노드를 실행하세요.

### 노드 실행

이제 보유한 Near Shell로 당신의 노드를 설정할 수 있습니다. 다음을 참조하세요[Nearup documentation](https://github.com/near/nearup).

** 중요 이 부분에서 이전 단계에서 만들었단 당신의 계정의 이름인 계정 ID가 필요합니다. **

이전의 단계들을 완료했던 스크린으로 돌아오세요.

계정 ID가 요구될 경우 당신이 스테이크하길 원하는 계정의 이름을 입력하세요. 당신은 스태이킹을 위한 공개키를 반환받게 됩니다; 이것은 다음 처럼 보일 것입니다:

```bash
Stake for user 'thefutureisnear.test' with 'ed25519:97JLghrxUQMaX2pcerVB5FNFu4qk8rx8J3fnWRyoEB7M'
```

다음 단계를 위해 이 validator\_key 를 복사해두시기 바랍니다. 이 퍼블리키는 다음의 near 파일들에서도 찾으실 수 있습니다. `~/.near/betanet/validator_key.json`

## 스테이킹 트렌젝션의 전송

수고하셨습니다! 이전의 모든 단계를 완료하셨다면 스테이킹을 위한 설정이 끝났습니다.

첫번째로, `near login'을 명령어를 수행하여 near shell을 인증해봅시다.

당신은 스테이킹 계정을 인증하기 위한 url을 요청받게 될 것입니다.

```bash
Please navigate to this url and follow the instructions to log in:
https://wallet.betanet.near.org/login/?title=NEAR+Shell&public_key=FSgxX7YwuCveCeYqsSAB3sD8dgdy3XBWztCQcEjimpaN
```

이후, 계정 ID를 shell에 입력합니다.

```bash
Please enter the accountId that you logged in with:
```

당신의 계정ID를 입력하면, 다음의 메시지가 나타날 것입니다.

`Missing public key for <asdfasdf> in default`
`Logged in with masternode24`

이 메시지는 오류가 아니며, 당신의 공개키를 새롭게 생성할 것임을 나타냅니다.

이제 스테이킹 트렌젝션을 전송할 준비가 되었습니다.

```bash
near stake <accountId> <staking public key> <amount to stake>
```

50,000 NEAR를 스테이킹 하는 것은 BetaNet에서 충분합니다.

당신은 다음과 같은 성공 메시지를 볼수 있을 것입니다.

```text
Staking 50000 on thefutureisnear with public key = A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn.
```

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    NEAR Protocol provides contract-based delegation. Take some time to learn more, reading the Stake Wars Ep.II <a href="https://near.org/blog/stake-wars-episode-ii/" target="_blank">blog post</a>.
</blockquote>


## 검증인이 되기 위해 선택받기

모든것을 완료후, 만약 검증인이 되기위한 충분한 스테이크를 가지고 있다면, BetaNet에서 약 ~6시간을 기다려야 할 수 있을 것입니다.
당신이 검증인으로 선출된것을 노드의 "V/"로그로도 확인할수 있으며, V는 노드가 현재 검증인임을 나타냅니다.

![](assets/validators%20%281%29.png)

Legend: # 7153 | BlockHeight V/1 | 'V' (validator) or '—' (regular node)

0/0/40는 현재 전체 검증인의 수: 연결된 피어/ 갱신된 피어/ 나의 피어 를 나타냅니다. 이 숫자는 시간에 따라 바뀔 수 있습니다. 

검증인의 선정에 대해 조금더 배우기 위해서는 다음을 참조하세요[Validator FAQ](../validator/validator-faq.md).

## 검증인의 현재 리스트와 스테이크 수량 보기

현재 검증인 리스트를 보기 위해서 다음을 참조하세요:[http://rpc.betanet.near.org/status](http://rpc.betanet.near.org/status)

만약 검증자가 얼마나 스테이킹을 하고 있는지 보기 위해서, 당신은 `near state <account name>` 명령어를 Near Shell에서 수행할 수 있습니다.


```bash
{
  amount: '100011163887239132720351',
  code_hash: '11111111111111111111111111111111',
  locked: '97985903901882082761',
  storage_paid_at: 25,
  storage_usage: 182
}
```

## Automatically re-staking
## 자동화된 재-스테이킹

NEAR 프로토콜은 자산을 잠금해제 하기 원치 않을 경우, 당신의 보상을 자동으로 재스테이킹 합니다.
`near stake` 명령어를 낮은 가치로 입력한다면, 당신의 자산은 3 epoch(~9 시간, BetaNet기준, ~36시간, TestNet기준) 뒤에 잠금이 해제될 것입니다.
