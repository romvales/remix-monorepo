import { parseForm } from '@components/lib/utils'
import { createAuthenticator } from '@shared/auth'
import { FormStrategy } from 'remix-auth-form'

import { loginAccountWithEmail, loginAccountWithUsername, plainAuthSchema } from './core.service/auth'

export const authenticator = createAuthenticator<HermitTypes.Author>()

authenticator.use(createFormStrategy() , 'plain')

function createFormStrategy() {
  return new FormStrategy(async args => {
    const data = plainAuthSchema.parse(parseForm(args.form))
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.username)
    const cloneReq = args.request.clone()

    const login = isEmail ? loginAccountWithEmail : loginAccountWithUsername
    const res = await login(cloneReq)

    return res!
  })
}
