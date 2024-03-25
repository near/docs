---
id: gas
title: Gas
---

On every transaction you send to the network NEAR charges you a fee (aka **gas fee**). This fee is used to indirectly pay the [people](../validators.md) that keep the network infrastructure, and to incentivize developers of smart contracts.

Gas is a fascinating topic that touches everyone in the NEAR ecosystem, here is a brief summary:

1. A small fee is charged on every transaction to indirectly **pay the validators** by burning a part of the total token supply.
2. This fee **prevents spamming** the network with useless transactions.
3. Read-only methods do not **result in fees for the user**, instead, the validator absorbs the cost.
4. In transaction involving a contract, **30% of the fee** goes to the contract as a **developer incentive**.
5. Fees are measured in **gas units** but paid in $NEAR.
6. Gas units are deterministic: the **same transaction** costs the **same gas units**.
7. Gas units are transformed to $NEAR by multiplying for a **gas price**.
8. The **gas price variates** smoothly from block to block.
9. Gas can be thought as a **wall time**: `1 Tgas` ~ `1 ms` of compute time.
10. You can attach a **maximum of `300Tgas`** to a transaction.
11. Attaching extra gas does **NOT** make the transaction faster, unused gas is **simply returned**.
12. Contract developers can **prepay gas** for their users.

---

## Giới thiệu
When you send a transaction to the NEAR network different [validators](../validators.md) process it using their own infrastructure.

Maintaining the infrastructure up and running is important to keep the network healthy, but represents a significant cost for the validator.

As many other networks, NEAR **pays the validators** for their job. Also like many other networks, users have to pay a small **fee** (aka **gas fee**) on every transaction. But instead of giving the gas fee to the validators, validators receive their reward independent from the gas fees. This topic is discussed in more details in the [validators](../validators.md) section.

In addition, NEAR implements two unique features with respect to gas fees:
1. Sharing fees with developers
2. Allowing for **free** transactions

### 1. Gas as a Developer Incentive
Something unique to NEAR is that the GAS is not used to pay validators. In transactions where calling a contract would incur a gas fee, the fee is actually divided as follows:
- 30% goes to the smart contract.
- 70% is burned.

In this way, NEAR uses the gas to also **incentive development of dApps** in the ecosystem.

### 2. Free Transactions
Another unique feature of NEAR is that it allows to call `read-only` methods in smart contracts for free, without even needing a NEAR account.

In such case, it is the validators who absorb the gas cost.

---

## Gas Units & Gas Price
On every transaction NEAR users get charged a small $NEAR fee, which has to be paid upfront. However, transaction fees are not computed directly in $NEAR.

### Gas Units
Internally, the computation is done using **gas units** which are **deterministic**, meaning that a given operation will always cost the **same amount of gas**.

### Gas Price
To determine the actual $NEAR fee the gas of all operations done by the transaction are added up are multiplied by a **gas price**.

The gas price is not fixed: it is **recalculated each block** depending on network demand. If the previous block is more than half full the price goes up, otherwise it goes down.

