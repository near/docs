# Creating a NEAR Account

The first thing you'll likely want to do is create a NEAR account on Testnet. This account will also be seeded with a balance so that you can use those funds to deploy your contracts. 

Go to our wallet faucet: [https://wallet.nearprotocol.com](https://wallet.nearprotocol.com/), enter a username, and click create account.   
Usernames can be 5-32 characters long and contain any of the following: 

* Lowercase characters \(a-z\) 
* Digits \(0-9\) 
* Special characters \(@.\_-\)

![Step 1: Create Account](../.gitbook/assets/image%20%283%29.png)

From here, if you'd like to be able to recover your private key, enter your phone number.

![Step 2: Decide how you want to back up your private keys](../.gitbook/assets/image.png)

Otherwise you can backup your private key manually. Navigate to local storage to grab your private key and save it somewhere secure.

You can find it your private key by opening up the developer console, navigating to the `Application` tab, clicking on `Local Storage`, and looking for the key-pair `nearlib:keystore:{AccountName}:default`

![](../.gitbook/assets/image%20%285%29.png)





