import { Injectable } from '@nestjs/common'
import { CreateBrandInput } from './dto/create-brand.input'
import { UpdateBrandInput } from './dto/update-brand.input'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandEntity } from './entities/brand.entity'
import { Between, ILike, Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { FilterBrandInput } from './dto/filter-brand.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import Paginate from 'src/utils/paginations/Paginate'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import {
  DecodeToken,
  ExtractTokenUser,
} from 'src/utils/token/base-64-converter'
import { Context } from 'vm'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly BrandRepository: Repository<BrandEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<BrandEntity> {
    const brand = await this.BrandRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!brand) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return brand
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterBrandInput,
  ): Promise<any> {
    const [items, count]: any = await this.BrandRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.description && {
          description: ILike(`%${filters.description}%`),
        }),
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

  async create(data: CreateBrandInput, context: Context): Promise<BrandEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdBrandData = {
      description: data.description.trim(),
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const brand = await this.BrandRepository.create(createdBrandData)

    if (!brand) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.BrandRepository.save(brand)
  }

  async update(
    id: number,
    data: UpdateBrandInput,
    context: Context,
  ): Promise<BrandEntity> {
    const brand = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedBrandData = {
      description: data.description.trim(),
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.BrandRepository.save({ ...brand, ...updatedBrandData })
  }

  async delete(id: number, context: Context): Promise<BrandEntity> {
    const brand = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedBrandData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.BrandRepository.save({ ...brand, ...deletedBrandData })
  }
}
