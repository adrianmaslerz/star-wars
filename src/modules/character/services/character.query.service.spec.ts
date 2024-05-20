import { Test, TestingModule } from '@nestjs/testing';
import { CharacterQueryService } from './character.query.service';

describe('CharacterQueryService', () => {
  let service: CharacterQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterQueryService],
    }).compile();

    service = module.get<CharacterQueryService>(CharacterQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCharactersQuery', () => {
    it('should prepare and return characters query', () => {
      const result = service.getCharactersQuery();

      expect(result).toEqual({
        options: { sort: { _id: 1, name: 1 } },
        pipeline: [
          {
            $lookup: {
              as: 'episodes',
              from: 'episodes',
              let: { foreignId: '$episodes' },
              pipeline: [
                { $match: { $expr: { $in: ['$_id', '$$foreignId'] } } },
                { $project: { name: 1 } },
              ],
            },
          },
          {
            $lookup: {
              as: 'planet',
              from: 'planets',
              let: { foreignId: '$planet' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$foreignId'] } } },
                { $project: { name: 1 } },
              ],
            },
          },
          { $unwind: { path: '$planet', preserveNullAndEmptyArrays: true } },
          { $project: { episodes: 1, name: 1, planet: 1 } },
        ],
      });
    });
  });
});
