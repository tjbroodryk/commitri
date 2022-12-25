import { Transformation } from "../types/transformation.type";
import { DeleteProps, DeleteValueTransform } from "./transformations/delete";
import { PushProps, PushTransform } from "./transformations/push";
import { SetProps, SetTransform } from "./transformations/set";
import {
  RemoveItemProps,
  RemoveItemTransform,
} from "./transformations/remove-item";
import { YamlConfig, DEFAULT_YAML_CONFIG } from "./config";

export class YamlTransformationBuilder {
  private readonly transforms: Transformation[] = [];
  private config: YamlConfig = DEFAULT_YAML_CONFIG;

  /**
   * Configure YAML output options
   */
  withConfig(config: YamlConfig): this {
    this.config = { ...this.config, ...config };
    return this;
  }

  /**
   * Set the default quote style for string values
   */
  withQuoteStyle(style: "QUOTE_SINGLE" | "QUOTE_DOUBLE" | "PLAIN"): this {
    this.config.defaultStringType = style;
    return this;
  }

  set(props: SetProps): this {
    this.transforms.push(new SetTransform(props, this.config));

    return this;
  }

  push(props: PushProps): this {
    this.transforms.push(new PushTransform(props, this.config));
    return this;
  }

  delete(props: DeleteProps): this {
    this.transforms.push(new DeleteValueTransform(props, this.config));

    return this;
  }

  removeItem(props: RemoveItemProps): this {
    this.transforms.push(new RemoveItemTransform(props, this.config));

    return this;
  }

  build(): Transformation[] {
    return this.transforms;
  }
}
