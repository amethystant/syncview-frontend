import buildGetLocalStorageValue from './usecase/getLocalStorageValue'
import buildSetLocalStorageValue from './usecase/setLocalStorageValue'
import buildMakeJsonRequest from './usecase/makeJsonRequest'
import buildCreateSession from './usecase/createSession'
import buildCleanSessionStorageData from './usecase/cleanSessionStorageData'
import buildMakeAuthenticatedJsonRequest from './usecase/makeAuthenticatedJsonRequest'
import buildGetSessionStateUpdates from './usecase/getSessionStateUpdates'
import buildUpdateState from './usecase/updateState'
import buildGetSessionState from './usecase/getSessionState'
import buildAccessSession from './usecase/accessSession'
import buildPutLinkToClipboard from './usecase/putLinkToClipboard'
import buildAdmitGuest from './usecase/admitGuest'
import buildElevateGuest from './usecase/elevateGuest'
import buildKickGuest from './usecase/kickGuest'
import buildSetDocumentTitle from './usecase/setDocumentTitle'

const storage = localStorage
const clipboard = navigator.clipboard
const documentRef = document
const webSocketStorage = {}

export const getLocalStorageValue = buildGetLocalStorageValue(storage)
export const setLocalStorageValue = buildSetLocalStorageValue(storage)
export const makeJsonRequest = buildMakeJsonRequest()
export const createSession = buildCreateSession(makeJsonRequest, storage)
export const cleanSessionStorageData = buildCleanSessionStorageData(storage)
export const makeAuthenticatedJsonRequest = buildMakeAuthenticatedJsonRequest(
    makeJsonRequest,
    cleanSessionStorageData,
    storage
)
export const getSessionStateUpdates = buildGetSessionStateUpdates(webSocketStorage, storage)
export const updateState = buildUpdateState(makeAuthenticatedJsonRequest, storage)
export const getSessionState = buildGetSessionState(makeAuthenticatedJsonRequest, storage)
export const accessSession = buildAccessSession(makeJsonRequest, storage)
export const putLinkToClipboard = buildPutLinkToClipboard(clipboard, storage)
export const admitGuest = buildAdmitGuest(makeAuthenticatedJsonRequest, storage)
export const elevateGuest = buildElevateGuest(makeAuthenticatedJsonRequest, storage)
export const kickGuest = buildKickGuest(makeAuthenticatedJsonRequest, storage)
export const setDocumentTitle = buildSetDocumentTitle(documentRef)
