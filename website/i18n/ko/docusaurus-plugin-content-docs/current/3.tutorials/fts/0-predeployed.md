---
id: predeployed-contract
title: 사전 배포된 컨트랙트
sidebar_label: 사전 배포된 컨트랙트
---

> 쉽게 사용할 수 있는 FT 스마트 컨트랙트를 사용하여 소프트웨어 개발을 하지 않고도 대체 가능한 토큰을 쉽게 만드는 방법을 알아보세요.

## 전제 조건

이 튜토리얼을 성공적으로 완료하려면 다음이 필요합니다.

- [NEAR TestNet 계정](/concepts/basics/accounts/creating-accounts)
- [NEAR-CLI](/tools/near-cli#setup)

## FT 컨트랙트 사용

### 설정

- 터미널에서 다음 명령을 실행하여 새로 만든 계정에 `near-cli`로 로그인합니다.

```bash
near login
```

 - 이 튜토리얼에서 명령을 쉽게 복사하고 붙여넣을 수 있도록 계정 ID에 대한 환경 변수를 설정합니다.

```bash
export NEARID=YOUR_ACCOUNT_NAME
```
:::note

`.testnet`을 포함하여, `YOUR_ACCOUNT_NAME`를 방금 로그인한 계정 이름으로 바꾸세요.

:::

- 다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $NEARID
```

### 대체 가능한 토큰 받기

NEAR는 사용자가 `gtNEAR` 일부를 자유롭게 받을 수 있는 새로운 대체 가능한 토큰(FT) 컨트랙트를 `ft.predeployed.examples.testnet` 계정에 배포했습니다. `gtNEAR`는 팀워크의 힘을 촉진하기 위한 새로운 대체 가능 토큰입니다 각 `gtNEAR`은 `1e24 yocto-gtNEAR`와 같고, 이는 1 $NEAR가 1e24 yoctoNEAR와 같은 것과 유사합니다.

이 사전 배포된 컨트랙트를 사용하여 gtNEAR를 얻어봅시다!

계정에 일부 `gtNEAR`를 보내기 위해 이 컨트랙트에 구현된 사용자 지정 함수인 `ft_mint` 메서드를 호출하여 시작하세요! 다음 명령은 당신의 계정으로 `0.01 gtNEAR`를 전송합니다.

```bash
near call ft.predeployed.examples.testnet ft_mint '{"account_id": "'$NEARID'", "amount": "10000000000000000000000"}' --accountId $NEARID
```

<details>
<summary>응답 예시: </summary>
<p>

```json
Log [ft.predeployed.examples.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_mint","data":[{"owner_id":"benjiman.testnet","amount":"10000000000000000000000","memo":"FTs Minted"}]}
Transaction Id Fhqa8YDLKxnxM9jjHCPN4hn1w1RKESYrav3kwDjhWWUu
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/Fhqa8YDLKxnxM9jjHCPN4hn1w1RKESYrav3kwDjhWWUu
''
```

</p>
</details>

- 계정이 소유한 토큰을 보려면 다음 `near-cli` 명령을 사용하여 FT 컨트랙트를 호출할 수 있습니다.

```bash
near view ft.predeployed.examples.testnet ft_balance_of '{"account_id": "'$NEARID'"}'
```

<details>
<summary>응답 예시 </summary>
<p>

```json
'2250000000000000000000'
```

</p>
</details>

***축하합니다! NEAR 블록체인에서 첫 번째 팀 토큰을 받았습니다!*** 🎉

👉 Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your FTs in the "Balances" tab. 👈

:::note 사전 배포된 컨트랙트
본 절에서 사용한 컨트랙트는 `ft_mint`를 호출하여 무한히 `gtNEAR`를 얻을 수 있도록 수정하였습니다. 함수는 FT [표준](https://nomicon.io/Standards/Tokens/FungibleToken/Core)의 일부가 아니며, 이 튜토리얼의 목적을 위해 구현되었습니다.
:::

---

## 끝맺는 말

이 기본 예제는 NEAR에서 FT 스마트 컨트랙트를 호출하고, 대체 가능한 토큰을 받는 데 필요한 모든 단계를 보여줍니다.

이제 프로세스에 익숙해졌으므로, [컨트랙트 아키텍처](/tutorials/fts/skeleton)로 이동하여 스마트 컨트랙트 구조와 처음부터 자체 FT 컨트랙트를 구축하는 방법에 대해 자세히 알아볼 수 있습니다.

***즐거운 민팅 되세요!*** 🪙

:::note 문서의 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.4.0`
