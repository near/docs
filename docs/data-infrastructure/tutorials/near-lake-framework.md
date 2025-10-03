---
id: listen-function-calls
title: Intercept Function Calls
description: "This tutorial will guide you through building a simple indexer using the NEAR Lake Framework. The indexer will listen for FunctionCalls on a specific contract and log the details of each call."
---

import {Github} from "@site/src/components/UI/Codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

In this tutorial, we will build a simple indexer using the NEAR Lake Framework. The indexer will listen for FunctionCalls on a specific contract and log the details of each call.

The full source code for the indexer is available in the [GitHub repository](https://github.com/near-examples/indexer-near-lake-framework?tab=readme-ov-file).

:::info
Using NEAR Lake Framework, we can subscribe to the stream of blocks from the NEAR Lake data source. The source of data are JSON files stored in an AWS S3 bucket by [NEAR Lake Indexer](https://github.com/aurora-is-near/near-lake-indexer). The NEAR Lake Framework takes care of downloading and parsing the data for users, but **the reader is paying the costs**. More details about technical limitations and **estimating costs** can be found [here](../near-lake-framework.md#comparison-with-near-indexer-framework).
:::

---

## Initialization

### AWS Credentials

To access the data provided by [NEAR Lake](../lake-framework/near-lake) you need to provide valid AWS credentials in order to be charged by the AWS for the S3 usage.

:::info AWS credentials

Please note that using your own AWS Credentials is the only way to access the data provided by [NEAR Lake](../lake-framework/near-lake) ecosystem.

:::


AWS default profile configuration with aws configure looks similar to the following:

```
~/.aws/credentials
```

```
[default]
aws_access_key_id=<YOUR_AWS_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_AWS_ACCESS_KEY>
```

[AWS docs: Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

### Lake Configuration

To initialize the NEAR Lake Framework, we need to provide the following basic settings:

- The S3 bucket name: the bucket where the NEAR Lake data is stored. The value is `near-lake-data-testnet` for the testnet and `near-lake-data-mainnet` for the mainnet.
- The S3 region: The AWS region where the S3 bucket is located. The default value is `eu-central-1`.
- Start block height: The block height from which the indexer will start processing blocks.


<Tabs groupId="code-tabs">
    <TabItem value="rust" label="Rust" default>
      The Rust package provides a way to use the default configuration for testnet/mainnet and requires only to choose network and set the start block height which in the example we pass as command line argument. 

      <Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/rust/src/main.rs"
        start="23" end="31" />
    </TabItem>
    <TabItem value="js" label="JavaScript">
      In JavaScript/TypeScript, we will just create the configuration object manually. Block height is passed as a command line argument.

      <Github fname="index.ts" language="javascript"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/js/index.ts"
        start="5" end="14" />
    </TabItem>
    <TabItem value="python" label="Python" default>
      In Python, we will create the configuration object manually and then set `s3_bucket_name` and `s3_region_name` properties. Block height is passed as a command line argument. 

      <Github fname="main.py" language="python"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/python/main.py"
        start="11" end="27" />
    </TabItem>
</Tabs>

## Running the Indexer

To run the indexer, we need to create a function that will handle every message from the stream. In this function, we can access the block data and process it as needed.

<Tabs groupId="code-tabs">
    <TabItem value="rust" label="Rust" default>
      <Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/rust/src/main.rs"
        start="51" end="70" />
    </TabItem>
    <TabItem value="js" label="JavaScript">
      <Github fname="index.ts" language="javascript"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/js/index.ts"
        start="98" end="101" />
    </TabItem>
    <TabItem value="python" label="Python">
      <Github fname="main.py" language="python"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/python/main.py"
        start="39" end="47" />
    </TabItem>
</Tabs>

## Parsing the Block Data

From the block data, we can access the transactions, their receipts and actions. In this example, we will look for FunctionCall actions on a specific contract and log the details of each call.

<Tabs groupId="code-tabs">
    <TabItem value="rust" label="Rust" default>
      <Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/rust/src/main.rs"
        start="72" end="156" />
    </TabItem>
    <TabItem value="js" label="JavaScript">
      <Github fname="index.ts" language="javascript"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/js/index.ts"
        start="24" end="89" />
    </TabItem>
    <TabItem value="python" label="Python">
      <Github fname="main.py" language="python"
        url="https://github.com/near-examples/indexer-near-lake-framework/blob/main/python/main.py"
        start="50" end="96" />
    </TabItem>
</Tabs>

The example of logged data:
```bash
Block height: 214692896

Transaction hash HQsRK16ABEQWtKpHKWMbPgUreXCD95ZpKw47YkHxGsEc related to 6QpDUkd5n2xJ6mTjkdzXDbvMFo5mEzANS1t4Hfr76SAY executed with status "SuccessValue"
aha_6.testnet
{"contract_id":"3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX"}
```

<MovingForwardSupportSection />

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-lake-framework (Rust): `0.7.13`
- @near-lake/framework (JS): `0.1.5`
- near-lake-framework (Python): `0.1.3`
- rustc: `1.86.0`
- node: `22.18.0`
- python: `3.13.5`

:::