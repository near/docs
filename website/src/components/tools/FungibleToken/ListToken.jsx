import React, { useState } from 'react';
import styles from './ListToken.module.scss';

const TokenDefault = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="2" fill="#f8f9fa"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#666">T</text>
  </svg>
);

const CircleWavyCheck = ({ color = "#7c3aed", style = {} }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="m9 12 2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CircleWavyQuestion = ({ style = {} }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke="#6c757d" strokeWidth="2" fill="none"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17h.01" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const ListToken = ({ tokens, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const display = tokens.slice(1);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <button 
          className={styles.accordionHeader}
          onClick={toggleAccordion}
          aria-expanded={isExpanded}
        >
          <span>All Your Fungible Tokens</span>
          <span className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}>
            ▼
          </span>
        </button>
        
        <div className={`${styles.accordionContent} ${isExpanded ? styles.show : ''}`}>
          {loading ? (
            <div className={styles.loadingText}>Loading your tokens...</div>
          ) : display.length === 0 ? (
            <div className={styles.emptyText}>You have no tokens</div>
          ) : (
            <div className="table-responsive">
              <table className={`table table-hover ${styles.tokenTable}`}>
                <thead className="table-light">
                  <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contract</th>
                    <th scope="col" className="text-end">Balance</th>
                    <th scope="col" className="text-center">
                      <div className={styles.tooltipWrapper} title="Verification Status">
                        <CircleWavyCheck color="#7c3aed" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {display.map((token) => (
                    <tr key={token.contract_id}>
                      <td>
                        <div className={styles.tokenIcon}>
                          {token.metadata.icon ? (
                            <img
                              src={token.metadata.icon}
                              alt={token.metadata.name}
                              width="25"
                              height="25"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <div style={{ display: token.metadata.icon ? 'none' : 'block' }}>
                            <TokenDefault />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.textClamp} title={token.metadata.symbol}>
                          {token.metadata.symbol}
                        </div>
                      </td>
                      <td>
                        <div className={styles.textClamp} title={token.contract_id}>
                          {token.contract_id}
                        </div>
                      </td>
                      <td className="text-end">
                        <span className={styles.balance}>
                          {(Number(token.balance) / Number(Math.pow(10, Number(token.metadata.decimals)))).toFixed(2)}
                        </span>
                      </td>
                      <td className="text-center">
                        {token.verified ? (
                          <div className={styles.tooltipWrapper} title="Verified Token">
                            <CircleWavyCheck color="#7c3aed" style={{ minWidth: '1rem' }} />
                          </div>
                        ) : (
                          <div className={styles.tooltipWrapper} title="Unverified Token">
                            <CircleWavyQuestion style={{ minWidth: '1rem' }} />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListToken;