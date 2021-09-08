const express = require('express')
const app = express()
const routes = require('./config/routes')
const expressConfig = require('./config/expressConfig')
const database = require('./config/database')
const {init: storage} = require('./middlewares/storage')
const auth = require('./middlewares/auth')

async function start() {
    await database(app)
    app.use(await storage())
    expressConfig(app)
    app.use(await auth(app))
    routes(app)
    app.listen(3000, () => console.log(`Server listening on port ${3000}...`));
    
  
}
start()
