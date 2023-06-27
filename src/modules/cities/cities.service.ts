import { Between, ILike, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

// IMPORT CITY
import { CityEntity } from './entities/city.entity'
import { CreateCityInput } from './dto/create-city.input'
import { UpdateCityInput } from './dto/update-city.input'
import { FilterCityInput } from './dto/filter-city.input'

// IMPORT PAGINATION
import Paginate from 'src/utils/paginations/Paginate'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'

// IMPORT ERROR
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

import { Context } from 'vm'
import {
  DecodeToken,
  ExtractTokenUser,
} from 'src/utils/token/base-64-converter'

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id,
        active,
      },
      relations: {
        state: true,
      },
    })

    if (!city) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return city
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterCityInput,
  ): Promise<any> {
    const [items, count]: any = await this.cityRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      relations: {
        state: true,
      },
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.state && {
          state: { name: ILike(`%${filters.state}%`) },
        }),
        ...(filters.stateId && { stateId: filters.stateId }),
        ...(filters.createdAt &&
          filters.updatedAt && {
            createdAt: Between(
              filters.createdAt,
              new Date(filters.updatedAt.getTime() + (1000 * 3600 * 24 - 1)),
            ),
          }),
        active: filters.active,
      },
      order: {
        [filters.order.key]: filters.order.value,
      },
    })

    const pagination: PageInfo = await Paginate(count, perPage, currentPage)

    return {
      items,
      pagination,
    }
  }

  async create(data: CreateCityInput, context: Context): Promise<CityEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdCityData = {
      name: data.name.trim(),
      stateId: +data.stateId,
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const city = await this.cityRepository.create(createdCityData)

    if (!city) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.cityRepository.save(city)
  }

  async update(
    id: number,
    data: UpdateCityInput,
    context: Context,
  ): Promise<CityEntity> {
    const city = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedCityData = {
      name: data.name.trim(),
      stateId: +data.stateId,
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }
    return this.cityRepository.save({ ...city, ...updatedCityData })
  }

  async delete(id: number, context: Context): Promise<CityEntity> {
    const city = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedCityData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.cityRepository.save({ ...city, ...deletedCityData })
  }
}
