import constants from './constants'

import buildGetLocalStorageValue from './usecase/getLocalStorageValue'
import buildSetLocalStorageValue from './usecase/setLocalStorageValue'
import buildMakeJsonRequest from './usecase/makeJsonRequest'
import buildCreateSession from './usecase/createSession'
import buildCleanSessionStorageData from './usecase/cleanSessionStorageData'
import buildMakeAuthenticatedJsonRequest from './usecase/makeAuthenticatedJsonRequest'
import buildGetSessionStateUpdates from './usecase/getSessionStateUpdates'
import buildUpdateState from './usecase/updateState'
import buildGetSessionState from './usecase/getSessionState'

const storage = localStorage
const webSocketStorage = {}

export const getLocalStorageValue = buildGetLocalStorageValue(storage)
export const setLocalStorageValue = buildSetLocalStorageValue(storage)
export const makeJsonRequest = buildMakeJsonRequest()
export const createSession = buildCreateSession(constants.URL_CREATE_SESSION, makeJsonRequest, storage)
export const cleanSessionStorageData = buildCleanSessionStorageData(storage)
export const makeAuthenticatedJsonRequest = buildMakeAuthenticatedJsonRequest(
    makeJsonRequest,
    cleanSessionStorageData,
    storage
)
export const getSessionStateUpdates = buildGetSessionStateUpdates(webSocketStorage, storage)
export const updateState = buildUpdateState(makeAuthenticatedJsonRequest)
export const getSessionState = buildGetSessionState(makeAuthenticatedJsonRequest)
