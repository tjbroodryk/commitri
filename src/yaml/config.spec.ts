import { YamlTransformationBuilder } from "./transformation.builder";
import * as YAML from "yaml";

describe("YAML Configuration", () => {
  describe("Quote Style Configuration", () => {
    it("should use double quotes by default", () => {
      const transform = new YamlTransformationBuilder()
        .set({ path: "test:value", value: "hello world" })
        .build();

      const result = transform[0].transform("test:\n  existing: value");

      // Should contain double quotes
      expect(result).toContain('"hello world"');
      expect(result).not.toContain("'hello world'");
    });

    it("should use single quotes when configured", () => {
      const transform = new YamlTransformationBuilder()
        .withQuoteStyle("QUOTE_SINGLE")
        .set({ path: "test:value", value: "hello world" })
        .build();

      const result = transform[0].transform("test:\n  existing: value");

      // Should contain single quotes
      expect(result).toContain("'hello world'");
      expect(result).not.toContain('"hello world"');
    });

    it("should use no quotes when configured for plain style", () => {
      const transform = new YamlTransformationBuilder()
        .withQuoteStyle("PLAIN")
        .set({ path: "test:value", value: "hello world" })
        .build();

      const result = transform[0].transform("test:\n  existing: value");

      // Should not contain quotes for simple strings
      expect(result).toContain("hello world");
      expect(result).not.toContain('"hello world"');
      expect(result).not.toContain("'hello world'");
    });

    it("should allow full config override", () => {
      const transform = new YamlTransformationBuilder()
        .withConfig({ defaultStringType: "QUOTE_SINGLE" })
        .set({ path: "test:value", value: "hello world" })
        .build();

      const result = transform[0].transform("test:\n  existing: value");

      // Should contain single quotes
      expect(result).toContain("'hello world'");
      expect(result).not.toContain('"hello world"');
    });
  });
});
