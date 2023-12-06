import React from 'react';
import { useState, useEffect } from 'react';
import { useWallet } from '@theme/Gateway/wallet-selector';
import styles from './btn.module.css';

export default function LoginButton(props) {
  const { signedAccountId, logOut, logIn } = useWallet();
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (signedAccountId) {
      setAction(() => logOut);
      setLabel(`Logout`);
    } else {
      setAction(() => logIn);
      setLabel('Login');
    }
  }, [signedAccountId, logOut, logIn, setAction, setLabel]);

  return <button className={styles.btn} onClick={action}> {label} </button>
}
