import constants from '../constants'

export default function (makeJsonRequest, storage) {
    return (sessionName, hostNickname, isWaitingRoom, isControlsAllowed, fileDescription) => {
        return makeJsonRequest('POST', constants.backendUrls.URL_CREATE_SESSION, null, {
            name: sessionName,
            hostName: hostNickname,
            isWaitingRoom: isWaitingRoom,
            isControlsAllowed: isControlsAllowed,
            fileDescription: fileDescription
        }).then(data => {
            const {token, guestId, sessionCode} = data
            storage.setItem(constants.storageKeys.TOKEN, token)
            storage.setItem(constants.storageKeys.GUEST_ID, guestId)
            storage.setItem(constants.storageKeys.SESSION_CODE, sessionCode)
            storage.setItem(constants.storageKeys.IS_HOST, 'true')
            return {guestId, sessionCode}
        })
    }
}
