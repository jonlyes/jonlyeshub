const commentService = require('../service/commentService')

class CommentController {
    async create(ctx, next) {
        const { momentId, content } = ctx.request.body
        const { id } = ctx.user

        const result = await commentService.create(momentId, content, id)

        ctx.body = {
            code: 200,
            msg: '评论成功',
            data: {
                momentId, content,
                id,
                result
            }
        }
    }
    async reply(ctx, next) {
        const { momentId, content } = ctx.request.body
        const { commentId } = ctx.params
        const { id } = ctx.user

        const result = await commentService.reply(momentId, content, commentId, id)

        ctx.body = {
            code: 200,
            msg: '插入成功',
            data: {
                momentId,
                content,
                commentId,
                id,
                result
            }
        }
    }
    async update(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body

        const result = await commentService.update(commentId, content)

        ctx.body = {
            code: 200,
            msg: '修改成功',
            data: result
        }
    }
    async getComments(ctx, next) {
        const { momentId } = ctx.params
        const result = await commentService.getCommentsByMomentId(momentId)
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: result
        }
    }
    async remove(ctx,next) {
        const {commentId} =ctx.params
        const result = await commentService.remove(commentId)

        ctx.body = {
            code:200,
            msg:'删除成功',
            data:result
        }
     }
}

module.exports = new CommentController()