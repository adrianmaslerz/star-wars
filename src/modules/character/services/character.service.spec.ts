import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { CharacterRepositoryService } from './character.repository.service';
import { EpisodeRepositoryService } from '../../episode/episode.repository.service';
import { PlanetRepositoryService } from '../../planet/planet.repository.service';
import * as validatorErrorParser from '../../shared/utils/parse-validator-errors';
import * as stringErrorParser from '../../shared/utils/parse-string-error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CharacterQueryService } from './character.query.service';

describe('CharacterService', () => {
  let service: CharacterService;
  const characterRepositoryService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    paginate: jest.fn(),
  };
  const characterQueryService = {
    getCharactersQuery: jest.fn(),
  };
  const episodeRepositoryService = {
    findBy: jest.fn(),
  };
  const planetRepositoryService = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: CharacterRepositoryService,
          useValue: characterRepositoryService,
        },
        {
          provide: CharacterQueryService,
          useValue: characterQueryService,
        },
        {
          provide: EpisodeRepositoryService,
          useValue: episodeRepositoryService,
        },
        {
          provide: PlanetRepositoryService,
          useValue: planetRepositoryService,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('parse', () => {
    it('should parse document to DTO', () => {
      const input = {
        _id: 'id',
        name: 'name',
        episodes: [{ name: 'episode' }],
        planet: { name: 'planet' },
      };

      const result = CharacterService.parse(input as any);

      expect(result).toEqual({
        _id: 'id',
        name: 'name',
        episodes: ['episode'],
        planet: 'planet',
      });
    });
  });

  describe('addCharacter', () => {
    let prepareObjectPayloadSpy;
    let parseSpy;
    beforeEach(() => {
      prepareObjectPayloadSpy = jest.spyOn(
        service as any,
        'prepareObjectPayload',
      );
      parseSpy = jest.spyOn(CharacterService, 'parse');
      parseSpy.mockReturnValue('parsed');
    });
    it('should prepare payload from input and return error response when create operation fails', async () => {
      prepareObjectPayloadSpy.mockResolvedValueOnce('prepared');
      characterRepositoryService.create.mockRejectedValueOnce('error');
      const parseValidatorErrorsSpy = jest
        .spyOn(validatorErrorParser, 'parseValidatorErrors')
        .mockReturnValueOnce('parsedError' as any);

      const input = 'input';

      try {
        await service.addCharacter(input as any);
      } catch (error) {
        expect(prepareObjectPayloadSpy).toHaveBeenCalledWith(input);
        expect(characterRepositoryService.create).toHaveBeenCalledWith(
          'prepared',
        );
        expect(parseValidatorErrorsSpy).toHaveBeenCalledWith('error');
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(
          HttpStatus.NOT_ACCEPTABLE,
        );
        expect((error as HttpException).getResponse()).toBe('parsedError');
      }
    });
    it('should prepare payload from input and return success response when create operation succeeds', async () => {
      prepareObjectPayloadSpy.mockResolvedValueOnce('prepared');
      characterRepositoryService.create.mockResolvedValueOnce('result');
      const input = 'input';

      const result = await service.addCharacter(input as any);

      expect(result).toBe('parsed');
      expect(prepareObjectPayloadSpy).toHaveBeenCalledWith(input);
      expect(characterRepositoryService.create).toHaveBeenCalledWith(
        'prepared',
      );
      expect(parseSpy).toHaveBeenCalledWith('result');
    });
  });
  describe('getPaginatedCharacters', () => {
    it('should prepare query for fetching object, paginate results and return parsed to proper DTO', async () => {
      const parseSpy = jest
        .spyOn(CharacterService, 'parse')
        .mockReturnValue('parsed' as any);
      characterQueryService.getCharactersQuery.mockReturnValueOnce('query');
      characterRepositoryService.paginate.mockResolvedValueOnce({
        results: [1, 2],
      });

      const result = await service.getPaginatedCharacters('input' as any);

      expect(result).toEqual({ results: ['parsed', 'parsed'] });
      expect(characterQueryService.getCharactersQuery).toHaveBeenCalled();
      expect(characterRepositoryService.paginate).toHaveBeenCalledWith(
        'query',
        'input',
      );
      expect(parseSpy).toHaveBeenCalledTimes(2);
    });
  });
  describe('getCharacter', () => {
    it('should call getObjectHandle and return parsed result', async () => {
      const getObjectHandleSpy = jest
        .spyOn(service as any, 'getObjectHandle')
        .mockReturnValue('object');
      const parseSpy = jest
        .spyOn(CharacterService, 'parse')
        .mockReturnValue('parsed' as any);
      const input = 'id';

      const result = await service.getCharacter(input as any);

      expect(result).toBe('parsed');
      expect(getObjectHandleSpy).toHaveBeenCalledWith(input);
      expect(parseSpy).toHaveBeenCalledWith('object');
    });
  });
  describe('updateCharacter', () => {
    let getObjectHandleSpy;
    let prepareObjectPayloadSpy;
    let parseSpy;
    beforeEach(() => {
      getObjectHandleSpy = jest
        .spyOn(service as any, 'getObjectHandle')
        .mockReturnValue('object');
      prepareObjectPayloadSpy = jest.spyOn(
        service as any,
        'prepareObjectPayload',
      );
      parseSpy = jest.spyOn(CharacterService, 'parse');
      parseSpy.mockReturnValue('parsed');
    });
    it('should prepare payload from input and return error response when update operation fails', async () => {
      prepareObjectPayloadSpy.mockResolvedValueOnce('prepared');
      characterRepositoryService.update.mockRejectedValueOnce('error');
      const parseValidatorErrorsSpy = jest
        .spyOn(validatorErrorParser, 'parseValidatorErrors')
        .mockReturnValueOnce('parsedError' as any);

      const data = 'input';
      const id = 'id';

      try {
        await service.updateCharacter(id, data as any);
      } catch (error) {
        expect(getObjectHandleSpy).toHaveBeenCalledWith(id);
        expect(prepareObjectPayloadSpy).toHaveBeenCalledWith(data);
        expect(characterRepositoryService.update).toHaveBeenCalledWith(
          'object',
          'prepared',
        );
        expect(parseValidatorErrorsSpy).toHaveBeenCalledWith('error');
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(
          HttpStatus.NOT_ACCEPTABLE,
        );
        expect((error as HttpException).getResponse()).toBe('parsedError');
      }
    });
    it('should prepare payload from input and return success response when update operation succeeds', async () => {
      prepareObjectPayloadSpy.mockResolvedValueOnce('prepared');
      characterRepositoryService.update.mockResolvedValueOnce('result');
      const data = 'input';
      const id = 'id';

      const result = await service.updateCharacter(id, data as any);

      expect(result).toBe('parsed');
      expect(prepareObjectPayloadSpy).toHaveBeenCalledWith(data);
      expect(characterRepositoryService.update).toHaveBeenCalledWith(
        'object',
        'prepared',
      );
      expect(parseSpy).toHaveBeenCalledWith('result');
    });
  });
  describe('deleteCharacter', () => {
    it('should call getObjectHandle and delete fetched object', async () => {
      const getObjectHandleSpy = jest
        .spyOn(service as any, 'getObjectHandle')
        .mockReturnValue({ _id: 'objectId' });
      characterRepositoryService.delete.mockResolvedValueOnce('result');
      const input = 'id';

      const result = await service.deleteCharacter(input as any);

      expect(result).toEqual({ status: true });
      expect(getObjectHandleSpy).toHaveBeenCalledWith(input);
      expect(characterRepositoryService.delete).toHaveBeenCalledWith(
        'objectId',
      );
    });
  });
  describe('getObjectHandle', () => {
    it('should call findById and return error response when update operation fails', async () => {
      characterRepositoryService.findById.mockResolvedValueOnce(null);
      const parseStringErrorSpy = jest
        .spyOn(stringErrorParser, 'parseStringError')
        .mockReturnValueOnce('parsedError' as any);

      const id = 'id';

      try {
        await (service as any).getObjectHandle(id);
      } catch (error) {
        expect(characterRepositoryService.findById).toHaveBeenCalledWith(id);
        expect(parseStringErrorSpy).toHaveBeenCalledWith(
          'Character not found',
          'id',
        );
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect((error as HttpException).getResponse()).toBe('parsedError');
      }
    });
    it('should call findById and return success response when update operation succeeds', async () => {
      characterRepositoryService.findById.mockResolvedValueOnce('result');
      const id = 'id';

      const result = await (service as any).getObjectHandle(id);

      expect(result).toBe('result');
      expect(characterRepositoryService.findById).toHaveBeenCalledWith(id);
    });
  });
  describe('prepareObjectPayload', () => {
    it('should fetch nested object properties by given input and return payload', async () => {
      episodeRepositoryService.findBy.mockResolvedValueOnce('episodes');
      planetRepositoryService.findOneBy.mockResolvedValueOnce('planet');
      const input = {
        name: 'name',
        episodes: 'input episodes',
        planet: 'input planet',
      };

      const result = await (service as any).prepareObjectPayload(input as any);

      expect(result).toEqual({
        name: 'name',
        episodes: 'episodes',
        planet: 'planet',
      });
      expect(episodeRepositoryService.findBy).toHaveBeenCalledWith({
        name: { $in: 'input episodes' },
      });
      expect(planetRepositoryService.findOneBy).toHaveBeenCalledWith({
        name: 'input planet',
      });
    });
  });
});
