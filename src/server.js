import express from 'express'
import ws from 'ws'
import dotenv from 'dotenv'

// Get .env in as process.env
dotenv.config()

// Setup http static server
const httpServer = express()
httpServer.use('/', express.static('public'))
httpServer.listen(process.env.HTTP_PORT, () => console.log(`HTTP Server started on port ${process.env.HTTP_PORT}`))
