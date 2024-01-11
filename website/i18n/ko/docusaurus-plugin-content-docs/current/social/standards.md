---
id: standards
title: 표준
---

SocialDB의 데이터는 간단한 JSON 트리로 구성되어 있습니다. 유일하게 적용되는 규칙은 루트의 키가 데이터를 저장하는 계정 ID라는 것입니다. 이는 의도적으로 수행되므로, SocialDB 컨트랙트는 구조나 스키마를 적용하지 않습니다. 그렇지 않으면 스키마가 변경될 때마다 컨트랙트를 수정해야 합니다. 컨트랙트 스키마의 제어는 중앙 집중화 및 제한으로 이어질 수 있습니다. 대신 Near Social 표준은 SocialDB 컨트랙트 밖에 존재합니다.

현재, [Github의 표준](https://github.com/NearSocial/standards)는 표준의 기본 위치이지만, 미래에는 이 위치가 변경될 수 있습니다.

### 스키마 설명

- **`bold`**는 키가 필요함을 의미합니다.
- _`이탤릭체`_는 키가 선택 사항임을 의미합니다.
- `[account_id]`는 동적 키가 계정 ID임을 의미합니다. 예를 들어, `alex.near`를 키로 지정합니다. 일반적으로 이는 해당 계정에 대한 엣지를 생성하는 데 사용됩니다.

### 루트 스키마

각 계정은 **[루트 스키마](https://github.com/NearSocial/standards/blob/main/types/Root.md#root)**를 따라야 합니다.

