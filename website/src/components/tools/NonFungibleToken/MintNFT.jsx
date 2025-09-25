import { useState, useCallback, useEffect } from 'react';
import styles from './MintNFT.module.scss';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { toast } from 'react-toastify';

const NFT_CONTRACT = 'nft.primitives.testnet'
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const MintNFT = ({ reload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [requiredDeposit, setRequiredDeposit] = useState('0');
  const [step, setStep] = useState('form');
  const [imagePreview, setImagePreview] = useState(null);

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
      receiver_id: signedAccountId,
      token_id: crypto.randomUUID(),
      token_metadata: {
        media: hasImage ? 'https://ipfs.near.social/ipfs/mock-cid' : '',
        title: title || '',
        description: description,
      },
    };

    const stringArgs = JSON.stringify(args);
    const costPerByte = '10000000000000000000';
    const estimatedCost = BigInt(stringArgs.length) * BigInt(costPerByte) * BigInt(4);

    setRequiredDeposit(estimatedCost);
  }, [signedAccountId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }

    if (step === 'ready-to-mint') {
      setStep('form');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    handleInputChange('image', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onPreview = async () => {
    if (!validateForm()) return;

    setIsLoadingPreview(true);
    await estimateCost(formData.title, formData.description, !!formData.image);
    setStep('ready-to-mint');
    setIsLoadingPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 'form') {
      await onPreview();
      return;
    }

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
        contractId: NFT_CONTRACT,
        method: 'nft_mint',
        args,
        gas: '300000000000000',
        deposit: requiredDeposit.toString(),
      });

      toast.success('NFT minted successfully!');

      setFormData({ title: '', description: '', image: null });
      setImagePreview(null);
      setStep('form');

      if (reload) reload(5000);

    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 'form') {
      estimateCost(formData.title, formData.description, !!formData.image);
    }
  }, [formData.title, formData.description, formData.image, estimateCost, step]);

  const getButtonText = () => {
    if (isLoadingPreview) return 'Loading...';
    if (isSubmitting) return 'Minting NFT...';
    if (step === 'ready-to-mint') return `Confirm & Mint NFT`;
    return 'Preview NFT Creation';
  };

  return (
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
          {imagePreview && (
            <div className={styles.imagePreview}>
              <label className={styles.label}>Preview:</label>
              <img
                src={imagePreview}
                alt="NFT preview"
                className={styles.previewImage}
              />
            </div>
          )}
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
            {step === 'ready-to-mint' && (
              <div className={styles.pricePreview}>
                <div className={styles.priceAmount}>
                  Minting Cost: <strong>{requiredDeposit} NEAR</strong>
                </div>
                <div className={styles.priceNote}>
                  This amount will be used to cover storage costs on the NEAR blockchain.
                </div>
              </div>
            )}
            <button
              type="submit"
              className={`${styles.button} ${styles.primary} ${(isLoadingPreview || isSubmitting) ? styles.loading : ''} ${step === 'ready-to-mint' ? styles.confirm : ''}`}
              disabled={isLoadingPreview || isSubmitting}
            >
              {getButtonText()}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MintNFT;