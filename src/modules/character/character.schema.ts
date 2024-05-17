import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { required } from '../shared/constraints/required';
import { maxLength } from '../shared/constraints/maxLength';
import { Planet, PlanetDocument } from '../planet/planet.schema';
import { Episode, EpisodeDocument } from '../episode/episode.schema';
import { minCollectionLength } from '../shared/validators/min-collection-length/min-collection-length';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({
    type: String,
    ...required,
    ...maxLength(100),
  })
  name: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: Episode.name,
      },
    ],
    validate: [minCollectionLength(1)],
  })
  episodes: EpisodeDocument[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Planet.name,
  })
  planet?: PlanetDocument;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
