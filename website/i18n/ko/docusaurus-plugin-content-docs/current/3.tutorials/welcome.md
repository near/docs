---
id: welcome
title: 예제 & 튜토리얼
sidebar_label: Home
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

예제 및 튜토리얼 모음을 확인해보세요.

<FeatureList>
  <Column title="유명한 예제">
    <Feature url="/tutorials/examples/guest-book" title="방명록" subtitle="Create a simple guest book" image="guest-book.png" />
    <Feature url="/tutorials/examples/donation" title="기부" subtitle="Receive and send tokens" image="donation.png" />
    <Feature url="/tutorials/examples/xcc" title="교차 컨트랙트 호출 기본" subtitle="Learn how to call other contracts" image="cross-call.png" />
    <Feature url="/tutorials/examples/coin-flip" title="동전 던지기 게임" subtitle="Learn to create basic random numbers" image="random.png" />
    <Feature url="/tutorials/examples/factory" title="팩토리 컨트랙트" subtitle="Build a contract that deploys contracts" image="factory.png" />
    <Feature url="/tutorials/examples/update-contract-migrate-state" title="업그레이드 & 마이그레이션" subtitle="Programmatically update contracts" image="update.png" />
    <Feature url="/tutorials/examples/frontend-multiple-contracts" title="다중 컨트랙트 프론트엔드" subtitle="Interact with multiple contracts" image="multiple.png" />

  </Column>
  <Column title="Popular Tutorials">
    <Feature url="/tutorials/near-components/interaction" title="Components & Contracts" subtitle="Use a contract from your component" image="bos-contract.png" />
    <Feature url="/tutorials/near-components/lido" title="ETH Component" subtitle="Build an Ethereum Component" image="bos-lido.png" />
    <Feature url="/tutorials/nfts/minting-nfts" title="NFT Mint" subtitle="Mint an NFT without using code" image="frontend-bos.png" />
    <Feature url="/tutorials/near-components/indexer-tutorials/nft-indexer" title="Events (NEAR Lake)"
             subtitle="Use our Data Lake to listen for events" image="monitor.png" />
  </Column>
  <Column title="From Zero to Hero">
    <Feature url="/tutorials/nfts/js/introduction" title="NEAR에서 NFT 마스터 (JS)" subtitle="Learn everything about NFT in JS" image="nft-marketplace-js.png" />
    <Feature url="/tutorials/nfts/introduction" title="NEAR에서 NFT 마스터 (RS)" subtitle="Learn everything about NFT in Rust" image="nft-marketplace-rs.png" />
    <Feature url="/tutorials/fts/introduction" title="대체 가능한 토큰 101"
             subtitle="Learn everything about fungible tokens" image="ft.png" />
    <Feature url="/tutorials/crosswords/basics/overview" title="십자말풀이 게임" 
             subtitle="Build a Crossword Game from zero" image="crossword.png" />
  </Column>
</FeatureList>
