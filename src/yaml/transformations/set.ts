import { set } from "lodash";
import * as YAML from "yaml";
import { Transformation } from "../../types/transformation.type";
import { makePath } from "../utils";

export interface SetProps { path: string, value: unknown }

export class SetTransform implements Transformation {
  constructor(private readonly props: SetProps) {}

  transform(stringData: string): string {
    const data: YAML.YAMLMap = YAML.parse(stringData)
    const { path, value } = this.props
    
    return YAML.stringify(set(data, makePath(path), value));
  }
}