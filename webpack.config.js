const path = require('path');

module.exports = {
  entry: './src/materialize/global.ts',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
         ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'materialize-css.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'M'    
  }
};