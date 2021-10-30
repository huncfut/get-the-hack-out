import express from 'express'
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv'

// Get .env in as process.env
require('dotenv').config()

// Setup http static server
const httpServer = express()
httpServer.use('/', express.static('public'))
httpServer.listen(process.env.HTTP_PORT, () => console.log(`HTTP Server started on port ${process.env.HTTP_PORT}`))

// WebSocket server
const wss = new WebSocketServer({ port: process.env.WS_PORT })
wss.on('connection', ws => {
  ws.on('close', console.log)
  ws.on('error', console.log)
  ws.on('message', message => {
    const data = JSON.parse(message.toString())
    console.log(data)
  })
  ws.send(JSON.stringify({ opcode: "ping", hello: "there" }))
})
