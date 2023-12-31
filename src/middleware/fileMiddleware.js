const path = require('path')
const Multer = require('koa-multer')
const Jimp = require('jimp')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/filePath')

// 头像
const avatarUpload = Multer({
    dest: AVATAR_PATH
})
// 处理图像
const avatarHandler = avatarUpload.single('avatar')


// 配图
const pictureUpload = Multer({
    dest: PICTURE_PATH
})
// 处理图像数组
const pictureHandler = pictureUpload.array('picture', 9)


const pictureResize = async (ctx, next) => {
    const files = ctx.req.files

    for (let file of files) {
        const destPath = path.join(file.destination, file.filename)

        Jimp.read(file.path).then(image => {
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640, Jimp.AUTO).write(`${destPath}-middler`)
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        })
    }
    await next()
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}