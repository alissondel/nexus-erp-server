import { Test, TestingModule } from '@nestjs/testing';
import { SubGroupsResolver } from './sub_groups.resolver';
import { SubGroupsService } from './sub_groups.service';

describe('SubGroupsResolver', () => {
  let resolver: SubGroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubGroupsResolver, SubGroupsService],
    }).compile();

    resolver = module.get<SubGroupsResolver>(SubGroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
