import { Module } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { BrandsResolver } from './brands.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandEntity } from './entities/brand.entity'
import { ProductsModule } from '../products/products.module'

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity]), ProductsModule],
  providers: [BrandsResolver, BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
