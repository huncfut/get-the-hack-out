var ctx

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
  ws = new WebSocket(`ws://${ip}:${port}`)
  ws.onopen = () => {
    // On connection
    ws.send(JSON.stringify({
      opcode: "connected",
      hello: "world"
    }))

    // Recieve
    ws.onmessage = message => {
      const data = JSON.parse(message.data)
      switch(data.opcode) {
        case "ping":
          console.log(data)
          break;
        case "game":
          console.log(data)
          drawGame(data.game)
        default:
          console.log(data)
      }
    }
  }
}

const ping = () => ws.send(JSON.stringify({ opcode: "ping", hello: "server" }))
