import React from 'react';
import { useState, useEffect } from 'react';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import styles from './btn.module.css';

export default function LoginButton(props) {
  const { signedAccountId, signIn, signOut } = useWalletSelector();
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (signedAccountId) {
      setAction(() => signOut);
      setLabel(`Logout`);
    } else {
      setAction(() => signIn);
      setLabel('Login');
    }
  }, [signedAccountId, signIn, signOut, setAction, setLabel]);

  if (props.mobile){
    return <li className='menu__list-item'>
      <button className={`menu__link ${styles.btn}`} onClick={action}> {label} </button>
    </li>
  }else{
    return <button className={`navbar__item navbar__link ${styles.btn}`} onClick={action}> {label} </button>
  }

}