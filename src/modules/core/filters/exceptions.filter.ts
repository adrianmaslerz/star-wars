import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { parseStringError } from '../../shared/utils/parse-string-error';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception.status || (exception.getStatus && exception.getStatus()) || 500;
    const data =
      exception instanceof ThrottlerException
        ? parseStringError('Too many requests')
        : exception.data || exception.response;

    response.status(status).json({
      status: status,
      ...(data || parseStringError('Internal server error')),
    });
  }
}
