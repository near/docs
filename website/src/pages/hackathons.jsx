import Layout from '@theme/Layout';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Card from '@site/src/components/UI/Card';
import Button from '@site/src/components/UI/Button';
import styles from './hackathons.module.scss';

const AWESOME_NEAR_URL = 'https://raw.githubusercontent.com/near/awesome-near/master/README.md';

const fetcher = (url) => fetch(url).then((res) => res.text());

function processMarkdownLinks(markdown) {
  if (!markdown) return '';
  
  let processed = markdown;
  
  processed = processed.replace(
    /\[([^\]]+)\]\(https:\/\/docs\.near\.org\/([^)]+)\)/g,
    '[$1](/$2)'
  );
  
  processed = processed.replace(
    /\[([^\]]+)\]\(https:\/\/docs\.near\.org\)/g,
    '[$1](/)'
  );
  
  const footerIndex = processed.indexOf('*To add a tool');
  if (footerIndex > -1) {
    processed = processed.substring(0, footerIndex);
  }
  
  return processed;
}

const Hackathons = () => {
  const [awesomeNearContent, setAwesomeNearContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const markdown = await fetcher(AWESOME_NEAR_URL);
        setAwesomeNearContent(markdown);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch awesome-near:', err);
        setError('Failed to load Awesome NEAR content');
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const processedContent = processMarkdownLinks(awesomeNearContent);

  if (loading) {
    return (
      <Layout title="Building on NEAR" description="Helpful resource directory to get started">
        <div className={styles.loadingContainer}>
          <h1>Loading Resources...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Building on NEAR" description="Helpful resource directory to get started">
      <div className={styles.hackathonsPage}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Building on NEAR</h1>
            <p className={styles.subtitle}>
              Helpful resource directory to get started
            </p>
          </header>

          <section className={styles.mainContent}>
            <h2>Getting Started</h2>
            
            <div className={styles.topGrid}>
              <Card className={styles.topCard} variant="icon" icon={<span className={styles.emoji}>🌿</span>}>
                <h3>What is NEAR?</h3>
                <ul>
                  <li><a href="/protocol/basics">NEAR Protocol Basics</a></li>
                  <li><a href="https://docs.near.ai/" target="_blank" rel="noopener noreferrer">NEAR AI Documentation</a></li>
                  <li><a href="https://docs.near-intents.org/near-intents" target="_blank" rel="noopener noreferrer">NEAR Intents</a></li>
                  <li><a href="/tutorials/auction/introduction">Mastering NEAR Tutorial</a></li>
                </ul>
              </Card>

              <Card className={styles.topCard} variant="icon" icon={<span className={styles.emoji}>💬</span>}>
                <h3>Developer Support</h3>
                <p>
                  <a href="https://near.dev/telegram-chats" target="_blank" rel="noopener noreferrer">
                    Join the Telegram Developer Chats
                  </a>
                </p>
              </Card>
              
              <Card className={styles.topCard} variant="icon" icon={<span className={styles.emoji}>🧑‍💻</span>}>
                <h3>Need NEAR AI Credits?</h3>
                <p>
                  <a href="https://www.notion.so/Requesting-NEAR-AI-Cloud-Credits-2deda22d7b6481aea8e1e30282efcb5e" target="_blank" rel="noopener noreferrer">
                    Request NEAR AI Cloud Credits
                  </a>
                </p>
              </Card>
            </div>
          </section>

          <section className={styles.awesomeNearSection}>
            <h2 className={styles.sectionTitle}>Awesome NEAR</h2>
            {error ? (
              <Card className={styles.errorCard}>
                <p>{error}</p>
                <Button href="https://github.com/near/awesome-near" target="_blank">
                  View on GitHub
                </Button>
              </Card>
            ) : (
              <>
                <div className={styles.awesomeNearContent}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => null,
                      h2: ({ children }) => <h2 className={styles.mdH2}>{children}</h2>,
                      h3: ({ children }) => <h3 className={styles.mdH3}>{children}</h3>,
                      table: ({ children }) => <table className={styles.mdTable}>{children}</table>,
                      thead: ({ children }) => <thead className={styles.mdThead}>{children}</thead>,
                      tbody: ({ children }) => <tbody className={styles.mdTbody}>{children}</tbody>,
                      tr: ({ children }) => <tr className={styles.mdTr}>{children}</tr>,
                      td: ({ children }) => <td className={styles.mdTd}>{children}</td>,
                      a: ({ href, children }) => {
                        const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
                        return (
                          <a 
                            href={href} 
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className={styles.mdLink}
                          >
                            {children}
                          </a>
                        );
                      },
                      ul: ({ children }) => <ul className={styles.mdUl}>{children}</ul>,
                      li: ({ children }) => <li className={styles.mdLi}>{children}</li>,
                      code: ({ children }) => <code className={styles.mdCode}>{children}</code>,
                      hr: () => <hr className={styles.mdHr} />,
                      p: ({ children }) => <p className={styles.mdP}>{children}</p>,
                    }}
                  >
                    {processedContent}
                  </ReactMarkdown>
                </div>
                <div className={styles.awesomeNearFooter}>
                  <a href="https://github.com/near/awesome-near" target="_blank" rel="noopener noreferrer">
                    View and contribute to Awesome NEAR on GitHub →
                  </a>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Hackathons;
