import { z } from "zod";
import { O, pipe } from "@mobily/ts-belt";
import { useSearchParams } from "react-router-dom";
import { URL_PARAMS_KEYS } from "../config/constants/urlParamsKeys";
import { sortKeySchema, sortOrderSchema } from "@/shared/model";

const normalizeStringInput = (input: string | null) => {
  return pipe(
    O.fromNullable(input),
    O.map((value) => value.trim()),
    O.filter((value) => value.length > 0)
  );
};

const getStringParam = (input: string | null) => {
  return O.getWithDefault(normalizeStringInput(input), "");
};

const getNumberParam = (input: string | null) => {
  return O.getWithDefault(
    pipe(
      normalizeStringInput(input),
      O.map((value) => parseInt(value, 10)),
      O.filter((value) => !Number.isNaN(value))
    ),
    0
  );
};

const getParsedParam = <T>(
  input: string | null,
  schema: z.ZodType<T>
): T | "" => {
  return O.getWithDefault(
    pipe(
      normalizeStringInput(input),
      O.flatMap((value) => {
        const result = schema.safeParse(value);
        return result.success ? result.data : "";
      })
    ),
    ""
  );
};

export const useReadUrlParams = () => {
  const [params] = useSearchParams();
  const sortKey = getParsedParam(
    params.get(URL_PARAMS_KEYS.sortKey),
    sortKeySchema
  );
  const sortOrder = getParsedParam(
    params.get(URL_PARAMS_KEYS.sortOrder),
    sortOrderSchema
  );
  const artistFilter = getStringParam(params.get(URL_PARAMS_KEYS.artistFilter));
  const genreFilter = getStringParam(params.get(URL_PARAMS_KEYS.genreFilter));
  const search = getStringParam(params.get(URL_PARAMS_KEYS.search));
  const page = getNumberParam(params.get(URL_PARAMS_KEYS.page));

  return {
    sortKey,
    sortOrder,
    artistFilter,
    genreFilter,
    search,
    page,
  };
};
