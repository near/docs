---
id: frontend
title: Frontend Integration
sidebar_label: Frontend Integration
description: "Build a complete web interface for the NEAR Drop system, including drop creation, key management, and claiming functionality with React and Next.js."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A great user experience is crucial for token distribution systems. In this section, we'll build a complete frontend that makes creating and claiming drops as simple as a few clicks.

---

## Project Setup

Let's create a Next.js frontend for our NEAR Drop system:

```bash
npx create-next-app@latest near-drop-frontend
cd near-drop-frontend

# Install NEAR dependencies
npm install near-api-js @near-wallet-selector/core @near-wallet-selector/my-near-wallet
npm install @near-wallet-selector/modal-ui qrcode react-qr-code
npm install lucide-react clsx tailwind-merge

# Install development dependencies
npm install -D @types/qrcode
```

### Environment Configuration

Create `.env.local`:

```bash
NEXT_PUBLIC_NETWORK_ID=testnet
NEXT_PUBLIC_CONTRACT_ID=drop-contract.testnet
NEXT_PUBLIC_WALLET_URL=https://testnet.mynearwallet.com
NEXT_PUBLIC_HELPER_URL=https://helper.testnet.near.org
NEXT_PUBLIC_RPC_URL=https://rpc.testnet.near.org
```

---

## Core Components Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/            # Reusable UI components
│   ├── DropCreation/  # Drop creation components
│   ├── DropClaiming/  # Drop claiming components
│   └── Dashboard/     # Dashboard components
├── hooks/             # Custom React hooks
├── services/          # NEAR integration services
├── types/             # TypeScript types
└── utils/             # Utility functions
```

---

## NEAR Integration Layer

### Wallet Connection Service

Create `src/services/near.ts`:

```typescript
import { connect, ConnectConfig, keyStores, WalletConnection } from 'near-api-js';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupModal } from '@near-wallet-selector/modal-ui';

const config: ConnectConfig = {
  networkId: process.env.NEXT_PUBLIC_NETWORK_ID!,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL!,
  walletUrl: process.env.NEXT_PUBLIC_WALLET_URL!,
  helperUrl: process.env.NEXT_PUBLIC_HELPER_URL!,
};

export class NearService {
  near: any;
  wallet: any;
  contract: any;
  selector: any;
  modal: any;

  async initialize() {
    // Initialize NEAR connection
    this.near = await connect(config);
    
    // Initialize wallet selector
    this.selector = await setupWalletSelector({
      network: process.env.NEXT_PUBLIC_NETWORK_ID!,
      modules: [
        setupMyNearWallet(),
      ],
    });

    // Initialize modal
    this.modal = setupModal(this.selector, {
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ID!,
    });

    // Initialize contract
    if (this.selector.isSignedIn()) {
      const wallet = await this.selector.wallet();
      this.contract = new Contract(wallet.account(), process.env.NEXT_PUBLIC_CONTRACT_ID!, {
        viewMethods: [
          'get_drop',
          'get_drop_id_by_key',
          'calculate_near_drop_cost_view',
          'calculate_ft_drop_cost_view',
          'calculate_nft_drop_cost_view',
          'get_nft_drop_details',
          'get_ft_drop_details',
        ],
        changeMethods: [
          'create_near_drop',
          'create_ft_drop',
          'create_nft_drop',
          'claim_for',
          'create_account_and_claim',
          'create_named_account_and_claim',
        ],
      });
    }
  }

  async signIn() {
    this.modal.show();
  }

  async signOut() {
    const wallet = await this.selector.wallet();
    await wallet.signOut();
    this.contract = null;
  }

  isSignedIn() {
    return this.selector?.isSignedIn() || false;
  }

  getAccountId() {
    return this.selector?.store?.getState()?.accounts?.[0]?.accountId || null;
  }
}

export const nearService = new NearService();
```

### Contract Interface Types

Create `src/types/contract.ts`:

```typescript
export interface DropKey {
  public_key: string;
  private_key: string;
}

export interface NearDrop {
  amount: string;
  counter: number;
}

export interface FtDrop {
  ft_contract: string;
  amount: string;
  counter: number;
}

export interface NftDrop {
  nft_contract: string;
  token_id: string;
  counter: number;
}

export type Drop = 
  | { Near: NearDrop }
  | { FungibleToken: FtDrop }
  | { NonFungibleToken: NftDrop };

export interface DropInfo {
  drop_id: number;
  drop: Drop;
  keys: DropKey[];
}

export interface ClaimableKey {
  private_key: string;
  public_key: string;
  drop_id?: number;
  claim_url: string;
}
```

---

## Drop Creation Interface

### Drop Creation Form

Create `src/components/DropCreation/DropCreationForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Minus } from 'lucide-react';
import { nearService } from '@/services/near';
import { generateKeys } from '@/utils/crypto';

interface DropCreationFormProps {
  onDropCreated: (dropInfo: any) => void;
}

