require('dotenv').config()
const express = require('express')
const app = express()
const register = require('./routes/routes')
const connectDB = require('./db/conn')
const cookieParser = require("cookie-parser");


app.use(cookieParser());

//json data recieve krne k liye middleware hai
app.use(express.json())

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('hello world')
})

//middleware
app.use('/', register)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()