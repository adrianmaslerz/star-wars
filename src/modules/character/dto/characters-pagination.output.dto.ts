import { ApiProperty } from '@nestjs/swagger';

import { CharacterDto } from './character.dto';
import { PaginationOutputDTO } from '../../shared/dto/pagination.output.dto';

export class CharactersPaginationOutputDto extends PaginationOutputDTO<CharacterDto> {
  @ApiProperty({
    type: [CharacterDto],
  })
  results: CharacterDto[];
}