export default function DropCreationForm({ onDropCreated }: DropCreationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dropType, setDropType] = useState<'near' | 'ft' | 'nft'>('near');
  const [keyCount, setKeyCount] = useState(5);

  // NEAR drop form state
  const [nearAmount, setNearAmount] = useState('1');

  // FT drop form state
  const [ftContract, setFtContract] = useState('');
  const [ftAmount, setFtAmount] = useState('');

  // NFT drop form state
  const [nftContract, setNftContract] = useState('');
  const [nftTokenId, setNftTokenId] = useState('');

  const handleCreateDrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate keys for the drop
      const keys = generateKeys(keyCount);
      const publicKeys = keys.map(k => k.publicKey);

      let dropId: number;
      let cost: string = '0';

      switch (dropType) {
        case 'near':
          // Calculate cost first
          cost = await nearService.contract.calculate_near_drop_cost_view({
            num_keys: keyCount,
            amount_per_drop: (parseFloat(nearAmount) * 1e24).toString(),
          });
          
          dropId = await nearService.contract.create_near_drop({
            public_keys: publicKeys,
            amount_per_drop: (parseFloat(nearAmount) * 1e24).toString(),
          }, {
            gas: '100000000000000',
            attachedDeposit: cost,
          });
          break;

        case 'ft':
          cost = await nearService.contract.calculate_ft_drop_cost_view({
            num_keys: keyCount,
          });

          dropId = await nearService.contract.create_ft_drop({
            public_keys: publicKeys,
            ft_contract: ftContract,
            amount_per_drop: ftAmount,
          }, {
            gas: '150000000000000',
            attachedDeposit: cost,
          });
          break;

        case 'nft':
          if (keyCount > 1) {
            throw new Error('NFT drops support only 1 key since each NFT is unique');
          }

          cost = await nearService.contract.calculate_nft_drop_cost_view();

          dropId = await nearService.contract.create_nft_drop({
            public_key: publicKeys[0],
            nft_contract: nftContract,
            token_id: nftTokenId,
          }, {
            gas: '100000000000000',
            attachedDeposit: cost,
          });
          break;

        default:
          throw new Error('Invalid drop type');
      }

      // Return drop info with keys
      const dropInfo = {
        dropId,
        dropType,
        keys,
        cost,
      };

      onDropCreated(dropInfo);
    } catch (error) {
      console.error('Error creating drop:', error);
      alert('Failed to create drop: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Token Drop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateDrop} className="space-y-6">
          {/* Drop Type Selection */}
          <Tabs value={dropType} onValueChange={(value) => setDropType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="near">NEAR Tokens</TabsTrigger>
              <TabsTrigger value="ft">Fungible Tokens</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
            </TabsList>

            {/* Key Count Configuration */}
            <div className="flex items-center space-x-2 mt-4">
              <Label htmlFor="keyCount">Number of Keys:</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyCount(Math.max(1, keyCount - 1))}
                  disabled={dropType === 'nft' || keyCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="keyCount"
                  type="number"
                  value={keyCount}
                  onChange={(e) => setKeyCount(parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                  min="1"
                  max={dropType === 'nft' ? 1 : 100}
                  disabled={dropType === 'nft'}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyCount(Math.min(100, keyCount + 1))}
                  disabled={dropType === 'nft' || keyCount >= 100}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* NEAR Drop Configuration */}
            <TabsContent value="near" className="space-y-4">
              <div>
                <Label htmlFor="nearAmount">Amount per Drop (NEAR)</Label>
                <Input
                  id="nearAmount"
                  type="number"
                  step="0.01"
                  value={nearAmount}
                  onChange={(e) => setNearAmount(e.target.value)}
                  placeholder="1.0"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Each recipient will receive {nearAmount} NEAR tokens
                </p>
              </div>
            </TabsContent>

            {/* FT Drop Configuration */}
            <TabsContent value="ft" className="space-y-4">
              <div>
                <Label htmlFor="ftContract">FT Contract Address</Label>
                <Input
                  id="ftContract"
                  value={ftContract}
                  onChange={(e) => setFtContract(e.target.value)}
                  placeholder="token.testnet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ftAmount">Amount per Drop</Label>
                <Input
                  id="ftAmount"
                  value={ftAmount}
                  onChange={(e) => setFtAmount(e.target.value)}
                  placeholder="1000000000000000000000000"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Amount in smallest token units (including decimals)
                </p>
              </div>
            </TabsContent>

            {/* NFT Drop Configuration */}
            <TabsContent value="nft" className="space-y-4">
              <div>
                <Label htmlFor="nftContract">NFT Contract Address</Label>
                <Input
                  id="nftContract"
                  value={nftContract}
                  onChange={(e) => setNftContract(e.target.value)}
                  placeholder="nft.testnet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nftTokenId">Token ID</Label>
                <Input
                  id="nftTokenId"
                  value={nftTokenId}
                  onChange={(e) => setNftTokenId(e.target.value)}
                  placeholder="unique-token-123"
                  required
                />
              </div>
              <p className="text-sm text-orange-600 mt-2">
                ⚠️ NFT drops support only 1 key since each NFT is unique
              </p>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Drop...
              </>
            ) : (
              'Create Drop'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Key Generation Utility

Create `src/utils/crypto.ts`:

```typescript
import { KeyPair } from 'near-api-js';

export interface GeneratedKey {
  publicKey: string;
  privateKey: string;
  keyPair: KeyPair;
}

export function generateKeys(count: number): GeneratedKey[] {
  const keys: GeneratedKey[] = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = KeyPair.fromRandom('ed25519');
    keys.push({
      publicKey: keyPair.publicKey.toString(),
      privateKey: keyPair.secretKey,
      keyPair,
    });
  }
  
  return keys;
}

export function generateClaimUrl(privateKey: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}/claim?key=${encodeURIComponent(privateKey)}`;
}
```

---

## Drop Display and Management

### Drop Results Component

Create `src/components/DropCreation/DropResults.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, QrCode, Share2, ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';
import { generateClaimUrl } from '@/utils/crypto';

interface DropResultsProps {
  dropInfo: {
    dropId: number;
    dropType: string;
    keys: Array<{ publicKey: string; privateKey: string }>;
    cost: string;
  };
}

export default function DropResults({ dropInfo }: DropResultsProps) {
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const claimUrls = dropInfo.keys.map(key => generateClaimUrl(key.privateKey));
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  const downloadKeys = () => {
    const keysData = dropInfo.keys.map((key, index) => ({
      index: index + 1,
      publicKey: key.publicKey,
      privateKey: key.privateKey,
      claimUrl: claimUrls[index],
    }));

    const dataStr = JSON.stringify(keysData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `near-drop-${dropInfo.dropId}-keys.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const downloadQRCodes = async () => {
    // This would generate QR codes as images and download them as a ZIP
    // Implementation depends on additional libraries like JSZip
    console.log('Download QR codes functionality would be implemented here');
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Drop Created Successfully!</CardTitle>
          <Badge variant="secondary">Drop ID: {dropInfo.dropId}</Badge>
        </div>
        <p className="text-sm text-gray-600">
          Created {dropInfo.keys.length} {dropInfo.dropType.toUpperCase()} drop key(s). 
          Total cost: {(parseInt(dropInfo.cost) / 1e24).toFixed(4)} NEAR
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keys">Keys & Links</TabsTrigger>
            <TabsTrigger value="qr">QR Codes</TabsTrigger>
            <TabsTrigger value="sharing">Sharing Tools</TabsTrigger>
          </TabsList>

          {/* Keys and Links Tab */}
          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Generated Keys</h3>
              <div className="space-x-2">
                <Button onClick={downloadKeys} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Keys
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {dropInfo.keys.map((key, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Key {index + 1}</Badge>
                      <Button
                        onClick={() => copyToClipboard(claimUrls[index])}
                        variant="ghost"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Claim URL:</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          value={claimUrls[index]}
                          readOnly
                          className="text-xs"
                        />
                        <Button
                          onClick={() => window.open(claimUrls[index], '_blank')}
                          variant="outline"
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        Show Private Key
                      </summary>
                      <div className="mt-2 p-2 bg-gray-50 rounded font-mono text-xs break-all">
                        {key.privateKey}
                      </div>
                    </details>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">QR Codes for Claiming</h3>
              <div className="space-x-2">
                <select
                  value={selectedKeyIndex}
                  onChange={(e) => setSelectedKeyIndex(parseInt(e.target.value))}
                  className="px-3 py-1 border rounded"
                >
                  {dropInfo.keys.map((_, index) => (
                    <option key={index} value={index}>
                      Key {index + 1}
                    </option>
                  ))}
                </select>
                <Button onClick={downloadQRCodes} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All QR
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <QRCode
                  value={claimUrls[selectedKeyIndex]}
                  size={256}
                />
                <p className="text-center text-sm text-gray-600 mt-2">
                  Key {selectedKeyIndex + 1} - Scan to claim
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dropInfo.keys.map((_, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 border rounded ${
                    selectedKeyIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedKeyIndex(index)}
                >
                  <QRCode
                    value={claimUrls[index]}
                    size={80}
                  />
                  <p className="text-xs text-center mt-1">Key {index + 1}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Sharing Tools Tab */}
          <TabsContent value="sharing" className="space-y-4">
            <h3 className="text-lg font-medium">Sharing & Distribution</h3>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Bulk Share Text</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Copy this text to share all claim links at once:
                </p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {claimUrls.map((url, index) => (
                    <div key={index} className="mb-1">
                      Key {index + 1}: {url}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => copyToClipboard(claimUrls.join('\n'))}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All Links
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Social Media Template</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  🎁 NEAR Token Drop! 
                  <br />
                  I've created a token drop with {dropInfo.keys.length} claimable key(s).
                  <br />
                  Click your link to claim: [Paste individual links here]
                  <br />
                  #NEAR #TokenDrop #Crypto
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

---

## Claiming Interface

### Claim Page Component

Create `src/components/DropClaiming/ClaimPage.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Gift, User, Wallet } from 'lucide-react';
import { nearService } from '@/services/near';
import { KeyPair } from 'near-api-js';

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Key and drop info
  const [privateKey, setPrivateKey] = useState('');
  const [dropInfo, setDropInfo] = useState<any>(null);
  const [keyValid, setKeyValid] = useState(false);
  
  // Claiming options
  const [claimMode, setClaimMode] = useState<'existing' | 'new'>('existing');
  const [existingAccount, setExistingAccount] = useState('');
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    const keyFromUrl = searchParams.get('key');
    if (keyFromUrl) {
      setPrivateKey(keyFromUrl);
      validateKey(keyFromUrl);
    }
  }, [searchParams]);

  const validateKey = async (key: string) => {
    try {
      // Parse the key to validate format
      const keyPair = KeyPair.fromString(key);
      const publicKey = keyPair.publicKey.toString();
      
      // Check if drop exists for this key
      const dropId = await nearService.contract.get_drop_id_by_key({
        public_key: publicKey,
      });
      
      if (dropId !== null) {
        const drop = await nearService.contract.get_drop({
          drop_id: dropId,
        });
        
        setDropInfo({ dropId, drop });
        setKeyValid(true);
      } else {
        setError('This key is not associated with any active drop');
      }
    } catch (err) {
      setError('Invalid private key format');
    }
  };

  const handleClaim = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const keyPair = KeyPair.fromString(privateKey);
      
      // Create a temporary wallet connection with this key
      const tempAccount = {
        accountId: process.env.NEXT_PUBLIC_CONTRACT_ID!,
        keyPair: keyPair,
      };

      let result;
      
      if (claimMode === 'existing') {
        // Claim to existing account
        result = await nearService.contract.claim_for({
          account_id: existingAccount,
        }, {
          gas: '150000000000000',
          signerAccount: tempAccount,
        });
      } else {
        // Create new account and claim
        const fullAccountName = `${newAccountName}.${process.env.NEXT_PUBLIC_NETWORK_ID}`;
        result = await nearService.contract.create_named_account_and_claim({
          preferred_name: newAccountName,
        }, {
          gas: '200000000000000',
          signerAccount: tempAccount,
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to claim drop');
    } finally {
      setIsLoading(false);
    }
  };

  const getDropTypeInfo = (drop: any) => {
    if (drop.Near) {
      return {
        type: 'NEAR',
        amount: `${(parseInt(drop.Near.amount) / 1e24).toFixed(4)} NEAR`,
        remaining: drop.Near.counter,
      };
    } else if (drop.FungibleToken) {
      return {
        type: 'Fungible Token',
        amount: `${drop.FungibleToken.amount} tokens`,
        contract: drop.FungibleToken.ft_contract,
        remaining: drop.FungibleToken.counter,
      };
    } else if (drop.NonFungibleToken) {
      return {
        type: 'NFT',
        tokenId: drop.NonFungibleToken.token_id,
        contract: drop.NonFungibleToken.nft_contract,
        remaining: drop.NonFungibleToken.counter,
      };
    }
    return null;
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Card>
          <CardHeader className="text-center">
            <Gift className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <CardTitle className="text-green-600">Claim Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Your tokens have been successfully claimed.
            </p>
            <Button onClick={() => router.push('/')}>
              Create Another Drop
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-6 w-6 mr-2" />
            Claim Your Token Drop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Private Key Input */}
          <div>
            <Label htmlFor="privateKey">Private Key</Label>
            <Input
              id="privateKey"
              type="password"
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value);
                setError(null);
                setKeyValid(false);
                setDropInfo(null);
              }}
              placeholder="ed25519:..."
              className="font-mono text-sm"
            />
            {!keyValid && privateKey && (
              <Button
                onClick={() => validateKey(privateKey)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Validate Key
              </Button>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Drop Information */}
          {keyValid && dropInfo && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <h3 className="font-medium text-green-800 mb-2">Drop Details</h3>
                {(() => {
                  const info = getDropTypeInfo(dropInfo.drop);
                  return info ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge variant="secondary">{info.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-mono">{info.amount}</span>
                      </div>
                      {info.contract && (
                        <div className="flex justify-between">
                          <span>Contract:</span>
                          <span className="font-mono text-xs">{info.contract}</span>
                        </div>
                      )}
                      {info.tokenId && (
                        <div className="flex justify-between">
                          <span>Token ID:</span>
                          <span className="font-mono">{info.tokenId}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Remaining:</span>
                        <span>{info.remaining} claim(s)</span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>
          )}

          {/* Claiming Options */}
          {keyValid && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Choose Claiming Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Claim Mode Selection */}
                <div className="flex space-x-4">
                  <Button
                    variant={claimMode === 'existing' ? 'default' : 'outline'}
                    onClick={() => setClaimMode('existing')}
                    className="flex-1"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Existing Account
                  </Button>
                  <Button
                    variant={claimMode === 'new' ? 'default' : 'outline'}
                    onClick={() => setClaimMode('new')}
                    className="flex-1"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Create New Account
                  </Button>
                </div>

                {/* Existing Account Option */}
                {claimMode === 'existing' && (
                  <div>
                    <Label htmlFor="existingAccount">NEAR Account ID</Label>
                    <Input
                      id="existingAccount"
                      value={existingAccount}
                      onChange={(e) => setExistingAccount(e.target.value)}
                      placeholder="your-account.testnet"
                    />
                  </div>
                )}

                {/* New Account Option */}
                {claimMode === 'new' && (
                  <div>
                    <Label htmlFor="newAccountName">Choose Account Name</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="newAccountName"
                        value={newAccountName}
                        onChange={(e) => setNewAccountName(e.target.value.toLowerCase().replace(/[^a-z0-9\-_]/g, ''))}
                        placeholder="my-new-account"
                      />
                      <span className="text-sm text-gray-500">
                        .{process.env.NEXT_PUBLIC_NETWORK_ID}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      A new NEAR account will be created for you
                    </p>
                  </div>
                )}

                {/* Claim Button */}
                <Button
                  onClick={handleClaim}
                  disabled={
                    isLoading ||
                    (claimMode === 'existing' && !existingAccount) ||
                    (claimMode === 'new' && !newAccountName)
                  }
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-4 w-4" />
                      Claim Drop
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Dashboard and Management

### Drop Dashboard

Create `src/components/Dashboard/DropDashboard.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Trash2, RefreshCw, TrendingUp, Users, Gift } from 'lucide-react';
import { nearService } from '@/services/near';

interface Drop {
  dropId: number;
  type: string;
  remaining: number;
  total: number;
  created: Date;
  status: 'active' | 'completed' | 'expired';
}

export default function DropDashboard() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [stats, setStats] = useState({
    totalDrops: 0,
    activeDrops: 0,
    totalClaimed: 0,
    totalValue: '0',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you'd have methods to fetch user's drops
      // For now, we'll simulate some data
      const mockDrops: Drop[] = [
        {
          dropId: 1,
          type: 'NEAR',
          remaining: 5,
          total: 10,
          created: new Date('2024-01-15'),
          status: 'active',
        },
        {
          dropId: 2,
          type: 'FT',
          remaining: 0,
          total: 20,
          created: new Date('2024-01-10'),
          status: 'completed',
        },
      ];

      setDrops(mockDrops);
      setStats({
        totalDrops: mockDrops.length,
        activeDrops: mockDrops.filter(d => d.status === 'active').length,
        totalClaimed: mockDrops.reduce((acc, d) => acc + (d.total - d.remaining), 0),
        totalValue: '15.5', // Mock value in NEAR
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (---
id: frontend
title: Frontend Integration
sidebar_label: Frontend Integration
description: "Build a complete web interface for the NEAR Drop system, including drop creation, key management, and claiming functionality with React and Next.js."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A great user experience is crucial for token distribution systems. In this section, we'll build a complete frontend that makes creating and claiming drops as simple as a few clicks.

---

## Project Setup

Let's create a Next.js frontend for our NEAR Drop system:

```bash
npx create-next-app@latest near-drop-frontend
cd near-drop-frontend

# Install NEAR dependencies
npm install near-api-js @near-wallet-selector/core @near-wallet-selector/my-near-wallet
npm install @near-wallet-selector/modal-ui qrcode react-qr-code
npm install lucide-react clsx tailwind-merge

# Install development dependencies
npm install -D @types/qrcode
```

### Environment Configuration

Create `.env.local`:

```bash
NEXT_PUBLIC_NETWORK_ID=testnet
NEXT_PUBLIC_CONTRACT_ID=drop-contract.testnet
NEXT_PUBLIC_WALLET_URL=https://testnet.mynearwallet.com
NEXT_PUBLIC_HELPER_URL=https://helper.testnet.near.org
NEXT_PUBLIC_RPC_URL=https://rpc.testnet.near.org
```

---

## Core Components Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/            # Reusable UI components
│   ├── DropCreation/  # Drop creation components
│   ├── DropClaiming/  # Drop claiming components
│   └── Dashboard/     # Dashboard components
├── hooks/             # Custom React hooks
├── services/          # NEAR integration services
├── types/             # TypeScript types
└── utils/             # Utility functions
```

---

## NEAR Integration Layer

### Wallet Connection Service

Create `src/services/near.ts`:

```typescript
import { connect, ConnectConfig, keyStores, WalletConnection } from 'near-api-js';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupModal } from '@near-wallet-selector/modal-ui';

const config: ConnectConfig = {
  networkId: process.env.NEXT_PUBLIC_NETWORK_ID!,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL!,
  walletUrl: process.env.NEXT_PUBLIC_WALLET_URL!,
  helperUrl: process.env.NEXT_PUBLIC_HELPER_URL!,
};

export class NearService {
  near: any;
  wallet: any;
  contract: any;
  selector: any;
  modal: any;

  async initialize() {
    // Initialize NEAR connection
    this.near = await connect(config);
    
    // Initialize wallet selector
    this.selector = await setupWalletSelector({
      network: process.env.NEXT_PUBLIC_NETWORK_ID!,
      modules: [
        setupMyNearWallet(),
      ],
    });

    // Initialize modal
    this.modal = setupModal(this.selector, {
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ID!,
    });

    // Initialize contract
    if (this.selector.isSignedIn()) {
      const wallet = await this.selector.wallet();
      this.contract = new Contract(wallet.account(), process.env.NEXT_PUBLIC_CONTRACT_ID!, {
        viewMethods: [
          'get_drop',
          'get_drop_id_by_key',
          'calculate_near_drop_cost_view',
          'calculate_ft_drop_cost_view',
          'calculate_nft_drop_cost_view',
          'get_nft_drop_details',
          'get_ft_drop_details',
        ],
        changeMethods: [
          'create_near_drop',
          'create_ft_drop',
          'create_nft_drop',
          'claim_for',
          'create_account_and_claim',
          'create_named_account_and_claim',
        ],
      });
    }
  }

  async signIn() {
    this.modal.show();
  }

  async signOut() {
    const wallet = await this.selector.wallet();
    await wallet.signOut();
    this.contract = null;
  }

  isSignedIn() {
    return this.selector?.isSignedIn() || false;
  }

  getAccountId() {
    return this.selector?.store?.getState()?.accounts?.[0]?.accountId || null;
  }
}

export const nearService = new NearService();
```

### Contract Interface Types

Create `src/types/contract.ts`:

```typescript
export interface DropKey {
  public_key: string;
  private_key: string;
}

export interface NearDrop {
  amount: string;
  counter: number;
}

export interface FtDrop {
  ft_contract: string;
  amount: string;
  counter: number;
}

export interface NftDrop {
  nft_contract: string;
  token_id: string;
  counter: number;
}

export type Drop = 
  | { Near: NearDrop }
  | { FungibleToken: FtDrop }
  | { NonFungibleToken: NftDrop };

export interface DropInfo {
  drop_id: number;
  drop: Drop;
  keys: DropKey[];
}

export interface ClaimableKey {
  private_key: string;
  public_key: string;
  drop_id?: number;
  claim_url: string;
}
```

---

## Drop Creation Interface

### Drop Creation Form

Create `src/components/DropCreation/DropCreationForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Minus } from 'lucide-react';
import { nearService } from '@/services/near';
import { generateKeys } from '@/utils/crypto';

interface DropCreationFormProps {
  onDropCreated: (dropInfo: any) => void;
}

export default function DropCreationForm({ onDropCreated }: DropCreationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dropType, setDropType] = useState<'near' | 'ft' | 'nft'>('near');
  const [keyCount, setKeyCount] = useState(5);

  // NEAR drop form state
  const [nearAmount, setNearAmount] = useState('1');

  // FT drop form state
  const [ftContract, setFtContract] = useState('');
  const [ftAmount, setFtAmount] = useState('');

  // NFT drop form state
  const [nftContract, setNftContract] = useState('');
  const [nftTokenId, setNftTokenId] = useState('');

  const handleCreateDrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate keys for the drop
      const keys = generateKeys(keyCount);
      const publicKeys = keys.map(k => k.publicKey);

      let dropId: number;
      let cost: string = '0';

      switch (dropType) {
        case 'near':
          // Calculate cost first
          cost = await nearService.contract.calculate_near_drop_cost_view({
            num_keys: keyCount,
            amount_per_drop: (parseFloat(nearAmount) * 1e24).toString(),
          });
          
          dropId = await nearService.contract.create_near_drop({
            public_keys: publicKeys,
            amount_per_drop: (parseFloat(nearAmount) * 1e24).toString(),
          }, {
            gas: '100000000000000',
            attachedDeposit: cost,
          });
          break;

        case 'ft':
          cost = await nearService.contract.calculate_ft_drop_cost_view({
            num_keys: keyCount,
          });

          dropId = await nearService.contract.create_ft_drop({
            public_keys: publicKeys,
            ft_contract: ftContract,
            amount_per_drop: ftAmount,
          }, {
            gas: '150000000000000',
            attachedDeposit: cost,
          });
          break;

        case 'nft':
          if (keyCount > 1) {
            throw new Error('NFT drops support only 1 key since each NFT is unique');
          }

          cost = await nearService.contract.calculate_nft_drop_cost_view();

          dropId = await nearService.contract.create_nft_drop({
            public_key: publicKeys[0],
            nft_contract: nftContract,
            token_id: nftTokenId,
          }, {
            gas: '100000000000000',
            attachedDeposit: cost,
          });
          break;

        default:
          throw new Error('Invalid drop type');
      }

      // Return drop info with keys
      const dropInfo = {
        dropId,
        dropType,
        keys,
        cost,
      };

      onDropCreated(dropInfo);
    } catch (error) {
      console.error('Error creating drop:', error);
      alert('Failed to create drop: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Token Drop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateDrop} className="space-y-6">
          {/* Drop Type Selection */}
          <Tabs value={dropType} onValueChange={(value) => setDropType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="near">NEAR Tokens</TabsTrigger>
              <TabsTrigger value="ft">Fungible Tokens</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
            </TabsList>

            {/* Key Count Configuration */}
            <div className="flex items-center space-x-2 mt-4">
              <Label htmlFor="keyCount">Number of Keys:</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyCount(Math.max(1, keyCount - 1))}
                  disabled={dropType === 'nft' || keyCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="keyCount"
                  type="number"
                  value={keyCount}
                  onChange={(e) => setKeyCount(parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                  min="1"
                  max={dropType === 'nft' ? 1 : 100}
                  disabled={dropType === 'nft'}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyCount(Math.min(100, keyCount + 1))}
                  disabled={dropType === 'nft' || keyCount >= 100}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* NEAR Drop Configuration */}
            <TabsContent value="near" className="space-y-4">
              <div>
                <Label htmlFor="nearAmount">Amount per Drop (NEAR)</Label>
                <Input
                  id="nearAmount"
                  type="number"
                  step="0.01"
                  value={nearAmount}
                  onChange={(e) => setNearAmount(e.target.value)}
                  placeholder="1.0"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Each recipient will receive {nearAmount} NEAR tokens
                </p>
              </div>
            </TabsContent>

            {/* FT Drop Configuration */}
            <TabsContent value="ft" className="space-y-4">
              <div>
                <Label htmlFor="ftContract">FT Contract Address</Label>
                <Input
                  id="ftContract"
                  value={ftContract}
                  onChange={(e) => setFtContract(e.target.value)}
                  placeholder="token.testnet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ftAmount">Amount per Drop</Label>
                <Input
                  id="ftAmount"
                  value={ftAmount}
                  onChange={(e) => setFtAmount(e.target.value)}
                  placeholder="1000000000000000000000000"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Amount in smallest token units (including decimals)
                </p>
              </div>
            </TabsContent>

            {/* NFT Drop Configuration */}
            <TabsContent value="nft" className="space-y-4">
              <div>
                <Label htmlFor="nftContract">NFT Contract Address</Label>
                <Input
                  id="nftContract"
                  value={nftContract}
                  onChange={(e) => setNftContract(e.target.value)}
                  placeholder="nft.testnet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nftTokenId">Token ID</Label>
                <Input
                  id="nftTokenId"
                  value={nftTokenId}
                  onChange={(e) => setNftTokenId(e.target.value)}
                  placeholder="unique-token-123"
                  required
                />
              </div>
              <p className="text-sm text-orange-600 mt-2">
                ⚠️ NFT drops support only 1 key since each NFT is unique
              </p>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Drop...
              </>
            ) : (
              'Create Drop'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Key Generation Utility

Create `src/utils/crypto.ts`:

```typescript
import { KeyPair } from 'near-api-js';

export interface GeneratedKey {
  publicKey: string;
  privateKey: string;
  keyPair: KeyPair;
}

export function generateKeys(count: number): GeneratedKey[] {
  const keys: GeneratedKey[] = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = KeyPair.fromRandom('ed25519');
    keys.push({
      publicKey: keyPair.publicKey.toString(),
      privateKey: keyPair.secretKey,
      keyPair,
    });
  }
  
  return keys;
}

export function generateClaimUrl(privateKey: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}/claim?key=${encodeURIComponent(privateKey)}`;
}
```

---

## Drop Display and Management

### Drop Results Component

Create `src/components/DropCreation/DropResults.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, QrCode, Share2, ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';
import { generateClaimUrl } from '@/utils/crypto';

interface DropResultsProps {
  dropInfo: {
    dropId: number;
    dropType: string;
    keys: Array<{ publicKey: string; privateKey: string }>;
    cost: string;
  };
}

export default function DropResults({ dropInfo }: DropResultsProps) {
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const claimUrls = dropInfo.keys.map(key => generateClaimUrl(key.privateKey));
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  const downloadKeys = () => {
    const keysData = dropInfo.keys.map((key, index) => ({
      index: index + 1,
      publicKey: key.publicKey,
      privateKey: key.privateKey,
      claimUrl: claimUrls[index],
    }));

    const dataStr = JSON.stringify(keysData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `near-drop-${dropInfo.dropId}-keys.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const downloadQRCodes = async () => {
    // This would generate QR codes as images and download them as a ZIP
    // Implementation depends on additional libraries like JSZip
    console.log('Download QR codes functionality would be implemented here');
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Drop Created Successfully!</CardTitle>
          <Badge variant="secondary">Drop ID: {dropInfo.dropId}</Badge>
        </div>
        <p className="text-sm text-gray-600">
          Created {dropInfo.keys.length} {dropInfo.dropType.toUpperCase()} drop key(s). 
          Total cost: {(parseInt(dropInfo.cost) / 1e24).toFixed(4)} NEAR
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keys">Keys & Links</TabsTrigger>
            <TabsTrigger value="qr">QR Codes</TabsTrigger>
            <TabsTrigger value="sharing">Sharing Tools</TabsTrigger>
          </TabsList>

          {/* Keys and Links Tab */}
          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Generated Keys</h3>
              <div className="space-x-2">
                <Button onClick={downloadKeys} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Keys
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {dropInfo.keys.map((key, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Key {index + 1}</Badge>
                      <Button
                        onClick={() => copyToClipboard(claimUrls[index])}
                        variant="ghost"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Claim URL:</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          value={claimUrls[index]}
                          readOnly
                          className="text-xs"
                        />
                        <Button
                          onClick={() => window.open(claimUrls[index], '_blank')}
                          variant="outline"
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        Show Private Key
                      </summary>
                      <div className="mt-2 p-2 bg-gray-50 rounded font-mono text-xs break-all">
                        {key.privateKey}
                      </div>
                    </details>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">QR Codes for Claiming</h3>
              <div className="space-x-2">
                <select
                  value={selectedKeyIndex}
                  onChange={(e) => setSelectedKeyIndex(parseInt(e.target.value))}
                  className="px-3 py-1 border rounded"
                >
                  {dropInfo.keys.map((_, index) => (
                    <option key={index} value={index}>
                      Key {index + 1}
                    </option>
                  ))}
                </select>
                <Button onClick={downloadQRCodes} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All QR
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <QRCode
                  value={claimUrls[selectedKeyIndex]}
                  size={256}
                />
                <p className="text-center text-sm text-gray-600 mt-2">
                  Key {selectedKeyIndex + 1} - Scan to claim
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dropInfo.keys.map((_, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 border rounded ${
                    selectedKeyIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedKeyIndex(index)}
                >
                  <QRCode
                    value={claimUrls[index]}
                    size={80}
                  />
                  <p className="text-xs text-center mt-1">Key {index + 1}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Sharing Tools Tab */}
          <TabsContent value="sharing" className="space-y-4">
            <h3 className="text-lg font-medium">Sharing & Distribution</h3>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Bulk Share Text</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Copy this text to share all claim links at once:
                </p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {claimUrls.map((url, index) => (
                    <div key={index} className="mb-1">
                      Key {index + 1}: {url}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => copyToClipboard(claimUrls.join('\n'))}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All Links
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Social Media Template</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  🎁 NEAR Token Drop! 
                  <br />
                  I've created a token drop with {dropInfo.keys.length} claimable key(s).
                  <br />
                  Click your link to claim: [Paste individual links here]
                  <br />
                  #NEAR #TokenDrop #Crypto
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

---

## Claiming Interface

### Claim Page Component

Create `src/components/DropClaiming/ClaimPage.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Gift, User, Wallet } from 'lucide-react';
import { nearService } from '@/services/near';
import { KeyPair } from 'near-api-js';

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Key and drop info
  const [privateKey, setPrivateKey] = useState('');
  const [dropInfo, setDropInfo] = useState<any>(null);
  const [keyValid, setKeyValid] = useState(false);
  
  // Claiming options
  const [claimMode, setClaimMode] = useState<'existing' | 'new'>('existing');
  const [existingAccount, setExistingAccount] = useState('');
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    const keyFromUrl = searchParams.get('key');
    if (keyFromUrl) {
      setPrivateKey(keyFromUrl);
      validateKey(keyFromUrl);
    }
  }, [searchParams]);

  const validateKey = async (key: string) => {
    try {
      // Parse the key to validate format
      const keyPair = KeyPair.fromString(key);
      const publicKey = keyPair.publicKey.toString();
      
      // Check if drop exists for this key
      const dropId = await nearService.contract.get_drop_id_by_key({
        public_key: publicKey,
      });
      
      if (dropId !== null) {
        const drop = await nearService.contract.get_drop({
          drop_id: dropId,
        });
        
        setDropInfo({ dropId, drop });
        setKeyValid(true);
      } else {
        setError('This key is not associated with any active drop');
      }
    } catch (err) {
      setError('Invalid private key format');
    }
  };

  const handleClaim = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const keyPair = KeyPair.fromString(privateKey);
      
      // Create a temporary wallet connection with this key
      const tempAccount = {
        accountId: process.env.NEXT_PUBLIC_CONTRACT_ID!,
        keyPair: keyPair,
      };

      let result;
      
      if (claimMode === 'existing') {
        // Claim to existing account
        result = await nearService.contract.claim_for({
          account_id: existingAccount,
        }, {
          gas: '150000000000000',
          signerAccount: tempAccount,
        });
      } else {
        // Create new account and claim
        const fullAccountName = `${newAccountName}.${process.env.NEXT_PUBLIC_NETWORK_ID}`;
        result = await nearService.contract.create_named_account_and_claim({
          preferred_name: newAccountName,
        }, {
          gas: '200000000000000',
          signerAccount: tempAccount,
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to claim drop');
    } finally {
      setIsLoading(false);
    }
  };

  const getDropTypeInfo = (drop: any) => {
    if (drop.Near) {
      return {
        type: 'NEAR',
        amount: `${(parseInt(drop.Near.amount) / 1e24).toFixed(4)} NEAR`,
        remaining: drop.Near.counter,
      };
    } else if (drop.FungibleToken) {
      return {
        type: 'Fungible Token',
        amount: `${drop.FungibleToken.amount} tokens`,
        contract: drop.FungibleToken.ft_contract,
        remaining: drop.FungibleToken.counter,
      };
    } else if (drop.NonFungibleToken) {
      return {
        type: 'NFT',
        tokenId: drop.NonFungibleToken.token_id,
        contract: drop.NonFungibleToken.nft_contract,
        remaining: drop.NonFungibleToken.counter,
      };
    }
    return null;
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Card>
          <CardHeader className="text-center">
            <Gift className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <CardTitle className="text-green-600">Claim Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Your tokens have been successfully claimed.
            </p>
            <Button onClick={() => router.push('/')}>
              Create Another Drop
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-6 w-6 mr-2" />
            Claim Your Token Drop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Private Key Input */}
          <div>
            <Label htmlFor="privateKey">Private Key</Label>
            <Input
              id="privateKey"
              type="password"
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value);
                setError(null);
                setKeyValid(false);
                setDropInfo(null);
              }}
              placeholder="ed25519:..."
              className="font-mono text-sm"
            />
            {!keyValid && privateKey && (
              <Button
                onClick={() => validateKey(privateKey)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Validate Key
              </Button>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Drop Information */}
          {keyValid && dropInfo && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <h3 className="font-medium text-green-800 mb-2">Drop Details</h3>
                {(() => {
                  const info = getDropTypeInfo(dropInfo.drop);
                  return info ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge variant="secondary">{info.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-mono">{info.amount}</span>
                      </div>
                      {info.contract && (
                        <div className="flex justify-between">
                          <span>Contract:</span>
                          <span className="font-mono text-xs">{info.contract}</span>
                        </div>
                      )}
                      {info.tokenId && (
                        <div className="flex justify-between">
                          <span>Token ID:</span>
                          <span className="font-mono">{info.tokenId}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Remaining:</span>
                        <span>{info.remaining} claim(s)</span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>
          )}

          {/* Claiming Options */}
          {keyValid && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Choose Claiming Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Claim Mode Selection */}
                <div className="flex space-x-4">
                  <Button
                    variant={claimMode === 'existing' ? 'default' : 'outline'}
                    onClick={() => setClaimMode('existing')}
                    className="flex-1"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Existing Account
                  </Button>
                  <Button
                    variant={claimMode === 'new' ? 'default' : 'outline'}
                    onClick={() => setClaimMode('new')}
                    className="flex-1"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Create New Account
                  </Button>
                </div>

                {/* Existing Account Option */}
                {claimMode === 'existing' && (
                  <div>
                    <Label htmlFor="existingAccount">NEAR Account ID</Label>
                    <Input
                      id="existingAccount"
                      value={existingAccount}
                      onChange={(e) => setExistingAccount(e.target.value)}
                      placeholder="your-account.testnet"
                    />
                  </div>
                )}

                {/* New Account Option */}
                {claimMode === 'new' && (
                  <div>
                    <Label htmlFor="newAccountName">Choose Account Name</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="newAccountName"
                        value={newAccountName}
                        onChange={(e) => setNewAccountName(e.target.value.toLowerCase().replace(/[^a-z0-9\-_]/g, ''))}
                        placeholder="my-new-account"
                      />
                      <span className="text-sm text-gray-500">
                        .{process.env.NEXT_PUBLIC_NETWORK_ID}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      A new NEAR account will be created for you
                    </p>
                  </div>
                )}

                {/* Claim Button */}
                <Button
                  onClick={handleClaim}
                  disabled={
                    isLoading ||
                    (claimMode === 'existing' && !existingAccount) ||
                    (claimMode === 'new' && !newAccountName)
                  }
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-4 w-4" />
                      Claim Drop
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Dashboard and Management

### Drop Dashboard

Create `src/components/Dashboard/DropDashboard.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Trash2, RefreshCw, TrendingUp, Users, Gift } from 'lucide-react';
import { nearService } from '@/services/near';

interface Drop {
  dropId: number;
  type: string;
  remaining: number;
  total: number;
  created: Date;
  status: 'active' | 'completed' | 'expired';
}

export default function DropDashboard() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [stats, setStats] = useState({
    totalDrops: 0,
    activeDrops: 0,
    totalClaimed: 0,
    totalValue: '0',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you'd have methods to fetch user's drops
      // For now, we'll simulate some data
      const mockDrops: Drop[] = [
        {
          dropId: 1,
          type: 'NEAR',
          remaining: 5,
          total: 10,
          created: new Date('2024-01-15'),
          status: 'active',
        },
        {
          dropId: 2,
          type: 'FT',
          remaining: 0,
          total: 20,
          created: new Date('2024-01-10'),
          status: 'completed',
        },
      ];

      setDrops(mockDrops);
      setStats({
        totalDrops: mockDrops.length,
        activeDrops: mockDrops.filter(d => d.status === 'active').length,
        totalClaimed: mockDrops.reduce((acc, d) => acc + (d.total - d.remaining), 0),
        totalValue: '15.5', // Mock value in NEAR
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (---
id: frontend
title: Frontend Integration
sidebar_label: Frontend Integration
description: "Build a complete web interface for the NEAR Drop system, including drop creation, key management, and claiming functionality with React and Next.js."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A great user experience is crucial for token distribution systems. In this section, we'll build a complete frontend that makes creating and claiming drops as simple as a few clicks.

---

## Project Setup

Let's create a Next.js frontend for our NEAR Drop system:

```bash
npx create-next-app@latest near-drop-frontend
cd near-drop-frontend

# Install NEAR dependencies
npm install near-api-js @near-wallet-selector/core @near-wallet-selector/my-near-wallet
npm install @near-wallet-selector/modal-ui qrcode react-qr-code
npm install lucide-react clsx tailwind-merge

# Install development dependencies
npm install -D @types/qrcode
```

### Environment Configuration

Create `.env.local`:

```bash
NEXT_PUBLIC_NETWORK_ID=testnet
NEXT_PUBLIC_CONTRACT_ID=drop-contract.testnet
NEXT_PUBLIC_WALLET_URL=https://testnet.mynearwallet.com
NEXT_PUBLIC_HELPER_URL=https://helper.testnet.near.org
NEXT_PUBLIC_RPC_URL=https://rpc.testnet.near.org
```

---

## Core Components Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/            # Reusable UI components
│   ├── DropCreation/  # Drop creation components
│   ├── DropClaiming/  # Drop claiming components
│   └── Dashboard/     # Dashboard components
├── hooks/             # Custom React hooks
├── services/          # NEAR integration services
├── types/             # TypeScript types
└── utils/             # Utility functions
```

---

## NEAR Integration Layer

### Wallet Connection Service

Create `src/services/near.ts`:

```typescript
import { connect, ConnectConfig, keyStores, WalletConnection } from 'near-api-js';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupModal } from '@near-wallet-selector/modal-ui';

const config: ConnectConfig = {
  networkId: process.env.NEXT_PUBLIC_NETWORK_ID!,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL!,
  walletUrl: process.env.NEXT_PUBLIC_WALLET_URL!,
  helperUrl: process.env.NEXT_PUBLIC_HELPER_URL!,
};

export class NearService {
  near: any;
  wallet: any;
  contract: any;
  selector: any;
  modal: any;

  async initialize() {
    // Initialize NEAR connection
    this.near = await connect(config);
    
    // Initialize wallet selector
    this.selector = await setupWalletSelector({
      network: process.env.NEXT_PUBLIC_NETWORK_ID!,
      modules: [
        setupMyNearWallet(),
      ],
    });

    // Initialize modal
    this.modal = setupModal(this.selector, {
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ID!,
    });

    // Initialize contract
    if (this.selector.isSignedIn()) {
      const wallet = await this.selector.wallet();
      this.contract = new Contract(wallet.account(), process.env.NEXT_PUBLIC_CONTRACT_ID!, {
        viewMethods: [
          'get_drop',
          'get_drop_id_by_key',
          'calculate_near_drop_cost_view',
          'calculate_ft_drop_cost_view',
          'calculate_nft_drop_cost_view',
          'get_nft_drop_details',
          'get_ft_drop_details',
        ],
        changeMethods: [
          'create_near_drop',
          'create_ft_drop',
          'create_nft_drop',
          'claim_for',
          'create_account_and_claim',
          'create_named_account_and_claim',
        ],
      });
    }
  }

  async signIn() {
    this.modal.show();
  }

  async signOut() {
    const wallet = await this.selector.wallet();
    await wallet.signOut();
    this.contract = null;
  }

  isSignedIn() {
    return this.selector?.isSignedIn() || false;
  }

  getAccountId() {
    return this.selector?.store?.getState()?.accounts?.[0]?.accountId || null;
  }
}

export const nearService = new NearService();
```

### Contract Interface Types

Create `src/types/contract.ts`:

```typescript
export interface DropKey {
  public_key: string;
  private_key: string;
}

export interface NearDrop {
  amount: string;
  counter: number;
}

export interface FtDrop {
  ft_contract: string;
  amount: string;
  counter: number;
}

export interface NftDrop {
  nft_contract: string;
  token_id: string;
  counter: number;
}

export type Drop = 
  | { Near: NearDrop }
  | { FungibleToken: FtDrop }
  | { NonFungibleToken: NftDrop };

export interface DropInfo {
  drop_id: number;
  drop: Drop;
  keys: DropKey[];
}

export interface ClaimableKey {
  private_key: string;
  public_key: string;
  drop_id?: number;
  claim_url: string;
}
```

---

## Drop Creation Interface

### Drop Creation Form

Create `src/components/DropCreation/DropCreationForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Minus } from 'lucide-react';
import { nearService } from '@/services/near';
import { generateKeys } from '@/utils/crypto';

interface DropCreationFormProps {
  onDropCreated: (dropInfo: any) => void;
}

export default function DropCreationForm({ onDropCreated }: DropCreationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dropType, setDropType] = useState<'near' | 'ft' | 'nft'>('near');
  const [keyCount, setKeyCount] = useState(5);

  // NEAR drop form state
  const [nearAmount, setNearAmount] = useState('1');

  // FT drop form state
  const [ftContract, setFtContract] = useState('');
  const [ftAmount, setFtAmount] = useState('');

  // NFT drop form state
  const [nftContract, setNftContract] = useState('');
  const [nftTokenId, setNftTokenId] = useState('');

  const handleCreateDrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate keys for the drop
      const keys = generateKeys(keyCount);
      const publicKeys = keys.map(k => k.publicKey);

      let dropId: number;
      let cost: string = '0';

      switch (dropType) {
        case 'near':
          // Calculate cost first
          cost = await nearService.contract.calculate_near_drop_cost_view({
            num_keys: keyCount,
            amount_per_drop: (parseFloat(nearAmount) * 1e24).toString(),
          });
          
          dropId = await nearService.contract.create_near_drop({
            public_keys: publicKeys,
            amount_per_drop: (parseFloat(nearAmount) * 1e24).toString(),
          }, {
            gas: '100000000000000',
            attachedDeposit: cost,
          });
          break;

        case 'ft':
          cost = await nearService.contract.calculate_ft_drop_cost_view({
            num_keys: keyCount,
          });

          dropId = await nearService.contract.create_ft_drop({
            public_keys: publicKeys,
            ft_contract: ftContract,
            amount_per_drop: ftAmount,
          }, {
            gas: '150000000000000',
            attachedDeposit: cost,
          });
          break;

        case 'nft':
          if (keyCount > 1) {
            throw new Error('NFT drops support only 1 key since each NFT is unique');
          }

          cost = await nearService.contract.calculate_nft_drop_cost_view();

          dropId = await nearService.contract.create_nft_drop({
            public_key: publicKeys[0],
            nft_contract: nftContract,
            token_id: nftTokenId,
          }, {
            gas: '100000000000000',
            attachedDeposit: cost,
          });
          break;

        default:
          throw new Error('Invalid drop type');
      }

      // Return drop info with keys
      const dropInfo = {
        dropId,
        dropType,
        keys,
        cost,
      };

      onDropCreated(dropInfo);
    } catch (error) {
      console.error('Error creating drop:', error);
      alert('Failed to create drop: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Token Drop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateDrop} className="space-y-6">
          {/* Drop Type Selection */}
          <Tabs value={dropType} onValueChange={(value) => setDropType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="near">NEAR Tokens</TabsTrigger>
              <TabsTrigger value="ft">Fungible Tokens</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
            </TabsList>

            {/* Key Count Configuration */}
            <div className="flex items-center space-x-2 mt-4">
              <Label htmlFor="keyCount">Number of Keys:</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyCount(Math.max(1, keyCount - 1))}
                  disabled={dropType === 'nft' || keyCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="keyCount"
                  type="number"
                  value={keyCount}
                  onChange={(e) => setKeyCount(parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                  min="1"
                  max={dropType === 'nft' ? 1 : 100}
                  disabled={dropType === 'nft'}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyCount(Math.min(100, keyCount + 1))}
                  disabled={dropType === 'nft' || keyCount >= 100}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* NEAR Drop Configuration */}
            <TabsContent value="near" className="space-y-4">
              <div>
                <Label htmlFor="nearAmount">Amount per Drop (NEAR)</Label>
                <Input
                  id="nearAmount"
                  type="number"
                  step="0.01"
                  value={nearAmount}
                  onChange={(e) => setNearAmount(e.target.value)}
                  placeholder="1.0"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Each recipient will receive {nearAmount} NEAR tokens
                </p>
              </div>
            </TabsContent>

            {/* FT Drop Configuration */}
            <TabsContent value="ft" className="space-y-4">
              <div>
                <Label htmlFor="ftContract">FT Contract Address</Label>
                <Input
                  id="ftContract"
                  value={ftContract}
                  onChange={(e) => setFtContract(e.target.value)}
                  placeholder="token.testnet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ftAmount">Amount per Drop</Label>
                <Input
                  id="ftAmount"
                  value={ftAmount}
                  onChange={(e) => setFtAmount(e.target.value)}
                  placeholder="1000000000000000000000000"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Amount in smallest token units (including decimals)
                </p>
              </div>
            </TabsContent>

            {/* NFT Drop Configuration */}
            <TabsContent value="nft" className="space-y-4">
              <div>
                <Label htmlFor="nftContract">NFT Contract Address</Label>
                <Input
                  id="nftContract"
                  value={nftContract}
                  onChange={(e) => setNftContract(e.target.value)}
                  placeholder="nft.testnet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nftTokenId">Token ID</Label>
                <Input
                  id="nftTokenId"
                  value={nftTokenId}
                  onChange={(e) => setNftTokenId(e.target.value)}
                  placeholder="unique-token-123"
                  required
                />
              </div>
              <p className="text-sm text-orange-600 mt-2">
                ⚠️ NFT drops support only 1 key since each NFT is unique
              </p>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Drop...
              </>
            ) : (
              'Create Drop'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Key Generation Utility

Create `src/utils/crypto.ts`:

```typescript
import { KeyPair } from 'near-api-js';

export interface GeneratedKey {
  publicKey: string;
  privateKey: string;
  keyPair: KeyPair;
}

export function generateKeys(count: number): GeneratedKey[] {
  const keys: GeneratedKey[] = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = KeyPair.fromRandom('ed25519');
    keys.push({
      publicKey: keyPair.publicKey.toString(),
      privateKey: keyPair.secretKey,
      keyPair,
    });
  }
  
  return keys;
}

export function generateClaimUrl(privateKey: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}/claim?key=${encodeURIComponent(privateKey)}`;
}
```

---

## Drop Display and Management

### Drop Results Component

Create `src/components/DropCreation/DropResults.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, QrCode, Share2, ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';
import { generateClaimUrl } from '@/utils/crypto';

interface DropResultsProps {
  dropInfo: {
    dropId: number;
    dropType: string;
    keys: Array<{ publicKey: string; privateKey: string }>;
    cost: string;
  };
}

export default function DropResults({ dropInfo }: DropResultsProps) {
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const claimUrls = dropInfo.keys.map(key => generateClaimUrl(key.privateKey));
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  const downloadKeys = () => {
    const keysData = dropInfo.keys.map((key, index) => ({
      index: index + 1,
      publicKey: key.publicKey,
      privateKey: key.privateKey,
      claimUrl: claimUrls[index],
    }));

    const dataStr = JSON.stringify(keysData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `near-drop-${dropInfo.dropId}-keys.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const downloadQRCodes = async () => {
    // This would generate QR codes as images and download them as a ZIP
    // Implementation depends on additional libraries like JSZip
    console.log('Download QR codes functionality would be implemented here');
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Drop Dashboard</h1>
        <Button onClick={loadDashboardData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Gift className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Drops</p>
                <p className="text-2xl font-bold">{stats.totalDrops}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Drops</p>
                <p className="text-2xl font-bold">{stats.activeDrops}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Claims</p>
                <p className="text-2xl font-bold">{stats.totalClaimed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">Ⓝ</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">{stats.totalValue} NEAR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drops Management */}
      <Card>
        <CardHeader>
          <CardTitle>Your Drops</CardTitle>
        </CardHeader>
        <CardContent>
          {drops.length === 0 ? (
            <div className="text-center py-8">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No drops created yet</p>
              <Button className="mt-4" onClick={() => window.location.href = '/'}>
                Create Your First Drop
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {drops.map((drop) => (
                <Card key={drop.dropId} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">Drop #{drop.dropId}</Badge>
                            <Badge className={getStatusColor(drop.status)}>
                              {drop.status}
                            </Badge>
                            <Badge variant="outline">{drop.type}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>Created: {drop.created.toLocaleDateString()}</span>
                            <span>
                              Progress: {drop.total - drop.remaining}/{drop.total} claimed
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {drop.status === 'active' && drop.remaining === 0 && (
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cleanup
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Claims Progress</span>
                        <span>{Math.round(((drop.total - drop.remaining) / drop.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${((drop.total - drop.remaining) / drop.total) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Main Application Layout

### App Layout

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NearProvider } from '@/providers/NearProvider';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEAR Drop - Token Distribution Made Easy',
  description: 'Create and claim token drops on NEAR Protocol with gasless transactions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NearProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </NearProvider>
      </body>
    </html>
  );
}
```

### NEAR Provider

Create `src/providers/NearProvider.tsx`:

```tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { nearService } from '@/services/near';

interface NearContextType {
  isSignedIn: boolean;
  accountId: string | null;
  signIn: () => void;
  signOut: () => void;
  contract: any;
  isLoading: boolean;
}

const NearContext = createContext<NearContextType | undefined>(undefined);

export function NearProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeNear();
  }, []);

  const initializeNear = async () => {
    try {
      await nearService.initialize();
      
      const signedIn = nearService.isSignedIn();
      const account = nearService.getAccountId();
      
      setIsSignedIn(signedIn);
      setAccountId(account);
      setContract(nearService.contract);
    } catch (error) {
      console.error('Failed to initialize NEAR:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    await nearService.signIn();
    // The page will reload after sign in
  };

  const signOut = async () => {
    await nearService.signOut();
    setIsSignedIn(false);
    setAccountId(null);
    setContract(null);
  };

  return (
    <NearContext.Provider
      value={{
        isSignedIn,
        accountId,
        signIn,
        signOut,
        contract,
        isLoading,
      }}
    >
      {children}
    </NearContext.Provider>
  );
}

export function useNear() {
  const context = useContext(NearContext);
  if (context === undefined) {
    throw new Error('useNear must be used within a NearProvider');
  }
  return context;
}
```

### Navigation Component

Create `src/components/Navigation.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Wallet, User, Menu, X } from 'lucide-react';
import { useNear } from '@/providers/NearProvider';

export default function Navigation() {
  const { isSignedIn, accountId, signIn, signOut, isLoading } = useNear();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NEAR Drop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Create Drop
            </Link>
            <Link href="/claim" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Claim Drop
            </Link>
            {isSignedIn && (
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Dashboard
              </Link>
            )}
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoading ? (
              <Button disabled variant="outline">
                Loading...
              </Button>
            ) : isSignedIn ? (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{accountId}</span>
                </Badge>
                <Button onClick={signOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={signIn} className="flex items-center space-x-2">
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Drop
              </Link>
              <Link 
                href="/claim" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Claim Drop
              </Link>
              {isSignedIn && (
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              <div className="border-t pt-2 mt-2">
                {isLoading ? (
                  <Button disabled variant="outline" className="w-full">
                    Loading...
                  </Button>
                ) : isSignedIn ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{accountId}</span>
                      </Badge>
                    </div>
                    <Button onClick={signOut} variant="outline" className="w-full">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button onClick={signIn} className="w-full flex items-center space-x-2">
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

---

## Page Components

### Home Page

Create `src/app/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useNear } from '@/providers/NearProvider';
import DropCreationForm from '@/components/DropCreation/DropCreationForm';
import DropResults from '@/components/DropCreation/DropResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Wallet, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  const { isSignedIn, signIn } = useNear();
  const [createdDrop, setCreatedDrop] = useState<any>(null);

  if (!isSignedIn) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Token Distribution
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create gasless token drops for NEAR, fungible tokens, and NFTs. 
            Recipients don't need existing accounts to claim their tokens.
          </p>
          <Button onClick={signIn} size="lg" className="text-lg px-8">
            <Wallet className="h-5 w-5 mr-2" />
            Connect Wallet to Start
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gasless Claims</h3>
              <p className="text-gray-600">
                Recipients don't need NEAR tokens to claim their drops thanks to function-call access keys.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Gift className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multiple Token Types</h3>
              <p className="text-gray-600">
                Support for NEAR tokens, fungible tokens (FTs), and non-fungible tokens (NFTs).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Account Creation</h3>
              <p className="text-gray-600">
                New users can create NEAR accounts automatically during the claiming process.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Create Drop</h4>
                <p className="text-sm text-gray-600">Choose token type and amount, generate access keys</p>
              </div>
              <div>
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Distribute Links</h4>
                <p className="text-sm text-gray-600">Share claim links or QR codes with recipients</p>
              </div>
              <div>
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Gasless Claiming</h4>
                <p className="text-sm text-gray-600">Recipients use private keys to claim without gas fees</p>
              </div>
              <div>
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Account Creation</h4>
                <p className="text-sm text-gray-600">New users get NEAR accounts created automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {createdDrop ? (
        <div className="space-y-6">
          <DropResults dropInfo={createdDrop} />
          <div className="text-center">
            <Button
              onClick={() => setCreatedDrop(null)}
              variant="outline"
            >
              Create Another Drop
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <DropCreationForm onDropCreated={setCreatedDrop} />
        </div>
      )}
    </div>
  );
}
```

### Claim Page

Create `src/app/claim/page.tsx`:

```tsx
import ClaimPage from '@/components/DropClaiming/ClaimPage';

export default function Claim() {
  return <ClaimPage />;
}
```

### Dashboard Page

Create `src/app/dashboard/page.tsx`:

```tsx
'use client';

import { useNear } from '@/providers/NearProvider';
import DropDashboard from '@/components/Dashboard/DropDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function Dashboard() {
  const { isSignedIn, signIn } = useNear();

  if (!isSignedIn) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Please connect your wallet to view your drop dashboard.
            </p>
            <Button onClick={signIn}>
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <DropDashboard />;
}
```

---

## Deployment and Configuration

### Build Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
```

### Environment Variables for Production

Create `.env.production`:

```bash
NEXT_PUBLIC_NETWORK_ID=mainnet
NEXT_PUBLIC_CONTRACT_ID=your-contract.near
NEXT_PUBLIC_WALLET_URL=https://app.mynearwallet.com
NEXT_PUBLIC_HELPER_URL=https://helper.near.org
NEXT_PUBLIC_RPC_URL=https://rpc.near.org
```

---

## Testing the Frontend

### Running the Development Server

```bash
npm run dev
```

### Testing Different Scenarios

1. **Wallet Connection**: Test signing in/out with different wallet providers
2. **Drop Creation**: Create drops with different token types and amounts
3. **Key Generation**: Verify keys are generated correctly and securely
4. **Claiming**: Test both existing account and new account claiming flows
5. **QR Code Generation**: Verify QR codes contain correct claim URLs
6. **Mobile Responsiveness**: Test on different screen sizes

---

## Next Steps

You now have a complete frontend for the NEAR Drop system featuring:

✅ **Wallet Integration**: Seamless connection with NEAR wallets
✅ **Drop Creation**: Support for all three token types (NEAR, FT, NFT)
✅ **Key Management**: Secure key generation and distribution
✅ **QR Code Support**: Easy sharing via QR codes
✅ **Claiming Interface**: Simple claiming for both new and existing users
✅ **Dashboard**: Management interface for created drops
✅ **Mobile Responsive**: Works on all devices

---

:::note Frontend Best Practices
- Always validate user inputs before submitting transactions
- Use proper error handling and loading states throughout
- Store sensitive data (private keys) securely and temporarily
- Implement proper wallet connection state management
- Test thoroughly on both testnet and mainnet before production use
:::
