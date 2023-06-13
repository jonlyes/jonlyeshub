const errorTypes = require('../constants/errorTypes')
const userService = require('../service/userService')
const md5password = require('../utils/paswordHandle')

const verifyUser = async (ctx, next) => {
    // 获取用户名和密码
    const { name, password } = ctx.request.body
    // 判断用户名或密码不难为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }

    // 判断这次注册的用户是否存在
    const result = await userService.getUserByName(name)
    if (result.length) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

const handlePassword = async (ctx, next) => {
    const {password} = ctx.request.body
    ctx.request.body.password = md5password(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}