---
id: local-development-on-local-node
title: Local Development on local node
---

# Local Development on local node

## Requirements

**IMPORTANT: Make sure you have the latest version of NEAR Shell and Node Version &gt; 10.x** 

* `npm` \(Get it [here](https://www.npmjs.com/get-npm)\)
* `node version 10.x`\(Get it [here](https://nodejs.org/en/download)\)
* `near-shell`  The NEAR cli tool.
  * Install with`npm i -g near-shell`
  * Check out the commands [here](https://github.com/nearprotocol/near-shell)

**Docker**

* By default we use Docker to run the client:
* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## 1. **Run a node locally**

First we want to clone the `nearcore` repo so that we can run a local node. 

```bash
git clone https://github.com/nearprotocol/nearcore.git
```

`cd` into it:

```bash
cd nearcore
```

and then run `./scripts/start_localnet.py`. With Ubuntu you may need to prepend `sudo`

## 2. Create an account and start the node

You will then be prompted for an Account ID. An account will be created for you, which you can then use to deploy your contracts. **It is important that you enter an account ID here so that an account is created for you. Ignore the 'leave empty if not going to be a validator' message.'**

```
Enter your account ID (leave empty if not going to be a validator):
```

A node will then start in the background inside the docker. To check the logs inside the docker, run `docker logs --follow nearcore`.

You should see the success message `Node is running!`

run `docker logs --follow nearcore` to see the logs. 

## 3. Create a new project

Now cd into the directory you want to create a project in, and run: 

```bash
near new_project [YOUR_PROJECT_DIR]
```

After this, cd into the project directory and run npm install

```bash
cd ./[YOUR_PROJECT_DIR] && npm install
```

## 4. Write the smart contract

Your project is pre-seeded with a simple contract which you can deploy right away, so feel free to head to step 5.

If you've already successfully deployed a contract, you'll probably want to start coding your own smart contract. If so, you'll find the below resources helpful.

{% page-ref page="../working-smart-contracts/" %}

For a deep dive into the file structure of a NEAR Project template, take a look here:

## 5. Create an account for your contract on the Local Node

Let's now deploy your contract to the local Node which you have running.

You'll first want to specify NODE\_ENV to be 'local.' Set the NODE\_ENV constant by running this command in bash: 

`export NODE_ENV='local'`

From there, use this command to create an account for your contract

```bash
near create_account <yourcontractname> --masterAccount=<login> --initialBalance <initalbalance>
```

**--masterAccount= :** specifies which account's key should be used to deploy the contract. Should be the same account that you created when running the Local Node.   
****i**nitialBalance :** specifies how much to seed the contract balance with

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

