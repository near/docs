/**
 * @component MovingForwardSupportSection
 * @description Renders a static support information for Moving Forward section.
 * @returns {JSX.Element} A styled support section.
 */

import React from 'react';

const MovingForwardSupportSection = () => (
  <div className="theme-admonition theme-admonition-tip admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--success">
    <h4 className="moving-forward__support-title">Need Help?</h4>
      If you have any questions, connect with us on 
      <a href="https://t.me/neardev" target="_blank" rel="noopener noreferrer"> Telegram </a> or
      <a href="https://discord.gg/nearprotocol" target="_blank" rel="noopener noreferrer"> Discord </a>.
      Happy coding! 🚀
  </div>
);

export default MovingForwardSupportSection;
