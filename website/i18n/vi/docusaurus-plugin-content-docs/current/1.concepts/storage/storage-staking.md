---
id: storage-staking
title: Storage Staking
sidebar_label: Storage Staking
---

> Khi bạn deploy một smart contract trên NEAR, bạn cần trả cho chi phí lưu trữ mà smart contract này yêu cầu thông qua một cơ chế gọi là storage staking.
> 
> Trong storage staking (đôi khi được gọi là _state_ staking), tài khoản sở hữu smart contract phải stake (hoặc lock) một lượng token tương ứng với lượng dữ liệu được lưu trữ trên smart contract đó, tương ứng với việc khấu trừ một khoản từ account sở hữu contract.

<blockquote className="info">
<strong>Bạn đã biết về Ethereum?</strong><br /><br />

Nếu bạn quen thuộc với pricing model của Ethereum, thì bạn cũng biết rằng, giống như NEAR, nó cũng thu một khoản phí (gọi là "gas") cho mỗi transaction. Khác với NEAR, phí gas của Ethereum đại diện cho lượng dữ liệu được lưu trữ thông qua transaction đó. Điều này về cơ bản có nghĩa là bất kì ai đều có thể chi trả một lần cho việc lưu trữ dữ liệu vĩnh viễn on-chain. Đây là một economic design không tốt với hai nguyên nhân chính sau: 1. Những người sử dụng network (miner, trong trường hợp của Etherum 1) không được khuyến khích lưu trữ một lượng lớn dữ liệu một cách thích hợp, vì phí gas được trả trong quá khứ có thể làm tăng chi phí lữu trữ mãi mãi, và 2. Những người dùng của smart contract bị thu phí cho lượng dữ liệu mà họ gửi để lưu trữ trong nó, thay vì thu phí của người sỡ hữu smart contract.

</blockquote>

## How does NEAR's design align incentives?

