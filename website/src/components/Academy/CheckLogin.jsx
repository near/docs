import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect } from "react";
import { useAcademyProgress } from "./AcademyProgressContext";

const CheckLogin = ({course}) => {
  if (!course) {
    return <div>Error: No course provided.</div>;
  }

  const {signedAccountId, signIn} = useWalletSelector();
  const {incrementCompletedLessons} = useAcademyProgress(course);
  const localStorageKey = `academy-quiz-${course}-check-login`;

  useEffect(() => {
    const savedStatus = localStorage.getItem(localStorageKey) || "";
    
    if (!savedStatus && signedAccountId ) {
      localStorage.setItem(localStorageKey, 'completed');
      incrementCompletedLessons();
    }
  }, [signedAccountId]);

  if (signedAccountId) {
    return <div>Logged in as: {signedAccountId}</div>;
  } else {
    return <button className="button button--primary button--lg" onClick={() => signIn()}>Create a NEAR WALLET or log in</button>;
  }
}

export default CheckLogin;