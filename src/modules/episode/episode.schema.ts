import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { required } from '../shared/constraints/required';
import { maxLength } from '../shared/constraints/maxLength';
export type EpisodeDocument = Episode & Document;

@Schema()
export class Episode {
  @Prop({
    type: String,
    ...required,
    ...maxLength(100),
  })
  name: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
