const connection = require('../app/db')

class UserService {
    async create(user) {
        // 将user存储倒数据库中 
        const { name, password } = user;
        const statement = `insert into users (name,password) values (?,?);`

        const result = await connection.execute(statement, [name, password])

        return result[0]
    }
    async getUserByName(name) {
        // 将user存储倒数据库中 
        const statement = `select * from users where name=?;`

        const result = await connection.execute(statement, [name])

        return result[0]
    }
    async updateAvatarUrlById(avatarUrl, userId){
        const statement  = `
        UPDATE users SET avatar_url = ? WHERE id = ?`

        const result = await connection.execute(statement,[avatarUrl,userId])
        return result[0]
    }
}

module.exports = new UserService()