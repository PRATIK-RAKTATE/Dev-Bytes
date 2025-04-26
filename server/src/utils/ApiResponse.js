export class ApiResponse {
    /**
     * @param {Object} res - Express response object
     * @param {Object} data - Response data payload
     * @param {string} [message='Success'] - Human-readable message
     * @param {number} [statusCode=200] - HTTP status code
     */
    static success(res, data, message = 'Success', statusCode = 200) {
      res.status(statusCode).json({
        success: true,
        message,
        data,
        error: null
      });
    }
  
    /**
     * @param {Object} res - Express response object 
     * @param {Object} error - Error object
     * @param {string} [message] - Override error message
     */
    static error(res, error, message) {
      const statusCode = error.statusCode || 500;
      const errorMessage = message || error.message;
  
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        data: null,
        error: {
          code: error.code,
          details: error.details
        }
      });
    }
  }