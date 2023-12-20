const boardsRoutes = require('./Routes/boardsRoute')
const ListRoutes = require('./Routes/listsRoute')
const TaskRoutes = require('./Routes/taskRoute')
const { sendResponse } = require('./Utils/utilServices')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/api/v1/boards', boardsRoutes)
app.use('/api/v1/lists', ListRoutes)
app.use('/api/v1/tasks', TaskRoutes)

app.use((error, req, res, next) => sendResponse(res, 500, error.message))

mongoose
    .connect(process.env.MONGODB_URI)
    .then((response) => app.listen(process.env.PORT, (e) => console.log('connected to mongodb',)))
    .catch((error) => console.log(error))