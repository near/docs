import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './styles.scss';

const LandingHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isTypingCode, setIsTypingCode] = useState(false);
  const typedElement = useRef(null);
  const codeTypedElement = useRef(null);
  const typedInstance = useRef(null);
  const codeTypedInstance = useRef(null);
  const currentIndexRef = useRef(0);
  
  const options = [
    {
      label: 'Artificial Intelligence',
      shortLabel: 'AI',
      quickstartLink: '/ai/introduction',
      buttonText: 'AI Getting Started',
      codeText: `<span class="comment">// Create an AI agent that owns assets</span>
<span class="keyword">import</span> { <span class="class">ShadeAgent</span> } <span class="keyword">from</span> <span class="string">'@near/shade'</span>;

<span class="keyword">const</span> <span class="variable">agent</span> = <span class="keyword">new</span> <span class="class">ShadeAgent</span>({
  <span class="property">name</span>: <span class="string">'trading-bot'</span>,
  <span class="property">capabilities</span>: [<span class="string">'wallet'</span>, <span class="string">'defi'</span>]
});

<span class="comment">// Agent can make autonomous decisions</span>
<span class="keyword">await</span> agent.<span class="function">execute</span>({
  <span class="property">action</span>: <span class="string">'swap'</span>,
  <span class="property">from</span>: <span class="string">'USDC'</span>,
  <span class="property">to</span>: <span class="string">'NEAR'</span>,
  <span class="property">amount</span>: <span class="string">'100'</span>
});`,
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
      shortLabel: 'Smart Contracts',
      quickstartLink: '/smart-contracts/quickstart',
      buttonText: 'Smart Contracts Getting Started',
      codeText: `<span class="comment">// Deploy a smart contract in minutes</span>
<span class="keyword">use</span> near_sdk::near;

<span class="decorator">#[near(contract_state)]</span>
<span class="keyword">pub struct</span> <span class="class">Contract</span> {
    <span class="property">owner</span>: <span class="type">AccountId</span>,
}

<span class="decorator">#[near]</span>
<span class="keyword">impl</span> <span class="class">Contract</span> {
    <span class="keyword">pub fn</span> <span class="function">transfer</span>(<span class="keyword">&mut</span> <span class="keyword">self</span>, <span class="parameter">to</span>: <span class="type">AccountId</span>, <span class="parameter">amount</span>: <span class="type">U128</span>) {
        <span class="comment">// Your logic here</span>
        <span class="keyword">self</span>.<span class="function">internal_transfer</span>(to, amount.<span class="function">into</span>());
    }
}`,
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
      label: 'Multichain Applications',
      shortLabel: 'Multichain',
      quickstartLink: '/chain-abstraction/what-is',
      buttonText: 'Multichain Getting Started',
      codeText: `<span class="comment">// Sign transactions on any blockchain</span>
<span class="keyword">import</span> { <span class="function">setupChainSignatures</span> } <span class="keyword">from</span> <span class="string">'@near/multichain'</span>;

<span class="keyword">const</span> <span class="variable">signer</span> = <span class="keyword">await</span> <span class="function">setupChainSignatures</span>({
  <span class="property">accountId</span>: <span class="string">'your-account.near'</span>
});

<span class="comment">// Sign an Ethereum transaction from NEAR</span>
<span class="keyword">const</span> <span class="variable">ethTx</span> = <span class="keyword">await</span> signer.<span class="function">signTransaction</span>({
  <span class="property">chain</span>: <span class="string">'ethereum'</span>,
  <span class="property">to</span>: <span class="string">'0x...'</span>,
  <span class="property">value</span>: <span class="string">'1000000000000000000'</span>,
  <span class="property">data</span>: <span class="string">'0x...'</span>
});`,
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
      label: 'Web3 Applications',
      shortLabel: 'Web3 Apps',
      quickstartLink: '/web3-apps/quickstart',
      buttonText: 'Web3 Apps Getting Started',
      codeText: `<span class="comment">// Build modern web3 apps with NEAR</span>
<span class="keyword">import</span> { <span class="class">Wallet</span> } <span class="keyword">from</span> <span class="string">'@near-wallet-selector/core'</span>;
<span class="keyword">import</span> { <span class="class">Contract</span> } <span class="keyword">from</span> <span class="string">'@near/contract'</span>;

<span class="comment">// Connect to user's wallet</span>
<span class="keyword">const</span> <span class="variable">wallet</span> = <span class="keyword">await</span> <span class="class">Wallet</span>.<span class="function">connect</span>();

<span class="comment">// Initialize your smart contract</span>
<span class="keyword">const</span> <span class="variable">contract</span> = <span class="keyword">new</span> <span class="class">Contract</span>({
  <span class="property">wallet</span>,
  <span class="property">contractId</span>: <span class="string">'app.near'</span>,
  <span class="property">methods</span>: [<span class="string">'get_tasks'</span>, <span class="string">'add_task'</span>]
});

<span class="comment">// Call contract methods</span>
<span class="keyword">const</span> <span class="variable">tasks</span> = <span class="keyword">await</span> contract.<span class="function">get_tasks</span>();`,
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
    let currentIndex = 0;
    
    const typeCategory = () => {
      // Hide code window first
      setIsTypingCode(false);
      
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }

      // Clear any existing text
      if (typedElement.current) {
        typedElement.current.textContent = '';
      }
      if (codeTypedElement.current) {
        codeTypedElement.current.textContent = '';
      }
      
      typedInstance.current = new Typed(typedElement.current, {
        strings: [options[currentIndexRef.current].label],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '█',
        loop: false,
        backSpeed: null,
        backDelay: null,
        onComplete: () => {
          // Category typed, pause briefly then show and type code
          setTimeout(() => {
            setVisibleIndex(currentIndexRef.current);
            setIsTypingCode(true);
            // Small delay to allow fade in animation
            setTimeout(typeCode, 300);
          }, 200);
        },
      });
    };
    
    const typeCode = () => {
      if (codeTypedInstance.current) {
        codeTypedInstance.current.destroy();
      }
      
      codeTypedInstance.current = new Typed(codeTypedElement.current, {
        strings: [options[currentIndexRef.current].codeText],
        typeSpeed: 5,
        showCursor: false,
        contentType: 'html',
        loop: false,
        backSpeed: null,
        backDelay: null,
        onComplete: () => {
          // Code typed, pause then move to next
          setTimeout(() => {
            // Update indices
            currentIndexRef.current = (currentIndexRef.current + 1) % options.length;
            setActiveIndex(currentIndexRef.current);
            
            // Reset and start next category
            if (typedInstance.current) {
              typedInstance.current.destroy();
            }
            if (codeTypedInstance.current) {
              codeTypedInstance.current.destroy();
            }
            
            setTimeout(typeCategory, 100);
          }, 1500);
        },
      });
    };
    
    // Start the cycle
    setTimeout(typeCategory, 500);
    
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
      if (codeTypedInstance.current) {
        codeTypedInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="landing-hero">
      <div className="landing-hero__content">
          <h1 className="landing-hero__title">
            NEAR Protocol Developer Docs
          </h1>
          <div className="landing-hero__terminal">
            <div className="landing-hero__terminal-header">
              <div className="landing-hero__terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="landing-hero__terminal-title">dev terminal</div>
            </div>
              <div className="landing-hero__terminal-content">
                <div className="landing-hero__terminal-line">
                  <span className="landing-hero__terminal-prompt">$</span>
                  <span className="landing-hero__terminal-command">near --blockchain_for</span>
                  <span className="landing-hero__typed" ref={typedElement}></span>
                </div>
            </div>
          </div>
        <div className={`landing-hero__right ${isTypingCode ? 'typing' : ''}`}>
          <div className="landing-hero__code-window">
            <div className="landing-hero__code-header">
              <div className="landing-hero__code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="landing-hero__code-title">
                {options[visibleIndex].shortLabel.toLowerCase().replace(/\s+/g, '-')}-example.{
                  visibleIndex === 1 ? 'rs' : 'js'
                }
              </div>
            </div>
            <div className="landing-hero__code-content">
              <pre className="landing-hero__code active">
                <span ref={codeTypedElement}></span>
              </pre>
            </div>
            <div className={`landing-hero__cta ${isTypingCode ? 'typing' : ''}`}>
              <a href={options[visibleIndex].quickstartLink} className="button button--primary button--lg">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;

