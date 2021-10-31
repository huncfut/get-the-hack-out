var keyboard = {}
const viableKeys = ['w', 'ArrowUp', 's', 'ArrowDown', 'a', 'ArrowLeft', 'd', 'ArrowRight', 'q']


const handleKeyChange = (e, state) => {
  if(viableKeys.findIndex(code => code == e.key) === -1) return
  if(ws && keyboard[e.key] != state) {
    if(e.key === 'q' && state && playerType === 'hacker') send({ opcode: 'keyboard_update', key: { code: e.key, isDown: state }})
    else if(e.key !== 'q') send({ opcode: 'keyboard_update', key: { code: e.key, isDown: state } })
  }
  keyboard[e.key] = state
}
