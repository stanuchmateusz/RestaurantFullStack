const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        legacyCreateProxyMiddleware({
            target: 'http://192.168.1.69:8080/api/v1',
            changeOrigin: true,
        })
    );
};