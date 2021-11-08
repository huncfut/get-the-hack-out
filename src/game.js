import { v4 as uuidv4 } from 'uuid'
import { generateLevels } from './levels.js'
import { send } from './wsUtils.js'


const resetGame = () => ({
  uuid: null,
  hacker: {},
  player: {},
  grid: {},
  levels: []
})

const getNewBoard = () => {
  // Get grid
  const grid = {
    width: 3 * 4 + 1,
    height: 3 * 4 + 1
  }
  // Get levels
  const levels = generateLevels()

  return { grid, levels }
}

const getNewGame = (playerId, hackerId) => {
  // genet the grid and levels
  const { grid, levels } = getNewBoard()
  // Get player
  const { x, y } = getStartingBlock(levels[0].layout)
  const player = {
    uuid: playerId,
    level: 0,
    x, y
  }
  // Get hacker
  const hacker = { uuid: hackerId }
  // Get game uuid
  const uuid = uuidv4()
  // Set tick
  return { uuid, hacker, player, grid, levels }
}

const gameTick = (directions, { uuid, hacker, player, grid, levels }) => {
  const playerMovement = getPlayerMovement(directions, player, grid, levels[player.level].layout)

  var levelChange = 0
  if(playerMovement.x === 0 && playerMovement.y === 0) {
    if(levels[player.level].layout[player.y][player.x].type === 'u') levelChange = -1
    else if(levels[player.level].layout[player.y][player.x].type === 'd') levelChange = 1
  }

  return {
    uuid,
    hacker,
    // Move player
    player: {
      uuid: player.uuid,
      level: player.level + levelChange,
      x: player.x + playerMovement.x,
      y: player.y + playerMovement.y
    },
    grid,
    // Move enemies
    levels
  }
}

const getStartingBlock = layout => layout.flat().filter(block => block.type === 'e')[0]

const sendHackerGameState = (sendId, { uuid, hacker, player, grid, levels }, status = '') => {
  const level = levels[player.level].layout.flat().filter(block => block.type !== '.')
    .map(({ type, x, y }) => ({
      type, x, y,
      occupied: (x === player.x && y === player.y) && 'player'
        || 'free'
    }))

  send(sendId, { opcode: 'game_state', grid, level })
}

const sendPlayerGameState = (sendId, { uuid, hacker, player, grid, levels }) => {
  const level = levels[player.level].layout.flat().filter(block => block.type !== '.')
    .map(({ type, x, y }) => ({
      type, x: x - player.x + 3, y: y - player.y + 3,
      occupied: (x === player.x && y === player.y) && 'player'
        || 'free'
    })).filter(({ x, y }) => (
      (x <= 6 && x >= 0) && (y <= 6 && y >= 0)
   ))
   send(sendId, { opcode: 'game_state', grid: { width: 7, height: 7 }, level })
}

const getPlayerMovement = (directions, player, grid, layout) => {
  console.log(driection)
  for(var i = directions.length - 1; i >= 0; i--) {
    switch(directions[i]) {
      case 'S':
        if(player.y + 1 >= grid.height) break
        if(layout[player.y + 1][player.x].type !== '.') return { x: 0, y: 1 }
        break
      case 'N':
        if(player.y - 1 < 0) break
        if(layout[player.y - 1][player.x].type !== '.') return { x: 0, y: -1 }
        break
      case 'W':
        if(player.x - 1 < 0) break
        if(layout[player.y][player.x - 1].type !== '.') return { x: -1, y: 0 }
        break
      case 'E':
        if(player.x + 1 >= grid.width) break
        if(layout[player.y][player.x + 1].type !== '.') return { x: 1, y: 0 }
        break
    }
  }
  return { x: 0, y: 0 }
}

export {
  getNewGame,
  gameTick,
  sendHackerGameState,
  sendPlayerGameState
}
