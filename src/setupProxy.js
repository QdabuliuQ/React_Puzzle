const {
  createProxyMiddleware
} = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api1", { //   这个/api，就是识别的请求路径拼接，告诉请求，当什么请求时，需要用到这里跨域
      target: "https://tuapi.eees.cc",
      changeOrigin: true, //跨域
      pathRewrite: {'^/api1': ''}
    })
  )
}