import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import {
  CategoryEntity,
  PaginatedCategoryResponse,
} from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { FilterCategoryInput } from './dto/filter-category.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => CategoryEntity)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => CategoryEntity)
  @UseGuards(GqlAuthGuard)
  async category(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.findOne(id, active)
  }

  @Query(() => PaginatedCategoryResponse)
  @UseGuards(GqlAuthGuard)
  async categories(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterCategoryInput,
  ) {
    return await this.categoriesService.findAll(paginationArgs, filters)
  }

  @Mutation(() => CategoryEntity)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('data') data: CreateCategoryInput,
    @Context() context,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.create(data, context)
  }

  @Mutation(() => CategoryEntity)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('id') id: number,
    @Args('data') data: UpdateCategoryInput,
    @Context() context,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.update(id, data, context)
  }

  @Mutation(() => CategoryEntity)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(
    @Args('id') id: number,
    @Context() context,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.delete(id, context)
  }
}
