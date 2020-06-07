// vue.config.js
module.exports = {
  // 选项...
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.testarticle.com',
        changeOrigin: true,
        wx: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}