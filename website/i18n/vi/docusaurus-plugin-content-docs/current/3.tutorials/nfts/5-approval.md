---
id: approvals
title: Approval
sidebar_label: Approval
---

import {Github} from "@site/src/components/codetabs"

In this tutorial you'll learn the basics of an approval management system which will allow you to grant others access to transfer NFTs on your behalf.

This is the backbone of all NFT marketplaces and allows for some complex yet beautiful scenarios to happen. If you're joining us for the first time, feel free to clone [this repository](https://github.com/near-examples/nft-tutorial) and go to the `nft-contract-basic/` folder to follow along.

```bash
cd nft-contract-basic/
```

:::tip If you wish to see the finished code for this _Approval_ tutorial, you can find it on the `nft-contract-approval/` folder. :::

---

## Giới thiệu

Up until this point you've created a smart contract that allows users to mint and transfer NFTs as well as query for information using the [enumeration standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). As we've been doing in the previous tutorials, let's break down the problem into smaller, more digestible, tasks.

Let's first define some of the end goals that we want to accomplish as per the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension of the standard. We want a user to have the ability to:

- Grant other accounts access to transfer their NFTs on a per token basis.
- Check if an account has access to a specific token.
- Revoke a specific account the ability to transfer an NFT.
- Revoke **all** other accounts the ability to transfer an NFT.

If you look at all these goals, they are all on a per token basis. This is a strong indication that you should change the `Token` struct which keeps track of information for each token.

---

## Cho phép một account transfer NFT của bạn

Let's start by trying to accomplish the first goal. How can you grant another account access to transfer an NFT on your behalf?

The simplest way that you can achieve this is to add a list of approved accounts to the `Token` struct. When transferring the NFT, if the caller is not the owner, you could check if they're in the list.

Before transferring, you would need to clear the list of approved accounts since the new owner wouldn't expect the accounts approved by the original owner to still have access to transfer their new NFT.

<hr className="subsection" />

### Vấn đề {#the-problem}

On the surface, this would work, but if you start thinking about the edge cases, some problems arise. Often times when doing development, a common approach is to think about the easiest and most straightforward solution. Once you've figured it out, you can start to branch off and think about optimizations and edge cases.

