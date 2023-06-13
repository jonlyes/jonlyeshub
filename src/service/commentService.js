const connection = require('../app/db')
class CommentService {
    async create(momentId, content, userId) {
        const statement = `
        INSERT INTO comments (content,moment_id,user_id) VALUES (?,?,?);
        `
        const result = await connection.execute(statement, [content, momentId, userId])

        return result[0]
    }
    async reply(momentId, content, commentId, userId) {
        const statement = `
        INSERT INTO comments (content,moment_id,comment_id,user_id) VALUES (?,?,?,?);
        `
        const result = await connection.execute(statement, [content, momentId, commentId, userId])

        return result[0]
    }
    async update(commentId, content) {
        const statement = `
        UPDATE comments SET content = ? WHERE id = ?`
        const result = await connection.execute(statement, [content, commentId])
        return result[0]
    }
    async getCommentsByMomentId(momentId) {
        const statement = `
        SELECT c.id,c.content,c.moment_id, c.comment_id c.createAt,JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt) user FROM comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.moment_id = ?`

        const result = await connection.execute(statement, [momentId])
        return result[0]
    }
    async remove(commentId) {
        const statement = `
        delete from comments where id = ?`
        const result = await connection.execute(statement, [commentId])
        return result[0]
    }
}

module.exports = new CommentService()