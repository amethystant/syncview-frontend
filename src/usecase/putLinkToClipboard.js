import constants from '../constants'

export default function (clipboard, storage) {
    return () => {
        const sessionCode = storage.getItem(constants.storageKeys.SESSION_CODE)
        if (!sessionCode) {
            return Promise.reject('No session code found.')
        }

        const url = constants.URL_SHARED_SESSION(sessionCode)
        return clipboard.writeText(url)
    }
}
