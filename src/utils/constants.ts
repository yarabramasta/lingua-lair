import { TimeSpan } from 'lucia'

export const SAFE_STRING_REGEX = /^[a-zA-Z0-9-_]+$/

export const SESSION_COOKIE_NAME = '__lingua-lair_auth_session'
export const SESSION_COOKIE_LIFETIME = new TimeSpan(5, 'd')
export const SESSION_COOKIE_LIFETIME_SECONDS = SESSION_COOKIE_LIFETIME.seconds()
