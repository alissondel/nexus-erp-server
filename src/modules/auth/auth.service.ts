import { BadRequestException, Injectable } from '@nestjs/common'
import { Request } from 'express'

// IMPORT USER
import { UsersService } from '../users/users.service'
import { UserEntity } from '../users/entities/user.entity'

// IMPORT JWT
import { JwtService } from '@nestjs/jwt'

// IMPORT ERROR
import { UnauthorizedError } from 'src/commom/errors/types/UnauthorizedError'

// IMPORTS AUTH
import { AuthType } from './entities/auth.type'
import { AuthInput } from './dto/auth.input'

import { validatePassword } from 'src/utils/encrypt/password'

// IMPORTS DOTENV
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findEmail(data.email)

    const valitedPassword = await validatePassword(data.password, user.password)

    if (!valitedPassword) {
      throw new UnauthorizedError('Senha Incorreta')
    }

    const token = await this.jwtToken(user)

    return {
      user,
      token,
    }
  }

  private async jwtToken(user: UserEntity): Promise<string> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      typeUser: +user.typeUser,
    }

    return this.jwtService.signAsync(payload)
  }

  private jwtExtractor(request: Request): string | undefined {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new BadRequestException('Você Não está autorizado!')
    }

    // eslint-disable-next-line
    let [type, token] = authHeader.split(' ')

    if (type === 'Bearer') {
      throw new BadRequestException('Você Não está autorizado!')
    }

    if (!token) {
      token = type
    }

    return token
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor
  }
}
