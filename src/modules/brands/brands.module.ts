import { Module } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { BrandsResolver } from './brands.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandEntity } from './entities/brand.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandsResolver, BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
