import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubGroupsService } from './sub_groups.service';
import { SubGroup } from './entities/sub_group.entity';
import { CreateSubGroupInput } from './dto/create-sub_group.input';
import { UpdateSubGroupInput } from './dto/update-sub_group.input';

@Resolver(() => SubGroup)
export class SubGroupsResolver {
  constructor(private readonly subGroupsService: SubGroupsService) {}

  @Mutation(() => SubGroup)
  createSubGroup(@Args('createSubGroupInput') createSubGroupInput: CreateSubGroupInput) {
    return this.subGroupsService.create(createSubGroupInput);
  }

  @Query(() => [SubGroup], { name: 'subGroups' })
  findAll() {
    return this.subGroupsService.findAll();
  }

  @Query(() => SubGroup, { name: 'subGroup' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subGroupsService.findOne(id);
  }

  @Mutation(() => SubGroup)
  updateSubGroup(@Args('updateSubGroupInput') updateSubGroupInput: UpdateSubGroupInput) {
    return this.subGroupsService.update(updateSubGroupInput.id, updateSubGroupInput);
  }

  @Mutation(() => SubGroup)
  removeSubGroup(@Args('id', { type: () => Int }) id: number) {
    return this.subGroupsService.remove(id);
  }
}
