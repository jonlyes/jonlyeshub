const errorTypes = require('../constants/errorTypes')

const labelService = require('../service/labelService')

const verifyLabelExists = async (ctx, next) => {
    // 获取参数
    const { labels } = ctx.request.body

    // 判断标签在label表中是否存在

    const newLabels = []

    for (let name of labels) {
        const labelResult = await labelService.getLabelByName(name)

        const label = { name }
        if (!labelResult[0]) {
            // 创建标签
            const result = await labelService.create(name)
            label.id = result.insertId
        } else {
            label.id = labelResult[0].id
        }
        newLabels.push(label)
    }

    ctx.labels = newLabels

    await next()
}

module.exports = {
    verifyLabelExists
}