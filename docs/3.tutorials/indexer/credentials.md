---
sidebar_position: 100
---

# Credentials

:::info DevConsole

Please, keep in mind, currently using the AWS Credentials is the only way to access the data provided by [NEAR Lake](/docs/projects/near-lake-indexer) ecosystem. But it is about to change with Pagoda DevConsole release. Stay tuned!

:::

To access the data provided by [NEAR Lake](/docs/projects/near-lake-indexer) you need to provide valid AWS credentials in order to be charged by the AWS for the S3 usage.

### AWS S3 Credentials

To be able to get objects from the AWS S3 bucket you need to provide the AWS credentials.

AWS default profile configuration with aws configure looks similar to the following:

```
~/.aws/credentials
```

```
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

[AWS docs: Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
