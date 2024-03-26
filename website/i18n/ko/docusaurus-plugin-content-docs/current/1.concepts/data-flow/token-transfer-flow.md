---
sidebar_label: 토큰 전송
---

# 토큰 전송 흐름

[이전 글](near-data-flow.md)에서 우리는 서로 다른 샤드에 있는 계정 간 토큰 전송의 예를 보았습니다. 이 예는 단순화되었으며 프로세스의 몇 단계가 누락되었습니다. 개념을 이해하기 위한 더 큰 그림을 제공하기 위해, 기사와 비디오를 일부러 짧지만 설명적으로 구성하였기 때문입니다.

이 글에서는 동일한 데이터 흐름을 살펴보지만, 더 자세히 살펴본 뒤 두 가지 추가 시나리오를 고려할 것입니다.

- 다른 샤드에 있는 계정 간 토큰 전송
- 동일한 샤드에 있는 계정 간 토큰 전송

이전 설명에서 누락된 것이 무엇인지 물을 수 있습니다. 짧은 대답은 **가스 환불** 또는 간단히 **환불** 입니다.

If you don't know what **Gas** is, please [read first the article about Gas](https://docs.near.org/concepts/protocol/gas) from our docs.

As for *Refunds*, here's a quote from the [Gas](https://docs.near.org/concepts/protocol/gas) article:

> 여분의 가스는 환불됩니다!
> 
> ...
> 
> - 필요한 것보다 더 많은 가스를 포함하면 환불됩니다.
> 
> ...
> 
> *From NEAR Protocol docs [Gas. 여분의 가스는 환불됩니다!](https://docs.near.org/concepts/protocol/gas#attach-extra-gas-get-refunded)에서*


:::note 데이터 흐름 측면에서 환불의 의미

말 그대로 모든 트랜잭션에 환불이 포함된다는 의미입니다.

:::

좋습니다, 이제 소개하기에 충분합니다. 이제 예제로 이동하겠습니다.


## 다른 샤드에 있는 계정 간 토큰 전송

기본적으로 [NEAR 데이터 흐름](near-data-flow.md) 글의 예제를 확장한 것입니다.

두 개의 계정 **alice.near** 및 **bob.near**가 있다고 가정해봅시다. 그들은 다른 [샤드](https://near-indexers.io/docs/data-flow-and-structures/structures/shard)에 속합니다. **alice.near**는 **bob.near**에 몇 개의 토큰을 보냅니다.

**alice.near**가 서명한 [트랜잭션](https://near-indexers.io/docs/data-flow-and-structures/structures/transaction)이 네트워크로 전송됩니다. 이는 즉시 실행되며, [ExecutionOutcome](https://near-indexers.io/docs/data-flow-and-structures/structures/execution_outcome)은 트랜잭션을 [Receipt](https://near-indexers.io/docs/data-flow-and-structures/structures/receipt)로 변환한 출력 또는 결과입니다 .

![Transaction execution](/docs/flow/03-tx-outcome-receipt.png)

위의 과정 에서 발신자 **alice.near**에게 수수료(가스)가 부과되었습니다. [트랜잭션](https://near-indexers.io/docs/data-flow-and-structures/structures/transaction)의 결과로 생성된 [Receipt](https://near-indexers.io/docs/data-flow-and-structures/structures/receipt)은 다음 규칙을 따릅니다.

1. 다음 [블록](https://near-indexers.io/docs/data-flow-and-structures/structures/block) 이전에 실행되지 않습니다.
2. 수신자의 [샤드](https://near-indexers.io/docs/data-flow-and-structures/structures/shard)에서 실행되어야 합니다.

우리의 경우, 수신자는 **bob.near**이고 해당 계정은 다른 [샤드](https://near-indexers.io/docs/data-flow-and-structures/structures/shard)에 속하므로 [Receipt](https://near-indexers.io/docs/data-flow-and-structures/structures/receipt)가 수신자의 샤드로 이동하고 실행 대기열에 놓입니다.

이 예제에서 Receipt는 바로 다음 블록에서 실행됩니다.

![The Receipt is executed in the next Block](/docs/flow/04-send-nears-flow.png)

거의 끝났습니다. 환불을 기억하시나요? 따라서 Receipt에 대한 [ExecutionOutcome](https://near-indexers.io/docs/data-flow-and-structures/structures/execution_outcome)은 발신자에게 가스를 환불하는 또 다른 Receipt가 됩니다. **bob.near**는 **alice.near**로부터 토큰을 받았습니다. 이제 **alice.near**는 새(그리고 마지막) Receipt의 수신자가 됩니다(이 Receipt의 발신자는 항상 **시스템**임을 명심하세요).

규칙 #2를 명심하세요: Receipt는 수신자의 샤드에서 실행되어야 합니다. 따라서 이 Receipt는 **alice.near**가 속한 샤드로 이동합니다. 그리고 이는 전체 과정에서 마지막 실행입니다.

![Complete scheme of Token transfer between the accounts from different Shards](/docs/flow-token-transfer/01-diff-shards-complete.png)

이제 끝났습니다. 이제 토큰은 한 샤드의 계정에서 다른 샤드의 계정으로 전송되었으며 초기 발신자 **alice.near** 는 가스를 환불받았습니다.


## 동일한 샤드에 있는 계정 간 토큰 전송

두 계정이 동일한 [샤드](https://near-indexers.io/docs/data-flow-and-structures/structures/shard)에 있는 예를 살펴보겠습니다. 프로세스는 한 샤드에서 다른 샤드로 이동하는 Receipt가 없다는 점을 제외하면 이전 예제와 동일합니다.

**alice.near**가 서명한 [트랜잭션](https://near-indexers.io/docs/data-flow-and-structures/structures/transaction)이 네트워크로 전송됩니다. 이는 즉시 실행되며, [ExecutionOutcome](https://near-indexers.io/docs/data-flow-and-structures/structures/execution_outcome)은 트랜잭션을 [Receipt](https://near-indexers.io/docs/data-flow-and-structures/structures/receipt)로 변환한 결과입니다 .

![Transaction execution](/docs/flow/03-tx-outcome-receipt.png)

Receipt는 이미 수신자의 샤드에 있으므로, 다음 [블록](https://near-indexers.io/docs/data-flow-and-structures/structures/block)의 실행 대기열에 들어갑니다. 이는 다음 블록에서 실행되며 [ExecutionOutcome](https://near-indexers.io/docs/data-flow-and-structures/structures/execution_outcome) 결과는 초기 발신자 **alice.near** 에게 환불되는 새로운 Receipt입니다. 동일한 규칙이 이 Receipt에 적용되며 실행 대기열에 넣어지고 다음 블록에서 실행됩니다.

![Complete scheme of Token transfer between the account from the same Shards](/docs/flow-token-transfer/02-same-shard-complete.png)

이제 끝났습니다. 동일한 샤드 예제에 대해 프로세스가 지나치게 복잡한 이유가 궁금할 수 있습니다. 답은 **항상 동일한 규칙이 적용된다는 것**입니다. 또한 이 메커니즘을 사용하면 얼마나 많은 샤드가 존재하는지에 관계없이 단 하나의 규약으로 NEAR 프로토콜 데이터 흐름을 구축할 수 있습니다. 또한 프로세스가 항상 동일한 규칙을 따르기 때문에, 우리는 많은 "if"를 피할 수 있고, 별도의 코너 케이스를 염두에 둘 필요가 없습니다.

