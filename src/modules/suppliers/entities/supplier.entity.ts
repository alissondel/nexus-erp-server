import { ObjectType, Field, Int } from '@nestjs/graphql'

import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@ObjectType('Supplier')
@Entity('supplier')
export class SupplierEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column({ unique: true })
  @Field()
  email: string

  @Column({ name: 'phone_number' })
  @Field()
  phoneNumber: string

  @Column()
  @Field()
  cnpj: string

  @Column()
  @Field()
  address: string

  @Column({ name: 'address_number' })
  @Field()
  addressNumber: number

  @Column()
  @Field()
  district: string

  @Column()
  @Field()
  cep: string

  @Column({ name: 'category_supplier' })
  @Field()
  categorySupplier: string

  @Column()
  @Field()
  active: boolean

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
}

@ObjectType()
export class PaginatedSupplierResponse extends PaginatedResponse(
  SupplierEntity,
) {}
