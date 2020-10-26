module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/netease': {
        target: 'http://www.cwzp990.top:3030',
        changeOrigin: true
      },
      '/': {
        target: 'http://www.cwzp990.top:3000',
        changeOrigin: true
      }
    }
  }
}