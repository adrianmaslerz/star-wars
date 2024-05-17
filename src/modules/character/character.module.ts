import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.schema';
import { CharacterRepositoryService } from './character.repository.service';
import { PlanetModule } from '../planet/planet.module';
import { EpisodeModule } from '../episode/episode.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Character.name,
        useFactory: () => {
          return CharacterSchema;
        },
      },
    ]),
    EpisodeModule,
    PlanetModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepositoryService],
})
export class CharacterModule {}
