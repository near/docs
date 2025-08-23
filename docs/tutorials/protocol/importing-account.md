---
id: importing-account
title: Importing a NEAR Account
description: Learn how to import an existing NEAR account into a wallet or the CLI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you created a NEAR account using a wallet or the CLI, you can export its seed phrase (or private key) to use it in other wallets or tools. Let's cover how to:

1. [Exporting](#exporting-your-seed-phrase) an existing account
1. Import an existing account [into a wallet](#importing-into-a-wallet)
2. Import an existing account [into the CLI](#importing-into-the-cli)

---

## Exporting Your Seed Phrase

<Tabs>
    <TabItem value="Wallet">
        You can export your seed phrase from the wallet you used to create your account. Most wallets will have an option to "Export Seed Phrase" or "Backup Account". Follow the instructions provided by your specific wallet.
    </TabItem>
    <TabItem value="CLI">
        If you created your account using the CLI, you can export your seed phrase using the following command:
        
        ```bash
        near account export-account <account.testnet>
        ```
    </TabItem>
</Tabs>

---

## Importing Into a Wallet

To import an existing account into a wallet, follow the instructions provided by the specific wallet you are using. Most wallets will have an option to "Import Account" or "Restore from Seed Phrase"

---

## Importing Into the CLI

To import an existing account into the CLI, you can use the following command:

```bash
near account import-account
```

This command will prompt you to enter your seed phrase or private key. Once you enter it, the CLI will import your account and you can start using it.