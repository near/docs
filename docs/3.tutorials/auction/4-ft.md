---
id: bidding-with-fts
title: Bidding with FTs
sidebar_label: Bidding with FTs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs"

To further develop this contract we're going to introduce another primitive: [fungible tokens](../../2.build/5.primitives/ft.md). Instead of placing bids in $NEAR tokens, they will be placed in FTs. This may be useful if, for example, an auctioneer wants to keep the bid amounts constant in terms of dollars as an auction is carried out, so bids can be placed in stablecoins such as $USDC. Another use case is if a project like Ref Finance were holding their own auction and want the auction to happen in their project's token $REF.

---

## Specifying the FT contract 

We want to only accept bids in one type of fungible token; accepting many different FTs would make the value of each bid difficult to compare. We're also going to adjust the contract so that the auctioneer can specify a starting bid amount for the auction.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L23-L30"
                start="23" end="30" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L33-L53"
                start="33" end="53" />

    </TabItem>

</Tabs>

---

## Accepting bids in FTs

When we were making bids in $NEAR tokens we would call the auction contract directly and attach $NEAR tokens to the call. With fungible tokens, since an account's balance lives on a separate contract, we call the FT contract which then calls the auction contract and transfers tokens. The method on the FT contract to do this is named `ft_transfer_call` and it will always call a method in the target contract named `ft_on_transfer`. Take a look [here](../../2.build/5.primitives/ft.md#attaching-fts-to-a-call) for more information. 

![ft_transfer_call-flow](/docs/assets/auction/auction-ft-transfer.png)

The `ft_on_transfer` method always has the same interface; the FT contract will pass it the `sender`, the `amount` of FTs being sent and a `msg` which can be empty (which it will be here) or it can contain some information needed by the method (if you want to send multiple arguments in msg it is best practice to deliver this in JSON then parse it in the contract). The method returns the number of tokens to refund the user, in our case we will use all the tokens attached to the call for the bid unless the contract panics in which case the user will automatically be refunded their FTs in full.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L57"
                start="57" end="57" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L56"
                start="56" end="56" />

    </TabItem>

</Tabs>


We need to confirm that the user is attaching fungible tokens when calling the method and that they are using the right FT, this is done by checking the predecessor's account ID. Since it's the FT contract that directly calls the auction contract, the `predecessor` is now the account ID of the FT contract.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L62"
                start="62" end="62" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L62-L63"
                start="62" end="63" />

    </TabItem>

</Tabs>

The bidder's account ID is now given by the argument `sender_id`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L64-L67"
                start="64" end="67" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L75-L78"
                start="75" end="78" />

    </TabItem>

</Tabs>

When we want to return the funds to the previous bidder we now make a cross-contract call to the FT contract. 

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Language value="javascript" language="javascript">
            <Github fname="call" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L69-L75"
                start="69" end="75" />
            <Github fname="callback" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L78-L81"
                start="78" end="81" />
        </Language>

        In JavaScript we have to return the Promise to transfer the FTs but we also need to return how much to refund the user. So after transferring the FTs we make a `callback` to our own contract to resume the contract flow. Note that the callback is private so it can only be called by the contract. We return 0 because the method uses all the FTs in the call.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            <Github fname="lib.rs" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L81-L84"
                start="81" end="84" />
            <Github fname="ext.rs" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/ext.rs#L8-L11"
                start="8" end="11" />
        </Language>

         We then return 0 because the method uses all the FTs in the call.

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L86"
                start="86" end="86" />

    </TabItem>

</Tabs>

<details> 
        
    <summary> What happens if the cross-contract call fails? </summary>

    The first time this method is called the contract will try to send itself FTs. Most fungible token contracts don't allow one to send themselves FTs so the cross-contract call will fail. However, since cross-contract calls are asynchronous and independent and we are not checking the result of the call then the auction contract does not care that the call failed and ft_on_transfer will complete successfully.

    In the other cases, the call to the fungible token contract could only fail if the receiver does not exist, the FT contract does not exist, the auction contract doesn't have enough fungible tokens to cover the amount being sent, or the receiver is not registered in the FT contract. Our contract is set up such that these errors cannot occur, the receiver must exist since they placed the previous bid, the FT contract exists since it was used to place the bid, the auction contract has enough FTs to cover the amount since it was sent that amount by the previous bid, and the receiver must be registered in the FT contract since they needed to have held the token in the first place to make a bid.

</details>  

---

## Claiming the FTs

When the auction is complete we need to send the fungible tokens to the auctioneer when we send the NFT to the highest bidder, we implement a similar call as when we were returning the funds just changing the arguments.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/src/contract.ts#L49-L53"
                start="49" end="53" />

        In JavaScript, since we need to return each cross-contract call we chain the NFT and FT transfer.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L99-L109"
                start="99" end="109" />

    </TabItem>

</Tabs>

---

## Creating a new FT

