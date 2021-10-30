const drawGame = (game) => {
  const height = game.grid.height * BLOCK_SIZE
  const width = game.grid.width * BLOCK_SIZE
  ctx.canvas.height = height
  ctx.canvas.width = width

  // Reset Canvas
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  // ctx.fillStyle = 'white'
  // ctx.fillRect(10, 20, 10, 20)


  const blocks = game.levels[0].layout.map((row, y) => {
    return row.map((c, x) => ({ type: c, x, y })).filter(block => block.type != '.')
    }).flat()
    .reduce((acc, block) => {
      (acc[block.type] = acc[block.type] || []).push({x: block.x, y: block.y})
      return acc
    }, {})

  drawPaths(blocks)
  drawNodes(blocks)
  // switch(c) {
  //   case 'n':
  //     // Draw node
  //     ctx.fillStyle = 'white'
  //     ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
  //     ctx.fillStyle = 'black'
  //     ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2)
  //     ctx.fillStyle = 'white'
  //     ctx.fillRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4)
  //     ctx.fillStyle = 'black'
  //     ctx.fillRect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6)
  //     break;
  //   case 'v':
  //     ctx.fillStyle = 'white'
  //     ctx.fillRect(x * BLOCK_SIZE + BLOCK_SIZE / 4, y * BLOCK_SIZE, BLOCK_SIZE / 2, BLOCK_SIZE + 1)
  //     ctx.fillStyle = 'black'
  //     ctx.fillRect((x * BLOCK_SIZE + BLOCK_SIZE / 4) + 1, y * BLOCK_SIZE, (BLOCK_SIZE / 2) - 2, BLOCK_SIZE + 2)
  // }
}

const drawPaths = (blocks) => {
  // Draw Vertical
  blocks.v.map(({x, y}) => {
    // Draw Corridor
    const xCorridor = x * BLOCK_SIZE + BLOCK_SIZE / 4
    const yCorridor = y * BLOCK_SIZE
    ctx.fillStyle = 'white'
    ctx.fillRect(xCorridor, yCorridor - 1, BLOCK_SIZE / 2, BLOCK_SIZE + 2)
    ctx.fillStyle = 'black'
    ctx.fillRect(xCorridor + 1, yCorridor - 2, (BLOCK_SIZE / 2) - 2, BLOCK_SIZE + 4)

    // Draw Spot
    const xOffset = x * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
    const yOffset = y * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
    ctx.fillStyle = 'white'
    ctx.fillRect(xOffset, yOffset, BLOCK_SIZE / 8, BLOCK_SIZE / 8)
  })

  // Draw Horizontal
  blocks.h.map(({x, y}) => {
    // Draw Corridor
    const xCorridor = x * BLOCK_SIZE
    const yCorridor = y * BLOCK_SIZE + BLOCK_SIZE / 4
    ctx.fillStyle = 'white'
    ctx.fillRect(xCorridor - 1, yCorridor, BLOCK_SIZE + 2, BLOCK_SIZE / 2)
    ctx.fillStyle = 'black'
    ctx.fillRect(xCorridor - 2, yCorridor + 1, BLOCK_SIZE + 4, (BLOCK_SIZE / 2) - 2)

    // Draw Spot
    const xOffset = x * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
    const yOffset = y * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
    ctx.fillStyle = 'white'
    ctx.fillRect(xOffset, yOffset, BLOCK_SIZE / 8, BLOCK_SIZE / 8)

  })
}

const drawNodes = (blocks) => {
  blocks.n.map(({x, y}) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    ctx.fillStyle = 'black'
    ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2)
    ctx.fillStyle = 'white'
    ctx.fillRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4)
    ctx.fillStyle = 'black'
    ctx.fillRect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6)
  })
}
