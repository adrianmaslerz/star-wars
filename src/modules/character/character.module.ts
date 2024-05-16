import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.schema';

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
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
