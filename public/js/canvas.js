var imgs = {
  n: {
    player: new Image(),
    free: new Image()
  },
  v: {
    player: new Image(),
    free: new Image()
  },
  h: {
    player: new Image(),
    free: new Image()
  },
  e: {
    player: new Image(),
    free: new Image()
  },
  d: {
    player: new Image(),
    free: new Image()
  },
  u: {
    player: new Image(),
    free: new Image()
  },
  c: {
    player: new Image(),
    player_hacked: new Image(),
    free: new Image(),
    free_hacked: new Image()
  }
}

const loadImages = () => {
  for(const key in imgs) {
    for(const i in imgs[key]) {
      imgs[key][i].src = `../img/${key}/${i}.png`
    }
  }
}

const drawGame = (game) => {
  const height = game.grid.height * BLOCK_SIZE
  const width = game.grid.width * BLOCK_SIZE
  ctx.canvas.height = height
  ctx.canvas.width = width

  // Reset Canvas
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)


  const blocks = game.levels[0].layout.map((row, y) => {
    return row.map((c, x) => ({ type: c, x, y })).filter(block => block.type != '.')
    }).flat()
    .map(block => ctx.drawImage(imgs[block.type].free, block.x * BLOCK_SIZE, block.y * BLOCK_SIZE))
    // .reduce((acc, block) => {
    //   (acc[block.type] = acc[block.type] || []).push({x: block.x, y: block.y})
    //   return acc
    // }, {})

  // Object.keys(blocks).map(key => ctx.drawImage(imgs.h.free, x * BLOCK_SIZE, y * BLOCK_SIZE)))
  // blocks.h.map(({x, y}) => ctx.drawImage(imgs.h.free, x * BLOCK_SIZE, y * BLOCK_SIZE))
  // blocks.v.map(({x, y}) => ctx.drawImage(imgs.v.free, x * BLOCK_SIZE, y * BLOCK_SIZE))
  // blocks.n.map(({x, y}) => ctx.drawImage(imgs.n.free, x * BLOCK_SIZE, y * BLOCK_SIZE))
  // blocks.r.map(({x, y}) => ctx.drawImage(imgs.r.free, x * BLOCK_SIZE, y * BLOCK_SIZE))
  // blocks.u.map(({x, y}) => ctx.drawImage(imgs.u.free, x * BLOCK_SIZE, y * BLOCK_SIZE))
  // blocks.d.map(({x, y}) => ctx.drawImage(imgs.d.free, x * BLOCK_SIZE, y * BLOCK_SIZE))
}

const drawPaths = (blocks) => {


  // Draw Vertical
  // imgVert.onload = () => blocks.v.map(({x, y}) => ctx.drawImage(imgVert, x * BLOCK_SIZE, y * BLOCK_SIZE))

  console.log(imgs.h.free)
    // Draw Corridor
    // const xCorridor = x * BLOCK_SIZE + BLOCK_SIZE / 4
    // const yCorridor = y * BLOCK_SIZE
    // ctx.fillStyle = 'white'
    // ctx.fillRect(xCorridor, yCorridor - 1, BLOCK_SIZE / 2, BLOCK_SIZE + 2)
    // ctx.fillStyle = 'black'
    // ctx.fillRect(xCorridor + 1, yCorridor - 2, (BLOCK_SIZE / 2) - 2, BLOCK_SIZE + 4)
    //
    // // Draw Spot
    // const xOffset = x * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
    // const yOffset = y * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
    // ctx.fillStyle = 'white'
    // ctx.fillRect(xOffset, yOffset, BLOCK_SIZE / 8, BLOCK_SIZE / 8)

  // Draw Horizontal
  // blocks.h.map(({x, y}) => {
  //   // Draw Corridor
  //   const xCorridor = x * BLOCK_SIZE
  //   const yCorridor = y * BLOCK_SIZE + BLOCK_SIZE / 4
  //   ctx.fillStyle = 'white'
  //   ctx.fillRect(xCorridor - 1, yCorridor, BLOCK_SIZE + 2, BLOCK_SIZE / 2)
  //   ctx.fillStyle = 'black'
  //   ctx.fillRect(xCorridor - 2, yCorridor + 1, BLOCK_SIZE + 4, (BLOCK_SIZE / 2) - 2)
  //
  //   // Draw Spot
  //   const xOffset = x * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
  //   const yOffset = y * BLOCK_SIZE + 7 * BLOCK_SIZE / 16
  //   ctx.fillStyle = 'white'
  //   ctx.fillRect(xOffset, yOffset, BLOCK_SIZE / 8, BLOCK_SIZE / 8)
  //
  // })
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
