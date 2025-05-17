import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardCopy, Check } from 'lucide-react';

const CodeBlock = ({ node, inline, className, children, isDarkTheme, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return !inline && match ? (
    <div className="code-block-container">
      <button onClick={copyToClipboard} className={`code-copy-button ${isCopied ? 'copied' : ''}`}>
        {isCopied ? <Check size={16} /> : <ClipboardCopy size={16} />}
      </button>
      <SyntaxHighlighter
        style={isDarkTheme ? oneDark : oneLight}
        language={match[1]}
        showLineNumbers={true}
        // PreTag={ ({ children }) => <div>{children}</div> }
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
        a: ({ node, ...props }) => (
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
