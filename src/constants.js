import config from './config'

function createUrl(baseUrl, path) {
    const url = new URL(path, baseUrl)
    return url.toString()
}

export default {
    URL_CREATE_SESSION: createUrl(config.URL_BACKEND, '/session/create'),
    storageKeys: {
        SESSION_CODE: 'SESSION_CODE',
        GUEST_ID: 'GUEST_ID',
        TOKEN: 'TOKEN',
        FILE_URL: 'FILE_URL'
    }
}
