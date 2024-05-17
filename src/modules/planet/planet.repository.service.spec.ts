import { Test, TestingModule } from '@nestjs/testing';
import { PlanetRepositoryService } from './planet.repository.service';
import { getModelToken } from '@nestjs/mongoose';
import { Planet } from './planet.schema';

describe('PlanetService', () => {
  let service: PlanetRepositoryService;
  const model = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetRepositoryService,
        {
          provide: getModelToken(Planet.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<PlanetRepositoryService>(PlanetRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneBy', () => {
    it('should call findOne on model and return result', async () => {
      model.findOne.mockResolvedValueOnce('result');
      const input = 'criteria';

      const result = await service.findOneBy(input);

      expect(result).toBe('result');
      expect(model.findOne).toHaveBeenCalledWith(input);
    });
  });
});
