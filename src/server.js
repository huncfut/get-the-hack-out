import dotenv from 'dotenv'
import express from 'express'
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid'
import { newGame } from './game.js'

var wsList = {}

// Get .env in as process.env
dotenv.config()

// Setup http static server
const httpServer = express()
httpServer.use('/', express.static('public'))
httpServer.listen(process.env.HTTP_PORT, () => console.log(`HTTP Server started on port ${process.env.HTTP_PORT}`))

// WebSocket server
const wss = new WebSocketServer({ port: process.env.WS_PORT })
wss.on('connection', ws => {
  const uuid = uuidv4()
  wsList[uuid] = ws

  ws.on('close', console.log)
  ws.on('error', console.log)
  ws.on('message', message => {
    const data = JSON.parse(message.toString())
    //handleMessage(uuid, data)
  })

  ws.send(JSON.stringify({ opcode: "game", game: newGame(uuid) }))
})
