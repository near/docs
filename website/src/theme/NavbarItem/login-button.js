import React from 'react';
import { useState, useEffect } from 'react';
import { useWallet } from '@theme/scripts/wallet-selector';
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

  if (props.mobile){
    return <li className='menu__list-item'>
      <button className={`menu__link ${styles.btn}`} onClick={action}> {label} </button>
    </li>
  }else{
    return <button className={`navbar__item navbar__link ${styles.btn}`} onClick={action}> {label} </button>
  }

}
