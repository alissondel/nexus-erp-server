import { ObjectType, Field, Int } from '@nestjs/graphql'
import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@ObjectType('SubGroup')
@Entity('sub_group')
export class SubGroupEntity {
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
}

@ObjectType()
export class PaginatedSubGroupResponse extends PaginatedResponse(
  SubGroupEntity,
) {}
