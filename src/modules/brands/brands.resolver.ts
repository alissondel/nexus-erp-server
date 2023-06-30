import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { BrandsService } from './brands.service'
import { BrandEntity, PaginatedBrandResponse } from './entities/brand.entity'
import { CreateBrandInput } from './dto/create-brand.input'
import { UpdateBrandInput } from './dto/update-brand.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { FilterBrandInput } from './dto/filter-brand.input'

@Resolver(() => BrandEntity)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Query(() => BrandEntity)
  @UseGuards(GqlAuthGuard)
  async brand(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<BrandEntity> {
    return await this.brandsService.findOne(id, active)
  }

  @Query(() => PaginatedBrandResponse)
  @UseGuards(GqlAuthGuard)
  async brands(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterBrandInput,
  ) {
    return await this.brandsService.findAll(paginationArgs, filters)
  }

  @Mutation(() => BrandEntity)
  @UseGuards(GqlAuthGuard)
  async createBrand(
    @Args('data') data: CreateBrandInput,
    @Context() context,
  ): Promise<BrandEntity> {
    return await this.brandsService.create(data, context)
  }

  @Mutation(() => BrandEntity)
  @UseGuards(GqlAuthGuard)
  async updateBrand(
    @Args('id') id: number,
    @Args('data') data: UpdateBrandInput,
    @Context() context,
  ): Promise<BrandEntity> {
    return await this.brandsService.update(id, data, context)
  }

  @Mutation(() => BrandEntity)
  @UseGuards(GqlAuthGuard)
  async deleteBrand(
    @Args('id') id: number,
    @Context() context,
  ): Promise<BrandEntity> {
    return await this.brandsService.delete(id, context)
  }
}
