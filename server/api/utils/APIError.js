/**
 * @extends Error
 */

class APIError extends Error {
  constructor({
    message,
    status,
    errors,
  }) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

module.exports = APIError;