---
id: kurtosis-localnet
title: 로컬 개발 환경 만들기
sidebar_label: 로컬 개발 환경
description: 로컬 개발을 위해 Kurtosis NEAR 패키지 사용
---

> [Kurtosis](https://www.kurtosis.com/)는 [Docker 컨테이너](https://www.docker.com/)를 사용하여 로컬 NEAR 테스트 환경을 가동하는 쉬운 방법을 만들었습니다.

이 Kurtosis NEAR 패키지에는 다음 구성 요소가 포함되어 있습니다.

- [익스플로러용 인덱서](https://github.com/near/near-indexer-for-explorer)
- [NEAR 익스플로러](https://github.com/near/near-explorer)
- [NEAR 지갑](https://github.com/near/near-wallet)
- 로컬 RPC 엔드포인트

실행 중인 패키지의 짧은 데모를 보려면 [여기를 방문하세요](https://www.loom.com/share/8a1b8e2138334a81a380f5d523fba27e).

---

## 전제 조건 {#prerequisites}

- [Docker](https://docs.docker.com/get-docker/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [NEAR-CLI](/tools/near-cli#setup)
- [Kurtosis CLI](https://docs.kurtosis.com/install)
  - `kurtosis engine start`를 사용하여 설치 후 Kurtosis 엔진을 시작합니다.

---

## 설정

### Kurtosis NEAR 패키지 설치 {#launching-cluster}

간단한 네 가지 단계로 Kurtosis NEAR 패키지를 시작하세요!

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

위의 URL 및 밸리데이터 키 값은 Kurtosis를 실행할 때마다 동일하므로, 구성(config) 파일에서 이 값을 안전하게 사용할 수 있습니다.

:::

:::tip

원격 기기에서 Kurtosis를 실행하고 있다면, 다음과 같은 것들이 필요할 것입니다.

- 환경 변수의 '127.0.0.1' IP 주소를 원격 시스템의 IP 주소로 바꿉니다.
- Kurtosis를 실행하는 시스템의 밸리데이터 키('NEAR_CLI_LOCALNET_KEY_PATH')를 로컬 시스템의 어딘가에 복사합니다.
- 키를 저장한 위치와 일치하도록 로컬 시스템의 'NEAR_CLI_LOCALNET_KEY_PATH' 값을 조정합니다.

:::

</p>
</details>

위의 URL을 잊어버린 경우, 클러스터를 검사합니다.

```
kurtosis enclave inspect near
```

### 환경 변수 설정

Kurtosis NEAR 패키지를 배포한 뒤, 작업을 훨씬 더 쉽게 만들기 위해 몇 가지 환경 변수를 설정해야 합니다. 패키지 배포에서 터미널 로그의 **ACTION** 섹션을 확인하세요. 정확한 값을 사용하여 이러한 변수들을 설정하게 됩니다.

1. Follow the first ACTION item from the deployment log by copying all of the export commands and running them in your terminal.

**내보내기 예시: (복사하지 마세요! 실제와 다를 수 있습니다.)**

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

2. Proceed to the second ACTION item which asks you to create an alias for `local_near`. 이는 테스트 환경에서 [`near-cli`](/tools/near-cli) 명령을 실행할 때 사용할 것입니다.

**내보내기 예시: (복사하지 마세요! 실제와 다를 수 있습니다.)**

```bash
alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:8332" NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:8334" NEAR_HELPER_URL="http://127.0.0.1:8330" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:8331" near'
```

이제 [`near-cli`](/tools/near-cli)를 동작시킬 때 `near`를 `local_near`로 바꾸면, 로컬 테스트 환경에서 작업이 수행될 것입니다

### 테스트

루트 계정인 `test.near`의 상태를 확인하여, 별칭이 올바르게 작동하는지 확인하세요.

터미널에서 다음 명령어를 실행합니다.

```bash
local_near state test.near
```

그러면 다음 출력과 유사한 결과가 반환됩니다.

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

**축하드립니다! 로컬 NEAR 블록체인에서 dApp을 성공적으로 배포하고 상호 작용했습니다!** 🎉

:::tip

Kurtosis 팀은 위의 단계 및 로컬 네트워크 설정의 기능을 시연하는 훌륭한 [비디오 프레젠테이션](https://www.loom.com/share/8a1b8e2138334a81a380f5d523fba27e)을 만들었습니다.

:::

---

## 지갑 및 익스플로러 사용

### 로컬 NEAR 지갑

Now that you have [everything setup](#setup), create an account using your local NEAR Wallet at 127.0.0.1:8334.

![로컬 지갑 랜딩 페이지](/docs/assets/kurtosis/local-wallet-landing-page.png)

계정 생성 과정은 메인넷이나 테스트넷에서와 정확히 동일하지만, 여기서는 **암호 복구 모드만** 작동합니다. 또한 루트 계정이 `testnet` 또는 `mainnet` 대신 `test.near`임을 유의하세요. This means that all the accounts you create will be [subaccounts](/concepts/protocol/account-model#subaccounts) of `test.near`. (예. `benji.test.near`)

:::tip

지갑은 동일한 호스트와 포트에서 시작하고, 브라우저의 로컬 스토리지에 계정 정보를 저장하기 때문에, 이전 Kurtosis 네트워크로 계정을 만든 경우 지갑은 이전 계정의 정보를 저장합니다(새 네트워크에서는 작동하지 않음). 이 경우 [Chrome의 로컬 스토리지](chrome://settings/siteData?searchSubpage=127.0.0.1)에 가서 `127.0.0.1` 항목을 삭제하고 지갑을 새로고침하여 스토리지를 비워야 합니다.

:::

이제 계정을 만들었으므로, 로컬 CLI를 사용하여 계정과 상호 작용해 보세요. 이 계정을 사용하려면 해당 계정에 대한 전체 액세스 키를 로컬에 저장하는 CLI를 통해 "로그인"해야 합니다. [`near login`](/tools/near-cli#near-로그인)은 이 작업을 수행하는 명령이지만, 현재 `localnet`에 있기 때문에 작업을 진행하는 동안 `near`를 `localnet`으로 바꿔야 합니다.

```bash
local_near login
```

이렇게 하면 로컬 지갑 사이트가 시작되고 이 작업에 대한 확인을 요청할 것입니다. 권한을 부여하면 터미널에 다음과 유사한 확인 메시지가 표시됩니다.

```bash
Logged in as [ kevin.test.near ] with public key [ ed25519:8EaALn... ] successfully
```

- 다음을 실행하여 계정 ID를 환경 변수로 내보냅니다. (YOUR_ACCOUNT_ID 교체)

```bash
export ACCOUNT_ID=YOUR_ACCOUNT_ID
```

- 이제 루트 계정 `test.near`에 1 $NEAR를 전송하여 테스트 트랜잭션을 생성합니다.

```bash
local_near send $ACCOUNT_ID test.near 1
```

<details>
<summary>응답 예시: </summary>
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

### 로컬 NEAR 익스플로러

다시 말하지만, 이제 [모든 설정이 완료](#설정)되었으므로 [마지막 섹션](#로컬-near-지갑)의 끝에서 방금 수행한 명령의 트랜잭션 세부 정보를 볼 수 있습니다. 터미널 로그의 마지막 줄에는 로컬 NEAR 탐색기의 트랜잭션 세부 정보에 대한 링크가 표시됩니다.

```bash
Sending 1 NEAR to test.near from kevin.test.near
Loaded master account test.near key from /Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json with public key = ed25519:3Kuyi2DUXdoHgoaNEvCxa1m6G8xqc6Xs7WGajaqLhNmW
Transaction Id 3e3H5zqj9noKGYTCMqeZ5pb4NWK7tQsjYKak6ybtpgvD
To see the transaction in the transaction explorer, please open this url in your browser
http://127.0.0.1:8331/transactions/3e3H5zqj9noKGYTCMqeZ5pb4NWK7tQsjYKak6ybtpgvD
```

- 이 링크를 클릭하거나 브라우저에 복사/붙여넣기하세요.

![1 NEAR를 보내는 로컬 익스플로러](/docs/assets/kurtosis/local-explorer-send-funds.png)

여기에서는 로컬 NEAR 블록체인에서 데이터를 검색한다는 점을 제외하면 모든 것이 `testnet` 또는 `mainnet` NEAR 익스플로러와 똑같이 작동합니다!

- If you ever need to open your local NEAR Explorer, you can always visit 127.0.0.1:8331 or run:

```bash
echo $NEAR_EXPLORER_URL
```

**응답 예시:**

```bash
http://127.0.0.1:8331
```

![Localnet 익스플로러](/docs/assets/kurtosis/localnet-explorer.png)

---

## 스마트 컨트랙트 배포

모든 설정과 `test.near` 계정 생성이 완료되면, `localnet`에 스마트 컨트랙트를 배포할 차례입니다. 이 예제에서는 [이 NFT 예시](https://github.com/near-examples/nft-tutorial.git)에서 미리 컴파일된 WASM 스마트 컨트랙트를 통해 NFT를 배포합니다.

- 스마트 컨트랙트를 다운로드하세요:

```
curl -o ~/main.wasm https://github.com/near-examples/nft-tutorial/raw/main/out/main.wasm -L
```

- 스마트 컨트랙트를 배포하세요:

```
local_near deploy --wasmFile ~/main.wasm --accountId $ACCOUNT_ID
```

<details>
<summary>응답 예시: </summary>
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

- 익스플로러의 링크를 클릭해서 컨트랙트가 배포되었는지 확인하세요.

![Local explorer contract deployed](/docs/assets/kurtosis/local-explorer-contract-deployed.png)

이제, 배포된 컨트랙트와 상호 작용해보겠습니다.

- 먼저 다음 명령을 실행하여 컨트랙트를 초기화합니다.

```bash
local_near call $ACCOUNT_ID new_default_meta '{"owner_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID
```

이렇게 하면 일부 기본 메타데이터로 컨트랙트가 초기화되고, 계정 ID가 컨트랙트 소유자로 설정됩니다.

- 이제 첫 번째 NFT를 만드세요!

```bash
local_near call $ACCOUNT_ID nft_mint '{"token_id": "team_token", "metadata": { "title": "Go Team!", "description": "Go Team!", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif", "copies": 1}, "receiver_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID --amount 0.1
```

NFT가 발행되면 로컬 지갑의 수집품 탭에서 토큰을 볼 수 있습니다. 지갑 사이트가 이미 열려 있다면 새로고침하세요. 아니면 로컬 NEAR 지갑 인스턴스를 열어서 수집품을 볼 수도 있습니다.

![로컬 지갑 수집품 탭](/docs/assets/kurtosis/local-wallet-collectibles-tab.png)

어떤 NFT인지 스포일러는 하지 않겠습니다. 수집품 탭으로 가서 아름다운 토큰을 확인하세요!

---

## `localnet`에 dApp 연결

로컬에서 탈중앙화 애플리케이션을 개발할 수 있는 능력은 dApp 개발자의 꿈이 실현된 것이며, Kurtosis NEAR 패키지는 이 프로세스를 실제로 단순화합니다. 여기에서는 `near.dev`의 예제를 활용하여 `localnet`에 통합하는 작업을 할 것입니다.

### dApp 예제 복사

- Clone the [NEAR Guestbook](https://github.com/near-examples/guest-book-examples) repository:

```bash
git clone https://github.com/near-examples/guest-book-examples.git
```

### 네트워크 구성

- 레퍼지토리 내에서 `src/config.js` 파일을 열고, `local` 구성까지 아래로 스크롤합니다.

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

여기에서 `contractName`을 **제외한** 모든 값을 업데이트해야 합니다. 다음을 `local` 케이스에 복사하세요. 환경 변수를 지정한 경우 환경 변수에 구성이 자동으로 할당됩니다. 이렇게 하면 새 엔클레이브를 실행할 때 아무 것도 변경할 필요가 없습니다.

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

마지막으로 해야 할 일은 터미널에서 `NODE_ENV`를 `local`로 설정해서, 위에서 구성한 값을 dApp이 사용할 수 있도록 하는 것입니다.

- 실행:

```bash
export NODE_ENV=local
```

**dApp이 이제 `localnet`을 사용할 수 있도록 구성 완료되었습니다!** 🎉

### 컨트랙트 계정 생성

앞에서 언급했듯이, 이전에 업데이트한 `config.js` 파일 내 `contractname`은 변경할 필요 없습니다. 이는 지금 구성할 환경 변수입니다. 방명록 컨트랙트를 배포하기 위해 [이전에 생성한 계정](#로컬-near-지갑)에서 빠르게 하위 계정을 생성해 보겠습니다.

- `local_near CLI`를 사용해, 다음 명령을 실행하세요.

```bash
local_near create-account guest-book.$ACCOUNT_ID --masterAccount $ACCOUNT_ID --initialBalance 5
```

**응답 예시:**

```bash
Loaded master account test.near key from /Users/benjaminkurrek/.neartosis/2021-12-02T13.37.41/validator-key.json with public key = ed25519:AnLHi4ZAxfxFAQSXniycyZS6dpBqxhmVZH3zBCZbqAS6
Saving key to 'undefined/localnet/guest-book.goteam.test.near.json'
Account guest-book.goteam.test.near for network "localnet" was created.
```

- 방금 만든 계정으로 환경 변수 `CONTRACT_NAME`을 내보냅니다.

```bash
export CONTRACT_NAME=guest-book.$ACCOUNT_ID
```

### `localnet`에 컨트랙트 배포

네트워크 설정 및 컨트랙트 계정이 생성되면 이제 dApp을 시작할 준비가 되었습니다!

- 방명록 레퍼지토리의 루트 디렉터리에서 다음 명령을 실행합니다.

```bash
yarn && yarn start
```

**응답 예시:**

![로컬 dApp 빌드](/docs/assets/kurtosis/local-dapp-build.png)

- 터미널에서 서버 주소를 클릭하여 dApp을 엽니다.

```bash
Server running at http://localhost:1234
✨  Built in 1.20s.
```

방명록 랜딩 페이지가 보일 것입니다.

![Local Guest Book Landing Page](/docs/assets/kurtosis/local-guest-book-landing.png)

:::tip

로그인하는 데 문제가 있으면 브라우저의 로컬 스토리지를 비워보세요. 브라우저에 `testnet` 계정으로 로그인하기 전에 방명록을 사용한 경우, `localnet`에서 해당 계정을 찾을 수 없다는 오류가 표시됩니다.

:::

로그인하면 기부 메시지에 서명할 수도 있습니다.

![Local Guest Book Signed Message](/docs/assets/kurtosis/local-guest-book-signed-message.png)

- `localnet`에 트랜잭션을 생성할 방명록에 서명하세요.

- 완료되면, 로컬 NEAR 익스플로러를 열고 방금 생성한 트랜잭션을 볼 수 있습니다!

![Local Explorer Signed Transaction](/docs/assets/kurtosis/local-explorer-signed-transaction.png)

**축하드립니다! 로컬 NEAR 블록체인에 dApp을 성공적으로 배포하고 상호작용하였습니다!** 🎉

---

## NEAR 패키지 관리

생성한 Kurtosis NEAR 패키지는 Docker 엔진이 실행되는 동안 로컬 시스템에서 계속 실행됩니다. 이 패키지는 컴퓨터와 다른 enclave 모두에서 격리된 환경인 Kurtosis "엔클레이브" 내부에서 실행됩니다. 실제로 [설정 지침](#설정)에서 실행한 스크립트를 다시 실행하기만 하면 여러 개의 독립적인 로컬 NEAR 클러스터를 컴퓨터에서 실행할 수 있습니다.

### 패키지 상태 조회

- 기존 엔클레이브의 상태를 보려면 다음을 실행합니다.

```bash
kurtosis enclave ls
```

### 패키지 세부 사항 확인

- 엔클레이브에 대한 자세한 정보를 보려면, 엔클레이브 ID를 복사하고 다음을 실행합니다.

```bash
kurtosis enclave inspect near
```

### 패키지 종료

- NEAR 패키지를 종료하고 시스템에서 리소스를 확보하려면, 다음을 실행하세요.

```bash
kurtosis enclave stop near
```

:::note

클러스터를 다시 시작할 수 없나요? 필요한 경우, 여기에 [문제를 제출](https://github.com/kurtosis-tech/kurtosis-cli-release-artifacts)하세요. 우선적으로 처리해드리겠습니다.

:::

### 패키지 삭제

- 엔클레이브를 중지하면, 필요한 경우 검사할 수 있도록 리소스가 그대로 유지됩니다. 중지된 엔클레이브를 제거하고 리소스를 확보하려면 다음을 실행합니다.

```
kurtosis clean
```

### 모든 패키지 삭제

실행 여부에 관계없이 _모든_ 엔클레이브를 파괴하려면 다음과 같이 `-a` 플래그를 전달하여 다음과 같이 `clean`을 실행하세요.

```
kurtosis clean -a
```

이것은 모든 Kurtosis 데이터를 지우는 편리한 방법이 될 수 있습니다.
