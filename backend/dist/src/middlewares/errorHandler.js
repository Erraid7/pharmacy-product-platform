export function createError(message, status = 500) {
    const error = new Error(message);
    error.status = status;
    return error;
}
export function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error] ${status}: ${message}`);
    res.status(status).json({
        error: message,
        status,
    });
}
//# sourceMappingURL=errorHandler.js.map