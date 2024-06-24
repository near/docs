---
sidebar_label: 자격 증명
---

# 자격 증명

To access the data provided by [NEAR Lake](../near-lake.md) you need to provide valid AWS credentials in order to be charged by the AWS for the S3 usage.

:::info AWS credentials

Please note that using your own AWS Credentials is the only way to access the data provided by [NEAR Lake](../near-lake.md) ecosystem.

:::

### AWS S3 자격 증명

To be able to get objects from the AWS S3 bucket you need to provide your AWS credentials.

aws configure를 사용한 AWS 기본 프로필 구성은 다음과 유사합니다.

```
~/.aws/credentials
```

```
[default]
aws_access_key_id=<YOUR_AWS_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_AWS_ACCESS_KEY>
```

[AWS 문서: 구성 및 자격 증명 파일 설정](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

#### 환경 변수

또는 정해진 이름이 있는 환경 변수를 통해 AWS 자격 증명을 제공할 수도 있습니다.

```
$ export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
$ AWS_SECRET_ACCESS_KEY=<YOUR_AWS_ACCESS_KEY>
$ AWS_DEFAULT_REGION=eu-central-1
```
