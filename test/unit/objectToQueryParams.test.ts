import { describe, it, expect } from "vitest";
import { objectToQueryParams } from "../../src/shared/lib/utils";

describe("objectToQueryParams util", () => {
  it("should convert key-value pairs to query string", () => {
    // Arrange
    const input = { name: "James", username: "james" };

    // Act
    const result = objectToQueryParams(input);
    
    // Assert
    expect(result).toBe("name=James&username=james");
  });

  it("pairs containing null or undefined should not be included in query string", () => {
    const input = { name: "John", age: undefined, city: null };
    expect(objectToQueryParams(input)).toBe("name=John");
  });

  it("should convert array of strings to multiple key=value pairs", () => {
    const input = { category: ["technology", "sport", "entertainment"] };
    expect(objectToQueryParams(input)).toBe(
      "category=technology&category=sport&category=entertainment"
    );
  });

  it("should encode special characters", () => {
    const input = { query: "space & symbols", order: "asc" };
    expect(objectToQueryParams(input)).toBe(
      "query=space%20%26%20symbols&order=asc"
    );
  });

  it("should handle number values", () => {
    const input = { pageSize: 20, pageIndex: 1 };
    expect(objectToQueryParams(input)).toBe("pageSize=20&pageIndex=1");
  });

  it("should convert array of numbers to multiple key=value pairs", () => {
    const input = { ids: [1, 2, 3] };
    expect(objectToQueryParams(input)).toBe("ids=1&ids=2&ids=3");
  });

  it("should return empty string for empty object", () => {
    expect(objectToQueryParams({})).toBe("");
  });
});
