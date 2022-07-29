---
id: transactions
title: Transactions
sidebar_label: Transactions
---

## API Reference (Transactions)

### Transaction

Below is the interface of a NEAR Transaction used by `signAndSendTransactions`:

```ts
interface Transaction {
  signerId: string;
  receiverId: string;
  actions: Array<Action>;
}
```

### Actions

Below are the 8 supported NEAR Actions used by `signAndSendTransaction` and `signAndSendTransactions`:

```ts
interface CreateAccountAction {
  type: "CreateAccount";
}

interface DeployContractAction {
  type: "DeployContract";
  params: {
    code: Uint8Array;
  };
}

interface FunctionCallAction {
  type: "FunctionCall";
  params: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}

interface TransferAction {
  type: "Transfer";
  params: {
    deposit: string;
  };
}

interface StakeAction {
  type: "Stake";
  params: {
    stake: string;
    publicKey: string;
  };
}  

interface AddKeyAction {
  type: "AddKey";
  params: {
    publicKey: string;
    accessKey: {
      nonce?: number;
      permission:
        | "FullAccess"
        | {
            receiverId: string;
            allowance?: string;
            methodNames?: Array<string>;
          };
    };
  };
}

interface DeleteKeyAction {
  type: "DeleteKey";
  params: {
    publicKey: string;
  };
}

interface DeleteAccountAction {
  type: "DeleteAccount";
  params: {
    beneficiaryId: string;
  };
}
```
