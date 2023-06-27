import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, ILike, Repository } from 'typeorm'

// IMPORT STATE
import { StateEntity } from './entities/state.entity'
import { CreateStateInput } from './dto/create-state.input'
import { UpdateStateInput } from './dto/update-state.input'
import { FilterStateInput } from './dto/filter-state.input'

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
export class StatesService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<StateEntity> {
    const state = await this.stateRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!state) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return state
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterStateInput,
  ): Promise<any> {
    const [items, count]: any = await this.stateRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.uf && { uf: ILike(`%${filters.uf}%`) }),
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

  async create(data: CreateStateInput, context: Context): Promise<StateEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdStateData = {
      name: data.name.trim(),
      uf: data.uf.trim().toUpperCase(),
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const state = await this.stateRepository.create(createdStateData)

    if (!state) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.stateRepository.save(state)
  }

  async update(
    id: number,
    data: UpdateStateInput,
    context: Context,
  ): Promise<StateEntity> {
    const state = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedStateData = {
      name: data.name.trim(),
      uf: data.uf.trim().toUpperCase(),
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.stateRepository.save({ ...state, ...updatedStateData })
  }

  async delete(id: number, context: Context): Promise<StateEntity> {
    const state = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedStateData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.stateRepository.save({ ...state, ...deletedStateData })
  }
}
