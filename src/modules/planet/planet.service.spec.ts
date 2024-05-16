import { Test, TestingModule } from '@nestjs/testing';
import { PlanetRepositoryService } from './planet.repository.service';

describe('PlanetsService', () => {
  let service: PlanetRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanetRepositoryService],
    }).compile();

    service = module.get<PlanetRepositoryService>(PlanetRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
