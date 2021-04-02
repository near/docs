# Ethereum & NEAR Rainbow Bridge Inoperability Tutorial for Devs

# **Step 1 Make a MetaMask Account and a Near Wallet Account!**

<center>

**MetaMask**

If you haven't done so already, go ahead and create a [MetaMask](https://metamask.io/download.html) account. A metamask is a kind of cryptocurrency wallet that runs as a browser extension and mobile app that lets you interact with the Ethereum blockchain and use dApps (decentralized applcations). If you would like to learn more please visit this [link](https://medium.com/@seanschoi/what-is-metamask-really-what-is-it-7bc1bf48c75).

I find it useful to download MetaMask on both my mobile phone and my desktop browser (personally using the [Brave](https://brave.com/) browser myself but you may use your preferred website noted on the downloads webpage)

**Near Wallet**
Go to wallet.near.org to create your near account. Follow the onscreen instructions. To create the wallet you will need someone to provide you with initial funding, you can contact members of the near team here on our [discord](https://discord.com/invite/UY9Xf2k)

For the purposes of this tutorial you'll only need a testnet wallet (fake money), the process to create a testnet wallet is the same as a mainnet wallet with one minor difference, you don't need another person or wallet to fund your testnet account to start it. Please visit wallet.testnet.near.org to create your testnet wallet. **_Please note that ledger protected wallets will not work at this time on the rainbowbridge. If you have a ledger protected wallet, it's advised to make a new one ans use a seed phrase_**

---

# **_Step 2 Enter the Rainbow Bridge_**

Visit [here](https://near.github.io/rainbow-bridge-frontend/) to get started

<center>

<img src="https://i.imgur.com/75KvTar.png" width="60%"/>
</center>
(Fig. 1 Rainbow Bridge Home)

Following that link you should see this page (Fig. 1) before you. Let's get the lay of the land....

<center>

<img src="https://i.imgur.com/DAvSqR5.png" width=60%>

</center>
(Fig. 2 Network Selection Tool)

<br>

In the upper left hand corner of the screen you will the network selection tool (Fig. 2).

<center>
<img src="https://i.imgur.com/FH8SVNC.png" width=60%/>

</center>
(Fig. 3 Network Selection Tool Dropdown List)

Here you will see 3 options:

1. Near - Ethereum (Mainnet which means this works with real cryptocurrency)
2. Near Testnet - Ropsten (This utilizes test tokens on Ethereum's Ropsten Testnet and Near's Testnet)
3. Near Testnet - Ropsten (This utilizes test tokens on Ethereum's Rinkeby Testnet and Near's Testnet)

Developers may want to use the testnet tokens for development while desigining their dApps. While the average user may just want to utilize the mainnet to transfer tokens between Ethereum and NEAR.

<center>

<img src="https://i.imgur.com/6p7MZi6.png" width="60%"/>
</center>
(Fig. 4 Ethereum and near account selection tools and transfer direction)

This handy little interface will allow the user to connect to their MetaMask wallet and NEAR wallet and determine the direction of transfer. \

The conect buttons will allow you to connect to their respective wallets while the button in the middle will allow you to change the transfer the (from - to) directions.

---

# **_Step 3 Let's get Conected! (MetaMask)_**

Select connect on the Ethereum Line first.

<center>

<img src="https://i.imgur.com/GmNrbMq.png" width="60%"/>
</center>
(Fig. 5 MetaMask and WalletConnect Options )

Here you will be presented with two options, "Connect to your MetaMask Wallet " or "Scan with WalletConnect". We'll go over both options

**_Option 1 MetaMask Button_**

Upon selecting the first MetaMask Option you will be redirected into this screen. Select which one of your wallets you would like to connect the application to and then hit next.

<center>

<img src="https://i.imgur.com/0krVFKc.png" width="60%"/>
</center>
(Fig. 6 MetaMask Connect Page 1 )

<center>

<img src="https://i.imgur.com/MHeT8He.png" width="60%"/>
</center>
(Fig. 7 Permissions window)

In Figure 7 you will see a list of actions that you are allowing the application to do while interacting with your wallet.

If you are ok with this then hit the connect button

<center>

<img src="https://i.imgur.com/ItoWmZ6.png" width="60%"/>
</center>
(Fig. 8 Network Selection Error)

If you see the error shownin figure 8, simply open your browser extentions button, then select metamask.

<center>

<img src="https://i.imgur.com/UsPJFEr.png" width="60%"/>
</center>
(Fig. 9 MetaMask Network Connection Option)

After selecting MetaMask you will see a network selection dropdown tool. Make sure the option selected here is the same one that you chose in the application. Once a connection has been made successfuly you should see the following in place of the connection option you saw earlier

<center>

<img src="https://i.imgur.com/i0CSu5t.png" width="60%"/>
</center>
(Fig. 10 Successful connection )

**_Option 2 WalletConnect_**
If you select WalletConnect, you will be presented with a QR Code.

On the wallet screen of your MetaMask Mobile app, you will see in the upper right hand corner of the screen the option to get to the scanner mode. Open this from your desired MetaMask Wallet and you should be on your way!

<center>

<img src="https://i.imgur.com/cEtsxx8.png" width="60%"/>
</center>
(Fig 11 MetaMask Mobile Application; Src: https://metamask.io/download

---

# **_Step 4 Let's get Conected! (Near Wallet)_**

Good Job! Now let's move onto the next step, connecting your near wallet.

<center>

<img src="https://i.imgur.com/oIsRy9i.png" width="60%"/>
</center>
(Fig 12)

Select the connect button next to the Near Icon.

<center>

<img src="https://i.imgur.com/qYsu2db.png" width="60%"/>
</center>
(Fig 13 Near Wallet )

You will be redirected to the NEAR wallet. Select the allow button to continue and you'll be redirected to the application. And that's it!

---

# **_Step 5 Beginning The Transfer_**

Select the Begin New Transfer Button Then you'll be redirected to the window shown in Figure 14

<center>

<img src="https://i.imgur.com/1UuOrKA.png" width="60%"/>
</center>
</div>
(Fig. 14 Transfer Window)

On this window the first thing you want to do is hit "Select ERC20" Button

<center>

<img src="https://i.imgur.com/rSeVUZD.png" width="60%"/>
</center>
<br/>

<center>
(Fig 15 Select ERC20 Menu)

You will see a few options here, if you have Tokens stored in your MetaMask wallet. they will appear here.

The Token Names shown here mean:

TST - Ethereum Test Tokens

FAU - Faucet Tokens

USDT - [Tether](https://www.investopedia.com/terms/t/tether-usdt.asp) which is a blockchain based crypto currecy whose cryptocoins in circulation are backed by an equivalet amount of traditional fiat currencies like the Dollar, the Euro, or the Yen.

The other option you have is a Token Address, which is **different** than your MetaMask Wallet Address.

Token Address - (Or Token Contract Address) refers to the location of the actual token contract that manages the logic of the tokens, not the address that holds your own tokens.

To get a better idea of how this works and what this is, we will make our own token contract. Don't worry this can be done in a few simple steps. Let's pay a visit to [etherscan contract wrtiting tool](https://ropsten.etherscan.io/token/0x722dd3f80bac40c951b51bdd28dd19d435762180#writeContract). You can switch the network if you'd like but know that this link will send you to the Ropsten Testnet

</center>

<center>

<img src="https://i.imgur.com/yVWGMHE.png" width="60%"/>
</center>

<center>
(Fig 16. Connect to Web3 )

Select on the Connect to Web3 button to get started. Select MetaMask and you should see the button turn into this. Upon first connection to your meta mask you may need to open the MetaMask browser extenstiion to grant the application permission to interact with your wallet.

After you're connected, select "showMeTheMoney"

</center>

<center>

<img src="https://i.imgur.com/qrg8BpC.png" width="60%"/>
</center>
(Fig 17 Show Me the Money)

Enter in you **MetaMask Wallet Address** you can retreive this from the MetaMask Browser extention. In Figure 18 I can copy my wallet address to the clipboard directly by clicking on "Account 1"

<center>

<img src="https://i.imgur.com/WVOuaGw.png" width="60%"/>
</center>
(Fig. 18 MetaMask Browser Extension)

Paste the Key into the "\_to(address) field" in etherscan

Notice that in the profile summary on the same page we see the decimals set to 18. Which means that if we want say 100 test tokens we have to enter in 100\*10^18 or 100000000000000000000. Enter this as the value if \_value (unit256), and then select write.

<center>

<img src="https://i.imgur.com/evKRpsJ.png" width="60%"/>
</center>
(Fig. 19 Fee Confirmation Page)

After swlecting write you'll be redirected to the fee summary page. Every transaction that takes place on a blockchain will incur a fee. But in this case since we are just working on a testnet you don't have to worry about the fees here (fake monies). So select confirm

go back to Etherscan and select the ViewTransaction button. You should see your transaction pending

<center>

<img src="https://i.imgur.com/tLweJEg.png" width="60%"/>
</center>
(Fig. 20 Pending transaction)

Once this is complete you should see this (see Figure 21) a sucessful transaction.

<center>

<img src="https://i.imgur.com/2qpyge6.png" width="60%"/>
</center>
(Fig. 21 Success ful transaction )

Open your MetaMask and look at the activity tab, and you should see "Show Me The Money" appear on the list, don't worry that it says -0ETH.

<center>

<img src="https://i.imgur.com/MoriMq0.png" width="60%"/>
</center>
(Fig. 22 Where it says profile summary)

Under profile summary where it says contract, copy that address and paste it into the transaction screen. Afterwards you should see a value appear next to "available to transfer" ( See Figure 23)

<center>

<img src="https://i.imgur.com/6J09nhV.png" width="60%"/>
</center>
(Fig. 23 Aviable to transfer )

Now enter a value into the window and select Approve Transfer

<center>

<img src="https://i.imgur.com/ox2jjO1.png" width="60%"/>
</center>
(Fig. 24 Confirm the Transfer )

<center>

<img src="https://i.imgur.com/xbzAlcQ.png" width="60%"/>
</center>
(Fig 25 Lock Tokens)

Hit the lock button

<center>

<img src="https://i.imgur.com/QAsnEmr.png" width="60%"/>
</center>
(Fig 26 Waiting for Ethereum Confirmations )

<center>

<img src="https://i.imgur.com/H6Eh1On.png" width="60%"/>
</center>
(Fit 27 Mint Tokens into NEAR Wallet)

<br/>

And hit the mint Tokens Button.

<center>

# **_Done!_**

What's next? Practice, try transferring the tokens back from your NEAR Testnet wallet back to your MetaMask

</center>
