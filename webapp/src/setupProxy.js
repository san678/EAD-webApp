const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://hasthikagamala-001-site1.btempurl.com',
    changeOrigin: true,
  }));
};