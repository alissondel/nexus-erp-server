import { Module } from '@nestjs/common';
import { SubGroupsService } from './sub_groups.service';
import { SubGroupsResolver } from './sub_groups.resolver';

@Module({
  providers: [SubGroupsResolver, SubGroupsService]
})
export class SubGroupsModule {}
