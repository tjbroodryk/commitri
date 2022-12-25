import { get, set } from "lodash";
import * as YAML from "yaml";
import { Transformation } from "../../types/transformation.type";
import { makePath, getYamlStringifyOptions } from "../utils";
import { YamlConfig } from "../config";

export interface PushProps {
  path: string;
  value: unknown;
}

export class PushTransform implements Transformation {
  constructor(
    private readonly props: PushProps,
    private readonly config: YamlConfig
  ) {}

  transform(stringData: string): string {
    const data: YAML.YAMLMap = YAML.parse(stringData);
    const { path, value } = this.props;

    const pathArray = makePath(path);
    const existingArray = get(data, pathArray) ?? [];

    return YAML.stringify(
      set(data, pathArray, Array.from(new Set([...existingArray, value]))),
      getYamlStringifyOptions(this.config)
    );
  }
}
