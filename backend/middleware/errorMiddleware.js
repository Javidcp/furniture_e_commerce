// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  // Log the error with details
  console.error("Error occurred:", {
    path: req.path,
    method: req.method,
    body: req.body,
    error: err.stack
  });

  // Set the status code based on the response status or default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

// notFound.js
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);  // Status code for "not found"
  next(error);  // Pass the error to error handler
};
