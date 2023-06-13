const connection = require('../app/db')
const {APP_HOST,APP_PORT} = require('../app/config')

class MomentService {
  async create(userId, content) {
    // 将数据插入倒数据库中
    const statement = `insert into moments (user_id,content) values (?,?);`

    const result = await connection.execute(statement, [userId, content])
    return result[0]
  }
  async getMomentById(momentId) {
    const statement = `
      SELECT
        m.id AS id,
        m.content AS content,
        m.createAt AS createTime,
        m.updateAt AS updataTime,
        JSON_OBJECT(
          'id',u.id,
          'name',u.name,
          'avatarUrl',u.avatar_url
          ) AS user,
        (SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id',c.id,
              'content',c.content,
              'createTime',c.createAt,
              'updateTime',c.updateAt,
              'user',JSON_OBJECT('id',cu.id,'name',cu.name,
              'avatarUrl',cu.avatar_url)
              )
            )
          FROM comments c
          LEFT JOIN users cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) AS comments,
        (SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id',l.id,
              'name',l.name
            )
          )
        FROM moment_label ml
        LEFT JOIN labels l ON l.id = ml.label_id
        WHERE ml.moment_id = m.id
        ) AS labels,
        (SELECT
          JSON_ARRAYAGG(
              CONCAT('${APP_HOST}:${APP_PORT}/moment/image/',p.filename)
              )
        FROM pictures p
        WHERE p.moment_id = m.id
        ) AS pictures
    FROM moments m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.id = ?`
    const result = await connection.execute(statement, [momentId])
    return result[0]
  }
  async getMomentList(page, size) {
    const statement = `
    SELECT m.id AS id,
      m.content AS content,
      m.createAt AS createTime,
      m.updateAt AS updateTime,
    JSON_OBJECT(
      'id',u.id,
      'name',u.name,
      'avatarUrl',u.avatar_url
      ) AS user ,
    (SELECT COUNT(*) FROM
      comments c 
      WHERE c.moment_id = m.id
    ) AS commentCount,
    (SELECT
      JSON_ARRAYAGG(
          CONCAT('${APP_HOST}:${APP_PORT}/moment/image/',p.filename)
          )
    FROM pictures p
    WHERE p.moment_id = m.id
    ) AS pictures
    FROM moments m
    LEFT JOIN users u
    ON m.user_id = u.id   
    LIMIT ?,?;`
    console.log(page, size);
    const result = await connection.execute(statement, [`${(page - 1) * size}`, size])
    return result[0]
  }
  async update(content, momentId) {
    const statement = `
      UPDATE moments SET content = ? WHERE id = ?`
    const result = await connection.execute(statement, [content, momentId])
    return result[0]
  }
  async remove(momentId) {
    const statement = `
      delete from moments where id = ?`
    const result = await connection.execute(statement, [momentId])
    return result[0]
  }
  async hasLabel(momentId, labelId) {
    const statement = `
    SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const result = await connection.execute(statement, [momentId, labelId])
    return result[0].length == 0 ? false : true
  }
  async addLabel(momentId, labelId) {
    const statement = `
    INSERT INTO moment_label (moment_id,label_id) values (?,?);`
    const result = await connection.execute(statement, [momentId, labelId])
    return result[0]
  }
}
module.exports = new MomentService()