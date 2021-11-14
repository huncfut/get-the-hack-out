/*
enemy: {
  uuid: Uuidv4,
  direction: Char(N, S, W, E, ),
  x: Number,
  y: Number
}
*/

import { v4 as uuidv4 } from 'uuid'
import { shuffleArray } from './utils.js'

// const getNextMove = (enemy, level) => return

const generateNewEnemies = (level, count) => {
  // Filter out only the nodes
  const nodes = shuffleArray(level.flat().filter(block => block.type === 'n'));

  return [...Array(count).keys()].map((val, i) => {
    return {
      uuid: uuidv4(),
      direction: '',
      x: nodes[i].x,
      y: nodes[i].y
  }})
}

export {
  generateNewEnemies
}
