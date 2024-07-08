---
id: 어서오세요
title: NEAR - Your Gateway to an Open Web
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

Welcome, this is the starting point for all NEAR documentation. Learn to build and publish blockchain applications. Embrace the power of Web3.

<div className="row">
  <div className="col col--4">
    <a href="/concepts/welcome">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/protocol.png").default} alt="Learn" />
        </div>
        <div className="card__body">
          <h3>Understanding NEAR</h3>
          Learn what NEAR is and how it works
        </div>
      </div>
    </a>
  </div>
  <div className="col col--4">
    <a href="/build/smart-contracts/what-is">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/contracts.png").default} alt="Contracts" />
        </div>
        <div className="card__body">
          <h3>Smart Contracts</h3>
          Learn to build smart contracts in NEAR
        </div>
      </div>
    </a>
  </div>
  <div className="col col--4">
    <a href="/build/near-components/what-is">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/bos-big.png").default} alt="Web3 Components" />
        </div>
        <div className="card__body">
          <h3>Web3 Components</h3>
          The building blocks for multi-chain apps
        </div>
      </div>
    </a>
  </div>
  <div className="col col--4">
    <a href="/build/web3-apps/what-is">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/examples.png").default} alt="Solutions" />
        </div>
        <div className="card__body">
          <h3>Web3 Applications</h3>
          Supercharge your App using NEAR
        </div>
      </div>
    </a>
  </div>
  <div className="col col--4">
    <a href="/tools/welcome">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/tools.png").default} alt="Tools" />
        </div>
        <div className="card__body">
          <h3>NEAR Tools</h3>
          Discover our SDK, API, CLI, and more
        </div>
      </div>
    </a>
  </div>
  <div className="col col--4">
    <a href="/build/data-infrastructure/what-is">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/data-lake.png").default} alt="Data Lake" />
        </div>
        <div className="card__body">
          <h3>Query On-Chain Information</h3>
            Learn about indexers and our data lake
        </div>
      </div>
    </a>
  </div>
</div>

<hr className="subsection" />

<h1 className="text-center big-title" > 주제별로 문서 찾아보기 </h1>

<FeatureList>
  <Column title="NEAR 이해하기" size="3">
    <Feature url="/concepts/basics/protocol" title="NEAR란 무엇인가요?" subtitle="Learn the Basics about NEAR" image="near-logo.png" />
    <Feature url="/concepts/protocol/account-id" title="명명된 계정" subtitle="NEAR uses human-readable accounts" image="user.png" />
    <Feature url="/concepts/protocol/access-keys" title="다중 액세스 키" subtitle="More keys means more security" image="key.png" />
    <Feature url="/concepts/protocol/smartcontract" title="스마트 컨트랙트" subtitle="Learn about our contract technology" image="contract.png" />
  </Column>
  <Column title="Developer Docs" size="3">
    <Feature url="/build/web3-apps/quickstart" title="Quickstart: WebApp" subtitle="Spin-up your first dApp" image="quickstart.png" />
    <Feature url="/build/smart-contracts/quickstart" title="Quickstart: Contract"
             subtitle="Learn how to write smart contracts" image="smartcontract.png" />
    <Feature url="/build/near-components/anatomy/state" title="Multi-chain Components"
             subtitle="Learn about multi-chain components" image="bos-lido.png" />
    <Feature url="/build/data-infrastructure/query-api/intro" title="QueryAPI" subtitle="The simplest way to build indexers" image="blocks.png" />
  </Column>
  <Column title="개발자 도구" size="3">
    <Feature url="/tools/sdk" title="NEAR SDK" subtitle="Write contracts in Rust & JavaScript" image="smartcontract.png" />
    <Feature url="/tools/near-cli" title="NEAR CLI" subtitle="Use NEAR from the Terminal" image="near-cli.png" />
    <Feature url="/tools/near-api-js/quick-reference" title="NEAR API JS" subtitle="Interact with NEAR from JS" image="near-api-js.png" />
    <Feature url="/api/rpc/introduction" title="RPC API" subtitle="Interact with the NEAR RPC API" image="rpc.png" />
  </Column>
  <Column title="예제 & 튜토리얼" size="3">
    <Feature url="/tutorials/examples/donation" title="Donation" subtitle="Receive and send tokens" image="donation.png" />
    <Feature url="/tutorials/examples/factory" title="Factory Contract" subtitle="Build a contract that deploys contracts" image="factory.png" />
    <Feature url="/tutorials/examples/frontend-multiple-contracts" title="Multi-Contract Frontend" subtitle="Interact with multiple contracts" image="multiple.png" />
    <Feature url="/tutorials/nfts/js/introduction" title="Master NFTs on NEAR (JS)" subtitle="Learn everything about NFT in JS" image="nft-marketplace-js.png" />
  </Column>
</FeatureList>

---

## External Resources

다음은 NEAR에 대해 자세히 알아볼 수 있도록 지원하는 NEAR 생태계의 추가 소스입니다.

<div className="row cards">
  <div className="col col--6">
    <a href="https://dev.near.org/applications" target="_blank" rel="noopener noreferrer">

      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/awesomenear.jpg").default} alt="Discover" />
        </div>
        <div className="card__body">
          <h3>
          Discover
          </h3>
          Discover awesome apps in the Near ecosystem.
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6">
    <a href="https://nomicon.io" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/nomicon.png").default} alt="Nomicon" />
        </div>
        <div className="card__body">
          <h3>
          Nomicon
          </h3>
          See how NEAR is implemented in the official protocol specification.
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6">
    <a href="https://near-nodes.io" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/validate.png").default} alt="Validate" />
        </div>
        <div className="card__body">
          <h3>
          Running a Node
          </h3>
          Documentation on becoming a validator to help keeping the blockchain safe
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6">
    <a href="https://templates.mintbase.xyz/" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/mintbase-templates.png").default} alt="Templates" />
        </div>
        <div className="card__body">
          <h3>Templates</h3>
            Templates for creating web3 applications
        </div>
      </div>
    </a>
  </div>
</div>
