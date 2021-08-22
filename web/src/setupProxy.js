const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  const { REACT_APP_SERVER } = process.env
  app.use(
    createProxyMiddleware('/chat', {
      target: REACT_APP_SERVER,
      pathRewrite: {
        '^/chat': '/chat',
      },
    })
  )
}
