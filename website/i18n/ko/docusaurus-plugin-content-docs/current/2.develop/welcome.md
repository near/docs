---
id: welcome
title: Build on NEAR
sidebar_label: Home
hide_table_of_contents: true
hide_breadcrumb: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

환영합니다! Here you will find all the information on what you can **build** on NEAR and **how to** build it. Do not worry if you are new to Web3 or Blockchain, we are here to **guide you** through the process of learning.

<FeatureList>
  <Column title="Contracts">
    <Feature url="/develop/contracts/whatisacontract" title="What is a Contract?"
             subtitle="Learn what a smart contract is" image="contract.png" />
    <Feature url="/develop/contracts/quickstart" title="Build a Contract"
             subtitle="Spin-up your first smart contract" image="smartcontract.png" />
    <Feature url="/develop/testing/introduction" title="Test a Contract" subtitle="Write unit & integration tests" image="test.png" />
    <Feature url="/develop/deploy" title="Deploy a Contract" subtitle="Deploy the contract to the network" image="near-cli.png" />
  </Column>
  <Column title="Components">
    <Feature url="/bos/tutorial/quickstart" title="What is a Component?"
             subtitle="Learn about multi-chain components" image="bos-lido.png" />
    <Feature url="/bos/dev/intro" title="Dev Environment"
             subtitle="Choose your dev environment" image="update.png" />
    <Feature url="/bos/api/state" title="Build a Component"
             subtitle="Learn everything a Component can do" image="multiple.png" />
    <Feature url="/develop/integrate/frontend-components" title="Use Components in a WebApp"
             subtitle="Use the contract in a frontend" image="frontend-bos.png"  />
  </Column>
  <Column title="Applications">
    <Feature url="/develop/web3-apps/whatareweb3apps" title="What are Web3 Apps?"
             subtitle="Learn about decentralized apps" image="near-logo.png" />
    <Feature url="/develop/integrate/quickstart-frontend" title="Quickstart a Web3 App"
             subtitle="Use the contract in a frontend" image="quickstart.png"  />
    <Feature url="/develop/integrate/frontend" title="Integrate Contracts"
             subtitle="Integrate with Contracts" image="bos-contract.png"  />
    <Feature url="/develop/integrate/frontend" title="웹 프론트엔드 구축"
             subtitle="Use the contract in a frontend" image="frontend.png"  />
  </Column>
  <Column title="Primitives">
    <Feature url="/primitives/ft" title="대체 가능 토큰" subtitle="Learn how to use and make FT" image="ft.png" />
    <Feature url="/primitives/nft" title="대체 불가능 토큰" subtitle="Enter the NFT space" image="nft.png" />
    <Feature url="/primitives/dao" title="자율 조직" subtitle="Understand DAOs" image="dao.png" />
    <Feature url="/primitives/linkdrop" title="Linkdrops" subtitle="Drop assets & onboard users" image="key.png" />
    <Feature url="/primitives/oracles" title="오라클" subtitle="On-chain oracles to query prices" image="oracle.png" />
  </Column>
  <Column title="Data Infrastructure">
    <Feature url="/bos/queryapi/big-query" title="Google BigQuery" 
             subtitle="Query network data efficiently" image="experiment.png" />
    <Feature url="/bos/queryapi/intro" title="QueryAPI" subtitle="The simplest way to build indexers" image="blocks.png" />
    <Feature url="/tools/near-lake" title="NEAR Lake" subtitle="An Indexer that stores chain events" image="monitor.png" />
  </Column>
</FeatureList>

<br/>

---

<ContactUs />
