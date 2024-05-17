import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorOutputDTO } from '../shared/dto/error.output.dto';
import { CharacterDTO } from './character.dto';
import { CharacterService } from './character.service';
import { SuccessOutputDTO } from '../shared/dto/success.output.dto';

@Controller('characters')
@ApiTags('Characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('')
  @ApiCreatedResponse({ type: CharacterDTO })
  @ApiNotAcceptableResponse({ type: ErrorOutputDTO })
  async addCharacter(@Body() input: CharacterDTO): Promise<CharacterDTO> {
    return this.characterService.addCharacter(input);
  }

  @Get(':id')
  @ApiOkResponse({ type: CharacterDTO })
  @ApiNotFoundResponse({ type: ErrorOutputDTO })
  async getCharacter(@Param() { id }: { id: string }): Promise<CharacterDTO> {
    return this.characterService.getCharacter(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: CharacterDTO })
  @ApiNotFoundResponse({ type: ErrorOutputDTO })
  @ApiNotAcceptableResponse({ type: ErrorOutputDTO })
  async updateCharacter(
    @Param() { id }: { id: string },
    @Body() input: CharacterDTO,
  ): Promise<CharacterDTO> {
    return this.characterService.updateCharacter(id, input);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SuccessOutputDTO })
  @ApiNotFoundResponse({ type: ErrorOutputDTO })
  async deleteCharacter(
    @Param() { id }: { id: string },
  ): Promise<SuccessOutputDTO> {
    return this.characterService.deleteCharacter(id);
  }
}
