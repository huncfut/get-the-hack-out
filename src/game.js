import { v4 as uuidv4 } from 'uuid'
import { makeLevel } from './levels.js'
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
  const levels = [makeLevel(grid)]

  return { grid, levels }
}

const getNewGame = (playerId, hackerId) => {
  // genet the grid and levels
  const { grid, levels } = getNewBoard()
  // Get player
  const { x, y } = getStartingBlock(levels[0].layout)
  const player = {
    uuid: playerId,
    x, y
  }
  // Get hacker
  const hacker = { uuid: hackerId }
  // Get game uuid
  const uuid = uuidv4()
  // Set tick
  return { uuid, hacker, player, grid, levels }
}

const gameTick = ({ uuid, hacker, player, grid, levels }, playerMovement) => ({
  uuid,
  hacker,
  // Move player
  player: {
    uuid: player.uuid,
    x: player.x + playerMovement.x,
    y: player.y + playerMovement.y
  },
  grid,
  // Move enemies
  levels
})

const getStartingBlock = layout => layout.flat().filter(block => block.type === 'e')[0]

const sendGameState = (sendId, { uuid, hacker, player, grid, levels }) => {
  const level = levels[0].layout.flat().filter(block => block.type !== '.')
    .map(({ type, x, y }) => ({
      type, x, y,
      state: (x === player.x && y === player.y) && 'player'
        || 'free'
    }))

  send(sendId, { opcode: 'game_state', grid, level })
}

export {
  getNewGame,
  gameTick,
  sendGameState
}
