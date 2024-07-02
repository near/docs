---
title: NEAR Enhanced API
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- Generator: Widdershins v4.0.1 -->

:::warning

Please be advised that these tools and services will be discontinued soon.

:::

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Try out our newly released Enhanced APIs - Balances (in Beta) and get what you need for all kinds of balances and token information at ease.
Call Enhanced APIs using the endpoint in the API URL box, varies by Network.

- https://near-testnet.api.pagoda.co/eapi/v1
- https://near-mainnet.api.pagoda.co/eapi/v1

Grab your API keys and give it a try! We will be adding more advanced Enhanced APIs in our offering, so stay tuned. Get the data you need without extra processing, NEAR Blockchain data query has never been easier!

We would love to hear from you on the data APIs you need, please leave feedback using the widget in the lower-right corner.

Base URLs:

* <a href="https://near-testnet.api.pagoda.co/eapi/v1" target="_blank" rel="noopener noreferrer">https://near-testnet.api.pagoda.co/eapi/v1</a>

## Authentication

* API Key (apiKey)
    - Parameter Name: **x-api-key**, in: header. Use Pagoda DevConsole API key here

## Non Fungible Tokens

### Get NFT

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id} \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id} HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /NFT/{contract_account_id}/{token_id}`

*Get NFT*

This endpoint returns detailed information on the NFT
 for the given `token_id`, NFT `contract_id`, `timestamp`/`block_height`.

<h3 id="get__nft_{contract_account_id}_{token_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|contract_account_id|path|string|true|none|
|token_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "contract_metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  },
  "nft": {
    "metadata": {
      "copies": 0,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}
```

<h3 id="get__nft_{contract_account_id}_{token_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[NftResponse](#schemanftresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get NFT history

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/NFT/{contract_account_id}/{token_id}/history", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /NFT/{contract_account_id}/{token_id}/history`

*Get NFT history*

This endpoint returns the transaction history for the given NFT and `timestamp`/`block_height`.
 **Note:** The result is centered around the history of the specific NFT and will return list of its passing owners and metadata.

 **Limitations**
 * For now, we only support NFT contracts that implement the Events NEP standard.
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided in later phases.

<h3 id="get__nft_{contract_account_id}_{token_id}_history-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|contract_account_id|path|string|true|none|
|token_id|path|string|true|none|
|limit|query|integer(int32)|false|none|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "history": [
    {
      "block_height": "string",
      "block_timestamp_nanos": "string",
      "cause": "string",
      "new_account_id": "string",
      "old_account_id": "string",
      "status": "string"
    }
  ],
  "nft": {
    "metadata": {
      "copies": 0,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}
```

<h3 id="get__nft_{contract_account_id}_{token_id}_history-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[HistoryResponse](#schemahistoryresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get user's NFT collection overview

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/NFT`

*Get user's NFT collection overview*

For the given `account_id` and `timestamp` or `block_height`, this endpoint returns
 the number of NFTs grouped by `contract_id`, together with the corresponding NFT contract metadata.
 The NFT contract will be present in the response if the `account_id` has at least one NFT there.

 **Note:** `block_timestamp_nanos` helps you choose a moment in time, fixing the blockchain state at that time.

 **Limitations**
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided in later phases.

<h3 id="get__accounts_{account_id}_nft-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|
|limit|query|integer(int32)|false|Maximum available limit 100|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "nft_counts": [
    {
      "contract_account_id": "string",
      "contract_metadata": {
        "base_uri": "string",
        "icon": "string",
        "name": "string",
        "reference": "string",
        "reference_hash": "string",
        "spec": "string",
        "symbol": "string"
      },
      "last_updated_at_timestamp_nanos": "string",
      "nft_count": 0
    }
  ]
}
```

<h3 id="get__accounts_{account_id}_nft-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[NftCountsResponse](#schemanftcountsresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get user's NFT collection by contract

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id} \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id} HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id}', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/NFT/{contract_account_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/NFT/{contract_account_id}`

*Get user's NFT collection by contract*

This endpoint returns the list of NFTs with full details for the given `account_id`, NFT `contract_id`, `timestamp`/`block_height`.
 You can use the `token_id` from this response and then request the NFT history for that token.

 **Limitations**
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided in later phases.

