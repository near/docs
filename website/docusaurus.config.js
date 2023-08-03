// @ts-check
const path = require('path');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "NEAR Documentation",
  tagline: "NEAR Protocol Developer Documentation",
  url: "https://docs.near.org",
  baseUrl: "/",
  organizationName: "near",
  projectName: "docs",
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "https://use.fontawesome.com/221fd444f5.js",
    "/js/copy-code-button.js",
    "/js/mixpanel.js",
  ],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap",
    "/css/copy-code-button.css",
    "/css/landing-page.css",
    "/css/near.min.css",
  ],
  favicon: "img/favicon.ico",
  customFields: {
    disableHeaderTitle: true,
    fonts: {
      myFont: ["Inter", "sans-serif"],
    },
  },
  themes: ["@saucelabs/theme-github-codeblock"],
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
          editUrl: "https://github.com/near/docs/edit/master/website",
          path: "../docs",
          sidebarPath: "./sidebars.json",
          routeBasePath: "/",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
        googleAnalytics: {
          trackingID: "UA-100373569-7",
          anonymizeIP: true,
        },
        blog: {},
        theme: {
          customCss: "/src/css/customTheme.css",
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'near-api-js',
        // this path doesn't exit, the versioning mechanism takes docs from website/near-api-js_versioned_docs
        path: '../__generated/near-api-js',
        routeBasePath: '/tools/near-api-js/reference',
        includeCurrentVersion: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'near-sdk-js',
        // this path doesn't exit, the versioning mechanism takes docs from website/near-sdk-js_versioned_docs
        path: '../__generated/near-sdk-js',
        routeBasePath: '/sdk/near-sdk-js/reference',
        includeCurrentVersion: false,
      },
    ],
    path.join(__dirname, '/plugins/monaco-editor')
  ],
  themeConfig: {
    plugins: [path.join(__dirname, '/plugins/monaco-editor')],
    prism: {
      additionalLanguages: [
        "rust",
        "java",
        "python",
        "ruby",
        "go",
        "typescript",
      ],
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'NEAR Logo',
        src: "img/near_logo.svg",
        srcDark: 'img/near_logo_white.svg',
      },
      items: [
        {
          to: "/concepts/welcome",
          label: "Concepts",
          position: "left",
        },
        {
          label: "Develop",
          position: "left",
          items: [
            { label: "Overview", href: "/develop/welcome" },
            { label: "Smart Contracts", href: "/develop/welcome" },
            { label: "Frontend", href: "/bos" },
            { label: "Monitor dApps (Indexers)", href: "/bos" },
            {
              type: 'html',
              value: '<hr/>',
            },
            {
              label: "Exchange Integration",
              href: "/integrator/exchange-integration",
            },

          ]
        },
        {
          type: "dropdown",
          label: "Tools",
          position: "left",
          items: [
            { label: "JS API (WebApp)", href: "/bos" },
            { label: "JS SDK (Smart Contracts)", href: "/sdk/welcome" },
            { label: "RS SDK (Smart Contract)", href: "/sdk/welcome" },
            { label: "NEAR CLI (Bash)", href: "/bos" },
            { label: "... More Tools", href: "/bos" },
          ]
        },
        {
          to: "/tutorials/welcome",
          label: "Tutorials",
          position: "left",
        },
        {
          href: "/api/rpc/introduction",
          label: "RPC",
        },
        {
          type: "dropdown",
          label: "Other Docs",
          position: "left",
          items: [
            {
              href: "https://nomicon.io",
              label: "Protocol Docs",
            },
            {
              href: "https://near-nodes.io",
              label: "Validator Docs",
            },]
        },
        {
          type: "search",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    image: "img/near_logo.svg",
    footer: {
      links: [],
      copyright: "Copyright © 2021 NEAR Protocol",
      logo: {
        src: "img/near_logo.svg",
      },
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "0LUM67N2P2",
      // Public API key: it is safe to commit it
      apiKey: "129d0f429e1bb0510f0261dda1e88ed4",
      indexName: "near",
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: "near-sdk\\.io",
      // Optional: Algolia search parameters
      searchParameters: {
        clickAnalytics: true,
        analytics: true,
        enableReRanking: true,
      },
      //... other Algolia params
      placeholder: "Search the Docs...",
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko", "vi", "zh-CN"],
    localeConfigs: {
      "zh-CN": {
        label: "简体中文",
      },
    },
  },
};
