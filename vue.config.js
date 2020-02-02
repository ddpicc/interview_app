module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './server'
    }
  },

  devServer: {
    disableHostCheck: true,
    proxy: {
        '/api': {
            target: 'http://localhost:3000/api',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
        }
    }
  }

}
