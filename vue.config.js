const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = process.env.VUE_APP_PORT || 8000 // dev port

const host = process.env.VUE_APP_HOST

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: host,
    port: port,
    disableHostCheck: true
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080/api/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('components', resolve('src/components'))
      .set('views', resolve('views'))
      .set('assets', resolve('assets'))
    config.plugin('html').tap(args => {
      args[0].title = 'Loading...'
      return args
    })
  }
};