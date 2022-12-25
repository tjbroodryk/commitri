export interface YamlConfig {
  /**
   * Controls the default quote style for string values
   * - 'QUOTE_SINGLE': Use single quotes (')
   * - 'QUOTE_DOUBLE': Use double quotes (")
   * - 'PLAIN': Use no quotes when possible
   */
  defaultStringType?: "QUOTE_SINGLE" | "QUOTE_DOUBLE" | "PLAIN";
}

export const DEFAULT_YAML_CONFIG: YamlConfig = {
  defaultStringType: "QUOTE_DOUBLE",
};
