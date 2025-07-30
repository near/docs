import { formatNearAmount } from '@near-js/utils';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useWalletSelector } from '../../../hooks/useWalletSelectorMock';
import styles from './FungibleToken.module.scss';


const network = {
  ftContract: 'ft-factory.testnet'
};

const FACTORY_CONTRACT = network.ftContract;
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

const openToast = ({ type, title, description }) => {
  console.log(`[${type.toUpperCase()}] ${title}: ${description}`);
  alert(`${title}\n${description}`);
};

const CreateTokenForm = ({ reload = () => { } }) => {

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { viewFunction, callFunction, getBalance, signedAccountId, signIn, signOut } = useWalletSelector();
  const [requiredDeposit, setRequiredDeposit] = useState('0');

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

  const formData = watch();

  const onSubmit = useCallback(
    async ({ total_supply, decimals, icon, name, symbol }, actuallySubmit) => {
      if (!signedAccountId && actuallySubmit) return;

      total_supply = total_supply || '0';
      decimals = decimals || 0;
      name = name || '';
      symbol = symbol || '';
      icon = icon || [];

      let base64Image = '';
      if (icon[0]) {
        try {
          base64Image = await convertToBase64(icon[0]);
        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }

      const supply = BigInt(total_supply || '0') * BigInt(Math.pow(10, Number(decimals)));

      const args = {
        args: {
          owner_id: signedAccountId || 'mock.testnet',
          total_supply: supply.toString(),
          metadata: {
            spec: 'ft-1.0.0',
            name,
            symbol,
            icon: base64Image,
            decimals: Number(decimals),
          },
        },
        account_id: signedAccountId || 'mock.testnet',
      };

      try {
        const deposit = await viewFunction({
          contractId: FACTORY_CONTRACT,
          method: 'get_required',
          args
        });
        if (deposit) {
          setRequiredDeposit(formatNearAmount(deposit, 2));
        }
      } catch {
        setRequiredDeposit('1.0');
      }

      if (!actuallySubmit) return;

      let result = false;

      try {
        result = await callFunction({
          contractId: FACTORY_CONTRACT,
          method: 'create_token',
          args,
          gas: '300000000000000',
          deposit: requiredDeposit,
        });
      } catch (error) {
        console.error('Token creation failed:', error);
      }

      if (result) {
        openToast({
          type: 'success',
          title: 'Token Created',
          description: `Token ${name} (${symbol}) created successfully`,
        });
        reload(5000);
      } else {
        openToast({
          type: 'error',
          title: 'Error',
          description: 'Failed to create token',
        });
      }
    },
    [signedAccountId, viewFunction, callFunction, reload, requiredDeposit],
  );

  useEffect(() => {
    if (formData && Object.keys(formData).some(key => formData[key])) {
      onSubmit(formData, false);
    }
  }, [onSubmit, formData]);

  return (


    <>


      <h2>Mint a Fungible Token</h2>

      This tool allows you to deploy your own NEP-141 smart contract (Fungible Tokens)

      <div className={styles.container}>

        <form onSubmit={handleSubmit((data) => onSubmit(data, true))} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Token Name</label>
              <input
                className={styles.input}
                placeholder="e.g. Test Token"
                {...register('name', { required: 'Token name is required' })}
                disabled={!signedAccountId}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <Controller
              control={control}
              name="symbol"
              rules={{
                required: 'Symbol is required',
                validate: symbolAvailable,
              }}
              render={({ field, fieldState }) => (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Token Symbol</label>
                  <input
                    className={styles.input}
                    placeholder="e.g. TEST"
                    {...field}
                    disabled={!signedAccountId}
                  />
                  {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                </div>
              )}
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Total Supply</label>
              <input
                className={styles.input}
                placeholder="e.g. 1000"
                {...register('total_supply', {
                  required: 'Total supply is required',
                  pattern: {
                    value: /^[1-9][0-9]*$/,
                    message: 'Total supply must be a whole number greater than 0',
                  },
                })}
                disabled={!signedAccountId}
              />
              {errors.total_supply && <span className={styles.error}>{errors.total_supply.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Decimals</label>
              <input
                className={styles.input}
                type="number"
                placeholder="e.g. 6"
                {...register('decimals', {
                  required: 'Decimals is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Decimals must be non-negative' },
                  max: { value: 24, message: 'Decimals must be 24 or less' },
                })}
                disabled={!signedAccountId}
              />
              {errors.decimals && <span className={styles.error}>{errors.decimals.message}</span>}
            </div>
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
                    onChange={(e) => field.onChange(e.target.files)}
                    disabled={!signedAccountId}
                  />
                  <div className={styles.fileHint}>
                    Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 10kb
                  </div>
                  {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                </div>
              )}
            />
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
                className={`${styles.button} ${styles.primary} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? '' : `Create Token - Cost: ${requiredDeposit} N`}
              </button>
            </div>
          )}
        </form>
      </div>

    </>


  );
};

export default CreateTokenForm;