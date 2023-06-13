const Router = require('koa-router')

const {verifyAuth} = require('../middleware/authMiddleware')
const {avatarHandler,pictureHandler,pictureResize} = require('../middleware/fileMiddleware')
const {saveAvatarInfo,savePictureInfo} = require('../controller/fileController')

const fileRouter = new Router({prefix:'/file'})



fileRouter.post('/avatar',verifyAuth,avatarHandler,saveAvatarInfo)

fileRouter.post('/pictures/:momentId',verifyAuth,pictureHandler,pictureResize,savePictureInfo)


module.exports = fileRouter