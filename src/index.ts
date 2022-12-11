import { ChangeBuilder } from "./domain/change.builder"
import { Commitri } from "./domain/commitri"
import { OperationBuilder } from "./domain/operation.builder"
import { YamlTransformationBuilder } from './yaml/transformation.builder';

const transform = new YamlTransformationBuilder()
  .set({
    path: "test.foo", 
    value: "bla"
  })
  .build()

const change = ChangeBuilder
  .forSourceFile('test.yaml')
  .transformations(transform)

const operation = OperationBuilder
  .forBranch("main")
  .addChange(change)

new Commitri((process.env as any).GITHUB_TOKEN)
  .owner("tjbroodryk")
  .repo('commitri')
  .operation(operation)
  .commit('commitri: test commit')