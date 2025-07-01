import React from 'react';

export function SigsSupport() {
  return (
    <div className="theme-admonition theme-admonition-info admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--info support-container">
      <div className="support-section">
        <h5>Office Hours</h5>
        <p>
          Join our weekly 1-on-1, 15 minute sessions for personalized developer support and guidance for Chain Signatures and Shade Agents.
        </p>
        <div className="support-links">
          <a 
            href="https://calendly.com/owen-proximity/office-hours" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Book a Session
          </a>
        </div>
      </div>

      <div className="support-section">
        <h5>Developer Support Groups</h5>
        <p>
          Access async support and connect with other builders in our Telegram Communities.
        </p>
        <div className="support-links">
          <a 
            href="https://t.me/chain_abstraction" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chain Signatures Group
          </a>
          <span className="link-divider">|</span>
          <a 
            href="https://t.me/shadeagents" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Shade Agents Group
          </a>
        </div>
      </div>

      <div className="support-section last-section">
        <h5>Reach Out</h5>
        <p>
          If your team is building or considering building a production application using Chain Signatures or Shade Agents, please fill our our interest form.
        </p>
        <div className="support-links">
          <a 
            href="https://www.proximity.dev/form-chainsignatures" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chain Signatures Interest Form
          </a>
          <span className="link-divider">|</span>
          <a 
            href="https://www.proximity.dev/form-shadeagents" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Shade Agents Interest Form
          </a>
        </div>
      </div>

      <style jsx>{`
        .support-container {
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        .support-section {
          margin-bottom: 1.2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .support-section.last-section {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .support-section h5 {
          margin-bottom: 0.4rem;
        }

        .support-section p {
          margin-bottom: 0.75rem;
          font-size: 0.95em;
        }

        .support-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .link-divider {
          color: rgba(255, 255, 255, 0.5);
        }

        .support-links a {
          color: #0366d6;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .support-links a:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}