import { describe, it, expect } from "vitest";
import { formatDate } from "../../src/shared/lib/utils";

describe("formatDate util", () => {
  it("should convert valid date string with time into 'MMM DD, YYYY' format", () => {
    // Arrange
    const input = "2025-06-16T20:03:29.284Z";
    
    // Act
    const result = formatDate(input);

    // Assert
    expect(result).toBe("Jun 16, 2025");
  });
  it("should convert valid date string without time into 'MMM DD, YYYY' format", () => {
    // Arrange
    const input = "2025-06-16";

    // Act
    const result = formatDate(input);   

    // Assert
    expect(result).toBe("Jun 16, 2025");
  });

  it('should return "Invalid Date" for invalid valid date', () => {
    // Arrange
    const input = "invalid-date-string";

    // Act
    const result = formatDate(input);

    // Assert
    expect(result).toBe("Invalid Date");
  });
});