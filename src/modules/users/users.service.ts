import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, Like, Between } from 'typeorm'

// IMPORT DTO'S AND ENTITY USER
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { FilterUserInput } from './dto/filter-user.input'
import { UserEntity } from './entities/user.entity'
import { UserType } from './enum/user-type.enum'

// IMPORT PAGINATION
import Paginate from '../../utils/paginations/Paginate'
import { PageInfo } from '../../utils/paginations/entities/pagination.entity'
import { PaginationArgs } from '../../utils/filters/PaginationArgs'

// IMPORT ERROR
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

// IMPORT ENCRYPT AND TOKEN
import { encryptPassword, validatePassword } from 'src/utils/encrypt/password'
import {
  DecodeToken,
  ExtractTokenUser,
} from 'src/utils/token/base-64-converter'

import { Context } from 'vm'
import { updatePasswordInput } from './dto/update-password.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number, active?: boolean): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        active,
      },
    })

    if (!user) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return user
  }

  async findEmail(email: string, active?: boolean): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        active,
      },
    })

    if (!user) {
      throw new NotFoundError(
        'Usuario Inativo ou não existe no banco de dados!',
      )
    }

    return user
  }

  async findAll(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterUserInput,
  ): Promise<any> {
    const [items, count]: any = await this.userRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.phoneNumber && {
          phoneNumber: Like(`%${filters.phoneNumber}%`),
        }),
        ...(filters.email && { email: Like(`%${filters.email}%`) }),
        ...(filters.password && { password: ILike(`%${filters.password}%`) }),
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

  async createUser(data: CreateUserInput): Promise<UserEntity> {
    const { email, password, active, createdAt, createdUser, ...rest } = data

    const cryptPassword = await encryptPassword(password)

    const createdUserData = {
      ...rest,
      email: email.trim(),
      password: cryptPassword,
      active: true,
      typeUser: 1,
      createdAt: new Date(),
      createdUser: 0,
    }

    const user = await this.userRepository.create(createdUserData)

    if (!user) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.userRepository.save(user)
  }

  async createAdminOrRoot(
    data: CreateUserInput,
    context: Context,
  ): Promise<UserEntity> {
    const { email, password, active, createdAt, createdUser, ...rest } = data

    const cryptPassword = await encryptPassword(password)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdUserData = {
      ...rest,
      email: email.trim(),
      password: cryptPassword,
      active: true,
      typeUser: decode.typeUser === 2 ? UserType.Root : UserType.Admin,
      createdAt: new Date(),
      createdUser: 0,
    }

    const user = await this.userRepository.create(createdUserData)

    if (!user) {
      throw new NotFoundError('Dados enviados invalidos!')
    }

    return this.userRepository.save(user)
  }

  async update(
    id: number,
    data: UpdateUserInput,
    context: Context,
  ): Promise<UserEntity> {
    const { email, updatedAt, updatedUser, ...rest } = data

    const user = await this.findOne(id)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)
    const decode = DecodeToken(token)

    const updatedUserData = {
      ...rest,
      email: email.trim(),
      typeUser: +decode.typeUser,
      updatedAt: new Date(),
      updatedUser: +decode.id,
    }

    return this.userRepository.save({ ...user, ...updatedUserData })
  }

  async delete(id: number, context: Context): Promise<UserEntity> {
    const user = await this.findOne(id, true)

    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const data = {
      deletedAt: new Date(),
      updatedAt: new Date(),
      deletedUser: +decode.id,
      active: false,
    }

    return this.userRepository.save({ ...user, ...data })
  }

  async ChangePassword(user: updatePasswordInput, context: Context) {
    const { id, password, newPassword, confirmNewPassword } = user

    const userId = await this.findOne(id)

    const cryptNewPassword = await encryptPassword(newPassword)
    const isMatch = await validatePassword(password, userId.password || '')

    if (!isMatch) {
      throw new BadRequestException(
        'Senha antiga alterada, por favor verificar se está correta!',
      )
    }

    if (newPassword !== confirmNewPassword) {
      throw new NotFoundError('Nova senha e Confirmar senha estão diferentes!')
    }

    const updatedUserData = {
      password: cryptNewPassword,
    }

    return this.userRepository.save({ ...userId, ...updatedUserData, context })
  }
}
