import { Resolver, Mutation, Args } from '@nestjs/graphql'

// Import Auth
import { AuthType } from './entities/auth.type'
import { AuthService } from './auth.service'
import { AuthInput } from './dto/auth.input'

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  public async authenticate(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data)

    return {
      user: response.user,
      token: response.token,
    }
  }
}
