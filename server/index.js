const express = require('express')
// const { crudRoutes } = require('./routes/crudRoutes.js')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({ path: './config.env' })
const crudRoutes = require('./routes/crudRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const connectToPostgres = require('./Connection/postgresConnection.js')

const app = express()

const port = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const db = connectToPostgres();

app.use(authRoutes(db))
app.use(crudRoutes(db))

app.use((req, res, next) => {
    res.status(404).send('<h1>Api not Found</h1>')
    next()
})

app.listen(port, () => {
    console.log('Server is listening on port', port);
})
