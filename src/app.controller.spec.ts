import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let controller: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ConfigService],
    }).compile();

    configService = app.get<ConfigService>(ConfigService);
    controller = app.get<AppController>(AppController);
  });

  describe('getApp', () => {
    it('should return app name', async () => {
      const getSpy = jest
        .spyOn(configService, 'get')
        .mockReturnValueOnce('Star Wars');

      const result = await controller.getApp();

      expect(result).toBe('Star Wars');
      expect(getSpy).toHaveBeenCalledWith('APP_NAME');
    });
  });
});
