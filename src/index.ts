import { ChangeBuilder } from "./domain/change.builder"
import { Commitri } from "./domain/commitri"
import { OperationBuilder } from "./domain/operation.builder"
import { YamlTransformationBuilder } from './yaml/transformation.builder';

console.log(process.env.GITHUB_TOKEN)

const transform = new YamlTransformationBuilder()
  .set({
    path: "test:foo", 
    value: "bla"
  })
  .build()

const change = ChangeBuilder
  .forSourceFile('test.yml')
  .transformations(transform)

const change2 = ChangeBuilder
  .forSourceFile('other-test.yml')
  .transformations(new YamlTransformationBuilder()
  .set({
    path: "test_2:foo", 
    value: "bla"
  })
  .build())

const operation = OperationBuilder
  .forBranch("main")
  .addChange(change)
  .addChange(change2)

new Commitri((process.env as any).GITHUB_TOKEN)
  .owner("tjbroodryk")
  .repo('commitri')
  .operation(operation)
  .commit('commitri: test commit')