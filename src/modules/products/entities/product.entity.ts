import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BrandEntity } from 'src/modules/brands/entities/brand.entity'
import { CategoryEntity } from 'src/modules/categories/entities/category.entity'
import PaginatedResponse from 'src/utils/paginations/dto/PaginatedResponse'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

@ObjectType('Product')
@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  categoryId: number

  @Column()
  @Field()
  description: string

  @Column()
  @Field()
  brandId: number

  @Column()
  @Field()
  country: number

  @Column()
  @Field()
  amount: number

  @Column()
  @Field()
  warranty: number

  @Column({ name: 'type_warranty' })
  @Field()
  typeWarranty: number

  @Column()
  @Field()
  material: number

  // INFORMAÇÕES DE VENDAS
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @Field()
  price: number

  @Column({ nullable: true })
  @Field()
  color: string

  @Column({ nullable: true })
  @Field()
  measure: string

  @Column()
  @Field()
  stock: number

  @Column()
  @Field()
  ean: string

  // INFORMAÇÕES FISCAIS
  @Column({ nullable: true })
  @Field()
  ncm: number

  @Column({ name: 'cfop_same', nullable: true })
  @Field()
  cfopSame: number

  @Column({ name: 'cfop_other', nullable: true })
  @Field()
  cfopOther: number

  @Column({ nullable: true })
  @Field()
  origem: number

  @Column({ nullable: true })
  @Field()
  csosn: number

  @Column({ name: 'unidade_medida', nullable: true })
  @Field()
  unidadeMedida: string

  // ENVIO
  @Column()
  @Field()
  peso: number

  @Column()
  @Field()
  largura: number

  @Column()
  @Field()
  comprimento: number

  @Column()
  @Field()
  altura: number

  // OUTROS
  @Column({ name: 'pre_encomenda' })
  @Field()
  preEncomenda: boolean

  @Column()
  @Field()
  condicao: string

  @Column({ name: 'sku_principal', nullable: true })
  @Field()
  skuPrincipal: string

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

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  @Field(() => CategoryEntity)
  category: CategoryEntity

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({
    name: 'brandId',
    referencedColumnName: 'id',
  })
  @Field(() => BrandEntity)
  brand: BrandEntity
}

@ObjectType()
export class PaginatedProductResponse extends PaginatedResponse(
  ProductEntity,
) {}
