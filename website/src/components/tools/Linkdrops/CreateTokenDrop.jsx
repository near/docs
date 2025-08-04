import { useState } from 'react';
import styles from './CreateTokenDrop.module.scss';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { toast } from 'react-toastify';
import { network } from '../config';
import { KeyPair } from 'near-api-js';

const parseNearAmount = (amount) => {
  return (parseFloat(amount) * Math.pow(10, 24)).toString();
};

const formatBalance = (balance, decimals = 24) => {
  const balanceStr = balance.toString();
  const integerPart = balanceStr.slice(0, -decimals) || '0';
  const decimalPart = balanceStr.slice(-decimals).padStart(decimals, '0');
  return Number(`${integerPart}.${decimalPart.slice(0, 2)}`);
};

const parseAmount = (amount, decimals) => {
  const [integer, decimal] = amount.split('.');
  const integerPart = integer || '0';
  const decimalPart = decimal || '0';
  return BigInt(integerPart + decimalPart.padEnd(decimals, '0'));
};

const depositForFT = (numberLinks) => 
  parseNearAmount((0.0426 * numberLinks).toString());


const depositForNear = (amountPerLink, numberLinks) =>
  parseNearAmount(((0.0426 + amountPerLink) * numberLinks).toString());

const KEYPOM_CONTRACT_ADDRESS = network.KEYPOM_CONTRACT_ADDRESS;

const generateAndStore = (dropName, dropsNumber) => {
  const keys = [];
  const keysLocalStorage = getKeypomKeys(dropName);
  for (let index = 0; index < dropsNumber; index++) {
    const newKeyPair = KeyPair.fromRandom('ed25519');
    const publicKey = newKeyPair.getPublicKey().toString();
    keys.push(publicKey);
    keysLocalStorage.push({ private: newKeyPair.toString(), public: publicKey });
  }
  setKeypomKeys(dropName, keysLocalStorage);

  return keys;
};

const CreateTokenDrop = ({ user_fts, reload }) => {
  const [formData, setFormData] = useState({
    dropName: '',
    numberLinks: 1,
    amountPerLink: 0
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedToken, setSelectedToken] = useState(user_fts?.[0] || null);
  
  const { signAndSendTransactions, signedAccountId } = useWalletSelector();


  const validateForm = () => {
    const newErrors = {};

    if (!formData.dropName.trim()) {
      newErrors.dropName = 'Token Drop name is required';
    }

    if (!formData.amountPerLink || formData.amountPerLink <= 0) {
      newErrors.amountPerLink = 'Must be greater than 0';
    } else if (selectedToken && formData.amountPerLink > formatBalance(selectedToken.balance, selectedToken.metadata?.decimals)) {
      newErrors.amountPerLink = `Must be equal to or less than ${formatBalance(selectedToken.balance, selectedToken.metadata?.decimals)}`;
    }

    if (!formData.numberLinks || formData.numberLinks < 1 || formData.numberLinks > 30) {
      newErrors.numberLinks = 'Must be between 1 and 30';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTokenChange = (tokenContractId) => {
    const token = user_fts.find(ft => ft.contract_id === tokenContractId);
    setSelectedToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const dropId = Date.now().toString();
    const nearAmount = selectedToken?.contract_id === 'near' ? parseNearAmount(formData.amountPerLink.toString()) : '0';
    const ftAmount = selectedToken?.contract_id === 'near'
      ? '0'
      : parseAmount(formData.amountPerLink.toString(), selectedToken.metadata?.decimals || 24).toString();
    const isFTDrop = selectedToken?.contract_id !== 'near';

    const args = {
      deposit_per_use: nearAmount,
      drop_id: dropId,
      metadata: JSON.stringify({
        dropName: formData.dropName,
      }),
      public_keys: generateAndStore(formData.dropName, formData.numberLinks),
      ft: isFTDrop
        ? {
          sender_id: signedAccountId,
          contract_id: selectedToken.contract_id,
          balance_per_use: ftAmount,
        }
        : undefined,
    };

    const transactions = [
      {
        receiverId: KEYPOM_CONTRACT_ADDRESS,
        signerId: signedAccountId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'create_drop',
              args,
              gas: '300000000000000',
              deposit: isFTDrop ? depositForFT(formData.numberLinks) : depositForNear(formData.amountPerLink, formData.numberLinks),
            },
          },
        ],
      },
    ];

    if (isFTDrop) {
      const amount = BigInt(ftAmount) * BigInt(data.numberLinks);
      transactions.push({
        receiverId: token.contract_id,
        signerId: signedAccountId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'ft_transfer_call',
              args: {
                receiver_id: KEYPOM_CONTRACT_ADDRESS,
                amount: amount.toString(),
                msg: dropId,
              },
              gas: '300000000000000',
              deposit: '1',
            },
          },
        ],
      });
    }

    try {
      console.log(transactions);
      
      await signAndSendTransactions({ transactions });

      toast.success('Linkdrop Created - Copy the link and share it with your friends');

      reload(1000);
    } catch (error) {
      console.log(error);

      toast.error('Error - The linkdrop could not be created');
    }
  }

  if (!selectedToken) {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <p>No tokens available. Please connect your wallet and ensure you have tokens.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Token Drop name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="NEARCon Token Giveaway"
            value={formData.dropName}
            onChange={(e) => handleInputChange('dropName', e.target.value)}
            disabled={!signedAccountId || isSubmitting}
          />
          {errors.dropName && <div className={styles.error}>{errors.dropName}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Select Token</label>
          <select
            className={styles.select}
            value={selectedToken?.contract_id || ''}
            onChange={(e) => handleTokenChange(e.target.value)}
            disabled={!signedAccountId || isSubmitting}
          >
            {user_fts?.map((token, index) => (
              <option key={index} value={token.contract_id}>
                {token.metadata?.symbol || token.symbol || 'Unknown'} ({token.contract_id})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Amount per link</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter an amount"
            value={formData.amountPerLink}
            onChange={(e) => handleInputChange('amountPerLink', parseFloat(e.target.value) || 0)}
            disabled={!signedAccountId || isSubmitting}
            min="0"
            step="any"
          />
          <div className={styles.assistiveText}>
            {formatBalance(selectedToken.balance, selectedToken.metadata?.decimals)} available
          </div>
          {errors.amountPerLink && <div className={styles.error}>{errors.amountPerLink}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Number of links</label>
          <input
            type="number"
            className={styles.input}
            placeholder="1 - 30"
            value={formData.numberLinks}
            onChange={(e) => handleInputChange('numberLinks', parseInt(e.target.value) || 1)}
            disabled={!signedAccountId || isSubmitting}
            min="1"
            max="30"
          />
          {errors.numberLinks && <div className={styles.error}>{errors.numberLinks}</div>}
        </div>

        <button
          type="submit"
          className={`${styles.button} ${isSubmitting ? styles.loading : ''}`}
          disabled={!signedAccountId || isSubmitting}
        >
          {isSubmitting ? '' : 'Create Drop'}
        </button>
      </form>
    </div>
  );
};

export default CreateTokenDrop;