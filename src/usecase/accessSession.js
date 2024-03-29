import constants from '../constants'

export default function (makeJsonRequest, storage) {
    return (sessionCode, guestName) => {
        return makeJsonRequest('POST', constants.backendUrls.URL_ACCESS_SESSION(sessionCode), null, {
            guestName: guestName
        }).then(data => {
            const {token, guestId, isAwaitingAdmission} = data
            storage.setItem(constants.storageKeys.TOKEN, token)
            storage.setItem(constants.storageKeys.SESSION_CODE, sessionCode)
            return {guestId, sessionCode, isAwaitingAdmission}
        })
    }
}
