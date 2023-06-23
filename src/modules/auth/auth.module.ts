import { Module } from '@nestjs/common'

// IMPORT TYPEORM
import { TypeOrmModule } from '@nestjs/typeorm'

// IMPORTS AUTH
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'

// IMPORTS USER
import { UserEntity } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

// IMPORTS JWT
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
  ],
  providers: [AuthService, AuthResolver, UsersService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
