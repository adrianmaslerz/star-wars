import { ApiProperty } from '@nestjs/swagger';
import { ErrorDTO } from './error.dto';

export class ErrorsDTO {
  @ApiProperty({
    type: [ErrorDTO],
  })
  errors: ErrorDTO[];
}
