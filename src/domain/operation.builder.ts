import { Change } from './change.dto';
import { Operation } from './operation.dto';

export class OperationBuilder {
  private readonly data: Operation

  constructor(branch: string) {
    this.data = {
      source: branch,
      output: branch,
      changes: []
    }
  }

  static forBranch(branch: string) {
    return new OperationBuilder(branch)
  }

  outputBranch(branch: string) {
    this.data.output = branch
    return this
  }

  addChange(file: { build: () => Change }) {
    this.data.changes.push(file.build())
    return this
  }

  build() {
    return this.data
  }
}