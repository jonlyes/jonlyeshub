const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

// const userRouter = require('../router/userRouter')
// const authRouter = require('../router/authRouter')
const errorHandle = require('./errorHandle')
const useRoutes = require('../router/index')


const app = new Koa()

app.use(bodyParser({}))

// 注册路由
useRoutes(app)

app.on('error', errorHandle)
module.exports = app