import constants from '../constants'

export default function (makeAuthenticatedJsonRequest, storage) {
    return guestId => {
        const sessionCode = storage.getItem(constants.storageKeys.SESSION_CODE)
        return makeAuthenticatedJsonRequest(
            'POST',
            constants.backendUrls.URL_KICK_GUEST(sessionCode, guestId),
            null,
            null
        )
    }
}
