import { Transformation } from "../types/transformation.type";
import { DeleteProps, DeleteValueTransform } from './transformations/delete';
import { PushProps, PushTransform } from './transformations/push';
import { SetProps, SetTransform } from "./transformations/set";
import { RemoveItemProps, RemoveItemTransform } from './transformations/remove-item';

export class YamlTransformationBuilder {
  private readonly transforms: Transformation[] = []

  set(props: SetProps): this {
    this.transforms.push(new SetTransform(props))

    return this
  }

  push(props: PushProps): this {
    this.transforms.push(new PushTransform(props))
    return this
  }

  delete(props: DeleteProps): this {
    this.transforms.push(new DeleteValueTransform(props))
    return this
  }

  removeItem(props: RemoveItemProps): this {
    this.transforms.push(new RemoveItemTransform(props))
    return this
  }

  build(): Transformation[] {
    return this.transforms
  }
}
