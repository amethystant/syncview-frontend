import config from './config'
import routeNames from './routeNames'

function createUrl(baseUrl, path) {
    const url = new URL(path, baseUrl)
    return url.toString()
}

function createWebsocketUrl(baseUrl, path) {
    const url = new URL(path, baseUrl)
    url.protocol = 'wss:'
    return url.toString()
}

export default {
    backendUrls: {
        URL_WEBSOCKET: (sessionCode, token) => createWebsocketUrl(config.URL_BACKEND, `${sessionCode}?token=${token}`),
        URL_CREATE_SESSION: createUrl(config.URL_BACKEND, '/session/create'),
        URL_UPDATE_STATE: (sessionCode) => createUrl(config.URL_BACKEND, `session/${sessionCode}/state`),
        URL_GET_STATE: (sessionCode) => createUrl(config.URL_BACKEND, `session/${sessionCode}/state`),
        URL_ACCESS_SESSION: (sessionCode) => createUrl(config.URL_BACKEND, `session/${sessionCode}/access`),
        URL_ADMIT_GUEST: (sessionCode, guestId) => createUrl(config.URL_BACKEND, `session/${sessionCode}/guest/${guestId}/admit`),
        URL_ELEVATE_GUEST: (sessionCode, guestId) => createUrl(config.URL_BACKEND, `session/${sessionCode}/guest/${guestId}/elevate`),
        URL_KICK_GUEST: (sessionCode, guestId) => createUrl(config.URL_BACKEND, `session/${sessionCode}/guest/${guestId}/kick`)
    },
    storageKeys: {
        SESSION_CODE: 'SESSION_CODE',
        TOKEN: 'TOKEN',
        FILE_URL: 'FILE_URL'
    },
    URL_SHARED_SESSION: (sessionCode) => createUrl(config.URL_FRONTEND, routeNames.joinSessionRedirect(sessionCode))
}
