const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Route not found",
  409: "Conflict",
  500: "Server error",
};

class ApiError extends Error {
  constructor(status, message) {
    super();

    this.status = status;
    this.message = message;
  }

  static error(status, message = messageList[status]) {
    if (message) {
      return new ApiError(status, message);
    }
    return new ApiError(500, "Unpredicted error!");
  }
}

module.exports = ApiError;
