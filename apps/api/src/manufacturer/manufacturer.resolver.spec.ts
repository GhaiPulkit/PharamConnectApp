import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerResolver } from './manufacturer.resolver';
import { ManufacturerService } from './manufacturer.service';

describe('ManufacturerResolver', () => {
  let resolver: ManufacturerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManufacturerResolver, ManufacturerService],
    }).compile();

    resolver = module.get<ManufacturerResolver>(ManufacturerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
