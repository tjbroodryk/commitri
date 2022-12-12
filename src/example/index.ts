import { ChangeBuilder, Commitri, OperationBuilder, YamlTransformationBuilder } from "../"

const transform = new YamlTransformationBuilder()
  .set({
    path: "test:foo", 
    value: "bla"
  })
  .build()

const change = ChangeBuilder
  .forSourceFile('example/test.yml')
  .transformations(transform)

const change2 = ChangeBuilder
  .forSourceFile('example/other-test.yml')
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