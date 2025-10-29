import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './styles.scss';

const CATEGORY_STRINGS = [
  'Artificial Intelligence',
  'Multichain Applications',
  'Smart Contracts',
  'Decentralized Applications',
];

const LandingHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const typedElement = useRef(null);
  const typedInstance = useRef(null);

  const options = [
    {
      label: 'AI',
      buttonText: 'Build AI Agents',
      buttonLink: '/ai/introduction',
      code: (
        <>
          <span className="comment">// Create an AI agent that owns assets</span>
          {'\n'}
          <span className="keyword">import</span> {'{ '}
          <span className="class">ShadeAgent</span>
          {' } '}
          <span className="keyword">from</span> <span className="string">'@near/shade'</span>;{'\n'}
          {'\n'}
          <span className="keyword">const</span> <span className="variable">agent</span> ={' '}
          <span className="keyword">new</span> <span className="class">ShadeAgent</span>({'{'}
          {'\n  '}
          <span className="property">name</span>: <span className="string">'trading-bot'</span>,
          {'\n  '}
          <span className="property">capabilities</span>: [<span className="string">'wallet'</span>,{' '}
          <span className="string">'defi'</span>]{'\n'});{'\n'}
          {'\n'}
          <span className="comment">// Agent can make autonomous decisions</span>
          {'\n'}
          <span className="keyword">await</span> agent.<span className="function">execute</span>(
          {'{'}
          {'\n  '}
          <span className="property">action</span>: <span className="string">'swap'</span>,{'\n  '}
          <span className="property">from</span>: <span className="string">'USDC'</span>,{'\n  '}
          <span className="property">to</span>: <span className="string">'NEAR'</span>,{'\n  '}
          <span className="property">amount</span>: <span className="string">'100'</span>
          {'\n }'}
          {'\n'});
        </>
      ),
    },
    {
      label: 'Multichain',
      buttonText: 'Build Cross-chain Apps',
      buttonLink: '/chain-abstraction/what-is',
      code: (
        <>
          <span className="comment">// Sign transactions on any blockchain</span>
          {'\n'}
          <span className="keyword">import</span> {'{ '}
          <span className="function">setupChainSignatures</span>
          {' } '}
          <span className="keyword">from</span> <span className="string">'@near/multichain'</span>;
          {'\n'}
          {'\n'}
          <span className="keyword">const</span> <span className="variable">signer</span> ={' '}
          <span className="keyword">await</span>{' '}
          <span className="function">setupChainSignatures</span>({'{'}
          {'\n  '}
          <span className="property">accountId</span>:{' '}
          <span className="string">'your-account.near'</span>
          {'\n'});{'\n'}
          {'\n'}
          <span className="comment">// Sign an Ethereum transaction from NEAR</span>
          {'\n'}
          <span className="keyword">const</span> <span className="variable">ethTx</span> ={' '}
          <span className="keyword">await</span> signer.
          <span className="function">signTransaction</span>({'{'}
          {'\n  '}
          <span className="property">chain</span>: <span className="string">'ethereum'</span>,
          {'\n  '}
          <span className="property">to</span>: <span className="string">'0x...'</span>,{'\n  '}
          <span className="property">value</span>:{' '}
          <span className="string">'1000000000000000000'</span>,{'\n  '}
          <span className="property">data</span>: <span className="string">'0x...'</span>
          {'\n'});
        </>
      ),
    },
    {
      label: 'Smart Contracts',
      buttonText: 'Write Smart Contracts',
      buttonLink: '/smart-contracts/quickstart',
      code: (
        <>
          <span className="comment">// Deploy a smart contract in minutes</span>
          {'\n'}
          <span className="keyword">use</span> near_sdk::near;{'\n'}
          {'\n'}
          <span className="decorator">#[near(contract_state)]</span>
          {'\n'}
          <span className="keyword">pub struct</span> <span className="class">Contract</span> {'{'}
          {'\n    '}
          <span className="property">owner</span>: <span className="type">AccountId</span>,{'\n'}
          &rbrace;{'\n'}
          {'\n'}
          <span className="decorator">#[near]</span>
          {'\n'}
          <span className="keyword">impl</span> <span className="class">Contract</span> &lbrace;
          {'\n    '}
          <span className="keyword">pub fn</span> <span className="function">transfer</span>(
          <span className="keyword">&mut</span> <span className="keyword">self</span>,{' '}
          <span className="parameter">to</span>: <span className="type">AccountId</span>,{' '}
          <span className="parameter">amount</span>: <span className="type">U128</span>) &lbrace;
          {'\n        '}
          <span className="comment">// Your logic here</span>
          {'\n        '}
          <span className="keyword">self</span>.<span className="function">internal_transfer</span>
          (to, amount.<span className="function">into</span>());
          {'\n    '}&rbrace;{'\n'}&rbrace;{'\n'}
        </>
      ),
    },
    {
      label: 'dApps',
      buttonText: 'Build Web3 Apps',
      buttonLink: '/web3-apps/quickstart',
      code: (
        <>
          <span className="comment">// Build modern web3 apps with NEAR</span>
          {'\n'}
          <span className="keyword">import</span> {'{ '}
          <span className="class">Wallet</span>
          {' } '}
          <span className="keyword">from</span>{' '}
          <span className="string">'@near-wallet-selector/core'</span>;{'\n'}
          <span className="keyword">import</span> {'{ '}
          <span className="class">Contract</span>
          {' } '}
          <span className="keyword">from</span> <span className="string">'@near/contract'</span>;
          {'\n'}
          {'\n'}
          <span className="comment">// Connect to user's wallet</span>
          {'\n'}
          <span className="keyword">const</span> <span className="variable">wallet</span> ={' '}
          <span className="keyword">await</span> <span className="class">Wallet</span>.
          <span className="function">connect</span>();{'\n'}
          {'\n'}
          <span className="comment">// Initialize your smart contract</span>
          {'\n'}
          <span className="keyword">const</span> <span className="variable">contract</span> ={' '}
          <span className="keyword">new</span> <span className="class">Contract</span>({'{'}
          {'\n  '}
          <span className="property">wallet</span>,{'\n  '}
          <span className="property">contractId</span>: <span className="string">'app.near'</span>,
          {'\n  '}
          <span className="property">methods</span>: [<span className="string">'get_tasks'</span>,{' '}
          <span className="string">'add_task'</span>]{'\n'});{'\n'}
          {'\n'}
          <span className="comment">// Call contract methods</span>
          {'\n'}
          <span className="keyword">const</span> <span className="variable">tasks</span> ={' '}
          <span className="keyword">await</span> contract.
          <span className="function">get_tasks</span>();
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!isUserInteracted) {
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
    }
  }, [isUserInteracted]);

  return (
    <div className="landing-hero">
      <div className="landing-hero__content">
        <div className="landing-hero__left">
          <div className="landing-hero__title-container">
            <h1 className="landing-hero__title">
              <span className="landing-hero__title-gradient">NEAR Protocol Documentation</span>
            </h1>
            <hr className="landing-hero__divider" />
            <h2><span className="landing-hero__title-white">&gt; the blockchain for </span></h2>
            <div className="landing-hero__typed-container">
              {isUserInteracted ? (
                <span className="landing-hero__typed">{CATEGORY_STRINGS[activeIndex]}</span>
              ) : (
                <span className="landing-hero__typed" ref={typedElement}></span>
              )}
            </div>
          </div>
          <p className="landing-hero__description">
            Build decentralized applications and AI agents with seamless cross-chain capabilities on
            a layer-1 blockchain built for scale
          </p>
          <div className="landing-hero__cta">
            <a href={options[activeIndex].buttonLink} className="button button--primary button--lg">
              {options.map((option, index) => (
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
                {options[activeIndex].label.toLowerCase()}-example.
                {activeIndex === 1 ? 'rs' : activeIndex === 0 ? 'js' : 'js'}
              </div>
            </div>
            <div className="landing-hero__code-content">
              {options.map((option, index) => (
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
            {options.map((option, index) => (
              <button
                key={option.label}
                className={`landing-hero__tab ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  // Destroy typed instance and update index first
                  if (typedInstance.current) {
                    typedInstance.current.destroy();
                    typedInstance.current = null;
                  }
                  // Update index in the same batch
                  setActiveIndex(index);
                  // Use setTimeout to ensure index is updated before showing static text
                  setTimeout(() => {
                    setIsUserInteracted(true);
                  }, 10);
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
