import { Injectable } from '@nestjs/common'
import { CreateSupplierInput } from './dto/create-supplier.input'
import { UpdateSupplierInput } from './dto/update-supplier.input'
import { SupplierEntity } from './entities/supplier.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, ILike, Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { FilterSupplierInput } from './dto/filter-supplier.input'
import { PaginationArgs } from 'src/utils/filters/PaginationArgs'
import { PageInfo } from 'src/utils/paginations/entities/pagination.entity'
import Paginate from 'src/utils/paginations/Paginate'
import {
  ExtractTokenUser,
  DecodeToken,
} from 'src/utils/token/base-64-converter'
import { Context } from 'vm'

import { cnpj as ValidatorCnpj } from 'cpf-cnpj-validator'
import { isCep } from 'validator-brazil'

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<SupplierEntity> {
    const supplier = await this.supplierRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!supplier) {
      throw new NotFoundError(
        'Fornecedor Inativo ou não existe no banco de dados!',
      )
    }

    return supplier
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterSupplierInput,
  ): Promise<any> {
    const [items, count]: any = await this.supplierRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.email && { email: ILike(`%${filters.email}%`) }),
        ...(filters.phoneNumber && {
          phoneNumber: ILike(`%${filters.phoneNumber}%`),
        }),
        ...(filters.cnpj && { cnpj: ILike(`%${filters.cnpj}%`) }),
        ...(filters.address && { address: ILike(`%${filters.address}%`) }),
        ...(filters.addressNumber && { addressNumber: filters.addressNumber }),
        ...(filters.district && { district: ILike(`%${filters.district}%`) }),
        ...(filters.cep && { cep: ILike(`%${filters.cep}%`) }),
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
    data: CreateSupplierInput,
    context: Context,
  ): Promise<SupplierEntity> {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode: string | any = DecodeToken(token)

    await this.validatorCnpj(data.cnpj)
    await this.validatorCep(data.cep)

    const cnpjFormat: string | any = await this.formatCnpj(data.cnpj)

    const createdSupplierData = {
      name: data.name.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber,
      cnpj: cnpjFormat,
      address: data.address.trim(),
      addressNumber: +data.addressNumber,
      district: data.district.trim(),
      cep: data.cep.trim(),
      categorySupplier: data.categorySupplier.trim(),
      active: true,
      createdAt: new Date(),
      createdUser: decode.id,
    }

    const supplier = await this.supplierRepository.create(createdSupplierData)

    if (!supplier) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.supplierRepository.save(supplier)
  }

  async update(
    id: number,
    data: UpdateSupplierInput,
    context: Context,
  ): Promise<SupplierEntity> {
    const supplier = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedSupplierData = {
      name: data.name.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber,
      cnpj: data.cnpj,
      address: data.address.trim(),
      addressNumber: +data.addressNumber,
      district: data.district.trim(),
      cep: data.cep.trim(),
      categorySupplier: data.categorySupplier.trim(),
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.supplierRepository.save({ ...supplier, ...updatedSupplierData })
  }

  async delete(id: number, context: Context): Promise<SupplierEntity> {
    const supplier = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const deletedStateData = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.supplierRepository.save({ ...supplier, ...deletedStateData })
  }

  async validatorCnpj(cnpj: string): Promise<boolean> {
    const valited = ValidatorCnpj.isValid(cnpj)

    if (!valited) {
      throw new NotFoundError('CNPJ Invalido!')
    }

    return valited
  }

  async validatorCep(cep: string): Promise<boolean> {
    const valited = isCep(cep)

    if (!valited) {
      throw new NotFoundError('CEP Invalido!')
    }

    return valited
  }

  async formatCnpj(cnpj: string): Promise<string> {
    const formated = ValidatorCnpj.format(cnpj)

    if (!formated) {
      throw new NotFoundError('CNPJ Invalido!')
    }

    return formated
  }
}
