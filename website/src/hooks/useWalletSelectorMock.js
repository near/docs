import { useState, useCallback } from 'react';

// Mock data for testing
const MOCK_ACCOUNT_ID = 'testuser.testnet';
const MOCK_BALANCE = '1000000000000000000000000'; // 1 NEAR in yoctoNEAR

// Mock useWalletSelector hook
export const useWalletSelector = () => {
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Mock getBalance function
  const getBalance = useCallback(async (accountId) => {
    console.log(`[MOCK] Getting balance for account: ${accountId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      total: MOCK_BALANCE,
      stateStaked: '0',
      staked: '0',
      available: MOCK_BALANCE
    };
  }, []);

  // Mock viewFunction
  const viewFunction = useCallback(async ({ contractId, method, args = {} }) => {
    console.log(`[MOCK] Calling view function: ${method} on contract: ${contractId}`, args);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock responses based on common method names
    switch (method) {
      case 'ft_balance_of':
        return '1000000000000000000000000'; // 1 token with 24 decimals
      
      case 'ft_metadata':
        return {
          spec: 'ft-1.0.0',
          name: 'Mock Token',
          symbol: 'MOCK',
          icon: null,
          reference: null,
          reference_hash: null,
          decimals: 24
        };
      
      case 'nft_tokens_for_owner':
        return [
          {
            token_id: '1',
            owner_id: args.account_id,
            metadata: {
              title: 'Mock NFT #1',
              description: 'A mock NFT for testing',
              media: 'https://via.placeholder.com/300x300.png?text=NFT+1',
              media_hash: null,
              copies: 1,
              issued_at: null,
              expires_at: null,
              starts_at: null,
              updated_at: null,
              extra: null,
              reference: null,
              reference_hash: null
            }
          }
        ];
      
      case 'get_greeting':
        return 'Hello, World!';
      
      case 'config':
        return {
          name: 'Mock DAO',
          purpose: 'Testing purposes',
          metadata: {}
        };

      case 'get_required':
        return '1000000000000000000000000'; // 1 NEAR in yoctoNEAR

      default:
        console.warn(`[MOCK] Unknown view method: ${method}`);
        return null;
    }
  }, []);

  // Mock callFunction
  const callFunction = useCallback(async ({ contractId, method, args = {}, gas = '30000000000000', deposit = '0' }) => {
    console.log(`[MOCK] Calling function: ${method} on contract: ${contractId}`, {
      args,
      gas,
      deposit
    });
    
    if (!signedAccountId) {
      throw new Error('User not signed in');
    }
    
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful transaction response
    return {
      transaction: {
        hash: 'mock_transaction_hash_' + Date.now(),
        nonce: Math.floor(Math.random() * 1000000),
        public_key: 'ed25519:MockPublicKey',
        receiver_id: contractId,
        signature: 'ed25519:MockSignature',
        signer_id: signedAccountId
      },
      transaction_outcome: {
        id: 'mock_transaction_hash_' + Date.now(),
        outcome: {
          executor_id: signedAccountId,
          gas_burnt: parseInt(gas) / 2,
          logs: [`[MOCK] ${method} executed successfully`],
          receipt_ids: ['mock_receipt_id'],
          status: { SuccessValue: '' },
          tokens_burnt: '0'
        }
      }
    };
  }, [signedAccountId]);

  // Mock signAndSendTransactions
  const signAndSendTransactions = useCallback(async ({ transactions }) => {
    console.log(`[MOCK] Signing and sending ${transactions.length} transactions`, transactions);
    
    if (!signedAccountId) {
      throw new Error('User not signed in');
    }
    
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful batch transaction response
    return transactions.map((tx, index) => ({
      transaction: {
        hash: `mock_batch_tx_hash_${Date.now()}_${index}`,
        nonce: Math.floor(Math.random() * 1000000),
        public_key: 'ed25519:MockPublicKey',
        receiver_id: tx.receiverId,
        signature: 'ed25519:MockSignature',
        signer_id: signedAccountId
      },
      transaction_outcome: {
        id: `mock_batch_tx_hash_${Date.now()}_${index}`,
        outcome: {
          executor_id: signedAccountId,
          gas_burnt: 1000000000000,
          logs: [`[MOCK] Batch transaction ${index + 1} executed successfully`],
          receipt_ids: [`mock_receipt_id_${index}`],
          status: { SuccessValue: '' },
          tokens_burnt: '0'
        }
      }
    }));
  }, [signedAccountId]);

  // Mock signMessage
  const signMessage = useCallback(async ({ message, recipient, nonce }) => {
    console.log(`[MOCK] Signing message:`, { message, recipient, nonce });
    
    if (!signedAccountId) {
      throw new Error('User not signed in');
    }
    
    // Simulate signing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      accountId: signedAccountId,
      publicKey: 'ed25519:MockPublicKey',
      signature: 'ed25519:MockMessageSignature',
      message,
      recipient,
      nonce
    };
  }, [signedAccountId]);

  // Mock getAccessKeys
  const getAccessKeys = useCallback(async (accountId) => {
    console.log(`[MOCK] Getting access keys for account: ${accountId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        access_key: {
          nonce: 1,
          permission: 'FullAccess'
        },
        public_key: 'ed25519:MockFullAccessKey'
      },
      {
        access_key: {
          nonce: 2,
          permission: {
            FunctionCall: {
              allowance: '250000000000000000000000',
              method_names: [],
              receiver_id: 'mock-contract.testnet'
            }
          }
        },
        public_key: 'ed25519:MockFunctionCallKey'
      }
    ];
  }, []);

  // Mock sign in function
  const signIn = useCallback(() => {
    console.log('[MOCK] User signing in...');
    setSignedAccountId(MOCK_ACCOUNT_ID);
    setIsConnected(true);
  }, []);

  // Mock sign out function
  const signOut = useCallback(() => {
    console.log('[MOCK] User signing out...');
    setSignedAccountId(null);
    setIsConnected(false);
  }, []);

  return {
    // Core properties
    signedAccountId,
    isConnected,
    
    // Core methods
    getBalance,
    viewFunction,
    callFunction,
    signAndSendTransactions,
    signMessage,
    getAccessKeys,
    
    // Authentication methods
    signIn,
    signOut,
    
    // Additional mock properties for testing
    _isMock: true,
    _mockAccountId: MOCK_ACCOUNT_ID
  };
};

export default useWalletSelector;