import dotenv from 'dotenv'
import express from 'express'
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid'
import { getNewGame, sendGameState } from './game.js'
import { newConnection, send } from './wsUtils.js'

// Get .env in as process.env
dotenv.config()

var games = {}
var playerKeyboards = {}

// Setup http static server
const httpServer = express()
httpServer.use('/', express.static('public'))
httpServer.listen(process.env.HTTP_PORT, () => console.log(`HTTP Server started on port ${process.env.HTTP_PORT}`))

// WebSocket server
const wss = new WebSocketServer({ port: process.env.WS_PORT })
wss.on('connection', ws => {
  ws.on('close', e => console.log("Closed"))
  ws.on('error', e => console.log("Error"))

  // Add new connection
  const uuid = uuidv4()
  newConnection(uuid, ws)

  ws.on('message', message => {
    const data = JSON.parse(JSON.parse(message.toString()))
    handleMessage(uuid, data)
  })

  const game = getNewGame(uuid, 0)
  games[game.uuid] = game
  sendGameState(uuid, games[game.uuid])
  setInterval(() => sendGameState(uuid, games[game.uuid]), 1000 / process.env.TICK)
})

var lobby = {}

const handleMessage = (uuid, data) => {
  switch(data.opcode) {
    case "setup":
      break;
    // case "join":
    //   lobby.playerId ?? (lobby.playerId = uuid) || lobby.hackerId ?? lobby.hackerId = uuid
    //   break;
    case "keyboard_update":
      playerKeyboards[uuid] = playerKeyboards[uuid] || []
      handleKeyboardUpdate(uuid, data)
      console.log(playerKeyboards[uuid])
  }
}

const handleKeyboardUpdate = (uuid, data) => {
  const direction = (data.key.code === 'w' || data.key.code === 'ArrowUp') && 'N'
    || (data.key.code === 's' || data.key.code === 'ArrowDown') && 'S'
    || (data.key.code === 'a' || data.key.code === 'ArrowLeft') && 'W'
    || (data.key.code === 'd' || data.key.code === 'ArrowRight') && 'E'

  if(data.key.isDown && playerKeyboards[uuid].push(direction)) return

  const index = playerKeyboards[uuid].findIndex(e => e === direction)
  index >= 0 && playerKeyboards[uuid].splice(index, 1)
}
