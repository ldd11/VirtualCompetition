// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpritesmithPlugin = require('webpack-spritesmith');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

console.log("isProduction", isProduction);
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    static: path.resolve(__dirname, "."),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body",
    }),
    new MonacoWebpackPlugin({
      languages: ["python"],
      
      //filename: "monaco/[name].[contentHash].worker.js",
    }),
    new webpack.DefinePlugin({
      'process.env.DRAGGABLE_DEBUG': true,
    }),
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
    }),
  ],
  module: {
    rules: [
      {
        test: /[\\/]node_modules[\\/](monaco(.[a-zA-Z0-9.\-_]+))[\\/].*\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        }
      },
      {
        test: /[\\/]node_modules[\\/](vscode(.[a-zA-Z0-9.\-_]+))[\\/].*\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        }
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    fallback: {
      "path": require.resolve("path-browserify"),
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    splitChunks: {
      // automaticNameDelimiter: "-",
      // name: false,
      // enforceSizeThreshold: 10000,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendors/react',
          chunks: 'all',
        },
        monacoCommon: {
          test: /[\\/]node_modules[\\/](monaco-editor\/esm\/vs\/.*\/common\/.*\.js$)/,
          name: 'vendors/monaco-common',
          chunks: 'all',
          priority: -10,
        },
        monacoBrowser: {
          test: /[\\/]node_modules[\\/](monaco-editor\/esm\/vs\/.*\/browser\/.*\.js$)/,
          name: 'vendors/monaco-browser',
          chunks: 'all',
          priority: -10,
        },
        monacoContrib: {
          test: /[\\/]node_modules[\\/](monaco-editor\/esm\/vs\/editor\/contrib\/.*\.js$)/,
          name: 'vendors/monaco-contrib',
          chunks: 'all',
          priority: -5,
        },
        // monaco: {
        //   test: /[\\/]node_modules[\\/](monaco(.[a-zA-Z0-9.\-_]+))[\\/].*\.js$/,
        //   name: 'vendors/monaco',
        //   chunks: 'all',
        //   priority: -20
        // },
        vscode: {
          test: /[\\/]node_modules[\\/](vscode(.[a-zA-Z0-9.\-_]+))[\\/]/,
          name: 'vendors/vscode',
          chunks: 'all',
        },
        // filter out all the other node_modules
        // other: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors/other',
        //   chunks: 'all',
        // },
      }
    }
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new BundleAnalyzerPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
