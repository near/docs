---
sidebar_label: "자격 증명"
---

# 자격 증명

:::info DevConsole

현재 AWS 자격 증명을 사용하는 것이 [NEAR Lake](/tools/realtime#near-lake-indexer) 생태계에서 제공하는 데이터에 액세스할 수 있는 유일한 방법임을 명심하세요. 그러나 Pagoda DevConsole 릴리스와 함께 변경될 예정입니다. 계속 지켜보세요!

:::

[NEAR Lake](/tools/realtime#near-lake-indexer)에서 제공하는 데이터에 액세스하려면 S3 사용에 대해 AWS에서 요금을 청구하기 위해 유효한 AWS 자격 증명을 제공해야 합니다.

### AWS S3 자격 증명

AWS S3 버킷에서 객체를 가져오려면 AWS 자격 증명을 제공해야 합니다.

aws configure를 사용한 AWS 기본 프로필 구성은 다음과 유사합니다.

```
~/.aws/credentials
```

```
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

[AWS 문서: 구성 및 자격 증명 파일 설정](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

#### 환경 변수

또는 정해진 이름이 있는 환경 변수를 통해 AWS 자격 증명을 제공할 수도 있습니다.

```
$ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
$ AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
$ AWS_DEFAULT_REGION=eu-central-1
```
