import { OperationBuilder } from './operation.builder';
import { ChangeBuilder } from './change.builder';

describe(OperationBuilder.name, () => {
  describe('given no output branch is set', () => {
    it('it should set outputBranch to be the same as sourceBranch', () => {
      const operation = OperationBuilder.forBranch("foo")
        .build()

      expect(operation).toMatchObject({
        output: "foo",
        source: "foo"
      })
    })

    describe('given output branch', () => {
      it('should set outputBranch', () => {
        const operation = OperationBuilder.forBranch("foo")
          .outputBranch("bar")
          .build()

        expect(operation).toMatchObject({
          output: "bar",
          source: "foo"
        })
      })
    })
  })

  it('should add changes', () => {
    const operation = OperationBuilder.forBranch("foo")
      .addChange(ChangeBuilder.forSourceFile("test.yaml"))
      .addChange(ChangeBuilder.forSourceFile("test.yaml"))
      .build()

    expect(operation.changes).toHaveLength(2)
  })
})