Let's consider the following scenario. Benji has an NFT and gives two separate marketplaces access to transfer his token. By doing so, he's putting the NFT for sale (more about that in the [marketplace integrations](#marketplace-integrations) section). Let's say he put the NFT for sale for 1 NEAR on both markets. The tokens list of approved account IDs would look like the following:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

Josh then comes along and purchases the NFT on marketplace A for 1 NEAR. This would take the sale down from the marketplace A and clear the list of approved accounts. Marketplace B, however, still has the token listed for sale for 1 NEAR and has no way of knowing that the token was purchased on marketplace A by Josh. The new token struct would look as follows:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: []
}
```

Let's say Josh is low on cash and wants to flip this NFT and put it for sale for 10 times the price on marketplace B. He goes to put it for sale and for whatever reason, the marketplace is built in a way that if you try to put a token up for sale twice, it keeps the old sale data. This would mean that from marketplace B's perspective, the token is still for sale for 1 NEAR (which was the price that Benji had originally listed it for).

Since Josh approved the marketplace to try and put it for sale, the token struct would look as follows:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

If Mike then comes along and purchases the NFT for only 1 NEAR on marketplace B, the marketplace would go to try and transfer the NFT and since technically, Josh approved the marketplace and it's in the list of approved accounts, the transaction would go through properly.

<hr className="subsection" />

### Giải pháp {#the-solution}

Now that we've identified a problem with the original solution, let's think about ways that we can fix it. What would happen now if, instead of just keeping track of a list of approved accounts, you introduced a specific ID that went along with each approved account. The new approved accounts would now be a map instead of a list. It would map an account to it's `approval id`.

For this to work, you need to make sure that the approval ID is **always** a unique, new ID. If you set it as an integer that always increases by 1 whenever u approve an account, this should work. Let's consider the same scenario with the new solution.

Benji puts his NFT for sale for 1 NEAR on marketplace A and marketplace B by approving both marketplaces. The "next approval ID" would start off at 0 when the NFT was first minted and will increase from there. This would result in the following token struct:

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

When Benji approved marketplace A, it took the original value of `next_approval_id` which started off at 0. The marketplace was then inserted into the map and the next approval ID was incremented. This process happened again for marketplace B and the next approval ID was again incremented where it's now 2.

Josh comes along and purchases the NFT on marketplace A for 1 NEAR. Notice how the next approval ID stayed at 2:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {}
    next_approval_id: 2
}
```

Josh then flips the NFT because he's once again low on cash and approves marketplace B:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {
        marketplace B: 2
    }
    next_approval_id: 3
}
```

The marketplace is inserted into the map and the next approval ID is incremented. From marketplace B's perspective it stores it's original approval ID from when Benji put the NFT up for sale which has a value of 1. If Mike were to go and purchase the NFT on marketplace B for the original 1 NEAR sale price, the NFT contract should panic. This is because the marketplace is trying to transfer the NFT with an approval ID 1 but the token struct shows that it **should** have an approval ID of 2.

<hr className="subsection" />

### Mở rộng các cấu trúc `Token` and `JsonToken`

Now that you understand the proposed solution to the original problem of allowing an account to transfer your NFT, it's time to implement some of the logic. The first thing you should do is modify the `Token` and `JsonToken` structs to reflect the new changes. Let's switch over to the `nft-contract-basic/src/metadata.rs` file:

<Github language="rust" start="41" end="64" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/metadata.rs" />

You'll then need to initialize both the `approved_account_ids` and `next_approval_id` to their default values when a token is minted. Switch to the `nft-contract-basic/src/mint.rs` file and when creating the `Token` struct to store in the contract, let's set the next approval ID to be 0 and the approved account IDs to be an empty map:

<Github language="rust" start="31" end="38" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/mint.rs" />

<hr className="subsection" />

### Các approve account

Now that you've added the support for approved account IDs and the next approval ID on the token level, it's time to add the logic for populating and changing those fields through a function called `nft_approve`. This function should approve an account to have access to a specific token ID. Let's move to the `nft-contract-basic/src/approval.rs` file and edit the `nft_approve` function:

<Github language="rust" start="38" end="95" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

The function will first assert that the user has attached **at least** one yoctoNEAR (which we'll implement soon). This is both for security and to cover storage. When someone approves an account ID, they're storing that information on the contract. As you saw in the [minting tutorial](/tutorials/nfts/minting), you can either have the smart contract account cover the storage, or you can have the users cover that cost. The latter is more scalable and it's the approach you'll be working with throughout this tutorial.

After the assertion comes back with no problems, you get the token object and make sure that only the owner is calling this method. Only the owner should be able to allow other accounts to transfer their NFTs. You then get the next approval ID and insert the passed in account into the map with the next approval ID. If it's a new approval ID, storage must be paid. If it's not a new approval ID, no storage needs to be paid and only attaching 1 yoctoNEAR would be enough.

You then calculate how much storage is being used by adding that new account to the map and increment the tokens `next_approval_id` by 1. After inserting the token object back into the `tokens_by_id` map, you refund any excess storage.

You'll notice that the function contains an optional `msg` parameter. This message can be used by NFT marketplaces. Nếu một message được truyền vào trong function, bạn sẽ tiến hành một cross contract call tới account đang được cấp quyền truy cập. Cross contract call này sẽ gọi function `nft_on_approve`, function này sẽ parse message và hành động tương ứng.

It is up to the approving person to provide a properly encoded message that the marketplace can decode and use. Điều này thường được thực hiện thông qua frontend app của marketplace, ứng dụng này có thể biết cách cấu trúc `msg` theo cách hữu ích.

<hr className="subsection" />

### Các Internal function

Bây giờ, logic cốt lỗi để chấp thuận một account đã hoàn tất, bạn cần tiến hành các function `assert_at_least_one_yocto` và `bytes_for_approved_account`. Di chuyển đến file `nft-contract/src/internal.rs` và copy function dưới đây ngay bên dưới function `assert_one_yocto`.

<Github language="rust" start="49" end="55" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

Tiếp theo, bạn sẽ cần copy logic để tính toán chi phí để lưu trữ một account ID là bao nhiêu byte. Đặt function này ở đầu trang:

<Github language="rust" start="1" end="9" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

Bây giờ, logic để approve account đã hoàn thành, bạn cần thay đổi các hạn chế cho việc transfer.


#### Thay đổi các hạn chế cho việc transfer các NFT

Hiện tại, một NFT **chỉ** có thể transfer bởi người sở hữu nó. Bạn cần thay đổi hạn chế đó để những người đã được chấp thuận cũng có thể transfer các NFT. Ngoài ra, bạn sẽ làm điều đó để nếu một approval ID được truyền vào, bạn có thể tăng cường security và kiểm tra nếu cả hai account đang cố gắng transfer có nằm trong approve list hay không **và** chúng tương ứng đúng với approval ID. Điều này là để giải quyết vấn đề mà chúng ta đã gặp phải trước đó.

Trong file `internal.rs`, bạn cần thay đổi logic của method `internal_transfer` vì đó là nơi mà các hạn chế đang được tạo ra. Thay đổi internal transfer function thành như sau:

<Github language="rust" start="130" end="227" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

Việc này sẽ kiểm tra xem người gửi có phải là chủ sở hữu hay không và sau đó nếu họ không phải là chủ sở hữu, nó sẽ kiểm tra người gửi có trong approval list hay không. Nếu một approve ID được truyền vào function, nó sẽ kiểm tra approval ID thực tế của người gửi đã được lữu trữ trên contract có khớp với approve ID được truyền vào hay không.

<hr className="subsection" />

#### Hoàn trả storage khi transfer

Trong khi bạn đang ở internal file, bạn sẽ cần thêm các method để hoàn lại tiền cho user đã trả cho việc lưu trữ các approve account trên contract khi một NFT được transfer. Bởi vì bạn sẽ xóa map `approved_account_ids` bất cứ khi nào các NFT đã được transfer và storage không còn được sử dụng nữa.

Ngay bên dưới function `bytes_for_approved_account_id`, copy hai function bên dưới:

<Github language="rust" start="11" end="29" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

Việc này sẽ hữu ích trong phần tiếp theo, nơi bạn sẽ thay đổi function `nft_core` để thêm vào logic approval mới.

<hr className="subsection" />

### Các thay đổi với `nft_core.rs`

Head over to the `nft-contract-basic/src/nft_core.rs` file and the first change that you'll want to make is to add an `approval_id` to both the `nft_transfer` and `nft_transfer_call` functions. Việc này để bất kỳ ai không phải là chủ sở hữu đang cố gắng transfer token, phải truyền vào một approval ID để giải quyết vấn đề đã thấy trước đó. Nếu họ là chủ sở hữu, approval ID sẽ không được sử dụng như chúng ta đã thấy trong function `internal_transfer`.

<Github language="rust" start="8" end="29" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

Sau đó, bạn sẽ cần thêm một map `approved_account_ids` tới các tham số của `nft_resolve_transfer`. Việc này để bạn có thể hoàn lại tiền cho các account nếu việc transfer diễn ra bình thường.

<Github language="rust" start="47" end="66" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

Chuyển sang `nft_transfer`, thay đổi duy nhất mà bạn cần thực hiện là truyền approval ID vào function `internal_transfer` và sau đó trả lại các approve account ID của các token trước đó sau khi quá trình transfer đã kết thúc

<Github language="rust" start="71" end="99" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

Next, you need to do the same to `nft_transfer_call` but instead of refunding immediately, you need to attach the previous token's approved account IDs to `nft_resolve_transfer` instead as there's still the possibility that the transfer gets reverted.

<Github language="rust" start="101" end="158" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

Bạn cũng cần thêm các approve account ID của các token vào `JsonToken` được trả về bởi `nft_token`.

<Github language="rust" start="160" end="176" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

Cuối cùng, bạn cần thêm logic để hoàn trả các approve account ID trong `nft_resolve_transfer`. Nếu quá trình transfer thành công, bạn nên hoàn lại tiền cho chủ sở hữu vì đã giải phóng storage bởi reset field `approved_account_ids` của các token. Tuy nhiên, bạn nên revert quá trình transfer nếu không đủ tiền để hoàn lại cho bất kỳ ai. Vì người nhận đã sở hữu token, họ có thể đã thêm các approve account ID của riêng mình và vì vậy bạn nên hoàn lại tiền cho người gửi nếu người nhận đã làm vậy.

<Github language="rust" start="181" end="279" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

Với việc hoàn thành điều đó, đã đến lúc tiếp tục và hoàn thành nhiệm vụ tiếp theo.

---

## Kiểm tra một account được chấp thuận hay không

Giờ đây, logic cốt lõi đã được áp dụng cho chấp thuận và hoàn tiền cho các account, nên kể từ thời điểm này trở đi mọi việc sẽ diễn ra suôn sẻ. Bây giờ bạn cần triển khai logic để kiểm tra xem một account đã được chấp thuận hay chưa. Việc này cần một account và token ID cũng như một tùy chọn approval ID. Nếu approval ID không được cung cấp, nó đơn giản trả về việc account có được chấp thuận hay không.

Nếu một approval ID được cung cấp, nó sẽ trả về việc account có được chấp thuận và có cùng approval ID với account đã cung cấp hay không. Let's move to the `nft-contract-basic/src/approval.rs` file and add the necessary logic to the `nft_is_approved` function.

<Github language="rust" start="98" end="125" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

Bây giờ chúng ta hãy tiếp tục và thêm logic để thu hồi account

---

## Thu hồi account

Bước tiếp theo trong hướng dẫn này là cho phép người dùng thu hồi một account được chỉ định khỏi quyền truy cập NFT của họ. Điều đầu tiên bạn sẽ muốn làm là yêu cầu một yocto cho mục đích security. Sau đó bạn cần đảm bảo rằng người gọi là chủ sở hữu của token. Nếu những điều đó đều được đáp ứng, bạn sẽ cần xóa account đã truyền vào khỏi các approve account ID của các token và hoàn lại tiền cho chủ sở hữu vì storage được giải phóng.

<Github language="rust" start="127" end="151" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

---

## Thu hồi toàn bộ các account

Bước cuối cùng trong hướng dẫn này là cho phép user thu hồi toàn bộ các account khỏi quyền truy cập NFT của họ. Việc này cũng yêu cầu một yocto cho mục địch security và đảm bảo rằng người gọi là chủ sở hữu của token. Sau đó bạn hoàn tiền cho chủ sở hữu vì đã giải phóng toàn bộ các account trong map và sau đó là xóa `approved_account_ids`.

<Github language="rust" start="153" end="173" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

Với việc hoàn thành điều đó, bây giờ là lúc để deploy và bắt đầu quá trình test contract.

---

## Test các thay đổi mới {#testing-changes}

Vì những thay đổi này ảnh hưởng đến tất cả các token khác và state sẽ không thể tự động được kế thừa từ code mới, chỉ redeploy contract sẽ dẫn đến lỗi. For this reason, it's best practice to create a new account and deploy the contract there.

<hr className="subsection" />

### Deployment and initialization

Next, you'll deploy this contract to the network.

```bash
export APPROVAL_NFT_CONTRACT_ID=<accountId>
near account create-account sponsor-by-faucet-service $APPROVAL_NFT_CONTRACT_ID autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy $APPROVAL_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting {#minting}

Tiếp theo, bạn sẽ cần mint một token. Bằng cách chạy command này, bạn sẽ mint một token với token ID `"approval-token"` và người nhận sẽ là account mới của bạn.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $APPROVAL_NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

Bạn có thể kiểm tra xem mọi thứ có diễn ra bình thường hay không bằng cách gọi một trong các enumeration function:

```bash
near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
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

<hr className="subsection" />

### Chấp thuận một account {#approving-an-account}

Tại thời điểm này, bạn sẽ có hai account. Một được lưu trữ trong `$NFT_CONTRACT_ID` và một cái khác trong environment variable là `$APPROVAL_NFT_CONTRACT_ID`. Bạn có thể sử dụng cả hai account để test mọi thứ. Nếu bạn chấp thuận account cũ của mình, nó sẽ có khả năng transfer NFT tới chính nó.

Chạy command dưới đây để chấp thuận account đã lưu trữ trong `$NFT_CONTRACT_ID` có quyền truy cập để transfer NFT của bạn với một ID `"approval-token"`. Bạn không cần truyền một message bởi vì account cũ không tiến hành function `nft_on_approve`. Ngoài ra, bạn sẽ cần đính kèm đủ NEAR để đảm bảo chi phí lưu trữ account trên contract. 0.1 NEAR sẽ là quá đủ và bạn sẽ được hoàn lại bất kỳ phần dư thừa không sử dụng.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

Nếu bạn gọi cùng enumeration method như trước đó, bạn sẽ nhìn thấy approve account ID mới được trả lại.

```bash
near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
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

<hr className="subsection" />

### Transfer NFT bằng một approve account {#transferring-the-nft}

Bây giờ bạn đã chấp thuận account khác để transfer token, bạn có thể test hành động đó. Bạn sẽ có thể sử dụng account khác để transfer NFT sang chính nó, bằng cách đặt lại các approve account ID. Hãy test việc transfer NFT với một approval ID không đúng:

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
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
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
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

Bây giờ chúng ta hãy test approval ID tăng dần trên các chủ sở hữu khác nhau. If you approve the account that originally minted the token, the approval ID should be 1 now.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

Calling the view function again show now return an approval ID of 1 for the account that was approved.

```bash
near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
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

---

## Tổng kết

Today you went through a lot of logic to implement the [approvals extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) so let's break down exactly what you did.

Đầu tiên, bạn khám phá [cách tiếp cận cơ bản](#basic-solution) của việc làm thế nào để giải quyết vấn đề. Sau đó, bạn đã xem qua và phát hiện một số [vấn đề](#the-problem) với giải pháp đó và tìm hiểu cách [khắc phục nó](#the-solution).

Sau khi hiểu những gì bạn nên làm để triển khai approval extension, bạn bắt đầu [sửa đổi](#expanding-json-and-token) JsonToken và các cấu trúc Token trong contract. Sau đó bạn đã tiến hành logic [chấp thuận các account](#approving-accounts) và xem cách tích hợp [các marketplace](#marketplace-integrations).

Sau khi triển khai logic đằng sau việc chấp thuận account, bạn đã thực hiện và [thay đổi các hạn chế ](#changed-restrictions) cần thiết để transfer NFT. Bước cuối cùng bạn đã làm để kết thúc logic chấp thuận là quay trở lại và cập nhật file [nft_core](#nft-core-changes) để tương tích với những thay đổi mới.

At this point, everything was implemented in order to allow accounts to be approved and you extended the functionality of the [core standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) to allow for approved accounts to transfer tokens.

Bạn đã tiến hành một view method để [kiểm tra](#check-if-account-approved) một account được chấp thuận hay không và để hoàn thành phần code của hướng dẫn, bạn đã triển khai logic cần thiết để [thu hồi account](#revoke-account) cũng như là [thu hồi toàn bộ các account](#revoke-all-accounts).

After this, the contract code was finished and it was time to move onto testing where you created an [account](#deployment) and tested the [approving](#approving-an-account) and [transferring](#transferring-the-nft) for your NFTs.

In the [next tutorial](6-royalty.md), you'll learn about the royalty standards and how you can interact with NFT marketplaces.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Approval standard: [NEP178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement), version `1.1.0`

:::
