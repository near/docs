import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import CodeBlock from '@theme/CodeBlock';

import { OPTIONS } from './options';
import './styles.scss';

const LandingHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [permanentLabel, setPermanentLabel] = useState(null);
  const typedElement = useRef(null);
  const typedInstance = useRef(null);

  const categories = OPTIONS.map(option => option.name);

  useEffect(() => {
    typedInstance.current = new Typed(typedElement.current, {
      strings: categories,
      typeSpeed: 50,
      backSpeed: 20,
      backDelay: 5000,
      startDelay: 0,
      loop: true,
      onStringTyped: (arrayPos) => {
        setActiveIndex(arrayPos);
      },
    });

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
        typedInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="row landing-hero">
      <div className="col col--5 text--left">
        <h1 className="landing-hero__title-gradient">
          NEAR Protocol, home of
        </h1>
        <h1 >
          <span className="landing-hero__title-typed" ref={typedElement}>
            {permanentLabel}
          </span>
        </h1>

        <p className="landing-hero__description">
          {OPTIONS[activeIndex].description}
        </p>
        <div className="landing-hero__cta">
          <a href={OPTIONS[activeIndex].buttonLink} className="button button--primary button--lg">
            {OPTIONS.map((option, index) => (
              <span
                key={option.buttonText}
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  transform: `translateY(${index === activeIndex ? 0 : '20px'})`,
                  position: index === activeIndex ? 'relative' : 'absolute',
                  width: '100%',
                }}
              >
                {option.buttonText}
              </span>
            ))}
          </a>
        </div>
      </div>
      <div className="col col--7">
        <div className="landing-hero__code-window">
          <div className="landing-hero__code-header">
            <div className="landing-hero__code-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="landing-hero__tabs">
              {OPTIONS.map((option, index) => (
                <button
                  key={option.label}
                  className={`landing-hero__tab ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => {
                    // Stop permanently and detach Typed.js so React can own the content
                    if (typedInstance.current) {
                      typedInstance.current.destroy();
                      typedInstance.current = null;
                    }
                    setPermanentLabel(categories[index]);
                    setActiveIndex(index);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="landing-hero__code-content text--left">
            <CodeBlock language={OPTIONS[activeIndex].language}>
              {OPTIONS[activeIndex].code}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
