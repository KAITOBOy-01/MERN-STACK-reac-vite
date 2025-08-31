const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const postRoutes = require('./routes/posts')

dotenv.config()
const MONGO_URI = process.env.MONGO_URI 

app.use(express.json())
app.use(cors())

// Router 
app.use('/posts', postRoutes)

// Database Mongo 
mongoose 
    .connect(MONGO_URI)
    .then(() => console.log('Connecting to MongoDB Successfully...'))
    .catch(error => console.log(error.message))

app.get('/', (req,res) => {
    res.send('API is running')
})

app.get('/api/test', (req,res) => {
    res.send('This respons from server')
})

app.listen(PORT, () => {
    console.log('Server is running ... ')
})

