import React from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '@docusaurus/theme-classic/lib/theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '@docusaurus/theme-classic/lib/theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@docusaurus/theme-classic/lib/theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@docusaurus/theme-classic/lib/theme/Navbar/MobileSidebar/SecondaryMenu';

export default function NavbarMobileSidebar() {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  // @gagdiez: commented this to make sidebar always available
  // if (!mobileSidebar.shouldRender) {
  //   return null;
  // }

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}
