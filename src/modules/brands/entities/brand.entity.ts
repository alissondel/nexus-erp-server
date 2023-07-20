import { ObjectType, Field, Int } from '@nestjs/graphql'
import { ProductEntity } from 'src/modules/products/entities/product.entity'
import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType('Brand')
@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  description: string

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

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products?: ProductEntity[]
}

@ObjectType()
export class PaginatedBrandResponse extends PaginatedResponse(BrandEntity) {}
