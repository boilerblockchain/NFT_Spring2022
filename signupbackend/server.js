const express = require('express')
const app = express()
const mongoose = require('mongoose') // connects to db
const dotenv = require('dotenv') // secures credentials
const routesUrls = require('./routes/routes') // routes.js
const cors = require('cors')

dotenv.config() // environment for secure credentials

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

app.use(express.json()) // parses bodies
app.use(cors()) // cors
app.use('/app', routesUrls) // routesURLS is appended to base app path
app.listen(4000, () => console.log("Server is up and running"))
