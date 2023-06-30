import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { SubGroupsService } from './sub_groups.service'
import {
  PaginatedSubGroupResponse,
  SubGroupEntity,
} from './entities/sub_group.entity'
import { CreateSubGroupInput } from './dto/create-sub_group.input'
import { UpdateSubGroupInput } from './dto/update-sub_group.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { FilterSubGroupInput } from './dto/filter-sub_group.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => SubGroupEntity)
export class SubGroupsResolver {
  constructor(private readonly subGroupsService: SubGroupsService) {}

  @Query(() => SubGroupEntity)
  @UseGuards(GqlAuthGuard)
  async subGroup(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<SubGroupEntity> {
    return await this.subGroupsService.findOne(id, active)
  }

  @Query(() => PaginatedSubGroupResponse)
  @UseGuards(GqlAuthGuard)
  async subGroups(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterSubGroupInput,
  ) {
    return await this.subGroupsService.findAll(paginationArgs, filters)
  }

  @Mutation(() => SubGroupEntity)
  @UseGuards(GqlAuthGuard)
  async createSubGroup(
    @Args('data') data: CreateSubGroupInput,
    @Context() context,
  ): Promise<SubGroupEntity> {
    return await this.subGroupsService.create(data, context)
  }

  @Mutation(() => SubGroupEntity)
  @UseGuards(GqlAuthGuard)
  async updateSubGroup(
    @Args('id') id: number,
    @Args('data') data: UpdateSubGroupInput,
    @Context() context,
  ): Promise<SubGroupEntity> {
    return await this.subGroupsService.update(id, data, context)
  }

  @Mutation(() => SubGroupEntity)
  @UseGuards(GqlAuthGuard)
  async deleteSubGroup(
    @Args('id') id: number,
    @Context() context,
  ): Promise<SubGroupEntity> {
    return await this.subGroupsService.delete(id, context)
  }
}
