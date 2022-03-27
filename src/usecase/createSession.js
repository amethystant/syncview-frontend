import constants from '../constants'

export default function (url, makeJsonPostRequest, storage) {
    return (sessionName, hostNickname, isWaitingRoom, isControlsAllowed, fileDescription) => {
        return makeJsonPostRequest(url, null, {
            'name': sessionName,
            'hostName': hostNickname,
            'isWaitingRoom': isWaitingRoom,
            'isControlsAllowed': isControlsAllowed,
            'fileDescription': fileDescription
        }).then(data => {
            const {token, guestId, sessionCode} = data
            storage.setItem(constants.storageKeys.TOKEN, token)
            storage.setItem(constants.storageKeys.GUEST_ID, guestId)
            storage.setItem(constants.storageKeys.SESSION_CODE, sessionCode)
            return {guestId, sessionCode}
        })
    }
}
