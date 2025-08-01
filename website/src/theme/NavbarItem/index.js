import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import LoginButton from './login-button'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';

export default function NavbarItemWrapper(props) {
  if (props.href === 'login') {
    return <LoginButton {...props} />
  } if (props.href === 'color-mode-toggle') {
    return <NavbarColorModeToggle />
  } else {
    return <NavbarItem {...props} />
  }
}