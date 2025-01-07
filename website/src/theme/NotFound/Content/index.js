import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--12">
          <Heading as="h1" className="hero__title text-center">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              📕 Oops! We Couldn't Find That Page
            </Translate>
          </Heading>
          <p className='margin-vert--md text-center'>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              Where you following a link? Let us know using the Feedback button and we will setup a redirect for you in no time
            </Translate>
          </p>
          <div className="container p404">
            <h4 className='text-center'> Don't give up! Check these awesome resources </h4>
            <div className="row">
              <div className="col col--4">
                <div className="card">
                  <div className="card__image">
                    <img src={require("@site/static/docs/assets/welcome-pages/protocol.png").default} alt="Learn" />
                  </div>
                  <div className="card__body">
                    <h3>Understanding NEAR</h3>
                    Learn about NEAR and how it works
                    <ul className='margin-vert--sm'>
                      <a href="/concepts/basics/protocol"><li>What is NEAR?</li></a>
                      <a href="/concepts/protocol/account-id"><li>Named Accounts</li></a>
                      <a href="/concepts/protocol/access-keys"><li>Access Keys</li></a>
                      <a href="/concepts/protocol/transactions"><li>Transactions</li></a>
                      <a href="/concepts/protocol/gas"><li>Understanding Gas</li></a>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className="card">
                  <div className="card__image">
                    <img src={require("@site/static/docs/assets/welcome-pages/contracts.png").default} alt="Contracts" />
                  </div>
                  <div className="card__body">
                    <h3>Build</h3>
                    Build awesome applications on NEAR
                    <ul className='margin-vert--sm'>
                      <a href="/build/smart-contracts/what-is"><li>Smart Contracts</li></a>
                      <a href="/build/web3-apps/what-is"><li>Web3 Applications</li></a>
                      <a href="/build/chain-abstraction/meta-transactions"><li>Relayers</li></a>
                      <a href="/build/chain-abstraction/chain-signatures"><li>Multi-Chain Signatures</li></a>
                      <a href="/build/primitives/what-is"><li>Primitives (FT, NFT, ...)</li></a>
                      <a href="/build/data-infrastructure/what-is"><li>Indexers & Data Solutions</li></a>
                      <a href="/build/chain-abstraction/data-availability"><li>Data Availability</li></a>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <a href="/tutorials/welcome">
                  <div className="card">
                    <div className="card__image">
                      <img src={require("@site/static/docs/assets/welcome-pages/examples.png").default} alt="Tutorials" />
                    </div>
                    <div className="card__body">
                      <h3>Tutorials</h3>
                      Lots of tutorials to get you started
                      <ul className='margin-vert--sm'>
                        <a href="/tutorials/examples/count-near"><li>Basic dApps</li></a>
                        <a href="/tutorials/examples/factory"><li>Advanced Contracts</li></a>
                        <a href="/tutorials/nfts/introduction"><li>NFT: Zero to Hero</li></a>
                      </ul>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
