export enum ErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", // 서버 내부 오류
  USER_NOT_FOUND = "USER_NOT_FOUND", // 사용자를 찾을 수 없음
  INVALID_PASSWORD = "INVALID_PASSWORD", // 잘못된 비밀번호
  UNAUTHORIZED = "UNAUTHORIZED", // 인증 실패
  FORBIDDEN = "FORBIDDEN", // 권한 없음
  NO_FACTOR_EDIT_PERMISSION = "NO_FACTOR_EDIT_PERMISSION", // 배출계수 수정 권한 없음
  NOT_FOUND = "NOT_FOUND", // 리소스를 찾을 수 없음
  BAD_REQUEST = "BAD_REQUEST", // 잘못된 요청
  CONFLICT = "CONFLICT", // 충돌 (예: 중복된 이메일)
  DEFAULT = "DEFAULT", // 기본 오류
  INVALID_INPUT = "INVALID_INPUT", // 잘못된 입력
}

export interface ErrorResponse {
  status: "error";
  code: ErrorCode;
  message: string;
  data: null;
}

export interface SuccessResponse<T = any> {
  status: "success";
  code: "SUCCESS";
  message: string;
  data: T;
  request?: any;
  meta?: {
    total: number;
    page: number;
    limit: number;
  } | null;
} 