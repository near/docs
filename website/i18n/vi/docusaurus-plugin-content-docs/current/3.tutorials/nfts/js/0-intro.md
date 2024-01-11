---
id: introduction
title: NFT Zero to Hero JavaScript Edition
sidebar_label: Giới thiệu
---

> Trong serie _Zero to Hero_ này, bạn sẽ thấy một bộ hướng dẫn bao gồm mọi khía cạnh của một non-fungible token (NFT) smart contract. Bạn sẽ bắt đầu bằng cách mint ra một NFT bằng cách sử dụng một contract đã được deploy sẵn, và cuối cùng, bạn sẽ kết thúc việc xây dựng một một NFT smart contract hoàn chỉnh hỗ trợ mọi extension.

:::caution

The JS-SDK is currently in **[`Alpha`](https://github.com/near/near-sdk-js/releases/)**.

The JavaScript runtime has not been fully audited. For creating smart contracts that hold value please use [`near-sdk-rs`](https://github.com/near/near-sdk-rs).

:::

## Điều kiện cần

Để hoàn thành tốt các hướng dẫn này, bạn sẽ cần:

- [Node.js](/develop/prerequisites#nodejs)
- [Một NEAR Wallet](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli#setup)

---

## Tổng quan

Chỉ vài bước bạn sẽ từ **_Zero_** trở thành **_Hero_** trong một thời gian ngắn! 💪

| Bước | Tên                                                                    | Mô tả                                                                                                                  |
| ---- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1    | [Contract đã được deploy sẵn](/tutorials/nfts/js/predeployed-contract) | Mint một NFT mà không cần code, tạo, hay deploy một smart contract.                                                    |
| 2    | [Kiến trúc của contract](/tutorials/nfts/js/skeleton)                  | Tìm hiểu kiến trúc cơ bản của NFT smart contract và compile code.                                                      |
| 3    | [Mint](/tutorials/nfts/js/minting)                                     | Tóm gọn cách để hợp đồng thông minh có thể tạo ra một non-fungible token.                                              |
| 4    | [Upgrade một contract](/tutorials/nfts/js/upgrade-contract)            | Khám phá quy trình upgrade một smart contract có sẵn.                                                                  |
| 5    | [Enumeration](/tutorials/nfts/js/enumeration)                          | Khám phá các enumeration method có thể được dùng để trả về các state của smart contract.                               |
| 6    | [Core](/tutorials/nfts/js/core)                                        | Mở rộng NFT contract bằng cách sử dụng tiêu chuẩn cốt lõi cho phép transfer token                                      |
| 7    | [Các Approval](/tutorials/nfts/js/approvals)                           | Mở rộng contract cho phép các account khác có thể transfer các NFT thay mặt bạn.                                       |
| 8    | [Royalty](/tutorials/nfts/js/royalty)                                  | Thêm các NFT royalty để cho phép cài đặt tỷ lệ phần trăm sẽ trả cho người tạo token.                                   |
| 9    | [Event](/tutorials/nfts/js/events)                                     | in this tutorial you'll explore the events extension, allowing the contract to react on certain events.                |
| 10   | [Marketplace](/tutorials/nfts/js/marketplace)                          | Learn about how common marketplaces operate on NEAR and dive into some of the code that allows buying and selling NFTs |

---

## Bước tiếp theo

Sẵn sàng để bắt đầu? Hãy đến ngay hướng dẫn [Contract đã được deploy sẵn](/tutorials/nfts/js/predeployed-contract) và bắt đầu chuyến hành trình của bạn!

Nếu bạn đã biết về các non-fungible token và smart contract, hãy bỏ qua và đến ngay với các hướng dẫn nào bạn thấy thích thú. Các bài hướng dẫn đã được thiết kế để bạn có thể bắt đầu từ bất cứ nền tảng kiến thức nào!

:::info Bạn có câu hỏi? 👉 Join us on [Discord](https://near.chat/) and let us know in the `#development` channels. 👈

We also host daily [Office Hours](https://pages.near.org/developers/get-help/office-hours/) live where the DevRel team will answer any questions you may have. 🤔

Thứ Hai – Thứ Sáu 11AM – 12PM Pacific (6PM – 7PM UTC) :::
