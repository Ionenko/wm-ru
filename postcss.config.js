module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            present: [
                'default',
                {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
};