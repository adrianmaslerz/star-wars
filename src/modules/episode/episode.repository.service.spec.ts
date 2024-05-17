import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepositoryService } from './episode.repository.service';
import { getModelToken } from '@nestjs/mongoose';
import { Episode } from './episode.schema';

describe('EpisodeService', () => {
  let service: EpisodeRepositoryService;
  const model = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeRepositoryService,
        {
          provide: getModelToken(Episode.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<EpisodeRepositoryService>(EpisodeRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findBy', () => {
    it('should call find on model and return result', async () => {
      model.find.mockResolvedValueOnce('result');
      const input = 'criteria';

      const result = await service.findBy(input);

      expect(result).toBe('result');
      expect(model.find).toHaveBeenCalledWith(input);
    });
  });
});
