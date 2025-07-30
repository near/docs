import { useState, useCallback, useEffect } from 'react';
import { useWalletSelector } from '../../../hooks/useWalletSelectorMock';
import styles from './MintNft.module.scss';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const MintNft = ({ reload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiredDeposit, setRequiredDeposit] = useState('0');

  const { callFunction, signedAccountId, signIn, signOut } = useWalletSelector();

  const validateImage = (file) => {
    if (!file) return 'Image is required';
    if (file.size > MAX_FILE_SIZE) return 'Image size should be less than 3MB';
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'Not a valid image format';
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    const imageError = validateImage(formData.image);
    if (imageError) {
      newErrors.image = imageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const estimateCost = useCallback(async (title, description, hasImage) => {
    const args = {
      receiver_id: signedAccountId || 'mockuser.near',
      token_id: 'mock-token-id',
      token_metadata: {
        media: hasImage ? 'https://ipfs.near.social/ipfs/mock-cid' : '',
        title: title || '',
        description: description || '',
      },
    };

    const stringArgs = JSON.stringify(args);
    const costPerByte = '10000000000000000000';
    const estimatedCost = BigInt(stringArgs.length) * BigInt(costPerByte) * BigInt(4);

    const nearAmount = (Number(estimatedCost) / 1e24).toFixed(2);
    setRequiredDeposit(nearAmount);
  }, [signedAccountId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    handleInputChange('image', file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!signedAccountId) return;

    setIsSubmitting(true);

    try {
      let fileCid = '';
      if (formData.image) {
        fileCid = 'mock-ipfs-cid-' + Date.now();
      }

      const args = {
        receiver_id: signedAccountId,
        token_id: crypto.randomUUID(),
        token_metadata: {
          media: fileCid ? `https://ipfs.near.social/ipfs/${fileCid}` : '',
          title: formData.title,
          description: formData.description,
        },
      };

      await callFunction({
        contractId: 'nft.contract.near', 
        method: 'nft_mint',
        args,
        gas: '300000000000000',
        deposit: (BigInt(requiredDeposit.replace('.', '')) * BigInt(1e22)).toString(),
      });

  
      alert('NFT minted successfully!');

      setFormData({ title: '', description: '', image: null });

      if (reload) reload(5000);

    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    estimateCost(formData.title, formData.description, !!formData.image);
  }, [formData.title, formData.description, formData.image, estimateCost]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mint a Non-Fungible Token</h2>
      <p className={styles.subtitle}>
        This tool allows you to deploy your own NEP-171 smart contract (Non-Fungible Tokens)
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className={styles.input}
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            disabled={!signedAccountId}
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={!signedAccountId}
          />
          {errors.description && <div className={styles.error}>{errors.description}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="image">Image Upload</label>
          <input
            id="image"
            type="file"
            className={styles.fileInput}
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handleFileChange}
            disabled={!signedAccountId}
          />
          <div className={styles.fileHint}>
            Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 3MB
          </div>
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </div>

        {!signedAccountId ? (
          <button
            type="button"
            onClick={signIn}
            className={`${styles.button} ${styles.primary}`}
          >
            Connect Wallet
          </button>
        ) : (
          <div>
            <div style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
              Connected as: {signedAccountId} | <button type="button" onClick={signOut} style={{ background: 'none', border: 'none', color: 'var(--ifm-color-primary)', cursor: 'pointer', textDecoration: 'underline' }}>Disconnect</button>
            </div>
            <button
              type="submit"
              className={`${styles.button} ${isSubmitting ? styles.loading : ''}`}
              disabled={isSubmitting}
            >
              {`Mint - Cost: ${requiredDeposit} NEAR`}
            </button>


            <div className={styles.costInfo}>
              Estimated transaction cost: {requiredDeposit} NEAR
            </div>

          </div>
        )}

      </form>
    </div>
  );
};

export default MintNft;