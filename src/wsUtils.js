var wsList = {}

const newConnection = (uuid, ws) => wsList[uuid] = ws

const deleteConnection = (uuid) => delete wsList[uuid]

const send = (uuid, message) => wsList[uuid].send(JSON.stringify(message))

export {
  newConnection,
  deleteConnection,
  send,
  wsList
}
