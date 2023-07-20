import { Query, Resolver, Args, Context, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import {
  PaginatedProductResponse,
  ProductEntity,
} from './entities/product.entity'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { FilterProductInput } from './dto/filter-product.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  async product(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<ProductEntity> {
    return await this.productsService.findOne(id, active)
  }

  @Query(() => PaginatedProductResponse)
  @UseGuards(GqlAuthGuard)
  async products(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterProductInput,
  ) {
    return await this.productsService.findAll(paginationArgs, filters)
  }

  @Mutation(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  async createProduct(
    @Args('data') data: CreateProductInput,
    @Context() context,
  ): Promise<ProductEntity> {
    return await this.productsService.create(data, context)
  }

  @Mutation(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args('id') id: number,
    @Args('data') data: UpdateProductInput,
    @Context() context,
  ): Promise<ProductEntity> {
    return await this.productsService.update(id, data, context)
  }

  @Mutation(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  async deleteProduct(
    @Args('id') id: number,
    @Context() context,
  ): Promise<ProductEntity> {
    return await this.productsService.delete(id, context)
  }
}
