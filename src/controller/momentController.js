const fs = require('fs')
const fileService = require('../service/fileService')
const momentService = require('../service/momentService')
const { PICTURE_PATH } = require('../constants/filePath')

class MomentController {
    async create(ctx, next) {
        // 获取数据(user_id,content)

        const userId = ctx.user.id
        const content = ctx.request.body.content
        // 将数据插入数据库
        const result = await momentService.create(userId, content)

        ctx.body = {
            code: 200,
            msg: '插入成功',
            data: {
                result
            }
        }

    }
    async detail(ctx, next) {
        // 获取数据(momentId)
        const momentId = ctx.params.momentId

        // 工具id查询这条数据

        const result = await momentService.getMomentById(momentId)

        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: result
        }

    }
    async list(ctx, next) {
        // 获取数据(offset,size)
        const { page, size } = ctx.query

        // 查询列表
        const result = await momentService.getMomentList(page, size)

        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: result
        }
    }
    async update(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        const { id } = ctx.user

        const result = await momentService.update(content, momentId)


        ctx.body = {
            code: 200,
            msg: '更新成功',
            data: {
                id,
                momentId,
                content,
                result
            }
        }
    }
    async remove(ctx, next) {
        const { momentId } = ctx.params
        const result = await momentService.remove(momentId)

        ctx.body = {
            code: 200,
            msg: '删除动态成功',
            data: result
        }
    }
    async addLabels(ctx, next) {
        // 获取标签和动态id
        const { labels } = ctx
        const { momentId } = ctx.params

        // 添加所有标签
        for (let label of labels) {
            // 判断标签是否已经存在动态中
            const isExist = await momentService.hasLabel(momentId, label.id)
            if (!isExist) {
                await momentService.addLabel(momentId, label.id)
            }

        }

        ctx.body = {
            code: 200,
            msg: '添加标签成功',
        }
    }
    async pictureInfo(ctx, next) {
        const { filename } = ctx.params
        const {type} = ctx.query

        const [pictureInfo] = await fileService.getPictureByFilename(filename)

        // 判断是否有传值，并且传的是指定的值
        const typePath = type === ('large' || 'middler' || 'small') ? `-${type}` : ''

        ctx.response.set('content-type', pictureInfo.mimetype)
        ctx.body = fs.createReadStream(
            `${PICTURE_PATH}/${pictureInfo.filename }${typePath}`
        )
    }
}

module.exports = new MomentController()