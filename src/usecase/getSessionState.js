import constants from '../constants'

export default function (makeAuthenticatedJsonRequest, storage) {
    return () => {
        const sessionCode = storage.getItem(constants.storageKeys.SESSION_CODE)
        return makeAuthenticatedJsonRequest(
            'GET',
            constants.backendUrls.URL_GET_STATE(sessionCode),
            null,
            null
        )
    }
}