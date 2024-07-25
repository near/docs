import React from 'react';
import Logo from '@theme/Logo';
export default function NavbarLogo() {

  // if embedded in an iframe, do not show the logo
  if (window.location !== window.parent.location) {
    return null;
  }

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
