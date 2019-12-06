/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const RoleButton = props => (
      <div className="pluginWrapper roleButtonWrapper">
        <a className="button" href={props.href} target={props.target} >
          <div className="icon">
            <img src={props.image} alt={props.title} title={props.title} width="100" />
            {
              props.productive ?
              <p>Productive <br />in <strong>{props.productive}</strong></p>
              : ""
            }
          </div>
          <div className="text">
            <h3>{props.title}</h3>
            <p><strong>{props.slogan}</strong></p>
            <div className="list">
              {props.children}
            </div>
          </div>
        </a>
      </div>
    );

    const CoreButton = props => (
      <div className="pluginWrapper roleButtonWrapper core">
        <a className="button" href={props.href} target={props.target} >
          <div className="icon">
            <img src={props.image} alt={props.title} title={props.title} width="100" />
            {
              props.productive ?
              <p>Productive <br />in <strong>{props.productive}</strong></p>
              : ""
            }
          </div>
          <div className="text">
            <h3>{props.title}</h3>
            <p><strong>{props.slogan}</strong></p>
            <div className="list">
              {props.children}
            </div>
          </div>
        </a>
      </div>
    );

    const Updates = () => {
      const updates = [
        <MarkdownBlock>
        **NEAR Lunch and Learn Ep. 02** --
        [Economics in a Sharded Blockchain](https://www.youtube.com/watch?v=QhQi2nAd-r0)
        </MarkdownBlock>
        ,
        <MarkdownBlock>
        **NEAR Lunch and Learn Ep. 01** --
        [Cross Shard Transactions with One Block Delay](https://www.youtube.com/watch?v=mhJXsOKoSdg)
        </MarkdownBlock>
        ,
        <MarkdownBlock>
        [The Beginner’s Guide to the NEAR Blockchain](https://nearprotocol.com/blog/the-beginners-guide-to-the-near-blockchain/)
        _This guide is intended to help anyone interested in ramping up on what the Near team and the NEAR Protocol actually do._
        </MarkdownBlock>
        ]
        .map((update, idx) => (
          <li key={idx}>
            {update}
          </li>
        ));

      return (
        <div>
          <h4>UPDATES</h4>
          <ul className="splashUpdates">
            {updates}
          </ul>
        </div>
      );
    };

    return (
      <SplashContainer>
        <div className="inner">
          <h1 align="center">Choose your path and start building</h1>
          {/* <ProjectTitle siteConfig={siteConfig} /> */}
          <div className="buttonRow">
          <div className="left">
            <RoleButton
              href={docUrl('roles/developer/quickstart')}
              title="App Developers"
              slogan="Build a better future for your users"
              // productive="10 mins"
              image={`${baseUrl}img/icon-developers.svg`}>
              <ul className="subtle">
                <li>Build smart contracts</li>
                <li>Setup your environment and toolchain</li>
                <li>Explore sample applications</li>
              </ul>
            </RoleButton>

            <RoleButton
              href={docUrl('validator/staking-overview')}
              title="Validators"
              slogan="Enable the future you want to see"
              // productive="30 mins"
              image={`${baseUrl}img/icon-validators.svg`}>
              <ul className="subtle">
                <li>Learn how to stake with NEAR</li>
                <li>Setup your environment</li>
                <li>Monitor network status</li>
              </ul>
            </RoleButton>
          </div>
          <div className="middle">
            <CoreButton
              href={docUrl('overview/what-is-near')}
              title="Foundations"
              slogan="The future is NEAR"
              // productive="1 min"
              image={`${baseUrl}img/icon-core.svg`}>
              <ul className="subtle">
                <li>Meet the NEAR platform</li>
                <li>Create your first account</li>
                <li>Send your first transaction</li>
              </ul>
            </CoreButton>
          </div>
          <div className="right">
            <RoleButton
              href={docUrl('roles/integrator/quickstart')}
              title="Integration Partners"
              slogan="We will help you build your future"
              // productive="60 mins"
              image={`${baseUrl}img/icon-integrators.svg`}>
              <ul className="subtle">
                <li>Build key integrations</li>
                <li>Follow development guides</li>
                <li>Build wallets, exchanges and oracles</li>
              </ul>
            </RoleButton>
            <RoleButton
              href={docUrl('contribution/contribution-overview')}
              title="Core Contributors"
              slogan="Help us build the future"
              // productive="30 mins"
              image={`${baseUrl}img/icon-contributors.svg`}>
              <ul className="subtle">
                <li>Understand contribution guidelines</li>
                <li>Setup your environment and toolchain</li>
                <li>Explore development with NEAR</li>
              </ul>
              </RoleButton>
          </div>
          </div>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Each new Docusaurus project has **randomly-generated** theme colors.',
            imageAlign: 'right',
            title: 'Randomly Generated Theme Colors',
          },
        ]}
      </Block>
    );


    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          {/* <LearnHow /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
