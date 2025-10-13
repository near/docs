import { NEAR } from '@near-js/tokens';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import styles from './FungibleToken.module.scss';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Input from '../../UI/Input';

const FACTORY_CONTRACT = 'token.primitives.testnet';
const MAX_FILE_SIZE = 10 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const validateImage = (files) => {
  if (!files || files.length === 0) return 'Image is required';
  const file = files[0];
  if (file.size > MAX_FILE_SIZE) return 'Image size should be less than 10KB';
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'Not a valid image format';
  return true;
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CreateTokenForm = ({ reload = () => { } }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit'
  });

  const { viewFunction, callFunction, getBalance, signedAccountId, signIn } = useWalletSelector();
  const [requiredDeposit, setRequiredDeposit] = useState('0');
  const [deposit, setDeposit] = useState('0');
  const [step, setStep] = useState('form');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const watchedFields = watch();

  useEffect(() => {
    if (step === 'ready-to-create') {
      setStep('form');
    }
  }, [watchedFields.name, watchedFields.symbol, watchedFields.total_supply, watchedFields.decimals, watchedFields.icon]);

  const symbolAvailable = useCallback(
    async (symbol) => {
      if (!symbol) return true;
      try {
        await getBalance(`${symbol}.${FACTORY_CONTRACT}`);
        return `${symbol}.${FACTORY_CONTRACT} already exists`;
      } catch {
        return true;
      }
    },
    [getBalance],
  );

  const onPreview = useCallback(
    async (formData) => {
      if (!signedAccountId) return;

      setIsLoadingPreview(true);

      const { total_supply, decimals, icon, name, symbol } = formData;

      let base64Image = '';
      if (icon && icon[0]) {
        try {
          base64Image = await convertToBase64(icon[0]);
        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }

      const supply = BigInt(total_supply || '0') * BigInt(Math.pow(10, Number(decimals)));

      const args = {
        args: {
          owner_id: signedAccountId,
          total_supply: supply.toString(),
          metadata: {
            spec: 'ft-1.0.0',
            name: name || '',
            symbol: symbol || '',
            icon: base64Image,
            decimals: Number(decimals) || 0,
          },
        },
      };

      try {
        const deposit = await viewFunction({
          contractId: FACTORY_CONTRACT,
          method: 'get_required',
          args
        });

        if (deposit) {
          setDeposit(deposit)
          setRequiredDeposit(NEAR.toDecimal(deposit, 2));
        }

        setStep('ready-to-create');
      } catch (error) {
        console.error('Error getting required deposit:', error);
        toast.error('Failed to calculate required deposit');
      }

      setIsLoadingPreview(false);
    },
    [signedAccountId, viewFunction],
  );

  const onSubmit = useCallback(
    async (formData) => {
      if (step === 'form') {
        await onPreview(formData);
        return;
      }

      if (!signedAccountId) return;

      const { total_supply, decimals, icon, name, symbol } = formData;

      let base64Image = '';
      if (icon && icon[0]) {
        try {
          base64Image = await convertToBase64(icon[0]);
        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }

      const supply = BigInt(total_supply || '0') * BigInt(Math.pow(10, Number(decimals)));

      const args = {
        args: {
          owner_id: signedAccountId,
          total_supply: supply.toString(),
          metadata: {
            spec: 'ft-1.0.0',
            name: name || '',
            symbol: symbol || '',
            icon: base64Image,
            decimals: Number(decimals) || 0,
          },
        },
      };

      let result = false;

      try {
        result = await callFunction({
          contractId: FACTORY_CONTRACT,
          method: 'create_token',
          args,
          gas: '300000000000000',
          deposit,
        });
      } catch (error) {
        console.error('Token creation failed:', error);
      }

      if (result) {
        toast.success(`Token ${name} (${symbol}) created successfully`);
        reload(5000);
        setStep('form');
      } else {
        toast.error('Failed to create token');
      }
    },
    [step, signedAccountId, onPreview, callFunction, reload, deposit],
  );

  const getButtonText = () => {
    if (isLoadingPreview) return 'Loading...';
    if (isSubmitting) return 'Creating Token...';
    if (step === 'ready-to-create') return `Confirm & Create Token`;
    return 'Preview Token Creation';
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGrid}>
          <Input
            id="token-name"
            label="Token Name"
            placeholder="e.g. Test Token"
            disabled={!signedAccountId}
            error={errors.name?.message}
            {...register('name', { required: 'Token name is required' })}
          />

          <Controller
            control={control}
            name="symbol"
            rules={{
              required: 'Symbol is required',
              validate: symbolAvailable,
            }}
            render={({ field, fieldState }) => (
              <Input
                id="token-symbol"
                label="Token Symbol"
                placeholder="e.g. TEST"
                disabled={!signedAccountId}
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className={styles.formGrid}>
          <Input
            id="total-supply"
            label="Total Supply"
            placeholder="e.g. 1000"
            disabled={!signedAccountId}
            error={errors.total_supply?.message}
            {...register('total_supply', {
              required: 'Total supply is required',
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: 'Total supply must be a whole number greater than 0',
              },
            })}
          />

          <Input
            id="decimals"
            type="number"
            label="Decimals"
            placeholder="e.g. 6"
            disabled={!signedAccountId}
            error={errors.decimals?.message}
            {...register('decimals', {
              required: 'Decimals is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Decimals must be non-negative' },
              max: { value: 24, message: 'Decimals must be 24 or less' },
            })}
          />
        </div>

        <div className={styles.fileInputGroup}>
          <Controller
            control={control}
            name="icon"
            rules={{
              required: 'Image is required',
              validate: validateImage,
            }}
            render={({ field, fieldState }) => (
              <div className={styles.formGroup}>
                <label className={styles.label}>Image Upload</label>
                <input
                  className={styles.fileInput}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setImagePreview(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  disabled={!signedAccountId}
                />
                <div className={styles.fileHint}>
                  Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 10kb
                </div>
                {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}

                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <label className={styles.label}>Preview:</label>
                    <img
                      src={imagePreview}
                      alt="Token icon preview"
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {!signedAccountId ? (
          <Button
            type="button"
            onClick={signIn}
            variant="primary"
            fullWidth
          >
            Connect Wallet
          </Button>
        ) : (
          <div>
            {step === 'ready-to-create' && (
              <div className={styles.pricePreview}>
                <div className={styles.priceAmount}>
                  Creation Cost: <strong>{requiredDeposit} NEAR</strong>
                </div>
                <div className={styles.priceNote}>
                  This amount will be used to cover storage costs on the NEAR blockchain.
                </div>
              </div>
            )}
            <Button
              type="submit"
              variant={step === 'ready-to-create' ? 'primary' : 'primary'}
              fullWidth
              loading={isLoadingPreview || isSubmitting}
              disabled={isLoadingPreview || isSubmitting}
            >
              {getButtonText()}
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default CreateTokenForm;