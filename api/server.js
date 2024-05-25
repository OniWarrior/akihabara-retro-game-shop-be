const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')



// cors configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'https://yourproductiondomain.com'], // List all domains that are allowed to access or use '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // true if site uses cookies/sessions
}