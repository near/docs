const siteConfig = {
  title: "NEAR Documentation",
  disableHeaderTitle: true,
  tagline: 'Documentation for NEAR Protocol',
  url: 'https://docs.nearprotocol.com',
  baseUrl: '/',
  projectName: 'near-docs',
  organizationName: 'nearprotocol',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc:"quick-start/blockchain-prerequisite", label:"QUICK START"},
    {search: true},
    {href:'https://studio.nearprotocol.com', label:"NEAR STUDIO"},
    {href:'https://discordapp.com/invite/jsAu4pP', label:"CHAT ON DISCORD"},
  ],

  algolia: {
    apiKey: '058929d1d423f0f46d3278a102d58bfd',
    indexName: 'near',
    placeholder: 'Search the Docs...'

  },

  /* path to images for header/footer */
  headerIcon: 'img/near_logo_white.svg',
  footerIcon: 'img/near_logo_white.svg',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#24272A',
    secondaryColor: '#24272A',
  },

  fonts: {
    myFont: [
      "benton-sans",
      "sans-serif"
    ]
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Near Protocol`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],
  
  // Google Analytics
  gaTrackingId: "UA-100373569-7",

  // On page navigation for the current documentation page.
  onPageNav: 'separate',

  // Allow collapsible categories in the sidenav
  docsSideNavCollapsible: true,

  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/near_logo.svg',
  twitterImage: 'img/near_logo.svg',

  // Last person to update doc
  enableUpdateBy: true,

  // Last time updated by author
  enableUpdateTime: true,
};

module.exports = siteConfig;