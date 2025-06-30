import { AppErrorType } from "../model";

export class AppError<TErrorType extends AppErrorType = AppErrorType> extends Error {
  type: TErrorType;
  constructor(type: TErrorType, message: string, stack?: string) {
    super(message);
    this.type = type;
    this.stack = stack;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static wrap<TErrorType extends AppErrorType>(
    error: unknown,
    type: TErrorType
  ): AppError<TErrorType> {
    if (error == null) {
      return new AppError("unknown_error" as TErrorType, "Unknown error");
    }

    if (error instanceof AppError) {
      return error as AppError<TErrorType>;
    }

    if (error instanceof Error) {
      return new AppError(type, error.message, error.stack);
    }

    return new AppError(type, JSON.stringify(error));
  }
}
