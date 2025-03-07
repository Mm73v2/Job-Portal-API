import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectToDB from "./config/connectToDB";
import { TAppError } from "./utils/errorsUtils/appError";
import httpStatusText from "./utils/httpStatusText";
import { authRouter, usersRouter, jobsRouter } from "./routes";
import { Role } from "./models";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

const port = process.env.PORT;

// Connecting to the database
connectToDB();

// ===========================

// ===========================

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/jobs", jobsRouter);

// Global error handler
app.use(
  (error: TAppError, req: Request, res: Response, next: NextFunction): void => {
    res.status(error.statusCode || 500).json({
      status: error.statusText || httpStatusText.ERROR,
      message: error.message,
      errorMessages: error.errorMessages,
      code: error.statusCode || 500,
      data: null,
    });
  }
);

// Not found routes
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: httpStatusText.NOT_FOUND,
    message: "Route not found.",
  });
});

server.listen(port || 5000, () => {
  console.log(`app running on port ${port}`);
});
