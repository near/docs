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
    {href:'https://studio.nearprotocol.com', label:"STUDIO"},
    {href:'https://discordapp.com/invite/jsAu4pP', label:"DISCORD"},
    { href:'https://stackoverflow.com/questions/tagged/nearprotocol', label:"QUESTION?"},
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
    // theme: 'a11y-dark',
    // theme: 'a11y-light',
    // theme: 'agate',
    // theme: 'an-old-hope',
    // theme: 'androidstudio',
    // theme: 'arduino-light',
    // theme: 'arta',
    // theme: 'ascetic',
    // theme: 'atelier-cave-dark',
    // theme: 'atelier-cave-light',
    // theme: 'atelier-dune-dark',
    // theme: 'atelier-dune-light',
    // theme: 'atelier-estuary-dark',
    // theme: 'atelier-estuary-light',
    // theme: 'atelier-forest-dark',
    // theme: 'atelier-forest-light',
    // theme: 'atelier-heath-dark',
    // theme: 'atelier-heath-light',
    // theme: 'atelier-lakeside-dark',
    // theme: 'atelier-lakeside-light',
    // theme: 'atelier-plateau-dark',
    // theme: 'atelier-plateau-light',
    // theme: 'atelier-savanna-dark',
    // theme: 'atelier-savanna-light',
    // theme: 'atelier-seaside-dark',
    // theme: 'atelier-seaside-light',
    // theme: 'atelier-sulphurpool-dark',
    // theme: 'atelier-sulphurpool-light',
    // theme: 'atom-one-dark-reasonable',
    // theme: 'atom-one-dark',
    // theme: 'atom-one-light',
    // theme: 'brown-paper',
    // theme: 'codepen-embed',
    // theme: 'color-brewer',
    // theme: 'darcula',
    // theme: 'dark',
    // theme: 'darkula',
    // theme: 'default',
    // theme: 'docco',
    // theme: 'dracula',
    // theme: 'far',
    // theme: 'foundation',
    // theme: 'github-gist',
    // theme: 'github',
    // theme: 'gml',
    // theme: 'googlecode',
    // theme: 'grayscale',
    theme: 'gruvbox-dark',          // <-- seems to match our theme colors
    // theme: 'gruvbox-light',
    // theme: 'hopscotch',
    // theme: 'hybrid',
    // theme: 'idea',
    // theme: 'ir-black',
    // theme: 'isbl-editor-dark',
    // theme: 'isbl-editor-light',
    // theme: 'kimbie.dark',
    // theme: 'kimbie.light',
    // theme: 'lightfair',
    // theme: 'magula',
    // theme: 'mono-blue',
    // theme: 'monokai-sublime',
    // theme: 'monokai',
    // theme: 'night-owl',
    // theme: 'nord',
    // theme: 'obsidian',
    // theme: 'ocean',
    // theme: 'paraiso-dark',
    // theme: 'paraiso-light',
    // theme: 'pojoaque',
    // theme: 'purebasic',
    // theme: 'qtcreator_dark',
    // theme: 'qtcreator_light',
    // theme: 'railscasts',
    // theme: 'rainbow',
    // theme: 'routeros',
    // theme: 'school-book',
    // theme: 'shades-of-purple',
    // theme: 'solarized-dark',
    // theme: 'solarized-light',
    // theme: 'sunburst',
    // theme: 'tomorrow-night-blue',
    // theme: 'tomorrow-night-bright',
    // theme: 'tomorrow-night-eighties',
    // theme: 'tomorrow-night',
    // theme: 'tomorrow',
    // theme: 'vs',
    // theme: 'vs2015',
    // theme: 'xcode',
    // theme: 'xt256',
    // theme: 'zenburn',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/copy-code-button.js',
    '/js/hotjar.js',
    'https://use.fontawesome.com/221fd444f5.js'
  ],

  stylesheets: ['/css/copy-code-button.css'],

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
