import { verify } from 'jsonwebtoken'
import { Context } from 'vm'

export function DecodeToken(token: string): any {
  const decodeToken = verify(token, process.env.JWT_SECRET)
  return decodeToken
}

export function ExtractTokenUser(context: Context) {
  const token = context[7]
  return token
}
