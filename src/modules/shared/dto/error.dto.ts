import { ApiProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiProperty()
  message: string;

  @ApiProperty()
  field: string;
}
