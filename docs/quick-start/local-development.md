---
description: Want to develop locally? We'll show you how to get started with near-shell
---

# Local Development on testnet

## Requirements

* `npm` \(Get it [here](https://www.npmjs.com/get-npm)\)
* `node version 10.x`\(Get it [here](https://nodejs.org/en/download)\)
* `near-shell`  The NEAR cli tool.
  * Install with\``npm i -g near-shell`
  * Check out the commands [here](https://github.com/nearprotocol/near-shell)
* Whatever frontend build tools you prefer. 
  * By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). \(You shouldn't need to do any config for gulp specifically\).
  * If you're interested in using React, we have an example template [here](https://github.com/nearprotocol/react-template).

## 1. Create a new project

```bash
near new_project [YOUR_PROJECT_DIR]
```

After this, cd into the project directory and run npm install

```bash
cd ./[YOUR_PROJECT_DIR] && npm install
```

## 2. Authorize NEAR Shell on your NEAR account

You'll now want to authorize NEAR shell on your NEAR account, which will allow NEAR Shell to deploy contracts on your NEAR account's behalf \(and spend your NEAR account balance to do so\).

If you don't have a NEAR account yet, take a look at [how to create a NEAR account](create-a-near-account.md).

Type the command `near login` which should return a url:

{% code-tabs %}
{% code-tabs-item title="Example Shell" %}
```bash
Please navigate to this url and follow the instructions to log in: 
https://wallet.nearprotocol.com/login/?title=NEAR+Shell&public_key={publicKey}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

![](../.gitbook/assets/image-3%20%281%29.png)

From there enter in your terminal the same account ID that you authorized:

`Please enter the accountId that you logged in with: <asdfasdf>`

## 3. Write the smart contract

Your project is pre-seeded with a "Hello World" contract which you can deploy right away, so feel free to head to step 4.

If you've already successfully deployed a contract, you'll probably want to start coding your own smart contract. If so, you'll find the below resources helpful.

{% page-ref page="../working-smart-contracts/" %}

For a deep dive into the file structure of a NEAR Project template, take a look here:

{% page-ref page="file-structure.md" %}

## 4. Create an account for your contract

Let's now deploy your contract to the same TestNet which the NEAR Studio IDE deploys to. Navigate to your source directory in command line, and create an account for your contract

```bash
near create_account <yourcontractname> --masterAccount=<login> --initialBalance <initalbalance>
```

**--masterAccount= :** specifies which account's key should be used to deploy the contract  
**\*\*i**nitialBalance :\*\* specifies how much to seed the contract balance with

You should see the success message:

`Account <yourcontractname> for network "default" was created.`

The last step is now to update the src/config.js to use &lt;yourcontractname&gt; for deploy.

{% code-tabs %}
{% code-tabs-item title="src/config.js" %}
```javascript
(function() {
    const CONTRACT_NAME = '<yourcontractname>'; /* TODO: fill this in! */
    const DEFAULT_ENV = 'development';
    ...
})();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 5. Deploy your contract and start the web server

Deploy your contract to TestNet and start web server for the frontend.

```bash
npm run start
```

You can run `npm run start` each time you want to redeploy the updated smart contract, or to restart your web server.

For help using cli tools, use `near`. To get a list of available `npm` scripts use `npm run`.

## 6. Test the smart contract

Within the application's directory run either:

**Test on the TestNet:**

```bash
NODE_ENV=development npm test
```

**Test using locally running node:** \(Using TestNet is recommended for now\)

```bash
npm test
```

That's it! The tests will run against the instance that you've deployed to TestNet!

The tests in `src/test.js` will run against the deployed contract.

## 7. Deploy contract to TestNet and frontend to GitHub pages

```bash
npm run deploy
```

