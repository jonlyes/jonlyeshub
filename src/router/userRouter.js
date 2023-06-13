
const Router = require('koa-router')

const {create,avatarInfo} =require('../controller/userController')
const {verifyUser,handlePassword} = require('../middleware/userMiddleware') 

const {verifyAuth} = require('../middleware/authMiddleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/',verifyUser,handlePassword,create)

userRouter.get('/:userId/avatar',avatarInfo)

module.exports = userRouter