import { Request, Response } from 'express';
import { OcrService } from '../services/ocrService';
import { ApiError, createErrorResponse, createSuccessResponse } from '../utils/error';
import { ErrorCode } from '../types/responseTypes';

export class OcrController {
  public static async processImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        const error = new ApiError(400, '이미지 파일이 필요합니다.', ErrorCode.BAD_REQUEST);
        res.status(error.statusCode).json(createErrorResponse(error));
        return;
      }

      const text = await OcrService.extractText(req.file.path);
      res.json(createSuccessResponse({ text }, 'OCR 처리가 완료되었습니다.'));
    } catch (error) {
      console.error('OCR 컨트롤러 오류:', error);
      const apiError = new ApiError(
        500,
        '이미지 처리 중 오류가 발생했습니다.',
        ErrorCode.INTERNAL_SERVER_ERROR
      );
      res.status(apiError.statusCode).json(createErrorResponse(apiError));
    }
  }
} 