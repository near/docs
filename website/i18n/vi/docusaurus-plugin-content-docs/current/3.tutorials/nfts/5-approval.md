---
id: approvals
title: Approval
sidebar_label: Approval
---

Trong bài hướng dẫn này bạn sẽ học được những điều cơ bản của một hệ thống approval management, nó sẽ cho phép bạn cấp quyền truy cập cho người khác để transfer các NFT thay mình. Đây là xương sống của tất cả các NFT marketplace và cho phép một số tình huống phức tạp nhưng cần thiết xảy ra. Nếu bạn tham gia với chúng tôi lần đầu, đừng ngại clone [repository này](https://github.com/near-examples/nft-tutorial) và checkout branch `4.core` để theo dõi.


```bash
git checkout 4.core
```

:::tip If you wish to see the finished code for this _Approval_ tutorial, you can find it on the `5.approval` branch. :::

## Giới thiệu

Up until this point you've created a smart contract that allows users to mint and transfer NFTs as well as query for information using the [enumeration standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). Như chúng ta đã làm trong các hướng dẫn trước, hãy chia vấn đề thành các nhiệm vụ nhỏ hơn, dễ xử lý. Let's first define some of the end goals that we want to accomplish as per the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension of the standard. Chúng ta muốn user có khả năng:

- Grant other accounts access to transfer their NFTs on a per token basis.
- Check if an account has access to a specific token.
- Revoke a specific account the ability to transfer an NFT.
- Revoke **all** other accounts the ability to transfer an NFT.

Nếu bạn nhìn vào tất cả các mục tiêu này, chúng đều dựa trên cơ sở mỗi token. Đây là một dấu hiệu rõ ràng rằng bạn nên thay đổi cấu trúc `Token` để theo dõi thông tin cho từng token.

## Cho phép một account transfer NFT của bạn

Hãy bắt đầu bằng cách cố gắng hoàn thành mục tiêu đầu tiên. Làm cách nào bạn có thể cấp cho một account khác quyền truy cập để thay bạn chuyển một NFT?

Cách đơn giản nhất mà bạn có thể làm là thêm danh sách các account được chấp thuận vào cấu trúc `Token`. Khi transfer NFT, nếu người gọi không phải là chủ sở hữu, bạn có thể kiểm tra xem họ có trong danh sách này hay không.

Trước khi transfer, bạn cần xoá danh sách các account được chấp thuận vì chủ sở hữu mới sẽ không muốn các account được chủ sở hữu ban đầu chấp thuận vẫn có quyền truy cập để transfer NFT mới của họ.

### Vấn đề {#the-problem}

Nhìn bên ngoài, điều này sẽ hoạt động, nhưng nếu bạn bắt đầu nghĩ về các trường hợp phức tạp, một số vấn đề sẽ nảy sinh. Thông thường khi thực hiện development, một cách tiếp cận phổ biến là nghĩ về giải pháp dễ dàng và đơn giản nhất. Khi bạn đã tìm giải pháp, bạn có thể bắt đầu phân nhánh để suy nghĩ về cách tối ưu hóa và các trường phức tạp.

Hãy xem xét kịch bản sau đây. Benji có một NFT và cấp cho hai marketplace riêng biệt quyền truy cập để transfer token của mình. Bằng cách làm như vậy, anh ấy đang đặt bán NFT (tìm hiểu thêm về điều đó trong phần [ tích hợp marketplace](#marketplace-integrations)). Giả sử anh ấy đặt bán NFT với giá 1 NEAR trên cả hai market. Danh sách token của các approve account ID sẽ giống như sau:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

Josh sau đó đến và mua NFT trên marketplace A với giá 1 NEAR. Điều này sẽ gỡ NFT đang bán khỏi marketplace A và xoá danh sách các account được chấp thuận. Tuy nhiên vẫn có token được bán với giá 1 NEAR trên marketplace B và không có cách nào để biết rằng token này đã được mua trên marketplace A bởi Josh. Cấu trúc token mới sẽ trông như sau:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: []
}
```

Giả sử Josh đang thiếu tiền mặt và muốn đẩy nhanh NFT này đi và bán nó với giá gấp 10 lần giá trên marketplace B. Anh ta bán nó và vì lý do nào đó, marketplace được build theo cách mà nếu bạn cố gắng đưa một token lên để bán hai lần, nó sẽ giữ lại dữ liệu bán hàng của lần đầu. Điều này có nghĩa rằng từ góc nhìn của marketplace B, token vẫn được bán với giá 1 NEAR (đó là giá mà Benji đã niêm yết ban đầu).

Vì Josh đã chấp thuận cho marketplace thử và bán nó, cấu trúc token sẽ trông như sau:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

Nếu sau đó Mike đến và mua NFT chỉ với 1 NEAR trên marketplace B, marketplace sẽ thử chuyển NFT và về mặt kỹ thuật, Josh đã chấp thuận marketplace và nó được nằm trong danh sách các approve account, giao dịch sẽ diễn ra bình thường.

### Giải pháp {#the-solution}

Bây giờ chúng ta đã xác định được vấn đề với giải pháp ban đầu, hãy nghĩ về những cách mà chúng ta có thể khắc phục nó. Điều gì sẽ xảy ra nếu bây giờ, thay vì chỉ theo dõi danh sách các approve account, bạn thêm một ID đặc biệt đi cùng với mỗi approve account. Các approve account mới bây giờ sẽ là một map thay vì một list. Nó sẽ map một account tới `approval id` của nó.

Để điều này hoạt động, bạn cần đảm bảo rằng approval ID **luôn luôn** là một ID mới và unique. Nếu bạn đặt nó là một integer luôn tăng 1 đơn vị bất cứ khi nào bạn chấp thuận một account, nó sẽ hoạt động. Hãy xem xét cùng một kịch bản với giải pháp mới.

Benji bán NFT của mình với giá 1 NEAR trên marketplace A và marketplace B bằng cách chấp thuận cả hai marketplace. "Next approval ID" sẽ bắt đầu từ 0 khi NFT được mint lần đầu tiên và sẽ tăng lên từ con số đó. Điều này sẽ dẫn đến cấu trúc token như sau:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: {
        marketplace A: 0
        marketplace B: 1
    }
    next_approval_id: 2
}
```

Khi Benji chấp thuận marketplace A, giá trị ban đầu của `next_approval_id` bắt đầu bằng 0. Sau đó marketplace được chèn vào map và next approval ID được tăng lên. Quá trình này lại xảy ra đối với marketplace B và next approval ID lại được tăng lên, giá trị hiện tại của nó là 2.

Josh đến và mua NFT trên marketplace A với giá 1 NEAR. Lưu ý rằng next approval ID đang có giá trị là 2:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {}
    next_approval_id: 2
}
```

Josh sau đó đẩy nhanh NFT này bởi vì anh ấy một lần nữa thiếu tiền mặt và chấp thuận marketplace B:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {
        marketplace B: 2
    }
    next_approval_id: 3
}
```

Marketplace được chèn vào map và next approval ID được tăng lên. Từ góc nhìn của marketplace B, nó lưu trữ approval ID ban đầu có giá trị là 1 từ khi Benji bán NFT đó. Nếu Mike đi và mua NFT trên marketplace B với giá bán 1 NEAR ban đầu, NFT contract sẽ bị panic. Điều này là do marketplace đang cố gắng chuyển NFT với approval ID là 1 nhưng cấu trúc token cho thấy rằng nó **nên** có approval ID là 2.

### Mở rộng các cấu trúc `Token` and `JsonToken`

Bây giờ bạn đã hiểu giải pháp được đề xuất cho vấn đề ban đầu là cho phép account chuyển NFT của bạn, đã đến lúc thực hiện một số logic. Điều đầu tiên bạn nên làm là sửa đổi cấu trúc của `Token` and `JsonToken` để phản ánh những thay đổi mới. Hãy chuyển sang file `nft-contract/src/metadata.rs`:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/metadata.rs#L39-L61
```

Sau đó, bạn sẽ cần phải khởi tạo cả hai hàm `approved_account_ids` và `next_approval_id` về giá trị mặc định của chúng khi token được mint. Chuyển sang file `nft-contract/src/mint.rs` và khi tạo cấu trúc `Token` để lưu trữ trong contract, hãy đặt next approval ID là 0 và các approve account ID là một empty map:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/mint.rs#L15-L22
```

### Các approve account

Bây giờ bạn đã thêm hỗ trợ cho các approve account ID và next approval ID ở token level, đã đến lúc thêm logic để tạo và thay đổi các field đó thông qua một function gọi là `nft_approve`. Function này sẽ chấp thuận một account để có quyền truy cập vào một token ID cụ thể. Hãy chuyển đến file `nft-contract/src/approval.rs` và chỉnh sửa function `nft_approve`:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L38-L96
```

Trước tiên, function sẽ xác nhận rằng người dùng đã đính kèm **ít nhất** một yoctoNEAR (chút nữa chúng ta sẽ triển khai). Điều này để đảm bảo security và trả phí storage. Khi ai đó chấp thuận một account ID, họ sẽ lưu trữ thông tin đó trên contract. Như bạn đã thấy trong [hướng dẫn mint](/tutorials/nfts/minting), bạn có thể yêu cầu smart contract account thanh toán cho storage, hoặc bạn có thể bắt người dùng thanh toán chi phí đó. Cách tiếp cận sau có khả năng mở rộng tốt hơn và đó là cách mà bạn sẽ làm việc trong suốt hướng dẫn này.

Sau khi xác nhận xong mà không có vấn đề gì, bạn sẽ nhận được token object và đảm bảo rằng chỉ chủ sở hữu mới call method này. Chỉ chủ sở hữu mới có thể cho phép các account khác transfer các NFT của họ. Sau đó, bạn nhận được next approval ID và insert account đã truyền vào trong map cùng với next approval ID. Nếu nó là một approval ID mới, cần phải thanh toán phí cho storage. Còn nếu nó không phải là một approval ID mới, không cần phải thanh toán phí storage và chỉ đính kèm 1 yoctoNEAR là đủ.

Sau đó, bạn tính toán lượng storage đang được sử dụng bằng cách thêm account mới đó vào map và tăng `next_approval_id` của token lên 1 đơn vị. Sau khi insert token object trở lại map `tokens_by_id`, bạn hoàn lại bất kỳ storage dư thừa nào.

Bạn sẽ nhận thấy rằng function chứa một tham số tùy chọn là `msg`. Tham số này thực chất là nền tảng của tất cả các NFT marketplace trên NEAR.

#### Tích hợp marketplace {#marketplace-integrations}

Nếu một message được truyền vào trong function, bạn sẽ tiến hành một cross contract call tới account đang được cấp quyền truy cập. Cross contract call này sẽ gọi function `nft_on_approve`, function này sẽ parse message và hành động tương ứng. Hãy xem một trường hợp sử dụng hay gặp.

Chúng ta có một marketplace với kỳ vọng rằng các điều kiện bán hàng của nó sẽ được thông qua message field. Benji chấp thuận marketplace với function `nft_approve` và truyền một JSON string để phác thảo các điều kiện bán qua message. Các điều kiện bán hàng này có thể trông giống như dưới đây:

```json
sale_conditions: {
    price: 5
}
```

Bằng cách để message field type chỉ là một string, điều này sẽ tổng quát hóa quy trình và cho phép user nhập các điều kiện bán hàng cho nhiều marketplace khác nhau. Tuy thuộc vào người chấp thuận để truyền vào một message thích hợp mà marketplace có thể giải mã và sử dụng đúng cách. Điều này thường được thực hiện thông qua frontend app của marketplace, ứng dụng này có thể biết cách cấu trúc `msg` theo cách hữu ích.

#### Các Internal function

Bây giờ, logic cốt lỗi để chấp thuận một account đã hoàn tất, bạn cần tiến hành các function `assert_at_least_one_yocto` và `bytes_for_approved_account`. Di chuyển đến file `nft-contract/src/internal.rs` và copy function dưới đây ngay bên dưới function `assert_one_yocto`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L52-L58
```

Tiếp theo, bạn sẽ cần copy logic để tính toán chi phí để lưu trữ một account ID là bao nhiêu byte. Đặt function này ở đầu trang:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L1-L9
```

Bây giờ, logic để approve account đã hoàn thành, bạn cần thay đổi các hạn chế cho việc transfer.

### Thay đổi các hạn chế cho việc transfer các NFT

Hiện tại, một NFT **chỉ** có thể transfer bởi người sở hữu nó. Bạn cần thay đổi hạn chế đó để những người đã được chấp thuận cũng có thể transfer các NFT. Ngoài ra, bạn sẽ làm điều đó để nếu một approval ID được truyền vào, bạn có thể tăng cường security và kiểm tra nếu cả hai account đang cố gắng transfer có nằm trong approve list hay không **và** chúng tương ứng đúng với approval ID. Điều này là để giải quyết vấn đề mà chúng ta đã gặp phải trước đó.

Trong file `internal.rs`, bạn cần thay đổi logic của method `internal_transfer` vì đó là nơi mà các hạn chế đang được tạo ra. Thay đổi internal transfer function thành như sau:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L135-L201
```

Việc này sẽ kiểm tra xem người gửi có phải là chủ sở hữu hay không và sau đó nếu họ không phải là chủ sở hữu, nó sẽ kiểm tra người gửi có trong approval list hay không. Nếu một approve ID được truyền vào function, nó sẽ kiểm tra approval ID thực tế của người gửi đã được lữu trữ trên contract có khớp với approve ID được truyền vào hay không.

#### Hoàn trả storage khi transfer

Trong khi bạn đang ở internal file, bạn sẽ cần thêm các method để hoàn lại tiền cho user đã trả cho việc lưu trữ các approve account trên contract khi một NFT được transfer. Bởi vì bạn sẽ xóa map `approved_account_ids` bất cứ khi nào các NFT đã được transfer và storage không còn được sử dụng nữa.

Ngay bên dưới function `bytes_for_approved_account_id`, copy hai function bên dưới:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L11-L32
```

Việc này sẽ hữu ích trong phần tiếp theo, nơi bạn sẽ thay đổi function `nft_core` để thêm vào logic approval mới.

### Các thay đổi với `nft_core.rs`

Đi tới file `nft-contract/src/nft_core.rs` và thay đổi đầu tiên mà bạn muốn thực hiện là thêm một `approval_id` tới cả hai function `nft_transfer` và `nft_transfer_call`. Việc này để bất kỳ ai không phải là chủ sở hữu đang cố gắng transfer token, phải truyền vào một approval ID để giải quyết vấn đề đã thấy trước đó. Nếu họ là chủ sở hữu, approval ID sẽ không được sử dụng như chúng ta đã thấy trong function `internal_transfer`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L8-L29
```

Sau đó, bạn sẽ cần thêm một map `approved_account_ids` tới các tham số của `nft_resolve_transfer`. Việc này để bạn có thể hoàn lại tiền cho các account nếu việc transfer diễn ra bình thường.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L47-L62
```

Chuyển sang `nft_transfer`, thay đổi duy nhất mà bạn cần thực hiện là truyền approval ID vào function `internal_transfer` và sau đó trả lại các approve account ID của các token trước đó sau khi quá trình transfer đã kết thúc

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L67-L96
```

Next, you need to do the same to `nft_transfer_call` but instead of refunding immediately, you need to attach the previous token's approved account IDs to `nft_resolve_transfer` instead as there's still the possibility that the transfer gets reverted.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L98-L145
```

Bạn cũng cần thêm các approve account ID của các token vào `JsonToken` được trả về bởi `nft_token`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L147-L163
```

Cuối cùng, bạn cần thêm logic để hoàn trả các approve account ID trong `nft_resolve_transfer`. Nếu quá trình transfer thành công, bạn nên hoàn lại tiền cho chủ sở hữu vì đã giải phóng storage bởi reset field `approved_account_ids` của các token. Tuy nhiên, bạn nên revert quá trình transfer nếu không đủ tiền để hoàn lại cho bất kỳ ai. Vì người nhận đã sở hữu token, họ có thể đã thêm các approve account ID của riêng mình và vì vậy bạn nên hoàn lại tiền cho người gửi nếu người nhận đã làm vậy.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L168-L234
```

Với việc hoàn thành điều đó, đã đến lúc tiếp tục và hoàn thành nhiệm vụ tiếp theo.

## Kiểm tra một account được chấp thuận hay không

Giờ đây, logic cốt lõi đã được áp dụng cho chấp thuận và hoàn tiền cho các account, nên kể từ thời điểm này trở đi mọi việc sẽ diễn ra suôn sẻ. Bây giờ bạn cần triển khai logic để kiểm tra xem một account đã được chấp thuận hay chưa. Việc này cần một account và token ID cũng như một tùy chọn approval ID. Nếu approval ID không được cung cấp, nó đơn giản trả về việc account có được chấp thuận hay không.

Nếu một approval ID được cung cấp, nó sẽ trả về việc account có được chấp thuận và có cùng approval ID với account đã cung cấp hay không. Let's move to the `nft-contract/src/approval.rs` file and add the necessary logic to the `nft_is_approved` function.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L98-L125
```

Bây giờ chúng ta hãy tiếp tục và thêm logic để thu hồi account

## Thu hồi account

Bước tiếp theo trong hướng dẫn này là cho phép người dùng thu hồi một account được chỉ định khỏi quyền truy cập NFT của họ. Điều đầu tiên bạn sẽ muốn làm là yêu cầu một yocto cho mục đích security. Sau đó bạn cần đảm bảo rằng người gọi là chủ sở hữu của token. Nếu những điều đó đều được đáp ứng, bạn sẽ cần xóa account đã truyền vào khỏi các approve account ID của các token và hoàn lại tiền cho chủ sở hữu vì storage được giải phóng.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L127-L151
```

## Thu hồi toàn bộ các account

Bước cuối cùng trong hướng dẫn này là cho phép user thu hồi toàn bộ các account khỏi quyền truy cập NFT của họ. Việc này cũng yêu cầu một yocto cho mục địch security và đảm bảo rằng người gọi là chủ sở hữu của token. Sau đó bạn hoàn tiền cho chủ sở hữu vì đã giải phóng toàn bộ các account trong map và sau đó là xóa `approved_account_ids`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L153-L174
```

Với việc hoàn thành điều đó, bây giờ là lúc để deploy và bắt đầu quá trình test contract.

## Test các thay đổi mới {#testing-changes}

Vì những thay đổi này ảnh hưởng đến tất cả các token khác và state sẽ không thể tự động được kế thừa từ code mới, chỉ redeploy contract sẽ dẫn đến lỗi. Vì lý do này, cách tốt nhất là tạo một sub-account và deploy contract với nó.

### Tạo một sub-account {#creating-sub-account}

Chạy command dưới đây để tạo một sub-account `approval` cho account chính của bạn với số dư ban đầu là 25 NEAR, nó sẽ được transfer từ account gốc sang account mới của bạn.

```bash
near create-account approval.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Tiếp theo, bạn sẽ muốn export một biến môi trường cho việc development được dễ dàng hơn:

```bash
export APPROVAL_NFT_CONTRACT_ID=approval.$NFT_CONTRACT_ID
```

Sử dụng build script, deploy contract như bạn đã làm ở các hướng dẫn trước:

```bash
yarn build && near deploy --wasmFile out/main.wasm --accountId $APPROVAL_NFT_CONTRACT_ID
```

### Khởi tạo và mint {#initialization-and-minting}

Vì đây là một contract mới, bạn sẽ cần phải khởi tạo và mint một token. Sử dụng command dưới đây để khởi tạo contract:

```bash
near call $APPROVAL_NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID
```

Tiếp theo, bạn sẽ cần mint một token. Bằng cách chạy command này, bạn sẽ mint một token với token ID `"approval-token"` và người nhận sẽ là account mới của bạn.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_mint '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID --amount 0.1
```

Bạn có thể kiểm tra xem mọi thứ có diễn ra bình thường hay không bằng cách gọi một trong các enumeration function:

```bash
near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}'
```

Nó sẽ trả về một output trông giống như sau:

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

Lưu ý rằng các approve account ID bây giờ đang được trả về từ function như thế nào? Đây là một dấu hiệu tuyệt vời! Bây giờ bạn đã sẵn sàng để tiếp tục và chấp thuận một account có quyền truy cập tới token của mình.

### Chấp thuận một account {#approving-an-account}

Tại thời điểm này, bạn sẽ có hai account. Một được lưu trữ trong `$NFT_CONTRACT_ID` và một cái khác trong environment variable là `$APPROVAL_NFT_CONTRACT_ID`. Bạn có thể sử dụng cả hai account để test mọi thứ. Nếu bạn chấp thuận account cũ của mình, nó sẽ có khả năng transfer NFT tới chính nó.

Chạy command dưới đây để chấp thuận account đã lưu trữ trong `$NFT_CONTRACT_ID` có quyền truy cập để transfer NFT của bạn với một ID `"approval-token"`. Bạn không cần truyền một message bởi vì account cũ không tiến hành function `nft_on_approve`. Ngoài ra, bạn sẽ cần đính kèm đủ NEAR để đảm bảo chi phí lưu trữ account trên contract. 0.1 NEAR sẽ là quá đủ và bạn sẽ được hoàn lại bất kỳ phần dư thừa không sử dụng.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID --deposit 0.1
```

Nếu bạn gọi cùng enumeration method như trước đó, bạn sẽ nhìn thấy approve account ID mới được trả lại.

```bash
near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}'
```

Nó sẽ trả về một output trong giống như sau:

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": { "goteam.examples.testnet": 0 }
  }
]
```

