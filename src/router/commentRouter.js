const Router = require('koa-router')

const { create,reply,update,getComments,remove} = require('../controller/commentController')

const { verifyAuth,verifyPermission } = require('../middleware/authMiddleware')


const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)

// 回复评论
commentRouter.post('/:commentId/reply',verifyAuth,reply)

// 修改评论
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)

// 获取评论
commentRouter.get('/:momentId',getComments)

// 删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remove)

module.exports = commentRouter