// A simple feedback handler with a thumbs up and down
// when one is selected, we mark it somehow so the user knows

import { useState } from "react";

const Feedback = ({ handler }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="feedback-container">
      <button
        className={`feedback-button ${selected === 'up' ? 'thumbs-up' : ''}`}
        onClick={() => {
          setSelected('up');
          handler('yes');
        }}
      >
        👍
      </button>
      <button
        className={`feedback-button ${selected === 'down' ? 'thumbs-down' : ''}`}
        onClick={() => {
          setSelected('down');
          handler('no');
        }}
      >
        👎
      </button>
    </div>
  )
};

export default Feedback;