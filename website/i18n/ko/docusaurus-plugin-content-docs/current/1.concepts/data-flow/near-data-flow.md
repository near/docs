---
sidebar_label: "NEAR 데이터 흐름"
---

# NEAR 데이터 흐름


<iframe
 width="100%"
 height="500"
 src="https://www.youtube.com/embed/VSBJ-A69Km4"
 title="YouTube video player"
 frameborder="0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowfullscreen>
</iframe>


:::info 데이터 흐름

이 비디오에서는 데이터가 NEAR 프로토콜 블록체인에서 어떻게 이동하는지에 대한 주요 개념들의 간략한 개요를 제공합니다.

:::

NEAR 프로토콜 블록체인 데이터 흐름은 한눈에 보기에는 다소 까다로울 수 있습니다. 그러나 이는 매우 간단하고 잘 정의된 규칙을 따릅니다. 이 글에서는 NEAR 프로토콜 블록체인에서 데이터가 어떻게 이동하는지 자세히 살펴보겠습니다.

실제로 모든 블록체인 흐름은 시작은 있지만 끝이 없는 무한한 타임라인으로 나타낼 수 있습니다.


![Blocks Timeline](/docs/flow/01-timeline.png)


그리고 일정 간격으로 해당 타임라인에 블록이 나타납니다. 이러한 각 블록은 이전 블록에 대한 정보를 보유하므로 *블록들로 연결된 체인* 을 생성합니다 .


NEAR Protocol has a sharded nature, meaning that more than one parallel network, called a [Shard](../../2.build/6.data-infrastructure/lake-data-structures/shard.mdx), can be live at any moment. 그리고 각 샤드는 주어진 간격으로 블록 청크를 생성합니다. NEAR 블록체인의 블록은 모든 샤드의 블록 청크 모음입니다. Block chunk is shortened to [Chunk](../../2.build/6.data-infrastructure/lake-data-structures/chunk.mdx) in NEAR Protocol documentation.

데이터 흐름 자체로 돌아가봅시다. 우리가 할 수 있는 최선은 오디오/비디오 편집 앱에서 볼 수 있는 트랙을 상상하는 것입니다. 각 샤드에는 고유한 트랙 세트가 있습니다. 상위 트랙은 청크입니다. 주어진 간격에 관계없이 나타나며, NEAR 블록체인의 경우 간격은 약 1초입니다. 블록체인에서 아무 일도 일어나지 않아도 청크가 생성되고 있습니다.

![Timeline as tracks](/docs/flow/02-tracks.png)

그러면 무슨 일이 일어나고 있다는 말은 무엇을 의미하나요? 무언가가 블록체인에 어떤 변화를 일으켰다는 뜻입니다. And the most well-known method to trigger any changes is to send a [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) to the blockchain with instructions of what we want to change and who has requested those changes.

트랜잭션은 구성, 서명이 이뤄진 채로 블록체인으로 전송되어야 합니다. Once it is executed we expect to have a result - [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx). 이는 간단합니다. 그러나 이는 NEAR 블록체인에서 그리 정확하진 않습니다.

![Transaction execution](/docs/flow/03-tx-outcome-receipt.png)

We have found out that [Transactions](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) execute and the [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx) of the Transaction is always a [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx). 우리는 NEAR 프로토콜에서 데이터가 이동하는 방식의 주요 원칙을 배웠습니다.

And yes, it is executed there immediately BUT the immediate result of the transaction execution is always just *an acknowledgement that it will be executed on the chain;* this internal execution request is known as [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx). You can think of the [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx) as an internal transaction that exists to pass information across shards.

트랙으로 돌아가 예시를 살펴보겠습니다.

Assuming we have two accounts living on different [Shards](../../2.build/6.data-infrastructure/lake-data-structures/shard.mdx) **alice.near** and **bob.near**. **alice.near** creates a [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) to send a few tokens to **bob.near**. The [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) is immediately executed and the [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx) for the [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) is always a [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx).

따라서 Receipt는 **bob.near**가 속한 샤드로 이동합니다. But this [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx) cannot be executed here, because **bob.near** doesn’t live on the same Shard as **alice.near**, so **the Receipt must be executed on the receiver’s Shard**.

대상 샤드에서 Receipt가 실행되고, 프로세스가 완료된 것으로 간주됩니다.

:::info 여기서 설명은 간단합니다.

[토큰 전송](token-transfer-flow.md) 흐름 문서 를 참조하세요.

:::

따라서 최종 스키마는 다음과 같습니다.

![Complete scheme of sending tokens from an account from one Shard to an account on another](/docs/flow/04-send-nears-flow.png)

## 요약

우리는 NEAR 프로토콜에서 데이터가 이동하는 방식의 주요 원칙을 배웠습니다. We have found out that [Transactions](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) execute and the [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx) of the Transaction is always a [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx).

Now we know that [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx) is a main internal asset for NEAR Protocol blockchain and it has a power of traveling between [Shards](../../2.build/6.data-infrastructure/lake-data-structures/shard.mdx). 또한 간단한 예를 통해 NEAR 데이터 흐름을 배웠습니다. Of course in real life with more complex transactions that involve cross-contract calls, there will be more Receipts and ExecutionOutcomes.

이 글이 유용하기를 바라며, NEAR 프로토콜에서 데이터가 흐르는 방식에 대한 지식을 기반으로 dApp 및 인덱서를 쉽게 구축할 수 있기를 바랍니다.
