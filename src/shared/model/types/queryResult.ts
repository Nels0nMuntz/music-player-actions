import { AppError } from "@/shared/api";
import { AppErrorType } from "./appErrorType";

export type QueryResult<
  TData,
  TErrorType extends AppErrorType = AppErrorType
> = {
  data?: TData;
  error?: AppError<TErrorType>;
};
