module.exports = handlePostgresError = (err, res) => {
    let errorMessage = 'An unexpected error occurred.';
    let statusCode = 500;
    if (err.code) {
        switch (err.code) {
            case '23505': // unique_violation
                errorMessage = 'Duplicate entry. This resource already exists.';
                statusCode = 409;
                break;
            case '23503': // foreign_key_violation
                errorMessage = 'Foreign key violation. This resource is referenced elsewhere.';
                statusCode = 400;
                break;
            case '23502': // not_null_violation
                errorMessage = 'A required field is missing.';
                statusCode = 400;
                break;
            case '22P02': // invalid_text_representation
                errorMessage = 'Invalid input syntax.';
                statusCode = 400;
                break;
            default:
                errorMessage = 'Database error.';
                statusCode = 500;
                break;
        }
    }

    console.error('PostgreSQL Error: ', err);
    res.status(statusCode).json({ message: errorMessage, success: false, result: null, error: err });
};
