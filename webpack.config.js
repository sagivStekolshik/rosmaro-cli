module.exports = {
    target: 'node',
    entry: './src/rosmaro.js',
    output: {
        filename: "rosmaro.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}