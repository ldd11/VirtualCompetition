const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  builderOptions: {
    bizName: 'FreeBuildTreeView', // 'FreeBuildTreeView'
    useStyleBase: false,
    webpackConfig: {
      config: {
        // rules: [
        //   {
        //     test: /\.js$/,
        //     use: 'source-map-loader',
        //     enforce: 'pre',
        //     include: /ec-ide-header|assetsLib/
        //   }
        // ],
        plugins: [
          new SpritesmithPlugin({
            // 目标小图标
            src: {
              cwd: path.resolve(__dirname, './src/assets/images/sprite'),
              glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
              image: path.resolve(__dirname, './src/assets/images/sprite.png'),
              css: [path.resolve(__dirname, './src/assets/style/sprite.css'), path.resolve(__dirname, './src/assets/style/sprite.less')]
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
              cssImageRef: '../../assets/images/sprite.png'
            },
            spritesmithOptions: {
              algorithm: 'top-down',
              padding: 4
            }
          })
        ]
      }, // 定制化的webpack配置
      smartStrategyOption: {
        'module.rules': 'prepend'
      } // 合并webpack配置的策略（可以选择和默认的配置字段进行替换或者合并，详情可以见 https://github.com/survivejs/webpack-merge 的smartStrategy）
    },
  }
};