### Transfer NFT bằng một approve account {#transferring-the-nft}

Bây giờ bạn đã chấp thuận account khác để transfer token, bạn có thể test hành động đó. Bạn sẽ có thể sử dụng account khác để transfer NFT sang chính nó, bằng cách đặt lại các approve account ID. Hãy test việc transfer NFT với một approval ID không đúng:

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

<details>
<summary>Ví dụ kết quả trả về: </summary>
<p>

```bash
kind: {
    ExecutionError: "Smart contract panicked: panicked at 'assertion failed: `(left == right)`\n" +
      '  left: `0`,\n' +
      " right: `1`: The actual approval_id 0 is different from the given approval_id 1', src/internal.rs:165:17"
  },
```

</p>
</details>

Nếu bạn truyền vào approval ID chính xác là `0`, mọi thứ sẽ hoạt động tốt.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

Nếu bạn gọi enumeration method một lần nữa, bạn sẽ nhìn thấy chủ sở hữu được cập nhật và các approve account ID được đặt lại.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

Bây giờ chúng ta hãy test approval ID tăng dần trên các chủ sở hữu khác nhau. Nếu bạn chấp thuận sub-account đã mint token ban đầu, thì bây giờ approval ID sẽ là 1.

```bash
near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --deposit 0.1
```

