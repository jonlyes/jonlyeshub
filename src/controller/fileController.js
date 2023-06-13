const fileService = require('../service/fileService')
const userService = require('../service/userService')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
    async saveAvatarInfo(ctx, next) {
        // 获取图像相关的信息
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user
        // 将图像信息数据保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id)

        // 将图片地址保存到users表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
        await userService.updateAvatarUrlById(avatarUrl, id)

        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: result
        }
    }
    async savePictureInfo(ctx, next) {
        // 拿到上传的动态id和用户id
        const { momentId } = ctx.params
        const { id } = ctx.user

        // // 拿到上传的配图信息数组
        const pictures = ctx.req.files

        for (let file of pictures) {
            // 将配图信息保存到数据库中
            const result = await fileService.createPicture(file.filename, file.mimetype, file.size, momentId, id)
        }
        ctx.body = {
            code: 200,
            msg: '插入成功'
        }
    }
}

module.exports = new FileController()