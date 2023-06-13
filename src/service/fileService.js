const connection = require('../app/db')


class FileService {
    async createAvatar(filename, mimetype, size, userId) {
        const statement = `
        INSERT INTO avatars (filename, mimetype, size, user_id)  VALUES (?,?,?,?);`

        const result = await connection.execute(statement, [filename, mimetype, size, userId])
        return result[0]
    }
    async getAvatarByUserId(userId) {
        const statement = `
        SELECT * FROM avatars WHERE user_id = ?`

        const result = await connection.execute(statement, [userId])
        return result[0]
    }
    async createPicture(filename, mimetype, size, momentId, userId) {
        const statement = `
        INSERT INTO pictures (filename, mimetype, size, moment_id, user_id) VALUES (?,?,?,?,?)`

        const result = await connection.execute(statement, [filename, mimetype, size, momentId, userId])

        return result[0]
    }
    async getPictureByFilename(filename){
        const statement = `
        SELECT * FROM pictures WHERE filename = ?`
        const result = await connection.execute(statement,[filename])
        return result[0]
    }
}

module.exports = new FileService()