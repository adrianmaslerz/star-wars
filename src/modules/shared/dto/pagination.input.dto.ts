import { ApiProperty } from '@nestjs/swagger';

export class PaginationInputDTO {
  @ApiProperty()
  page: number = 1;

  @ApiProperty()
  results: number = 1;
}
