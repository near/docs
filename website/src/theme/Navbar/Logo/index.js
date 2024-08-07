import React from 'react';
import Logo from '@theme/Logo';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function NavbarLogo() {
  const isBrowser = useIsBrowser();
  // if embedded in an iframe, do not show the logo
  if (isBrowser && typeof window !== 'undefined' && window.self !== window.top) return null;

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
