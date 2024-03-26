---
id: kurtosis-localnet
title: Creating a Local Development Environment
sidebar_label: Local Development
description: Using Kurtosis NEAR Package to develop locally
---

> [Kurtosis](https://www.kurtosis.com/) has created an easy way to spin up a local NEAR testing environment using a [Docker container](https://www.docker.com/).

This Kurtosis NEAR Package contains the following components:

- [Indexer for Explorer](https://github.com/near/near-indexer-for-explorer)
- [NEAR Explorer](https://github.com/near/near-explorer)
- [NEAR Wallet](https://github.com/near/near-wallet)
- Local RPC Endpoint

[Visit here](https://www.loom.com/share/8a1b8e2138334a81a380f5d523fba27e) to see a short demo of the package in action.

---

## Prerequisites {#prerequisites}

- [Docker](https://docs.docker.com/get-docker/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [NEAR-CLI](/tools/near-cli#setup)
- [Kurtosis CLI](https://docs.kurtosis.com/install)
  - Start Kurtosis engine after installation using: `kurtosis engine start`

---

## Setup

### Launch Kurtosis NEAR Package {#launching-cluster}

Launch your Kurtosis NEAR Package in four easy steps!

1. Launch [Docker](https://docs.docker.com/get-docker/)

2. Copy the [Kurtosis NEAR Package launch script](https://github.com/kurtosis-tech/near-package/blob/master/launch-local-near-cluster.sh) by running the following:

```bash
curl -o ~/launch-local-near-cluster.sh https://raw.githubusercontent.com/kurtosis-tech/near-package/master/launch-local-near-cluster.sh -L
```

3. Grant write permission to the script file you just downloaded:

```bash
chmod u+x ~/launch-local-near-cluster.sh
```

4. Launch the Kurtosis NEAR Package:

If you're running the NEAR-in-Kurtosis cluster on your local machine:

```bash
~/launch-local-near-cluster.sh
```

If you're running your NEAR-in-Kurtosis cluster on a machine you intend to access remotely, replace `1.2.3.4` with the IP address of the machine you're running the cluster on:

```bash
~/launch-local-near-cluster.sh '{"backend_ip_address":"1.2.3.4"}'
```

<details>
<summary>Example response: </summary>
<p>

```bash
Created directory '/Users/zerix/.neartosis' for storing all NEAR-in-Kurtosis output
INFO[2022-12-06T12:59:04+05:30] Creating a new enclave for Starlark to run inside...
INFO[2022-12-06T12:59:14+05:30] Enclave 'near' created successfully
INFO[2022-12-06T12:59:14+05:30] Kurtosis CLI is running in a non interactive terminal. Everything will work but progress information and the progress bar will not be displayed.

> print "Starting the near-package with input struct(backend_ip_address = \"127.0.0.1\")"
Starting the near-package with input struct(backend_ip_address = "127.0.0.1")

> print "Launching contract helper postgresql"
Launching contract helper postgresql

> print "Adding contract helper Posgresql DB running on port '5432'"
Adding contract helper Posgresql DB running on port '5432'

> add_service service_id="contract-helper-db"
Service 'contract-helper-db' added with service GUID 'contract-helper-db-1670311755'

> exec service_id="contract-helper-db" command=["sleep", "10"]
Command returned with exit code '0' with no output

> exec service_id="contract-helper-db" command=["psql", "-U", "near", "-c", "\\l"]
Command returned with exit code '0' and the following output:
List of databases
   Name    | Owner | Encoding |  Collate   |   Ctype    | Access privileges
-----------+-------+----------+------------+------------+-------------------
 near      | near  | UTF8     | en_US.utf8 | en_US.utf8 |
 postgres  | near  | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | near  | UTF8     | en_US.utf8 | en_US.utf8 | =c/near          +
           |       |          |            |            | near=CTc/near
 template1 | near  | UTF8     | en_US.utf8 | en_US.utf8 | =c/near          +
           |       |          |            |            | near=CTc/near
(4 rows)

> exec service_id="contract-helper-db" command=["psql", "-U", "near", "-c", "create database indexer with owner=near"]
Command returned with exit code '0' and the following output: 'CREATE DATABASE'

> exec service_id="contract-helper-db" command=["psql", "-U", "near", "-c", "create database analytics with owner=near"]
Command returned with exit code '0' and the following output: 'CREATE DATABASE'

> exec service_id="contract-helper-db" command=["psql", "-U", "near", "-c", "create database telemetry with owner=near"]
Command returned with exit code '0' and the following output: 'CREATE DATABASE'

> print "Contract helper postgresql db info struct(analytics_db = \"analytics\", db_user_password = \"near\", db_username = \"near\", indexer_db = \"indexer\", private_url = struct(ip_address = \"contract-helper-db\", path = \"\", port_number = 5432, protocol = \"postgres\"), telemetry_db = \"telemetry\")"
Contract helper postgresql db info struct(analytics_db = "analytics", db_user_password = "near", db_username = "near", indexer_db = "indexer", private_url = struct(ip_address = "contract-helper-db", path = "", port_number = 5432, protocol = "postgres"), telemetry_db = "telemetry")

> print "Launching contract helper dynamo db"
Launching contract helper dynamo db

> print "Adding contract helper DynamoDB running on default port '8000'"
Adding contract helper DynamoDB running on default port '8000'

> add_service service_id="contract-helper-dynamo-db"
Service 'contract-helper-dynamo-db' added with service GUID 'contract-helper-dynamo-db-1670311770'

> print "Contract helper dynamodb info struct(private_url = struct(ip_address = \"contract-helper-dynamo-db\", path = \"\", port_number = 8000, protocol = \"TCP\"))"
Contract helper dynamodb info struct(private_url = struct(ip_address = "contract-helper-dynamo-db", path = "", port_number = 8000, protocol = "TCP"))

> print "Launching indexer"
Launching indexer

> print "Adding indexer service..."
Adding indexer service...

> upload_files src="github.com/kurtosis-tech/near-package/static_files/near-configs/localnet" artifact_id="8f5279c5-d012-4543-88e7-e9829b6d6040"
Files uploaded with artifact ID '8f5279c5-d012-4543-88e7-e9829b6d6040'

> add_service service_id="indexer-node"
Service 'indexer-node' added with service GUID 'indexer-node-1670311774'

> exec service_id="indexer-node" command=["sleep", "10"]
Command returned with exit code '0' with no output

> exec service_id="indexer-node" command=["cat", "/root/.near/validator_key.json"]
Command returned with exit code '0' and the following output:
{
  "account_id": "test.near",
  "public_key": "ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW",
  "secret_key": "ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW"
}

> print "Indexer launched with struct(private_rpc_url = struct(ip_address = \"indexer-node\", path = \"\", port_number = 3030, protocol = \"http\"), public_rpc_url = struct(ip_address = \"127.0.0.1\", path = \"\", port_number = 8332, protocol = \"http\"), validator_key = {\"account_id\": \"test.near\", \"public_key\": \"ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW\", \"secret_key\": \"ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW\"})"
Indexer launched with struct(private_rpc_url = struct(ip_address = "indexer-node", path = "", port_number = 3030, protocol = "http"), public_rpc_url = struct(ip_address = "127.0.0.1", path = "", port_number = 8332, protocol = "http"), validator_key = {"account_id": "test.near", "public_key": "ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW", "secret_key": "ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW"})

> print "Launching contract helper"
Launching contract helper

> print "Adding contract helper service running on port '3000'"
Adding contract helper service running on port '3000'

> add_service service_id="contract-helper-service"
Service 'contract-helper-service' added with service GUID 'contract-helper-service-1670311796'

> print "Contract helper launchded with struct(private_url = struct(ip_address = \"contract-helper-service\", path = \"\", port_number = 3000, protocol = \"http\"), public_url = struct(ip_address = \"127.0.0.1\", path = \"\", port_number = 8330, protocol = \"http\"))"
Contract helper launchded with struct(private_url = struct(ip_address = "contract-helper-service", path = "", port_number = 3000, protocol = "http"), public_url = struct(ip_address = "127.0.0.1", path = "", port_number = 8330, protocol = "http"))

> print "Launching explorer backend"
Launching explorer backend

> print "Adding explorer backend service"
Adding explorer backend service

> add_service service_id="explorer-backend"
Service 'explorer-backend' added with service GUID 'explorer-backend-1670311799'

> print "Explorer backend launchded with struct(private_url = struct(ip_address = \"explorer-backend\", path = \"\", port_number = 8080, protocol = \"http\"), public_url = struct(ip_address = \"127.0.0.1\", path = \"\", port_number = 18080, protocol = \"http\"))"
Explorer backend launchded with struct(private_url = struct(ip_address = "explorer-backend", path = "", port_number = 8080, protocol = "http"), public_url = struct(ip_address = "127.0.0.1", path = "", port_number = 18080, protocol = "http"))

> print "Launching explorer frontend"
Launching explorer frontend

> print "Adding explorer frontend service running on port '3000'"
Adding explorer frontend service running on port '3000'

> add_service service_id="explorer-frontend"
Service 'explorer-frontend' added with service GUID 'explorer-frontend-1670311803'

> print "Explorer frontend launchded with struct(public_url = struct(ip_address = \"127.0.0.1\", path = \"\", port_number = 8331, protocol = \"http\"))"
Explorer frontend launchded with struct(public_url = struct(ip_address = "127.0.0.1", path = "", port_number = 8331, protocol = "http"))

> print "Launching wallet"
Launching wallet

> print "Adding wallet service running on port '3004"
Adding wallet service running on port '3004

> print "Replacing variable 'NODE_URL' to 'http://127.0.0.1:8332' using regexp: '([,{])NODE_URL:[^,]*([,}])'"
Replacing variable 'NODE_URL' to 'http://127.0.0.1:8332' using regexp: '([,{])NODE_URL:[^,]*([,}])'

> print "Replacing variable 'ACCOUNT_HELPER_URL' to 'http://127.0.0.1:8330' using regexp: '([,{])ACCOUNT_HELPER_URL:[^,]*([,}])'"
Replacing variable 'ACCOUNT_HELPER_URL' to 'http://127.0.0.1:8330' using regexp: '([,{])ACCOUNT_HELPER_URL:[^,]*([,}])'

> print "Replacing variable 'EXPLORER_URL' to 'http://127.0.0.1:8331' using regexp: '([,{])EXPLORER_URL:[^,]*([,}])'"
Replacing variable 'EXPLORER_URL' to 'http://127.0.0.1:8331' using regexp: '([,{])EXPLORER_URL:[^,]*([,}])'

> print "Replacing variable 'NETWORK_ID' to 'localnet' using regexp: '([,{])NETWORK_ID:[^,]*([,}])'"
Replacing variable 'NETWORK_ID' to 'localnet' using regexp: '([,{])NETWORK_ID:[^,]*([,}])'

> print "Replacing variable 'ACCOUNT_ID_SUFFIX' to 'test.near' using regexp: '([,{])ACCOUNT_ID_SUFFIX:[^,]*([,}])'"
Replacing variable 'ACCOUNT_ID_SUFFIX' to 'test.near' using regexp: '([,{])ACCOUNT_ID_SUFFIX:[^,]*([,}])'

> print "Replacing variable 'ACCESS_KEY_FUNDING_AMOUNT' to '3000000000000000000000000' using regexp: '([,{])ACCESS_KEY_FUNDING_AMOUNT:[^,]*([,}])'"
Replacing variable 'ACCESS_KEY_FUNDING_AMOUNT' to '3000000000000000000000000' using regexp: '([,{])ACCESS_KEY_FUNDING_AMOUNT:[^,]*([,}])'

> add_service service_id="wallet"
Service 'wallet' added with service GUID 'wallet-1670311807'

> print "Explorer wallet struct(public_url = struct(ip_address = \"127.0.0.1\", path = \"\", port_number = 8334, protocol = \"http\"))"
Explorer wallet struct(public_url = struct(ip_address = "127.0.0.1", path = "", port_number = 8334, protocol = "http"))

Starlark code successfully run. Output was:
{
 "contract_helper_service_url": "http://127.0.0.1:8330",
 "explorer_url": "http://127.0.0.1:8331",
 "near_node_rpc_url": "http://127.0.0.1:8332",
 "network_name": "localnet",
 "root_validator_key": {
  "account_id": "test.near",
  "public_key": "ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW",
  "secret_key": "ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW"
 },
 "wallet_url": "http://127.0.0.1:8334"
}
INFO[2022-12-06T13:00:10+05:30] =============================================
INFO[2022-12-06T13:00:10+05:30] ||          Created enclave: near          ||
INFO[2022-12-06T13:00:10+05:30] =============================================
============================================================ SUCCESS ================================================================================
  ACTION Paste the following in your terminal to declare the following variables so you can use them:

         export NEAR_ENV="local"
         export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
         export NEAR_NODE_URL="http://127.0.0.1:8332"
         export NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-12-06T12.59.04/validator-key.json"
         export NEAR_WALLET_URL="http://127.0.0.1:8334"
         export NEAR_HELPER_URL="http://127.0.0.1:8330"
         export NEAR_HELPER_ACCOUNT="test.near
\"ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW\"})
ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW"})
test.near"
         export NEAR_EXPLORER_URL="http://127.0.0.1:8331"

  ACTION Paste the following into your terminal now to use the 'local_near' command as a replacement for the NEAR CLI for connecting to your
         local cluster (e.g. 'local_near login'):

         alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:8332" NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-12-06T12.59.04/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:8334" NEAR_HELPER_URL="http://127.0.0.1:8330" NEAR_HELPER_ACCOUNT="test.near
\"ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW\"})
ed25519:2ykcMLiM7vCmsSECcgfmUzihBtNdBv7v2CxNi94sNt4R8ar4xsrMMYvtsSNGQDfSRhNWXEnZvgx2wzS9ViBiS9jW"})
test.near" NEAR_EXPLORER_URL="http://127.0.0.1:8331" near'

  ACTION If you want the 'local_near' command available in all your new terminal windows, add the above alias into your .bash_profile/.bashrc/.zshrc
         file and open a new terminal window.

  ACTION To stop your cluster, run the following:

         kurtosis enclave stop near

  ACTION To remove your cluster, run:

         kurtosis clean -a

============================================================ SUCCESS ================================================================================
```

:::tip

The URLs and validator key value above will be the same for each run of Kurtosis, so you can safely use these values in your config files.

:::

:::tip

If you're running Kurtosis on a remote machine, you'll also need to:

- Replace the `127.0.0.1` IP addresses in the environment variables with the IP address of your remote machine
- Copy the validator key from where it lives on the machine running Kurtosis (in `NEAR_CLI_LOCALNET_KEY_PATH`) to somewhere on your local machine
- Adjust the value of the `NEAR_CLI_LOCALNET_KEY_PATH` on your local machine to match the location you stored the key at

:::

</p>
</details>

If you ever forget the above URLs, you can inspect the cluster:

```
kurtosis enclave inspect near
```

### Setup Environment Variables

After deploying your Kurtosis NEAR Package, you will need to setup some environment variables to make life a lot easier. Notice the **ACTION** sections in your terminal log from the package deployment. Bạn sẽ sử dụng chính xác các giá trị này để thiết lập các variable sau.

1. Follow the first ACTION item from the deployment log by copying all of the export commands and running them in your terminal.

**Ví dụ về các lệnh export: (KHÔNG ĐƯỢC COPY ~ các giá trị của bạn sẽ khác một chút)**

```bash
export NEAR_ENV="local"
export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
export NEAR_NODE_URL="http://127.0.0.1:8332"
export NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json"
export NEAR_WALLET_URL="http://127.0.0.1:8334"
export NEAR_HELPER_URL="http://127.0.0.1:8330"
export NEAR_HELPER_ACCOUNT="test.near"
export NEAR_EXPLORER_URL="http://127.0.0.1:8331"
```

2. Proceed to the second ACTION item which asks you to create an alias for `local_near`. This is what we will use when running [`near-cli`](/tools/near-cli) commands with our test environment.

**Ví dụ về alias: (KHÔNG ĐƯỢC COPY ~ các giá trị của bạn sẽ khác một chút)**

```bash
alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:8332" NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:8334" NEAR_HELPER_URL="http://127.0.0.1:8330" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:8331" near'
```

Now replacing `near` with `local_near` when running [`near-cli`](/tools/near-cli) commands will perform these actions in your local test environment.

### Testing

Để đảm bảo alias của bạn hoạt động chính xác, cần kiểm tra state của root account `test.near`.

Chạy command sau trong terminal của bạn:

```bash
local_near state test.near
```

Lệnh này sẽ trả về kết quả tương tự như sau:

```bash
Loaded master account test.near key from /Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json with public key = ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW
Account test.near
{
  amount: '1000000000000000000000000000000000',
  block_hash: 'G8jx4pYgqFSFSCDyM9MvVYj3HAdgRuxhkAHGweNhUNrY',
  block_height: 224,
  code_hash: '11111111111111111111111111111111',
  locked: '50000000000000000000000000000000',
  storage_paid_at: 0,
  storage_usage: 182,
  formattedAmount: '1,000,000,000'
}
```

**Chúc mừng bạn! Quá trình thiết lập đã hoàn tất và bạn đã sẵn sàng để khám phá NEAR blockchain của bạn trên local!** 🎉

:::tip

Bạn có thể xem qua [video presentation](https://www.loom.com/share/8a1b8e2138334a81a380f5d523fba27e) tuyệt vời của Kurtosis Team, nó bao quát toàn bộ các bước ở trên cũng như demo tính năng của việc thiết lập network này ở local.

:::

---

## Using Wallet and Explorer

### Local NEAR Wallet

Now that you have [everything setup](#setup), create an account using your local NEAR Wallet at 127.0.0.1:8334.

![Local wallet landing page](/docs/assets/kurtosis/local-wallet-landing-page.png)

Quá trình tạo account này hoàn toàn giống với mainnet hoặc testnet, tuy nhiên **passphrase recovery mode chỉ** hoạt động ở mainnet và testnet. Cũng lưu ý rằng root account là `test.near` thay vì `testnet` hoặc `mainnet`. This means that all the accounts you create will be [subaccounts](/concepts/protocol/account-model#subaccounts) of `test.near`. (ví dụ: `benji.test.near`)

:::tip

Because the Wallet will start on the same host and port, and the Wallet stores your account information in your browser's local storage, if you've created an account with a previous Kurtosis network then the Wallet will be storing the old account's information (which won't work with your new network). If this is the case for you, you'll need to clear the Wallet's storage by visiting [your Chrome's local storage](chrome://settings/siteData?searchSubpage=127.0.0.1), removing the `127.0.0.1` entry, and refreshing the Wallet.

:::

Bây giờ bạn vừa tạo xong một account, hãy thử dùng nó để tương tác với CLI ở local. Để dùng account này bạn sẽ cần phải "login" vào nó thông qua CLI, điều này sẽ lưu một full access key ở local tương ứng với account đó. [`near login`](/tools/near-cli#near-login) is the command to perform this action but as you are on `localnet` you will need to replace `near` with `local_near`.

```bash
local_near login
```

Nó sẽ khởi chạy một wallet site ở local và sẽ hỏi để xác nhận cho action này. Một khi bạn ủy quyền thành công, bạn sẽ thấy một xác nhận giống như sau trong terminal:

```bash
Logged in as [ kevin.test.near ] with public key [ ed25519:8EaALn... ] successfully
```

- Export account ID của bạn vào một environment variable bằng cách chạy lệnh sau: (nhớ thay thế YOUR_ACCOUNT_ID)

```bash
export ACCOUNT_ID=YOUR_ACCOUNT_ID
```

- Bây giờ tạo một test transaction bằng cách gửi 1 $NEAR tới root account `test.near`:

```bash
local_near send $ACCOUNT_ID test.near 1
```

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/docs/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```bash
Sending 1 NEAR to test.near from kevin.test.near
Loaded master account test.near key from /Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json with public key = ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW
Transaction Id 3e3H5zqj9noKGYTCMqeZ5pb4NWK7tQsjYKak6ybtpgvD
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:8331/transactions/3e3H5zqj9noKGYTCMqeZ5pb4NWK7tQsjYKak6ybtpgvD
```

</p>
</details>

### Local NEAR Explorer

Một lần nữa, sau khi đã [thiết lập mọi thứ](#setup) bạn có thể xem chi tiết transaction bằng command mà bạn vừa thực hiện ở đoạn cuối của [phần vừa rồi](#local-near-wallet). Lưu ý rằng dòng log cuối của terminal hiển thị một đường dẫn tới transaction chi tiết trên NEAR Explorer của bạn ở local.

```bash
Sending 1 NEAR to test.near from kevin.test.near
Loaded master account test.near key from /Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json with public key = ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW
Transaction Id 3e3H5zqj9noKGYTCMqeZ5pb4NWK7tQsjYKak6ybtpgvD
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:8331/transactions/3e3H5zqj9noKGYTCMqeZ5pb4NWK7tQsjYKak6ybtpgvD
```

- Click vào link này hoặc copy/paste nó vào browser của bạn:

![Gửi 1 NEAR trên local explorer](/docs/assets/kurtosis/local-explorer-send-funds.png)

Mọi thứ ở đây hoạt động giống y hệt như NEAR Explorer ở `testnet` hay `mainnet` ngoại trừ việc nó lấy dữ liệu từ NEAR blockchain của bạn trên local!

- If you ever need to open your local NEAR Explorer, you can always visit 127.0.0.1:8331 or run:

```bash
echo $NEAR_EXPLORER_URL
```

**Ví dụ về response nhận được là:**

```bash
http://127.0.0.1:8331
```

![Localnet explorer](/docs/assets/kurtosis/localnet-explorer.png)

---

## Deploy a Smart Contract

Với việc thiết lập mọi thứ và `test.near` account vừa tạo của bạn, bây giờ là lúc để deploy một smart contract lên `localnet`. Với ví dụ này, bạn sẽ deploy một NFT sử dụng một WASM smart contract đã được compile từ [ví dụ NFT này](https://github.com/near-examples/nft-tutorial.git).

- Download smart contract:

```
curl -o ~/main.wasm https://github.com/near-examples/nft-tutorial/raw/main/out/main.wasm -L
```

- Deploy smart contract:

```
local_near deploy --wasmFile ~/main.wasm --accountId $ACCOUNT_ID
```

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/docs/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Starting deployment. Account id: goteam.test.near, node: http://127.0.0.1:62285, helper: http://127.0.0.1:62286, file: /Users/benjaminkurrek/main.wasm
Transaction Id 7atHm2piVehEitYeMF2FxWuRJVd6ZdRQEo3K83P98GuR
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:62290/transactions/7atHm2piVehEitYeMF2FxWuRJVd6ZdRQEo3K83P98GuR
Done deploying to goteam.test.near
```

</p>
</details>

- Click vào đường dẫn tới Explorer và kiểm tra rằng contract đã được deploy:

![Contract đã deploy trên local explorer](/docs/assets/kurtosis/local-explorer-contract-deployed.png)

Bây giờ, hãy tương tác với contract vừa deploy.

- Đầu tiên, khởi tạo contract bằng cách chạy command sau:

```bash
local_near call $ACCOUNT_ID new_default_meta '{"owner_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID
```

Điều này sẽ khởi tạo một contract với một vài metadata mặc định và thiết lập account ID của chúng ta làm chủ sở hữu của contract.

- Bây giờ mint NFT đầu tiên của bạn!

```bash
local_near call $ACCOUNT_ID nft_mint '{"token_id": "team_token", "metadata": { "title": "Go Team!", "description": "Go Team!", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif", "copies": 1}, "receiver_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID --amount 0.1
```

Một khi NFT đã được mint, bạn có thể xem token này trên tab collectibles trên wallet ở local. Chỉ cần refresh, nếu bạn đang mở sẵn wallet site. Ngược lại, mở NEAR Wallet của bạn ở local để xem collectible của bạn.

![Tab collectibles trong wallet ở local](/docs/assets/kurtosis/local-wallet-collectibles-tab.png)

Chúng ta sẽ không hé lộ NFT này là gì, nhưng một khi bạn chuyển qua tab collectibles một token tuyệt đẹp sẽ ở đó!

---

## Connecting a dApp to `localnet`

The ability to develop decentralized applications locally is a dream come true for dApp developers and the Kurtosis NEAR Package really simplifies this process. Bây giờ bạn sẽ integrate `localnet` với một trong những ví dụ trên [near.dev](http://near.dev).

### Clone Example dApp

- Clone the [NEAR Guestbook](https://github.com/near-examples/guest-book-examples) repository:

```bash
git clone https://github.com/near-examples/guest-book-examples.git
```

### Configure Network

- Mở file `src/config.js` trong guestbook repo và tìm phần config `local`:

```javascript
case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        contractName: CONTRACT_NAME
      };
```

Tại đây, bạn cần phải cập nhật toàn bộ các giá trị **ngoại trừ** `contractName`. Copy đoạn code sau vào câu lệnh case `local` của bạn. Nếu bạn đã thiết lập các environment variable, thì câu lệnh này sẽ tự động gán giá trị của những variable này vào config. Bằng cách này, bạn không cần phải thay đổi bất cứ thứ gì khi khởi chạy những enclave mới.

```javascript
case 'local':
      return {
            networkId: process.env.NEAR_CLI_LOCALNET_NETWORK_ID || 'local',
            nodeUrl: process.env.NEAR_NODE_URL || 'http://localhost:3030',
            keyPath: process.env.NEAR_CLI_LOCALNET_KEY_PATH || `${process.env.HOME}/.near/validator_key.json`,
            walletUrl: process.env.NEAR_WALLET_URL || 'http://localhost:4000/wallet',
            contractName: CONTRACT_NAME,
        };
```

Điều cuối cùng bạn cần làm là trong terminal của bạn thiết lập `NODE_ENV` với giá trị là `local`, như vậy thì dApp của bạn sẽ dùng những giá trị mà chúng ta vừa thiết lập ở trên.

- Chạy:

```bash
export NODE_ENV=local
```

**dApp của bạn bây giờ đã được thiết lập toàn bộ để dùng `localnet`!** 🎉

### Create Contract Account

Như đã nhắc đến ở trên, bạn không cần thay đổi `contractName` trong file `config.js` mà bạn đã cập nhật trước đó. Đây chính là một environment variable mà bạn sẽ thiết lập bây giờ. Hãy tạo nhanh một subaccount từ [account mà bạn đã tạo trước đó](#local-near-wallet) để deploy guest-book contract vào.

- Sử dụng `local_near CLI`, chạy command sau:

```bash
local_near create-account guest-book.$ACCOUNT_ID --masterAccount $ACCOUNT_ID --initialBalance 5
```

**Ví dụ về response nhận được là:**

```bash
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Saving key to 'undefined/localnet/guest-book.goteam.test.near.json'
Account guest-book.goteam.test.near for network "localnet" was created.
```

- Export `CONTRACT_NAME` environment variable với account mà bạn vừa tạo:

```bash
export CONTRACT_NAME=guest-book.$ACCOUNT_ID
```

### Deploy Contract to `localnet`

Bây giờ bạn đã sẵn sàng để khởi chạy dApp của bạn thông qua việc thiết lập network và tạo contract account ở trên!

- Chạy command sau trong thư mục root của guest book repo:

```bash
yarn && yarn start
```

**Ví dụ về response nhận được:**

![Build dApp ở local](/docs/assets/kurtosis/local-dapp-build.png)

- Mở dApp bằng cách click vào server address trong terminal:

```bash
Server running at http://localhost:1234
✨  Built in 1.20s.
```

Bạn sẽ thấy landing page của Guest Book:

![Landing page của Guest Book ở local](/docs/assets/kurtosis/local-guest-book-landing.png)

:::tip

Nếu bạn gặp bất kỳ vấn đề nào khi đăng nhập, hãy thử xóa local storage trên browser của bạn. Nếu bạn đã từng sử dụng guest-book trước đây, browser của bạn nghĩ rằng bạn vẫn đang login với account `testnet` của bạn và nó sẽ xuất hiện một lỗi nói rằng nó không thể tìm thấy account đó trên `localnet`.

:::

Một khi bạn đăng nhập, bạn có thể sign một message với một khoản donation tùy ý.

![Sign Message trong Guest Book ở Local](/docs/assets/kurtosis/local-guest-book-signed-message.png)

- Khi sign trên Guest Book sẽ tạo một transaction trên `localnet`.

- Một khi hoàn tất, mở NEAR explorer của bạn trên local và bạn có thể xem transaction mà bạn vừa tạo!

![Sign Transaction trên Explorer ở Local](/docs/assets/kurtosis/local-explorer-signed-transaction.png)

**Chúc mừng bạn! Bạn vừa deploy thành công và đã tương tác với một dApp trên một NEAR blockchain ở local!** 🎉

---

## Managing NEAR Pacakages

The Kurtosis NEAR Pacakages you create will continue to run on your local machine for as long as your Docker engine is running. This package runs inside of a Kurtosis "enclave" which is an environment isolated from both your computer and other enclaves. Trong thực tế, điều này nghĩa là bạn có thể có nhiều NEAR cluster độc lập ở local chạy trên máy tính của bạn chỉ bằng cách chạy lại các script mà chúng ta đã thực thi trong [các hướng dẫn cài đặt](#setup).

### View Package Status

- Để xem được status của các enclave có sẵn, chạy command sau:

```bash
kurtosis enclave ls
```

### View Package Details

- Để xem được thông tin chi tiết về một enclave, copy một enclave ID và chạy:

```bash
kurtosis enclave inspect near
```

### Terminate Package

- To shut down your NEAR Package and free up resources on your machine, run the following:

```bash
kurtosis enclave stop near
```

:::note

Bạn sẽ không thể khởi động lại cluster! Nếu đây là điều bạn cần, vui lòng [tạo một issue ở đây](https://github.com/kurtosis-tech/kurtosis-cli-release-artifacts) sau đó chúng tôi có thể ưu tiên nó.

:::

### Delete Package

- Việc dừng hoạt động một enclave vẫn sẽ giữ nguyên các tài nguyên của nó để bạn có thể kiểm tra lại chúng nếu cần. Để xóa một enclave đã dừng và giải phóng những resource của nó, chạy:

```
kurtosis clean
```

### Delete All Package

Nếu bạn muốn xóa _tất cả_ các enclave, không quan tâm tới việc chúng có đang chạy, thêm cờ `-a` vào `clean` như dưới đây:

```
kurtosis clean -a
```

Đây có thể là một cách hữu dụng để xóa toàn bộ dữ liệu của Kurtosis của bạn.
