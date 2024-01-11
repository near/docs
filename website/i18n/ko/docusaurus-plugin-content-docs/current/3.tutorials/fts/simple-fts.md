---
id: simple-fts
title: Minting Fungible Tokens
---

이 튜토리얼에서는 쉽게 사용할 수 있는 스마트 컨트랙트를 사용하여, 소프트웨어 개발을 수행하지 않고 자신의 대체 가능한 토큰(FT)을 쉽게 만드는 방법을 배웁니다. This article will show you how to use an existing [FT smart contract](0-predeployed.md), and you'll learn [how to mint](#minting-your-fts) fungible tokens and [view them](#checking-your-wallet) in your Wallet.

## 전제 조건

이 자습서를 성공적으로 완료하려면 다음이 필요합니다.

- [NEAR 계정](#wallet)
- [NEAR 명령줄(Command Line) 인터페이스](/tools/near-cli#설정) (`near-cli`)

### Wallet

To store your fungible tokens you'll need a [NEAR Wallet](https://testnet.mynearwallet.com//). If you don't have one yet, you can create one easily by following [these instructions](https://testnet.mynearwallet.com/create).

Once you have your Wallet account, you can click on the [Balances Tab](https://testnet.mynearwallet.com//?tab=balances) where all your Fungible Tokens will be listed:

![Wallet](/docs/assets/fts/empty-wallet-ft-tab.png)

## FT 컨트랙트 사용

이제 모든 도구가 준비되었으므로, FT 스마트 컨트랙트를 사용하여 [FT를 생성](#FT-발행)할 준비가 되었습니다.

:::note 명령줄 인터페이스가 없는 경우 [다음 단계](/tools/near-cli#설정)를 따르세요. :::

터미널에서 다음과 같은 `near-cli` 명령을 실행하여, 토큰을 발행하는 데 사용할 `testnet` 계정에 대한 자격 증명을 로컬에 저장했는지 확인하세요.

```bash
near login
```

이 튜토리얼을 더 쉽게 복사/붙여넣기할 수 있도록 계정 ID에 대한 환경 변수를 설정하겠습니다. 아래 명령에서, `YOUR_ACCOUNT_NAME`를 방금 로그인한 계정 이름(`.testnet` 포함)으로 바꿉니다.

```bash
export ID=YOUR_ACCOUNT_NAME
```

다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $ID
```

### FT 발행

NEAR는 이미 누구나 자유롭게 `TeamTokens`를 발행할 수 있도록 `ft.examples.testnet` 계정에 컨트랙트를 배포했습니다. 이는 대체 가능한 토큰을 만들기 위해 상호 작용할 계정입니다.

이제 토큰을 발행해 봅시다! 아래 명령은 닷ㅇ신의 계정에 `25` TeamTokens를 발행합니다. 주의 깊게 살펴보면 `receiver_id`는 발행하는 토큰의 새 소유자를 정의하고, `--accountId`는 트랜잭션에 서명하고 지불하는 데 사용할 계정을 지정합니다. 또한 대체 가능한 토큰 컨트랙트에 대한 [스토리지 비용을 지불](/concepts/storage/storage-staking)하기 위해 호출에 `.001` $NEAR를 첨부하는 `--deposit` 플래그가 있습니다. 실제 금액은 이보다 약간 적지만, 차액은 환불됩니다. (지갑의 트랜잭션 참조) 발행할 토큰의 양은 25로 설정되어 있지만, 이 값을 1000까지 늘릴 수 있습니다.

```bash
near call ft.examples.testnet ft_mint '{"receiver_id": "'$ID'", "amount": "25"}' --deposit 0.1 --accountId $ID
```

토큰을 발행한 후, 컨트랙트를 조회하여 전달된 accountId의 잔액을 볼 수 있습니다. 이는 컨트랙트 `view` 호출을 수행하고, 대체 가능한 토큰 컨트랙트의 `ft_balance_of` 엔드포인트를 사용하여 수행됩니다. 잔고를 보려면 터미널에서 다음을 실행하세요.

```bash
near view ft.examples.testnet ft_balance_of '{"account_id": "'$ID'"}'
```

<details>
<summary>응답 예시: </summary>
<p>

```json
View call: ft.examples.testnet.ft_balance_of({"account_id": "benji_test.testnet"})
'25'
```

</p>
</details>

### 지갑 확인

:::tip After you mint your fungible token you can [view it in your NEAR Wallet](https://testnet.mynearwallet.com/)! :::

> <br/>
> 
> ![Wallet with token](/docs/assets/fts/teamtoken.png) <br/>

**_축하합니다! NEAR 블록체인에서 첫 번째 대체 가능 토큰을 만들었습니다!_** 🎉

## 끝맺는 말

이 기본 예제는 NEAR에서 FT 스마트 컨트랙트 호출하고 대체 가능한 토큰을 만들기 시작하는 데 필요한 모든 단계를 보여줍니다.

**_즐거운 민팅 되세요!_** 🪙

## 문서 버전 관리

이 글을 쓰는 시점에서, 이 예제는 다음 버전에서 작동합니다.

- near-cli: `2.1.1`
