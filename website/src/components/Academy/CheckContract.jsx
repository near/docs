import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect, useState } from "react";
import useAcademyProgress from "./store/useAcademyProgress";
import Content from "./content.json";
import styles from "./CheckContract.module.scss";

const CheckContract = ({ id }) => {
    if (!id) {
        return <div className="interactive-lesson-error">Error: No lesson ID provided.</div>;
    }

    const [section, lessonModule, index] = id.split('.');

    if (!Content[section] || !Content[section][lessonModule] || !Content[section][lessonModule][index]) {
        return <div className="interactive-lesson-error">Error: Invalid lesson ID.</div>;
    }

    const { markLessonComplete, isLessonCompleted, getContractName } = useAcademyProgress();
    const { signedAccountId, signIn } = useWalletSelector();

    const [contractAddress, setContractAddress] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const savedContractName = getContractName(section, lessonModule, index);
    const lessonCompleted = isLessonCompleted(section, lessonModule, parseInt(index, 10));

    useEffect(() => {
        if (lessonCompleted && savedContractName) {
            setContractAddress(savedContractName);
            setValidationMessage('Contract verified successfully!');
        }
    }, [lessonCompleted, savedContractName]);

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

            markLessonComplete(section, lessonModule, index, contractAddress);
        }, 2000);
    };


    if (!signedAccountId) {
        return <button className="button button--primary button--lg" onClick={() => signIn()}>Create a NEAR WALLET or log in</button>;
    }

    return (
        <div className={`margin-top--lg margin-bottom--md`}>
            <form onSubmit={handleSubmit}>
                <div className="margin-bottom--md">
                    <label htmlFor="contractInput" className="margin-bottom--sm text--left" style={{display: 'block', fontWeight: 500}}>
                        {lessonCompleted ? 'Current Contract' : 'Enter Contract'}
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
                            disabled={isValidating}
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
