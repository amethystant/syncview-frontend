import constants from '../constants'

export default function (makeAuthenticatedJsonRequest, cleanSessionStorageData, storage) {
    return () => {
        const sessionCode = storage.getItem(constants.storageKeys.SESSION_CODE)
        return makeAuthenticatedJsonRequest(
            'POST',
            constants.backendUrls.URL_LEAVE(sessionCode),
            null,
            null
        ).then(() => {
            cleanSessionStorageData()
        }).catch(error => {
            cleanSessionStorageData()
            throw error
        })
    }
}
