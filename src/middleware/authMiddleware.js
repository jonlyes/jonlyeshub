const jwt = require('jsonwebtoken')
const errorTypes = require('../constants/errorTypes')
const userService = require('../service/userService')
const md5password = require('../utils/paswordHandle')
const authService = require('../service/authService')


const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
    // 获取用户名和密码

    const { name, password } = ctx.request.body

    // 判断用户名或密码是否为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)

    }

    // 判断用户是否存在
    const result = await userService.getUserByName(name)
    const user = result[0]
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    // 判断密码是否和数据库密码一致
    if (user.password !== md5password(password)) {
        const error = new Error(errorTypes.PASSWORD_IS_ERROR)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = user

    await next()
}

const verifyAuth = async (ctx, next) => {
    // 获取token
    const authorization = ctx.header.authorization
    if (!authorization) {
        const error = new Error(errorTypes.UN_AUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace("Bearer ", "")

    // 验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: 'RS256'
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UN_AUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }
}

const verifyPermission = async (ctx, next) => {
    // 获取参数

    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id', 's')
    const resourceId = ctx.params[resourceKey]
    const { id } = ctx.user
    //查询数据

    // 查询是否具备权限
    try {
        const isPermission = await authService.check(tableName, resourceId, id)
        if (!isPermission) throw Error()
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UN_PERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}