import React, { useState, useEffect } from 'react';

function Footer() {
  const [error, setError] = useState(null);
  const [markup, setMarkup] = useState([]);

  useEffect(() => {
    fetch('https://cdn.statically.io/gh/nearprotocol/near-global-footer/main/footer.txt')
      .then(res => res.text())
      .then(
        html => {
          setMarkup(html);
        },
        error => {
          setError(error);
        }
      )
  }, [])

  if (error) {
    return null
  } else {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: markup }} />
      </div>
    );
  }
}

export default Footer;
