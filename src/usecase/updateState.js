import constants from '../constants'

export default function (makeAuthenticatedJsonRequest) {
    return (sessionCode, outboundState) => {
        return makeAuthenticatedJsonRequest(
            'PUT',
            constants.backendUrls.URL_UPDATE_STATE(sessionCode),
            null,
            outboundState
        )
    }
}
