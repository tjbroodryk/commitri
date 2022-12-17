import { ChangeBuilder } from './change.builder';
import { Transform } from '../types/transform.type';
import { Transformation } from '../types/transformation.type';
import { flow } from 'lodash';

describe(ChangeBuilder.name, () => {
  describe('given output file is not specified', () => {
    it('should default output file to same as source file', () => {
      expect(ChangeBuilder.forSourceFile('test.yaml').build()).toMatchObject({
        outputPath: "test.yaml",
        sourcePath: "test.yaml"
      })
    })
  })

  describe('given output file is specified', () => {
    it('should set outputPath', () => {
      expect(ChangeBuilder
          .forSourceFile('test.yaml').withOutputPath("other.yaml").build()).toMatchObject({
        outputPath: "other.yaml",
        sourcePath: "test.yaml"
      })
    })
  })

  it('should set transforms', () => { 
    const fooFunction = (data: string) => data + " foo"
    const change = ChangeBuilder.forSourceFile("test.yaml")
      .transform(fooFunction)
      .transformations([
        new TestTransformation()
      ])
      .build()
      
    expect(flow(change.transforms)("test")).toEqual("test foo bla")
  })
})

class TestTransformation implements Transformation {
  transform(data: string): string {
    return data + " bla"
  }
}