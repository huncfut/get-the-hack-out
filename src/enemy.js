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
  if(enemy.direction === '') {
    return moveEnemy(getNextEnemyMove(enemy, layout), layout)
  }
  return moveEnemy(enemy, layout)
}

const getNextEnemyMove = (enemy, layout) => {
  const rand = Math.random()

  // 80% chance to stay
  if(rand < 0.8) {
    return ''
  }

  const dirRand = (rand - 0.8) * 5 // random number <0, 1)

  console.log(layout)

  const directions = getDirections(enemy, layout)
  console.log(directions)
  // const dirN = directions.reduce((acc, i))

}

const moveEnemy = (enemy, layout) => {
  const { uuid, direction, x, y } = enemy

  if(direction === 'N') {
    const newX = x
    const newY = y - 1
  } else if(direction === 'S') {
    const newX = x
    const newY = y + 1
  } else if(direction === 'W') {
    const newX = x - 1
    const newY = y
  } else if(direction === 'E') {
    const newX = x + 1
    const newY = y
  }


  return {
    uuid,
    direction: (layout[newY][newX].type === 'n') ? '' : direction,
    x: newX,
    y: newY
  }
}

const getDirections = ({ x, y }, layout) => {
  console.log(x, y)
  var n = []
  if(y-1 >= 0) (layout[y-1][x].type === 'v') && n.push('N')
  if(y+1 < layout.length) (layout[y+1][x].type === 'v') && n.push('S')
  if(x-1 >= 0) (layout[y][x-1].type === 'h') && n.push('W')
  if(x+1 < layout[0].length) (layout[y][x+1].type === 'h') && n.push('E')
  return n
}

export {
  generateNewEnemies,
  getNextEnemyMove
}
