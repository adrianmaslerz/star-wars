import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepositoryService } from './episode.repository.service';

describe('EpisodeService', () => {
  let service: EpisodeRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpisodeRepositoryService],
    }).compile();

    service = module.get<EpisodeRepositoryService>(EpisodeRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
