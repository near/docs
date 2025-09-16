import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { useEffect } from "react";
import useLessonStore from "./stores/lessonStore";

const CheckLogin = () => {
    const { signedAccountId, signIn } = useWalletSelector();
    const { markLessonAsCompleted, isLessonCompleted } = useLessonStore();
    useEffect(() => {
        if (signedAccountId && !isLessonCompleted('create-wallet', 'check-acount', 0)) {
            markLessonAsCompleted('login');
        }
    }, [signedAccountId]);
    if (signedAccountId) {
        return <div>Logged in as: {signedAccountId}</div>;
    } else {
        return <button className="button button--primary button--lg" onClick={() => signIn()}>Create a NEAR WALLET or log in</button>;
    }
}

export default CheckLogin;