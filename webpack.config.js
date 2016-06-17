'use strict'

const webpack = require('webpack')

function makeConfig(minify) {
  return {
    entry: './src/index.js',

    output: {
      path: 'dist',
      filename: minify
        ? 'ko-projections.min.js'
        : 'ko-projections.js',
      library:  'ko-projections',
      libraryTarget: 'umd'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015']
          }
        }
      ]
    },

    externals: {
      'knockout': {
        root: 'ko',
        commonjs: 'knockout',
        commonjs2: 'knockout',
        amd: 'knockout'
      },
      'lodash': {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash'
      }
    },

    plugins: minify
      ? [new webpack.optimize.UglifyJsPlugin()]
      : []
  }
}

module.exports = [
  makeConfig(),
  makeConfig(true)
]
