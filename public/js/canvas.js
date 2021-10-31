const drawGame = game => {
  const height = game.grid.height * BLOCK_SIZE
  const width = game.grid.width * BLOCK_SIZE
  ctx.canvas.height = height
  ctx.canvas.width = width

  // Reset Canvas
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)

  // Draw Board
  game.level.map(block => ctx.drawImage(imgs[block.type][block.occupied], block.x * BLOCK_SIZE, block.y * BLOCK_SIZE))
}

// const playersVinette = grid => {
//   const x = grid.width / 2
//   const y = grid.height / 2
//   const R = BLOCK_SIZE * 3
//   var vinette = ctx.createRadialGradient(x, y, BLOCK_SIZE, x, y, R)
//   vinette.addColorStop(0, 'rgba(0, 0, 0, 0)')
//   vinette.addColorStop(1, 'rgba(0, 0, 0, 1)')
//   ctx.fillStyle = vinette
//   ctx.arc(x, y, R, 0, 2 * Math.PI)
//   ctx.fill()
// }
