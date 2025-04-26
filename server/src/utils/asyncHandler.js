/**
 * Wrapper for async route handlers to catch errors
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped middleware function
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((error) => {
        if (!error.isOperational) {
          console.error('Non-operational error:', error);
          next(new ApiError(500, 'An unexpected error occurred'));
        } else {
          next(error);
        }
      });
  };