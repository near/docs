---
id: contract
title: SocialDB
sidebar_label: SocialDB
---

> SocialDB is a smart contract to store social data on NEAR protocol.

- Source code: https://github.com/NearSocial/social-db
- API: https://github.com/NearSocial/social-db#api
- Testnet account ID: [`v1.social08.testnet`](https://explorer.testnet.near.org/accounts/v1.social08.testnet)
- Mainnet account ID: [`social.near`](https://explorer.near.org/accounts/social.near)

### Get API

Takes a list of keys and returns a joined JSON object with the matched data.

```rust
pub fn get(self, keys: Vec<String>) -> Value;
```

- `keys` - an array of key patterns to return.

Returns the aggregated JSON object.

##### Reading a profile of account `self.social.near`

To read all fields recursively for a given path add `**` suffix.

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


##### Reading names of all account with profiles

_Note that this query iterates over all accounts and will not fit into the available view call gas in the future._

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

### Keys API

Takes a list of keys and returns a joined JSON object with the keys matched the query.

```rust
pub fn keys(self, keys: Vec<String>) -> Value;
```

- `keys` - an array of key patterns to return.

Returns the aggregated JSON object.

##### Getting a list of components of accounts `root.near`

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

##### Getting a list of accounts that have components

```bash
env NEAR_ENV=mainnet near view social.near keys '{"keys":["*/widget"]}'
```

_Note that this query iterates over all accounts and will not fit into the available view call gas in the future._

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

