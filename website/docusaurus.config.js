require('dotenv').config();

// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NEAR Documentation',
  tagline: 'NEAR Protocol Developer Documentation',
  url: 'https://docs.near.org',
  baseUrl: '/',
  organizationName: 'near',
  projectName: 'docs',
  trailingSlash: false,
  markdown: {
    mermaid: true,
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/221fd444f5.js',
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap',
  ],
  favicon: 'img/favicon.ico',
  customFields: {
    disableHeaderTitle: true,
    fonts: {
      myFont: ['Inter', 'sans-serif'],
    },
    REACT_APP_PUBLIC_POSTHOG_KEY: process.env.REACT_APP_PUBLIC_POSTHOG_KEY,
    REACT_APP_PUBLIC_POSTHOG_HOST: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
    REACT_APP_GOOGLE_CALENDAR_API_KEY: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
    REACT_APP_LUMA_NEAR_CALENDAR_ID: process.env.REACT_APP_LUMA_NEAR_CALENDAR_ID,
    REACT_APP_DEVHUB_GOOGLE_CALENDAR_ID: process.env.REACT_APP_DEVHUB_GOOGLE_CALENDAR_ID,
  },
  themes: ['@saucelabs/theme-github-codeblock', '@docusaurus/theme-mermaid'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
          editUrl: 'https://github.com/near/docs/edit/master/website',
          path: '../docs',
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-TMG0M3DPNW',
          anonymizeIP: true,
        },
        blog: {
          blogTitle: 'NEAR Docs Blog',
          blogSidebarTitle: 'Documentation Blog',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          routeBasePath: 'blog',
          path: '../blog',
        },
        theme: {
          customCss: './static/css/custom.scss',
        },
      },
    ],
  ],
  plugins: [
    './src/plugins/monaco-editor',
    './src/plugins/node-polyfills',
    'docusaurus-plugin-sass',
  ],
  themeConfig: {
    image: 'image/near.jpg',
    // announcementBar: {
    //   id: 'id-0010',
    //   content:
    //     '🎉 Ethereum Wallets are here! Read more in our <a href="/blog/hello-ethereum-wallets">blogpost</a> and check our <a href="/tools/ethereum-wallets">tutorial to update your app</a> 🎉',
    //   backgroundColor: '#fcfbfa',
    //   textColor: '#333',
    //   isCloseable: true,
    // },
    prism: {
      additionalLanguages: ['rust', 'java', 'python', 'ruby', 'go', 'typescript', 'jsx', 'bash'],
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      logo: {
        alt: 'NEAR Logo',
        src: 'assets/site/near_logo.svg',
        srcDark: 'assets/site/near_logo_white.svg',
      },
      items: [
        {
          label: 'Home',
          to: '/',
          position: 'left',
          activeBaseRegex: '(^/$)',
        },
        {
          type: 'dropdown',
          label: 'Concepts',
          position: 'left',
          activeBaseRegex: '(build|protocol|concepts)',
          items: [
            {
              label: 'NEAR Protocol',
              to: '/protocol/basics',
              description: 'Fundamentals of NEAR Protocol',
              subitems: [
                {
                  label: 'Account Model',
                  to: '/protocol/account-model',
                  description:
                    'Discover our unique account model with named accounts and multiple keys',
                },
                {
                  label: 'Access Keys',
                  to: '/protocol/access-keys',
                  description: 'Learn how access keys work in NEAR',
                },
                {
                  label: 'Transactions',
                  to: '/protocol/transactions',
                  description: 'Understand how transactions are processed in NEAR',
                },
                {
                  label: 'Meta-Transactions',
                  to: '/chain-abstraction/meta-transactions',
                  description: 'Natively cover transaction costs for other user',
                },
                {
                  label: 'Handling Storage',
                  to: '/protocol/storage/storage-staking',
                  description: 'Learn about storage management and staking in NEAR',
                },
                {
                  label: 'The Network',
                  to: '/protocol/network/validators',
                  description: 'Discover how validators keep the network safe',
                },
              ],
            },
            {
              label: 'AI & Agents',
              to: '/ai/introduction',
              description: 'NEAR is the blockchain for AI',
              subitems: [
                {
                  label: 'Introduction',
                  to: '/ai/introduction',
                  description: 'Learn how NEAR is the blockchain for AI',
                },
                {
                  label: 'NEAR MCP',
                  to: '/ai/near-mcp',
                  description: 'Enable AI applications to interact with NEAR',
                },
                {
                  label: 'Shade Agents',
                  to: '/ai/shade-agents/introduction',
                  description: 'The first truly permissionless and decentralized AI agents',
                },
                {
                  label: 'NEAR AI',
                  to: 'https://docs.near.ai/',
                  description: 'A simple platform to build and host AI agents',
                },
                {
                  label: 'Bitte AI',
                  to: 'https://docs.bitte.ai/',
                  description: 'Discover how simple it is to create Open Agents',
                },
              ],
            },
            {
              label: 'Multi-Chain Stack',
              to: '/chain-abstraction/what-is',
              description: 'Access the multi-chain universe',
              subitems: [
                {
                  label: 'Abstracting Away the Chain',
                  to: '/chain-abstraction/what-is',
                  description: 'Learn what it means to create abstracted applications',
                },
                {
                  label: 'Chain Signatures',
                  to: '/chain-abstraction/chain-signatures',
                  description: 'Control accounts on any chain through NEAR',
                },
                {
                  label: 'Intents',
                  to: '/chain-abstraction/intents/overview',
                  description: 'Separate the what from the how',
                },
                {
                  label: 'Omni Bridge',
                  to: '/chain-abstraction/omnibridge/overview',
                  description: 'A multi-chain asset bridge across multiple blockchains',
                },
                {
                  label: 'Rollup Data Availability',
                  to: '/chain-abstraction/data-availability',
                  description: 'Use NEAR as a roll-up solution for any other chain',
                },
              ],
            },
            {
              label: 'Smart Contracts',
              to: '/smart-contracts/what-is',
              description: 'Build smart contracts with ease',
              subitems: [
                {
                  label: 'Introduction',
                  to: '/smart-contracts/what-is',
                  description: 'Learn what is a contract and how it works',
                },
                {
                  label: 'Quickstart',
                  to: '/smart-contracts/quickstart',
                  description: 'Create your first smart contract',
                },
                {
                  label: 'Anatomy of a Contract',
                  to: '/smart-contracts/anatomy/',
                  description: 'Learn all the concepts needed to build a smart contract',
                },
                {
                  label: 'Testing',
                  to: '/smart-contracts/testing/introduction',
                  description: 'Learn how to test your contracts locally',
                },
                {
                  label: 'Deploying',
                  to: '/smart-contracts/release/deploy',
                  description: 'Learn how to deploy your contracts to the NEAR network',
                },
                {
                  label: 'Security',
                  to: '/smart-contracts/security/welcome',
                  description: 'Discover best practices for building secure contracts',
                },
              ],
            },
            {
              label: 'Web3 Applications',
              to: '/web3-apps/what-is',
              description: 'Supercharge your apps with NEAR',
              subitems: [
                {
                  label: 'Introduction',
                  to: '/web3-apps/what-is',
                  description: 'Learn what is a contract and how it works',
                },
                {
                  label: 'Quickstart',
                  to: '/web3-apps/quickstart',
                  description: 'Build your first Web Application that interacts with a Contract',
                },
                {
                  label: 'Frontend Integration',
                  to: '/web3-apps/integrate-contracts',
                  description: 'Learn how to integrate NEAR into your Frontend App',
                },
                {
                  label: 'Backend Integration',
                  to: '/web3-apps/backend/',
                  description: 'Authenticate NEAR users in your backend',
                },
                {
                  label: 'Deploying',
                  to: '/smart-contracts/release/deploy',
                  description: 'Learn how to deploy your contracts to the NEAR network',
                },
                {
                  label: 'Security',
                  to: '/smart-contracts/security/welcome',
                  description: 'Discover best practices for building secure contracts',
                },
              ],
            },
            {
              label: 'Primitives',
              to: '/primitives/what-is',
              description: 'FT, NFT, DAOs, Oracles and more',
              subitems: [
                {
                  label: 'Introduction',
                  to: '/primitives/what-is',
                  description: 'Learn all the primitives NEAR Protocol offers',
                },
                {
                  label: 'Fungible Tokens (FT)',
                  to: '/primitives/ft',
                  description: 'The best way to represent fungible assets on-chain',
                },
                {
                  label: 'Non-Fungible Tokens (NFT)',
                  to: '/primitives/nft',
                  description: 'Ideal to represent digital art, tickets, collectibles, and more',
                },
                {
                  label: 'Decentralized Autonomous Organizations (DAO)',
                  to: '/primitives/dao',
                  description: 'Organize your community with DAOs',
                },
                {
                  label: 'Decentralized Exchanges',
                  to: '/primitives/dex',
                  description: 'Decentralized applications for trading tokens on NEAR',
                },
                {
                  label: 'Linkdrops',
                  to: '/primitives/linkdrop',
                  description: 'Distribute assets and rewards to users with a single link',
                },
                {
                  label: 'Oracles',
                  to: '/primitives/oracles',
                  description: 'Connect your smart contracts to real-world data',
                },
                {
                  label: 'Staking',
                  to: '/protocol/network/staking',
                  description: "Leverage the power of NEAR's staking model",
                },
                {
                  label: 'Lockups & Vesting',
                  to: '/primitives/lockup',
                  description: "Leverage the power of NEAR's lockup & vesting contracts",
                },
              ],
            },
            {
              label: 'Data Infrastructure',
              to: '/data-infrastructure/what-is',
              description: 'Access and monitor on-chain data',
              subitems: [
                {
                  label: 'Introduction',
                  to: '/data-infrastructure/what-is',
                  description: 'Discover what data solutions NEAR Protocol offers',
                },
                {
                  label: 'Data APIs',
                  to: '/data-infrastructure/data-apis',
                  description: 'Consume on-chain data through existing community APIs',
                },
                {
                  label: 'BigQuery',
                  to: '/data-infrastructure/big-query',
                  description: "Learn how to query past NEAR Protocol data on Google's BigQuery",
                },
                {
                  label: 'NEAR Lake',
                  to: '/data-infrastructure/near-lake-framework',
                  description: 'Process the live stream of NEAR data using your favorite language',
                },
              ],
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Tutorials',
          position: 'left',
          activeBaseRegex: 'tutorials',
          items: [
            {
              label: 'Getting Started',
              to: '#',
              description: 'Take your first steps with NEAR',
              subitems: [
                {
                  label: 'Create a Testnet Account',
                  to: '/tutorials/protocol/create-account',
                  description: 'Create a testnet account to start developing',
                },
                {
                  label: 'Your First Smart Contract',
                  to: '/smart-contracts/quickstart',
                  description: 'Create a simple Hello World Smart Contract',
                },
                {
                  label: 'Your First Web3 App',
                  to: '/web3-apps/quickstart',
                  description: 'Build a web app that interacts with a Smart Contract',
                },
                {
                  label: '⭐ Mastering NEAR',
                  to: '/tutorials/auction/introduction',
                  description: 'Learn how to build web3 apps from end-to-end',
                },
              ],
            },
            {
              label: 'Multi-Chain Stack',
              to: '#',
              description: 'Access the multi-chain universe',
              subitems: [
                {
                  label: 'Use Chain Signatures',
                  to: '/chain-abstraction/chain-signatures/implementation',
                  description:
                    'Learn how to sign transactions for chains such as Bitcoin, Ethereum and Solana',
                },
                {
                  label: 'NEAR Account Proxy',
                  to: '/tutorials/controlling-near-accounts/introduction',
                  description: 'Learn how to use chain signatures to control other NEAR Accounts',
                },
                {
                  label: 'Multi-Chain DAO',
                  to: '/tutorials/multichain-dao/introduction',
                  description: 'Vote once in NEAR, execute in any EVM chain',
                },
              ],
            },
            {
              label: 'AI & Agents',
              to: '#',
              description: 'NEAR is the blockchain for AI',
              subitems: [
                {
                  label: 'Shade Agents',
                  to: '/ai/shade-agents/getting-started/introduction',
                  description: 'Build a agent that safely control assets across chains',
                },
              ],
            },
            {
              label: 'Smart Contracts',
              to: '#',
              description: 'Build smart contracts with ease',
              subitems: [
                {
                  label: 'Quickstart',
                  to: '/smart-contracts/quickstart',
                  description: 'Create your first smart contract',
                },
                {
                  label: 'Auction',
                  to: '/tutorials/auction/basic-auction',
                  description:
                    "Learn how to create an auction contract - part of our 'Mastering NEAR' Tutorial",
                },
                {
                  label: 'Cross-Contract Calls',
                  to: '/tutorials/examples/guest-book',
                  description: 'Learn how to make your contract call other contracts',
                },
                {
                  label: 'Randomness',
                  to: '/tutorials/examples/coin-flip',
                  description: 'Learn to create and use random numbers on your contract',
                },
                {
                  label: 'Factory',
                  to: '/tutorials/examples/factory',
                  description: 'Create a contract that deploys other contracts',
                },
                {
                  label: 'Drop',
                  to: '/tutorials/examples/near-drop',
                  description: 'Create a contract that drops assets',
                },
                {
                  label: 'Update & Migrate',
                  to: '/tutorials/examples/update-contract-migrate-state',
                  description: 'Learn how to update your existing contract',
                },
              ],
            },
            {
              label: 'App Development',
              to: '#',
              description: 'Supercharge your apps with NEAR',
              subitems: [
                {
                  label: 'Quickstart',
                  to: '/web3-apps/quickstart',
                  description: 'Build your first Web Application that interacts with a Contract',
                },
                {
                  label: 'Frontend Integration',
                  to: '/web3-apps/integrate-contracts',
                  description: 'Learn how to integrate NEAR into your Frontend App',
                },
                {
                  label: 'Backend Integration',
                  to: '/web3-apps/backend/',
                  description: 'Authenticate NEAR users in your backend',
                },
                {
                  label: 'Frontend with Multiple Contracts',
                  to: '/web3-apps/backend/backend-login',
                  description: 'Learn how to communicate with multiple contracts effectively',
                },
                {
                  label: 'Cover your Users Transactions',
                  to: '/chain-abstraction/meta-transactions-relayer',
                  description: "Learn how to create a relayer to cover your user's transactions",
                },
                {
                  label: 'Mastering NEAR',
                  to: '/tutorials/auction/introduction',
                  description: 'Learn how to build web3 apps from end-to-end',
                },
              ],
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Reference',
          position: 'left',
          items: [
            {
              label: 'Core Libraries',
              to: '#',
              description: 'Core libraries to build on NEAR Protocol',
              subitems: [
                {
                  label: 'NEAR API',
                  to: '/tools/near-api',
                  description: 'Integrate NEAR into your application with our API libraries',
                  icon: '/assets/docs/welcome-pages/quickstart.png',
                },
                {
                  label: 'Contract SDK',
                  to: '/tools/sdk',
                  description: 'Build smart contracts using your favorite programming language',
                  icon: '/assets/docs/welcome-pages/smartcontract.png',
                },
                {
                  label: 'NEAR CLI',
                  to: '/tools/near-cli',
                  description: 'Interact with NEAR Protocol using our command line interface',
                  icon: '/assets/docs/welcome-pages/near-cli.png',
                },
                {
                  label: 'Wallet Selector',
                  to: '/tools/wallet-selector',
                  description: 'Integrate multiple wallets into your application',
                  icon: '/assets/docs/welcome-pages/multiple.png',
                },
              ],
            },
            {
              label: 'Data Tools',
              to: '#',
              description: 'Services to access and monitor on-chain data',
              subitems: [
                {
                  label: 'Data API',
                  to: '/tools/ecosystem-apis/',
                  description: 'Access on-chain data through simple APIs',
                  icon: '/assets/docs/welcome-pages/experiment.png',
                },
                {
                  label: 'Indexers',
                  to: '/tools/data-services',
                  description: 'Build custom indexers to query on-chain data',
                  icon: '/assets/docs/welcome-pages/blocks.png',
                },
              ],
            },
            {
              to: '/api/rpc/introduction',
              label: '🔌 RPC API',
              description: 'Low level API for interacting with the network',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {
              label: 'Ecosystem Tools',
              to: '#',
              description: 'Tools to help you build on NEAR',
              subitems: [
                {
                  label: 'Wallets ↗',
                  to: 'https://wallet.near.org/',
                  target: '_blank',
                  description: 'Discover wallets built for NEAR',
                  icon: '/assets/menu/wallet.png',
                },
                {
                  label: 'Testnet Faucet',
                  to: '/faucet',
                  description: 'Get testnet tokens to test your applications',
                  icon: '/assets/menu/token.svg',
                },
                {
                  label: 'Primitives Toolbox',
                  to: '/toolbox',
                  description: 'Create FT, NFT, Linkdrop and DAO',
                  icon: '/assets/menu/toolbox.svg',
                },
                {
                  label: 'NEAR Playground ↗',
                  to: 'https://nearplay.app/',
                  target: '_blank',
                  description: 'Write, test and deploy smart contracts in your browser',
                  icon: '/assets/menu/contract.svg',
                },

                {
                  label: 'Explorers',
                  to: '/tools/explorer',
                  description: 'Explore transactions through simple web interfaces',
                  icon: '/assets/docs/welcome-pages/update.png',
                },
                {
                  label: 'Indexers',
                  to: '/tools/indexer',
                  description:
                    'Listen to the blockchain, process the transactions and store them in a database',
                  icon: '/assets/docs/welcome-pages/blocks.png',
                },
                {
                  label: 'Remix IDE Plugin ↗',
                  to: 'https://docs.welldonestudio.io/code/getting-started',
                  description: 'Write, test and deploy smart contracts using the Remix IDE',
                  icon: '/assets/menu/remix.svg',
                },
              ],
            },
            {
              label: 'Developer Support',
              to: '#',
              description: 'Get help from the NEAR community',
              subitems: [
                {
                  label: 'Telegram ↗',
                  to: 'https://t.me/neardev',
                  description: 'Join our Telegram channel for developers',
                  icon: '/assets/menu/telegram.svg',
                },
                {
                  label: 'Discord ↗',
                  to: 'https://discord.gg/nearprotocol',
                  description: 'Join our Discord server to get help from the community',
                  icon: '/assets/menu/discord.svg',
                },
                {
                  label: 'WeChat ↗',
                  to: 'https://pages.near.org/ecosystem/community/wechat/',
                  description: 'Join our WeChat community',
                  icon: '/assets/menu/wechat.svg',
                },
              ],
            },
            {
              label: 'Discover',
              to: '#',
              description: 'Discover events, news and projects',
              subitems: [
                {
                  label: 'Events',
                  to: '/events',
                  description: "Find what's coming up in the NEAR ecosystem",
                  icon: '/assets/menu/event.png',
                },
                {
                  label: 'Newsletter',
                  to: '/newsletter',
                  description: 'Catch up with the latest news from NEAR',
                  icon: '/assets/menu/newspaper.png',
                },
                {
                  label: 'Communities',
                  to: '/communities',
                  description: 'Find a NEAR community near you',
                  icon: '/assets/menu/communities.png',
                },
                {
                  label: 'NEAR Catalog ↗',
                  to: 'https://near.org/ecosystem/',
                  description: 'Discover projects built on NEAR',
                  icon: '/assets/menu/catalog.png',
                },
              ],
            },
            {
              label: 'Educational Courses',
              to: '#',
              description: 'Courses created by the NEAR community',
              subitems: [
                {
                  label: 'AgorApp ↗',
                  to: 'https://agorapp.dev/catalog/course?difficulty=&chains=near',
                  description: 'Your one-stop platform for learning All Things Web3',
                  icon: '/assets/menu/agorApp.svg',
                },
                {
                  label: 'Learn NEAR Club ↗',
                  to: 'https://learnnear.club/',
                  description: 'All inclusive hands-on onboarding platform to NEAR Protocol',
                  icon: '/assets/menu/lnc.jpg',
                },
              ],
            },
          ],
        },
        { label: 'Blog', to: '/blog', activeBaseRegex: '/blog', position: 'right' },
        {
          type: 'html',
          position: 'right',
          value:
            '<a class="navbar__link false" href="#" onclick="google.translate.TranslateElement({pageLanguage: \'en\', includedLanguages: \'af,sq,am,en,fa,ar,ps,ja,zh-CN,hy,az,eu,be,bn,bs,bg,ca,ceb,ny,zh-TW,co,hr,cs,da,nl,eo,et,tl,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,iw,hi,hmn,hu,is,ig,id,ga,it,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,te,th,tr,uk,ur,uz,vi,cy,xh,yi,yo,zu\'}, \'google_translate_element\');"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style="vertical-align: text-bottom"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg></a>',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          position: 'right',
          href: 'login',
        },
      ],
    },
    footer: {
      links: [],
      copyright: 'Copyright © 2025 NEAR Protocol',
      logo: {
        src: 'img/near_logo.svg',
      },
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '0LUM67N2P2',
      // Public API key: it is safe to commit it
      apiKey: '41e2feb6ffa0d3450ca9d0a0c1826c1c',
      indexName: 'docs',
      askAi: {
        assistantId: '0ufKvtmOKJ66',
        indexName: 'docs.md',
        apiKey: '41e2feb6ffa0d3450ca9d0a0c1826c1c',
        appId: '0LUM67N2P2',
      },
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Algolia search parameters
      searchParameters: {
        clickAnalytics: true,
        analytics: true,
        enableReRanking: true,
        attributesToRetrieve: [
          'hierarchy.lvl0',
          'hierarchy.lvl1',
          'hierarchy.lvl2',
          'hierarchy.lvl3',
          'hierarchy.lvl4',
          'hierarchy.lvl5',
          'hierarchy.lvl6',
          'type',
          'url',
          'title',
          'description',
          'headers',
          'headersLevels',
        ],
      },
      //... other Algolia params
      placeholder: 'Search the Docs...',
      insights: true,
    },
  },
};

export default config;
