import constants from './constants'

import buildMakeJsonPostRequest from './usecase/makeJsonPostRequest'
import buildCreateSession from './usecase/createSession'

const storage = localStorage

export const makeJsonPostRequest = buildMakeJsonPostRequest()
export const createSession = buildCreateSession(constants.URL_CREATE_SESSION, makeJsonPostRequest, storage)
