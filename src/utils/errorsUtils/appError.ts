export type TAppError = {
  message: string;
  statusCode: number;
  statusText: string;
  errorMessages?: string[];
  create(message: string, statusCode: number, statusText: string): TAppError;
};

class AppError extends Error implements TAppError {
  public statusCode!: number;
  public statusText!: string;
  public errorMessages?: string[] = [];
  constructor() {
    super();
  }

  create(
    message: string,
    statusCode: number,
    statusText: string,
    errorMessages?: string[]
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.errorMessages = errorMessages;
    return this;
  }
}

export { AppError };

export default new AppError();
