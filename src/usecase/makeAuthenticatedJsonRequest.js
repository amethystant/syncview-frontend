import constants from '../constants'

export default function (makeJsonRequest, cleanSessionStorageData, storage) {
    return (method, url, headers, jsonPayload) => {
        const token = storage.getItem(constants.storageKeys.TOKEN)
        const allHeaders = headers ?? {}
        allHeaders['Authorization'] = `Bearer ${token}`
        return makeJsonRequest(method, url, allHeaders, jsonPayload)
            .catch(error => {
                if (error.isAuthorization) {
                    cleanSessionStorageData()
                }

                throw error
            })
    }
}
