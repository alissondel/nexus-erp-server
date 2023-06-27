import { ObjectType, Field, Int } from '@nestjs/graphql'
import { StateEntity } from 'src/modules/states/entities/state.entity'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType('City')
@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

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
  @Field({ nullable: true })
  updatedAt?: Date

  @Column({ name: 'updated_user', type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  updatedUser!: number

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  deletedAt?: Date

  @Column({ name: 'deleted_user', type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  deletedUser!: number

  @Column()
  @Field(() => Int)
  stateId: number

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({
    name: 'stateId',
    referencedColumnName: 'id',
  })
  @Field(() => StateEntity)
  state: StateEntity

  @OneToMany(() => UserEntity, (user) => user.city)
  users?: UserEntity[]
}

@ObjectType()
export class PaginatedCityResponse extends PaginatedResponse(CityEntity) {}
