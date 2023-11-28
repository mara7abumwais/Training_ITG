const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:'./app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    plugins: [new CleanWebpackPlugin()],
};
