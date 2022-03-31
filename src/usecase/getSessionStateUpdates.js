import { v4 as uuidv4 } from 'uuid'
import constants from '../constants'

export default function (webSocketStorage, storage) {
    return (updateListener, closeListener) => {
        if (typeof updateListener !== 'function') {
            throw new Error('Listener not a function.')
        }

        const sessionCode = storage.getItem(constants.storageKeys.SESSION_CODE)
        let webSocket = webSocketStorage[sessionCode]
        if (!webSocket || webSocket.readyState > 1) {
            const token = storage.getItem(constants.storageKeys.TOKEN)
            webSocket = new WebSocket(constants.backendUrls.URL_WEBSOCKET(sessionCode, token))
            webSocket.listeners = {}
            webSocket.closeListeners = {}

            webSocket.onmessage = event => {
                const remoteState = JSON.parse(event.data)
                for (let key in webSocket.listeners) {
                    webSocket.listeners[key](remoteState)
                }
            }

            const onClose = () => {
                for (let key in webSocket.closeListeners) {
                    webSocket.closeListeners[key]()
                }
                if (webSocketStorage[sessionCode] === webSocket) {
                    delete webSocketStorage[sessionCode]
                }
            }

            webSocket.onerror = onClose
            webSocket.onclose = onClose
            webSocketStorage[sessionCode] = webSocket
        }

        const listenerKey = uuidv4()
        webSocket.listeners[listenerKey] = updateListener
        if (typeof closeListener === 'function') {
            webSocket.closeListeners[listenerKey] = closeListener
        }

        return {
            cancel: () => {
                delete webSocket.listeners[listenerKey]
                delete webSocket.closeListeners[listenerKey]
            }
        }
    }
}
