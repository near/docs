---
id: rainbow-bridge-frontend
title: Using the Rainbow Bridge (MainNet)
sidebar_label: Bridge Front-end walkthrough
---

# What you will need

- You will need at least 100$ USD. Some of this money will be burnt in transfer fees, so not all of it will be directed into your wallet
- A Near Mainnet Wallet, please go wallet.near.org to create your wallet also if you need someone to fund your wallet you can reach out to one of the NEAR DevRel Team members on our [discord](https://discord.com/invite/UY9Xf2k) channel to help kickstart your wallet

**Before you connect to you're NEAR Wallet** Please Make sure that you're wallet is not ledger protected (meaning you aren't using a Ledger to store your access keys) this application does not work with Ledger protected wallets, if you do have one please make another wallet and secure it with a security phrase for now.

- A CryptoWallet. For the purposes of this tutorial we will be using [MetaMask](https://metamask.io/download).

---

<center>

# Step 1 Buy Ether

You will need money to transfer money. After downloading the MetaMask web extension and hit the buy button.

<center>

![](https://i.imgur.com/zKC5VBe.png=400x)

</center>

<center>
Assuming you don't have any Ether, select Buy ETH with Wyre. follow the onscreen instructions and purchase about ~$100 worth of ETH. The time it takes to deposit the funds may vary, so don't be worried if it's taking a while.
<center>

![](https://i.imgur.com/69qjAaC.png=400x)

</center>

<center>

![](https://i.imgur.com/AEL99uf.png=400x)

</center>

# Step 2 Uniswap

Head on over to [Uniswap](https://uniswap.org/) and select the Use Uniswap option in the upper right hand corner

<center>

![](https://i.imgur.com/zKUSonf.png =1000x)

</center>

Connect your MetaMask Wallet to Uniswap using the browser extenstion and then select "ETH" as the from option and "[WETH](https://weth.io/)" (which means wrapped Ether) as the "To" option.

Select Wrap and you wil be redirected to approve the transaction and the transfer fees

<center>

![](https://i.imgur.com/aYCCqHq.png=400x)

</center>

Once this transfer process has been completed open your MetaMask browser extension should show your new wETH balance. Despite the different values in this screenshot it should look something similar to this depending on how much money you've deposited and swapped.

<center>

![](https://i.imgur.com/cJIw69z.png=400x)

</center>
 
 # Step 3 The Rainbow Bridge Frontend

Head on over to the frontend application [here](https://ethereum.bridgetonear.org/?erc20=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)

<center>

![](https://i.imgur.com/VnbNeQ2.png=400x)

</center>

Make sure the network selection option is set to Near-Ethereum.

<center>

![](https://i.imgur.com/5lGDs11.png)

</center>

If you're using MetaMask please make sure that the network option is set to Ethereum Mainnet

<center>

![](https://i.imgur.com/G1Rd0YC.png)

</center>

Select Connect and choose MetaMask, you may need to grant access to this application so check your browser extension. If you have another wallet then use WalletConnect and scan the QR Code

<center>

![](https://i.imgur.com/OQ4TF6t.png=400x)

</center>

**Before you connect to you're NEAR Wallet** Please Make sure that you're wallet is not ledger protected (meaning you aren't using a Ledger to store your access keys) this application does not work with Ledger protected wallets, if you do have one please make another wallet and secure it with a security phrase for now.

With that out of the way 🙂. We can now connect to your NEAR wallet! Hit the connect button next to NEAR and you'll be redirected to this page. Hit Allow and move forward

<center>

![](https://i.imgur.com/2j3qa2f.png=x400)

</center>

# Initiate the Transfer

You're almost done!

Enter the amount of wETH you would like to transfer ( I will be using 0.01ETH which is about $20.00 USD at this time of writing)

<center>

![](https://i.imgur.com/ih41LcD.png=x400)

</center>

Enter your value and approve the trtansfer and you should be redirected to approve the transfer fee.

<center>

![](https://i.imgur.com/Yyz6C9j.png=400x)

</center>

After confirming the transaction fee you will receive a notification from MetaMask stating that the transaction has been completed.

After approving the transaction you should see the following windows

<center>

![](https://i.imgur.com/sQ4hUex.png)

<center>

![](https://i.imgur.com/CSzjhTb.png)

<center>

![](https://i.imgur.com/SSqltEG.png=400x)

At this stage hit the deposit button and watch the magic happen.

After approving the transaction you should see a notification that the transfer was a success

![](https://i.imgur.com/zPP5ySb.png)
