import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'

// IMPORT ENTITY CITY
import { CityEntity } from 'src/modules/cities/entities/city.entity'

@ObjectType('State')
@Entity('state')
export class StateEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column({ nullable: false, unique: true, length: 2 })
  @Field()
  uf: string

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

  @OneToMany(() => CityEntity, (city) => city.state)
  cities?: CityEntity[]
}

@ObjectType()
export class PaginatedStateResponse extends PaginatedResponse(StateEntity) {}
