---
id: rainbow-bridge-frontend
title: Using the Rainbow Bridge (MainNet)
sidebar_label: Bridge Front-end walkthrough
---

## TutorPrerequisites 

- $100 USD or equivalent currency _(some of which will be burnt in transfer fees)_
- [NEAR Mainnet Wallet](/docs/develop/basics/create-account#creating-a-mainnet-account)
- [MetaMask](https://metamask.io/download)

**Note:** Rainbow Bridge does not currently support NEAR Wallets that are secured using a Ledger device.

---

## Step 1 - Buy Ether


- Using the metamask extension purchase some ETH.


<center> 

![](https://i.imgur.com/zKC5VBe.png=400x) 

</center>

- Buy ETH with Wyre and follow the onscreen instructions purchasing about ~$100 worth of ETH. The time it takes to deposit the funds may vary, so don't be worried if it's taking a while.

<center>

![](https://i.imgur.com/69qjAaC.png=400x)

</center>

<center>

![](https://i.imgur.com/AEL99uf.png=400x)

</center>

## Step 2 - Swap ETH for wETH

- In order to bring your ETH over to NEAR you will first need to have it "wrapped". The easiest way to do this would be to use an token swap application such as Uniswap.

- Head on over to [Uniswap](https://uniswap.org/) and select the Use Uniswap option in the upper right hand corner.

<center>

![](https://i.imgur.com/zKUSonf.png=1000x)

</center>

- Connect your MetaMask Wallet to Uniswap using the browser extension and then select "ETH" as the from option and "[WETH](https://weth.io/)" (which means wrapped Ether) as the "To" option.

- Select Wrap and you will be redirected to approve the transaction and the transfer fees

<center>

![](https://i.imgur.com/aYCCqHq.png=400x)

</center>

- Once this transfer process has been completed open your MetaMask browser extension and you should see your new wETH balance. Despite the different values in this screenshot it should look something similar to this depending on how much money you've deposited and swapped.

<center>

![](https://i.imgur.com/cJIw69z.png=400x)

</center>
 
 ## Step 3 - Using the Rainbow Bridge

- Head on over to the [Rainbow Bridge](https://ethereum.bridgetonear.org)!

<center>

![](https://i.imgur.com/VnbNeQ2.png=400x)

</center>

- Make sure the network selection option is set to Near-Ethereum.

<center>

![](https://i.imgur.com/5lGDs11.png)

</center>

- Make sure that the network option is set to Ethereum Mainnet.

<center>

![](https://i.imgur.com/G1Rd0YC.png)

</center>

- Select Connect and choose MetaMask, you may need to grant access to this application so check your browser extension. If you have another wallet then use WalletConnect and scan the QR Code.

<center>

![](https://i.imgur.com/OQ4TF6t.png=400x)

</center>

- **Before you connect to you're NEAR Wallet** Please Make sure that you're wallet is not ledger protected (meaning you aren't using a Ledger to store your access keys) this application does not work with Ledger protected wallets, if you do have one please make another wallet and secure it with a security phrase for now.

- With that out of the way 🙂, we can now connect to your NEAR wallet! Hit the connect button next to NEAR and you'll be redirected to this page. Hit "Allow" to proceed.

<center>

![](https://i.imgur.com/2j3qa2f.png=x400)

</center>

## Step - 4 Initiate the Transfer

- You're almost done! Enter the amount of wETH you would like to transfer (I will be using 0.01ETH which is about $20.00 USD at this time of writing)

<center>

![](https://i.imgur.com/ih41LcD.png=x400)

</center>

- Enter your value and approve the transfer. This will redirect you to approve the transfer fee.

<center>

![](https://i.imgur.com/Yyz6C9j.png=400x)

</center>

- After confirming the transaction fee you will receive a notification from MetaMask stating that the transaction has been completed.

- Once approved you should see confirmations similar to the ones below:

<center>

![](https://i.imgur.com/sQ4hUex.png)

![](https://i.imgur.com/CSzjhTb.png)

![](https://i.imgur.com/SSqltEG.png=400x)

</center>

- At this stage hit the deposit button and watch the magic happen.

- After approving the transaction you should see a notification that the transfer was a success

![](https://i.imgur.com/zPP5ySb.png)
