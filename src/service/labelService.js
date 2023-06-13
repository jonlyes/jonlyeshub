const connection = require('../app/db')

class LabelService {
    async create(name) {
        const statement = `
        insert into labels set name = ?`

        const result = await connection.execute(statement, [name])
        return result[0]
    }
    async getLabelByName(name) {
        const statement = `SELECT * FROM labels WHERE name = ?`
        const result = await connection.execute(statement, [name])

        return result[0]
    }
    async getLabels(page, size) {
         page = (page - 1) * size
        const statement = `
        SELECT * FROM labels LIMIT ?,?;`
        const result = await connection.execute(statement, [String(page), size])
        return result[0]
    }
}

module.exports = new LabelService()