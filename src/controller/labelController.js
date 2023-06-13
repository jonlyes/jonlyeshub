const labelService = require('../service/labelService')
class LabelController {
    async create(ctx, next) {
        const { name } = ctx.request.body

        const result = await labelService.create(name)
        ctx.body = {
            code: 200,
            msg: '标签创建成功',
            data: {
                id: result.insertId,
                name
            }
        }

    }
    async list(ctx,next){
        const {page,size} = ctx.query
        const result = await labelService.getLabels(page,size)

        ctx.body={
            code:200,
            msg:'查询成功',
            data:result
        }
    }
}

module.exports = new LabelController()