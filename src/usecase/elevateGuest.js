import constants from '../constants'

export default function (makeAuthenticatedJsonRequest, storage) {
    return guestId => {
        const sessionCode = storage.getItem(constants.storageKeys.SESSION_CODE)
        return makeAuthenticatedJsonRequest(
            'PUT',
            constants.backendUrls.URL_ELEVATE_GUEST(sessionCode, guestId),
            null,
            null
        )
    }
}
