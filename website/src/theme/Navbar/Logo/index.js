import React from 'react';
import Logo from '@theme/Logo';
import { isInIframe } from '../../../utils/isInIframe';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function NavbarLogo() {
  const isBrowser = useIsBrowser();

  if (isBrowser && isInIframe) return null;

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
