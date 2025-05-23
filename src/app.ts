import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ocrRoutes from './routes/ocrRoutes';

// 환경변수 설정
dotenv.config();

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uploads 폴더를 정적 파일로 제공
app.use('/uploads', express.static('uploads'));

// OCR 라우트 연결
app.use('/api/ocr', ocrRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'OCR API Server is running' });
});

// 에러 핸들링 미들웨어
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || '서버 오류가 발생했습니다.'
  });
});

// 서버 포트 설정
const PORT = process.env.PORT || 3000;

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 