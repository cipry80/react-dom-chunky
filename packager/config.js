const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StaticPlugin = require('./staticPlugin')
const pages = require('./pages')

module.exports = (options) => {
  return {
    entry: [
       path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'index.js')
    ],

    output: {
      filename: 'chunky.js',
      path: path.resolve(options.dir, 'web', 'build'),
      publicPath: '/',
      libraryTarget: 'umd'
    },

    devtool: 'source-map',

    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        path.resolve(options.dir),
        "node_modules"
      ]
    },

    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
            }
          }
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(options.dir, "node_modules", "react-chunky"),
            path.resolve(options.dir, "node_modules", "react-dom-chunky"),
            path.resolve(options.dir, "chunks")
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [path.resolve(options.dir, 'node_modules', 'babel-preset-env'), {
                  loose: true,
                  modules: false
                }],
                path.resolve(options.dir, 'node_modules', 'babel-preset-react'),
                path.resolve(options.dir, 'node_modules', 'babel-preset-stage-2')
              ]
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        { from: { glob: path.resolve(options.dir, "node_modules", "react-dom-chunky", "app", "assets/**/*"), dot: false }, to: "assets", flatten: 'true' },
        { from: { glob: path.resolve(options.dir, 'assets/**/*'), dot: false, to: "assets",  flatten: 'true' } }
      ])
    ].concat(pages(options)).concat([new StaticPlugin(Object.assign({}, options )),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        comments: false,
        beautify: true
      })
    ])
  }
}