<h3 id="get__accounts_{account_id}_nft_{contract_account_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|contract_account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|
|limit|query|integer(int32)|false|Maximum available limit 100|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "contract_metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  },
  "nfts": [
    {
      "metadata": {
        "copies": 0,
        "description": "string",
        "extra": "string",
        "media": "string",
        "media_hash": "string",
        "reference": "string",
        "reference_hash": "string",
        "title": "string"
      },
      "owner_account_id": "string",
      "token_id": "string"
    }
  ]
}
```

<h3 id="get__accounts_{account_id}_nft_{contract_account_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[NftsResponse](#schemanftsresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get NFT contract metadata

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id} \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id} HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id}', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/{contract_account_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /nep171/metadata/{contract_account_id}`

*Get NFT contract metadata*

This endpoint returns the metadata for a given NFT contract and `timestamp`/`block_height`.
 **Note:** This is contract-wide metadata. Each NFT also has its own metadata.

<h3 id="get__nep171_metadata_{contract_account_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|contract_account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  }
}
```

<h3 id="get__nep171_metadata_{contract_account_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[MetadataResponse](#schemametadataresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

---

## NEAR

### Get user's NEAR balance

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/coins/NEAR`

*Get user's NEAR balance*

This endpoint returns the NEAR balance of the given `account_id`
 at the given `timestamp`/`block_height`.

<h3 id="get__accounts_{account_id}_coins_near-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "balance": "string",
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "decimals": 0,
    "icon": "string",
    "name": "string",
    "symbol": "string"
  }
}
```

<h3 id="get__accounts_{account_id}_coins_near-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[NearBalanceResponse](#schemanearbalanceresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get user's NEAR history

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/NEAR/history", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/coins/NEAR/history`

*Get user's NEAR history*

This endpoint returns the history of operations with NEAR coins
 for the given `account_id`, `timestamp`/`block_height`.

 **Limitations**
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided in an upcoming update.

<h3 id="get__accounts_{account_id}_coins_near_history-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|limit|query|integer(int32)|false|none|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "history": [
    {
      "block_height": "string",
      "block_timestamp_nanos": "string",
      "cause": "string",
      "new_account_id": "string",
      "old_account_id": "string",
      "status": "string"
    }
  ],
  "nft": {
    "metadata": {
      "copies": 0,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}
```

<h3 id="get__accounts_{account_id}_coins_near_history-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[HistoryResponse](#schemahistoryresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

---

## Fungible Tokens

### Get user's coin balances

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/coins`

*Get user's coin balances*

This endpoint returns all the countable coin balances (including NEAR, fungible tokens, and _multi-tokens_)
 of the given `account_id`, at the given `timestamp`/`block_height`.

 **Limitations**
 * For now, we only support the balance for NEAR and FT contracts that implement the Events NEP standard.
   We are working on a solution to support other FT contracts, including `wrap.near` and bridged tokens.
 * We are in the process of supporting Multi Token balances.
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided in an upcoming update.

<h3 id="get__accounts_{account_id}_coins-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|
|limit|query|integer(int32)|false|Maximum available limit 100|

> Example responses

> 200 Response

```json
{
  "balances": [
    {
      "balance": "string",
      "contract_account_id": "string",
      "metadata": {
        "decimals": 0,
        "icon": "string",
        "name": "string",
        "symbol": "string"
      },
      "standard": "string"
    }
  ],
  "block_height": "string",
  "block_timestamp_nanos": "string"
}
```

<h3 id="get__accounts_{account_id}_coins-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[CoinBalancesResponse](#schemacoinbalancesresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get user's coin balances by contract

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id} \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id} HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/coins/{contract_account_id}`

*Get user's coin balances by contract*

This endpoint returns all the countable coin balances of the given `account_id`,
 for the given contract and `timestamp`/`block_height`.
 For FT contracts, the response has only 1 item in the list.
 For MT contracts, there could be several balances (MT support is still under development).

 **Limitations**
 * For now, we support only the balance for FT contracts that implement the Events NEP standard.
   We are working on a solution to support other FT contracts, including `wrap.near` and bridged tokens.
 * We are in the process of supporting Multi Token balances.

<h3 id="get__accounts_{account_id}_coins_{contract_account_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|contract_account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "balances": [
    {
      "balance": "string",
      "contract_account_id": "string",
      "metadata": {
        "decimals": 0,
        "icon": "string",
        "name": "string",
        "symbol": "string"
      },
      "standard": "string"
    }
  ],
  "block_height": "string",
  "block_timestamp_nanos": "string"
}
```

