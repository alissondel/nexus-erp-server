import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsResolver } from './groups.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupEntity } from './entities/group.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
