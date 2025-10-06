import React from 'react';

/**
 * Generic demo button component for linking to live demos
 * 
 * @param {string} url - The URL to the live demo
 * @param {string} text - Optional custom text (defaults to "Try the live demo")
 * @param {boolean} newTab - Whether to open in new tab (defaults to true)
 */
export const TryDemo = ({
  url,
  text = "Try the live demo",
  newTab = true
}) => {
  
  return (
    <div className="try-demo-container" style={{ margin: '2rem 0', textAlign: 'center' }}>
      <a
        href={url}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="try-demo-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 2rem',
          backgroundColor: 'var(--ifm-color-primary)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '1rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.25)',
          position: 'relative',
          overflow: 'hidden',
          minWidth: '200px',
          background: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 100%)',
          letterSpacing: '0.5px'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px) scale(1.02)';
          e.target.style.boxShadow = '0 8px 25px 0 rgba(0, 118, 255, 0.35)';
          e.target.style.background = 'linear-gradient(135deg, var(--ifm-color-primary-dark) 0%, var(--ifm-color-primary-darker) 100%)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 4px 14px 0 rgba(0, 118, 255, 0.25)';
          e.target.style.background = 'linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 100%)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'translateY(0) scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'translateY(-2px) scale(1.02)';
        }}
      >
        {text}
      </a>
    </div>
  );
};

export default TryDemo;
