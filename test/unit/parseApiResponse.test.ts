import { describe, it, expect, vi } from "vitest";
import { z } from "zod";
import { parseApiResponse } from "../../src/shared/lib/utils";

describe("parseApiResponse (blackbox)", () => {
  const schema = z.object({
    id: z.number(),
    title: z.string(),
    url: z.string().url(),
  });

  it("should return parsed data after successful schema validation", () => {
    const input = {
      id: 1,
      title: "Johnny B. Goode",
      url: "https://picsum.photos/seed/Johnny%20B.%20Goode/300/300",
    };
    const result = parseApiResponse(input, schema);
    expect(result).toEqual(input);
  });

  it("should log error and throw custom error when schema validation fails with ZodError", () => {
    const input = {
      id: "not-a-number",
      title: "Johnny B. Goode",
      url: "https://picsum.photos/seed/Johnny%20B.%20Goode/300/300",
    };
    expect(() => parseApiResponse(input, schema)).toThrowError(
      "Invalid data format received from the API."
    );
  });
});

describe("parseApiResponse (whitebox)", () => {
  it("should call schema.parse service with correct parameters", () => {
    const input = {
      id: 1,
      title: "Johnny B. Goode",
      url: "https://picsum.photos/seed/Johnny%20B.%20Goode/300/300",
    };
    const schema = {
      parse: vi.fn().mockReturnValue(input),
    } as unknown as z.ZodSchema<typeof input>;

    const result = parseApiResponse(input, schema);

    expect(schema.parse).toHaveBeenCalledWith(input);
    expect(schema.parse).toHaveBeenCalledTimes(1);
    expect(result).toEqual(input);
  });

  it("should throw custom error when schema validation fails with ZodError", () => {
    const input = {
      id: "not-a-number",
      title: "Johnny B. Goode",
      url: "https://picsum.photos/seed/Johnny%20B.%20Goode/300/300",
    };
    const schema = {
      parse: vi.fn().mockImplementation(() => {
        throw new z.ZodError([
          {
            code: "invalid_type",
            expected: "number",
            received: "string",
            path: ["id"],
            message: "Expected number, received string",
          },
        ]);
      }),
    } as unknown as z.ZodSchema<typeof input>;
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => parseApiResponse(input, schema)).toThrowError(
      "Invalid data format received from the API."
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "Response validation error:",
      expect.any(Array)
    );
    consoleSpy.mockRestore();
  });

  it("should throw error when schema validation fails with not ZodError", () => {
    const schema = {
      parse: vi.fn().mockImplementation(() => {
        throw new Error("Unexpected error");
      }),
    } as unknown as z.ZodSchema;

    expect(() => parseApiResponse({}, schema)).toThrowError("Unexpected error");
  });
});
