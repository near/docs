export function TryOutOnLantstool({ path }) {
  return (
    <div style={{
      padding: '1rem',
      textAlign: 'center',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      margin: '0.5rem 0',
    }}>
      <a
        href="https://app.lantstool.dev/"
        target="_blank"
        rel="noreferrer noopener"
        style={{ fontWeight: 600, color: '#0953FF' }}
      >
        Try it on Lantstool →
      </a>
    </div>
  );
}

export default TryOutOnLantstool;
