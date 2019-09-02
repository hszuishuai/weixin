module.exports = {
    devServer: {
        proxy: "http://localhost:9000",
        port:9000,
        proxy: {
            '/api': {
                target: 'https://www.igrowth365.com.cn',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            },
            '/wxapi': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/wxapi': ''
                }
            }
        }
    }
}