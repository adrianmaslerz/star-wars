import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.schema';

import { PlanetModule } from '../planet/planet.module';
import { EpisodeModule } from '../episode/episode.module';
import { CharacterRepositoryService } from './services/character.repository.service';
import { CharacterQueryService } from './services/character.query.service';
import { CharacterService } from './services/character.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Character.name,
        useFactory: () => {
          const schema = CharacterSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-aggregate-paginate-v2'));
          return schema;
        },
      },
    ]),
    EpisodeModule,
    PlanetModule,
  ],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    CharacterRepositoryService,
    CharacterQueryService,
  ],
})
export class CharacterModule {}
