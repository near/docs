---
id: storage
title: Million Small Deposits
---

On NEAR, your contract pays for the storage it uses. This means that the more data you store, the more balance you need to cover for storage. If you don't handle these costs correctly (e.g. asking the user to cover their storage usage), then a million little deposits can drain your contract of its funds.

Chúng ta hãy cùng xem qua một ví dụ sau:

1. You launch [a guest book app](https://examples.near.org/guest-book-js), deploying your app's smart contract to the account `example.near`
2. Những người dùng ứng dụng của bạn có thể thêm tin nhắn của họ vào guest book. This means your users will pay a small gas fee to **store** their message to your contract.
3. When a new message comes in, NEAR will check if `example.near` has enough balance to cover the new storage needs. Nếu nó không đủ, transaction sẽ thất bại.

Lưu ý rằng điều này có thể tạo một attack surface. If sending data to your guest book is inexpensive to the user while costing the contract owner significantly more, a malicious user can exploit the imbalance to make maintaining the contract prohibitively expensive.

One possible way to tackle this problem is asking the user to attach money to the call to cover the storage used by their message.

:::tip Remember that you can release the *balance locked for storage* by simply deleting data from the contract. :::
