import express from "express";

// import hpp from "hpp";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import dbConnection from "./db/dbConnection.js";
import appMiddleware from "./middleware/appMiddleware.js";
const app = express();

// Database call

dbConnection();
// 1) GLOBAL MIDDLEWARES

appMiddleware(app, express);

// 3) ROUTES
app.use("/api/v1/auth", userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
