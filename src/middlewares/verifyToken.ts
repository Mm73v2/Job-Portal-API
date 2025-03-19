import { Request, Response, NextFunction } from "express";
import appError from "../utils/errorsUtils/appError";
import httpStatusText from "../utils/httpStatusText";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TCurrentUser } from "../types/TCurrentUser";

dotenv.config();
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeaders || typeof authHeaders !== "string") {
    const error = appError.create(
      "No token provided or invalid header format",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = authHeaders.split(" ")[1];
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const currentUser = jwt.verify(token, jwtSecretKey as string);
    req.currentUser = currentUser as TCurrentUser; // TODO
    next();
  } catch (err) {
    const error = appError.create(
      "Invalid JWT token",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }
};

export default verifyToken;
