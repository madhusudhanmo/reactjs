import { SIGN_IN } from './types'
import { SIGN_OUT } from './types'

export const signIn = payload => {
  return {
    type: SIGN_IN,
    payload: payload
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}
