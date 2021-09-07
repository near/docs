---
id: rainbow-bridge-frontend-mainnet
title: Using the Rainbow Bridge (MainNet)
sidebar_label: Using Mainnet Frontend
---

## Tutorial Prerequisites

- ~$100 USD or equivalent currency _(some of which will be burnt in transfer fees)_
- [NEAR Mainnet Wallet](/docs/develop/basics/create-account#creating-a-mainnet-account)
- [MetaMask](https://metamask.io/download)

**Note:** Rainbow Bridge does not currently support NEAR Wallets that are secured using a Ledger device.

---

## Transferring ETH to NEAR

## Step 1 Buy Ether

> - Using the metamask extension purchase some ETH.

<center>

<img alt="button to purchase eth in MetaMask" src="https://i.imgur.com/zKC5VBe.png" width=40%/>

</center>

> - Buy ETH with Wyre and follow the onscreen instructions purchasing about ~$100 worth of ETH.

<center>

<img alt="continue to wyre Button" src="https://i.imgur.com/AEL99uf.png" width=40%/></center>

> - The time it takes to deposit the funds may vary, so don't be worried if it's taking a while.

<center>

<img alt="wyre transfer receipt" src="https://i.imgur.com/69qjAaC.png" width=40%/>

</center>

---

## Step 2 Swap ETH for wETH

> - In order to bring your ETH over to NEAR you will first need to have it "wrapped". The easiest way to do this would be to use an token swap application such as Uniswap.
>
> - Head on over to [Uniswap](https://uniswap.org/) and select the Use Uniswap option in the upper right hand corner.

<center>

<img alt="uniswap swap button" src="https://i.imgur.com/zKUSonf.png" width=120%/>

</center>

> - Connect your MetaMask Wallet to Uniswap using the browser extension and then select "ETH" as the from option and "[WETH](https://weth.io/)" (which means wrapped Ether) as the "To" option.
>
> - Select Wrap and you will be redirected to approve the transaction and the transfer fees

<center>

<img alt="uniswap swap tool" src="https://i.imgur.com/aYCCqHq.png" width=40%/>

</center>

> - Once this transfer process has been completed open your MetaMask browser extension and you should see your new wETH balance. Despite the different values in this screenshot it should look something similar to this depending on how much money you've deposited and swapped.

<center>

<img alt="updated wallet" src="https://i.imgur.com/cJIw69z.png" width=40%/>

</center>
 
 ---

## Step 3 Swap ETH for wETH

> - Head on over to the [Rainbow Bridge](https://ethereum.bridgetonear.org)!

<center>

<img alt="rainbow bridge transfer" src="https://i.imgur.com/VnbNeQ2.png" width=40%/>

</center>

> - Make sure the network selection option is set to NEAR-Ethereum.

<center>

<img alt="network selection tool" src="https://i.imgur.com/5lGDs11.png" width=40%/>

</center>

> - Make sure that the network option is set to Ethereum Mainnet.

<center>

<img alt="metaMask network selection tool" src="https://i.imgur.com/G1Rd0YC.png" width=60%/>

</center>

> - Select Connect and choose MetaMask, you may need to grant access to this application so check your browser extension. If you have another wallet then use WalletConnect and scan the QR Code.

<center>

<img alt="Wallet connection tool" src="https://i.imgur.com/OQ4TF6t.png" width=60%/>

</center>

> - **Before you connect to you're NEAR Wallet** Please Make sure that you're wallet is not ledger protected (meaning you aren't using a Ledger to store your access keys) this application does not work with Ledger protected wallets, if you do have one please make another wallet and secure it with a security phrase for now.
>
> - With that out of the way 🙂, we can now connect to your NEAR wallet! Hit the connect button next to NEAR and you'll be redirected to this page. Hit "Allow" to proceed.

<center>

<img alt="NEAR Approval tool" src="https://i.imgur.com/2j3qa2f.png" width=50%/>

</center>

---

## Step 4 Initiate the Transfer

> - You're almost done! Enter the amount of wETH you would like to transfer (I will be using 0.01ETH which is about $20.00 USD at this time of writing)

<center>

<img alt="Rainbow bridge money transfer tool" src="https://i.imgur.com/ih41LcD.png" width=40%/>

</center>

> - Enter your value and approve the transfer. This will redirect you to approve the transfer fee.

<center>

<img alt="metaMask fee approval tool" src="https://i.imgur.com/Yyz6C9j.png" width=40%/>

</center>

> - After confirming the transaction fee you will receive a notification from MetaMask stating that the transaction has been completed.
>
> - Once approved you should see confirmations similar to the ones below:

<center>

<img alt="final deposit screen" src="https://i.imgur.com/sQ4hUex.png" width=40%/>

</center>

<center><img alt="final deposit screen" src="https://i.imgur.com/CSzjhTb.png" width=40%/></center>

<center><img alt="final deposit screen"  src="https://i.imgur.com/SSqltEG.png" width=40%/></center>

</center>

> - At this stage hit the deposit button and watch the magic happen.
>
> - After approving the transaction you should see a notification that the transfer was a success

<center>
<img alt="final deposit transfer screen" src="https://i.imgur.com/zPP5ySb.png" width=60%/>
</center>
