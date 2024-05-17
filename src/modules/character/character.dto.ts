import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CharacterDTO {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  episodes: string[];

  @ApiPropertyOptional()
  planet?: string;
}
