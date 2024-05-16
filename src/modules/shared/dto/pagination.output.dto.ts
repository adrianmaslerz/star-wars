import { ApiProperty } from '@nestjs/swagger';

export class PaginationOutputDTO<T> {
  @ApiProperty()
  pages: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  results: T[];
}
