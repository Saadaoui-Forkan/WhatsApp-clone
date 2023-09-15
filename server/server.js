const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000
const cors = require("cors") 

const app = express()

// connect database
connectDB();

// Init Middleware
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => res.send('API running'))

app.use('/api/auth', require('./routes/authRoute'))

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))