<h3 id="get__accounts_{account_id}_coins_{contract_account_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[CoinBalancesResponse](#schemacoinbalancesresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get user's coin history by contract

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/accounts/{account_id}/coins/{contract_account_id}/history", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /accounts/{account_id}/coins/{contract_account_id}/history`

*Get user's coin history by contract*

This endpoint returns the history of coin operations (FT, other standards)
 for the given `account_id`, `contract_id`, `timestamp`/`block_height`.

 **Limitations**
 * For now, we support only FT contracts that implement the Events NEP standard.
   We are working on a solution to support other FT contracts, including `wrap.near` and bridged tokens.
 * We are in the process of supporting Multi Token history.
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided in an upcoming update.

<h3 id="get__accounts_{account_id}_coins_{contract_account_id}_history-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|account_id|path|string|true|none|
|contract_account_id|path|string|true|none|
|limit|query|integer(int32)|false|none|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "history": [
    {
      "block_height": "string",
      "block_timestamp_nanos": "string",
      "cause": "string",
      "new_account_id": "string",
      "old_account_id": "string",
      "status": "string"
    }
  ],
  "nft": {
    "metadata": {
      "copies": 0,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}
```

<h3 id="get__accounts_{account_id}_coins_{contract_account_id}_history-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[HistoryResponse](#schemahistoryresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

### Get FT contract metadata

> Code samples

<Tabs>
<TabItem value="Shell">

```shell
# You can also use wget
curl -X GET https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id} \
  -H 'Accept: application/json' \
  -H 'x-api-key: API_KEY'

```

</TabItem>

<TabItem value="HTTP">

```http
GET https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id} HTTP/1.1
Host: near-testnet.api.pagoda.co
Accept: application/json

```

</TabItem>

<TabItem value="JS">

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'API_KEY'
};

fetch('https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>

<TabItem value="Ruby">

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'x-api-key' => 'API_KEY'
}

result = RestClient.get 'https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>

<TabItem value="Python">

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'API_KEY'
}

r = requests.get('https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id}', headers = headers)

print(r.json())

```

</TabItem>

<TabItem value="PHP">

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'x-api-key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>

<TabItem value="Java">

```java
URL obj = new URL("https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

</TabItem>

<TabItem value="Go">


```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "x-api-key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://near-testnet.api.pagoda.co/eapi/v1/nep141/metadata/{contract_account_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

</TabItem>

</Tabs>


`GET /nep141/metadata/{contract_account_id}`

*Get FT contract metadata*

This endpoint returns the metadata for a given FT contract and `timestamp`/`block_height`.

 **Limitations**
 * For now, we support only FT contracts that implement the Events NEP standard.
   We are working on a solution to support other FT contracts, including `wrap.near` and bridged tokens.

<h3 id="get__nep141_metadata_{contract_account_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|contract_account_id|path|string|true|none|
|block_height|query|string|false|none|
|block_timestamp_nanos|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "decimals": 0,
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  }
}
```

<h3 id="get__nep141_metadata_{contract_account_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[FtContractMetadataResponse](#schemaftcontractmetadataresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|See the inner `code` value to get more details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>

---

## Schemas

### CoinBalancesResponse
<!-- backwards compatibility -->
<a id="schemacoinbalancesresponse"></a>
<a id="schema_CoinBalancesResponse"></a>
<a id="tocScoinbalancesresponse"></a>
<a id="tocscoinbalancesresponse"></a>

```json
{
  "balances": [
    {
      "balance": "string",
      "contract_account_id": "string",
      "metadata": {
        "decimals": 0,
        "icon": "string",
        "name": "string",
        "symbol": "string"
      },
      "standard": "string"
    }
  ],
  "block_height": "string",
  "block_timestamp_nanos": "string"
}

