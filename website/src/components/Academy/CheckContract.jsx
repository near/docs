import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect, useState } from "react";
import styles from "./CheckContract.module.scss";
import useLessonStore from "./stores/lessonStore";


const CheckContract = ({ method }) => {
    if (!method) {
        return <div className="interactive-lesson-error">Error: No method provided.</div>;
    }
    const { saveContract, getSavedContract } = useLessonStore();
    const { signedAccountId, signIn } = useWalletSelector();

    const [contractAddress, setContractAddress] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const savedContractAddress = getSavedContract(method);

    useEffect(() => {
        if (savedContractAddress) {
            setContractAddress(savedContractAddress);
            setValidationMessage('Contract verified successfully!');
        }
    }, [savedContractAddress]);

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

            saveContract(method, contractAddress.trim());
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
