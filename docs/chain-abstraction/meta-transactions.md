# Tutorial: How to Cover Gas Fees for Your Users with Relayers

Gas fees can be a significant barrier for users interacting with blockchain applications. Many users don't want to acquire native tokens just to try your application. Meta transaction relayers solve this problem by allowing you to cover gas costs for your users while maintaining security.

## What is a Meta Transaction Relayer?

A meta transaction relayer is a service that pays gas fees on behalf of users. Here's how it works:

1. **User creates a transaction** but doesn't send it directly to the blockchain
2. **User signs the transaction** locally, maintaining security
3. **User sends the signed transaction** to your relayer service
4. **Your relayer pays the gas** and submits the transaction to the blockchain

This means users can interact with your application without owning NEAR tokens, while still maintaining full control over their actions through cryptographic signatures.

## Key Benefits

- **Better user experience**: No need for users to acquire NEAR tokens
- **Security maintained**: Users still sign their own transactions
- **Controlled costs**: You can limit which transactions you'll sponsor
- **Increased adoption**: Lower barrier to entry for new users

## How Relayers Work

![relayer-overview-technical](/docs/assets/welcome-pages/relayer-overview-technical.png)

The relayer architecture consists of:

1. **Client Side**: Creates and signs transactions without sending them
2. **Relayer Server**: Receives signed transactions and submits them on-chain
3. **Blockchain**: Processes the transaction with gas paid by the relayer

## Building a Basic Relayer

### Server Implementation

Your relayer server needs to:

1. **Receive signed transactions** from clients
2. **Deserialize the transaction** into a `SignedDelegate` format
3. **Submit the transaction** using your funded NEAR account

Here's a simple Express.js endpoint:

```typescript
app.post('/relay', async (req, res) => {
  const serializedTx: Buffer = req.body;
  const deserializedTx: SignedDelegate = deserialize(
    SCHEMA.SignedDelegate, 
    Buffer.from(serializedTx)
  ) as SignedDelegate;
  
  const relayerAccount: Account = await getAccount(
    NETWORK_ID, 
    RELAYER_ID, 
    RELAYER_PRIVATE_KEY
  );
  
  const receipt = await relayerAccount.signAndSendTransaction({
    actions: [actionCreators.signedDelegate(deserializedTx)],
    receiverId: deserializedTx.delegateAction.senderId
  });
  
  res.json({ success: true, transactionHash: receipt.transaction.hash });
});
```

### Client Implementation

On the client side, you need to:

1. **Create the transaction** you want to execute
2. **Sign it locally** without sending
3. **Send the signed transaction** to your relayer

```typescript
const action = actionCreators.functionCall(
  'your_method',
  { arg1: 'value1' },
  '0',
  '30000000000000'
);

const signedDelegate = await account.signedDelegate({
  actions: [action],
  blockHeightTtl: 60,
  receiverId: 'contract.near'
});

// Serialize and send to relayer
const serializedTx = serialize(SCHEMA.SignedDelegate, signedDelegate);
await fetch('/relay', {
  method: 'POST',
  body: serializedTx
});
```

## Security Considerations

### Gating Your Relayer

You should implement controls to prevent abuse:

```typescript
const delegateAction = deserializedTx?.delegateAction;

// Only allow specific contracts
if (!ALLOWED_CONTRACTS.includes(delegateAction.receiverId)) {
  return res.status(403).json({ error: 'Contract not allowed' });
}

// Limit gas amounts
const totalGas = delegateAction.actions.reduce((sum, action) => 
  sum + (action.gas || 0), 0
);
if (totalGas > MAX_GAS_PER_TRANSACTION) {
  return res.status(403).json({ error: 'Gas limit exceeded' });
}
```

### High-Volume Handling

For production relayers handling many transactions:

1. **Use multiple keys** to avoid nonce collisions
2. **Implement rate limiting** per user
3. **Monitor gas usage** and costs
4. **Set up proper logging** for debugging

## Production-Ready Solution

For production use, consider the [open-source Rust Relayer](https://github.com/near/pagoda-relayer-rs/) which includes:

- User allowance management
- Contract whitelisting  
- OAuth integration for sybil resistance
- Multiple key rotation
- Redis storage for state management

## Common Use Cases

1. **Gaming**: Let players make moves without gas fees
2. **Social Apps**: Enable posting and interactions without barriers  
3. **DeFi Onboarding**: Allow users to try protocols before buying tokens
4. **Enterprise**: Subsidize employee transactions for internal tools

## Testing Your Relayer

1. **Start with testnet** to avoid real costs
2. **Test transaction limits** and error handling
3. **Verify signature validation** works correctly
4. **Monitor gas consumption** patterns
5. **Test with different wallet types** if applicable

## Alternatives to Consider

- **Account Abstraction**: Native protocol-level solution (coming soon)
- **Prepaid Gas**: Users purchase gas credits in advance
- **Freemium Model**: Free tier with paid upgrades
- **Token-based payments**: Accept payments in other tokens

Meta transaction relayers provide an immediate solution for improving user experience while maintaining security. As the NEAR ecosystem evolves, they remain a valuable tool for reducing friction in decentralized applications.
