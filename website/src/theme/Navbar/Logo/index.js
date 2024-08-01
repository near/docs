import React from 'react';
import Logo from '@theme/Logo';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { isInIframe } from '../../../utils/isInIframe';

export default function NavbarLogo() {
  return (
    <BrowserOnly>
      {() => {
        // if embedded in an iframe, do not show the logo
        if (isInIframe) {
          return null;
        }

        return (
          <Logo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName="navbar__title text--truncate"
          />
        );
      }}
    </BrowserOnly>
  );
}