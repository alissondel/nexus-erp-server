import { Injectable } from '@nestjs/common'
import { CreateGroupInput } from './dto/create-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { GroupEntity } from './entities/group.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, ILike, Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { FilterGroupInput } from './dto/filter-brand.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import Paginate from 'src/utils/paginations/Paginate'
import {
  ExtractTokenUser,
  DecodeToken,
} from 'src/utils/token/base-64-converter'
import { Context } from 'vm'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly GroupRepository: Repository<GroupEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<GroupEntity> {
    const group = await this.GroupRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!group) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return group
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterGroupInput,
  ): Promise<any> {
    const [items, count]: any = await this.GroupRepository.findAndCount({
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

  async create(data: CreateGroupInput, context: Context): Promise<GroupEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdGroupData = {
      description: data.description.trim(),
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const group = await this.GroupRepository.create(createdGroupData)

    if (!group) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.GroupRepository.save(group)
  }

  async update(
    id: number,
    data: UpdateGroupInput,
    context: Context,
  ): Promise<GroupEntity> {
    const group = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedGroupData = {
      description: data.description.trim(),
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.GroupRepository.save({ ...group, ...updatedGroupData })
  }

  async delete(id: number, context: Context): Promise<GroupEntity> {
    const group = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedGroupData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.GroupRepository.save({ ...group, ...deletedGroupData })
  }
}
