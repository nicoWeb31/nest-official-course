import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
    implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        const status = exception.getStatus();
        const exeptionResponse = exception.getResponse();
        const error =
            typeof response === 'string'
                ? { message: exeptionResponse }
                : (exeptionResponse as object);

        response.status(status).json({...error})
    }
    
}
