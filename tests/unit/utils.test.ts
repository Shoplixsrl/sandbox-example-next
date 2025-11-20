import { describe, it, expect } from "bun:test";
import { formatCurrency, slugify, truncate } from "@/lib/utils";

describe("Utils", () => {
  describe("formatCurrency", () => {
    it("should format number as USD currency", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("should format string as currency", () => {
      expect(formatCurrency("99.99")).toBe("$99.99");
    });

    it("should handle zero", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });
  });

  describe("slugify", () => {
    it("should convert text to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("should handle special characters", () => {
      expect(slugify("Hello & World!")).toBe("hello-world");
    });

    it("should handle multiple spaces", () => {
      expect(slugify("Hello    World")).toBe("hello-world");
    });

    it("should handle underscores", () => {
      expect(slugify("hello_world_test")).toBe("hello-world-test");
    });
  });

  describe("truncate", () => {
    it("should truncate long text", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
    });

    it("should not truncate short text", () => {
      expect(truncate("Hello", 10)).toBe("Hello");
    });

    it("should handle exact length", () => {
      expect(truncate("Hello", 5)).toBe("Hello");
    });
  });
});
