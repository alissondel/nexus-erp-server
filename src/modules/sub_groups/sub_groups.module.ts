import { Module } from '@nestjs/common'
import { SubGroupsService } from './sub_groups.service'
import { SubGroupsResolver } from './sub_groups.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubGroupEntity } from './entities/sub_group.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SubGroupEntity])],
  providers: [SubGroupsResolver, SubGroupsService],
  exports: [SubGroupsService],
})
export class SubGroupsModule {}
