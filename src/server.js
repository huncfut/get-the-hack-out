import dotenv from 'dotenv'
import express from 'express'
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid'
import { getNewGame, sendPlayerGameState, sendHackerGameState, gameTick } from './game.js'
import { newConnection, send } from './wsUtils.js'
import { shuffleArray } from './utils.js'

// Get .env in as process.env
dotenv.config()

var games = {}
var players = {}
var hackers = {}
var playerDirections = {}
var lobby = {}

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
    const data = JSON.parse(message.toString())
    handleMessage(uuid, data)
  })
})

const handleMessage = (uuid, data) => {
  switch(data.opcode) {
    case "setup":
      break;
    case "join":
      if(!lobby.playerId) lobby.playerId = uuid
      else if(!lobby.hackerId) {
        lobby.hackerId = uuid
        // Start new game
        const newGame = getNewGame(lobby.playerId, lobby.hackerId)
        lobby = {}
        players[newGame.player.uuid] = newGame.uuid
        hackers[newGame.hacker.uuid] = newGame.uuid
        send(newGame.player.uuid, { opcode: 'player_type', type: 'player' })
        send(newGame.hacker.uuid, { opcode: 'player_type', type: 'hacker' })
        games[newGame.uuid] = newGame
        playerDirections[newGame.player.uuid] = []
        sendPlayerGameState(newGame.player.uuid, newGame)
        sendHackerGameState(newGame.hacker.uuid, newGame)
        setInterval(() => {
          const game = gameTick(playerDirections[newGame.player.uuid], games[newGame.uuid])
          games[newGame.uuid] = game
          sendPlayerGameState(newGame.player.uuid, game)
          sendHackerGameState(newGame.hacker.uuid, game)
        }, 1000 / process.env.TICK)

      }
      break;
    case "keyboard_update":
      if(uuid in players) {
        handlePlayerKeyboardUpdate(uuid, data)
        break
      } else if(uuid in hackers) {
        // games[hackers[uuid]] = hackerActivate(games[hackers[uuid]])
      }
  }
}

const handlePlayerKeyboardUpdate = (uuid, data) => {
  if(data.key.code === 'q') return

  // Get the direction
  const direction = (data.key.code === 'w' || data.key.code === 'ArrowUp') && 'N'
    || (data.key.code === 's' || data.key.code === 'ArrowDown') && 'S'
    || (data.key.code === 'a' || data.key.code === 'ArrowLeft') && 'W'
    || (data.key.code === 'd' || data.key.code === 'ArrowRight') && 'E'

  // Add direction if the key was pressed
  if(data.key.isDown) {
    playerDirections[uuid].push(direction)
    return
  }

  // Remove direction if the key was released
  const index = playerDirections[uuid].findIndex(e => e === direction)
  index >= 0 && playerDirections[uuid].splice(index, 1)
}

// const handleHackerKeyboardUpdate = (uuid, data) => {
//   if(data.key.code === 'q') {
//
//   }
// }
