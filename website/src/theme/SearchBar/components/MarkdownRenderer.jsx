import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardCopy, Check } from 'lucide-react';
import clsx from 'clsx';
import styles from './MarkdownRenderer.module.css';

const CodeBlock = ({ inline, className, children, isDarkTheme, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'code';
  const codeContent = String(children).replace(/\n$/, '');
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return !inline && match ? (
    <div className={styles.codeBlockContainer}>
      <div className={clsx(styles.codeBlockHeader, isDarkTheme ? styles.codeBlockHeaderDark : styles.codeBlockHeaderLight)}>
        <span className={clsx(styles.codeBlockLang, isDarkTheme ? styles.codeBlockLangDark : styles.codeBlockLangLight)}>
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className={clsx(styles.copyButton, isDarkTheme ? styles.copyButtonDark : styles.copyButtonLight, isCopied && styles.copyButtonCopied)}
        >
          {isCopied ? <Check size={12} /> : <ClipboardCopy size={12} />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <SyntaxHighlighter
        style={isDarkTheme ? oneDark : oneLight}
        language={language}
        showLineNumbers={true}
        customStyle={{ margin: 0, borderRadius: 0, border: 'none' }}
        {...props}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const MarkdownRenderer = ({ part, isDarkTheme }) => {
  return (
    <ReactMarkdown
      components={{
        code: (props) => <CodeBlock {...props} isDarkTheme={isDarkTheme} />,
        pre: ({ children }) => <>{children}</>,
        a: (props) => (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        ),
      }}
    >
      {part}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
