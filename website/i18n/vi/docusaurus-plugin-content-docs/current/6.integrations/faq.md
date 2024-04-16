---
id: faq
title: Tích hợp FAQ
sidebar_label: Tích hợp FAQ
---

## Orientation

### What is a good project summary for NEAR?

NEAR là một sharded, public, proof-of-stake blockchain và smart contract platform. Nó được build trên Rust và các contract compile thành WASM. Về mặt khái niệm, nó tương tự như Ethereum 2.0.

### What's special about NEAR?

NEAR là một blockchain dành cho các builder.

Nếu bạn hiểu những điều cơ bản về phát triển web, bạn có thể viết, test và triển khai các ứng dụng phi tập trung có thể mở rộng trong vài phút trên blockchain thân thiện với developer nhất mà không cần phải học các công cụ hoặc ngôn ngữ mới.

### Is NEAR open source?

Đúng. Have a look at our [GitHub organization](https://github.com/near).

### How are cryptographic functions used?

Chúng tôi hỗ trợ cả `secp256k1` và `ed25519` cho các account key và `ed25519` cho các signing transaction. Chúng tôi hiện đang sử dụng các library `ed25519_dalek` và `sha2` cho crypto.

### Do you have any on-chain governance mechanisms?

NEAR không có bất kỳ on-chain governace nào tại thời điểm này. Bất kỳ thay đổi nào đối với state hoặc state transition function phải được thực hiện thông qua một hard fork.

### Do you have a bug-bounty program?

Kế hoạch của chúng tôi là có một Bug Bounty program minh bạch với các hướng dẫn rõ ràng để tưởng thưởng cho các báo cáo đó. Các khoản thưởng có thể sẽ dựa trên các bảng xếp hạng có sẵn công khai do các protocol developer cung cấp dựa trên mức độ nghiêm trọng của issue.

### What contracts should we be aware of right now?

Chúng tôi đã phát triển một số [initial contracts](https://github.com/near/core-contracts) với **những contract được in đậm** là những contract phát triển nhất tại thời điểm viết bài

- **Staking Pool / Delegation contract**
- **Lockup / Vesting contract**
- Whitelist Contract
- Staking Pool Factory
- Multisig contract

### Do you have a cold wallet implementation (ie. Ledger)?

https://github.com/near/near-ledger-app

## Validators

### What is the process for becoming a validator?

Validation là không cần cấp phép và được xác định thông qua đấu giá. Các bên muốn trở thành validator sẽ gửi một transaction đặc biệt đến chain một ngày trước đó cho biết họ muốn stake bao nhiêu token. Một auction được thực hiện để xác định số stake cần thiết tối thiểu để đạt được validation seat trong thời gian tiếp theo và nếu số tiền được gửi lớn hơn ngưỡng tối thiểu, người gửi sẽ xác thực ít nhất một shard trong epoch tiếp theo.

### How long does a validator remain a validator?

Một validator sẽ không còn là validator vì những lý do sau:

- Không sản xuất đủ các block hoặc các chunk.
- Không được bầu trong cuộc đấu giá cho epoch tiếp theo vì stake của họ không đủ lớn.
- Bị slash. Nếu không thì một validator sẽ vẫn là một validator vô thời hạn.

Việc bầu chọn validator diễn ra theo từng epoch. The [Nightshade whitepaper](/docs/Nightshade.pdf) introduces epochs this way: "the maintenance of the network is done in epochs" where an epoch is a period of time on the order of half a day.

Vào đầu mỗi epoch, một số phép tính tạo ra danh sách các validators cho _epoch tiếp theo_. Input cho phép tính này bao gồm tất cả các account đã "giơ tay trở thành một validator" bằng cách gửi một transaction đặc biệt ([`StakeAction`](https://nomicon.io/RuntimeSpec/Actions.html#stakeaction)) thể hiện cam kết về một số lượng các token vượt quá ngưỡng staking của hệ thống, cũng như các validator từ epoch trước đó. Output của phép tính là danh sách các validator cho epoch tiếp theo.

### What is the penalty for misbehaving validators?

Các validator không bị slash vì offline nhưng họ bỏ lỡ phần thưởng của việc validating. Các validator bỏ lỡ quá nhiều các block hoặc các chunk cũng sẽ bị xóa khỏi bộ validation trong auction tiếp theo và không nhận được bất kỳ phần thưởng nào (nhưng, mặt khác, không bị slash).

Any foul play on the part of the validator that is detected by the system may result in a "slashing event" where the validator is marked as out of integrity and forfeit their stake (according to some formula of progressive severity). Slashed stake bị đốt cháy.

### What is the mechanism for delegating stake to validators?

NEAR hỗ trợ các validation key riêng biệt có thể được sử dụng trong các smart contract để delegate stake. Việc delegate được thực hiện thông qua smart contract, cho phép một validator xác định một cách tùy chỉnh để thu thập stake, quản lý và chia phần thưởng. Điều này cũng cho phép các validator cung cấp đòn bẩy hoặc các phái sinh trên stake. Stake được delegate sẽ bị slash như bất kỳ stake khác nếu node hoạt động sai.

Nếu validator sử dụng sai thì quỹ của người delegate cũng sẽ bị slash. Không có thời gian chờ đợi để người được ủy quyền rút stake của họ.

### Does a validator control funds that have been delegated to them?

Sự ủy quyền là quyền giám sát (bạn đang chuyển tiền vào một tài khoản khác, smart contract triển khai staking pool). Chúng tôi cung cấp một reference implementation được xem xét và kiểm tra bảo mật bởi 100 validator tại thời điểm viết bài.

Chúng tôi cho validator viết và triển khai các contract mới nhưng tuỳ thuộc vào người dùng quyết định xem họ có muốn delegate hay không. Các validator có thể cạnh tranh để được delegate bằng cách chọn các logic và điều kiện khác nhau xung quanh việc tối ưu hóa thuế, v. v.

Hiện tại không có slashing nhưng chúng sẽ được thêm vào khi chúng tôi thêm các shard vào hệ thống. Tại một số thời điểm các validator sẽ có thể thêm một tùy chọn để bảo vệ các delegator khỏi bị slashing (tương tự như Tezos model).

### How do we get the balance of an account after it has delegated funds?

Một người sẽ cần phải truy vấn staking pool contract để có được số dư.

## Nodes

### Can a node be configured to archive all blockchain data since genesis?

v Có. Khởi động node bằng dòng lệnh sau:

```sh
./target/release/near run --archive
```

### Can a node be configured to expose an RPC (ex: HTTP) interface?

Có. Tất cả các node expose interface này theo mặc định, có thể được cấu hình bằng cách đặt giá trị của `listen_addr:port` trong file `config.json` của node.

### Can a node be gracefully terminated and restarted (using archived data on disk to continue syncing)?

Có.

### Does a node expose an interface for retrieving health telemetry in a structured format (ex: JSON) over RPC?

Có. `GET /status` và `GET /health` cung cấp interface này.

- `/status`: block height, syncing status, peer count, v.v...
- `/health`: success/failure nếu node đang run & progress

### Can a node be started using a Dockerfile without human supervision?

Có.

```sh
docker run <port mapping> <mount data folder> <ENV vars> nearprotocol/nearcore:latest
```

Xem `nearcore/scripts/subselib.py` để biết các ví dụ khác nhau về cấu hình.

### What is the source of truth for current block height exposed via API?

- MainNet
  - https://nearblocks.io
  - `https://rpc.mainnet.near.org/status`
- TestNet
  - https://testnet.nearblocks.io
  - `https://rpc.testnet.near.org/status`

### How old can the referenced block hash be before it's invalid?

Có một tham số genesis có thể được tham khảo trong bất kỳ network nào bằng cách sử dụng:

```sh
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
# in the line above, testnet may be replaced with mainnet or betanet
```

Đó là `43200` giây hoặc `~12` tiếng. Bạn có thể xem cấu hình trực tiếp cho `epoch_length` bằng cách sử dụng [`protocol_config` RPC endpoint](/api/rpc/setup#protocol-config).

Trong response, chúng tôi tìm thấy `transaction_validity_period": 86400` (và vì mất khoảng 1 giây để tạo một block, nên khoảng thời gian này là khoảng 24 giờ)

## Blockchain

### How will the network will be bootstrapped?

Việc phân phối tại thời điểm genesis sẽ được mở rộng trong NEAR team, những contributor của chúng tôi, các đối tác dự án (tức là contributor, các beta application, các infrastructure developer, v. v.) và NEAR foundation (với nhiều phần được tách biệt cho hoạt động phân phối post-MainNet và không có sẵn cho stake do vậy NEAR foundation không thể kiểm soát network).

Sẽ có các auction diễn ra trên platform sau khi khởi chạy, sẽ phân bổ số lượng lớn token trong 2 năm tới. Ngoài ra, chúng tôi đang có kế hoạch chạy TestNet nơi bất kỳ validator nào tham gia sẽ nhận được phần thưởng bằng các token thực. Chúng tôi đang có kế hoạch đưa ít nhất 50 separate entity trở thành các validator khi ra mắt.

### What is the network upgrade process?

Chúng tôi hiện đang nâng cấp thông qua việc khởi động lại với một genesis block mới.

### Which consensus algorithm does NEAR use?

NEAR là một sharded **proof-of-stake** blockchain.

_You can read more in our [Nightshade whitepaper](/docs/Nightshade.pdf)._

> _A few relevant details have been extracted here for convenience:_
> 
> [Vì NEAR là một sharded blockchain, nên có những thách thức cần phải vượt qua] bao gồm tính hợp lệ của state và tính khả dụng của dữ liệu. _Nightshade_ là giải pháp NEAR Protocol được xây dựng để giải quyết những vấn đề này.
> 
> Nightshade sử dụng chain consensus nặng nhất. Cụ thể khi block producer tạo ra một block (xem phần 3.3), họ có thể thu thập chữ ký từ các block producer khác và các validator chứng thực block trước đó. Trọng lượng của một block sau đó là stake tích lũy của tất cả những người ký có chữ ký được bao gồm trong block. Trọng lượng của chain là tổng trọng lượng của block.
> 
> Ngoài chain consensus nặng nhất, chúng tôi sử dụng một finality gadget để sử dụng các chứng thực cho việc hoàn thiện các block. Để giảm độ phức tạp của hệ thống, chúng tôi sử dụng finality gadget mà không ảnh hưởng đến quy tắc lựa chọn fork theo bất kỳ cách nào, và thay vào đó chỉ đưa ra các điều kiện slashing bổ sung, chẳng hạn như sau khi một block được hoàn thiện bởi finality gadget, thì fork là không thể xảy ra trừ khi một tỷ lệ rất lớn trên tổng số stake bị slash.

### How does on-chain transaction finality work?

Finality là xác định và yêu cầu ít nhất 3 block cũng như (2/3 +1) chữ ký của bộ validator hiện tại.

Trong điều kiện bình thường, chúng tôi mong finality xảy ra tại đúng 3 block, nhưng điều này không được đảm bảo.

Finality sẽ được expose thông qua RPC khi truy vấn block hoặc transaction.

Định nghĩa của chúng tôi về finality là CẢ HAI:

- Block có một số lượng cam kết trước từ finality gadget. See details of the finality gadget [[here]](/docs/PoST.pdf)
- Ít nhất 120 block (2-3 phút) được build on top của block of interest. Điều này có liên quan trong trường hợp chuyển đổi state không hợp lệ trong một số shard và cung cấp đủ thời gian cho các challenge thay đổi state. Trong trường hợp tất cả các shard được theo dõi và một vài cơ chế tạm dừng giữa các node được sử dụng, thì điều này là không cần thiết. Chúng tôi khuyên các sàn giao dịch nên theo dõi toàn bộ các shard.

## Accounts

### How are addresses generated?

Vui lòng kiểm tra tiêu chuẩn kỹ thuật tại đây về các account https://nomicon.io/DataStructures/Account.html.

### What is the balance record-keeping model on the NEAR platform?

NEAR sử dụng mô hình `Account`-based. Tất cả các user và các contract được liên kết với ít nhất 1 account. Mỗi account hoạt động trên một single shard. Mỗi account có thể có nhiều key để sign các transaction.

_Bạn có thể đọc thêm [về NEAR accounts tại đây](https://nomicon.io/DataStructures/Account.html)_

### How are user accounts represented on-chain?

Các user tạo account với human-readable name (ví dụ `alice`) mà có thể chứa nhiều cặp key với các quyền riêng lẻ. Các account có thể được transfer tự động và an toàn giữa các bên như một native transaction trên network. Các quyền cũng có thể lập trình được với các smart contract. Ví dụ, một lockup contract chỉ là một account có với các quyền hạn trên key không cho phép chuyển các khoản tiền lớn hơn những khoản đã được mở khóa.

### Is there a minimum account balance?

To limit on-chain "dust", accounts (and contracts) are charged a refundable deposit for storing data on the chain. This means that if the balance of the account does not have enough balance to cover an increased deposit for additional storage of data, storing additional data will fail. Also, any user can remove their own account and transfer left over balance to another (beneficiary) account.

There will be a restoration mechanism for accounts removed (or slept) in this way implemented in the future.

### How many keys are used?

Một tài khoản có thể có nhiều key tùy ý, miễn là nó có đủ token cho storage của chúng.

### Which balance look-ups exists? What is required?

Chúng tôi có một [RPC method để xem account](/docs/api/rpc#view_account).

[ JS implementation tại đây](https://github.com/near/near-api-js/blob/d7f0cb87ec320b723734045a4ee9d17d94574a19/src/providers/json-rpc-provider.ts#L73). Lưu ý rằng trong RPC interface này, bạn có thể chỉ định yêu cầu về finality (truy vấn state mới nhất hay state đã hoàn thiện).

For custody purposes, it is recommended not to rely on latest state but only what is finalized.

## Fees

### What is the fee structure for on-chain transactions?

NEAR sử dụng một mô hình gas-based trong đó biểu phí thường được điều chỉnh một cách xác định dựa trên sự tắc nghẽn của network.

Chúng tôi tránh thực hiện các thay đổi quá lớn thông qua việc re-sharding bằng cách thay đổi số lượng các shard có sẵn (và do đó là thông lượng).

Tài khoản không có các tài nguyên được liên kết. Lượng gas được xác định trước cho tất cả các transaction ngoại trừ các function call. Đối với các function call transaction, user (hoặc nhiều khả năng là developer) đính kèm lượng gas cần thiết. Nếu một số gas còn lại sau function call, nó sẽ được chuyển đổi trở lại NEAR và được hoàn lại vào account trả phí ban đầu.

### How do we know how much gas to add to a transaction?

- Xem tài liệu tham khảo tại đây: https://nomicon.io/Economics/
- Xem tài liệu API để [khám phá biểu phí gas qua RPC tại đây](/docs/api/rpc#gas-price).

Người phát hành một transaction nên đính kèm một số lượng gas bằng cách phỏng đoán ngân sách sẽ giúp transaction được xử lý. Contract biết cần bao nhiêu tiền cho các contract call chéo khác nhau. Biểu phí gas được tính toán và cố định cho mỗi block, nhưng có thể thay đổi từ block này sang block khác tùy thuộc vào mức độ đầy / bận của block. Nếu các block trở nên đầy hơn một nửa thì giá gas sẽ tăng.

Chúng tôi cũng đang xem xét thêm giới hạn giá gas tối đa.

## Transactions

### How do we follow Tx status?

Xem [RPC interface liên quan để tìm status của transaction tại đây](/docs/api/rpc#transaction-status).

### How are transactions constructed and signed?

Transaction là tập hợp của các data liên quan được tạo và ký bằng mật mã bởi người gửi bằng cách sử dụng key cá nhân của họ. Public key liên quan là một phần của transaction và được sử dụng để xác minh chữ ký. Chỉ các transaction đã ký mới có thể được gửi đến network để xử lý.

Các transaction có thể được tạo và ký offline. Nodes không yêu cầu phải ký. Chúng tôi có kế hoạch thêm block hash tùy chọn gần đây để giúp ngăn chặn các replay attack.

See [transactions](/concepts/protocol/transactions) in the concepts section of our documentation.

### How is the hash preimage generated? Which fields does the raw transaction consist of?

Đối với một transaction, chúng tôi sign phần hash của transaction. Cụ thể hơn, những gì được sign là `sha256` của object transaction được tuần tự hóa trong borsh (https://github.com/near/borsh).

### How do transactions work on the NEAR platform?

A `Transaction` is made up of one or more `Action`s. Một action có thể (hiện tại) là một trong 8 loại: `CreateAccount`, `DeployContract`, `FunctionCall`, `Transfer`, `Stake`, `AddKey`, `DeleteKey` và `DeleteAccount`. Các transaction do người gửi soạn thảo và sau đó được sign bằng các key riêng của NEAR account hợp lệ để tạo một `SignedTransaction`. Signed transaction này được coi là đã sẵn sàng để gửi đến network để xử lý.

Transactions được nhận thông qua JSON-RPC endpoint của chúng tôi và được chuyển đến shard nơi `sender` account hoạt động. Sau đó, "home shard" này cho sender account chịu trách nhiệm xử lý transaction và tạo các receipt liên quan để áp dụng trên toàn network.

Sau khi được network tiếp nhận, các signed transaction sẽ được xác minh (sử dụng key public được nhúng của người ký) và được chuyển thành tập hợp các `Receipt`, cho một action. Receipt có hai loại: `Action Receipt` là loại phổ biến nhất và đại diện cho hầu hết các hoạt động trên network trong khi `Data Receipt` xử lý trường hợp rất đặc biệt của "một ` FunctionCallAction ` bao gồm một Promise ". Các receipt này sau đó sẽ được phổ biến và áp dụng trên toàn network theo quy tắc "home shard" cho tất cả các account người nhận bị ảnh hưởng.

Các receipt này sau đó được truyền đi khắp network bằng cách sử dụng "home shard" của account người nhận vì mỗi account tồn tại trên một và chỉ một shard. Sau khi được định vị trên shard chính xác, receipt được lấy từ một nonce-based [queue](https://nomicon.io/ChainSpec/Transactions#pool-iterator).

Các receipt có thể tạo ra các receipt khác, các receipt mới mà chúng lần lượt được truyền đi khắp network cho đến khi tất cả các receipt đã được áp dụng. Nếu bất kỳ action nào trong một transaction không thành công, toàn bộ transaction sẽ được khôi phục và mọi khoản phí chưa thanh toán sẽ được hoàn trả vào account thích hợp.

Để biết thêm chi tiết, hãy xem các thông số kỹ thuật tại [`Transactions`](https://nomicon.io/RuntimeSpec/Transactions.html), [`Actions`](https://nomicon.io/RuntimeSpec/Actions.html), [`Receipts`](https://nomicon.io/RuntimeSpec/Receipts.html)

### How does NEAR serialize transactions?

Chúng tôi sử dụng một format binary serialize đơn giản có tính xác định: https://borsh.io

## Additional Resources

- Whitepaper

  - Tổng quan chung xem tại [Hướng dẫn dành cho người mới bắt đầu về NEAR Blockchain](https://near.org/blog/the-beginners-guide-to-the-near-blockchain)
  - [NEAR Whitepaper](https://pages.near.org/papers/the-official-near-white-paper/)

- Github
  - https://www.github.com/near

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
