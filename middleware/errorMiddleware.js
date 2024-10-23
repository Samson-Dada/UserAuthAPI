import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = Object.keys(err.keyValue)[0];
	const field = err.keyValue[value];

	const message = `Duplicate field value: ${value} with value ${field} Please use another value!`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
	new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	// console.log("prodError", err);
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});

		// Programming or other unknown error: don't leak error details
	} else {
		// 1) Log error
		console.error("ERROR 💥", err);

		// 2) Send generic message
		res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}
};

export default (err, req, res, next) => {
	// console.log("globalError", err);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		console.log("err", err);
		if (err.name === "CastError") err = handleCastErrorDB(err);
		if (err.code === 11000) err = handleDuplicateFieldsDB(err);
		if (err.name === "ValidationError") err = handleValidationErrorDB(err);
		if (err.name === "JsonWebTokenError") err = handleJWTError();
		if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

		sendErrorProd(err, res);
	}
};
