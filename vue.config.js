module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/netease': {
        target: 'http://www.cwzp990.top:3030',
        changeOrigin: true
      },
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'juzi music'
      return args
    })
  }
}