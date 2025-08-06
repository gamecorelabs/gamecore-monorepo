import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // HTTP 413 Payload Too Large 에러 처리 (파일 크기 초과)
    if (exception.status === 413 || exception.response?.statusCode === 413) {
      return response.status(400).json({
        statusCode: 400,
        message: '파일 크기가 1MB를 초과할 수 없습니다.',
        error: 'Bad Request',
      });
    }

    // Multer 파일 크기 초과 에러 처리 (fallback)
    if (exception.code === 'LIMIT_FILE_SIZE') {
      return response.status(400).json({
        statusCode: 400,
        message: '파일 크기가 1MB를 초과할 수 없습니다.',
        error: 'Bad Request',
      });
    }

    // Multer 파일 타입 에러 처리
    if (exception.code === 'LIMIT_UNEXPECTED_FILE') {
      return response.status(400).json({
        statusCode: 400,
        message: '허용되지 않는 파일 필드입니다.',
        error: 'Bad Request',
      });
    }

    // 다른 BadRequestException은 그대로 전달
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      return response.status(400).json(exceptionResponse);
    }

    // 기타 에러는 500으로 처리
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