```

This response gives the information about all the available balances for the user.
 The answer gives the list of NEAR, FT balances, could be used for Multi Tokens.
 For MTs and other standards, balances could have multiple entries for one contract.

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|balances|[object]|true|none|none|
|» balance|string|true|none|none|
|» contract_account_id|string|false|none|null for NEAR, not null otherwise|
|» metadata|object|true|none|This type describes general Metadata info, collecting the most important fields from different standards in the one format.<br /> `decimals` may contain `0` if it's not applicable (e.g. if it's general MT metadata)|
|»» decimals|integer(int32)|true|none|none|
|»» icon|string|false|none|none|
|»» name|string|true|none|none|
|»» symbol|string|true|none|none|
|» standard|string|true|none|"nearprotocol" for NEAR, "nep141" for FT|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|

### FtContractMetadataResponse
<!-- backwards compatibility -->
<a id="schemaftcontractmetadataresponse"></a>
<a id="schema_FtContractMetadataResponse"></a>
<a id="tocSftcontractmetadataresponse"></a>
<a id="tocsftcontractmetadataresponse"></a>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "decimals": 0,
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  }
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|metadata|object|true|none|The type for FT Contract Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/FungibleToken/Metadata|
|» decimals|integer(int32)|true|none|none|
|» icon|string|false|none|none|
|» name|string|true|none|none|
|» reference|string|false|none|none|
|» reference_hash|string|false|none|none|
|» spec|string|true|none|none|
|» symbol|string|true|none|none|

### HistoryResponse
<!-- backwards compatibility -->
<a id="schemahistoryresponse"></a>
<a id="schema_HistoryResponse"></a>
<a id="tocShistoryresponse"></a>
<a id="tocshistoryresponse"></a>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "history": [
    {
      "block_height": "string",
      "block_timestamp_nanos": "string",
      "cause": "string",
      "new_account_id": "string",
      "old_account_id": "string",
      "status": "string"
    }
  ],
  "nft": {
    "metadata": {
      "copies": 0,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|history|[object]|true|none|none|
|» block_height|string|true|none|none|
|» block_timestamp_nanos|string|true|none|none|
|» cause|string|true|none|none|
|» new_account_id|string|false|none|none|
|» old_account_id|string|false|none|none|
|» status|string|true|none|none|
|nft|object|true|none|The type for Non Fungible Token. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|» metadata|object|true|none|The type for Non Fungible Token Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|»» copies|integer(int64)|false|none|none|
|»» description|string|false|none|none|
|»» extra|string|false|none|none|
|»» media|string|false|none|none|
|»» media_hash|string|false|none|none|
|»» reference|string|false|none|none|
|»» reference_hash|string|false|none|none|
|»» title|string|false|none|none|
|» owner_account_id|string|true|none|none|
|» token_id|string|true|none|none|

### MetadataResponse
<!-- backwards compatibility -->
<a id="schemametadataresponse"></a>
<a id="schema_MetadataResponse"></a>
<a id="tocSmetadataresponse"></a>
<a id="tocsmetadataresponse"></a>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  }
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|metadata|object|true|none|The type for Non Fungible Token Contract Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|» base_uri|string|false|none|none|
|» icon|string|false|none|none|
|» name|string|true|none|none|
|» reference|string|false|none|none|
|» reference_hash|string|false|none|none|
|» spec|string|true|none|none|
|» symbol|string|true|none|none|

### NearBalanceResponse
<!-- backwards compatibility -->
<a id="schemanearbalanceresponse"></a>
<a id="schema_NearBalanceResponse"></a>
<a id="tocSnearbalanceresponse"></a>
<a id="tocsnearbalanceresponse"></a>

```json
{
  "balance": "string",
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "decimals": 0,
    "icon": "string",
    "name": "string",
    "symbol": "string"
  }
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|balance|string|true|none|Sum of staked and nonstaked balances|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|metadata|object|true|none|This type describes general Metadata info, collecting the most important fields from different standards in the one format.<br /> `decimals` may contain `0` if it's not applicable (e.g. if it's general MT metadata)|
|» decimals|integer(int32)|true|none|none|
|» icon|string|false|none|none|
|» name|string|true|none|none|
|» symbol|string|true|none|none|

