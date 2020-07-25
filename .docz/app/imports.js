export const imports = {
  'src/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'),
  'src/quick_start.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-quick-start" */ 'src/quick_start.mdx'),
  'src/basics/the_basics.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-basics-the-basics" */ 'src/basics/the_basics.mdx'),
  'src/lib/js.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-lib-js" */ 'src/lib/js.mdx'),
  'src/lib/ts.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-lib-ts" */ 'src/lib/ts.mdx'),
  'src/protocol/consensus.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-protocol-consensus" */ 'src/protocol/consensus.mdx'),
  'src/tutorials/multiplayergame.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-tutorials-multiplayergame" */ 'src/tutorials/multiplayergame.mdx'),
  'src/tutorials/oracle.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-tutorials-oracle" */ 'src/tutorials/oracle.mdx'),
  'src/tutorials/token.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-tutorials-token" */ 'src/tutorials/token.mdx'),
}
