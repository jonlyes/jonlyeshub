const app = require('./app')
require('./app/db')

const config =require('./app/config')

app.listen(config.APP_PORT, () => {
    console.log('服务器启动成功');
})