module.exports = {
    host: 'localhost',
    port: 8080,

    proxyTable: {
        '/api': {
            target: 'http://localhost:8090/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}