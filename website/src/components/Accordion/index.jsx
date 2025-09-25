import { useState, useRef, useEffect } from 'react';
import './Accordion.scss';

const Accordion = ({ title, detail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="accordion">
      <div className="accordion__header" onClick={toggleAccordion}>
        <h3 className="accordion__title">{title}</h3>
        <div className={`accordion__icon ${isOpen ? 'accordion__icon--open' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div 
        className="accordion__content" 
        ref={contentRef}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className="accordion__detail">
          {detail}
        </div>
      </div>
    </div>
  );
};

export default Accordion;