import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { CATEGORY_STRINGS, OPTIONS } from './options';
import './styles.scss';

const LandingHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const typedElement = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedElement.current, {
      strings: CATEGORY_STRINGS,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 5000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      onStringTyped: (arrayPos) => {
        setActiveIndex(arrayPos);
      },
    });

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="landing-hero">
      <div className="landing-hero__content">
        <div className="landing-hero__left">
          <h2 className="landing-hero__title-gradient">
            NEAR Protocol, the home of
          </h2>
          <h1 >
            <span className="landing-hero__title-typed" ref={typedElement}></span>
          </h1>

          <p className="landing-hero__description">
            Build decentralized applications and AI agents with seamless cross-chain capabilities on
            a layer-1 blockchain built for scale
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
        <div className="landing-hero__right">
          <div className="landing-hero__code-window">
            <div className="landing-hero__code-header">
              <div className="landing-hero__code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="landing-hero__code-title">
                {OPTIONS[activeIndex].label.toLowerCase()}-example.
                {activeIndex === 1 ? 'rs' : activeIndex === 0 ? 'js' : 'js'}
              </div>
            </div>
            <div className="landing-hero__code-content">
              {OPTIONS.map((option, index) => (
                <pre
                  key={option.label}
                  className={`landing-hero__code ${index === activeIndex ? 'active' : ''}`}
                >
                  {option.code}
                </pre>
              ))}
            </div>
          </div>
          <div className="landing-hero__tabs">
            {OPTIONS.map((option, index) => (
              <button
                key={option.label}
                className={`landing-hero__tab ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  // Stop the typing animation and jump to this category
                  if (typedInstance.current) {
                    typedInstance.current.stop();
                  }
                  setActiveIndex(index);
                  // Update the text content directly
                  if (typedElement.current) {
                    typedElement.current.textContent = CATEGORY_STRINGS[index];
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
