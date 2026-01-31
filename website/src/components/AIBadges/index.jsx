import React, { useState } from 'react';
import './styles.scss';

const AIBadges = () => {
  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopyUrl = (e, url) => {
    e.preventDefault();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 1000);
    });
  };

  return (
    <div className="ai-badges">
    <a 
        href="https://docs.near.org/mcp" 
        className="ai-badge"
        onClick={(e) => handleCopyUrl(e, 'https://docs.near.org/mcp')}
        style={{ cursor: 'pointer' }}
    >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {copiedUrl === 'https://docs.near.org/mcp' ? 'URL Copied!' : 'MCP Ready'}
    </a>
    <a 
        href="https://docs.near.org/llms.txt" 
        className="ai-badge"
        target="_blank"
        rel="noopener noreferrer"
    >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        LLM.txt Ready
    </a>
    </div>
  );
};

export default AIBadges;
