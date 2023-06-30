import { Injectable } from '@nestjs/common';
import { CreateSubGroupInput } from './dto/create-sub_group.input';
import { UpdateSubGroupInput } from './dto/update-sub_group.input';

@Injectable()
export class SubGroupsService {
  create(createSubGroupInput: CreateSubGroupInput) {
    return 'This action adds a new subGroup';
  }

  findAll() {
    return `This action returns all subGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subGroup`;
  }

  update(id: number, updateSubGroupInput: UpdateSubGroupInput) {
    return `This action updates a #${id} subGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} subGroup`;
  }
}
