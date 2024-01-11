---
id: overview
title: Quick Overview
---

Lets start with a quick overview of the different elements that compose the NEAR blockchain.

---

## Các account

NEAR uses human-readable account names such as `alice.near` or `bob.near` instead of a public hash such as`0x71C7656EC7ab88b098defB751B7401B5f6d8976F`.

Những account này đồng thời cũng có quyền tạo các subaccount như `nft.alice.near` hoặc `example2.bob.near`. Cần hiểu rằng chỉ có root account mới có thể tạo subaccount. Do vậy chỉ có `alice.near` có thể tạo `nft.alice.near` và chỉ có `nft.alice.near` mới có thể tạo `example.nft.alice.near`. Lưu ý rằng `alice.near` ***không*** có quyền tạo `example.nft.alice.near`. Chỉ account mẹ trực tiếp mới có quyền tạo subaccount.

:::tip Để biết thêm chi tiết vui lòng xem **[session các account](/concepts/basics/accounts/model)**. :::

<hr class="subsection" />

## Các Key

Trên hầu hết các blockchain, chỉ có một [cặp public/private key](https://en.wikipedia.org/wiki/Public-key_cryptography) cho mỗi account. Thế nhưng trên NEAR, mỗi account có thể có nhiều cặp key được kết hợp với chúng gọi là "các Access Key". Có hai loại "Access Key":

- [Full Access](/concepts/basics/accounts/access-keys#full-access-keys) _(Có toàn quyền kiểm soát account)_
- [Function Call](/concepts/basics/accounts/access-keys#function-call-keys) _(Chỉ được sign transaction không ảnh hưởng đến tiền)_

Các Full access key cho phép kiểm soát hoàn toàn account. Bạn có thể gửi fund, tạo các sub-account, xoá account, và hơn thế nữa. Các Function call key chỉ cho phép call các method nhất định của một smart contract xác định, và **không** cho phép tranfer tiền. Các key này có thể được những dApp developer sử dụng để cho phép người dùng sign các transaction đơn giản thay đổi state trên blockchain, mà không cần phải liên tục chuyển hướng đến ví của họ để yêu cầu cấp quyền. Chúng có thể được mở rộng hoặc thu hẹp phạm vi tùy thuộc vào từng trường hợp sử dụng.

:::tip Để biết thêm chi tiết xin vui lòng xem tại **[phần các access key](/concepts/basics/accounts/access-keys)**. :::

<hr class="subsection" />

### Contracts

Every NEAR account can hold **a** smart contract, which is a small piece of logic embedded directly in the account. Smart contracts in NEAR can be developed using either Javascript or [Rust](https://www.rust-lang.org/). Các Smart contract đã được deploy có thể được [update](/sdk/rust/building/prototyping) mọi lúc nhưng không được xóa. Đây chính là nơi [các sub-account](#concepts/basics/accounts/model#subaccounts) có thể tồn tại. NEAR cho phép người dùng tổ chức và tạo hệ thống phân cấp cho các tài khoản của họ.

Ví dụ như, benji có thể sở hữu root account `benji.near`. Sau đó anh ta chứa tất cả các NFT contract của mình như các sub-account của `nft.benji.near`. Ví dụ, anh ấy đã làm việc trên một cool lazy minting contract được deploy vào `lazy.nft.benji.near`. Điều này không chỉ cho phép tổ chức tốt hơn mà còn cho phép các developer dễ dàng xóa và tạo lại các account để xóa state.

:::tip Để biết thêm chi tiết, xin vui lòng xem hướng dẫn tại **[deploy các contract](/sdk/rust/promises/deploy-contract)**. :::

<hr class="subsection" />

### Storage

Bất cứ thông tin nào được lưu trên NEAR đều sử dụng một cơ chế gọi là [storage staking](/concepts/storage/storage-staking). Nói ngắn gọn, một account phải duy trì một số dư nhất định, được khoá lại để trang trải chi phí lưu trữ. Nếu phần lưu trữ đó được giải phóng, bạn có thể sử dụng phần tiền này. Đây là lý do tại sao các account ID được đặt tên trên NEAR cần một khoảng deposit để tạo. Nếu bạn cố gắng lưu trữ state on-chain mà không có số dư cần thiết trong account của mình để trang trải chi phí, error sẽ xảy ra và sẽ yêu cầu bạn thêm NEAR nhiều hơn vào account của mình.

:::tip Để biết thêm chi tiết về storage staking, hãy xem **[phần storage staking](/concepts/storage/storage-staking)**. :::