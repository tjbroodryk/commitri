import { Transform } from "../types/transform.type"
import { Transformation } from "../types/transformation.interface"
import { Change } from "./change.dto"

export class ChangeBuilder {
  private _transforms: Transform[] = []
  private _outputPath: string
  private readonly _sourcePath: string

  private constructor(source: string) {
    this._outputPath = source
    this._sourcePath = source
  }

  static forSourceFile(path: string): ChangeBuilder {
    return new ChangeBuilder(path)
  }

  withOutputPath(path: string): Omit<this, 'withOutputPath'> {
    this._outputPath = path
    return this
  }

  transformations(transformations: Transformation[]): Omit<this, 'transformations'> {
    this._transforms.push(...transformations.map(t => t.transform.bind(t)))
    return this
  }

  transform(fn: Transform): Omit<this, 'transform'> {
    this._transforms.push(fn)

    return this
  }

  build(): Change {
    return new Change(this._transforms, this._sourcePath, this._outputPath)
  }
}