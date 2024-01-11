---
id: 어서오세요
title: NEAR - Your Gateway to an Open Web
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

Welcome, this is the starting point for all NEAR documentation. Learn to build and publish blockchain applications. Embrace the power of Web3.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <a href="/concepts/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/protocol.png").default} alt="Learn" />
          </div>
          <div class="card__body">
            <h3>Understanding NEAR</h3>
            Learn what NEAR is and how it works.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/develop/contracts/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/contracts.png").default} alt="Contracts" />
          </div>
          <div class="card__body">
            <h3>Smart Contracts</h3>
              Learn to build smart contracts in NEAR.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/develop/integrate/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/bos-landing.png").default} alt="Web3 Apps" />
          </div>
          <div class="card__body">
            <h3>Web Applications</h3>
              Learn to build multi-chain web apps.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/primitives/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/examples.png").default} alt="Solutions" />
          </div>
          <div class="card__body">
            <h3>NEAR Primitives</h3>
              Reliable solutions powered by NEAR.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/tools/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/tools.png").default} alt="Tools" />
          </div>
          <div class="card__body">
            <h3>NEAR Tools</h3>
              Info on our SDK, API, CLI, and more.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/develop/monitor">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/data-lake.png").default} alt="Data Lake" />
          </div>
          <div class="card__body">
            <h3>Query On-Chain Information</h3>
              Learn about indexers and our data lake.
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<h1 class="text-center big-title" > 주제별로 문서 찾아보기 </h1>

<FeatureList>
  <Column title="NEAR 이해하기" size="3">
    <Feature url="/concepts/basics/protocol" title="NEAR란 무엇인가요?" subtitle="Learn the Basics about NEAR" image="near-logo.png" />
    <Feature url="/concepts/basics/accounts/account-id" title="명명된 계정" subtitle="NEAR uses human-readable accounts" image="user.png" />
    <Feature url="/concepts/basics/accounts/access-keys" title="다중 액세스 키" subtitle="More keys means more security" image="key.png" />
    <Feature url="/concepts/basics/accounts/smartcontract" title="스마트 컨트랙트" subtitle="Learn about our contract technology" image="contract.png" />
    <Feature url="/concepts/basics/tokens" title="토큰" subtitle="Learn about the NEAR token" image="ft.png" />
    <Feature url="/concepts/basics/transactions/overview" title="트랜잭션" subtitle="Fast and Inexpensive" image="transaction.png" />
    <Feature url="/concepts/basics/validators" title="밸리데이터" subtitle="Learn how the network stays safe" image="validation.png" />
  </Column>
  <Column title="Developer Docs" size="3">
    <Feature url="/develop/integrate/quickstart-frontend" title="Quickstart: WebApp" subtitle="Spin-up your first dApp" image="quickstart.png" />
    <Feature url="/develop/contracts/quickstart" title="Quickstart: Contract" subtitle="Learn how to write smart contracts" image="smartcontract.png" />
    <Feature url="/develop/monitor" title="앱 모니터링" subtitle="Learn how to track the Blockchain" image="monitor.png" />
    <Feature url="/tutorials/welcome" title="튜토리얼 & 예제" subtitle="Check out a vast library of examples" image="tutorials.png" />
  </Column>
  <Column title="개발자 도구" size="3">
    <Feature url="/sdk/js/introduction" title="JavaScript SDK" subtitle="Write contracts in JavaScript" image="smartcontract-js.png" />
    <Feature url="/sdk/rust/introduction" title="Rust SDK" subtitle="Write contracts in Rust" image="smartcontract-rust.png" />
    <Feature url="/tools/near-cli" title="NEAR CLI" subtitle="Use NEAR from the Terminal" image="near-cli.png" />
    <Feature url="/tools/near-api-js/quick-reference" title="NEAR API JS" subtitle="Interact with NEAR from JS" image="near-api-js.png" />
    <Feature url="/api/rpc/introduction" title="RPC API" subtitle="Interact with the NEAR RPC API" image="rpc.png" />
    <Feature url="/concepts/advanced/indexers" title="블록체인 데이터 인덱싱" subtitle="Query usage information for a contract" image="blocks.png" />
  </Column>
  <Column title="예제 & 튜토리얼" size="3">
    <Feature url="/develop/relevant-contracts/ft" title="대체 가능한 토큰" subtitle="Learn how to use and make FT" image="ft.png" />
    <Feature url="/develop/relevant-contracts/nft" title="대체 불가능 토큰" subtitle="Enter the NFT space" image="nft.png" />
    <Feature url="/develop/relevant-contracts/dao" title="자율 조직" subtitle="Understand DAOs" image="dao.png" />
    <Feature url="/tutorials/indexer/near-lake-state-changes-indexer" title="Lake 인덱서" subtitle="Watch the network and access all the events" image="experiment.png" />
  </Column>
</FeatureList>

---

## 다른 문서 사이트

다음은 NEAR에 대해 자세히 알아볼 수 있도록 지원하는 NEAR 생태계의 추가 소스입니다.

<div class="container">
  <div class="row cards">
    <div class="col col--6">
      <a href="https://awesomenear.com">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/awesomenear.jpg").default} alt="Discover" />
          </div>
          <div class="card__body">
            <h3>
            찾아보기
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
            NEAR 생태계 내 멋진 앱들을 찾아보세요.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="https://nomicon.io">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/nomicon.png").default} alt="Nomicon" />
          </div>
          <div class="card__body">
            <h3>
            Nomicon
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
              공식 프로토콜 사양에서 NEAR가 어떻게 구현되었는지 확인하세요.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="https://near-nodes.io">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/validate.png").default} alt="Validate" />
          </div>
          <div class="card__body">
            <h3>
            노드 운영하기
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
            밸리데이터가 되어서 블록체인을 안전하게 지키는 방법에 대한 문서입니다.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/concepts/advanced/indexers">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/indexers.png").default} alt="Indexers" />
          </div>
          <div class="card__body">
            <h3>NEAR 인덱서</h3>
              인덱서는 블록체인에서 정보를 추출할 수 있도록 돕습니다.
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<ContactUs />