Just as with the NFT contract, we will deploy an FT contract in the sandbox tests using a WASM file compiled from [this repo](https://github.com/near-examples/FT).

When the contract is deployed it is initialized with `new_default_meta` which sets the token's metadata, including things like its name and symbol, to default values while requiring the owner (where the token supply will sent), and the total supply of the token.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/sandbox-test/main.ava.js#L28-L29"
                start="28" end="29" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L26-L39"
                start="26" end="39" />

    </TabItem>

</Tabs>

---

## Registering users in the FT contract

For one to receive fungible tokens, first their account ID must be [registered](../../2.build/5.primitives/ft.md#registering-a-user) in the FT contract. A user has to register in an FT contract to pay for the storage used to track their amount of tokens. By default, a contract pays for its own storage, but not requiring a user to register and pay for storage would drain the contract of $NEAR tokens. When the contract is live we don't need to register the accounts that we transfer tokens back to since to make a bid in the first place they would have needed to be registered, but we do need to register the auction contract in the FT contract to receive bids and the auctioneer to receive the funds at the end of the auction. It is most convenient to register users from the frontend rather than the contract.

In our tests, since we are creating a new fungible token and new accounts we will actually have to register every account that will interact with FTs.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/sandbox-test/main.ava.js#L50-L53"
                start="50" end="53" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L74-L90"
                start="74" end="90" />

    </TabItem>

</Tabs>

---

## Simple FT transfer to bidders

Then we will transfer the bidders FTs so they can use them to bid. A simple transfer of FTs is done using the method `ft_transfer` on the FT contract.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/sandbox-test/main.ava.js#L56-L57"
                start="56" end="57" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            <Github fname="Call ft_transfer" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L95-L100"
                start="95" end="100" />
            <Github fname="ft_transfer definition" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L284-L300"
                start="284" end="300" />
        </Language>

    </TabItem>

</Tabs>

---

## FT transfer call

As stated previously, to bid on the auction the bidder now calls `ft_transfer_call` on the FT contract which subsequently calls the auction contract's `ft_on_transfer` method with fungible tokens attached.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/sandbox-test/main.ava.js#L101-L104"
                start="101" end="104" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            <Github fname="Call ft_transfer_call" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L142-L154"
                start="142" end="154" />
            <Github fname="ft_transfer_call definition" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L315-L330"
                start="315" end="330" />
        </Language>

    </TabItem>

</Tabs>

---

## Checking user's FT balance

Previously, to check a user's $NEAR balance, we pulled the details from their account. Now we are using FTs we query the balance on the FT contract using `ft_balance_of`, let's check that the contract's balance increased by the bid amount and the user's balance decreased by the bid amount.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/sandbox-test/main.ava.js#L106-L109"
                start="106" end="109" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            <Github fname="Call ft_balance_of" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L156-L159"
                start="156" end="159" />
            <Github fname="ft_transfer_call definition" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L302-L313"
                start="302" end="313" />
        </Language>

    </TabItem>

</Tabs>

---

## Invalid FT transfer call

If we make a lower bid than the previous this will cause the auction contract to panic. One might expect that `ft_transfer_call` will fail, but it does not. `ft_on_transfer` will fail and the FT contract will recognize this and reverse the transfer of tokens. So after making an invalid bid, we should check that the call was successful but the parties involved in the transaction (the bidder and the contract) have the same balance of fungible tokens as they did before the call.

Previous to this, Bob made a bid of 60,000 and Alice was returned her bid bringing her balance back up to 150,000. Now when Alice makes an invalid of 50,000 Alice's balance should remain at 150,000 and the contract should remain at a balance of 60,000.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/04-ft-owner-claims-winner-gets-nft/sandbox-test/main.ava.js#L122-L130"
                start="122" end="130" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L183-L200"
                start="183" end="200" />

    </TabItem>

</Tabs>

---

## Using FTs with the CLI

If you want to interact with the auction contract you're going to need FTs. For this example, we'll use $cUSD where the contract address is `cusd.fakes.testnet`. One can easily acquire FTs through the [testnet faucet](https://near-faucet.io/). Select Celo Dollar and withdraw to the account you will use to place a bid. If you take a look at the transaction details you can see that the faucet registers your account in the FT contract and then sends you cUSD from the faucet account.

When deploying the contract make sure to specify the FT contract `cusd.fakes.testnet`.

The auction contract will need to be registered as well, you could do this by sending it an arbitrary amount of $cUSD from the faucet or you can just register it since it doesn't need any FTs. You should also register the auctioneer,

```
near contract call-function as-transaction cusd.fakes.testnet storage_deposit json-args '{"account_id": "<auctionContractId>"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR'
```

Now you can go ahead and place a bid. cUSD has 24 decimals meaning that 1 $cUSD is made up of 10^24 smallest units. To make a bid of 2 $cUSD you can use the command:

```
near contract call-function as-transaction cusd.fakes.testnet ft_transfer_call json-args '{"receiver_id": "<auctionContractId>", "amount": "2000000000000000000000000", "msg": ""}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR'
```

## Auction architecture 

When creating an application there are numerous ways to structure it. Here, we have one contract per auction meaning we have to deploy a new contract each time we want to host an auction. To make this easier we will leverage a factory contract to deploy auction contracts for an auctioneer. Deploying code for each auction gets expensive, with 100kb of storage costing 1 $NEAR, since each auction stores all the same type of information and implements the same methods one could instead decide to have multiple auctions per contract. 

In such case, the Contract struct would be a map of auctions. We would implement a method to create a new auction by adding an entry to the map with the specific details of that individual auction.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        ```javascript
        class Contract {
            auctions: UnorderedMap<string, Auction>
        ```

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```rust 
        pub struct Contract {
            auctions: IterableMap<String, Auction>
        ```

    </TabItem>

</Tabs>

However, this architecture could be deemed less secure since if a bad actor were to gain access to the contract they would have access to every auction instead of just one.

--- 

## Conclusion

In this section, we learned a lot about fungible tokens: how to send and receive FTs in a smart contract, and then in sandbox tests how to deploy and initialize an FT contract, how to register a user in an FT contract and send them some tokens, how to attach FTs to a smart contract call and finally how to view the FT balance of a user. With that, we now have our completed auction smart contract! 

Taking a further step back we've taken a very simple auction contract and transformed it into a more production contract with thorough testing. To improve the auction we learned how to make a contract more secure by locking it, added a prize by introducing NFTs and enabled auctioneers to host auctions with FTs.

Up to now, we've just interacted with the contract via the CLI. In the next part, we'll learn the basics of creating frontends for NEAR contracts by creating a simple frontend for our auction contract so users can seamlessly interact with it.