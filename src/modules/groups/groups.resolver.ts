import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GroupsService } from './groups.service'
import { GroupEntity, PaginatedGroupResponse } from './entities/group.entity'
import { CreateGroupInput } from './dto/create-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { FilterGroupInput } from './dto/filter-brand.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => GroupEntity)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => GroupEntity)
  @UseGuards(GqlAuthGuard)
  async group(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<GroupEntity> {
    return await this.groupsService.findOne(id, active)
  }

  @Query(() => PaginatedGroupResponse)
  @UseGuards(GqlAuthGuard)
  async groups(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterGroupInput,
  ) {
    return await this.groupsService.findAll(paginationArgs, filters)
  }

  @Mutation(() => GroupEntity)
  @UseGuards(GqlAuthGuard)
  async createGroup(
    @Args('data') data: CreateGroupInput,
    @Context() context,
  ): Promise<GroupEntity> {
    return await this.groupsService.create(data, context)
  }

  @Mutation(() => GroupEntity)
  @UseGuards(GqlAuthGuard)
  async updateGroup(
    @Args('id') id: number,
    @Args('data') data: UpdateGroupInput,
    @Context() context,
  ): Promise<GroupEntity> {
    return await this.groupsService.update(id, data, context)
  }

  @Mutation(() => GroupEntity)
  @UseGuards(GqlAuthGuard)
  async deleteGroup(
    @Args('id') id: number,
    @Context() context,
  ): Promise<GroupEntity> {
    return await this.groupsService.delete(id, context)
  }
}
