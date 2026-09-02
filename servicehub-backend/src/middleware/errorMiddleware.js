const errorHandler = (error, req, res, next) => {
  console.error(error);

  const statusCode =
    error.statusCode || res.statusCode !== 200
      ? error.statusCode || res.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message:
      error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;