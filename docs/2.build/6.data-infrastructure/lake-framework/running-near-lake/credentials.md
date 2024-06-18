---
sidebar_label: "Credentials"
---

# Credentials

To access the data provided by [NEAR Lake](../near-lake.md) you need to provide valid AWS credentials in order to be charged by the AWS for the S3 usage.

:::info AWS credentials

Please note that using your own AWS Credentials is the only way to access the data provided by [NEAR Lake](../near-lake.md) ecosystem.

:::

### AWS S3 Credentials

To be able to get objects from the AWS S3 bucket you need to provide your AWS credentials.

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

#### Environment varibales

Alternatively, you can provide your AWS credentials via environment variables with constant names:

```
$ export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
$ AWS_SECRET_ACCESS_KEY=<YOUR_AWS_ACCESS_KEY>
$ AWS_DEFAULT_REGION=eu-central-1
```
