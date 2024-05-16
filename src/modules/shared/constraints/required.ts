import { SchemaDefinition } from 'mongoose';

export const required: SchemaDefinition = {
  required: [true, '{PATH} is required.'],
};
