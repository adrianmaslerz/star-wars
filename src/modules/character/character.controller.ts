import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorOutputDTO } from '../shared/dto/error.output.dto';
import { SuccessOutputDTO } from '../shared/dto/success.output.dto';
import { CharactersPaginationOutputDto } from './dto/characters-pagination.output.dto';
import { CharacterDto } from './dto/character.dto';
import { CharactersListParamsInputDto } from './dto/characters-list-params.input.dto';
import { PaginationOutputDTO } from '../shared/dto/pagination.output.dto';
import { CharacterService } from './services/character.service';

@Controller('characters')
@ApiTags('Characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('')
  @ApiCreatedResponse({ type: CharacterDto })
  @ApiNotAcceptableResponse({ type: ErrorOutputDTO })
  async addCharacter(@Body() input: CharacterDto): Promise<CharacterDto> {
    return this.characterService.addCharacter(input);
  }

  @Get('')
  @ApiOkResponse({ type: CharactersPaginationOutputDto })
  public async getCharacters(
    @Query() data: CharactersListParamsInputDto,
  ): Promise<PaginationOutputDTO<CharacterDto>> {
    return this.characterService.getPaginatedCharacters(data);
  }

  @Get(':id')
  @ApiOkResponse({ type: CharacterDto })
  @ApiNotFoundResponse({ type: ErrorOutputDTO })
  async getCharacter(@Param() { id }: { id: string }): Promise<CharacterDto> {
    return this.characterService.getCharacter(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: CharacterDto })
  @ApiNotFoundResponse({ type: ErrorOutputDTO })
  @ApiNotAcceptableResponse({ type: ErrorOutputDTO })
  async updateCharacter(
    @Param() { id }: { id: string },
    @Body() input: CharacterDto,
  ): Promise<CharacterDto> {
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