Gọi view function một lần nữa, bây giờ kết quả trả về một approval ID là 1 cho sub-account đã được chấp thuận.

```bash
near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}'
```

<details>
<summary>Ví dụ kết quả trả về: </summary>
<p>

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": { "approval.goteam.examples.testnet": 1 }
  }
]
```

</p>
</details>

Với bài test đã kết thúc, bạn đã triển khai thành công approval extension theo tiêu chuẩn!

## Tổng kết

Today you went through a lot of logic to implement the [approvals extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) so let's break down exactly what you did.

Đầu tiên, bạn khám phá [cách tiếp cận cơ bản](#basic-solution) của việc làm thế nào để giải quyết vấn đề. Sau đó, bạn đã xem qua và phát hiện một số [vấn đề](#the-problem) với giải pháp đó và tìm hiểu cách [khắc phục nó](#the-solution).

Sau khi hiểu những gì bạn nên làm để triển khai approval extension, bạn bắt đầu [sửa đổi](#expanding-json-and-token) JsonToken và các cấu trúc Token trong contract. Sau đó bạn đã tiến hành logic [chấp thuận các account](#approving-accounts) và xem cách tích hợp [các marketplace](#marketplace-integrations).

Sau khi triển khai logic đằng sau việc chấp thuận account, bạn đã thực hiện và [thay đổi các hạn chế ](#changed-restrictions) cần thiết để transfer NFT. Bước cuối cùng bạn đã làm để kết thúc logic chấp thuận là quay trở lại và cập nhật file [nft_core](#nft-core-changes) để tương tích với những thay đổi mới.

At this point, everything was implemented in order to allow accounts to be approved and you extended the functionality of the [core standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) to allow for approved accounts to transfer tokens.

Bạn đã tiến hành một view method để [kiểm tra](#check-if-account-approved) một account được chấp thuận hay không và để hoàn thành phần code của hướng dẫn, bạn đã triển khai logic cần thiết để [thu hồi account](#revoke-account) cũng như là [thu hồi toàn bộ các account](#revoke-all-accounts).

Sau đó, contract code đã hoàn tất và đó là lúc để chuyển sang công việc test, trong đó bạn đã tạo một [subaccount](#creating-sub-account) và test [việc chấp thuận](#approving-an-account) và [transfer](#transferring-the-nft) cho các NFT của bạn.

Trong hướng dẫn tiếp theo, bạn sẽ học về các tiêu chuẩn royalty và làm cách nào bạn có thể tương tác được với các NFT marketplace.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Approval standard: [NEP178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement), version `1.0.0`

:::
