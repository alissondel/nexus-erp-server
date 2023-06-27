import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

// IMPORT JWT-AUTH-GUARD
import { GqlAuthGuard } from '../auth/jwt-auth.guard'

// IMPORT CITY
import { CitiesService } from './cities.service'
import { CreateCityInput } from './dto/create-city.input'
import { UpdateCityInput } from './dto/update-city.input'
import { FilterCityInput } from './dto/filter-city.input'
import { CityEntity, PaginatedCityResponse } from './entities/city.entity'

// IMPORTS PAGINATION
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

@Resolver(() => CityEntity)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Query(() => CityEntity)
  @UseGuards(GqlAuthGuard)
  async city(
    @Args('id') id: number,
    @Args('active', { nullable: true }) active?: boolean,
  ): Promise<CityEntity> {
    return await this.citiesService.findOne(id, active)
  }

  @Query(() => PaginatedCityResponse)
  @UseGuards(GqlAuthGuard)
  async cities(
    @Args() paginationArgs: PaginationArgs,
    @Args('filters') filters: FilterCityInput,
  ) {
    return await this.citiesService.findAll(paginationArgs, filters)
  }

  @Mutation(() => CityEntity)
  @UseGuards(GqlAuthGuard)
  async createCity(
    @Args('data') data: CreateCityInput,
    @Context() context,
  ): Promise<CityEntity> {
    return await this.citiesService.create(data, context)
  }

  @Mutation(() => CityEntity)
  @UseGuards(GqlAuthGuard)
  async updateCity(
    @Args('id') id: number,
    @Args('data') data: UpdateCityInput,
    @Context() context,
  ): Promise<CityEntity> {
    return await this.citiesService.update(id, data, context)
  }

  @Mutation(() => CityEntity)
  @UseGuards(GqlAuthGuard)
  async deleteCity(
    @Args('id') id: number,
    @Context() context,
  ): Promise<CityEntity> {
    return await this.citiesService.delete(id, context)
  }
}
