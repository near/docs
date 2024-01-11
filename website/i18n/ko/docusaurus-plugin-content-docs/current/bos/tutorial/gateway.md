---
id: bos-gateway
title: Gateways
---

The [`Components`](../components.md) you create are stored in the NEAR blockchain. To read and execute their code you will need a `Gateway`.

A `Gateway` is nothing but a [Next.js](https://nextjs.org/) application with the added ability of retrieving components from the blockchain and rendering their code.

This allow you to create the frontend of your application combining classic `Next` components with `Web3` components that interact with your desired blockchain.


---

## Building a Gateway

Building your own `Gateway` is as simple as cloning the [example repository](https://github.com/near-examples/bos-gateway), and running it:

```bash
# Clone gateway
git clone git@github.com:near-examples/bos-gateway.git

# Install dependencies
cd bos-gateway
npm install

# Run the gateway
npm run dev
```

:::tip Configure the Gateway
Make sure to change the `src/data/bos-components.ts` file
:::

---

## Deploying Gateway in Vercel

Launching your own NEAR gateway instance is a quick and simple process. In this example we'll be using [Vercel](https://vercel.com) to build and deploy a new NEAR gateway, but you can also use other platforms.

다음과 같은 간단한 단계만 수행하면 됩니다:

1. Clone the [`near/bos-gateway`](https://github.com/near-examples/bos-gateway) repository
2. [Vercel](https://vercel.com/)에 회원가입하고 복제된 레퍼지토리를 가져옵니다.
3. 프로젝트를 설정합니다.
   - 팀 이름
   - 빌드 명령: `npm run build`
   - 출력 디렉토리: `dist`
4. <kbd>Deploy</kbd> 누르기

:::tip

[이 링크](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnear%2Fnear-discovery-alpha&build-command=npm%20run%20build&install-command=npm%20install&output-directory=dist)를 클릭하여 사용해 보세요.

:::

![vercel setup](/docs/vercel-gateway.png)

Now just wait a few minutes for Vercel to build the website and enjoy your NEAR gateway!

:::info 사용자 정의
- 특정 도메인에서 게이트웨이를 호스트하려면 Vercel에서 게이트웨이를 구성할 수 있습니다.

- 홈 페이지 구성 요소를 변경하려면 포크 파일에서 `src/data/widgets.js`를 수정하여 다른 구성 요소를 가리킵니다.
:::
