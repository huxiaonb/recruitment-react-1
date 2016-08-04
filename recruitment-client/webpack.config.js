'use strict'
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      "./js/index.js"
    ],
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" },
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
        ]
    },
    resolve:{
      root: path.join(__dirname,'/js'),
      extensions:['','.js','.json']
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
};
