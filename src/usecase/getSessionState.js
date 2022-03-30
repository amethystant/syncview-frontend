import constants from '../constants'

export default function (makeAuthenticatedJsonRequest) {
    return (sessionCode) => {
        return makeAuthenticatedJsonRequest(
            'GET',
            constants.URL_GET_STATE(sessionCode),
            null,
            null
        )
    }
}