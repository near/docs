import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import LoginButton from './login-button'

export default function NavbarItemWrapper(props) {
  if (props.href === 'login') {
    return <LoginButton {...props} />
  } else {
    return <NavbarItem {...props} />
  }
}
