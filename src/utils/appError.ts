class AppError extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string, stack = '') {
        super(message);
        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        } else {
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;