// @ts-check
const path = require('path');
const changelogs = require('./src/utils/changelogs.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NEAR Documentation',
  tagline: 'NEAR Protocol Developer Documentation',
  url: 'https://docs.near.org',
  baseUrl: '/build/',
  organizationName: 'near',
  projectName: 'docs',
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
        sourceBaseUrl: 'https://raw.githubusercontent.com/near/near-releases/main/reports/',
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
      defaultMode: 'light',
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
            { label: '🧰 All Tools', to: '/tools/welcome' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Essentials </small>',
            },
            { label: 'NEAR API', to: '/tools/near-api' },
            { label: 'NEAR SDK', to: '/tools/sdk' },
            { label: 'NEAR CLI', to: '/tools/near-cli' },
            { label: 'Wallet Selector', to: '/tools/wallet-selector' },
            {
              type: 'html',
              value: '<hr/> <small class="subtitle"> Data Services </small>',
            },
            { label: 'Explorers', to: '/tools/explorer' },
            { label: 'Data APIs', to: '/tools/ecosystem-apis/fastnear' },
            { label: 'Indexers', to: '/tools/indexing' },
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
              value: '<hr/><div class="subtitle"> Support </div>',
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
              value: '<hr /><div class="subtitle"> Education </div>',
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
              value: '<hr /><div class="subtitle"> Other Docs </div>',
            },
            {
              to: '/resources/contracts-list',
              label: 'Contracts List',
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
        {
          href: 'https://docs.near.ai',
          label: 'NEAR AI',
        },
        { label: 'Blog', to: '/blog', activeBaseRegex: '/blog', position: 'right' },
        {
          type: 'html',
          position: 'right',
          value:
            '<a class="navbar__link false" href="#" onclick="google.translate.TranslateElement({pageLanguage: \'en\', includedLanguages: \'af,sq,am,en,fa,ar,ps,ja,zh-CN,hy,az,eu,be,bn,bs,bg,ca,ceb,ny,zh-TW,co,hr,cs,da,nl,eo,et,tl,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,iw,hi,hmn,hu,is,ig,id,ga,it,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,te,th,tr,uk,ur,uz,vi,cy,xh,yi,yo,zu\'}, \'google_translate_element\');"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style="vertical-align: text-bottom"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg></a>',
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