Những token được dùng trong storage staking không thể sử dụng cho các việc khác, như là validation staking. Điều này làm tăng lợi nhuận mà những validator nhận được. Learn more in [the economics whitepaper](https://pages.near.org/papers/economics-in-sharded-blockchain/).

## When do tokens get staked?

Khi mỗi transaction chuẩn bị xử lý thêm dữ liệu.

Chúng ta hãy cùng xem qua một ví dụ sau:

1. Bạn chạy [ứng dụng guest book](https://examples.near.org/guest-book), deploy smart contract của ứng dụng bằng tài khoản `example.near`
2. Những người dùng ứng dụng của bạn có thể thêm tin nhắn của họ vào guest book. This means your users will, [by default](/concepts/protocol/gas#what-about-prepaid-gas), pay a small gas fee to send their message to your contract.
3. Khi có một call xảy ra, NEAR sẽ kiểm tra số dư của account `example.near` có đủ số dư dể stake một lượng token nhằm đảm bảo cho các nhu cầu lưu trữ phát sinh hay không. Nếu nó không đủ, transaction sẽ thất bại.

## The "million cheap data additions" attack

Lưu ý rằng điều này có thể tạo một attack surface. Tiếp tục với ví dụ ở trên, nếu gửi dữ liệu tới ứng dụng guest book của bạn mà người dùng chỉ trả một khoản không đáng kể, trong khi chi phí của người sở hữu contract tăng lên đáng kể, từ đó một người dùng xấu có thể lợi dụng việc mất cân bằng này để làm cho việc bảo trì contract trở nên cực kì đắt đỏ.

Vì vậy, hãy cẩn thận khi thiết kế smart contract của bạn để đảm bảo rằng những phương thức tấn công này sẽ tiêu tốn chi phí của những kẻ tấn công tiềm ẩn nhiều hơn bình thường.

## btw, you can remove data to unstake some tokens

Những người quen thuộc với "immutable data" trong blockchain sẽ thấy điều này đáng ngạc nhiên. Trong khi đó sự thật là một _indexing node_ sẽ giữ tất cả dữ liệu mãi mãi, _các validating node_ (là những node được chạy bởi hầu hết validator trong mạng lưới) thì không. Các smart contract có thể cung cấp nhiều cách để xóa dữ liệu, và dữ liệu này sẽ bị loại bỏ ra khỏi hầu hết các node trên network trong một vài [epoch](../basics/epoch.md).

Lưu ý rằng một call tới smart contract của bạn để xóa dữ liệu cần có một khoản phí gas tương ứng. Với giới hạn gas của NEAR, điều này tạo ra một cận trên về việc bao nhiêu dữ liệu có thể bị xóa trong mỗi một transaction.

## How much does it cost?

Storage staking được định giá bằng một số cụ thể bởi network, cụ thể được đặt là **1E19 yoctoNEAR mỗi byte**, hay **100kb mỗi NEAR token (Ⓝ)**. [^1] [^2]

JSON RPC API của NEAR cung cấp [một cách để truy vấn initial setting này](/api/rpc/setup#genesis-config) cũng như [một cách để truy vấn live config / những block gần nhất](/api/rpc/setup#protocol-config).

## Example cost breakdown

Hãy cùng xem xét một ví dụ sau.

Một [non-fungible token](https://github.com/near/NEPs/pull/4) là duy nhất, điều này có nghĩa mỗi token đều có ID riêng của nó. Contract phải lưu trữ một mapping từ những token ID đến account ID của người sở hữu.

Nếu một NFT được dùng để track **1 triệu** token, cần yêu cầu bao nhiêu chi phí lưu trữ cho ánh xạ token-ID-tới-người-sở hữu? Và cần bao nhiêu token để stake cho chi phí lưu trữ đó?

Let's calculate the storage needs when using a `PersistentMap` that stores data as UTF-8 strings.

Đây là `PersistentMap` của chúng ta:

```ts
type AccountId = string;
type TokenId = u64;
const tokenToOwner = new PersistentMap<TokenId, AccountId>("t2o");
```

Cụ thể hơn, tất cả dữ liệu lưu trữ trên NEAR blockchain được lưu trong một key-value database. Biến `'t2o'` được truyền vào `PersistentMap` giúp nó truy vết được tất cả dữ liệu của nó. Tại thời điểm viết bài, nếu tài khoản `example.near` của bạn sở hữu token với ID là `0`, thì đây là dữ liệu sẽ được lưu vào key-value database:

- key: `t2o::0`
- value: `example.near`

Như vậy với 1 triệu token, tất cả những gì chúng ta cần phải làm là cộng vào và nhân với 1 triệu:

1. Prefix `t2o`, sẽ được serialize thành ba byte ở dạng UTF-8, và hai dấu hai chấm sẽ thêm vào hai byte nữa. Tổng cộng là 5 byte.
2. Với một implementation mà `TokenId` tăng tự động, những giá trị sẽ nằm trong khoảng từ `0` đến `999999`, lúc này độ dài trung bình sẽ là 5 byte.
3. Giả sử chúng ta có những NEAR `AccountId` ở dạng chuẩn, và dự đoán những NEAR Account ID này sẽ theo pattern gần đúng của những domain name, mà [độ dài trung bình khoảng 10 kí tự](https://www.gaebler.com/Domain-Length-Research.htm), cộng thêm một top-level name dạng `.near`. Do đó, độ dài trung bình chấp nhận được vào khoảng 15 kí tự; chúng ta hãy giữ dự đoán này, và nếu tệ hơn hãy tăng lên 25 kí tự. Điều này sẽ tương ứng với 25 byte, vì các NEAR account ID phải sử dụng những kí tự trong bộ mã ASCII.

Do đó:

    1_000_000 * (5 + 5 + 25)

35 triệu byte. 350 lần của 100Kib, tương đương Ⓝ350. Tính toán chính xác như sau: Nhân 1e19 yoctoNEAR với mỗi byte, chúng ta tìm ra rằng mapping `tokenToOwner` với 35 triệu byte sẽ yêu cầu stake 3.5e26 yoctoNEAR, hay Ⓝ350

Lưu ý rằng bạn có thể giảm con số này xuống Ⓝ330 chỉ bằng việc thay đổi prefix từ `t2o` thành một kí tự. Hoặc bỏ qua toàn bộ! Bạn có thể có zero-length prefix trên một `PersistentVector` trong smart contract. Nếu bạn làm như vậy, bạn có thể giảm con số này xuống còn Ⓝ250.

## Calculate costs for your own contract

Tự tính toán số byte như ở trên sẽ khó và dễ xảy ra lỗi. Tin vui là: bạn không cần phải tính!

You can test the storage used using the [SDK environment](../../2.build/2.smart-contracts/anatomy/environment.md) and checking `env.storage_usage()`

## Other ways to keep costs down

Lưu trữ dữ liệu on-chain không rẻ đối với những người sử dụng network, và NEAR đẩy chi phí này cho những developer. Vì thế, nếu bạn là một developer thì bạn sẽ giảm chi phí như thế nào? Có hai phương pháp tiếp cận phổ biến:

1. Sử dụng một binary serialization format, thay cho JSON
2. Lưu dữ liệu off-chain

### Use a binary serialization format, rather than JSON

NEAR core team maintain một library gọi là [borsh](https://borsh.io/), nó được dùng một cách tự động khi bạn dùng `near-sdk-rs`. Someday, it will probably also be used by `near-sdk-js`.

Tưởng tượng rằng bạn muốn lưu một array dạng `[0, 1, 2, 3]`. Bạn có thể serialize nó ở dạng string hoặc lưu nó ở dạng UTF-8 byte. This is what `near-sdk-js` does today. Loại bỏ các space, cuối cùng bạn chỉ sử dụng 9 byte.

Using borsh, this same array gets saved as 8 bytes:

    \u0004\u0000\u0000\u0000\u0000\u0001\u0002\u0003

Thoạt nhìn, tiết kiệm 1 byte có lẽ không quan trọng lắm. Nhưng hãy nhìn kĩ hơn.

Bốn byte đầu tiên, `\u0004\u0000\u0000\u0000`, báo hiệu cho serializer đây là một array kiểu `u32` với chiều dài `4` đang sử dụng little-endian encoding. Những byte còn lại là các phần tử của mảng - `\u0000\u0001\u0002\u0003`. Khi bạn serialize thêm nhiều phần tử, mỗi lần sẽ thêm một byte vào cấu trúc dữ liệu này. Với JSON, mỗi phần tử mới yêu cầu thêm hai byte, để biểu diễn cả dấu phẩy và số mới này.

Nhìn chung, Borsh nhanh hơn, tốn ít chi phí bộ nhớ, và chi phí gas hơn. Hãy dùng nó nếu bạn có thể.

### Store data off-chain

This is especially important if you are storing user-generated data!

Let's use this [Guest Book](https://github.com/near-examples/guest-book-examples) as an example. Hiện tại, những người dùng ứng dụng có thể đăng nhập với NEAR và để lại một tin nhắn. Tin nhắn của họ được lưu on-chain.

Thử nghĩ rằng ứng dụng này rất phổ biến, và những người dùng đó bắt đầu vô tình để lại rất nhiều những tin nhắn dài. Người sở hữu contract có lẽ sẽ rất nhanh hết tiền để trả chi phí lưu trữ!

Chiến lược tốt hơn có thể là lưu trữ dữ liệu off-chain. Nếu bạn muốn giữ ứng dụng phân tán, thì giải pháp lưu trữ dữ liệu off-chain phổ biến là [IPFS](https://ipfs.io/). Với nó, bạn có thể biểu diễn bất kì tập hợp dữ liệu nào với một predictable content address được biểu diễn dưới dạng sau:

    QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG

Với một content address có thể biểu diễn một cấu trúc JSON hay một tấm hình hay bất kì kiểu dữ liệu nào. Dữ liệu này được lưu trữ vật lý ở đâu? Bạn có thể sử dụng [Filecoin](https://filecoin.io/) hoặc chạy IPFS server của riêng bạn để liên kết dữ liệu của ứng dụng.

With this approach, each record you add to your contract will be a predictable size.

## Summary

Cấu trúc của NEAR cải tiến các hoạt động của network trong khi đó vẫn hỗ trợ flexibility và predictability cho các contract developer. Quản lý chi phí lưu trữ là một khía cạnh quan trọng của smart contract design, và các library của NEAR khiến nó trở nên dễ dàng để nhận ra bao nhiêu chi phí lưu trữ là đủ cho ứng dụng của bạn.

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>Ask it on StackOverflow!</h8></a>
:::

## Footnotes

[^1]: [Storage staking price](https://gov.near.org/t/storage-staking-price/399)
[^2]: [Giảm chi phí lưu trữ 10x](https://github.com/near/nearcore/pull/3881)
