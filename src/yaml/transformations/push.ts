import { get, set } from "lodash";
import * as YAML from "yaml";
import { Transformation } from "../../types/transformation.interface";
import { makePath } from "../utils";

export interface PushProps { path: string, value: unknown }

export class PushTransform implements Transformation {
  constructor(private readonly props: PushProps) {}

  transform(stringData: string): string {
    const data: YAML.YAMLMap = YAML.parse(stringData)
    const { path, value } = this.props
    
    const pathArray = makePath(path);
    const existingArray = get(data, pathArray) ?? [];
    
    return YAML.stringify(
      set(
        data,
        pathArray,
        Array.from(new Set([...existingArray, value])),
      )
    )
  }
}