window.onload = () => {
  const btnConnect = document.getElementById('btnConnect')
  btnConnect.onclick = connect

  const btnPing = document.getElementById('btnPing')
  btnPing.onclick = (data) => ping(data)
}

const connect = (ip, port) => {
  ws = new WebSocket(`ws://${IP}:${PORT}`)
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
        default:
          console.log("unknown opcode")
      }
    }
  }
}

const ping = () => ws.send(JSON.stringify({ opcode: "ping", hello: "server" }))
