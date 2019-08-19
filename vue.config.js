const path = require('path')
module.exports = {
  publicPath:'',
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      '/index': {
        target: 'http://www.greetrend.com/web/',  // 跨域地址
        changeOrigin: true,  // 开启跨域
        pathRewrite: {
          '^/index': ''  // rewrite path
        }
      },
      '/img': {
        target: 'http://www.greetrend.com:8888/',
        changeOrigin: true,  // 开启跨域
        pathRewrite: {
          '^/img': ''  // rewrite path
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname,'./src'),
        '@api': path.resolve(__dirname, './src/api')
      } // 别名配置
    },
    externals: {
      AMap: "AMap"
    },
  }

};