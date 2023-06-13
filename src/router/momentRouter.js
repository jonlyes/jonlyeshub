const Router = require('koa-router')

const { create, detail, list,update,remove ,addLabels,pictureInfo} = require('../controller/momentController')

const { verifyAuth,verifyPermission } = require('../middleware/authMiddleware')
const {verifyLabelExists} = require('../middleware/labelMiddleware')


const momentRouter = new Router({ prefix: '/moment' })

// 发表动态
momentRouter.post('/', verifyAuth, create)

// 获取动态(列表)
momentRouter.get('/', list)

// 获取动态(单个)
momentRouter.get('/:momentId', detail)

// 修改动态
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)

// 删除动态
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)

// 获取动态配图
momentRouter.get('/image/:filename',pictureInfo)

module.exports = momentRouter