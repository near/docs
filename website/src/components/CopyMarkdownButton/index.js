import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

const CHATGPT_PROMPT = `Read from {{document}} so I can ask you questions about it`
const CLAUDE_PROMPT = `Read from {{document}} so I can answer questions about it`

export default function CopyMarkdownButton({docId}) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const browserUrl = `${window.location.origin}${location.pathname}`;
  const mdUrl = `${window.location.origin}${docId}.md`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchMarkdown = async () => {
    if (content) return content;
    try {
      const response = await fetch(mdUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch markdown content');
      }
      const text = await response.text();
      setContent(text);
      return text;
    } catch (error) {
      console.error('Failed to fetch markdown:', error);
      throw error;
    }
  };

  const handleCopy = async () => {
    try {
      setLoading(true);
      const text = await fetchMarkdown();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy markdown content. The .md file may not be available.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInChatGPT = async () => {
    const prompt = CHATGPT_PROMPT.replace('{{document}}', browserUrl);
    window.open(`https://chatgpt.com/?prompt=${prompt}`, '_blank');
  };

  const handleOpenInClaude = async () => {
    const prompt = CLAUDE_PROMPT.replace('{{document}}', browserUrl);
    window.open(`https://claude.ai/new?q=${prompt}`, '_blank');
  };

  const handleConnectMCPCursor = () => {
    window.open(`cursor:mcp/install?%7B%22name%22%3A%22NEAR%20Docs%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdocs.near.org%2Fmcp%22%7D`, '_blank');
    setIsOpen(false);
  };

  const handleConnectMCPVSCode = () => {
    window.open(`vscode:mcp/install?%7B%22name%22%3A%22NEAR%20Docs%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdocs.near.org%2Fmcp%22%7D`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.buttonGroup}>
        <button
          className={styles.copyButton}
          onClick={handleCopy}
          disabled={loading}
          title="Copy markdown content"
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : copied ? (
            <>
              <CheckIcon />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>Copy Markdown</span>
            </>
          )}
        </button>
        <button
          className={styles.dropdownButton}
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          title="More options"
        >
          <ChevronIcon isOpen={isOpen} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.menuItem}
            onClick={handleOpenInChatGPT}
            disabled={loading}
          >
            <ExternalLinkIcon />
            <span>Open in ChatGPT</span>
          </button>
          <button
            className={styles.menuItem}
            onClick={handleOpenInClaude}
            disabled={loading}
          >
            <ExternalLinkIcon />
            <span>Open in Claude</span>
          </button>
          <button
            className={styles.menuItem}
            onClick={handleConnectMCPCursor}
            disabled={loading}
          >
            <LinkIcon />
            <span>Cursor: Connect MCP</span>
          </button>
          <button
            className={styles.menuItem}
            onClick={handleConnectMCPVSCode}
            disabled={loading}
          >
            <LinkIcon />
            <span>VSCode: Connect MCP</span>
          </button>
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`${styles.icon} ${styles.chevron} ${isOpen ? styles.open : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
