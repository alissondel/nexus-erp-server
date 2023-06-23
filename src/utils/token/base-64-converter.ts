import { verify } from 'jsonwebtoken'

export function DecodeToken(token: string): any {
  const decodeToken = verify(token, process.env.JWT_SECRET)
  return decodeToken
}

export function ExtractTokenUser(context: any) {
  // eslint-disable-next-line
  const [_, __, ___, ____, _____, ______, _______, token] = context
  return token
}
