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

// ----- Dummy Movement AI

const getNextMove = (enemy, level) => {
  const rand = Math.random()

  // 80% chance to stay
  if(rand < 0.8) {
    return ''
  }

  const dirRand = (rand - 0.8) * 5 // random number <0, 1)

  const directions = getDirections(enemy, level)
  console.log(directions)
  // const dirN = directions.reduce((acc, i))

}

const getDirections = ({ x, y }, level) => ([
  (level[y-1][x].type === 'v'), // N
  (level[y+1][x].type === 'v'), // S
  (level[y][x-1].type === 'h'), // W
  (level[y][x+1].type === 'h')  // E
])

export {
  generateNewEnemies,
  getNextMove
}
