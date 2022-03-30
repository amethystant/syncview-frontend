import constants from '../constants'

export default function (storage) {
    return () => {
        storage.removeItem(constants.storageKeys.TOKEN)
        storage.removeItem(constants.storageKeys.GUEST_ID)
        storage.removeItem(constants.storageKeys.SESSION_CODE)
        storage.removeItem(constants.storageKeys.FILE_URL)
        storage.removeItem(constants.storageKeys.IS_HOST)
    }
}
