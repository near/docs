import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Card from '@site/src/components/UI/Card';

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--12">
          <Heading as="h1" className="hero__title text-center">
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              📕 Oops! We Couldn't Find That Page
            </Translate>
          </Heading>
          <p className="margin-vert--md text-center">
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              Where you following a link? Let us know using the Feedback button and we will setup a
              redirect for you in no time
            </Translate>
          </p>
          <div className="container p404">
            <h4 className="text-center"> Don't give up! Check these awesome resources </h4>
            <div className="row">
              <div className="col col--4">
                <Card
                  title="Understanding NEAR"
                  description="Learn about NEAR and how it works"
                  image={require('@site/static/img/near.jpg').default}
                  href="/protocol/basics"
                  variant="image"
                >
                  <ul>
                    <a href="/protocol/basics">
                      <li>What is NEAR?</li>
                    </a>
                    <a href="/protocol/account-id">
                      <li>Named Accounts</li>
                    </a>
                    <a href="/protocol/access-keys">
                      <li>Access Keys</li>
                    </a>
                    <a href="/protocol/transactions">
                      <li>Transactions</li>
                    </a>
                    <a href="/protocol/gas">
                      <li>Understanding Gas</li>
                    </a>
                  </ul>
                </Card>
              </div>
              <div className="col col--4">
                <Card
                  title="Build"
                  description="Build awesome apps on NEAR"
                  image={require('@site/static/docs/assets/welcome-pages/contracts.png').default}
                  href="/smart-contracts/what-is"
                  variant="image"
                >
                  <ul>
                    <a href="/smart-contracts/what-is">
                      <li>Smart Contracts</li>
                    </a>
                    <a href="/web3-apps/what-is">
                      <li>Web3 Applications</li>
                    </a>
                    <a href="/chain-abstraction/chain-signatures">
                      <li>Multi-Chain Signatures</li>
                    </a>
                    <a href="/primitives/what-is">
                      <li>Primitives (FT, NFT, ...)</li>
                    </a>
                    <a href="/data-infrastructure/what-is">
                      <li>Indexers & Data Solutions</li>
                    </a>
                  </ul>
                </Card>
              </div>
              <div className="col col--4">
                <Card
                  title="Tutorials"
                  description="Lots of tutorials to get you started"
                  image={require('@site/static/docs/assets/welcome-pages/examples.png').default}
                  href="/tutorials/welcome"
                  variant="image"
                >
                  <ul>
                    <a href="/tutorials/examples/count-near">
                      <li>Basic dApps</li>
                    </a>
                    <a href="/tutorials/examples/factory">
                      <li>Advanced Contracts</li>
                    </a>
                    <a href="/tutorials/nfts/introduction">
                      <li>NFT: Zero to Hero</li>
                    </a>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
