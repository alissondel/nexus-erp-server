import { Injectable } from '@nestjs/common'
import { CreateSubGroupInput } from './dto/create-sub_group.input'
import { UpdateSubGroupInput } from './dto/update-sub_group.input'
import { SubGroupEntity } from './entities/sub_group.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, ILike, Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { BrandEntity } from '../brands/entities/brand.entity'
import { FilterSubGroupInput } from './dto/filter-sub_group.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import Paginate from 'src/utils/paginations/Paginate'
import { Context } from 'vm'
import {
  ExtractTokenUser,
  DecodeToken,
} from 'src/utils/token/base-64-converter'

@Injectable()
export class SubGroupsService {
  constructor(
    @InjectRepository(SubGroupEntity)
    private readonly SubGroupRepository: Repository<SubGroupEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<BrandEntity> {
    const subGroup = await this.SubGroupRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!subGroup) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return subGroup
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterSubGroupInput,
  ): Promise<any> {
    const [items, count]: any = await this.SubGroupRepository.findAndCount({
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

  async create(
    data: CreateSubGroupInput,
    context: Context,
  ): Promise<BrandEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdSubGroupData = {
      description: data.description.trim(),
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const subGroup = await this.SubGroupRepository.create(createdSubGroupData)

    if (!subGroup) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.SubGroupRepository.save(subGroup)
  }

  async update(
    id: number,
    data: UpdateSubGroupInput,
    context: Context,
  ): Promise<BrandEntity> {
    const subGroup = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedSubGroupData = {
      description: data.description.trim(),
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.SubGroupRepository.save({ ...subGroup, ...updatedSubGroupData })
  }

  async delete(id: number, context: Context): Promise<BrandEntity> {
    const subGroup = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedSubGroupData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.SubGroupRepository.save({ ...subGroup, ...deletedSubGroupData })
  }
}
