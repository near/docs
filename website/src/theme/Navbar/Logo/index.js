import React from 'react';
import Logo from '@theme/Logo';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function NavbarLogo() {
  return (
    <BrowserOnly>
      {() => {
        // if embedded in an iframe, do not show the logo
        if (typeof window !== 'undefined' && window.self !== window.top) {
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