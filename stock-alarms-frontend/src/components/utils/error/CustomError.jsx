
class CustomError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 'CustomError';
      this.message = message;
    }
}