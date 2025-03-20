export default class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    timestamp: string;
    code?: number;
  
    constructor(success: boolean, message: string, data?: T, code?: number) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.timestamp = new Date().toISOString();
      this.code = code;
    }
  
    static successResponse<T>(message: string, data?: T, code: number = 200): ApiResponse<T> {
      return new ApiResponse(true, message, data, code);
    }
  
    static errorResponse<T>(message: string, code: number = 500, data?: T): ApiResponse<T> {
      return new ApiResponse(false, message, data, code);
    }
  }
  