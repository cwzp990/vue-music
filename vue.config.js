module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://www.cwzp990.top:3000',
        changeOrigin: true
      },
      '/netease': {
        target: 'http://www.cwzp990.top:8080',
        changeOrigin: true
      }
    }
  }
}