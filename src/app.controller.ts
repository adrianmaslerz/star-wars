import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiExcludeEndpoint()
  public async getApp(): Promise<string> {
    return this.configService.get<string>('APP_NAME');
  }
}
