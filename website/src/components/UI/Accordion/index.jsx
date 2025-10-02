import { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.scss';

const Accordion = ({ title, detail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      // Use a small delay to ensure content is fully rendered
      const updateHeight = () => {
        if (contentRef.current) {
          setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
      };
      
      if (isOpen) {
        // Initial update
        updateHeight();
        // Update again after a short delay to catch any dynamic content
        const timer = setTimeout(updateHeight, 100);
        return () => clearTimeout(timer);
      } else {
        setMaxHeight(0);
      }
    }
  }, [isOpen, detail]);

  return (
    <div className={styles.accordion}>
      <div className={styles.accordion__header} onClick={toggleAccordion}>
        <h3 className={styles.accordion__title}>{title}</h3>
        <div className={`${styles.accordion__icon} ${isOpen ? styles['accordion__icon--open'] : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div 
        className={styles.accordion__content} 
        ref={contentRef}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className={styles.accordion__detail}>
          {detail}
        </div>
      </div>
    </div>
  );
};

export default Accordion;