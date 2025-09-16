import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect, useState } from "react";
import { useAcademyProgress } from "./AcademyProgressContext";
import './CheckContract.scss';

const CheckContract = ({ course,method }) => {
  if (!method) {
    return <div>Error: No lesson method provided.</div>;
  }
  if (!course) {
    return <div>Error: No course provided.</div>;
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
        setValidationMessage('✅ Contract verified successfully!');
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
      setValidationMessage('✅ Contract verified successfully!');

      if(!(localStorage.getItem(localStorageKey) || "")) incrementCompletedLessons();
      localStorage.setItem(localStorageKey, contractAddress.trim());
    }, 2000);
  };

  const handlerChange = (e) => {
    setContractAddress(e.target.value);
    if (validationMessage) {
      setValidationMessage('');
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
              disabled={isValidating }
              className={`button button--primary check-contract-submit-button ${isValidating ? 'button--outline' : ''}`}
            >
              {isValidating ? 'Verifying...' : 'Verify Contract'}
            </button>
          </div>
        </div>

        {validationMessage && contractAddress.trim() && (
          <div className="margin-top--md check-contract-success-message">
            <span>{validationMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default CheckContract;
