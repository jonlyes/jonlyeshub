const fs = require('fs')

const userService = require('../service/userService')
const fileService = require('../service/fileService')

const { AVATAR_PATH } = require('../constants/filePath')

class UserController {
    async create(ctx, next) {
        // 获取用户请求传递的参数
        const user = ctx.request.body

        // 插入数据
        const result = await userService.create(user)

        //返回数据
        ctx.body = {
            code: 200,
            msg: '注册成功，请登录',
            data: {
                result
            }
        }
    }
    async avatarInfo(ctx, next) {
        // 用户头像
        const { userId } = ctx.params
        const [avatarInfo] = await fileService.getAvatarByUserId(userId)
        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new UserController()