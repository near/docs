import Accordion from '../../UI/Accordion';
import styles from './ListToken.module.scss';

const TokenDefault = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="var(--color-bg-subtle)"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="var(--color-text-secondary)">T</text>
  </svg>
);

const CircleWavyCheck = ({ color = "var(--near-brand-primary)", style = {} }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="m9 12 2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CircleWavyQuestion = ({ style = {} }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke="var(--color-text-secondary)" strokeWidth="2" fill="none"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17h.01" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ListToken = ({ tokens, loading }) => {
  const display = tokens.slice(1);

  const accordionContent = (
    <>
      {loading ? (
        <div className={styles.loadingText}>Loading your tokens...</div>
      ) : display.length === 0 ? (
        <div className={styles.emptyText}>You have no tokens</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.tokenTable}>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Contract</th>
                <th className={styles.textEnd}>Balance</th>
                <th className={styles.textCenter}>
                  <div className={styles.tooltipWrapper} title="Verification Status">
                    <CircleWavyCheck />
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
                  <td className={styles.textEnd}>
                    <span className={styles.balance}>
                      {(Number(token.balance) / Number(Math.pow(10, Number(token.metadata.decimals)))).toFixed(2)}
                    </span>
                  </td>
                  <td className={styles.textCenter}>
                    {token.verified ? (
                      <div className={styles.tooltipWrapper} title="Verified Token">
                        <CircleWavyCheck style={{ minWidth: '1rem' }} />
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
    </>
  );

  return (
      <Accordion title="All Your Fungible Tokens" detail={accordionContent} />
  );
};

export default ListToken;