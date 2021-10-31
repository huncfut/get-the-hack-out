var keyboard = {}
const viableKeys = ['w', 'ArrowUp', 's', 'ArrowDown', 'a', 'ArrowLeft', 'd', 'ArrowRight']


const handleKeyChange = (e, state) => {
  if(viableKeys.findIndex(code => code == e.key) === -1) return
  if(ws && keyboard[e.key] != state) {
    send(JSON.stringify({ opcode: 'keyboard_update', key: { code: e.key, isDown: state } }))
  }
  keyboard[e.key] = state
}
