import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CharacterRepositoryService } from './character.repository.service';
import { CharacterDTO } from './character.dto';
import { Character, CharacterDocument } from './character.schema';
import { parseValidatorErrors } from '../shared/utils/parse-validator-errors';
import { EpisodeRepositoryService } from '../episode/episode.repository.service';
import { PlanetRepositoryService } from '../planet/planet.repository.service';
import { parseStringError } from '../shared/utils/parse-string-error';
import { SuccessOutputDTO } from '../shared/dto/success.output.dto';

@Injectable()
export class CharacterService {
  constructor(
    private characterRepositoryService: CharacterRepositoryService,
    private episodeRepositoryService: EpisodeRepositoryService,
    private planetRepositoryService: PlanetRepositoryService,
  ) {}

  public async addCharacter(input: CharacterDTO): Promise<CharacterDTO> {
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

  public async getCharacter(id: string): Promise<CharacterDTO> {
    const character = await this.getObjectHandle(id);
    return CharacterService.parse(character);
  }

  public async updateCharacter(
    id: string,
    input: CharacterDTO,
  ): Promise<CharacterDTO> {
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

  private async prepareObjectPayload(input: CharacterDTO): Promise<Character> {
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

  public static parse(input: CharacterDocument): CharacterDTO {
    return {
      _id: input._id,
      name: input.name,
      episodes: input.episodes.map((episode) => episode.name),
      planet: input.planet?.name,
    };
  }
}
