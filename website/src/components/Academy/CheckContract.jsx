import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect, useState } from "react";
import { useAcademyProgress } from "./AcademyProgressContext";
import './CheckContract.scss';

const CheckContract = ({ course, method }) => {
  if (!method) {
    return <div>Error: No lesson method provided.</div>;
  }
  if (!course) {
    return <div>Error: No course provided.</div>;
  }

  const { signedAccountId, signIn, callFunction } = useWalletSelector();
  const { incrementCompletedLessons } = useAcademyProgress(course);
  const localStorageKey = `academy-quiz-${course}-${method}`;

  const [contractAddress, setContractAddress] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const savedContractAddress = localStorage.getItem(localStorageKey) || "";

    if (savedContractAddress) {
      setContractAddress(savedContractAddress);
      setValidationMessage('✅ Contract verified successfully!');
      setIsError(false);
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contractAddress.trim()) {
      setValidationMessage('Please enter a contract address');
      setIsError(true);
      return;
    }

    setIsValidating(true);
    setValidationMessage('');
    setIsError(false);

    try {
      const response = await callFunction({
        contractId: "eval.testnet",
        method,
        args: { "contract_account_id": contractAddress.trim() },
        gas: '30000000000000',
        deposit: '0'
      });

      setIsValidating(false);
      if (!response) {
        setValidationMessage('❌ Contract verification failed. Please try again.');
        setIsError(true);
        return
      }

      setValidationMessage('✅ Contract verified successfully!');
      if (!(localStorage.getItem(localStorageKey) || "")) incrementCompletedLessons();
      localStorage.setItem(localStorageKey, contractAddress.trim())
      
    } catch (err) {
      console.error("Error during contract verification:", err);
      setIsValidating(false);
      setValidationMessage('❌ Contract verification failed. Please try again.');
      setIsError(true);
    }
  }


  const handlerChange = (e) => {
    setContractAddress(e.target.value);
    if (validationMessage) {
      setValidationMessage('');
      setIsError(false);
    }
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
          <div className="check-contract-input-container">
            <div className="check-contract-input-wrapper">
              <input
                id="contractInput"
                type="text"
                className={`check-contract-input ${validationMessage && !contractAddress.trim() ? 'error' : ''}`}
                value={contractAddress}
                onChange={handlerChange}
                placeholder="e.g., hello-near.testnet or contract.near"
              />
              {validationMessage && !contractAddress.trim() && (
                <div className="margin-top--sm check-contract-error-message">
                  <span>⚠ {validationMessage}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isValidating}
              className={`button button--primary check-contract-submit-button ${isValidating ? 'button--outline' : ''}`}
            >
              {isValidating ? 'Verifying...' : 'Verify Contract'}
            </button>
          </div>
        </div>

        {validationMessage && contractAddress.trim() && (
          <div className={`margin-top--md ${isError ? 'check-contract-error-message' : 'check-contract-success-message'}`}>
            <span>{validationMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default CheckContract;
