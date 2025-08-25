/**
 * @component MovingForwardSupportSection
 * @description Renders a static support information for Moving Forward section.
 * @returns {JSX.Element} A styled support section.
 */

import React from 'react';

const MovingForwardSupportSection = () => (
  <div className="moving-forward">
    <div className="theme-admonition theme-admonition-tip admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--success">
      <h3 className="moving-forward__support-title">Looking for Support?</h3>
      <p>
        If you have any questions, connect with us on 
        <a href="https://t.me/neardev" target="_blank" rel="noopener noreferrer"> Telegram </a> or
        <a href="https://discord.gg/nearprotocol" target="_blank" rel="noopener noreferrer"> Discord </a>.
      </p>
      <p>Happy coding! 🚀</p>
    </div>
  </div>
);

export default MovingForwardSupportSection;
