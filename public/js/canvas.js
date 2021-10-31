const drawGame = (game) => {
  console.log(game)
  const height = game.grid.height * BLOCK_SIZE
  const width = game.grid.width * BLOCK_SIZE
  ctx.canvas.height = height
  ctx.canvas.width = width

  // Reset Canvas
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)

  // Draw Board
  const blocks = game.levels[0].layout.flatMap((row, y) => {
      return row.map((type, x) => ({ type, x, y })).filter(block => block.type != '.')
    }).map(block => ctx.drawImage(imgs[block.type].free, block.x * BLOCK_SIZE, block.y * BLOCK_SIZE))
}
