import { SchemaDefinition } from 'mongoose';

export const maxLength = (value: number): SchemaDefinition => ({
  maxlength: [value, '{PATH} should have maximum {MAXLENGTH} characters.'],
});
