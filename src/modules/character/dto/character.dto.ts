import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CharacterDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  episodes: string[];

  @ApiPropertyOptional()
  planet?: string;
}
