import React from 'react';
import Logo from '@theme/Logo';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function NavbarLogo() {

  // if embedded in an iframe, do not show the logo
  <BrowserOnly>
    {() => { if (window.location !== window.parent.location) return null; }}
  </BrowserOnly>

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
