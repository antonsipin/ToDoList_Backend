const WebSocket = require('ws')
const clients = new Set()

module.exports = function createSocketServer(server) {
    const socketServer = new WebSocket.Server({ server })
    require('events').EventEmitter.defaultMaxListeners = 100

    socketServer.on('connection', (socketClient) => {
        console.log('SocketClient connected')
        clients.add(socketClient)

        socketClient.on('message', (message) => {
            console.log(message)
                for (let client of clients) {
                    client.send(message)
                }
        })

        socketServer.on('close', () => {
            clients.delete(WebSocket)
            console.log('SocketClient close connection')
        })
    })
}
