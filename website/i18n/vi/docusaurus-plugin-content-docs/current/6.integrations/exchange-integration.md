---
id: exchange-integration
title: Tích hợp sàn giao dịch
sidebar_label: Tích hợp sàn giao dịch
---

## Tham chiếu tích hợp {#integration-reference}

- [Các thay đổi về số dư](/integrations/balance-changes)
- [Các account](/integrations/accounts)
- [Các Fungible Token](/integrations/fungible-tokens)
- [Các Implicit Account](/integrations/implicit-accounts)

### Các link tham chiếu Transaction {#transaction-reference-links}

 - [Cơ bản](/concepts/protocol/transactions)
 - [Thông số kỹ thuật](https://nomicon.io/RuntimeSpec/Transactions)
 - [Khởi tạo các transaction](/integrations/create-transactions)

## Các Block và Finality {#blocks-and-finality}

Một vài phần thông tin quan trọng liên quan đến các block và finality bao gồm:

- Block time được kỳ vọng trong vòng 1s và thời gian được kỳ vọng để finality trong vòng 2s. Block cuối cùng có thể được query bằng việc chỉ định `{"finality": "final"}` trong block query. Ví dụ, để lấy final block mới nhất trên mainet, có thể chạy

```bash
http post https://rpc.mainnet.near.org method=block params:='{"finality":"final"}' id=123 jsonrpc=2.0
```

- Block height không nhất thiết phải liên tiếp và một số height nhất định có thể được bỏ qua nếu, ví dụ, một block producer cho height này offline. Ví dụ, sau khi một block tại height là 100 được sản xuất, block tại height 101 có thể bị bỏ qua. Khi block tại height 102 được sản xuất, block phía trước nó là block tại height 100.

- Một vài block có thể không bao gồm các chunk mới nếu, ví dụ, chunk producer phía trước đó offline. Kể cả trong RPC trả về kết quả của mọi block sẽ không có các field `chunk` là non-empty, thì cũng không có nghĩa rằng đó là một chunk mới được đính kèm trong block. Cách để biết chunk được đính kèm trong block hay không đó là kiểm tra liệu rằng `height_included` trong chunk có bằng height của block hay không.

## Chạy một Archival Node {#running-an-archival-node}
Vui lòng tham khảo các thay đổi cấu hình được yêu cầu trong `config.json` cho archival node bằng cách tham khảo tài liệu trên [Run an Archival Node](https://near-nodes.io/archival/run-archival-node-with-nearup).

## Staking và Delegation {#staking-and-delegation}

- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
