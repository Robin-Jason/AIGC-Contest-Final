const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检查

  devServer: {
    host: "0.0.0.0", // 访问项目的IP地址，可以设置为“0.0.0.0”来使项目外部可访问
    port: 8080, // 访问项目的端口号
    open: true, // 自动启动浏览器
    proxy: {
      "/api": {
        target: "http://localhost:28080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      },

    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  }
});
