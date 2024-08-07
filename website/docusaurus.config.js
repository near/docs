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
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/221fd444f5.js',
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
          blogTitle: 'NEAR Docs Blog',
          blogSidebarTitle: 'Documentation Blog',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          routeBasePath: 'blog',
          path: '../blog',

        },
        theme: {
          customCss: './src/css/custom.scss',
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
        name: 'near-changelog',
        sourceBaseUrl:
          'https://raw.githubusercontent.com/near/near-releases/main/reports/',
        outDir: '../blog',
        documents: changelogs,
        noRuntimeDownloads: true,
        modifyContent(filename, content) {
          return { filename, content: content.replace('{{', '').replace('<', '\\<') };
        },
      },
    ],
  ],
  themeConfig: {
    image: 'docs/assets/welcome-pages/protocol.png',
    announcementBar: {
      id: 'id-0005',
      content:
        'New blog post: <a href="/blog/2024-07-11-near-org-outage">An update on the near.org / RPC outage on July 11, 2024</a>',
      backgroundColor: '#fafbfc',
      textColor: '#333',
      isCloseable: true,
    },
    prism: {
      additionalLanguages: [
        'rust',
        'java',
        'python',
        'ruby',
        'go',
        'typescript',
        'jsx',
        'bash',
      ],
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      }
    },
    navbar: {
      logo: {
        alt: 'NEAR Logo',
        src: 'img/near_logo.svg',
        srcDark: 'img/near_logo_white.svg',
      },
      items: [
        {
          to: '/',
          label: 'Docs',
          position: 'left',
          activeBaseRegex: '(^/$)|(/build|concepts)',
        },
        {
          to: '/tutorials/welcome',
          label: 'Tutorials',
          position: 'left',
          activeBaseRegex: '/tutorials/',
        },
        {
          type: 'dropdown',
          label: 'Tools',
          position: 'left',
          items: [
            { label: '🧰 All Tools', to: '/tools/welcome'},
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Essentials </small>',
            },
            { label: 'NEAR API', to: '/tools/near-api-js/quick-reference' },
            { label: 'NEAR SDK', to: '/tools/sdk' },
            { label: 'NEAR CLI', to: '/tools/near-cli' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Wallet Integration </small>',
            },
            { label: 'Wallet Selector', to: '/tools/wallet-selector' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> IDEs </small>',
            },
            { label: 'VSCode Extension ', href: 'https://marketplace.visualstudio.com/items?itemName=near-protocol.near-discovery-ide' },
            { label: 'BOS Web IDE (Jutsu)', href: 'https://jutsu.ai/editor' },
            {
              label: 'Remix IDE Plugin',
              href: 'https://docs.welldonestudio.io/code/getting-started',
            },
          ],
        },
        {
          type: 'html',
          value: '<span class="separator"></span>',
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/near',
              className: 'header-github-link',
            },
            {
              type: 'html',
              value: '<hr/><div class="subtitle"> Support </dib>',
            },
            {
              href: 'https://discord.gg/GZ7735Xjce',
              label: 'Discord',
            },
            {
              href: 'https://t.me/neardev',
              label: 'Telegram',
            },
            {
              type: 'html',
              value: '<hr /><div class="subtitle"> Education </dib>',
            },
            {
              href: 'https://agorapp.dev/catalog/course?difficulty=&chains=near',
              label: 'Agor',
            },
            {
              href: 'https://learnnear.club/',
              label: 'Learn NEAR Club',
            },
            {
              type: 'html',
              value: '<hr /><div class="subtitle"> Other Docs </dib>',
            },
            {
              href: 'https://github.com/near/NEPs',
              label: 'NEPs',
            },
            {
              href: 'https://near.github.io/nearcore/',
              label: 'Protocol Docs',
            },
            {
              href: 'https://near-nodes.io',
              label: 'Validator Docs',
            },
            {
              to: '/integrations/exchange-integration',
              label: 'Exchange Integrations',
            },
          ],
        },
        {
          to: '/api/rpc/introduction',
          label: 'RPC',
          activeBaseRegex: '/api/rpc',
        },
        { label: 'Blog', to: '/blog', activeBaseRegex: '/blog', position: 'right' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [],
      copyright: 'Copyright © 2023 NEAR Protocol',
      logo: {
        src: 'img/near_logo.svg',
      },
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '0LUM67N2P2',
      // Public API key: it is safe to commit it
      apiKey: '50a400220b38e2d4bef996c7d0ed4b90',
      indexName: 'near',
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
          'headersLevels'
        ],
      },
      //... other Algolia params
      placeholder: 'Search the Docs...',
      insights: true,
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
