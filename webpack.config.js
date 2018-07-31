const path = require('path')
const pkg = require('./package')

const shared = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['> 2%']
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: pkg.browser,
    library: pkg.library,
    libraryTarget: 'umd'
  }
}

const dev = {
  ...shared,
  mode: 'development',
  devtool: 'eval-source-map'
}

const prod = {
  ...shared,
  mode: 'production',
  devtool: 'source-map'
}

module.exports = process.env.NODE_ENV === 'dev' ? dev : prod
