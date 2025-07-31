import { useState, useCallback, useEffect } from 'react';
import styles from './MintNft.module.scss';
import { useWalletSelector } from '@near-wallet-selector/react-hook';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
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

  const { callFunction, signedAccountId, signIn } = useWalletSelector();

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
      receiver_id: signedAccountId ,
      token_id: crypto.randomUUID(),
      token_metadata: {
        media: hasImage ? 'https://ipfs.near.social/ipfs/mock-cid' : '',
        title: title || '',
        description: description ,
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
      let file = '';
      const image = formData.image || null;
      const title = formData.title || '';
      const description = formData.description || '';

      if (image) {
        const res = await fetch('https://ipfs.near.social/add', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: image,
        });
        const fileData = await res.json();
        file = fileData.cid;
      }

      const args = {
        receiver_id: signedAccountId,
        token_id: crypto.randomUUID(),
        token_metadata: {
          media: `https://ipfs.near.social/ipfs/${file}`,
          title,
          description,
        },
      };

      await callFunction({
        contractId: 'nft.primitives.testnet',
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
    <>      
    <h2>Mint a Non-Fungible Token</h2>
      <p>
        This tool allows you to deploy your own NEP-171 smart contract (Non-Fungible Tokens)
      </p>
      <div className={styles.container}>
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
              <button
                type="submit"
                className={`${styles.button} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting}
              >
                {`Mint - Cost: ${requiredDeposit} NEAR`}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default MintNft;