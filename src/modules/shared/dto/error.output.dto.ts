import { ApiProperty } from '@nestjs/swagger';
import { ErrorDTO } from './error.dto';

export class ErrorOutputDTO {
  @ApiProperty()
  status: number;

  @ApiProperty({
    type: [ErrorDTO],
  })
  errors: ErrorDTO[];
}
