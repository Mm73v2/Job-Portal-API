import { ZodError } from "zod";
type TServiceResult<T = unknown> =
  | { type: "success"; data?: T }
  | { type: "error"; error: ZodError };

export default TServiceResult;
