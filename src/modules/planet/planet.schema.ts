import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { required } from '../shared/constraints/required';
import { maxLength } from '../shared/constraints/maxLength';
export type PlanetDocument = Planet & Document;

@Schema()
export class Planet {
  @Prop({
    type: String,
    ...required,
    ...maxLength(100),
  })
  name: string;
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
