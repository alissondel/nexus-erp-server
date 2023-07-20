import { Injectable } from '@nestjs/common'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { Between, ILike, Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { FilterProductInput } from './dto/filter-product.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import Paginate from 'src/utils/paginations/Paginate'
import {
  ExtractTokenUser,
  DecodeToken,
} from 'src/utils/token/base-64-converter'
import { Context } from 'vm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        active,
      },
      relations: {
        category: true,
        brand: true,
      },
    })

    if (!product) {
      throw new NotFoundError(
        'Produto Inativo ou não existe no banco de dados!',
      )
    }

    return product
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterProductInput,
  ): Promise<any> {
    const [items, count]: any = await this.productRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      relations: {
        category: true,
        brand: true,
      },
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
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
    data: CreateProductInput,
    context: Context,
  ): Promise<ProductEntity> {
    const { active, createdAt, createdUser, ...rest } = data

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdProductData = {
      ...rest,
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const product = await this.productRepository.create(createdProductData)

    if (!product) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.productRepository.save(product)
  }

  async update(
    id: number,
    data: UpdateProductInput,
    context: Context,
  ): Promise<ProductEntity> {
    const { updatedAt, updatedUser, ...rest } = data

    const product = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedProductData = {
      ...rest,
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.productRepository.save({ ...product, ...updatedProductData })
  }

  async delete(id: number, context: Context): Promise<ProductEntity> {
    const product = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedProductData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.productRepository.save({ ...product, ...deletedProductData })
  }
}
