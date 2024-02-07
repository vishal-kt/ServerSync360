/**
 * ApiError class represents errors that occur during API operations.
 * It extends the built-in Error class.
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {string} [message="Something went wrong"] - The error message.
     * @param {Array} [errors=[]] - An array of additional error details.
     * @param {string} [stack=""] - The stack trace associated with the error.
     */
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);

        /**
         * The HTTP status code associated with the error.
         * @type {number}
         */
        this.statusCode = statusCode;

        /**
         * The data associated with the error.
         * @type {null}
         */
        this.data = null;

        /**
         * The error message.
         * @type {string}
         */
        this.message = message;

        /**
         * Indicates if the operation was successful or not.
         * @type {boolean}
         */
        this.success = false;

        /**
         * An array of additional error details.
         * @type {Array}
         */
        this.errors = errors;

        /**
         * The stack trace associated with the error.
         * @type {string}
         */
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
