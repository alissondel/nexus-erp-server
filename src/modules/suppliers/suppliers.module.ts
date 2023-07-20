import { Module } from '@nestjs/common'
import { SuppliersService } from './suppliers.service'
import { SuppliersResolver } from './suppliers.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SupplierEntity } from './entities/supplier.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [SuppliersResolver, SuppliersService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
