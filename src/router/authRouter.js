
const Router = require('koa-router')

const { login,susses } = require('../controller/authController')
const { verifyLogin,verifyAuth } = require('../middleware/authMiddleware')

const authRouter = new Router()

authRouter.post('/login', verifyLogin, login)

authRouter.get('/test',verifyAuth,susses)

module.exports = authRouter