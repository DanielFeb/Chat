module.exports = {
  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extend(config) {
      // Add TypeScript loader
      config.module.rules.push({
        test: /\.ts$/,
        loader: 'ts-loader'
      })
      // Add TypeScript loader for vue files
      const vueLoader = config.module.rules.find(r => r.loader === 'vue-loader')
      if (vueLoader) {
        vueLoader.options.loaders.ts = 'ts-loader?{"appendTsSuffixTo":["\\\\.vue$"]}'
      }
    },
    vendor: ['axios', 'iview', 'gsap', 'vuex-class', 'nuxt-class-component']
  },
  modules: []
}
