var ctx, ws

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
        case "ping":
          console.log(data)
          break
        case "game_state":
          console.log(data)
          drawGame(data)
          break
        default:
          console.log(data)
      }
    }
  }
}

const ping = () => ws.send(JSON.stringify({ opcode: "ping", hello: "server" }))
