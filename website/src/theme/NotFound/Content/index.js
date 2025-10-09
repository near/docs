import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Card from '@site/src/components/UI/Card';

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--12">
          <div style={{margin: "0 auto", textAlign: "center"}}>
          <Heading as="h1" className="hero__title">
              📕 Oops! We Couldn't Find That Page
          </Heading>
          <p className="margin-vert--sm">
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              Where you following a link? Let us know using the Feedback button and we will setup a
              redirect for you in no time
            </Translate>
          </p>
          </div>
          <div className="container margin-vert--sm p404">
            <h4 className="margin-bottom--lg" style={{textAlign: "center"}}> Don't give up! Check these awesome resources </h4>

            <div className="row">
              <div className="col col--4">
                <Card
                  title="Understanding NEAR"
                  description="Learn about NEAR and how it works"
                  image={require('@site/static/assets/site/near.jpg').default}
                  href="/protocol/basics"
                  variant="image"
                >
                  <ul>
                    <li><a href="/protocol/basics">
                      What is NEAR?
                    </a></li>
                    <li><a href="/protocol/account-id">
                      Named Accounts
                    </a></li>
                    <li><a href="/protocol/access-keys">
                      Access Keys
                    </a></li>
                    <li><a href="/protocol/transactions">
                      Transactions
                    </a></li>
                    <li><a href="/protocol/gas">
                      Understanding Gas
                    </a></li>
                  </ul>
                </Card>
              </div>
              <div className="col col--4">
                <Card
                  title="Build"
                  description="Build awesome apps on NEAR"
                  image={require('@site/static/assets/docs/welcome-pages/4.smart-contracts.png').default}
                  href="/smart-contracts/what-is"
                  variant="image"
                >
                  <ul>
                    <li><a href="/smart-contracts/what-is">
                      Smart Contracts
                    </a></li>
                    <li><a href="/web3-apps/what-is">
                      Web3 Applications
                    </a></li>
                    <li><a href="/chain-abstraction/chain-signatures">
                      Multi-Chain Signatures
                    </a></li>
                    <li><a href="/primitives/what-is">
                      Primitives (FT, NFT, ...)
                    </a></li>
                    <li><a href="/data-infrastructure/what-is">
                      Indexers & Data Solutions
                    </a></li>
                  </ul>
                </Card>
              </div>
              <div className="col col--4">
                <Card
                  title="Tutorials"
                  description="Lots of tutorials to get you started"
                  image={require('@site/static/assets/docs/welcome-pages/2.chain-abstraction.png').default}
                  href="/tutorials/welcome"
                  variant="image"
                >
                  <ul>
                    <li><a href="/tutorials/examples/count-near">
                      Basic dApps
                    </a></li>
                    <li><a href="/tutorials/examples/factory">
                      Advanced Contracts
                    </a></li>
                    <li><a href="/tutorials/nfts/introduction">
                      NFT: Zero to Hero
                    </a></li>
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
