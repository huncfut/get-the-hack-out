var ctx, ws, playerType

window.onload = () => {
  loadImages()
  // Setup canvas
  const gameCanvas = document.getElementById('gameCanvas')
  ctx = gameCanvas.getContext('2d')
  // Setup buttons
  const btnConnect = document.getElementById('btnConnect')
  btnConnect.onclick = () => connect(IP, PORT)
  const btnPing = document.getElementById('btnPing')
  btnPing.onclick = (data) => ping(data)
  // Keyboard events
  document.addEventListener('keyup', e => handleKeyChange(e, false))
  document.addEventListener('keydown', e => handleKeyChange(e, true))
}

// Connect to the ws server
const connect = (ip, port) => {
  if(ws) return
  ws = new WebSocket(`ws://${ip}:${port}`)

  ws.onopen = () => {
    // Recieve
    ws.onmessage = message => {
      const data = JSON.parse(message.data)
      switch(data.opcode) {
        case 'player_type':
          playerType = data.type
        case 'game_state':
          drawGame(data)
          // if(playerType === 'player') playersVinette(data.grid)
        default:
          console.log(data)
      }
    }

    send({ opcode: 'join' })
  }


}

const send = data => ws.send(JSON.stringify(data))
