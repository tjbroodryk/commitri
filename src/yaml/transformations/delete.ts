import { unset } from "lodash";
import * as YAML from "yaml";
import { Transformation } from "../../types/transformation.type";
import { makePath, getYamlStringifyOptions } from "../utils";
import { YamlConfig } from "../config";

export interface DeleteProps {
  path: string;
}

export class DeleteValueTransform implements Transformation {
  constructor(
    private readonly props: DeleteProps,
    private readonly config: YamlConfig
  ) {}

  transform(stringData: string): string {
    const data: YAML.YAMLMap = YAML.parse(stringData);
    const { path } = this.props;

    unset(data, makePath(path));

    return YAML.stringify(data, getYamlStringifyOptions(this.config));
  }
}
