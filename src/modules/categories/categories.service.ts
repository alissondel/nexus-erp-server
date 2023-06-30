import { Injectable } from '@nestjs/common'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { CategoryEntity } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, ILike, Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { FilterCategoryInput } from './dto/filter-category.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import Paginate from 'src/utils/paginations/Paginate'
import {
  ExtractTokenUser,
  DecodeToken,
} from 'src/utils/token/base-64-converter'
import { Context } from 'vm'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!category) {
      throw new NotFoundError(
        'Categoria inativo ou não existe no banco de dados!',
      )
    }

    return category
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterCategoryInput,
  ): Promise<any> {
    const [items, count]: any = await this.categoryRepository.findAndCount({
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
    data: CreateCategoryInput,
    context: Context,
  ): Promise<CategoryEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdCategoryData = {
      description: data.description.trim(),
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const category = await this.categoryRepository.create(createdCategoryData)

    if (!category) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.categoryRepository.save(category)
  }

  async update(
    id: number,
    data: UpdateCategoryInput,
    context: Context,
  ): Promise<CategoryEntity> {
    const category = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedCategoryData = {
      description: data.description.trim(),
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.categoryRepository.save({ ...category, ...updatedCategoryData })
  }

  async delete(id: number, context: Context): Promise<CategoryEntity> {
    const category = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedCategoryData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.categoryRepository.save({ ...category, ...deletedCategoryData })
  }
}
