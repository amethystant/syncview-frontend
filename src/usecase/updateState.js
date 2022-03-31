import constants from '../constants'

export default function (makeAuthenticatedJsonRequest, storage) {
    return (outboundState) => {
        return makeAuthenticatedJsonRequest(
            'PUT',
            constants.backendUrls.URL_UPDATE_STATE(storage.getItem(constants.storageKeys.SESSION_CODE)),
            null,
            outboundState
        )
    }
}
