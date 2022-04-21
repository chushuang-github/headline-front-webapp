// vue.config.js
const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // 我们这里less-loader的版本是^5.0.0，所以移除了lessOptions这一项
        // lessOptions: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#007bff',
          // 'nav-bar-title-text-color': '#fff',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // __dirname：当前文件所在文件的绝对路径
          hack: `true; @import "${path.join(__dirname, './src/styles/cover.less')}";`
        }
        // }
      }
    }
  }
}
