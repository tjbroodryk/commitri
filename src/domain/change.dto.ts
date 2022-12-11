import { Transform } from "../types/transform.type";

export class Change {
  constructor(
    readonly transforms: Transform[],
    readonly sourcePath: string,
    readonly outputPath: string,

  ) {

  }
}
