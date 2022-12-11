import { get, set } from "lodash";
import * as YAML from "yaml";
import { Transformation } from "../../types/transformation.interface";

export interface RemoveItemProps { path: string, value: string }

export class RemoveItemTransform implements Transformation {
  constructor(private readonly props: RemoveItemProps) {}

  transform(stringData: string): string {
    const data: YAML.YAMLMap = YAML.parse(stringData)
    const { path, value } = this.props
    
    const pathArray = path.split(":");

    return YAML.stringify(set(
      data,
      pathArray,
      get(data, pathArray)?.filter((v: string) => v !== value),
    ));
  }
}