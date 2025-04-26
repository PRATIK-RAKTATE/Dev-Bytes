export class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Error message
     * @param {boolean} [isOperational=true] - Is operational error (vs programmer error)
     * @param {string} [stack=''] - Error stack trace
     */
    constructor(
      statusCode,
      message,
      isOperational = true,
      stack = ''
    ) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    static badRequest(message) {
      return new ApiError(400, message);
    }
  
    static unauthorized(message = 'Unauthorized') {
      return new ApiError(401, message);
    }
  
    static forbidden(message = 'Forbidden') {
      return new ApiError(403, message);
    }
  
    static notFound(message = 'Resource not found') {
      return new ApiError(404, message);
    }
  
    static internal(message = 'Internal server error') {
      return new ApiError(500, message);
    }
  }