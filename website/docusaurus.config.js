module.exports = {
  title: "NEAR Documentation",
  tagline: "Documentation for NEAR Protocol",
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
    "/js/hotjar.js",
  ],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap",
    "/css/copy-code-button.css",
    "/css/landing-page.css",
    "https://near.org/wp-content/themes/near-19/assets/dist/near.min.css",
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
          breadcrumbs: false,
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
  plugins: [],
  themeConfig: {
    announcementBar: {
      id: "Docs",
      content:
        '⚠️ This page is in the making ⚠️ The NEAR documentation can be <a href="https://docs.near.org">found here</a>',
      backgroundColor: "#ff6d6d",
      textColor: "#0e0e0e",
      isCloseable: false,
    },
    prism: {
      additionalLanguages: [
        "rust",
        "java",
        "python",
        "ruby",
        "go",
        "toml",
        "typescript",
      ],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
    },
    navbar: {
      title: "DOCS",
      logo: {
        src: "img/near_logo.svg",
      },
      items: [
        {
          to: "/concepts/welcome",
          label: "📖 Concepts",
          position: "left",
        },
        {
          to: "/develop/welcome",
          label: "💻 Develop",
          position: "left",
        },
        {
          to: "/tutorials/welcome",
          label: "📚 Tutorials",
          position: "left",
        },
        {
          to: "/tools/welcome",
          label: "⚙️ Tools",
          position: "left",
        },
        {
          to: "/api/rpc/introduction",
          label: "🔌 API",
          position: "left",
        },
        {
          href: "https://near-sdk.io",
          label: "SDK",
          position: "right",
        },
        {
          href: "https://near-nodes.io",
          label: "Nodes",
          position: "right",
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
      apiKey: "3975a6e99f873047efc41f318b7da1aa",
      indexName: "near",
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: "near\\.org|near-sdk\\.io",
      // Optional: Algolia search parameters
      searchParameters: {},
      //... other Algolia params
      placeholder: "Search the Docs...",
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "vi", "zh-CN"],
    localeConfigs: {
      "zh-CN": {
        label: "简体中文",
      },
    },
  },
};
