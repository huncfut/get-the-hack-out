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

const generateNewEnemies = (layout, count) => {
  // Filter out only the nodes
  const nodes = shuffleArray(layout.flat().filter(block => block.type === 'n'));

  return [...Array(count).keys()].map((val, i) => {
    return {
      uuid: uuidv4(),
      direction: '',
      x: nodes[i].x,
      y: nodes[i].y
  }})
}

// ----- Dummy Movement AI

const handleEnemyMovement = (enemy, layout) => {
  if(enemy.direction == '') {
    return getNextEnemyMove(enemy, layout)
  }
  return moveEnemy(enemy, layout)
}

const getNextEnemyMove = (enemy, layout) => {
  const rand = Math.random()

  const { uuid, x, y } = enemy

  // 80% chance to stay
  if(rand < 0.8) {
    return {
      uuid,
      direction: '',
      x, y
    }
  }

  const dirRand = (rand - 0.8) * 5 // random number <0, 1)

  const directions = getDirections(enemy, layout)


  return { uuid, direction: directions[Math.floor(dirRand * directions.length)], x, y }
}

const moveEnemy = (enemy, layout) => {
  const { uuid, direction, x, y } = enemy

  const newX = (direction === 'W') ? x - 1 : (direction === 'E') ? x + 1 : x
  const newY = (direction === 'N') ? y - 1 : (direction === 'S') ? y + 1 : y

  return {
    uuid,
    direction: (layout[newY][newX].type !== 'v' && layout[newY][newX].type !== 'h') ? '' : direction,
    x: newX,
    y: newY
  }
}

const getDirections = ({ x, y }, layout) => {
  var n = []
  if(y-1 >= 0) (layout[y-1][x].type === 'v') && n.push('N')
  if(y+1 < layout.length) (layout[y+1][x].type === 'v') && n.push('S')
  if(x-1 >= 0) (layout[y][x-1].type === 'h') && n.push('W')
  if(x+1 < layout[0].length) (layout[y][x+1].type === 'h') && n.push('E')
  return n
}

export {
  generateNewEnemies,
  getNextEnemyMove,
  handleEnemyMovement
}
