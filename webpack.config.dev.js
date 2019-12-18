
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: __dirname+ '/build',
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("autoprefixer")({
                                    overrideBrowserslist: [
                                        ">1%","last 2 versions"
                                    ]
                                }),
                                require("postcss-preset-env")()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: path.join(__dirname, '/zf/index.html'),
            template: './public/index.html',
            inject: 'body'
        })
    ],
    devServer: {
        historyApiFallback: {
            // rewrites: [{ from: /^\/$/, to: '/index.html' }],
            rewrites: [
                {
                    from: /^\/$/,
                    to: '/public/index.html',
                }
            ]
        }
    }
}
