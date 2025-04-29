import { createAuthenticator } from '@shared/auth'
import { FormStrategy } from 'remix-auth-form'


export const authenticator = createAuthenticator()

authenticator.use(createFormStrategy(), 'plain')

function createFormStrategy() {
  return new FormStrategy(async args => {
    
  })
}