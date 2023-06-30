import { Test, TestingModule } from '@nestjs/testing';
import { SubGroupsService } from './sub_groups.service';

describe('SubGroupsService', () => {
  let service: SubGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubGroupsService],
    }).compile();

    service = module.get<SubGroupsService>(SubGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
