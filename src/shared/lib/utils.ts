import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { Ok, Error as BeltError, R } from "@mobily/ts-belt";
import { ApiError, AppErrorType, QueryResult } from "../model";
import { RequestParams } from "../model/types/requestParams";
import { AppError } from "../api/appError";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isApiError = (response: unknown): response is ApiError => {
  return (
    response !== null && typeof response === "object" && "error" in response
  );
};

export const isFormData = (data: unknown): data is FormData => {
  return data instanceof FormData;
};

export const objectToQueryParams = (obj: RequestParams) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined || value === null) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          )
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const parseApiResponse = <T>(
  response: unknown,
  schema: z.ZodSchema<T>
): T => {
  try {
    return schema.parse(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Response validation error:", error.errors);
      throw new Error("Invalid data format received from the API.");
    }
    throw error;
  }
};

export const unwrapQueryResult = <
  TData,
  TErrorType extends AppErrorType = AppErrorType
>(
  result: Ok<TData> | BeltError<AppError<TErrorType>> | undefined
): QueryResult<TData, TErrorType> => {
  const queryResult: QueryResult<TData, TErrorType> = {};

  if (result === undefined) return queryResult;

  if (R.isOk(result)) {
    queryResult.data = R.getExn(result);
  } else {
    R.tapError(result, (error) => {
      queryResult.error = error;
    });
  }

  return queryResult;
};
