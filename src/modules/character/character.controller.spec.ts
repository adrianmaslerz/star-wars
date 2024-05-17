import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

describe('CharacterController', () => {
  let controller: CharacterController;
  const characterService = {
    addCharacter: jest.fn(),
    getCharacter: jest.fn(),
    updateCharacter: jest.fn(),
    deleteCharacter: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: characterService,
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addCharacter', () => {
    it('should call addCharacter on character service and return response', async () => {
      characterService.addCharacter.mockResolvedValueOnce('result');

      const result = await controller.addCharacter('input' as any);

      expect(result).toBe('result');
      expect(characterService.addCharacter).toHaveBeenCalledWith('input');
    });
  });
  describe('getCharacter', () => {
    it('should call getCharacter on character service and return response', async () => {
      characterService.getCharacter.mockResolvedValueOnce('result');

      const result = await controller.getCharacter({ id: 'id' });

      expect(result).toBe('result');
      expect(characterService.getCharacter).toHaveBeenCalledWith('id');
    });
  });
  describe('updateCharacter', () => {
    it('should call updateCharacter on character service and return response', async () => {
      characterService.updateCharacter.mockResolvedValueOnce('result');

      const result = await controller.updateCharacter(
        { id: 'id' },
        'input' as any,
      );

      expect(result).toBe('result');
      expect(characterService.updateCharacter).toHaveBeenCalledWith(
        'id',
        'input',
      );
    });
  });
  describe('deleteCharacter', () => {
    it('should call deleteCharacter on character service and return response', async () => {
      characterService.deleteCharacter.mockResolvedValueOnce('result');

      const result = await controller.deleteCharacter({ id: 'id' });

      expect(result).toBe('result');
      expect(characterService.deleteCharacter).toHaveBeenCalledWith('id');
    });
  });
});
