import constants from '../constants'

export default function (webSocketStorage, storage) {
    return (sessionCode, updateListener, closeListener) => {
        let webSocket = webSocketStorage[sessionCode]
        if (!webSocket || webSocket.readyState > 1) {
            const token = storage.getItem(constants.storageKeys.TOKEN)
            webSocket = new WebSocket(constants.URL_WEBSOCKET(sessionCode, token))
            webSocketStorage[sessionCode] = webSocket
        }

        webSocket.onmessage = event => {
            const remoteState = JSON.parse(event.data)
            updateListener(remoteState)
        }

        closeListener = closeListener ?? (() => {})
        webSocket.onclose = closeListener
        webSocket.onerror = closeListener
    }
}
