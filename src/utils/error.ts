import { ErrorCode } from "../types/responseTypes";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorCode: ErrorCode,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const createErrorResponse = (error: ApiError) => {
  return {
    status: "error" as const,
    code: error.errorCode,
    message: error.message,
    data: null,
  };
};

export const createSuccessResponse = <T>(data: T, message: string = "Success") => {
  return {
    status: "success" as const,
    code: "SUCCESS" as const,
    message,
    data,
  };
}; 