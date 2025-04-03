import { Authenticator } from 'remix-auth'

export const createAuthenticator = <T>() => new Authenticator<T>()