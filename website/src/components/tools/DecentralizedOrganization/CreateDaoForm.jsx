/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import styles from './CreateDaoForm.module.scss';
// import LabelWithTooltip from '../Shared/LabelWithTooltip';
import { NEAR } from '@near-js/tokens';
import Card from '../../UI/Card';

const KILOBYTE = 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const DEFAULT_LOGO_CID = 'bafkreiad5c4r3ngmnm7q6v52joaz4yti7kgsgo6ls5pfbsjzclljpvorsu';
const DEFAULT_COVER_CID = 'bafkreicd7wmjfizslx72ycmnsmo7m7mnvfsyrw6wghsaseq45ybslbejvy';

const ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

/**
 * Validates the Account ID according to the NEAR protocol
 * [Account ID rules](https://nomicon.io/DataStructures/Account#account-id-rules).
 *
 * @param accountId - The Account ID string you want to validate.
 */
export function validateAccountId(accountId) {
  return accountId.length >= 2 && accountId.length <= 64 && ACCOUNT_ID_REGEX.test(accountId);
}

function objectToBase64(obj) {
  return btoa(JSON.stringify(obj));
}

/**
 *
 * @param file File
 * @returns IPFS CID
 */
async function uploadFileToIpfs(file) {
  const res = await fetch('https://ipfs.near.social/add', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: file,
  });
  const fileData = await res.json();
  return fileData.cid;
}

const FACTORY_CONTRACT = 'dao.primitives.testnet';

