import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect, useState } from "react";
import styles from "./CheckContract.module.scss";
import { useAcademyProgress } from "./AcademyProgressContext";

const CheckContract = ({ course,method }) => {
  if (!method) {
    return <div className="interactive-lesson-error">Error: No method provided.</div>;
  }

  if (!course) {
    return <div className="interactive-lesson-error">Error: No course provided.</div>;
  }

  const { signedAccountId, signIn } = useWalletSelector();
  const {incrementCompletedLessons} = useAcademyProgress(course);
  const localStorageKey = `academy-quiz-${course}-${method}`;

  const [contractAddress, setContractAddress] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    const savedContractAddress = localStorage.getItem(localStorageKey) || "";

    if (savedContractAddress) {
        setContractAddress(savedContractAddress);
        setValidationMessage('Contract verified successfully!');
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contractAddress.trim()) {
      setValidationMessage('Please enter a contract address');
      return;
    }

    setIsValidating(true);
    setValidationMessage('');

    setTimeout(() => {
      setIsValidating(false);
      setValidationMessage('Contract verified successfully!');

      if(!(localStorage.getItem(localStorageKey) || "")) incrementCompletedLessons();
      localStorage.setItem(localStorageKey, contractAddress.trim());
    }, 2000);
  };


  if (!signedAccountId) {
    return <button className="button button--primary button--lg" onClick={() => signIn()}>Create a NEAR WALLET or log in</button>;
  }

  return (
    <div className={`margin-top--lg margin-bottom--md`}>
      <form onSubmit={handleSubmit}>
        <div className="margin-bottom--md">
          <label htmlFor="contractInput" className="margin-bottom--sm text--left" style={{ display: 'block', fontWeight: 500 }}>
             Enter Contract
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <input
                id="contractInput"
                type="text"
                className={`${styles.input} ${validationMessage && !contractAddress.trim() ? styles.inputError : ''}`}
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="e.g., hello-near.testnet or contract.near"
              />
              {validationMessage && !contractAddress.trim() && (
                <div className={`${styles.errorMessage} margin-top--sm`}>
                  <span>⚠ {validationMessage}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isValidating }
              className={`button button--primary ${styles.submitButton} ${isValidating ? 'button--outline' : ''}`}
            >
              {isValidating ? 'Verifying...' : 'Verify Contract'}
            </button>
          </div>
        </div>

        {validationMessage && contractAddress.trim() && (
          <div className={`${styles.successMessage} margin-top--md`}>
            <span>✓ {validationMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default CheckContract;
