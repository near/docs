// @ts-check
const path = require('path');
const changelogs = require('./src/utils/changelogs.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NEAR Documentation',
  tagline: 'NEAR Protocol Developer Documentation',
  url: 'https://docs.near.org',
  baseUrl: '/',
  organizationName: 'near',
  projectName: 'docs',
  markdown: {
    mermaid: true,
  },
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://use.fontawesome.com/221fd444f5.js",
  ],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap",
  ],
  favicon: 'img/favicon.ico',
  customFields: {
    disableHeaderTitle: true,
    fonts: {
      myFont: ['Inter', 'sans-serif'],
    },
  },
  themes: ['@saucelabs/theme-github-codeblock', '@docusaurus/theme-mermaid'],
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
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
        googleAnalytics: {
          trackingID: 'UA-100373569-7',
          anonymizeIP: true,
        },
        blog: {
          blogSidebarTitle: 'Developer Changelog',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
        },
        theme: {
          customCss: "/src/css/custom.scss",
        },
      },
    ],
  ],
  plugins: [
    './src/plugins/monaco-editor',
    './src/plugins/node-polyfills',
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'dx', // used by CLI, must be path safe
        sourceBaseUrl: 'https://raw.githubusercontent.com/near/DX/main/',
        outDir: '../docs/2.develop',
        documents: ['README.md'],
        noRuntimeDownloads: true,
        modifyContent(filename, content) {
          // get everything after ## BOS
          content = content.substring(
            content.indexOf(
              'An overview of essential repositories when building on NEAR Protocol.'
            )
          );
          return {
            filename: 'github-overview.md',
            content: `---
id: github-overview
title: NEAR Developer Repositories
---

${content}`, // <-- this last part adds in the rest of the content, which would otherwise be discarded
          };
        }
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        name: 'changelog',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/near/near-releases/main/reports/',
        outDir: '/blog',
        documents: changelogs,
        noRuntimeDownloads: true,
        modifyContent(filename, content) {
          return { filename, content: content.replace('{{', '') }
        }
      },
    ],
  ],
  themeConfig: {
    prism: {
      additionalLanguages: [
        "rust",
        "java",
        "python",
        "ruby",
        "go",
        "typescript",
        "jsx"
      ],
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'NEAR Logo',
        src: 'img/near_logo.svg',
        srcDark: 'img/near_logo_white.svg',
      },
      items: [
        {
          to: '/concepts/welcome',
          label: 'Learn',
          position: 'left',
        },
        {
          label: 'Build',
          position: 'left',
          items: [
            { label: 'Smart Contracts', href: '/develop/contracts/welcome' },
            { label: 'Web3 Applications', href: '/develop/integrate/welcome' },
            { label: 'Data Solutions', href: '/develop/monitor' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Integrations </small>',
            },
            { label: "Backend", href: "/develop/integrate/backend-login" },
            { label: "Frontend", href: "/develop/integrate/frontend" },
            { label: "Exchanges", href: "/integrator/exchange-integration" },
            { label: "Rollups DA", href: "/data-availability/welcome" },
          ],
        },
        {
          label: "Primitives",
          position: "left",
          items: [
            { label: "Drops", href: "/primitives/linkdrop/introduction" },
            { label: "Fungible Tokens", href: "/primitives/ft/introduction" },
            { label: "Non-Fungible Tokens", href: "/primitives/nft/introduction" },
            { label: "Decentralized Exchanges", href: "/primitives/dex/introduction" },
            { label: "Autonomous Organizations", href: "/primitives/dao/introduction" },
          ]
        },
        {
          type: 'dropdown',
          label: 'Tools',
          position: 'left',
          items: [
            { label: '🧰 All Tools', href: '/tools/welcome' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Essentials </small>',
            },
            { label: 'NEAR API', href: '/tools/near-api-js/quick-reference' },
            { label: 'NEAR SDK', href: '/sdk/welcome' },
            { label: 'NEAR CLI', href: '/tools/near-cli' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Onboarding </small>',
            },
            { label: "Wallet Selector", href: "/tools/wallet-selector" },
            { label: "FastAuth (Email Login)", href: "/tools/fastauth-sdk" },
            { label: "Relayers", href: "/develop/relayers/build-relayer" },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> IDEs </small>',
            },
            { label: "VSCode Extension ", href: "/bos/dev/vscode" },
            { label: "BOS Web IDE (Jutsu)", href: "https://jutsu.ai/editor" },
            { label: "Remix IDE Plugin", href: "https://docs.welldonestudio.io/code/getting-started" },],
        },
        {
          href: '/api/rpc/introduction',
          label: 'RPC',
        },
        {
          type: 'dropdown',
          label: 'Other Docs',
          position: 'left',
          items: [
            {
              href: 'https://nomicon.io',
              label: 'Protocol Docs',
            },
            {
              href: 'https://near-nodes.io',
              label: 'Validator Docs',
            },
          ],
        },
        {
          type: 'search',
          position: 'right',
        },
        { to: 'blog', label: 'Changelog 🎉', position: 'right' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: "login",
          position: "right"
        },
        {
          href: '/develop/github-overview',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    image: 'img/near_logo.svg',
    footer: {
      links: [],
      copyright: "Copyright © 2023 NEAR Protocol",
      logo: {
        src: 'img/near_logo.svg',
      },
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '0LUM67N2P2',
      // Public API key: it is safe to commit it
      apiKey: '129d0f429e1bb0510f0261dda1e88ed4',
      indexName: 'near',
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'near-sdk\\.io',
      // Optional: Algolia search parameters
      searchParameters: {
        clickAnalytics: true,
        analytics: true,
        enableReRanking: true,
      },
      //... other Algolia params
      placeholder: 'Search the Docs...',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko', 'vi', 'zh-CN'],
    localeConfigs: {
      'zh-CN': {
        label: '简体中文',
      },
    },
  },
};

export default config;