import { Account } from '@near-js/accounts';
import { JsonRpcProvider } from '@near-js/providers';
import { KeyPairSigner } from '@near-js/signers';
import { useState } from 'react';
import './faucet.scss';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { NEAR } from '@near-js/tokens';


async function createAndDeleteTmpAcc(beneficiary) {
  const tmpAccount = `${beneficiary.slice(0, 32).replace('.', '-')}-${Date.now()}.testnet`;
  const signer = KeyPairSigner.fromSecretKey(
    'ed25519:5mixhRL3GcXL9sXx9B4juv6cp3Js4Qo7qY9gWs8bzcQGeSbefXMkCJh5UpmwZYriitMjsppqV4W8zb5bREkYRxLh',
  );
  const publicKey = await signer.getPublicKey();
  await fetch('https://helper.testnet.near.org/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newAccountId: tmpAccount,
      newAccountPublicKey: publicKey.toString(),
    }),
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const provider = new JsonRpcProvider({ url: 'https://rpc.testnet.fastnear.com' });
  const account = new Account(tmpAccount, provider, signer);
  await account.transfer({ receiverId: beneficiary, amount: NEAR.toUnits('5') });
  return account.deleteAccount('testnet');
}

export const Faucet = () => {
  const [error, setError] = useState();
  const [label, setLabel] = useState('Request');

  const requestFaucet = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accountId = formData.get('accountId');

    if (!accountId) {
      setError('Please enter a valid account ID');
      return;
    }

    setLabel('Requesting');
    setError(undefined);

    createAndDeleteTmpAcc(accountId)
      .then(() => setLabel('Funded!'))
      .catch((err) => {
        setError(err.message || 'An error occurred while requesting the faucet');
        setLabel('Request');
      });
  };

  return (
    <Card className="faucet-wrapper">
      <form className="faucet-form" onSubmit={requestFaucet}>
        <div className="field-group">
          <Input
            id="accountId"
            name="accountId"
            label="Testnet Account ID"
            required
            placeholder="account.testnet | 0x123... | implicit address"
            error={error}
            success={label === 'Funded!' ? 'Account funded!' : undefined}
            fullWidth
          />
        </div>
        <Button
          type="submit"
          disabled={label !== 'Request'}
          loading={label === 'Requesting'}
          fullWidth
        >
          {label === 'Requesting' ? 'Requesting' : label}
        </Button>
        <p className="help-text">
          Not working? Please report at <a href="https://t.me/neardev">https://t.me/neardev</a>
        </p>
      </form>
    </Card>
  );
};
