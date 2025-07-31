import React from 'react';
import styles from './Linkdrops.module.scss';

const ListTokenDrop = ({ drops }) => {
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  if (!drops || drops.length === 0) {
    return (
      <div className={styles.form}>
        <h3>Your Drops</h3>
        <p className="text-muted">No drops created yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <h3 className="mb-3">Your Drops</h3>
      <div className="row">
        {drops.map((drop, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {drop.type === 'token' ? '💰' : '🖼️'} {drop.name || `Drop #${index + 1}`}
                </h5>
                <p className="card-text">
                  <small className="text-muted">
                    Type: {drop.type || 'Unknown'}<br/>
                    Amount: {drop.amount || 'N/A'}<br/>
                    Remaining: {drop.remaining || 'N/A'}
                  </small>
                </p>
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => copyToClipboard(drop.link || '#')}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTokenDrop;