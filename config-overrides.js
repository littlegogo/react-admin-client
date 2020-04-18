const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override (
    fixBabelImports('import', {
        // 针对antd按需打包，使用babel-plugin-import
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 自动打包相关的css样式
      }),
      // 修改antd默认主题，其它颜色修改参见antd文档
      // 使用less-loader对源码中的less的变量进行重新指定
      addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
      }),
);