### NftCountsResponse
<!-- backwards compatibility -->
<a id="schemanftcountsresponse"></a>
<a id="schema_NftCountsResponse"></a>
<a id="tocSnftcountsresponse"></a>
<a id="tocsnftcountsresponse"></a>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "nft_counts": [
    {
      "contract_account_id": "string",
      "contract_metadata": {
        "base_uri": "string",
        "icon": "string",
        "name": "string",
        "reference": "string",
        "reference_hash": "string",
        "spec": "string",
        "symbol": "string"
      },
      "last_updated_at_timestamp_nanos": "string",
      "nft_count": 0
    }
  ]
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|nft_counts|[object]|true|none|none|
|» contract_account_id|string|true|none|none|
|» contract_metadata|object|true|none|The type for Non Fungible Token Contract Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|»» base_uri|string|false|none|none|
|»» icon|string|false|none|none|
|»» name|string|true|none|none|
|»» reference|string|false|none|none|
|»» reference_hash|string|false|none|none|
|»» spec|string|true|none|none|
|»» symbol|string|true|none|none|
|» last_updated_at_timestamp_nanos|string|true|none|none|
|» nft_count|integer(int32)|true|none|none|

### NftResponse
<!-- backwards compatibility -->
<a id="schemanftresponse"></a>
<a id="schema_NftResponse"></a>
<a id="tocSnftresponse"></a>
<a id="tocsnftresponse"></a>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "contract_metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  },
  "nft": {
    "metadata": {
      "copies": 0,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|contract_metadata|object|true|none|The type for Non Fungible Token Contract Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|» base_uri|string|false|none|none|
|» icon|string|false|none|none|
|» name|string|true|none|none|
|» reference|string|false|none|none|
|» reference_hash|string|false|none|none|
|» spec|string|true|none|none|
|» symbol|string|true|none|none|
|nft|object|true|none|The type for Non Fungible Token. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|» metadata|object|true|none|The type for Non Fungible Token Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|»» copies|integer(int64)|false|none|none|
|»» description|string|false|none|none|
|»» extra|string|false|none|none|
|»» media|string|false|none|none|
|»» media_hash|string|false|none|none|
|»» reference|string|false|none|none|
|»» reference_hash|string|false|none|none|
|»» title|string|false|none|none|
|» owner_account_id|string|true|none|none|
|» token_id|string|true|none|none|

### NftsResponse
<!-- backwards compatibility -->
<a id="schemanftsresponse"></a>
<a id="schema_NftsResponse"></a>
<a id="tocSnftsresponse"></a>
<a id="tocsnftsresponse"></a>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "contract_metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  },
  "nfts": [
    {
      "metadata": {
        "copies": 0,
        "description": "string",
        "extra": "string",
        "media": "string",
        "media_hash": "string",
        "reference": "string",
        "reference_hash": "string",
        "title": "string"
      },
      "owner_account_id": "string",
      "token_id": "string"
    }
  ]
}

```

##### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|block_height|string|true|none|none|
|block_timestamp_nanos|string|true|none|none|
|contract_metadata|object|true|none|The type for Non Fungible Token Contract Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|» base_uri|string|false|none|none|
|» icon|string|false|none|none|
|» name|string|true|none|none|
|» reference|string|false|none|none|
|» reference_hash|string|false|none|none|
|» spec|string|true|none|none|
|» symbol|string|true|none|none|
|nfts|[object]|true|none|none|
|» metadata|object|true|none|The type for Non Fungible Token Metadata. Inspired by<br /> https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata|
|»» copies|integer(int64)|false|none|none|
|»» description|string|false|none|none|
|»» extra|string|false|none|none|
|»» media|string|false|none|none|
|»» media_hash|string|false|none|none|
|»» reference|string|false|none|none|
|»» reference_hash|string|false|none|none|
|»» title|string|false|none|none|
|» owner_account_id|string|true|none|none|
|» token_id|string|true|none|none|

