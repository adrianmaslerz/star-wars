import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CharacterRepositoryService } from './character.repository.service';
import { Character, CharacterDocument } from '../character.schema';
import { parseValidatorErrors } from '../../shared/utils/parse-validator-errors';
import { EpisodeRepositoryService } from '../../episode/episode.repository.service';
import { PlanetRepositoryService } from '../../planet/planet.repository.service';
import { parseStringError } from '../../shared/utils/parse-string-error';
import { SuccessOutputDTO } from '../../shared/dto/success.output.dto';
import { CharactersListParamsInputDto } from '../dto/characters-list-params.input.dto';
import { PaginationOutputDTO } from '../../shared/dto/pagination.output.dto';
import { CharacterDto } from '../dto/character.dto';
import { CharacterQueryService } from './character.query.service';

@Injectable()
export class CharacterService {
  constructor(
    private characterRepositoryService: CharacterRepositoryService,
    private characterQueryService: CharacterQueryService,
    private episodeRepositoryService: EpisodeRepositoryService,
    private planetRepositoryService: PlanetRepositoryService,
  ) {}

  public async addCharacter(input: CharacterDto): Promise<CharacterDto> {
    return this.characterRepositoryService
      .create(await this.prepareObjectPayload(input))
      .then((result) => CharacterService.parse(result))
      .catch((error) => {
        throw new HttpException(
          parseValidatorErrors(error),
          HttpStatus.NOT_ACCEPTABLE,
        );
      });
  }

  public async getPaginatedCharacters(
    input: CharactersListParamsInputDto,
  ): Promise<PaginationOutputDTO<CharacterDto>> {
    const paginated = await this.characterRepositoryService.paginate(
      this.characterQueryService.getCharactersQuery(),
      input,
    );
    return {
      ...paginated,
      results: paginated.results.map((element) =>
        CharacterService.parse(element),
      ),
    };
  }

  public async getCharacter(id: string): Promise<CharacterDto> {
    const character = await this.getObjectHandle(id);
    return CharacterService.parse(character);
  }

  public async updateCharacter(
    id: string,
    input: CharacterDto,
  ): Promise<CharacterDto> {
    const character = await this.getObjectHandle(id);
    return this.characterRepositoryService
      .update(character, await this.prepareObjectPayload(input))
      .then((result) => CharacterService.parse(result))
      .catch((error) => {
        throw new HttpException(
          parseValidatorErrors(error),
          HttpStatus.NOT_ACCEPTABLE,
        );
      });
  }

  public async deleteCharacter(id: string): Promise<SuccessOutputDTO> {
    const character = await this.getObjectHandle(id);
    return this.characterRepositoryService
      .delete(character._id)
      .then(() => new SuccessOutputDTO());
  }

  private async getObjectHandle(id: string): Promise<CharacterDocument> {
    const character = await this.characterRepositoryService.findById(id);
    if (!character) {
      throw new HttpException(
        parseStringError('Character not found', 'id'),
        HttpStatus.NOT_FOUND,
      );
    }
    return character;
  }

  private async prepareObjectPayload(input: CharacterDto): Promise<Character> {
    return {
      name: input.name,
      episodes: await this.episodeRepositoryService.findBy({
        name: { $in: input.episodes },
      }),
      planet:
        (await this.planetRepositoryService.findOneBy({
          name: input.planet,
        })) || undefined,
    };
  }

  public static parse(input: CharacterDocument): CharacterDto {
    return {
      _id: input._id,
      name: input.name,
      episodes: input.episodes.map((episode) => episode.name),
      planet: input.planet?.name,
    };
  }
}
