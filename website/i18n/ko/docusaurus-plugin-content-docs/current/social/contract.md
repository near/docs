---
id: contract
title: SocialDB
sidebar_label: SocialDB
---

> SocialDB는 NEAR 프로토콜에서 소셜 데이터를 저장하기 위한 스마트 컨트랙트입니다.

- 소스 코드: https://github.com/NearSocial/social-db
- API: https://github.com/NearSocial/social-db#api
- 테스트넷 계정 ID: [`v1.social08.testnet`](https://explorer.testnet.near.org/accounts/v1.social08.testnet)
- Mainnet account ID: [`social.near`](https://nearblocks.io/address/social.near)

### API 가져오기

키 목록을 가져오고 일치하는 데이터가 있는 JSON 객체를 반환합니다.

```rust
pub fn get(self, keys: Vec<String>) -> Value;
```

- `keys` - 반환할 키 패턴 배열

합쳐진 JSON 객체를 반환합니다.

##### 계정 `self.social.near`의 프로필 읽기

지정된 경로에 대해 모든 필드를 재귀적으로 읽으려면 `**` 접미사를 추가합니다.

```bash
env NEAR_ENV=mainnet near view social.near get '{"keys":["self.social.near/profile/**"]}'
```

```json
{
  "self.social.near": {
    "profile": {
      "name": "Near Social",
      "image": {
        "ipfs_cid": "bafkreiej5new6k7bzlaaapuc7fgjlwaoqqw2qgzvilbmdankmfxw7siw6q"
      },
      "linktree": {
        "twitter": "NearSocial_",
        "github": "NearSocial",
        "telegram": "NearSocial",
        "website": "near.social"
      }
    }
  }
}
```


##### 프로필이 있는 모든 계정의 이름 읽기

_이 쿼리는 모든 계정에서 반복되며 이후에는 사용 가능한 view 호출 가스에 포함되지 않습니다._

```bash
env NEAR_ENV=mainnet near view social.near get '{"keys":["*/profile/name"]}'
```

```json
{
  "mob.near": {
    "profile": {
      "name": "Eugene The Dream"
    }
  },
  "nearcondemo.near": {
    "profile": {
      "name": "Very Berry Demo Acc"
    }
  },
  "zavodil.near": {
    "profile": {
      "name": "Vadim"
    }
  },

  ................................

  "kuzu.near": {
    "profile": {
      "name": "Joinairdrops"
    }
  },
  "goldich.near": {
    "profile": {
      "name": "MAG"
    }
  }
}
```

### 키 API

키 목록을 가져오고, 쿼리와 일치하는 키가 있는 JSON 객체를 반환합니다.

```rust
pub fn keys(self, keys: Vec<String>) -> Value;
```

- `keys` - 반환할 키 패턴 배열

합쳐진 JSON 객체를 반환합니다.

##### 계정 `root.near`의 구성요소 목록 가져오기

```bash
env NEAR_ENV=mainnet near view social.near keys '{"keys":["root.near/widget/*"]}'
```

```json
{
  "root.near": {
    "widget": {
      "AllProfilesWithGithub": true,
      "Egg": true,
      "TotalAccountsCount": true
    }
  }
}
```

##### 구성요소를 가진 모든 계정 목록 가져오기

```bash
env NEAR_ENV=mainnet near view social.near keys '{"keys":["*/widget"]}'
```

_이 쿼리는 모든 계정에서 반복되며 이후에는 사용 가능한 view 호출 가스에 포함되지 않습니다._

```json
{
  "mob.near": {
    "widget": true
  },
  "nearcondemo.near": {
    "widget": true
  },
  "zavodil.near": {
    "widget": true
  },

  ................................

  "elektromania.near": {
    "widget": true
  },
  "kn00t.near": {
    "widget": true
  }
}
```

