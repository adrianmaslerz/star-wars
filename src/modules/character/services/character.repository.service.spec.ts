import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CharacterRepositoryService } from './character.repository.service';
import { Character } from '../character.schema';
import * as paginator from '../../shared/utils/paginate';

describe('CharactersService', () => {
  let service: CharacterRepositoryService;
  const model = {
    create: jest.fn(),
    findById: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterRepositoryService,
        {
          provide: getModelToken(Character.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<CharacterRepositoryService>(
      CharacterRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call create on model and return result', async () => {
      model.create.mockResolvedValueOnce('result');
      const input = 'input';

      const result = await service.create(input as any);

      expect(result).toBe('result');
      expect(model.create).toHaveBeenCalledWith(input);
    });
  });
  describe('findById', () => {
    it('should call findById on model and return result', async () => {
      model.findById.mockImplementationOnce(() => {
        return {
          populate: jest.fn().mockResolvedValueOnce('result'),
        };
      });
      const input = 'id';

      const result = await service.findById(input as any);

      expect(result).toBe('result');
      expect(model.findById).toHaveBeenCalledWith(input);
    });
  });
  describe('update', () => {
    it('should set new values on provided document, save object and return result', async () => {
      const document = {
        set: jest.fn(),
        save: jest.fn().mockResolvedValueOnce('result'),
      };

      const result = await service.update(document as any, 'data' as any);

      expect(result).toBe('result');
      expect(document.set).toHaveBeenCalledWith('data');
      expect(document.save).toHaveBeenCalled();
    });
  });
  describe('delete', () => {
    it('should call deleteOne on model and return result', async () => {
      model.deleteOne.mockResolvedValueOnce('result');
      const input = 'id';

      const result = await service.delete(input as any);

      expect(result).toBe('result');
      expect(model.deleteOne).toHaveBeenCalledWith({ _id: input });
    });
  });
  describe('paginate', () => {
    it('should call paginate function and return result', async () => {
      const paginateSpy = jest
        .spyOn(paginator, 'paginate')
        .mockResolvedValueOnce('result' as any);

      const result = await service.paginate('query' as any, 'params' as any);

      expect(result).toBe('result');
      expect(paginateSpy).toHaveBeenCalled();
    });
  });
});
