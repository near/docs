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
        If you have any questions, connect with us on{' '}
        <a href="https://t.me/neardev" target="_blank" rel="noopener noreferrer">
          Dev Telegram
        </a>{' '}
        or{' '}
        <a href="https://discord.gg/nearprotocol" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
        . We also host <strong>Office Hours</strong> on Discord every Thursday at{' '}
        <strong>11 AM UTC</strong> and <strong>6 PM UTC</strong>. Join our voice channel to ask your
        questions and get live support.
      </p>
      <p>Happy coding! 🚀</p>
    </div>
  </div>
);

export default MovingForwardSupportSection;
