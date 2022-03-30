import constants from '../constants'

export default function (makeAuthenticatedJsonRequest) {
    return (sessionCode, outboundState) => {
        return makeAuthenticatedJsonRequest(
            'PUT',
            constants.URL_UPDATE_STATE(sessionCode),
            null,
            outboundState
        )
    }
}
