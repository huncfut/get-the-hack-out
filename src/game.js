/*
game = {
  hacker: {
    uuid: UUID
  },
  player: {
    uuid: UUID,
    x: Number,
    y: Number,
    speed: Number // blocks / s
  },
  grid: {
    width: Number,
    height: Number
  },
  levels: []<Level>
}
*/
import { makeLevel } from './levels.js'

const newGame = (uuid) => {
  const grid = {
    width: 3 * 4 + 1,
    height: 3 * 4 + 1
  }

  const levels = [makeLevel(grid)]

  const player = {
    uuid: uuid,
    x: 0,
    y: 1,
    level: 0
  }

  return { player, grid, levels }
}

const startGame = (player) => {
  
}

const gameTick = (game) => {

}

export {
  newGame
}
