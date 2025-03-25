import "express";
import { Request } from "express";
import { TCurrentUser } from "./TCurrentUser";
declare module "express-serve-static-core" {
  export interface Request {
    validatedData?: unknown;
    currentUser?: TCurrentUser;
  }
}
