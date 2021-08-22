const Koa = require('koa')
const app = new Koa()
const router = require('./router')
app.use(router.routes())
const bodyParser = require('koa-bodyparser')
app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(require('koa-static')(__dirname + '/public'))
module.exports = app
