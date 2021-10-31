const drawGame = game => {
  const height = game.grid.height * BLOCK_SIZE
  const width = game.grid.width * BLOCK_SIZE
  ctx.canvas.height = height
  ctx.canvas.width = width

  // Reset Canvas
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)

  // Draw Board
  game.level.map(block => ctx.drawImage(imgs[block.type][block.state], block.x * BLOCK_SIZE, block.y * BLOCK_SIZE))
}
