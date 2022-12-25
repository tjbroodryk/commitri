import { YamlConfig } from "./config";

export const makePath = (path: string) => {
  return path
    .split(/(?<!\\):/g)
    .map((x) => (x.includes("\\:") ? x.replace("\\:", ":") : x));
};

export const getYamlStringifyOptions = (config: YamlConfig) => {
  const options: any = {};

  if (config.defaultStringType) {
    options.defaultStringType = config.defaultStringType;
  }

  return options;
};
