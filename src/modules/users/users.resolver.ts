import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

// IMPORTS ENTITY AND DTO USER
import { PaginatedUserResponse, UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { FilterUserInput } from './dto/filter-user.input'

import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { updatePasswordInput } from './dto/update-password.input'

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async user(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<UserEntity> {
    return await this.usersService.findOne(id, active)
  }

  @Query(() => PaginatedUserResponse)
  @UseGuards(GqlAuthGuard)
  async users(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterUserInput,
  ) {
    return await this.usersService.findAll(paginationArgs, filters)
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserEntity> {
    return await this.usersService.createUser(data)
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async createAdminOrRoot(
    @Args('data') data: CreateUserInput,
    @Context() context,
  ): Promise<UserEntity> {
    return await this.usersService.createAdminOrRoot(data, context)
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
    @Context() context,
  ): Promise<UserEntity> {
    return await this.usersService.update(id, data, context)
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async updateUserPassword(
    @Args('data') data: updatePasswordInput,
    @Context() context,
  ): Promise<UserEntity> {
    return await this.usersService.ChangePassword(data, context)
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @Args('id') id: number,
    @Context() context,
  ): Promise<UserEntity> {
    return await this.usersService.delete(id, context)
  }
}
