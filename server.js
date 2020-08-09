const path = require('path');
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan');
var cors = require('cors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const Sms = require('./models/Sms')

//Load env vars
dotenv.config({
    path: './config/config.env'
})

connectDB()

const app = express()

app.use(cors())

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Route files
const sms = require('./routes/sms')

// mount routers
app.use('/api/v1/twillio', sms)

app.post('/api/v1/twillio/sms/receive', (req,res) => {
    Sms.create(req.body)

    const twiml = new MessagingResponse();

    twiml.message('')

    res.writeHead(200,{'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
        )
        
// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`)
    // close server & exit process
    server.close(() => process.exit(1))
})