const CreateDaoForm = ({ reload }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      display_name: '',
      description: '',
      account_prefix: '',
      councils: [],
    },
  });
  const { fields, append, remove, prepend } = useFieldArray({
    name: 'councils',
    control: control,
  });

  const { signedAccountId, callFunction, getBalance } = useWalletSelector();

  const data = watch();

  const requiredDeposit = useMemo(() => {
    const minDeposit = BigInt(NEAR.toUnits('4.7')); // deposit for contract code storage
    const storageDeposit = BigInt(NEAR.toUnits('0.1')); // deposit for data storage

    const displayNameSymbols = data.display_name.length;
    const descriptionSymbols = data.description.length;
    const prefixSymbols = data.account_prefix.length;
    const councilsSymbols = data.councils.reduce((previous, current) => previous + current.length, 0);

    const symbols = displayNameSymbols + descriptionSymbols + prefixSymbols + councilsSymbols;

    const pricePerSymbol = NEAR.toUnits('0.00001'); // 10^19 yocto Near
    const totalSymbols = BigInt(symbols) * BigInt(pricePerSymbol);

    const total = minDeposit + storageDeposit + totalSymbols;

    return total.toString();
  }, [data]);

  const isAccountPrefixAvailable = useCallback(
    async (account_prefix) => {
      // we use regex explicitly here as one symbol account_prefix is allowed
      const isValidAccountPrefix = ACCOUNT_ID_REGEX.test(account_prefix);
      if (!isValidAccountPrefix) return 'Sub-account name contains unsupported symbols';

      const doesAccountPrefixIncludeDots = account_prefix.includes('.');
      if (doesAccountPrefixIncludeDots) return 'Sub-account name must be without dots';

      const accountId = `${account_prefix}.${FACTORY_CONTRACT}`;
      const isValidAccount = validateAccountId(accountId);
      if (!isValidAccount) return `Account name is too long`;

      try {
        await getBalance(accountId);
        return `${accountId} already exists`;
      } catch {
        return true;
      }
    },
    [getBalance],
  );

  const isCouncilAccountNameValid = useCallback((accountId) => {
    if (validateAccountId(accountId)) return true;

    return `Account name is invalid`;
  }, []);

  const addCouncil = useCallback(() => {
    append('');
  }, [append]);

  const removeCouncilAtIndex = useCallback(
    (index) => {
      remove(index);
    },
    [remove],
  );

  const isImageFileValid = useCallback((files, maxFileSize, allowedFileTypes) => {
    // image is non-required
    if (!files || files.length === 0) return true;

    const file = files[0];
    if (file.size > maxFileSize) return 'Image is too big';
    if (!allowedFileTypes.includes(file.type)) return 'Not a valid image format';

    return true;
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      if (!isValid) return;

      if (!signedAccountId) return;

      const logoFile = data.logo?.[0];
      const logoCid = logoFile ? await uploadFileToIpfs(logoFile) : DEFAULT_LOGO_CID;

      const coverFile = data.cover?.[0];
      const coverCid = coverFile ? await uploadFileToIpfs(coverFile) : DEFAULT_COVER_CID;

      const metadataBase64 = objectToBase64({
        displayName: data.display_name,
        flagLogo: `https://ipfs.near.social/ipfs/${logoCid}`,
        flagCover: `https://ipfs.near.social/ipfs/${coverCid}`,
      });
      const argsBase64 = objectToBase64({
        config: {
          name: data.account_prefix,
          purpose: data.description,
          metadata: metadataBase64,
        },
        policy: Array.from(new Set(data.councils)),
      });

      const args = {
        name: data.account_prefix,
        // base64-encoded args to be passed in "new" function
        args: argsBase64,
      };

      let result = false;

      try {
        result = await callFunction({
          contractId: FACTORY_CONTRACT,
          method: 'create',
          args,
          gas: '300000000000000',
          deposit: requiredDeposit,
        });
      } catch (error) {}

      if (result) {
        // clean form data
        reset();

        toast.success(`DAO ${data.display_name} was created successfully`);
        reload(2000); // in 2 seconds
      } else {
        toast.error('Failed to create DAO');
      }
    },
    [isValid, signedAccountId, callFunction, requiredDeposit, reset, reload],
  );

  // adds current user as a council by default
  useEffect(() => {
    if (!signedAccountId) return;

    prepend(signedAccountId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedAccountId]);

  return (
    <>
      <h2>Create a Decentralized Autonomous Organization</h2>
      <p>This tool allows you to deploy your own Sputnik DAO smart contract (DAOs)</p>

      <Card>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className={styles.form}>
        <div className={styles.section}>
          <h3>Public Information</h3>
          <div className={styles.formSection}>
            <label className={styles.label}>Organization Name *</label>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <input
                  className={styles.input}
                  placeholder="Display Name for the DAO"
                  {...register('display_name', { required: 'Display name is required' })}
                  disabled={!signedAccountId}
                />
                {errors.display_name && <span className={styles.error}>{errors.display_name.message}</span>}
              </div>

              <Controller
                control={control}
                name="account_prefix"
                rules={{
                  required: 'Sub-account name is required',
                  validate: isAccountPrefixAvailable,
                }}
                render={({ field, fieldState }) => (
                  <div className={styles.formGroup}>
                    <input
                      className={styles.input}
                      placeholder="DAO Account prefix (e.g. my-org)"
                      {...field}
                      disabled={!signedAccountId}
                    />
                    {field.value && (
                      <div className={styles.assistiveText}>
                        {field.value}.{FACTORY_CONTRACT} will be your DAO account
                      </div>
                    )}
                    {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                  </div>
                )}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description *</label>
              <textarea
                className={styles.textarea}
                placeholder="Enter description"
                {...register('description', { required: 'Description is required' })}
                disabled={!signedAccountId}
                rows={3}
              />
              {errors.description && <span className={styles.error}>{errors.description.message}</span>}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Councils</h3>
          <div className={styles.formSection}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.councilRow}>
                <Controller
                  control={control}
                  name={`councils.${index}`}
                  rules={{
                    required: 'Account name is required',
                    validate: isCouncilAccountNameValid,
                  }}
                  render={({ field, fieldState }) => (
                    <div className={styles.formGroup}>
                      <input
                        className={styles.input}
                        placeholder="Enter account name"
                        {...field}
                        disabled={!signedAccountId}
                      />
                      {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                    </div>
                  )}
                />
                <button
                  type="button"
                  className={`${styles.button} ${styles.secondary}`}
                  onClick={() => removeCouncilAtIndex(index)}
                  disabled={!signedAccountId || (index === 0 && fields.length === 1)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className={`${styles.button} ${styles.secondary}`}
              onClick={addCouncil}
              disabled={!signedAccountId}
            >
              Add Council Member
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Design</h3>
          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              <Controller
                control={control}
                name="logo"
                rules={{
                  required: false,
                  validate: (files) => isImageFileValid(files, 500 * KILOBYTE, ALLOWED_IMAGE_TYPES),
                }}
                render={({ field, fieldState }) => (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Logo</label>
                    <input
                      className={styles.fileInput}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => field.onChange(e.target.files)}
                      disabled={!signedAccountId}
                    />
                    <div className={styles.fileHint}>
                      Accepted Formats: PNG, JPEG, WebP | Ideal dimension: 1:1 | Max size: 500kb
                    </div>
                    {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="cover"
                rules={{
                  required: false,
                  validate: (files) => isImageFileValid(files, 3_000 * KILOBYTE, ALLOWED_IMAGE_TYPES),
                }}
                render={({ field, fieldState }) => (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Cover</label>
                    <input
                      className={styles.fileInput}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => field.onChange(e.target.files)}
                      disabled={!signedAccountId}
                    />
                    <div className={styles.fileHint}>
                      Accepted Formats: PNG, JPEG, WebP | Ideal dimension: 2:1 | Max size: 3mb
                    </div>
                    {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.button} ${styles.primary} ${isSubmitting ? styles.loading : ''}`}
          disabled={!signedAccountId || isSubmitting}
        >
          {signedAccountId 
            ? `Create DAO - Cost: ${NEAR.toDecimal(requiredDeposit, 2)} N` 
            : 'Please login'
          }
        </button>
      </form>
    </Card>
    </>
  );
};

export default CreateDaoForm;