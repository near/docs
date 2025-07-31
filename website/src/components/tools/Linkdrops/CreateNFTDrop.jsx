import { useState } from 'react';
import styles from './CreateNFTDrop.module.scss';
import { parseNearAmount } from '@near-js/utils';
import { generateAndStore } from '../../../hooks/useLinkdrops';

const KEYPOM_CONTRACT_ADDRESS = 'v2.keypom.testnet';

const getDeposit = (numberLinks) => parseNearAmount((0.0426 * numberLinks).toString()) || '0';

const CreateNFTDrop = ({ user_collections, reload }) => {
  const [formData, setFormData] = useState({
    dropName: '',
    tokenId: '',
    contractId: '',
    senderId: ''
  });
  const [selectedNft, setSelectedNft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [expandedAccordions, setExpandedAccordions] = useState({});
  const { signedAccountId, signAndSendTransactions } = useWalletSelector();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const toggleAccordion = (contractId) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [contractId]: !prev[contractId]
    }));
  };

  const selectNft = (nft) => {
    setSelectedNft(nft);
    setFormData(prev => ({
      ...prev,
      tokenId: nft.token_id,
      contractId: nft.contract_id,
      senderId: signedAccountId || ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.dropName.trim()) {
      newErrors.dropName = 'Token Drop name is required';
    }
    if (!formData.contractId) {
      newErrors.contractId = 'NFT contract address is required';
    }
    if (!formData.tokenId) {
      newErrors.tokenId = 'Token ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const dropId = Date.now().toString();
      const args = {
        deposit_per_use: '2840000000000000000000',
        drop_id: dropId,
        metadata: JSON.stringify({
          dropName: formData.dropName,
        }),
        public_keys: generateAndStore(formData.dropName, 1),
        nft: {
          sender_id: formData.senderId,
          contract_id: formData.contractId,
        },
      };

      if (!signedAccountId) {
        throw new Error('Please connect your wallet');
      }

      await signAndSendTransactions({
        transactions: [
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
                  deposit: getDeposit(1),
                },
              },
            ],
          },
          {
            receiverId: formData.contractId,
            signerId: signedAccountId,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName: 'nft_transfer_call',
                  args: {
                    receiver_id: KEYPOM_CONTRACT_ADDRESS,
                    token_id: formData.tokenId,
                    msg: dropId,
                  },
                  gas: '300000000000000',
                  deposit: '1',
                },
              },
            ],
          },
        ],
      });

      reload(1000);
      
      // Reset form
      setFormData({
        dropName: '',
        tokenId: '',
        contractId: '',
        senderId: signedAccountId || ''
      });
      setSelectedNft(null);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            disabled={!signedAccountId}
          />
          {errors.dropName && <div className={styles.error}>{errors.dropName}</div>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.text}>Please select one of your NFTs to drop:</div>
          <div className={styles.accordion}>
            {user_collections?.map((collection) =>
              Object.entries(collection).map(([contractId, nfts]) => (
                <div key={contractId} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionTrigger}
                    onClick={() => toggleAccordion(contractId)}
                    aria-expanded={expandedAccordions[contractId] || false}
                  >
                    {contractId}
                  </button>
                  {expandedAccordions[contractId] && (
                    <div className={styles.accordionContent}>
                      <div className={styles.nftGrid}>
                        {nfts?.map((nft) => (
                          <div
                            key={nft.token_id}
                            className={`${styles.nftCard} ${
                              selectedNft?.token_id === nft.token_id ? styles.selected : ''
                            }`}
                            onClick={() => selectNft(nft)}
                          >
                            {nft.media && (
                              <img
                                src={nft.media}
                                alt={nft.title || nft.token_id}
                                className={styles.nftImage}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            )}
                            <div className={styles.nftTitle}>
                              {nft.title || 'Untitled'}
                            </div>
                            <div className={styles.nftTokenId}>
                              ID: {nft.token_id}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>NFT contract address</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Select a Token"
            value={formData.contractId}
            disabled
          />
          {errors.contractId && <div className={styles.error}>{errors.contractId}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Token ID</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Select a Token"
            value={formData.tokenId}
            disabled
          />
          {errors.tokenId && <div className={styles.error}>{errors.tokenId}</div>}
        </div>

        <button
          type="submit"
          className={`${styles.button} ${styles.primary} ${isSubmitting ? styles.loading : ''}`}
          disabled={!signedAccountId || isSubmitting}
        >
          Create Drop
        </button>
      </form>
    </div>
  );
};

export default CreateNFTDrop;