The price cannot change by more than 1% each block and bottoms out at a price that's configured by the network (currently 100 million yocto NEAR).<!-- Note that the gas price can differ between NEAR's mainnet & testnet. \[Check the gas price\](#whats-the-price-of-gas-right-now). -->---

## Translating Gas to Computational Resources {#thinking-in-gas}
Gas units have been carefully calculated to work out to some easy-to-think-in numbers:

- **1 TGas** (10¹² gas units) ≈ **1 millisecond** of "compute" time.
- This represents **0.1 milliNEAR** (using the [minimum gas price](#how-is-the-gas-price-computed)).

This `1ms` is a rough but useful approximation. However, gas units encapsulate not only compute/CPU time but also bandwidth/network time and storage/IO time.

Via a governance mechanism, system parameters might be tweaked, shifting the mapping between TGas and milliseconds in the future.

:::tip 1s Block Production NEAR imposes a [maximum amount of gas](/api/rpc/setup#protocol-config) per block to ensure that a block is generated approx. every second. :::


---

## The cost of common actions {#the-cost-of-common-actions}

To give you a starting point for what to expect for costs on NEAR, the table below lists the cost of some common actions in TGas and milliNEAR (at the [minimum gas price](#how-is-the-gas-price-computed)).

| Operation                | TGas | fee (mN) | fee (Ⓝ)  |
| ------------------------ | ---- | -------- | -------- |
| Tạo account              | 0.42 | 0.042    | 4.2⨉10⁻⁵ |
| Send Funds               | 0.45 | 0.045    | 4.5⨉10⁻⁵ |
| Stake                    | 0.50 | 0.050    | 5.0⨉10⁻⁵ |
| Thêm một Full Access Key | 0.42 | 0.042    | 4.2⨉10⁻⁵ |
| Delete Key               | 0.41 | 0.041    | 4.1⨉10⁻⁵ |

<details className="info">
<summary>Where do these numbers come from?</summary>

NEAR is [configured](https://github.com/near/nearcore/blob/master/core/primitives/res/runtime_configs/parameters.yaml) with base costs. An example:

```json
  transfer_cost: {
    send_sir:     115123062500,
    send_not_sir: 115123062500,
    execution:    115123062500
  }
```

The "sir" here stands for "sender is receiver". Tất cả giá trị đều giống hệt nhau, nhưng chúng có thể thay đổi trong tương lai.

When you make a request to transfer funds, NEAR immediately deducts the appropriate `send` amount from your account. Then it creates a _receipt_, an internal book-keeping mechanism to facilitate NEAR's asynchronous, sharded design (if you're coming from Ethereum, forget what you know about Ethereum's receipts, as they're completely different). Creating a receipt has its own associated costs:

```json
  action_receipt_creation_config: {
    send_sir:     108059500000,
    send_not_sir: 108059500000,
    execution:    108059500000
  }
```
You can query this value by using the [`protocol_config`](/api/rpc/setup#protocol-config) RPC endpoint and search for `action_receipt_creation_config`.

The appropriate `send` amount for creating this receipt is also immediately deducted from your account.

The "transfer" action won't be finalized until the next block. At this point, the `execution` amount for each of these actions will be deducted from your account (something subtle: the gas units on this next block could be multiplied by a gas price that's up to 1% different, since gas price is recalculated on each block). Adding it all up to find the total transaction fee:

```
    (transfer_cost.send_not_sir  + action_receipt_creation_config.send_not_sir ) * gas_price_at_block_1 +
    (transfer_cost.execution + action_receipt_creation_config.execution) * gas_price_at_block_2
```

</details>

---

## How do I buy gas? {#how-do-i-buy-gas}

You don't directly buy gas; you attach tokens to transactions.

Nếu bạn hiểu rõ về Ethereum, sẽ có một suy nghĩ nảy ra trong đầu bạn đó là sử dụng một lượng gas price cao hơn để transaction của bạn được xử lý nhanh hơn. In NEAR, **gas costs are deterministic**, and you **can't pay extra**.

For basic operations like transfers the gas needed is easy to calculate ahead of time, so it's **automatically attached for you**.

Function calls are more complex and need you to attach an explicit amount of gas to the transactions, up to a maximum value of 3⨉10¹⁴ gas units (`300 Tgas`).

:::info This maximum value of prepaid gas is subject to change but you can query this value by using the [`protocol_config`](/api/rpc/protocol#protocol-config) RPC endpoint and search for `max_total_prepaid_gas`. :::

<details className="warning">
<summary>How many tokens will these units cost?</summary>
Note that you are greenlighting a maximum number of gas _units_, not a number of NEAR tokens or yoctoNEAR.

Những unit này sẽ nhân với gas price tại block mà chúng được xử lý. Nếu những function call tạo các cross-contract call, sau đó các phần phân biệt của function sẽ được xử lý ở các block khác, và có thể sử dụng mức gas price khác nhau. At a minimum, the function will take two blocks to complete, as explained in [where those numbers come from](#the-cost-of-common-actions).

Giải sử mức gas price tối thiểu của hệ thống là 100 triệu yoctoNEAR trong suốt quá trình vận hành, thì lượng gas đi kèm tối đa là 3⨉10¹⁴ dường như sẽ cho phép chi tiêu tối đa 3⨉10²² yN. However, there's also a pessimistic multiplier of about 6.4 to [prevent shard congestion](https://github.com/near/NEPs/issues/67).

Nhân cả ba con số này, chúng ta thấy rằng, nếu gas price ở mức tối thiểu, thì gas unit tối đa được phép được đính kèm cho các hoạt động vào khoảng 0.2Ⓝ. Nếu gas price cao hơn mức tối thiểu, khoản phí này có thể cao hơn.

Điều gì sẽ xảy ra nếu gas price ở mức tối thiểu ở block đầu tiên, nhưng quá trình thực hiện phải mất nhiều block để hoàn thành, và các block tiếp theo đó có gas price cao hơn? Chi phí có thể nhiều hơn ~0.2Ⓝ? Câu trả lời là không. Hệ số pessimistic giải thích cho trường hợp này.

</details>

---

## Attach extra gas; get refunded! {#attach-extra-gas-get-refunded}
The amount of gas required to call a contract depends on the method's complexity and the contract's state. Many times this is **hard to predict** ahead of time.

Because of this, if you attach more tokens than needed to cover the gas, you'll get refunded the unused fee!

Điều này cũng đúng cho các thao tác cơ bản. In the [cost section](#the-cost-of-common-actions-the-cost-of-common-actions) we mentioned that $NEAR fees are automatically calculated and attached. Since the gas price could be adjusted while these operations are being applied, a slight amount extra is attached, and any beyond what's necessary gets refunded.

---

## Prepaid Gas là gì? {#what-about-prepaid-gas}

NEAR Team hiểu được rằng những developer muốn mang lại cho user của họ những trải nghiệm ban đầu tốt nhất có thể. Để hiện thực hóa mong muốn này, các developer có thể thiết kế các ứng dụng của họ theo cách: lần đầu user có thể rút tiền để mua gas trực tiếp từ một tài khoản được quản lý bởi developer. Sau khi tham gia, user có thể dùng nó để thanh toán cho nền tảng mà họ đang sử dụng.

Theo nghĩa này, prepaid gas có thể được xem như một tài khoản được tài trợ và các contract liên quan cho qua trình tham gia của người dùng mới.

**Vậy thì developer thanh toán gas fee cho user của họ trên NEAR như thế nào?**

- User có thể sử dụng tiền trực tiếp từ tài khoản của developer chỉ dành cho việc trả gas fee trên dApp này. Sau đó, developer phải phân biệt các user dựa vào các signer key thay vì các account name.

- Sử dụng function call, bạn có thể cho phép user mới không có tài khoản sử dụng dApp và contract on-chain của bạn. Back-end tạo ra một access key mới cho user trên tài khoản của contract và trỏ nó về chính contract đó. Bây giờ, user có thể ngay lập tức sử dụng web app mà không cần thông qua bất kỳ wallet nào.

NEAR Protocol không cung cấp bất kỳ tính năng hạn chế nào đối với việc sử dụng quỹ của developer. Các developer có thể đặt mức cho phép trên các access key tương ứng với những user cụ thể -- một `FunctionCall` access key cho mỗi user mới với mức cho phép cụ thể.
