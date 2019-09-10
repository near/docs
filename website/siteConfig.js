const siteConfig = {
  title: 'Documentation',
  tagline: 'Documentation for Near Protocol',
  url: 'https://docs.nearprotocol.com',
  baseUrl: '/',

  projectName: 'near-docs',
  organizationName: 'nearprotocol',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {href:"google.com", label:"Quickstart"},
    {href:"google.com", label:"Near Studio"},
    {href:"google.com", label:"Chat(Discord)"},
    {search: true}
  ],

  /* path to images for header/footer */
  headerIcon: 'img/near_logo.svg',
  footerIcon: 'img/near_logo.svg',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#FFFFFF',
    secondaryColor: '#FE585D',
  },
  
  algolia: {
    apiKey: 'my-api-key',
    indexName: 'my-index-name',
    algoliaOptions: {} 
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

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/near_logo.svg',
  twitterImage: 'img/near_logo.svg',

  // Ability to collapse sidebar
  // docsSideNavCollapsible: true,

  // Last person to update doc
  enableUpdateBy: true,

  // Last time updated by author
  enableUpdateTime: true,
};

module.exports = siteConfig;