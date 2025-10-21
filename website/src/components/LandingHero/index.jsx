import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './styles.scss';

const LandingHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const typedElement = useRef(null);
  
  const options = [
    {
      label: 'AI',
      code: (
        <>
          <span className="comment">// Create an AI agent that owns assets</span>{'\n'}
          <span className="keyword">import</span> {'{ '}<span className="class">ShadeAgent</span>{' } '}<span className="keyword">from</span> <span className="string">'@near/shade'</span>;{'\n'}
          {'\n'}
          <span className="keyword">const</span> <span className="variable">agent</span> = <span className="keyword">new</span> <span className="class">ShadeAgent</span>({'{'}
          {'\n  '}<span className="property">name</span>: <span className="string">'trading-bot'</span>,
          {'\n  '}<span className="property">capabilities</span>: [<span className="string">'wallet'</span>, <span className="string">'defi'</span>]
          {'\n'});{'\n'}
          {'\n'}
          <span className="comment">// Agent can make autonomous decisions</span>{'\n'}
          <span className="keyword">await</span> agent.<span className="function">execute</span>({'{'}
          {'\n  '}<span className="property">action</span>: <span className="string">'swap'</span>,
          {'\n  '}<span className="property">from</span>: <span className="string">'USDC'</span>,
          {'\n  '}<span className="property">to</span>: <span className="string">'NEAR'</span>,
          {'\n  '}<span className="property">amount</span>: <span className="string">'100'</span>
          {'\n'});
        </>
      )
    },
    {
      label: 'Smart Contracts',
      code: (
        <>
          <span className="comment">// Deploy a smart contract in minutes</span>{'\n'}
          <span className="keyword">use</span> near_sdk::near;{'\n'}
          {'\n'}
          <span className="decorator">#[near(contract_state)]</span>{'\n'}
          <span className="keyword">pub struct</span> <span className="class">Contract</span> {'{'}
          {'\n    '}<span className="property">owner</span>: <span className="type">AccountId</span>,
          {'\n'}&rbrace;{'\n'}
          {'\n'}
          <span className="decorator">#[near]</span>{'\n'}
          <span className="keyword">impl</span> <span className="class">Contract</span> &lbrace;
          {'\n    '}<span className="keyword">pub fn</span> <span className="function">transfer</span>(<span className="keyword">&mut</span> <span className="keyword">self</span>, <span className="parameter">to</span>: <span className="type">AccountId</span>, <span className="parameter">amount</span>: <span className="type">U128</span>) &lbrace;
          {'\n        '}<span className="comment">// Your logic here</span>
          {'\n        '}<span className="keyword">self</span>.<span className="function">internal_transfer</span>(to, amount.<span className="function">into</span>());
          {'\n    '}&rbrace;{'\n'}&rbrace;{'\n'}
        </>
      )
    },
    {
      label: 'Multichain',
      code: (
        <>
          <span className="comment">// Sign transactions on any blockchain</span>{'\n'}
          <span className="keyword">import</span> {'{ '}<span className="function">setupChainSignatures</span>{' } '}<span className="keyword">from</span> <span className="string">'@near/multichain'</span>;{'\n'}
          {'\n'}
          <span className="keyword">const</span> <span className="variable">signer</span> = <span className="keyword">await</span> <span className="function">setupChainSignatures</span>({'{'}
          {'\n  '}<span className="property">accountId</span>: <span className="string">'your-account.near'</span>
          {'\n'});{'\n'}
          {'\n'}
          <span className="comment">// Sign an Ethereum transaction from NEAR</span>{'\n'}
          <span className="keyword">const</span> <span className="variable">ethTx</span> = <span className="keyword">await</span> signer.<span className="function">signTransaction</span>({'{'}
          {'\n  '}<span className="property">chain</span>: <span className="string">'ethereum'</span>,
          {'\n  '}<span className="property">to</span>: <span className="string">'0x...'</span>,
          {'\n  '}<span className="property">value</span>: <span className="string">'1000000000000000000'</span>,
          {'\n  '}<span className="property">data</span>: <span className="string">'0x...'</span>
          {'\n'});
        </>
      )
    },
    {
      label: 'Web3 Apps',
      code: (
        <>
          <span className="comment">// Build modern web3 apps with NEAR</span>{'\n'}
          <span className="keyword">import</span> {'{ '}<span className="class">Wallet</span>{' } '}<span className="keyword">from</span> <span className="string">'@near-wallet-selector/core'</span>;{'\n'}
          <span className="keyword">import</span> {'{ '}<span className="class">Contract</span>{' } '}<span className="keyword">from</span> <span className="string">'@near/contract'</span>;{'\n'}
          {'\n'}
          <span className="comment">// Connect to user's wallet</span>{'\n'}
          <span className="keyword">const</span> <span className="variable">wallet</span> = <span className="keyword">await</span> <span className="class">Wallet</span>.<span className="function">connect</span>();{'\n'}
          {'\n'}
          <span className="comment">// Initialize your smart contract</span>{'\n'}
          <span className="keyword">const</span> <span className="variable">contract</span> = <span className="keyword">new</span> <span className="class">Contract</span>({'{'}
          {'\n  '}<span className="property">wallet</span>,
          {'\n  '}<span className="property">contractId</span>: <span className="string">'app.near'</span>,
          {'\n  '}<span className="property">methods</span>: [<span className="string">'get_tasks'</span>, <span className="string">'add_task'</span>]
          {'\n'});{'\n'}
          {'\n'}
          <span className="comment">// Call contract methods</span>{'\n'}
          <span className="keyword">const</span> <span className="variable">tasks</span> = <span className="keyword">await</span> contract.<span className="function">get_tasks</span>();
        </>
      )
    }
  ];

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ['Artificial Intelligence', 'Smart Contracts', 'Multichain', 'Decentralized Applications'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      onStringTyped: (arrayPos) => {
        setActiveIndex(arrayPos);
      },
    });
    
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="landing-hero">
      <div className="landing-hero__content">
        <div className="landing-hero__left">
          <h1 className="landing-hero__title">
            NEAR Protocol
          </h1>
          <div className="landing-hero__subtitle-container">
            <h2 className="landing-hero__subtitle">
              The Blockchain for:
              <br />
              <span className="landing-hero__typed" ref={typedElement}></span>
            </h2>
          </div>
          <p className="landing-hero__description">
            Build decentralized applications and AI agents with seamless cross-chain capabilities on a layer-1 blockchain built for scale
          </p>
          <div className="landing-hero__cta">
            <a href="/protocol/basics" className="button button--primary button--lg">
              Get Started
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
                {options[activeIndex].label.toLowerCase()}-example.{
                  activeIndex === 1 ? 'rs' : activeIndex === 0 ? 'js' : 'js'
                }
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
        </div>
      </div>
    </div>
  );
};

export default LandingHero;

