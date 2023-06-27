import { ObjectType, Field, Int } from '@nestjs/graphql'
import { CityEntity } from 'src/modules/cities/entities/city.entity'
import { UserFileEntity } from 'src/modules/user-files/entities/user-file.entity'
import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType('User')
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column({ unique: true })
  @Field()
  email: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string

  @Column({ name: 'phone_number' })
  @Field()
  phoneNumber: string

  @Column({ name: 'type_user', nullable: false })
  @Field()
  typeUser: number

  @Column()
  @Field()
  active: boolean

  @Column()
  @Field(() => Int)
  cityId: number

  @Column({ name: 'created_at', type: 'timestamptz' })
  @Field()
  createdAt: Date

  @Column({ name: 'created_user', type: 'integer' })
  @Field(() => Int)
  createdUser!: number

  @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
  @Field()
  updatedAt: Date

  @Column({ name: 'updated_user', type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  updatedUser!: number

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  @Field()
  deletedAt: Date

  @Column({ name: 'deleted_user', type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  deletedUser!: number

  @OneToMany(() => UserFileEntity, (userFile) => userFile.user)
  userFiles: UserFileEntity[]

  @ManyToOne(() => CityEntity, (city) => city.users)
  @JoinColumn({
    name: 'cityId',
    referencedColumnName: 'id',
  })
  @Field(() => CityEntity)
  city: CityEntity
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(UserEntity) {}
