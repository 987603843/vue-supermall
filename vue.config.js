var webpack = require('webpack')
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    },
  }
}