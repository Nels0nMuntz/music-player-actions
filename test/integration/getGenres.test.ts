import { describe, expect, it } from "vitest";
import { R } from "@mobily/ts-belt";
import { getGenres } from "../../src/entities/genres/api/getGenres";

describe("get genres", () => {
  it("should return list of genres", async () => {
    const genres = await getGenres();

    expect(R.isOk(genres)).toBe(true);
    expect(R.getExn(genres)).toHaveLength(3);
    expect(R.getExn(genres)).toEqual(["Rock", "Pop", "Hip Hop"])
  });
});
