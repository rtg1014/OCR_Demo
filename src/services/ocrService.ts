import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import { ApiError } from '../utils/error';
import { ErrorCode } from '../types/responseTypes';

export class OcrService {
  private static async preprocessImage(imagePath: string): Promise<Buffer> {
    try {
      return await sharp(imagePath)
        .grayscale() // 흑백 변환
        .normalize() // 대비 정규화
        .sharpen() // 선명도 향상
        .toBuffer();
    } catch (error) {
      throw new ApiError(
        500,
        '이미지 전처리 중 오류가 발생했습니다.',
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  public static async extractText(imagePath: string): Promise<string> {
    try {
      // 이미지 전처리
      const processedImage = await this.preprocessImage(imagePath);

      // Tesseract 워커 생성
      const worker = await createWorker('kor+eng'); // 한글과 영어 모두 지원

      try {
        // OCR 수행
        const { data: { text } } = await worker.recognize(processedImage);
        return text;
      } finally {
        // 워커 종료
        await worker.terminate();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('OCR 처리 중 오류 발생:', error);
      throw new ApiError(
        500,
        '텍스트 추출 중 오류가 발생했습니다.',
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }
} 