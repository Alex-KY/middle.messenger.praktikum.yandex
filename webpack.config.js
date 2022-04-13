const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'app.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chat.bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/src/index.html',
      filename: 'index.html',
      favicon: 'static/icons/favicon.ico'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        id: 'sprite_svg'
      }
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    open: true,
    hot: true
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(png|ttf|ico)$/,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: '/dist'
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
}
