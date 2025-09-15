import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect } from "react";
import useAcademyProgress from "./store/useAcademyProgress";

const CheckLogin = () => {
    const { signedAccountId, signIn } = useWalletSelector();
    const { markLessonComplete, isLessonCompleted } = useAcademyProgress();
    useEffect(() => {
        if (signedAccountId && !isLessonCompleted('create-wallet', 'check-acount', 0)) {
            markLessonComplete('create-wallet', 'check-acount', 0);
        }
    }, [signedAccountId]);
    if (signedAccountId) {
        return <div>Logged in as: {signedAccountId}</div>;
    } else {
        return <button className="button button--primary button--lg" onClick={() => signIn()}>Create a NEAR WALLET or log in</button>;
    }
}

export default CheckLogin;