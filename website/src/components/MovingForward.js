/**
 * @component MovingForward
 * @description Renders support information along with optional dynamic content above the support section.
 * @param {string} content - Optional markdown-style content to render above the support links.
 * @returns {JSX.Element} A styled support section with optional content.
 */

import React from "react";
import ReactMarkdown from "react-markdown";

const MovingForward = ({ content }) => (
  <div className="moving-forward">
    {content && (
      <div className="moving-forward__content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    )}
    <div className="theme-admonition theme-admonition-tip admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--success">
      <h3 className="moving-forward__support-title">Looking for Support?</h3>
      <p>
        If you have any questions, connect with us on{" "}
        <a
          href="https://t.me/neardev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dev Telegram
        </a>{" "}
        or{" "}
        <a
          href="https://discord.gg/nearprotocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
        . We also host <strong>Office Hours</strong> on Discord every Thursday
        at <strong>11 AM UTC</strong> and <strong>6 PM UTC</strong>. Join our
        voice channel to ask your questions and get live support.
      </p>
      <p>Happy coding! 🚀</p>
    </div>
  </div>
);

export default MovingForward;
