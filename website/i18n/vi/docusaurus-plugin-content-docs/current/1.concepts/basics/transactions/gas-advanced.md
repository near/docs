---
id: gas-advanced
title: Gas - Advanced
---

## Chi phí của những thao tác phức tạp {#costs-of-complex-actions}

Chúng ta hãy nói về việc tính toán một số phí gas phức tạp hơn như: deploying contract và function call.

### Deploying Contract {#deploying-contracts}

The basic action cost includes two different values for deploying contracts. Đơn giản, đó là:

    deploy_contract_cost: 184765750000,
    deploy_contract_cost_per_byte: 64572944,

These values can be queried by using the [`protocol_config`](/api/rpc/protocol#protocol-config) RPC endpoint.

Đầu tiên là chi phí cơ bản, nó không phụ thuộc vào kích thước của contract. Keeping in mind that each need to be multiplied by two, for both `send` and `execute` costs, and will also require sending & executing a receipt, the gas units comes to:

    2 * 184765750000 +
    2 * contract_size_in_bytes * 64572944 +
    2 * 108059500000

(Chia kết quả cho 10¹² để đổi ra TGas!)

Note that this covers the cost of uploading and writing bytes to storage, but does **not** cover the cost of holding these bytes in storage. Long-term storage is compensated via storage staking, a recoverable cost-per-byte amount that will also be deducted from your account during contract deployment.

Deploying a 16kb contract requires **2.65 TGas** (and thus 0.265mN at minimum gas price) for the transaction fee, while 1.5N will be locked up for storage staking.

### Function call {#function-calls}

Với bản chất mục đích chung của NEAR, các function call dành được phần thắng cho các tính toán gas phức tạp nhất. Một function call nhất định sẽ sử dụng một lượng CPU, network và IO rất khó để dự đoán. Số lượng của mỗi loại thậm chí có thể thay đổi dựa trên lượng dữ liệu đã được lưu trữ trong contract!

Với mức độ phức tạp này, sẽ không có nhiều lợi ích khi xem qua một ví dụ, liệt kê (hãy nhìn `ext_costs` bên dưới `wasm_config` bằng cách sử dụng [`protocol_config`](/api/rpc/protocol#protocol-config) RPC endpoint) các phép tính gas (bạn có thể tự nghiên cứu điều này [nếu bạn muốn](https://github.com/near/nearcore/pull/3038)). Thay vào đó, hãy tiếp cận từ hai góc độ khác nhau: so sánh ballpark comparison với Ethereum và nhận các ước tính chính xác với các bài automated test.

<blockquote class="lesson">
**How much of the gas fee goes as a 30% reward to the smart contract account?**

The NEAR Whitepaper mentions that [30% of all gas fees](https://near.org/papers/the-official-near-white-paper/) go to smart contract accounts on which the fees are expensed. 

This amount can be calculated for function calls in two ways:
1. Summing all values in the gas profile 
2. Taking the total gas burnt for the transaction and subtract the static execution gas (which is equal to the amount of gas spent on sending the receipt(s)) from it. Both these numbers are available on the [NEAR Explorer](https://nearblocks.io/) overview page for a transaction.

The second approach is shorter, and quite possibly easier to remember. So here's an example: 

- An account calls the method `submit` on `aurora`
  - Converting the transaction to receipt burned a total of ~0.00024Ⓝ
  - Executing the receipt burned a total of ~0.00376Ⓝ

The 30% reward for the smart contract owner (in this case aurora) would be: (0.00376Ⓝ - 0.00024Ⓝ) * 0.3 = 0.001056Ⓝ 

This transaction can also be found [here](https://nearblocks.io/txns/GzRn9yhDaQ8f3ReJguCBGxdi4iJEeBguJ5MWufMcu1JP) on NEAR Explorer, feel free to have a look around!

For calls involving multiple contracts, calculating the reward for each contract with this method would not be possible with the data shown on NEAR Explorer (June 2022) as the explorer does not show the conversion cost for the second (and other) receipt(s).

</blockquote>

#### Ballpark Comparison với Ethereum {#ballpark-comparisons-to-ethereum}

Giống như NEAR, Ethereum sử dụng các gas unit để mô hình hóa độ phức tính toán của một hoạt động. Nhưng khác ở chỗ, thay vì sử dụng gas price có thể dự đoán được, Ethereum sử dụng một marketplace động, dựa trên việc đấu giá. Điều này làm cho việc so sánh với gas price của Ethereum và NEAR hơi phức tạp, nhưng chúng ta sẽ cố gắng hết sức.

Etherscan cung cấp [biểu đồ lịch sử gas price của Ethereum](https://etherscan.io/chart/gasprice). Các mức giá này được tính bằng "Gwei" hoặc Gigawei, trong đó wei là số lượng ETH nhỏ nhất có thể, giá trị của nó là 10⁻¹⁸ ETH. Từ tháng 11/2017 đến tháng 07/2020, trung bình gas price là 21Gwei. Hãy gọi đây là chi phí "average" gas price. Vào tháng 07/2020, chi phí average gas price đã tăng lên 57Gwei. Lấy con số này làm "high" gas fee của Ethereum.

Bằng cách nhân gas unit của Ethereum với gas price để tính được chi phí được tính bằng milliETH (mE), giống như cách chúng ta đã chuyển đổi TGas thành milliNEAR với NEAR. Hãy xem một số hành động phổ biến, và so sánh gas units của Ethereum với NEAR, cũng như các giá trị "average" & "high" mà chúng ta đã đề cập ở trên.

| Operation                                         | ETH gas units | avg mE | high mE | NEAR TGas             | mN                                     |
| ------------------------------------------------- | ------------- | ------ | ------- | --------------------- | -------------------------------------- |
| Transfer native token (ETH or NEAR)               | 21k           | 0.441  | 1.197   | 0.45                  | 0.045                                  |
| Deploy & initialize a [fungible token][] contract | [1.1M][]      | 23.3   | 63.1    | [9][]<super>†</super> | 0.9 (plus 1.5Ⓝ in [storage staking][]) |
| Transfer a fungible token                         | [~45k][]      | 0.945  | 2.565   | [14][]                | 1.4                                    |
| Setting an escrow for a fungible token            | [44k][]       | 0.926  | 2.51    | [8][]                 | 0.8                                    |
| Checking a balance for a fungible token           | 0             | 0      | 0       | 0                     | 0                                      |

<super>†</super> Những function call yêu cầu khởi động một VM và tải tất cả các byte mà Wasm đã biên dịch vào bộ nhớ, do đó chi phí tăng lên so với các thao tác cơ bản, có thể xem thêm về chủ đề [tối ưu hóa chi phí cho function call](https://github.com/near/nearcore/issues/3094).

Trong các hoạt động, nếu nhìn qua chúng ta chỉ thấy NEAR được cải thiện khoảng 10 lần so với Ethereum, nhưng thêm một điều cần lưu ý là tổng nguồn cung của NEAR là hơn 1 tỷ, trong khi đó tổng cung của Ethereum là hơn 100 triệu. Vì vậy, tương ứng với tổng nguồn cung, gas fee của NEAR cũng thấp hơn khoảng 10 lần so với Ethereum. Ngoài ra, nếu giá NEAR tăng lên một cách đáng kể, thì phí gas tối thiểu do NEAR network đặt ra có thể được hạ xuống.

Bạn có thể mong đợi network luôn ở mức gas price tối thiểu, tìm hiểu thêm ở [Economics whitepaper](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

#### Estimating Gas Costs with Automated Tests {#accurate-estimates-with-automated-tests}

Gas unit expense for running smart contract functions can be accurately estimated by running these in `testnet`. Generally, `testnet` runs a higher version of the protocol than `mainnet`. However, gas expense calculations do not change often making this is a good way to get a sense of how much gas a function will cost on `mainnet`.

To estimate gas costs, you can use the `near-workspaces` [crate in Rust](https://github.com/near/workspaces-rs/tree/main/examples/src) or similarly named [package in JavaScript](https://github.com/near/workspaces-js).

You may extract the `total_gas_burnt` field from the `CallExecutionDetails` struct returned by the `call` method. ([Read more](../../../sdk/rust/testing/integration-tests.md#profiling-gas))

```rust 
println!("Burnt gas (all): {}", res.total_gas_burnt);
```

In JS, you can calculate this value by adding `result.receipts_outcome[0].outcome.gas_burnt` with the amount of gas units consumed for receipt execution in `result.transaction_outcome.outcome.gas_burnt`.

:::info Gas Cost Estimation REST API
You may obtain gas cost estimates for a given function call using `api.gasbuddy.tech`. This API is experimental and may be removed in the future. One can obtain a gas cost estimate for a given function call by sending a POST request to `https://api.gasbuddy.tech/profile` with the following JSON body:

```json
{
  "contract_id": "<your-contract-account-id>",
  "method": "<your-contract-method-name>",
  "args": {
    "arg1": "value1",
    "arg2": "value2"
  }
}
```
:::

#### Gas Cost Estimation in the SDK {#gas-cost-estimation-in-the-sdk}

Our [SDK environment](../../../2.develop/contracts/environment/environment.md) exposes the `used gas` method, which lets you know how much gas was used so far.

You can benchmark how much gas a method (or a portion) uses by simply computing the difference in gas used between two points:

```ts
function myMethod(){
  // take gas usage
  const used_gas_point_A = environment.used_gas()

  // --- some code goes here ---

  const used_gas_point_B = environment.used_gas()

  log("Used gas", used_gas_point_B - used_gas_point_A )
}
```

---

## Pessimistic gas price inflation

A transactions may take several blocks before it completes. Due to dynamic gas price adjustments, later blocks may have a higher gas price than when the transaction was signed. To guarantee that the transaction can still finish, the amount of tokens reserved when starting a transaction is increased by the *pessimistic-inflation rule*.

The pessimistic inflation rule means that the gas has to be purchased at the highest theoretical gas price that the transaction could reach. The extra spending is only temporary, the difference between the pessimistic and actual price is refunded when the transaction finishes. This is the reason why in the explorer, virtually every transaction that spans more than one block contains a refund, even if all the gas has been spent.

By how much is the price inflated? It depends on how many blocks a transaction may take. A simple transaction that only sends tokens from one account to another can take between 2-3 blocks.
- One block to subtract the money from the signer's account
- One block to add it to the receivers account
- Potentially another block if the receiver is on another shard and the receipt application gets delayed.

Therefore, the pessimistically inflated price is increased by 3% or calculated as `gas_price` ⨉ 1.03. Every additional cross-shard communication adds another factor of 1.03.

For a function call, the maximum block delay is computed as the total gas attached divided by the minimum amount required to call another function. Therefore, the more gas you attach to a transaction, the higher your gas price. But again, the increased price is temporarily and will be refunded unless the network actually becomes that congested. Prices would have to go up by the maximum every block and your receipts would need to be very unlucky to have extra delays every time.

---

## Gas price bây giờ là bao nhiêu? {#whats-the-price-of-gas-right-now}

Bạn có thể truy vấn trực tiếp NEAR platform về gas price trên một block cụ thể bằng cách sử dụng RPC method `gas_price`. Giá này có thể thay đổi dựa vào network load. Nó được tính bằng yoctoNEAR (10^-24 NEAR)

1. Lấy bất kỳ block hash nào từ blockchain sử dụng [NEAR Explorer](https://explorer.testnet.near.org/blocks)

   _Tại thời điểm viết bài này, `SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv` là block hash cuối cùng_

2. Gửi một yêu cầu tới RPC để xem gas price trên block này sử dụng method `gas_price` [xem tài liệu ở đây](/api/rpc/gas#gas-price)

   ```bash
   http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv"]' id=dontcare
   ```

3. Quan sát kết quả trả về

   ```json
   {
     "id": "dontcare",
     "jsonrpc": "2.0",
     "result": {
       "gas_price": "5000"
     }
   }
   ```

Price của một gas unit ở block này là 5000 yoctoNEAR (10^-24 NEAR).

---

## Một vài kết luận từ whitepaper {#some-closing-thoughts-from-the-whitepaper}

<blockquote class="info">
Về cơ bản, NEAR platform là một marketplace giữa những người tham gia.  Về phía cung cấp, những người điều khiển các node validator, các cơ sở hạ tầng cơ bản khác cần được khuyến khích để cung cấp các dịch vụ này để tạo một “community cloud.”  Về phía những người có nhu cầu, các developer và end-user của nền tảng đang trả tiền cho việc sử dụng các dịch vụ mà những người cung cấp đưa ra, cần được sử dụng nó theo cách đơn giản, rõ ràng và nhất quán để nó giúp ích cho họ.

Một blockchain-based cloud cung cấp một số tài nguyên cụ thể cho các ứng dụng chạy trên nó:

- **Compute (CPU)**: Đây là quá trình xử lý thực tế của máy tính (và RAM khả dụng) để chạy code trong contract.
- **Bandwidth ("Network")**: Đây là lưu lượng của network giữa những người tham gia và các user, bao gồm tin nhắn đã gửi các transaction và những tin truyền tải các khối.
- **Storage**: Lưu trữ vĩnh viễn data trên các chain, thường được xem như là một function của không gian và thời gian lưu trữ.

Các blockchain hiện tại như Ethereum tính tất cả những thứ này bằng bằng một transaction fee trả trước bao gồm tất cả các chi phí trên. Tuy nhiên, chúng chỉ thu phí developer hoặc user một lần duy nhất mà thôi. Đây là một loại phí biến động cao thường gọi là "gas".

Các developer thích việc giá có thể dự đoán được để họ có thể lập ngân sách và cung cấp giá cho end user của họ. Trên NEAR, giá cho các tài nguyên đã nói ở trên là một số tiền được điều chỉnh từ từ dựa trên việc sử dụng hệ thống (và tùy thuộc vào độ mượt mà của resharding trong quá trình sử dụng khắc nghiệt) thay vì hoàn toàn dựa trên việc đấu giá. Điều này có nghĩa là developer có thể dự đoán được chi phí của việc chạy các transaction hoặc duy trì bộ nhớ của chúng.

</blockquote>

Để tìm hiểu sâu hơn về cách thức và lý do tại sao gas hoạt động theo cách như thế trên NEAR, hãy xem phần [Economics](https://near.org/papers/the-official-near-white-paper/#economics) của main whitepaper và phần [Transaction and các Storage Fee](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees) của economics whitepaper.

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::

[fungible token]: https://github.com/near-examples/FT/pull/42
[1.1M]: https://github.com/chadoh/erc20-test
[9]: https://explorer.testnet.near.org/transactions/GsgH2KoxLZoL8eoutM2NkHe5tBPnRfyhcDMZaBEsC7Sm
[storage staking]: /docs/concepts/storage-staking
[~45k]: https://ethereum.stackexchange.com/questions/71235/gas-limit-for-erc-20-tokens
[14]: https://explorer.testnet.near.org/transactions/5joKRvsmpEXzhVShsPDdV8z5EG9bGMWeuM9e9apLJhLe
[8]: https://explorer.testnet.near.org/transactions/34pW67zsotFsD1DY8GktNhZT9yP5KHHeWAmhKaYvvma6
[44k]: https://github.com/chadoh/erc20-test
