import constants from './constants'

import buildMakeJsonRequest from './usecase/makeJsonRequest'
import buildCreateSession from './usecase/createSession'
import buildCleanSessionStorageData from './usecase/cleanSessionStorageData'
import buildMakeAuthenticatedJsonRequest from './usecase/makeAuthenticatedJsonRequest'

const storage = localStorage

export const makeJsonRequest = buildMakeJsonRequest()
export const createSession = buildCreateSession(constants.URL_CREATE_SESSION, makeJsonRequest, storage)
export const cleanSessionStorageData = buildCleanSessionStorageData(storage)
export const makeAuthenticatedJsonRequest = buildMakeAuthenticatedJsonRequest(
    makeJsonRequest,
    cleanSessionStorageData,
    storage
)
