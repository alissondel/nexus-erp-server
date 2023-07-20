import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { SuppliersService } from './suppliers.service'
import {
  PaginatedSupplierResponse,
  SupplierEntity,
} from './entities/supplier.entity'
import { CreateSupplierInput } from './dto/create-supplier.input'
import { UpdateSupplierInput } from './dto/update-supplier.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { FilterSupplierInput } from './dto/filter-supplier.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => SupplierEntity)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Query(() => SupplierEntity)
  @UseGuards(GqlAuthGuard)
  async supplier(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<SupplierEntity> {
    return await this.suppliersService.findOne(id, active)
  }

  @Query(() => PaginatedSupplierResponse)
  @UseGuards(GqlAuthGuard)
  async Suppliers(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterSupplierInput,
  ) {
    return await this.suppliersService.findAll(paginationArgs, filters)
  }

  @Mutation(() => SupplierEntity)
  @UseGuards(GqlAuthGuard)
  async createSupplier(
    @Args('data') data: CreateSupplierInput,
    @Context() context,
  ): Promise<SupplierEntity> {
    return await this.suppliersService.create(data, context)
  }

  @Mutation(() => SupplierEntity)
  @UseGuards(GqlAuthGuard)
  async updateSupplier(
    @Args('id') id: number,
    @Args('data') data: UpdateSupplierInput,
    @Context() context,
  ): Promise<SupplierEntity> {
    return await this.suppliersService.update(id, data, context)
  }

  @Mutation(() => SupplierEntity)
  @UseGuards(GqlAuthGuard)
  async deleteSupplier(
    @Args('id') id: number,
    @Context() context,
  ): Promise<SupplierEntity> {
    return await this.suppliersService.delete(id, context)
  }
}
