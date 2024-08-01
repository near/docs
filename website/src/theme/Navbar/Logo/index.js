import React from 'react';
import Logo from '@theme/Logo';
import { isInIframe } from '../../../utils/isInIframe';

export default function NavbarLogo() {

  if(isInIframe) return;

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
