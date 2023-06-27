import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

// IMPORT JWT-AUTH-GUARD
import { GqlAuthGuard } from '../auth/jwt-auth.guard'

// IMPORT STATE
import { PaginatedStateResponse, StateEntity } from './entities/state.entity'
import { StatesService } from './states.service'
import { FilterStateInput } from './dto/filter-state.input'
import { CreateStateInput } from './dto/create-state.input'
import { UpdateStateInput } from './dto/update-state.input'

// IMPORTS PAGINATION
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => StateEntity)
export class StatesResolver {
  constructor(private readonly statesService: StatesService) {}

  @Query(() => StateEntity)
  @UseGuards(GqlAuthGuard)
  async state(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<StateEntity> {
    return await this.statesService.findOne(id, active)
  }

  @Query(() => PaginatedStateResponse)
  @UseGuards(GqlAuthGuard)
  async states(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterStateInput,
  ) {
    return await this.statesService.findAll(paginationArgs, filters)
  }

  @Mutation(() => StateEntity)
  @UseGuards(GqlAuthGuard)
  async createState(
    @Args('data') data: CreateStateInput,
    @Context() context,
  ): Promise<StateEntity> {
    return await this.statesService.create(data, context)
  }

  @Mutation(() => StateEntity)
  @UseGuards(GqlAuthGuard)
  async updateState(
    @Args('id') id: number,
    @Args('data') data: UpdateStateInput,
    @Context() context,
  ): Promise<StateEntity> {
    return await this.statesService.update(id, data, context)
  }

  @Mutation(() => StateEntity)
  @UseGuards(GqlAuthGuard)
  async deleteState(
    @Args('id') id: number,
    @Context() context,
  ): Promise<StateEntity> {
    return await this.statesService.delete(id, context)
  }
}
