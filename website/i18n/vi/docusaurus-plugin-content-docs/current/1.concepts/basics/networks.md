---
id: networks
title: NEAR Networks
sidebar_label: Networks
---

NEAR Protocol hoạt động trên một số network, mỗi network hoạt động với các validator độc lập và state khác nhau. Các network này như sau:

- [`mainnet`](/concepts/basics/networks#mainnet)
- [`testnet`](/concepts/basics/networks#testnet)
- [`localnet`](/concepts/basics/networks#localnet)

## Mainnet {#mainnet}

`mainnet` cho smart contract và token sẵn sàng chạy thực tế. Những contract sẵn sàng cho `mainnet` phải trải qua quá trình kiểm tra nghiêm ngặt và các quá trình đánh giá bảo mật độc lập nếu cần thiết. `mainnet` là mạng duy nhất mà trạng thái(state) được đảm bảo tồn tại theo thời gian _(tuân theo các đảm bảo bảo mật điển hình của quy trình xác thực mạng lưới)_.

- Status: `https://rpc.mainnet.near.org/status`
- [ [Explorer](https://nearblocks.io) ]
- [ [Wallet](https://wallet.near.org) ]
- [ [Data Snapshots](https://near-nodes.io/intro/node-data-snapshots) ]

## Testnet {#testnet}

`testnet` là public network và là test network cuối cùng cho các thay đổi của `nearcore` trước khi được deploy lên `mainnet`. `testnet` là để test tất cả các tính năng của NEAR platform trước khi đưa vào delpoy trên `mainnet`. Từ việc tạo account, mock quá trình chuyển Token, công cụ phát triển và phát triển smart contract thì môi trường `testnet` cũng gần giống với môi trường `mainnet`. Tất cả các thay đổi của `nearcore` được deploy ở release candidate đầu tiên trên mạng testnet trước khi các thay đổi này được phát hành trên mạng `mainnet`. Một số validator của mạng `testnet` xác nhận các transaction và tạo ra các block mới. Các dApp developer deploy các ứng dụng của họ trên `testnet` trước khi deply trên `mainnet`. Lưu ý quan trọng ở mạng `testnet` là có các transaction và state riêng.

- Status: `https://rpc.testnet.near.org/status`
- [ [Explorer](https://explorer.testnet.near.org) ]
- [ [Wallet](https://testnet.mynearwallet.com/) ]
- [ [Data Snapshots](https://near-nodes.io/intro/node-data-snapshots) ]

## Localnet {#localnet}

`localnet` là mạng dành cho các developer muốn làm việc với NEAR platform độc lập với blockchain public. Bạn sẽ cần tạo các node bởi chính bạn. `localnet` cung cấp cho bạn toàn quyền kiểm soát các account, economic và các yếu tố khác cho các trường hợp sử dụng nâng cao hơn (bao gồm việc thực hiện các thay đổi đối với `nearcore`). Đối với các developer, `localnet` là lựa chọn phù hợp nếu bạn muốn tránh rò rỉ thông tin về công việc của mình trong quá trình develop.

Thông tin thêm về phát triển local [ở đây](https://near-nodes.io/validator/running-a-node)

`near-cli` [network selection](/tools/near-cli#network-selection) variable is `local`

---

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
<h8>Ask it on StackOverflow!</h8>
</a>
:::
