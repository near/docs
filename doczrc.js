import setAliases from './setAliases';

export default {
  title: 'Documentation -- NEAR Protocol',
  description: 'NEAR Protocol Documentation',
  dest: '/docs',
  indexHtml: 'src/index.html',
  repository: 'https://github.com/nearprotocol/docs',
  hashRouter: true,
  menu: [
    "Overview",
    "Quick start",
    "Tutorials",
    "Protocol details",
  ],
  modifyBundlerConfig: config => setAliases(config),
  themeConfig: {
    logo: {
      src: 'public/near_logo.svg',
      width: 200,
    },
    styles: {
      body: {
        fontFamily: "Stolzl, sans-serif",
        fontSize: 22,
        fontWeight: 300,
        lineHeight: 1.6,
      },
      h1: {
        fontFamily: "Stolzl, sans-serif",
        fontSize: 68,
        fontWeight: 300,
        lineHeight: 1.1,
      }
    }
  },
}
