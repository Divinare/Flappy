var path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "build")
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.png']
    },
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'file-loader',
                options: {
                    emitFile: true
                },
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        })
    ],
};
